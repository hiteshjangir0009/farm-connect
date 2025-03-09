
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import CartItem from '@/components/CartItem';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { AlertCircle, ShoppingCart, Wheat, IndianRupee } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

const Cart = () => {
  const navigate = useNavigate();
  const { cart, clearCart, subtotal } = useCart();
  
  // Calculate shipping (free above ₹3000)
  const shipping = subtotal < 3000 && subtotal > 0 ? 250 : 0;
  
  // Calculate total
  const total = subtotal + shipping;
  
  return (
    <div className="page-transition pt-24 pb-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>
        
        {cart.length === 0 ? (
          <div className="text-center py-16">
            <div className="mb-4">
              <ShoppingCart className="h-16 w-16 mx-auto text-muted-foreground opacity-30" />
            </div>
            <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Looks like you haven't added any products to your cart yet.
              Browse our selection of premium farm products and find something you'll love.
            </p>
            <Button 
              onClick={() => navigate('/products')} 
              size="lg"
              className="animate-fadeIn"
            >
              <Wheat className="mr-2 h-5 w-5" />
              Browse Products
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-6">
                  <div className="mb-4 flex justify-between">
                    <h2 className="text-xl font-semibold">
                      {cart.length} {cart.length === 1 ? 'Item' : 'Items'}
                    </h2>
                    <Button
                      variant="ghost"
                      onClick={clearCart}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      Clear Cart
                    </Button>
                  </div>
                  
                  <div className="space-y-1">
                    {cart.map(item => (
                      <CartItem key={item.id} item={item} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="flex items-center">
                        <IndianRupee className="h-3 w-3 mr-1" />
                        {subtotal.toFixed(2)}
                      </span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="flex items-center">
                        {shipping === 0 ? (
                          'Free'
                        ) : (
                          <>
                            <IndianRupee className="h-3 w-3 mr-1" />
                            {shipping.toFixed(2)}
                          </>
                        )}
                      </span>
                    </div>
                    
                    <div className="pt-2">
                      <p className="text-xs text-muted-foreground mb-2">
                        {subtotal < 3000 ? (
                          <>
                            Add <span className="font-medium">
                              <IndianRupee className="h-3 w-3 inline-block" />
                              {(3000 - subtotal).toFixed(2)}
                            </span> more for free shipping
                          </>
                        ) : (
                          'You have qualified for free shipping!'
                        )}
                      </p>
                      
                      <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                        <div 
                          className="bg-primary h-full transition-all duration-500"
                          style={{ 
                            width: `${Math.min(100, (subtotal / 3000) * 100)}%`
                          }}
                        />
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex justify-between pt-2 font-semibold text-lg">
                      <span>Total</span>
                      <span className="flex items-center">
                        <IndianRupee className="h-4 w-4 mr-1" />
                        {total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Button 
                    onClick={() => navigate('/checkout')}
                    className="w-full"
                    size="lg"
                  >
                    Proceed to Checkout
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
