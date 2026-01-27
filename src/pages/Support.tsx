import { ArrowLeft, Mail, MessageCircle, BookOpen, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Support = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border">
        <div className="container max-w-3xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link to="/" className="p-2 -ml-2 hover:bg-muted rounded-full transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="font-display text-xl font-semibold">Support</h1>
        </div>
      </header>

      <main className="container max-w-3xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-display font-semibold mb-2">How can we help?</h2>
          <p className="text-muted-foreground">
            We're here to help you get the most out of your learning journey.
          </p>
        </div>

        <div className="grid gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">Email Support</CardTitle>
                  <CardDescription>Get help via email</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/80 mb-4">
                For any questions, issues, or feedback, reach out to our support team. 
                We typically respond within 24-48 hours.
              </p>
              <Button asChild className="w-full">
                <a href="mailto:support@pathofagenius.com">
                  Contact Support
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <HelpCircle className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">Frequently Asked Questions</CardTitle>
                  <CardDescription>Quick answers to common questions</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-1">How do I cancel my subscription?</h4>
                <p className="text-sm text-muted-foreground">
                  Go to Settings → View Plans → Manage Subscription, or manage it directly 
                  in your Apple ID account settings under Subscriptions.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-1">Can I restore my purchases on a new device?</h4>
                <p className="text-sm text-muted-foreground">
                  Yes! Go to Settings and tap "Restore Purchases" to restore any previous 
                  subscriptions or lifetime purchases.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-1">How do I sync my progress across devices?</h4>
                <p className="text-sm text-muted-foreground">
                  Sign in with the same account on all your devices. Your progress syncs 
                  automatically when you're connected to the internet.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-1">What's included in the free version?</h4>
                <p className="text-sm text-muted-foreground">
                  Free users get full access to John Stuart Mill's curriculum, including 
                  all lessons, quizzes, and study materials.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <BookOpen className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">About the App</CardTitle>
                  <CardDescription>Learn more about Path of a Genius</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/80">
                Path of a Genius offers curated learning paths based on the education of 
                history's greatest minds. From ancient languages to advanced physics, 
                experience how geniuses like Einstein, Da Vinci, and Marie Curie were educated.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center text-sm text-muted-foreground space-y-2">
          <p>
            <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
            {" • "}
            <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link>
          </p>
          <p>Path of a Genius © 2025</p>
        </div>
      </main>
    </div>
  );
};

export default Support;
