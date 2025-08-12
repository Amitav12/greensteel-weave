import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Recycle, Leaf, Zap, ArrowRight } from "lucide-react";

export default function TestSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-white via-green-50/30 to-emerald-50/50 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(34,197,94,0.1),transparent_50%),radial-gradient(circle_at_80%_20%,rgba(16,185,129,0.08),transparent_50%),radial-gradient(circle_at_40%_40%,rgba(34,197,94,0.05),transparent_50%)]" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black text-gray-900 mb-6 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
            Skipper UI Glass Components
          </h2>
          <p className="text-2xl text-gray-700 font-semibold">
            Eye-catching glass morphism with green & white theme
          </p>
        </div>

        {/* Enhanced Button Tests */}
        <div className="mb-20">
          <h3 className="text-3xl font-black text-gray-900 mb-12 text-center">Skipper UI Button Variants</h3>
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            <Button variant="hero" size="lg" icon={<Recycle />}>
              Hero Glass
            </Button>
            <Button variant="glass" size="lg" icon={<Leaf />}>
              Pure Glass
            </Button>
            <Button variant="eco-gradient" size="lg" icon={<Zap />}>
              Eco Gradient
            </Button>
            <Button variant="neon" size="lg" icon={<ArrowRight />} iconPosition="right">
              Neon Effect
            </Button>
            <Button variant="magnetic" size="lg">
              Magnetic Hover
            </Button>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6">
            <Button variant="transparent" size="lg">
              Transparent
            </Button>
            <Button variant="recycled" size="lg">
              Recycled Theme
            </Button>
            <Button variant="glow" size="lg">
              Glow Effect
            </Button>
          </div>
        </div>

        {/* Enhanced Card Tests */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card variant="glass" hover glow>
            <CardHeader>
              <div className="w-16 h-16 bg-gradient-to-br from-green-400/20 to-emerald-500/20 backdrop-blur-xl rounded-2xl flex items-center justify-center mb-6 border border-white/30">
                <Recycle className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle className="text-gray-900 text-2xl">Pure Glass Morphism</CardTitle>
              <CardDescription className="text-gray-700 text-lg">
                Stunning glass effect with advanced backdrop blur and eye-catching hover animations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="glass" className="w-full">
                Experience Glass
              </Button>
            </CardContent>
          </Card>

          <Card variant="neon" hover glow>
            <CardHeader>
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-400/30 to-green-500/30 backdrop-blur-xl rounded-2xl flex items-center justify-center mb-6 border-2 border-green-400/50">
                <Leaf className="w-8 h-8 text-emerald-600" />
              </div>
              <CardTitle className="text-gray-900 text-2xl">Neon Eco Theme</CardTitle>
              <CardDescription className="text-gray-700 text-lg">
                Futuristic neon effects with environmental green gradients and glowing borders
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="neon" className="w-full">
                Activate Neon
              </Button>
            </CardContent>
          </Card>

          <Card variant="holographic" hover>
            <CardHeader>
              <div className="w-16 h-16 bg-gradient-to-br from-green-400/20 via-emerald-400/20 to-teal-400/20 backdrop-blur-xl rounded-2xl flex items-center justify-center mb-6 border border-white/40">
                <Zap className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle className="text-gray-900 text-2xl">Holographic Effect</CardTitle>
              <CardDescription className="text-gray-700 text-lg">
                Advanced holographic card with rainbow shimmer and dynamic color transitions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="magnetic" className="w-full">
                Enter Hologram
              </Button>
            </CardContent>
          </Card>

          <Card variant="magnetic" hover>
            <CardHeader>
              <div className="w-16 h-16 bg-gradient-to-br from-green-100/80 to-emerald-200/80 backdrop-blur-xl rounded-2xl flex items-center justify-center mb-6 border border-green-300/60">
                <ArrowRight className="w-8 h-8 text-green-700" />
              </div>
              <CardTitle className="text-gray-900 text-2xl">Magnetic Hover</CardTitle>
              <CardDescription className="text-gray-700 text-lg">
                Extreme magnetic hover effects with 3D transforms and dynamic scaling
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="hero" className="w-full">
                Feel the Magnetism
              </Button>
            </CardContent>
          </Card>

          <Card variant="floating" hover>
            <CardHeader>
              <div className="w-16 h-16 bg-gradient-to-br from-white/60 to-green-100/60 backdrop-blur-xl rounded-2xl flex items-center justify-center mb-6 border border-white/50">
                <Recycle className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle className="text-gray-900 text-2xl">Floating Dreams</CardTitle>
              <CardDescription className="text-gray-700 text-lg">
                Ethereal floating effect with smooth elevation and rotation animations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="glow" className="w-full">
                Float Away
              </Button>
            </CardContent>
          </Card>

          <Card variant="transparent" hover>
            <CardHeader>
              <div className="w-16 h-16 bg-transparent backdrop-blur-xl rounded-2xl flex items-center justify-center mb-6 border-2 border-green-400/60">
                <Leaf className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle className="text-gray-900 text-2xl">Pure Transparency</CardTitle>
              <CardDescription className="text-gray-700 text-lg">
                Crystal clear transparency with subtle green accents and smooth interactions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="transparent" className="w-full">
                See Through
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}