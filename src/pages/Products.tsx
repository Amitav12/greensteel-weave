
import SEO from "@/components/seo/SEO";
import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Eye, Download, ArrowUpRight } from "lucide-react";

const categories = [
  { id: 'all', name: 'All Products', count: 24 },
  { id: 'coils', name: 'Steel Coils', count: 8 },
  { id: 'sheets', name: 'Steel Sheets', count: 6 },
  { id: 'pipes', name: 'Steel Pipes', count: 5 },
  { id: 'structural', name: 'Structural Steel', count: 5 }
];

const products = [
  {
    id: 1,
    category: 'coils',
    name: 'Hot Rolled Steel Coils',
    image: '/placeholder.svg',
    grade: 'IS 2062',
    thickness: '2.0-12.0mm',
    width: '1000-2000mm',
    description: 'Premium quality hot rolled steel coils for construction and industrial applications.'
  },
  {
    id: 2,
    category: 'sheets',
    name: 'Cold Rolled Steel Sheets',
    image: '/placeholder.svg',
    grade: 'ASTM A1008',
    thickness: '0.5-3.0mm',
    width: '800-1500mm',
    description: 'High-quality cold rolled sheets with superior surface finish.'
  },
  {
    id: 3,
    category: 'pipes',
    name: 'Seamless Steel Pipes',
    image: '/placeholder.svg',
    grade: 'API 5L',
    diameter: '21.3-914.4mm',
    thickness: '2.0-60.0mm',
    description: 'Durable seamless steel pipes for oil, gas, and water applications.'
  },
  {
    id: 4,
    category: 'structural',
    name: 'H-Beam Steel',
    image: '/placeholder.svg',
    grade: 'JIS G3101',
    size: '100x100-900x300mm',
    length: '6-12m',
    description: 'High-strength H-beam steel for construction projects.'
  },
  {
    id: 5,
    category: 'coils',
    name: 'Galvanized Steel Coils',
    image: '/placeholder.svg',
    grade: 'JIS G3302',
    thickness: '0.2-4.0mm',
    coating: 'Z60-Z450',
    description: 'Corrosion-resistant galvanized steel coils for roofing and cladding.'
  },
  {
    id: 6,
    category: 'sheets',
    name: 'Stainless Steel Sheets',
    image: '/placeholder.svg',
    grade: '304/316L',
    thickness: '0.3-6.0mm',
    finish: '2B/BA/No.4',
    description: 'Premium stainless steel sheets for food processing and chemical industries.'
  }
];

export default function Products() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Animate product cards
    gsap.fromTo(".product-card", 
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.6,
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".products-grid",
          start: "top 80%"
        }
      }
    );

    // Animate category filters
    gsap.fromTo(".category-filter", 
      { opacity: 0, x: -20 },
      { 
        opacity: 1, 
        x: 0, 
        duration: 0.4,
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".filters-section",
          start: "top 90%"
        }
      }
    );
  }, []);

  return (
    <main className="min-h-screen">
      <SEO title="Products — AAASHA TRADING LTD" description="Steel coils, sheets, structural steel, pipes, and recycled materials." />
      
      {/* Hero Section */}
      <section className="relative min-h-[50vh] grid place-items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/5" />
        <div className="absolute inset-0" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%232E7D32" fill-opacity="0.03"%3E%3Cpath d="M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm10 0c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
        }} />
        
        <div className="container relative z-10 py-16 text-center" data-aos="fade-up">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            Premium <span className="text-primary bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Steel Products</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore our comprehensive range of high-quality steel products and recycled materials for all your industrial needs.
          </p>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="container py-8 filters-section" data-aos="fade-up">
        <div className="rounded-2xl border border-[hsl(var(--glass-border))] bg-[hsl(var(--glass-bg))] backdrop-blur-md p-6 shadow-sm">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-background/50 border-[hsl(var(--glass-border))]"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`category-filter px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    activeCategory === category.id
                      ? 'bg-primary text-primary-foreground shadow-md'
                      : 'bg-background/50 text-muted-foreground hover:bg-primary/10 hover:text-primary'
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="container pb-16">
        <div className="products-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              className="product-card group relative rounded-2xl border border-[hsl(var(--glass-border))] bg-[hsl(var(--glass-bg))] backdrop-blur-md overflow-hidden shadow-[var(--shadow-elegant)] hover:shadow-[var(--shadow-glow)] transition-all duration-300 hover:-translate-y-2"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Product Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                
                {/* Action Buttons */}
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <Button size="sm" variant="glass" className="h-8 w-8 p-0">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="glass" className="h-8 w-8 p-0">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Product Info */}
              <div className="relative z-10 p-6">
                <div className="mb-3">
                  <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {product.description}
                  </p>
                </div>

                {/* Specifications */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Grade:</span>
                    <span className="font-medium">{product.grade}</span>
                  </div>
                  {product.thickness && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Thickness:</span>
                      <span className="font-medium">{product.thickness}</span>
                    </div>
                  )}
                  {product.width && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Width:</span>
                      <span className="font-medium">{product.width}</span>
                    </div>
                  )}
                  {product.diameter && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Diameter:</span>
                      <span className="font-medium">{product.diameter}</span>
                    </div>
                  )}
                </div>

                {/* CTA Button */}
                <Button className="w-full group/btn" variant="outline">
                  View Details
                  <ArrowUpRight className="ml-2 w-4 h-4 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="rounded-2xl border border-[hsl(var(--glass-border))] bg-[hsl(var(--glass-bg))] backdrop-blur-md p-12 max-w-md mx-auto">
              <Filter className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No products found</h3>
              <p className="text-muted-foreground text-sm">Try adjusting your search or filter criteria.</p>
            </div>
          </div>
        )}
      </section>

      {/* Call to Action */}
      <section className="container pb-16" data-aos="fade-up">
        <div className="text-center rounded-3xl border border-[hsl(var(--glass-border))] bg-[hsl(var(--glass-bg))] backdrop-blur-md p-12 shadow-[var(--shadow-elegant)] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/5" />
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-4">Need Custom Steel Solutions?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Our experts can help you find the perfect steel products for your specific requirements.
            </p>
            <Button variant="hero" size="lg">
              Request Quote
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
