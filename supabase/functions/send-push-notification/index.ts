import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// --- APNs JWT helpers (ES256 via Web Crypto) ---

function base64UrlEncode(data: Uint8Array): string {
  let binary = "";
  for (const byte of data) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function textToBase64Url(text: string): string {
  return base64UrlEncode(new TextEncoder().encode(text));
}

/** Convert a DER-encoded r||s signature to raw r||s (64 bytes for P-256). */
function derToRaw(der: Uint8Array): Uint8Array {
  // DER: 0x30 <len> 0x02 <rLen> <r> 0x02 <sLen> <s>
  // Web Crypto returns raw IEEE P1363 for ECDSA, so this may not be needed,
  // but we keep it as a safety net.
  return der;
}

async function importPrivateKey(pem: string): Promise<CryptoKey> {
  const pemContents = pem
    .replace(/-----BEGIN PRIVATE KEY-----/, "")
    .replace(/-----END PRIVATE KEY-----/, "")
    .replace(/\s/g, "");
  const binaryDer = Uint8Array.from(atob(pemContents), (c) => c.charCodeAt(0));

  return crypto.subtle.importKey(
    "pkcs8",
    binaryDer,
    { name: "ECDSA", namedCurve: "P-256" },
    false,
    ["sign"]
  );
}

async function createApnsJwt(
  keyId: string,
  teamId: string,
  privateKeyPem: string
): Promise<string> {
  const header = { alg: "ES256", kid: keyId };
  const now = Math.floor(Date.now() / 1000);
  const payload = { iss: teamId, iat: now };

  const encodedHeader = textToBase64Url(JSON.stringify(header));
  const encodedPayload = textToBase64Url(JSON.stringify(payload));
  const signingInput = `${encodedHeader}.${encodedPayload}`;

  const key = await importPrivateKey(privateKeyPem);
  const signature = await crypto.subtle.sign(
    { name: "ECDSA", hash: "SHA-256" },
    key,
    new TextEncoder().encode(signingInput)
  );

  const encodedSignature = base64UrlEncode(new Uint8Array(signature));
  return `${signingInput}.${encodedSignature}`;
}

// --- Main handler ---

interface PushPayload {
  user_id?: string;
  user_ids?: string[];
  title: string;
  body: string;
  data?: Record<string, string>;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Authenticate the caller (service-role or authenticated user)
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } }
    );

    const { data: claimsData, error: claimsError } = await supabase.auth.getClaims(
      authHeader.replace("Bearer ", "")
    );
    if (claimsError || !claimsData?.claims) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { title, body, data, user_id, user_ids } =
      (await req.json()) as PushPayload;

    if (!title || !body) {
      return new Response(
        JSON.stringify({ error: "title and body are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Resolve target user IDs
    const targetIds: string[] = user_ids ?? (user_id ? [user_id] : [claimsData.claims.sub as string]);

    // Fetch device tokens using service role
    const serviceClient = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { data: tokens, error: tokensError } = await serviceClient
      .from("device_tokens")
      .select("token, platform")
      .in("user_id", targetIds)
      .eq("platform", "ios");

    if (tokensError) {
      console.error("Error fetching tokens:", tokensError);
      return new Response(
        JSON.stringify({ error: "Failed to fetch device tokens" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!tokens || tokens.length === 0) {
      return new Response(
        JSON.stringify({ success: true, sent: 0, message: "No iOS device tokens found" }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Build APNs JWT
    const keyP8 = Deno.env.get("APNS_KEY_P8")!;
    const keyId = Deno.env.get("APNS_KEY_ID")!;
    const teamId = Deno.env.get("APNS_TEAM_ID")!;
    const bundleId = Deno.env.get("APNS_BUNDLE_ID")!;

    const jwt = await createApnsJwt(keyId, teamId, keyP8);

    // APNs production endpoint
    const apnsHost = "https://api.push.apple.com";

    const results: { token: string; status: number; response?: string }[] = [];

    for (const { token } of tokens) {
      const apnsPayload = {
        aps: {
          alert: { title, body },
          sound: "default",
          badge: 1,
        },
        ...(data ?? {}),
      };

      try {
        const res = await fetch(`${apnsHost}/3/device/${token}`, {
          method: "POST",
          headers: {
            Authorization: `bearer ${jwt}`,
            "apns-topic": bundleId,
            "apns-push-type": "alert",
            "apns-priority": "10",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(apnsPayload),
        });

        const resText = await res.text();
        results.push({ token: token.slice(-8), status: res.status, response: resText });

        if (res.status === 410) {
          // Token is no longer valid — clean up
          await serviceClient
            .from("device_tokens")
            .delete()
            .eq("token", token);
        }
      } catch (err) {
        console.error(`Failed to send to ...${token.slice(-8)}:`, err);
        results.push({ token: token.slice(-8), status: 0, response: String(err) });
      }
    }

    const sent = results.filter((r) => r.status === 200).length;

    return new Response(
      JSON.stringify({ success: true, sent, total: tokens.length, results }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Push notification error:", err);
    return new Response(
      JSON.stringify({ error: String(err) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
