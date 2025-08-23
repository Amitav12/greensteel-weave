
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { HelmetProvider } from "react-helmet-async";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { BuildCheck } from "@/components/debug/BuildCheck";
import SiteHeader from "@/components/layout/SiteHeader";
import Footer from "@/components/layout/Footer";
import { AdminAuthProvider } from "@/context/AdminAuthContext";
import Index from "./pages/Index";
import About from "./pages/About";
import Products from "./pages/Products";
import Partners from "./pages/Partners";
import Certifications from "./pages/Certifications";
import News from "./pages/News";
import Contact from "./pages/Contact";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import { StrictMode } from "react";
import FerrousScrap from "@/pages/FerrousScrap";
import NonFerrousScrap from "@/pages/NonFerrousScrap";
import NonPrimeProducts from "@/pages/NonPrimeProducts";
import RubberScrap from "@/pages/RubberScrap";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: false,
    },
  },
});

const App = () => (
  <StrictMode>
    <ErrorBoundary>
      <BuildCheck />
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <TooltipProvider delayDuration={0} skipDelayDuration={500}>
              <AdminAuthProvider>
                <Toaster />
                <BrowserRouter>
                  <Routes>
                    {/* Admin Routes */}
                    <Route path="/admin/login" element={<AdminLogin />} />
                    <Route path="/admin/dashboard" element={<AdminDashboard />} />
                    
                    {/* Main Site Routes */}
                    <Route path="/*" element={
                      <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 transition-colors duration-300">
                        <SiteHeader />
                        <main className="flex-1">
                          <Routes>
                            <Route path="/" element={<Index />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/products" element={<Products />} />
                            <Route path="/commodities/ferrous-scrap" element={<FerrousScrap />} />
                            <Route path="/commodities/non-ferrous-scrap" element={<NonFerrousScrap />} />
                            <Route path="/commodities/non-prime-products" element={<NonPrimeProducts />} />
                            <Route path="/commodities/rubber-scrap" element={<RubberScrap />} />
                            <Route path="/partners" element={<Partners />} />
                            <Route path="/certifications" element={<Certifications />} />
                            <Route path="/news" element={<News />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="*" element={<NotFound />} />
                          </Routes>
                        </main>
                        <Footer />
                      </div>
                    } />
                  </Routes>
                </BrowserRouter>
              </AdminAuthProvider>
            </TooltipProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </HelmetProvider>
    </ErrorBoundary>
  </StrictMode>
);

export default App;
