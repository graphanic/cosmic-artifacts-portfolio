import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { StormModeProvider } from "@/components/storm-mode-toggle";
import { SoundProvider } from "@/components/sound-controller";
import { LoadingScreen } from "@/components/loading-screen";
import Home from "@/pages/home";
import ArtworkPage from "@/pages/artwork";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/artwork/:id" component={ArtworkPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <StormModeProvider>
          <SoundProvider>
            <LoadingScreen />
            <Toaster />
            <Router />
          </SoundProvider>
        </StormModeProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
