import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AboutMe from "./pages/AboutMe";
import BeyondWork from "./pages/BeyondWork";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import TheLab from "./pages/TheLab";
import CustomCursor from "./components/CustomCursor";

const queryClient = new QueryClient();

import SmoothScroll from "./components/SmoothScroll";
import { SoundProvider } from "./context/SoundContext";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <SoundProvider>
      <SmoothScroll>
        <TooltipProvider>
          <CustomCursor />
          <Toaster />
          <Sonner />
          <HashRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about-me" element={<AboutMe />} />
              <Route path="/beyond-work" element={<BeyondWork />} />
              <Route path="/lab" element={<TheLab />} />
              <Route path="/contact" element={<Contact />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </HashRouter>
        </TooltipProvider>
      </SmoothScroll>
    </SoundProvider>
  </QueryClientProvider>
);

export default App;
