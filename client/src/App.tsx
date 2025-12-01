import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { StoreProvider } from "./lib/store";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import ShopDetails from "@/pages/shop-details";
import BarberDashboard from "@/pages/barber-dashboard";
import AdminDashboard from "@/pages/admin-dashboard";
import AuthPage from "@/pages/auth";
import CustomerDashboard from "@/pages/customer-dashboard";
import AboutUs from "@/pages/about-us";
import ContactUs from "@/pages/contact-us";
import WriteReview from "@/pages/write-review";
import PrivacyPolicy from "@/pages/privacy-policy";
import TermsOfService from "@/pages/terms-of-service";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/auth" component={AuthPage} />
      <Route path="/shop/:id" component={ShopDetails} />
      <Route path="/barber-dashboard" component={BarberDashboard} />
      <Route path="/admin-dashboard" component={AdminDashboard} />
      <Route path="/customer-dashboard" component={CustomerDashboard} />
      <Route path="/about-us" component={AboutUs} />
      <Route path="/contact-us" component={ContactUs} />
      <Route path="/write-review" component={WriteReview} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/terms-of-service" component={TermsOfService} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <StoreProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </StoreProvider>
    </QueryClientProvider>
  );
}

export default App;
