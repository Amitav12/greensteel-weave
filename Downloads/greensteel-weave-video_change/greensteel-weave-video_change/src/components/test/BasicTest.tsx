import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Recycle, Leaf, Zap } from "lucide-react";

export function BasicTest() {
  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          UI Components Test
        </h1>
        
        {/* Button Test */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Buttons</h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="default">Default Button</Button>
            <Button variant="hero">Hero Button</Button>
            <Button variant="glass">Glass Button</Button>
            <Button variant="eco-gradient">Eco Gradient</Button>
            <Button variant="transparent">Transparent</Button>
          </div>
        </div>
        
        {/* Card Test */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Cards</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card variant="glass">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Recycle className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle>Glass Card</CardTitle>
                <CardDescription>This is a glass morphism card</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="eco-gradient" className="w-full">Learn More</Button>
              </CardContent>
            </Card>
            
            <Card variant="eco">
              <CardHeader>
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                  <Leaf className="w-6 h-6 text-emerald-600" />
                </div>
                <CardTitle>Eco Card</CardTitle>
                <CardDescription>This is an eco-themed card</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="hero" className="w-full">Explore</Button>
              </CardContent>
            </Card>
            
            <Card variant="floating">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>Floating Card</CardTitle>
                <CardDescription>This is a floating card with hover effects</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="magnetic" className="w-full">Get Started</Button>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Status */}
        <div className="text-center p-8 bg-green-50 rounded-lg">
          <h3 className="text-xl font-bold text-green-800 mb-2">✅ Components Working!</h3>
          <p className="text-green-600">If you can see this, the basic UI components are functioning correctly.</p>
        </div>
      </div>
    </div>
  );
}