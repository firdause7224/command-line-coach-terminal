
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CommandPage from "./pages/CommandPage";
import NotFound from "./pages/NotFound";
import { CommandProvider } from "./providers/CommandProvider";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <CommandProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/command/:commandId" element={<CommandPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </CommandProvider>
  </QueryClientProvider>
);

export default App;
