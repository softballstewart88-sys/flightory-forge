import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";
import { ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";

interface ProductCardProps {
  product: ShopifyProduct;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const addItem = useCartStore(state => state.addItem);
  const { node } = product;
  
  const price = parseFloat(node.priceRange.minVariantPrice.amount);
  const currency = node.priceRange.minVariantPrice.currencyCode;
  const image = node.images.edges[0]?.node.url;
  const defaultVariant = node.variants.edges[0]?.node;

  const handleAddToCart = () => {
    if (!defaultVariant) return;
    
    addItem({
      product,
      variantId: defaultVariant.id,
      variantTitle: defaultVariant.title,
      price: defaultVariant.price,
      quantity: 1,
      selectedOptions: defaultVariant.selectedOptions,
    });
    
    toast.success("Added to cart", {
      position: "top-center",
    });
  };

  return (
    <Card className="card-gradient hover-lift overflow-hidden group border-border">
      <Link to={`/product/${node.handle}`}>
        <div className="aspect-square overflow-hidden bg-muted">
          {image ? (
            <img
              src={image}
              alt={node.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-muted-foreground">No image</span>
            </div>
          )}
        </div>
      </Link>
      
      <CardContent className="p-6">
        <Link to={`/product/${node.handle}`}>
          <h3 className="font-display text-xl font-bold mb-2 hover:text-primary transition-colors">
            {node.title}
          </h3>
        </Link>
        <p className="text-muted-foreground line-clamp-2 mb-4">
          {node.description || "No description available"}
        </p>
        <p className="text-2xl font-bold text-primary">
          {currency} {price.toFixed(2)}
        </p>
      </CardContent>
      
      <CardFooter className="p-6 pt-0">
        <Button 
          onClick={handleAddToCart}
          className="w-full"
          disabled={!defaultVariant?.availableForSale}
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};
