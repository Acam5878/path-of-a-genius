import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SubscriptionProvider } from "@/contexts/SubscriptionContext";
import { TutorProvider } from "@/contexts/TutorContext";
// PathProgressContext merged into LearningPathContext
import { NotificationProvider } from "@/contexts/NotificationContext";
import { PaywallModal } from "@/components/paywall/PaywallModal";
import { TutorButton } from "@/components/tutor/TutorButton";
import { TutorPanel } from "@/components/tutor/TutorPanel";
import { ScrollToTop } from "./components/ScrollToTop";

// Eagerly load the home page; lazy-load everything else
import Index from "./pages/Index";
const Geniuses = lazy(() => import("./pages/Geniuses"));
const GeniusProfile = lazy(() => import("./pages/GeniusProfile"));
const MyPath = lazy(() => import("./pages/MyPath"));
const PathOfGenius = lazy(() => import("./pages/PathOfGenius"));
const Progress = lazy(() => import("./pages/Progress"));
const Settings = lazy(() => import("./pages/Settings"));
const Auth = lazy(() => import("./pages/Auth"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const Support = lazy(() => import("./pages/Support"));
const IQTests = lazy(() => import("./pages/IQTests"));
const Feed = lazy(() => import("./pages/Feed"));
const SegmentLanding = lazy(() => import("./pages/SegmentLanding"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const NotFound = lazy(() => import("./pages/NotFound"));

const PageLoader = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="w-6 h-6 border-2 border-secondary border-t-transparent rounded-full animate-spin" />
  </div>
);

const queryClient = new QueryClient();

// Application root component
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <SubscriptionProvider>
        <TutorProvider>
          <NotificationProvider>
            <Toaster />
            <Sonner />
            <PaywallModal />
            <TutorPanel />
            <BrowserRouter>
              <ScrollToTop />
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/geniuses" element={<Geniuses />} />
                  <Route path="/genius/:id" element={<GeniusProfile />} />
                  <Route path="/my-path" element={<MyPath />} />
                  <Route path="/the-path" element={<PathOfGenius />} />
                  <Route path="/progress" element={<Progress />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="/support" element={<Support />} />
                  <Route path="/iq-tests" element={<IQTests />} />
                  <Route path="/feed" element={<Feed />} />
                  <Route path="/for/:segment" element={<SegmentLanding />} />
                  <Route path="/reset-password" element={<ResetPassword />} />
                  <Route path="/~oauth" element={<div className="min-h-screen bg-background flex items-center justify-center"><div className="w-6 h-6 border-2 border-secondary border-t-transparent rounded-full animate-spin" /></div>} />
                  <Route path="/~oauth/*" element={<div className="min-h-screen bg-background flex items-center justify-center"><div className="w-6 h-6 border-2 border-secondary border-t-transparent rounded-full animate-spin" /></div>} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </BrowserRouter>
          </NotificationProvider>
        </TutorProvider>
      </SubscriptionProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
