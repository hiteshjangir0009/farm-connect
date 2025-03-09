
import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem } from '@/services/supabase';
import { toast } from '@/components/ui/use-toast';

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    // Load cart from localStorage on initial render
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Calculate the total number of items in cart
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
  
  // Calculate the subtotal
  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  // Add item to cart
  const addToCart = (item: CartItem) => {
    setCart(currentCart => {
      // Check if item already exists in cart
      const existingItemIndex = currentCart.findIndex(cartItem => cartItem.id === item.id);
      
      if (existingItemIndex >= 0) {
        // Item exists, update quantity
        const updatedCart = [...currentCart];
        updatedCart[existingItemIndex].quantity += item.quantity;
        
        toast({
          title: 'Cart updated',
          description: `${item.name} quantity increased to ${updatedCart[existingItemIndex].quantity}`,
        });
        
        return updatedCart;
      } else {
        // Item doesn't exist, add it
        toast({
          title: 'Added to cart',
          description: `${item.name} added to your cart`,
        });
        
        return [...currentCart, item];
      }
    });
  };

  // Remove item from cart
  const removeFromCart = (id: number) => {
    setCart(currentCart => {
      const item = currentCart.find(item => item.id === id);
      const filteredCart = currentCart.filter(item => item.id !== id);
      
      if (item) {
        toast({
          title: 'Removed from cart',
          description: `${item.name} removed from your cart`,
        });
      }
      
      return filteredCart;
    });
  };

  // Update item quantity
  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) return;
    
    setCart(currentCart => 
      currentCart.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  // Clear the entire cart
  const clearCart = () => {
    setCart([]);
    toast({
      title: 'Cart cleared',
      description: 'All items have been removed from your cart',
    });
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    itemCount,
    subtotal
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// Custom hook to use the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
