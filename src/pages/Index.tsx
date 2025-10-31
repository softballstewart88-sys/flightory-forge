import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ProductGrid } from "@/components/ProductGrid";
import { Features } from "@/components/Features";
import { About } from "@/components/About";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      
      <section id="products" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-center mb-16">
            Featured Drones
          </h2>
          <ProductGrid />
        </div>
      </section>
      
      <Features />
      <About />
      
      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2025 Flightory Drones. Ohio-based drone manufacturing excellence.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
