import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "./card"
import { Button } from "./button"
import { Badge } from "./badge"
import { Leaf, Recycle, Zap, Sparkles, Eye, Palette, TreePine, Droplets } from "lucide-react"

export function CardShowcase() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 p-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            Enhanced Eco-Themed Card Collection
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Glass morphism cards with green accents, transparency controls, and recycling-themed effects for AAASHA TRADING LTD
          </p>
        </div>

        {/* Glass Morphism Cards */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-center text-gray-900">Glass Morphism Collection</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card variant="glass" greenTint="light">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5 text-green-600" />
                  Glass Effect
                </CardTitle>
                <CardDescription>
                  Frosted glass with light green tint
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Clean glass morphism with subtle green tinting for environmental theme.
                </p>
              </CardContent>
              <CardFooter>
                <Badge variant="outline">greenTint="light"</Badge>
              </CardFooter>
            </Card>

            <Card variant="transparent" transparency={25} ecoTexture>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-green-600" />
                  Transparent + Texture
                </CardTitle>
                <CardDescription>
                  25% transparent with eco texture
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Transparent background with subtle environmental texture patterns.
                </p>
              </CardContent>
              <CardFooter>
                <Badge variant="outline">transparency={25}</Badge>
              </CardFooter>
            </Card>

            <Card variant="holographic" greenTint="medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-green-600" />
                  Holographic
                </CardTitle>
                <CardDescription>
                  Animated holographic effects
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Dynamic holographic effects with medium green tinting.
                </p>
              </CardContent>
              <CardFooter>
                <Badge variant="outline">Animated</Badge>
              </CardFooter>
            </Card>
          </div>
        </div>

        {/* Eco-Themed Cards */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-center text-gray-900">Eco-Themed Collection</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card variant="eco" recycledEffect>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Leaf className="h-5 w-5 text-green-600" />
                  Eco Standard
                </CardTitle>
                <CardDescription>
                  Standard eco card with recycled effect
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Clean eco design with recycled material indicators.
                </p>
              </CardContent>
              <CardFooter>
                <Badge variant="outline">recycledEffect</Badge>
              </CardFooter>
            </Card>

            <Card variant="recycled" greenTint="dark" ecoTexture>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Recycle className="h-5 w-5 text-green-600" />
                  Recycled Material
                </CardTitle>
                <CardDescription>
                  Made from recycled materials
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Showcasing recycled materials with dark green tinting and texture.
                </p>
              </CardContent>
              <CardFooter>
                <Badge variant="outline">Dark Tint + Texture</Badge>
              </CardFooter>
            </Card>

            <Card variant="floating" glow>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-green-600" />
                  Floating Effect
                </CardTitle>
                <CardDescription>
                  Floating card with glow effect
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Elevated floating design with environmental glow effects.
                </p>
              </CardContent>
              <CardFooter>
                <Badge variant="outline">glow effect</Badge>
              </CardFooter>
            </Card>
          </div>
        </div>

        {/* Nature-Inspired Cards */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-center text-gray-900">Nature-Inspired Collection</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card variant="eco-leaf" greenTint="light" ecoTexture>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Leaf className="h-5 w-5 text-green-600" />
                  Leaf Design
                </CardTitle>
                <CardDescription>
                  Inspired by natural leaf patterns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Light, airy design inspired by fresh green leaves.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="eco-leaf" size="sm">
                  <Leaf className="h-3 w-3" />
                  Learn More
                </Button>
              </CardFooter>
            </Card>

            <Card variant="eco-forest" greenTint="dark">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-100">
                  <TreePine className="h-5 w-5 text-green-300" />
                  Forest Theme
                </CardTitle>
                <CardDescription className="text-green-200">
                  Deep forest green aesthetics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-green-200">
                  Rich, deep forest colors representing mature environmental practices.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="eco-forest" size="sm">
                  <TreePine className="h-3 w-3" />
                  Explore
                </Button>
              </CardFooter>
            </Card>

            <Card variant="eco-mint" transparency={20}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Droplets className="h-5 w-5 text-green-600" />
                  Fresh Mint
                </CardTitle>
                <CardDescription>
                  Fresh, clean mint aesthetics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Clean, refreshing design with mint green tones and transparency.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="eco-mint" size="sm">
                  <Droplets className="h-3 w-3" />
                  Refresh
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>

        {/* Advanced Effects Cards */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-center text-gray-900">Advanced Effects Collection</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card variant="eco-ripple" greenTint="medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-green-600" />
                  Ripple Effect
                </CardTitle>
                <CardDescription>
                  Animated ripple on hover
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Dynamic ripple animation representing water and environmental flow.
                </p>
              </CardContent>
              <CardFooter>
                <Badge variant="outline">Animated Ripple</Badge>
              </CardFooter>
            </Card>

            <Card variant="eco-crystal" recycledEffect ecoTexture>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-green-600" />
                  Crystal Effect
                </CardTitle>
                <CardDescription>
                  Crystal-like patterns and effects
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Crystalline patterns with recycled material indicators.
                </p>
              </CardContent>
              <CardFooter>
                <Badge variant="outline">Crystal + Recycled</Badge>
              </CardFooter>
            </Card>

            <Card variant="eco-gradient-glass" transparency={30} greenTint="dark">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5 text-green-600" />
                  Gradient Glass
                </CardTitle>
                <CardDescription>
                  Multi-layer gradient with glass effect
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Complex gradient overlays with glass morphism and transparency.
                </p>
              </CardContent>
              <CardFooter>
                <Badge variant="outline">Multi-layer</Badge>
              </CardFooter>
            </Card>
          </div>
        </div>

        {/* Interactive Features Demo */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-center text-gray-900">Interactive Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card variant="magnetic" greenTint="light" hover>
              <CardHeader>
                <CardTitle className="text-lg">Magnetic + Light Tint</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Magnetic hover with light green tinting.
                </p>
              </CardContent>
            </Card>

            <Card variant="neon" transparency={15} glow>
              <CardHeader>
                <CardTitle className="text-lg">Neon + Transparency</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Neon effects with 15% transparency and glow.
                </p>
              </CardContent>
            </Card>

            <Card variant="glass" recycledEffect ecoTexture greenTint="medium">
              <CardHeader>
                <CardTitle className="text-lg">All Effects Combined</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Glass + recycled + texture + medium tint.
                </p>
              </CardContent>
            </Card>

            <Card variant="eco-leaf" transparency={40} hover glow>
              <CardHeader>
                <CardTitle className="text-lg">Leaf + 40% Transparent</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Leaf design with high transparency.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Size Variations */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-center text-gray-900">Size Variations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card variant="eco-gradient-glass" size="sm" greenTint="light">
              <CardHeader>
                <CardTitle className="text-base">Small Card</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-gray-600">Compact eco card design.</p>
              </CardContent>
            </Card>

            <Card variant="eco-gradient-glass" size="default" greenTint="medium">
              <CardHeader>
                <CardTitle>Default Card</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">Standard size eco card with medium tint.</p>
              </CardContent>
            </Card>

            <Card variant="eco-gradient-glass" size="lg" greenTint="dark" ecoTexture>
              <CardHeader>
                <CardTitle className="text-xl">Large Card</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">Large eco card with dark tint and texture effects.</p>
              </CardContent>
            </Card>

            <Card variant="eco-gradient-glass" size="xl" recycledEffect glow>
              <CardHeader>
                <CardTitle className="text-2xl">Extra Large</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-base text-gray-600">Extra large card with all eco effects enabled.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}