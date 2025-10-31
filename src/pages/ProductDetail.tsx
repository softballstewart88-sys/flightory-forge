import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProductByHandle } from "@/lib/shopify";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, ArrowLeft, ShoppingCart } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { useState } from "react";

const ProductDetail = () => {
  const { handle } = useParams();
  const addItem = useCartStore(state => state.addItem);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  
  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', handle],
    queryFn: () => getProductByHandle(handle!),
    enabled: !!handle,
  });

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center pt-16">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      </>
    );
  }

  if (error || !product) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center pt-16">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">Product Not Found</h1>
            <Link to="/">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </>
    );
  }

  const selectedVariant = product.variants.edges[selectedVariantIndex]?.node;
  const price = parseFloat(selectedVariant?.price.amount || "0");
  const currency = selectedVariant?.price.currencyCode || "USD";

  const handleAddToCart = () => {
    if (!selectedVariant) return;
    
    addItem({
      product: { node: product },
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity: 1,
      selectedOptions: selectedVariant.selectedOptions,
    });
    
    toast.success("Added to cart", {
      position: "top-center",
    });
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-24 pb-12">
        <div className="container mx-auto px-4">
          <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-primary mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Products
          </Link>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-4">
              {product.images.edges.map((image, index) => (
                <Card key={index} className="overflow-hidden border-border">
                  <img
                    src={image.node.url}
                    alt={image.node.altText || product.title}
                    className="w-full aspect-square object-cover"
                  />
                </Card>
              ))}
            </div>
            
            <div className="space-y-8">
              <div>
                <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
                  {product.title}
                </h1>
                <p className="text-3xl font-bold text-primary mb-6">
                  {currency} {price.toFixed(2)}
                </p>
                <p className="text-lg text-muted-foreground whitespace-pre-wrap">
                  {product.description}
                </p>
              </div>
              
              {product.options.length > 0 && (
                <Card className="card-gradient border-border">
                  <CardContent className="p-6">
                    {product.options.map((option, optionIndex) => (
                      <div key={optionIndex} className="space-y-3">
                        <label className="text-sm font-semibold">{option.name}</label>
                        <div className="flex flex-wrap gap-2">
                          {product.variants.edges.map((variant, variantIndex) => {
                            const optionValue = variant.node.selectedOptions.find(
                              opt => opt.name === option.name
                            )?.value;
                            
                            return (
                              <Button
                                key={variantIndex}
                                variant={selectedVariantIndex === variantIndex ? "default" : "outline"}
                                onClick={() => setSelectedVariantIndex(variantIndex)}
                              >
                                {optionValue}
                              </Button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}
              
              <Button 
                size="lg" 
                className="w-full text-lg glow-effect"
                onClick={handleAddToCart}
                disabled={!selectedVariant?.availableForSale}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
