import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SubscriptionProvider } from "@/contexts/SubscriptionContext";
import { TutorProvider } from "@/contexts/TutorContext";
import { PathProgressProvider } from "@/contexts/PathProgressContext";
import { NotificationProvider } from "@/contexts/NotificationContext";
import { PaywallModal } from "@/components/paywall/PaywallModal";
import { TutorButton } from "@/components/tutor/TutorButton";
import { TutorPanel } from "@/components/tutor/TutorPanel";
import Index from "./pages/Index";
import Geniuses from "./pages/Geniuses";
import GeniusProfile from "./pages/GeniusProfile";
import MyPath from "./pages/MyPath";
import PathOfGenius from "./pages/PathOfGenius";
import Progress from "./pages/Progress";
import Settings from "./pages/Settings";
import Auth from "./pages/Auth";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Support from "./pages/Support";
import IQTests from "./pages/IQTests";
import Feed from "./pages/Feed";
import ResetPassword from "./pages/ResetPassword";
import NotFound from "./pages/NotFound";
import { ScrollToTop } from "./components/ScrollToTop";

const queryClient = new QueryClient();

// Application root component
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <SubscriptionProvider>
        <TutorProvider>
          <PathProgressProvider>
            <NotificationProvider>
              <Toaster />
              <Sonner />
              <PaywallModal />
              <TutorButton />
              <TutorPanel />
              <BrowserRouter>
                <ScrollToTop />
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
                  <Route path="/reset-password" element={<ResetPassword />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </NotificationProvider>
          </PathProgressProvider>
        </TutorProvider>
      </SubscriptionProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
