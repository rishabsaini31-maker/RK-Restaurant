import { useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';

export function useRestaurantData() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [profile, setProfile] = useState(null);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 1. Fetch Categories
  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const { data, error: dbError } = await supabase
        .from('categories')
        .select('*')
        .order('created_at', { ascending: true });

      if (dbError) throw dbError;
      setCategories(data);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching categories:", err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // 2. Fetch Products by Category
  const fetchProductsByCategory = useCallback(async (categoryId) => {
    try {
      setLoading(true);
      setError(null);
      
      let query = supabase
        .from('products')
        .select('*')
        .eq('is_available', true);
        
      if (categoryId) {
        query = query.eq('category_id', categoryId);
      }

      const { data, error: dbError } = await query;

      if (dbError) throw dbError;
      setProducts(data);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching products:", err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // 3. Insert Order
  const submitOrder = async (cartItems, totalPrice, customerName, customerPhone) => {
    try {
      setLoading(true);
      setError(null);
      const { data, error: dbError } = await supabase
        .from('orders')
        .insert([
          {
            items: cartItems,
            total_price: totalPrice,
            customer_name: customerName,
            customer_phone: customerPhone,
            status: 'pending'
          }
        ])
        .select()
        .single();

      if (dbError) throw dbError;
      return { success: true, order: data };
    } catch (err) {
      setError(err.message);
      console.error("Error submitting order:", err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // 4. Fetch Profile
  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError) throw authError;
      
      if (user) {
        const { data, error: dbError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (dbError) throw dbError;
        setProfile(data);
      }
    } catch (err) {
      setError(err.message);
      console.error("Error fetching profile:", err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    categories,
    products,
    profile,
    loading,
    error,
    fetchCategories,
    fetchProductsByCategory,
    submitOrder,
    fetchProfile
  };
}
