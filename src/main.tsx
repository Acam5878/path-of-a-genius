import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { LearningPathProvider } from "./contexts/LearningPathContext";
import { initializeRevenueCat } from "./lib/revenuecat";

// Initialize RevenueCat early
initializeRevenueCat();

createRoot(document.getElementById("root")!).render(
  <LearningPathProvider>
    <App />
  </LearningPathProvider>
);