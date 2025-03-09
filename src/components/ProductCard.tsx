
import React, { useState } from 'react';
import { Product, CartItem } from '@/services/supabase';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Info, Plus, Minus } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  
  const handleAddToCart = () => {
    const cartItem: CartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      image: product.image,
    };
    
    addToCart(cartItem);
    
    // Reset quantity after adding to cart
    setQuantity(1);
    
    // Add bounce effect on button
    const button = document.getElementById(`add-to-cart-${product.id}`);
    if (button) {
      button.classList.add('cart-bounce');
      setTimeout(() => {
        button.classList.remove('cart-bounce');
      }, 500);
    }
  };
  
  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(prev => prev + 1);
    }
  };
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };
  
  return (
    <Card 
      className={cn(
        "overflow-hidden transition-all duration-300 hover:shadow-md border-border/40",
        "hover:border-border/80 h-full flex flex-col animate-scaleIn"
      )}
    >
      {/* Product image with category badge */}
      <div className="relative overflow-hidden aspect-square bg-secondary/50">
        <Badge 
          className="absolute top-3 left-3 z-10 bg-background/80 backdrop-blur-sm text-foreground font-medium"
        >
          {product.category}
        </Badge>
        
        {!isImageLoaded && (
          <div className="absolute inset-0 bg-muted animate-pulse" />
        )}
        
        <img
          src={product.image}
          alt={product.name}
          className={cn(
            "object-cover w-full h-full transition-all duration-500",
            isImageLoaded ? "opacity-100" : "opacity-0",
            "hover:scale-105 transition-transform duration-500"
          )}
          onLoad={() => setIsImageLoaded(true)}
        />
        
        <Button
          variant="secondary"
          size="icon"
          className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm hover:bg-background"
          onClick={() => setShowDetails(!showDetails)}
        >
          <Info className="h-4 w-4" />
        </Button>
      </div>
      
      {/* Product details */}
      <CardContent className="flex-grow p-4">
        <h3 className="font-semibold text-lg mb-1 text-foreground">{product.name}</h3>
        <p className="text-xl font-bold text-primary">${product.price.toFixed(2)}</p>
        
        {showDetails && (
          <div className="mt-3 animate-fadeIn">
            <p className="text-muted-foreground text-sm">{product.description}</p>
            <p className="text-sm mt-2">
              <span className={product.stock > 0 ? "text-green-600" : "text-red-500"}>
                {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
              </span>
            </p>
          </div>
        )}
      </CardContent>
      
      {/* Add to cart section */}
      <CardFooter className="p-4 pt-0 flex flex-col space-y-3">
        {/* Quantity selector */}
        <div className="flex items-center space-x-2 w-full">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={decrementQuantity}
            disabled={quantity <= 1}
            className="h-8 w-8"
          >
            <Minus className="h-3 w-3" />
          </Button>
          
          <span className="flex-grow text-center text-sm font-medium">
            {quantity}
          </span>
          
          <Button 
            variant="outline" 
            size="icon" 
            onClick={incrementQuantity}
            disabled={quantity >= product.stock}
            className="h-8 w-8"
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
        
        {/* Add to cart button */}
        <Button 
          id={`add-to-cart-${product.id}`}
          onClick={handleAddToCart}
          className="w-full btn-hover"
          disabled={product.stock === 0}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
