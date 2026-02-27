import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.91.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { opponentId, name, description } = await req.json();
    if (!opponentId || !name) {
      return new Response(JSON.stringify({ error: "opponentId and name required" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceKey);

    // Check if avatar already exists in storage
    const filePath = `opponents/${opponentId}.png`;
    const { data: existing } = await supabase.storage.from("avatars").createSignedUrl(filePath, 60);
    
    // Check if the file actually exists by trying to download it
    const { data: fileData } = await supabase.storage.from("avatars").download(filePath);
    if (fileData) {
      const publicUrl = `${supabaseUrl}/storage/v1/object/public/avatars/${filePath}`;
      return new Response(JSON.stringify({ avatarUrl: publicUrl }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Generate avatar using Lovable AI image generation
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const prompt = description || 
      `Create a stylized cartoon character avatar for "${name}" in an anime/gaming art style. The character should look intellectual and confident, suitable for a quiz battle game. Clean white background, upper body portrait, vibrant colors, detailed shading. The character should have a distinctive look that matches their personality as an intellectual challenger.`;

    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-image",
        messages: [{ role: "user", content: prompt }],
        modalities: ["image", "text"],
      }),
    });

    if (!aiResponse.ok) {
      const errText = await aiResponse.text();
      console.error("AI generation failed:", aiResponse.status, errText);
      return new Response(JSON.stringify({ error: "Avatar generation failed", avatarUrl: null }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const aiData = await aiResponse.json();
    const imageDataUrl = aiData.choices?.[0]?.message?.images?.[0]?.image_url?.url;

    if (!imageDataUrl) {
      return new Response(JSON.stringify({ error: "No image generated", avatarUrl: null }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Extract base64 data and upload to storage
    const base64Data = imageDataUrl.replace(/^data:image\/\w+;base64,/, "");
    const binaryData = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0));

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, binaryData, {
        contentType: "image/png",
        upsert: true,
      });

    if (uploadError) {
      console.error("Upload error:", uploadError);
      // Return the base64 image directly as fallback
      return new Response(JSON.stringify({ avatarUrl: imageDataUrl }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const publicUrl = `${supabaseUrl}/storage/v1/object/public/avatars/${filePath}`;
    return new Response(JSON.stringify({ avatarUrl: publicUrl }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("generate-avatar error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
