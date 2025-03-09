
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { submitOrder, Order } from '@/services/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { 
  CreditCard, 
  CheckCircle2, 
  ShieldCheck,
  Truck,
  AlertCircle,
  Loader2 
} from 'lucide-react';
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';

type FormErrors = {
  [key: string]: string;
};

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, subtotal, clearCart } = useCart();
  const [submitting, setSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState<number | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    cardName: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: ''
  });
  
  // Form validation errors
  const [errors, setErrors] = useState<FormErrors>({});
  
  // Shipping calculation (free above $50)
  const shipping = subtotal < 50 && subtotal > 0 ? 10 : 0;
  
  // Calculate total
  const total = subtotal + shipping;
  
  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  // Validate form fields
  const validateForm = () => {
    const newErrors: FormErrors = {};
    
    // Required fields
    const requiredFields = [
      'email', 'fullName', 'address', 'city', 'state', 'zip',
      'cardName', 'cardNumber', 'cardExpiry', 'cardCvc'
    ];
    
    requiredFields.forEach(field => {
      if (!formData[field as keyof typeof formData].trim()) {
        newErrors[field] = 'This field is required';
      }
    });
    
    // Email validation
    if (formData.email && !/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // ZIP/Postal code (simple 5-digit validation)
    if (formData.zip && !/^\d{5}(-\d{4})?$/.test(formData.zip)) {
      newErrors.zip = 'Please enter a valid ZIP code';
    }
    
    // Card number (simple validation for 16 digits)
    if (formData.cardNumber && !/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
      newErrors.cardNumber = 'Please enter a valid 16-digit card number';
    }
    
    // Card expiry (MM/YY format)
    if (formData.cardExpiry && !/^\d{2}\/\d{2}$/.test(formData.cardExpiry)) {
      newErrors.cardExpiry = 'Please use MM/YY format';
    }
    
    // CVC/CVV (3 or 4 digits)
    if (formData.cardCvc && !/^\d{3,4}$/.test(formData.cardCvc)) {
      newErrors.cardCvc = 'Please enter a valid CVC/CVV';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if cart is empty
    if (cart.length === 0) {
      toast({
        title: 'Cart is empty',
        description: 'Please add some items to your cart before checking out.',
        variant: 'destructive',
      });
      navigate('/products');
      return;
    }
    
    // Validate form
    if (!validateForm()) {
      toast({
        title: 'Form validation error',
        description: 'Please check the form for errors and try again.',
        variant: 'destructive',
      });
      
      // Scroll to first error
      const firstErrorField = Object.keys(errors)[0];
      document.getElementsByName(firstErrorField)[0]?.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
      });
      
      return;
    }
    
    setSubmitting(true);
    
    try {
      // Prepare order data
      const orderData: Order = {
        user_email: formData.email,
        full_name: formData.fullName,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zip: formData.zip,
        total: total,
        items: cart,
        status: 'pending'
      };
      
      // Submit order to Supabase
      const { success, orderId: newOrderId } = await submitOrder(orderData);
      
      if (success && newOrderId) {
        // Clear cart
        clearCart();
        
        // Set order complete state
        setOrderComplete(true);
        setOrderId(newOrderId);
        
        toast({
          title: 'Order Placed Successfully!',
          description: `Order #${newOrderId} has been placed. Thank you for your purchase!`,
        });
      } else {
        throw new Error('Failed to create order');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      toast({
        title: 'Checkout Error',
        description: 'There was a problem processing your order. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return `$${amount.toFixed(2)}`;
  };
  
  if (orderComplete) {
    return (
      <div className="page-transition pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-md">
          <Card className="animate-scaleIn">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 bg-primary/10 p-3 rounded-full">
                <CheckCircle2 className="h-10 w-10 text-primary" />
              </div>
              <CardTitle className="text-2xl">Order Confirmed!</CardTitle>
              <CardDescription>
                Thank you for your purchase
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="mb-2">
                <span className="font-medium">Order Number:</span> #{orderId}
              </p>
              <p className="mb-6">
                We've sent a confirmation email to <span className="font-medium">{formData.email}</span>
              </p>
              
              <Alert className="mb-4 bg-primary/5 text-primary-foreground border-primary/20">
                <Truck className="h-4 w-4 mr-2" />
                <AlertDescription>
                  Your order will be shipped within 1-2 business days.
                </AlertDescription>
              </Alert>
              
              <div className="text-center mt-6">
                <Button
                  onClick={() => navigate('/products')}
                  className="w-full"
                >
                  Continue Shopping
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
  
  return (
    <div className="page-transition pt-24 pb-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        
        {cart.length === 0 ? (
          <div className="text-center py-10">
            <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground opacity-40 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">
              Add some items to your cart before proceeding to checkout.
            </p>
            <Button 
              onClick={() => navigate('/products')}
            >
              Browse Products
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="col-span-2">
              <form onSubmit={handleSubmit}>
                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                    <CardDescription>
                      We'll use this to send your order confirmation
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={errors.email ? 'border-destructive' : ''}
                        />
                        {errors.email && (
                          <p className="text-sm text-destructive">{errors.email}</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle>Shipping Address</CardTitle>
                    <CardDescription>
                      Enter the address where you want your order delivered
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          className={errors.fullName ? 'border-destructive' : ''}
                        />
                        {errors.fullName && (
                          <p className="text-sm text-destructive">{errors.fullName}</p>
                        )}
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="address">Street Address</Label>
                        <Input
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          className={errors.address ? 'border-destructive' : ''}
                        />
                        {errors.address && (
                          <p className="text-sm text-destructive">{errors.address}</p>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="city">City</Label>
                          <Input
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            className={errors.city ? 'border-destructive' : ''}
                          />
                          {errors.city && (
                            <p className="text-sm text-destructive">{errors.city}</p>
                          )}
                        </div>
                        
                        <div className="grid gap-2">
                          <Label htmlFor="state">State</Label>
                          <Input
                            id="state"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            className={errors.state ? 'border-destructive' : ''}
                          />
                          {errors.state && (
                            <p className="text-sm text-destructive">{errors.state}</p>
                          )}
                        </div>
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="zip">ZIP Code</Label>
                        <Input
                          id="zip"
                          name="zip"
                          value={formData.zip}
                          onChange={handleChange}
                          className={errors.zip ? 'border-destructive' : ''}
                        />
                        {errors.zip && (
                          <p className="text-sm text-destructive">{errors.zip}</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle>Payment Information</CardTitle>
                    <CardDescription>
                      Enter your card details (demo only, no real payments)
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="cardName">Name on Card</Label>
                        <Input
                          id="cardName"
                          name="cardName"
                          value={formData.cardName}
                          onChange={handleChange}
                          className={errors.cardName ? 'border-destructive' : ''}
                        />
                        {errors.cardName && (
                          <p className="text-sm text-destructive">{errors.cardName}</p>
                        )}
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input
                          id="cardNumber"
                          name="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={formData.cardNumber}
                          onChange={handleChange}
                          className={errors.cardNumber ? 'border-destructive' : ''}
                        />
                        {errors.cardNumber && (
                          <p className="text-sm text-destructive">{errors.cardNumber}</p>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="cardExpiry">Expiry Date</Label>
                          <Input
                            id="cardExpiry"
                            name="cardExpiry"
                            placeholder="MM/YY"
                            value={formData.cardExpiry}
                            onChange={handleChange}
                            className={errors.cardExpiry ? 'border-destructive' : ''}
                          />
                          {errors.cardExpiry && (
                            <p className="text-sm text-destructive">{errors.cardExpiry}</p>
                          )}
                        </div>
                        
                        <div className="grid gap-2">
                          <Label htmlFor="cardCvc">CVC/CVV</Label>
                          <Input
                            id="cardCvc"
                            name="cardCvc"
                            placeholder="123"
                            value={formData.cardCvc}
                            onChange={handleChange}
                            className={errors.cardCvc ? 'border-destructive' : ''}
                          />
                          {errors.cardCvc && (
                            <p className="text-sm text-destructive">{errors.cardCvc}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <ShieldCheck className="mr-2 h-4 w-4" />
                      Your payment information is secure
                    </div>
                    <div className="flex items-center">
                      <CreditCard className="mr-2 h-5 w-5 text-muted-foreground" />
                    </div>
                  </CardFooter>
                </Card>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate('/cart')}
                    className="flex-1"
                  >
                    Return to Cart
                  </Button>
                  
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="flex-1"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      'Complete Order'
                    )}
                  </Button>
                </div>
              </form>
            </div>
            
            {/* Order Summary */}
            <div className="col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                  <CardDescription>
                    {cart.length} {cart.length === 1 ? 'item' : 'items'} in your cart
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="max-h-80 overflow-y-auto pr-2 mb-4">
                    {cart.map(item => (
                      <div key={item.id} className="flex py-2">
                        <div className="h-16 w-16 rounded bg-secondary/50 overflow-hidden mr-3">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex-grow">
                          <p className="font-medium text-sm">{item.name}</p>
                          <p className="text-muted-foreground text-sm">
                            {item.quantity} × ${item.price.toFixed(2)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">
                            ${(item.quantity * item.price).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>{formatCurrency(subtotal)}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>{shipping === 0 ? 'Free' : formatCurrency(shipping)}</span>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex justify-between font-semibold text-lg pt-2">
                      <span>Total</span>
                      <span>{formatCurrency(total)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
