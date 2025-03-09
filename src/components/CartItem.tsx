
import React from 'react';
import { CartItem as CartItemType } from '@/services/supabase';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Trash, Plus, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const [imageLoaded, setImageLoaded] = React.useState(false);
  
  const incrementQuantity = () => {
    updateQuantity(item.id, item.quantity + 1);
  };
  
  const decrementQuantity = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    }
  };
  
  const handleRemove = () => {
    removeFromCart(item.id);
  };
  
  const itemTotal = item.price * item.quantity;
  
  return (
    <div className="flex items-center gap-4 py-4 border-b border-border/60 animate-fadeIn">
      {/* Product image */}
      <div className="relative h-20 w-20 rounded-md overflow-hidden bg-secondary/50">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-muted animate-pulse" />
        )}
        <img
          src={item.image}
          alt={item.name}
          className={cn(
            "h-full w-full object-cover transition-opacity duration-300",
            imageLoaded ? "opacity-100" : "opacity-0"
          )}
          onLoad={() => setImageLoaded(true)}
        />
      </div>
      
      {/* Product details */}
      <div className="flex-grow">
        <h3 className="font-medium text-foreground">{item.name}</h3>
        <p className="text-muted-foreground text-sm">${item.price.toFixed(2)} each</p>
      </div>
      
      {/* Quantity controls */}
      <div className="flex items-center space-x-2">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={decrementQuantity}
          disabled={item.quantity <= 1}
          className="h-8 w-8"
        >
          <Minus className="h-3 w-3" />
        </Button>
        
        <span className="w-8 text-center font-medium">{item.quantity}</span>
        
        <Button 
          variant="outline" 
          size="icon" 
          onClick={incrementQuantity}
          className="h-8 w-8"
        >
          <Plus className="h-3 w-3" />
        </Button>
      </div>
      
      {/* Item total */}
      <div className="w-24 text-right">
        <p className="font-semibold">${itemTotal.toFixed(2)}</p>
      </div>
      
      {/* Remove button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={handleRemove}
        className="text-muted-foreground hover:text-destructive"
        aria-label="Remove item"
      >
        <Trash className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default CartItem;
