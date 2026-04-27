import { supabase } from '../lib/supabase';
import { useQuery, useInfiniteQuery } from '@tanstack/react-query';

/**
 * Optimized query to fetch categories.
 * Prevents over-fetching by selecting only the required fields.
 */
export const fetchCategories = async () => {
  const { data, error } = await supabase
    .from('categories')
    .select('id, name');

  if (error) {
    console.error('Error fetching categories:', error);
    throw new Error('Failed to fetch categories. Please try again.');
  }

  return data;
};

/**
 * Optimized query to fetch products.
 * Selects only necessary fields (id, name, price, description, image_url, category_id)
 * to reduce payload size.
 */
export const fetchProducts = async () => {
  const { data, error } = await supabase
    .from('products')
    .select('id, name, price, image_url, category_id');

  if (error) {
    console.error('Error fetching products:', error);
    throw new Error('Failed to fetch products. Please try again.');
  }

  return data;
};

/**
 * Custom hook to consume categories with caching.
 * Caches the data for 5 minutes (staleTime).
 */
export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 2, // retry twice on failure
  });
};

/**
 * Custom hook to consume products with caching.
 * Caches the data for 5 minutes (staleTime).
 */
export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    staleTime: 1000 * 60 * 5, 
    retry: 2, 
  });
};

/**
 * Optimized Paginated Query to fetch products in batches.
 * Limits the number of items fetched to reduce DB load and memory usage.
 */
export const fetchPaginatedProducts = async ({ pageParam = 0, queryKey }) => {
  const [_key, categoryId] = queryKey;
  const PAGE_SIZE = 10;
  const from = pageParam * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  let query = supabase
    .from('products')
    .select('id, name, price, image_url, category_id');

  if (categoryId) {
    query = query.eq('category_id', categoryId);
  }

  const { data, error } = await query.range(from, to);

  if (error) {
    console.error('Error fetching paginated products:', error);
    throw new Error('Failed to load products.');
  }

  return {
    data,
    nextPage: data.length === PAGE_SIZE ? pageParam + 1 : undefined,
  };
};

/**
 * Custom hook to consume paginated products.
 * Uses useInfiniteQuery to seamlessly handle "load more" scrolling.
 */
export const usePaginatedProducts = (categoryId = null) => {
  return useInfiniteQuery({
    queryKey: ['paginatedProducts', categoryId],
    queryFn: fetchPaginatedProducts,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    staleTime: 1000 * 60 * 5,
  });
};
