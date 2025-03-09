
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import CartItem from '@/components/CartItem';
import { Button } from '@/components/ui/button';
import { ShoppingCart, ArrowRight, Trash2, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';

const Cart = () => {
  const { cart, clearCart, subtotal, itemCount } = useCart();
  
  // Calculate shipping (free above $50)
  const shipping = subtotal < 50 && subtotal > 0 ? 10 : 0;
  
  // Calculate total
  const total = subtotal + shipping;
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return `$${amount.toFixed(2)}`;
  };
  
  return (
    <div className="page-transition pt-24 pb-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
        
        {cart.length === 0 ? (
          <div className="text-center py-16 max-w-md mx-auto">
            <div className="mb-6 text-muted-foreground">
              <ShoppingCart className="h-16 w-16 mx-auto opacity-30" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Button asChild className="btn-hover">
              <Link to="/products">Browse Products</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="col-span-2">
              <div className="bg-card rounded-lg border border-border/50 overflow-hidden">
                <div className="p-6 flex justify-between">
                  <h2 className="text-xl font-semibold">Cart Items ({itemCount})</h2>
                  <Button 
                    variant="ghost" 
                    className="text-muted-foreground hover:text-destructive"
                    onClick={clearCart}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear Cart
                  </Button>
                </div>
                
                <Separator />
                
                <div className="p-6">
                  {cart.map(item => (
                    <CartItem key={item.id} item={item} />
                  ))}
                </div>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="col-span-1">
              <div className="bg-card rounded-lg border border-border/50 overflow-hidden sticky top-24">
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>{formatCurrency(subtotal)}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>
                        {shipping === 0 ? 'Free' : formatCurrency(shipping)}
                      </span>
                    </div>
                    
                    <Separator className="my-2" />
                    
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>{formatCurrency(total)}</span>
                    </div>
                  </div>
                  
                  {subtotal < 50 && (
                    <Alert className="mb-4 bg-primary/5 text-primary border-primary/20">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Free Shipping</AlertTitle>
                      <AlertDescription>
                        Add {formatCurrency(50 - subtotal)} more to qualify for free shipping.
                      </AlertDescription>
                    </Alert>
                  )}
                  
                  <Button asChild className="w-full btn-hover mb-3">
                    <Link to="/checkout">
                      Proceed to Checkout
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/products">Continue Shopping</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
