import { Button } from "./button";
import { Recycle, Leaf, Zap, Sparkles, ArrowRight, Download, Eye, Palette } from "lucide-react";

export function ButtonShowcase() {
  return (
    <div className="p-12 space-y-12 bg-gradient-to-br from-white via-green-50/50 to-emerald-50/70 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_75%,rgba(34,197,94,0.08),transparent_50%),radial-gradient(circle_at_75%_25%,rgba(16,185,129,0.06),transparent_50%)]" />
      
      <div className="text-center space-y-4 relative z-10">
        <h2 className="text-5xl font-black text-gray-900 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
          Enhanced Eco-Themed Button Collection
        </h2>
        <p className="text-2xl text-gray-700 font-semibold">
          AAASHA TRADING LTD - Recycling & Steel Trading Website Buttons
        </p>
        <p className="text-lg text-gray-600">
          Glass morphism effects, green tint options, transparency controls, and eco-glow animations
        </p>
      </div>
      
      {/* Glass Morphism Variants */}
      <div className="space-y-6 relative z-10">
        <h3 className="text-3xl font-black text-gray-900 text-center">Glass Morphism Collection</h3>
        <div className="flex flex-wrap justify-center gap-6">
          <Button variant="hero" icon={<Sparkles />} shimmer>
            Hero Glass
          </Button>
          <Button variant="glass" icon={<Recycle />} greenTint="light">
            Pure Glass + Light Tint
          </Button>
          <Button variant="neon" icon={<Zap />} ecoGlow>
            Neon Glass + Eco Glow
          </Button>
          <Button variant="magnetic" icon={<ArrowRight />} iconPosition="right" magneticEffect>
            Magnetic Glass + Effect
          </Button>
          <Button variant="glow" icon={<Leaf />} greenTint="medium">
            Glow Glass + Medium Tint
          </Button>
        </div>
      </div>
      
      {/* Eco Theme Variants */}
      <div className="space-y-6 relative z-10">
        <h3 className="text-3xl font-black text-gray-900 text-center">Eco Theme Collection</h3>
        <div className="flex flex-wrap justify-center gap-6">
          <Button variant="eco-gradient" icon={<Leaf />} greenTint="dark" ecoGlow>
            Eco Gradient + Dark Tint
          </Button>
          <Button variant="transparent" icon={<Recycle />} transparency={25}>
            25% Transparent Eco
          </Button>
          <Button variant="recycled" icon={<Download />} greenTint="light">
            Recycled Material + Tint
          </Button>
          <Button variant="default" icon={<Sparkles />} ecoGlow magneticEffect>
            Default + All Effects
          </Button>
        </div>
      </div>
      
      {/* New Nature-Inspired Variants */}
      <div className="space-y-6 relative z-10">
        <h3 className="text-3xl font-black text-gray-900 text-center">Nature-Inspired Collection</h3>
        <div className="flex flex-wrap justify-center gap-6">
          <Button variant="eco-leaf" icon={<Leaf />} greenTint="light">
            Eco Leaf
          </Button>
          <Button variant="eco-forest" icon={<Sparkles />} greenTint="dark">
            Forest Green
          </Button>
          <Button variant="eco-mint" icon={<Eye />} transparency={15}>
            Fresh Mint
          </Button>
          <Button variant="eco-ripple" icon={<Palette />} ecoGlow>
            Eco Ripple
          </Button>
        </div>
      </div>
      
      {/* Sizes */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-900">Sizes</h3>
        <div className="flex flex-wrap items-center gap-4">
          <Button variant="eco-gradient" size="sm">
            Small
          </Button>
          <Button variant="eco-gradient" size="default">
            Default
          </Button>
          <Button variant="eco-gradient" size="lg">
            Large
          </Button>
          <Button variant="eco-gradient" size="xl">
            Extra Large
          </Button>
        </div>
      </div>
      
      {/* Enhanced Interactive Features */}
      <div className="space-y-6 relative z-10">
        <h3 className="text-3xl font-black text-gray-900 text-center">Enhanced Interactive Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="text-center space-y-3">
            <Button variant="hero" ripple icon={<Zap />} ecoGlow>
              Ripple + Eco Glow
            </Button>
            <p className="text-sm text-gray-600">ripple + ecoGlow</p>
          </div>
          <div className="text-center space-y-3">
            <Button variant="eco-gradient" loading greenTint="medium">
              Loading + Tint
            </Button>
            <p className="text-sm text-gray-600">loading + greenTint</p>
          </div>
          <div className="text-center space-y-3">
            <Button variant="glass" transparency={40} magneticEffect>
              40% Transparent + Magnetic
            </Button>
            <p className="text-sm text-gray-600">transparency + magnetic</p>
          </div>
          <div className="text-center space-y-3">
            <Button variant="recycled" greenTint="dark" ecoGlow shimmer>
              All Effects Combined
            </Button>
            <p className="text-sm text-gray-600">All new features</p>
          </div>
          <div className="text-center space-y-3">
            <Button variant="eco-leaf" transparency={20} greenTint="light">
              Leaf + Transparency
            </Button>
            <p className="text-sm text-gray-600">transparency + tint</p>
          </div>
          <div className="text-center space-y-3">
            <Button variant="magnetic" disabled greenTint="medium">
              Disabled + Tint
            </Button>
            <p className="text-sm text-gray-600">disabled state</p>
          </div>
        </div>
      </div>
      
      {/* Icon Variants with Enhanced Features */}
      <div className="space-y-6 relative z-10">
        <h3 className="text-3xl font-black text-gray-900 text-center">Enhanced Icon Variants</h3>
        <div className="flex flex-wrap justify-center gap-6">
          <Button variant="glass" size="icon" greenTint="light" ecoGlow>
            <Recycle />
          </Button>
          <Button variant="eco-gradient" size="icon-sm" transparency={30}>
            <Leaf />
          </Button>
          <Button variant="magnetic" size="icon-lg" magneticEffect greenTint="dark">
            <Sparkles />
          </Button>
          <Button variant="eco-leaf" size="icon" greenTint="medium">
            <Eye />
          </Button>
          <Button variant="eco-forest" size="icon-lg" ecoGlow>
            <Palette />
          </Button>
        </div>
      </div>
      
      {/* Transparency Showcase */}
      <div className="space-y-6 relative z-10">
        <h3 className="text-3xl font-black text-gray-900 text-center">Transparency Controls</h3>
        <div className="flex flex-wrap justify-center gap-6">
          <Button variant="glass" transparency={10} greenTint="light">
            10% Transparent
          </Button>
          <Button variant="glass" transparency={25} greenTint="medium">
            25% Transparent
          </Button>
          <Button variant="glass" transparency={40} greenTint="dark">
            40% Transparent
          </Button>
          <Button variant="glass" transparency={60} ecoGlow>
            60% Transparent + Glow
          </Button>
        </div>
      </div>
    </div>
  );
}