import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border">
        <div className="container max-w-3xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link to="/" className="p-2 -ml-2 hover:bg-muted rounded-full transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="font-display text-xl font-semibold">Terms of Service</h1>
        </div>
      </header>

      <main className="container max-w-3xl mx-auto px-4 py-8">
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <p className="text-muted-foreground text-sm mb-6">
            Last updated: February 15, 2026
          </p>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Agreement to Terms</h2>
            <p className="text-foreground/80 leading-relaxed">
              By downloading, accessing, or using Path of a Genius ("the App"), you agree 
              to be bound by these Terms of Service. If you do not agree to these terms, 
              please do not use the App.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Description of Service</h2>
            <p className="text-foreground/80 leading-relaxed">
              Path of a Genius is an educational application that provides curated learning 
              paths based on the curricula of history's greatest minds. The App offers both 
              free and premium content, with premium content available through subscription 
              or lifetime purchase.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">User Accounts</h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              To access certain features, you may need to create an account. You are 
              responsible for:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground/80">
              <li>Maintaining the confidentiality of your account credentials</li>
              <li>All activities that occur under your account</li>
              <li>Notifying us immediately of any unauthorized access</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Subscriptions & Payments</h2>
            <h3 className="text-lg font-medium mb-2">Pricing</h3>
            <ul className="list-disc pl-6 space-y-2 text-foreground/80 mb-4">
              <li><strong>Monthly Subscription:</strong> Includes a 7-day free trial. After the trial, US$19.99/month, billed automatically. Auto-renews until cancelled.</li>
              <li><strong>Lifetime Access:</strong> US$89.99 (one-time purchase, no recurring charges)</li>
            </ul>
            
            <h3 className="text-lg font-medium mb-2">Free Trial</h3>
            <p className="text-foreground/80 leading-relaxed mb-4">
              The monthly subscription includes a 7-day free trial. If you do not cancel before the 
              trial ends, you will be automatically charged US$19.99/month. You can cancel at any time 
              in your device's subscription settings.
            </p>

            <h3 className="text-lg font-medium mb-2">Billing</h3>
            <p className="text-foreground/80 leading-relaxed mb-4">
              All purchases are processed through Apple's App Store. Monthly subscriptions 
              automatically renew unless cancelled at least 24 hours before the end of the 
              current billing period. Payment will be charged to your Apple ID account.</p>

            <h3 className="text-lg font-medium mb-2">Cancellation</h3>
            <p className="text-foreground/80 leading-relaxed">
              You can manage and cancel your subscription through your Apple ID account 
              settings. Cancellation will take effect at the end of your current billing 
              period.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Acceptable Use</h2>
            <p className="text-foreground/80 leading-relaxed mb-4">You agree not to:</p>
            <ul className="list-disc pl-6 space-y-2 text-foreground/80">
              <li>Use the App for any unlawful purpose</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Reproduce, distribute, or share premium content without authorization</li>
              <li>Interfere with or disrupt the App's functionality</li>
              <li>Use automated means to access the App</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Intellectual Property</h2>
            <p className="text-foreground/80 leading-relaxed">
              All content in the App, including but not limited to text, graphics, images, 
              and software, is the property of Path of a Genius or its content suppliers 
              and is protected by intellectual property laws. The educational content is 
              curated from public domain sources and original materials.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Disclaimer of Warranties</h2>
            <p className="text-foreground/80 leading-relaxed">
              The App is provided "as is" without warranties of any kind. We do not 
              guarantee that the App will be uninterrupted, error-free, or completely 
              secure. Educational content is provided for informational purposes and 
              should not replace formal education.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Limitation of Liability</h2>
            <p className="text-foreground/80 leading-relaxed">
              To the maximum extent permitted by law, Path of a Genius shall not be liable 
              for any indirect, incidental, special, consequential, or punitive damages 
              arising from your use of the App.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Changes to Terms</h2>
            <p className="text-foreground/80 leading-relaxed">
              We reserve the right to modify these Terms at any time. We will notify users 
              of material changes through the App or via email. Continued use of the App 
              after changes constitutes acceptance of the new Terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
            <p className="text-foreground/80 leading-relaxed">
              For questions about these Terms, please contact us at:
            </p>
            <p className="text-primary font-medium mt-2">
              support@pathofagenius.com
            </p>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Terms;
