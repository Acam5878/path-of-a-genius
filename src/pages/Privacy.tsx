import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border">
        <div className="container max-w-3xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link to="/" className="p-2 -ml-2 hover:bg-muted rounded-full transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="font-display text-xl font-semibold">Privacy Policy</h1>
        </div>
      </header>

      <main className="container max-w-3xl mx-auto px-4 py-8">
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <p className="text-muted-foreground text-sm mb-6">
            Last updated: February 15, 2026
          </p>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Introduction</h2>
            <p className="text-foreground/80 leading-relaxed">
              Path of a Genius ("we", "our", or "us") is committed to protecting your privacy. 
              This Privacy Policy explains how we collect, use, and safeguard your information 
              when you use our mobile application.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Information We Collect</h2>
            <h3 className="text-lg font-medium mb-2">Account Information</h3>
            <p className="text-foreground/80 leading-relaxed mb-4">
              When you create an account, we collect your email address and any display name 
              you choose to provide. This information is used to identify your account and 
              sync your learning progress across devices.
            </p>
            
            <h3 className="text-lg font-medium mb-2">Learning Progress</h3>
            <p className="text-foreground/80 leading-relaxed mb-4">
              We store your learning progress, including completed lessons, quiz scores, 
              study streaks, and time spent learning. This data is used to provide 
              personalized learning experiences and track your educational journey.
            </p>

            <h3 className="text-lg font-medium mb-2">Usage Analytics</h3>
            <p className="text-foreground/80 leading-relaxed">
              We collect anonymous usage data to improve our app, including which features 
              are used most frequently and general performance metrics.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-2 text-foreground/80">
              <li>To provide and maintain the app's functionality</li>
              <li>To sync your learning progress across devices</li>
              <li>To personalize your learning experience</li>
              <li>To process subscriptions and payments (via Apple's App Store)</li>
              <li>To improve our app and develop new features</li>
              <li>To communicate with you about your account or the app</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Data Storage & Security</h2>
            <p className="text-foreground/80 leading-relaxed">
              Your data is securely stored using industry-standard encryption and security 
              practices. We use Supabase for our backend infrastructure, which provides 
              enterprise-grade security measures including encrypted data transmission 
              and secure data storage.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Third-Party Services</h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              We use the following third-party services:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground/80">
              <li><strong>Apple App Store:</strong> For processing in-app purchases and subscriptions</li>
              <li><strong>RevenueCat:</strong> For subscription management</li>
              <li><strong>Supabase:</strong> For secure data storage and authentication</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Your Rights</h2>
            <p className="text-foreground/80 leading-relaxed mb-4">You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2 text-foreground/80">
              <li>Access your personal data</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your account and data</li>
              <li>Export your learning progress data</li>
              <li>Opt out of promotional communications</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Children's Privacy</h2>
            <p className="text-foreground/80 leading-relaxed">
              Our app is designed for users of all ages interested in learning. For users 
              under 13, we recommend parental supervision. We do not knowingly collect 
              personal information from children under 13 without parental consent.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Changes to This Policy</h2>
            <p className="text-foreground/80 leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of 
              any changes by updating the "Last updated" date at the top of this policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
            <p className="text-foreground/80 leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us at:
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

export default Privacy;
