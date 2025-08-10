import { Button } from "@/components/ui/button";
import { Recycle, ArrowRight } from "lucide-react";

export function SimpleHero() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-white via-green-50 to-emerald-100 flex items-center justify-center">
      <div className="container mx-auto px-6 text-center">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mb-6">
            <Recycle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-gray-900 mb-6">
            AAASHA TRADING LTD
          </h1>
          <h2 className="text-4xl md:text-6xl font-bold text-green-600 mb-8">
            Transforming Waste into Value
          </h2>
          <p className="text-2xl text-gray-700 mb-12 max-w-4xl mx-auto">
            Leading the future of sustainable recycling and premium steel trading with environmental responsibility.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Button 
            variant="hero" 
            size="xl"
            className="text-xl px-12 py-6 font-bold"
          >
            <Recycle className="w-6 h-6 mr-3" />
            Explore Our Recycling
          </Button>
          <Button 
            variant="glass" 
            size="xl"
            className="text-xl px-12 py-6 font-bold"
          >
            Get Started Today
            <ArrowRight className="w-6 h-6 ml-3" />
          </Button>
        </div>
      </div>
    </section>
  );
}