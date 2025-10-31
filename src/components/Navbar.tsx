import { Link } from "react-router-dom";
import { Plane } from "lucide-react";
import { CartDrawer } from "./CartDrawer";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Plane className="h-6 w-6 text-primary" />
          <span className="font-display text-xl font-bold">Flightory Drones</span>
        </Link>
        
        <div className="flex items-center gap-6">
          <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/#products" className="text-sm font-medium hover:text-primary transition-colors">
            Products
          </Link>
          <Link to="/#about" className="text-sm font-medium hover:text-primary transition-colors">
            About
          </Link>
          <CartDrawer />
        </div>
      </div>
    </nav>
  );
};
