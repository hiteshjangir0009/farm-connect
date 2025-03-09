
import { createClient } from '@supabase/supabase-js';
import { toast } from '@/components/ui/use-toast';

// Get environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if environment variables are set
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase environment variables are not set. Please create a .env file with VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY');
}

// Initialize the Supabase client
const supabase = createClient(
  supabaseUrl || '',
  supabaseAnonKey || ''
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
