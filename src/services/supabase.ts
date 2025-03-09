
import { createClient } from '@supabase/supabase-js';
import { toast } from '@/components/ui/use-toast';

// Get environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if environment variables are set
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase environment variables are not set. Please check your .env file for VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY');
  // Add a more user-friendly error message in development
  if (import.meta.env.DEV) {
    document.body.innerHTML = `
      <div style="padding: 2rem; text-align: center; font-family: system-ui;">
        <h1>Environment Variable Error</h1>
        <p>Supabase environment variables are missing. Please check your .env file for:</p>
        <pre style="background: #f1f1f1; padding: 1rem; text-align: left; display: inline-block;">
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key</pre>
      </div>
    `;
  }
}

// Initialize the Supabase client with fallback to empty strings to prevent crashes
// This will allow the app to render, even if API calls will fail
const supabase = createClient(
  supabaseUrl || 'https://mpgbupisahyxtrnhqphd.supabase.co',
  supabaseAnonKey || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1wZ2J1cGlzYWh5eHRybmhxcGhkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE1MDU1MDksImV4cCI6MjA1NzA4MTUwOX0.G_Cumf_qpV4pttW0h1H9T6lQSy3AAoSQULtI2vgR8ig'
);

// Define types for our data
export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  created_at?: string;
};

export type Order = {
  id?: number;
  user_email: string;
  full_name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  total: number;
  items: CartItem[];
  created_at?: string;
  status?: string;
};

export type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

// Supabase API functions
export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('name');
    
    if (error) {
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error('Error fetching products:', error);
    toast({
      title: 'Error',
      description: 'Failed to load products. Please try again later.',
      variant: 'destructive',
    });
    return [];
  }
};

export const submitOrder = async (order: Order): Promise<{success: boolean, orderId?: number}> => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .insert([order])
      .select('id')
      .single();
    
    if (error) {
      throw error;
    }
    
    return { success: true, orderId: data?.id };
  } catch (error) {
    console.error('Error submitting order:', error);
    toast({
      title: 'Error',
      description: 'Failed to submit your order. Please try again.',
      variant: 'destructive',
    });
    return { success: false };
  }
};

export default supabase;
