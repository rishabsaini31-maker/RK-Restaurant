import React, { useState, useCallback, useMemo } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  Image, 
  TouchableOpacity, 
  ActivityIndicator,
  TextInput
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from '../theme';
import { useCart } from '../context/CartContext';
import { usePaginatedProducts } from '../api/menu';

/**
 * Custom Debounce Hook to prevent rapid API calls or repeated renders.
 */
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

/**
 * Memoized Item Component:
 * Prevents re-rendering of ALL items when just one item changes or the parent state changes.
 * Essential for FlatList performance with large datasets.
 */
const ProductItem = React.memo(({ item, onAdd }) => {
  return (
    <View style={styles.itemCard}>
      {/* 
        Image Optimization:
        In production, ensure you use a service (like Supabase storage transformations or an external CDN)
        to request specifically sized webp versions. (e.g., ?width=300&quality=80) 
        Here we use `fadeDuration` and standard cache policy.
      */}
      {item.image_url && (
        <Image 
          source={{ uri: item.image_url, cache: 'force-cache' }} 
          style={styles.itemImage} 
          fadeDuration={300}
        />
      )}
      <View style={styles.itemContent}>
        <View style={styles.itemHeader}>
          <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
          <View style={styles.vegBadge}><View style={styles.vegDot} /></View>
        </View>
        <Text style={styles.itemDesc} numberOfLines={2}>{item.description}</Text>
        <View style={styles.itemFooter}>
          <Text style={styles.itemPrice}>₹{item.price}</Text>
          <TouchableOpacity style={styles.addButton} onPress={() => onAdd(item)}>
            <MaterialIcons name="add" size={18} color={theme.colors.onPrimary} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}, (prevProps, nextProps) => prevProps.item.id === nextProps.item.id);

export default function HighTrafficMenuExample({ navigation }) {
  const { addToCart, totalItems } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Debounce the search input to avoid filtering rapidly on every keystroke
  const debouncedSearch = useDebounce(searchQuery, 300);

  // Use the paginated infinite query for handling large datasets in batches
  const { 
    data, 
    isLoading, 
    isError, 
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = usePaginatedProducts();

  // Flatten the pages array returned by useInfiniteQuery into a single array
  const allProducts = useMemo(() => {
    return data ? data.pages.flatMap(page => page.data) : [];
  }, [data]);

  // Filter based on the debounced search
  const displayedProducts = useMemo(() => {
    if (!debouncedSearch) return allProducts;
    return allProducts.filter(p => p.name.toLowerCase().includes(debouncedSearch.toLowerCase()));
  }, [allProducts, debouncedSearch]);

  // useCallback prevents recreating the function on every render, preserving the React.memo optimization
  const handleAddToCart = useCallback((item) => {
    addToCart(item);
  }, [addToCart]);

  const renderFooter = () => {
    if (!isFetchingNextPage) return <View style={{ height: 100 }} />; // Spacer for FAB
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color={theme.colors.primary} />
      </View>
    );
  };

  if (isLoading) {
    return (
      <SafeAreaView style={[styles.safeArea, styles.centered]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={styles.loadingText}>Loading optimized menu...</Text>
      </SafeAreaView>
    );
  }

  if (isError) {
    return (
      <SafeAreaView style={[styles.safeArea, styles.centered]}>
        <MaterialIcons name="error-outline" size={48} color={theme.colors.error} />
        <Text style={styles.errorText}>{error?.message || 'Error loading menu.'}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>High Performance Menu</Text>
        <TextInput 
          style={styles.searchInput}
          placeholder="Search products..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* 
        Optimized FlatList Setup:
        - keyExtractor: Unique key to avoid re-renders
        - initialNumToRender: Small number to render initial items instantly
        - maxToRenderPerBatch: Batches render calculations
        - windowSize: Keeps memory low by unmounting views far off-screen
        - onEndReached: Triggers the infinite scroll pagination
      */}
      <FlatList
        data={displayedProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ProductItem item={item} onAdd={handleAddToCart} />}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
      />

      {totalItems > 0 && (
        <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('Cart')}>
          <MaterialIcons name="shopping-bag" size={28} color={theme.colors.onPrimary} />
          <View style={styles.fabBadge}>
            <Text style={styles.fabBadgeText}>{totalItems}</Text>
          </View>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: theme.colors.background },
  centered: { justifyContent: 'center', alignItems: 'center' },
  loadingText: { marginTop: 16, color: theme.colors.onSurfaceVariant },
  errorText: { marginTop: 16, color: theme.colors.error },
  header: { padding: theme.spacing.md, backgroundColor: '#fff', elevation: 2 },
  headerTitle: { ...theme.typography.h2, fontSize: 22, color: theme.colors.primary, marginBottom: 12 },
  searchInput: { backgroundColor: '#f1f1f1', padding: 12, borderRadius: 8, fontSize: 16 },
  listContainer: { padding: theme.spacing.md },
  itemCard: { backgroundColor: '#ffffff', borderRadius: 16, overflow: 'hidden', ...theme.shadows.level1, marginBottom: 16, elevation: 2 },
  itemImage: { width: '100%', height: 160, resizeMode: 'cover' },
  itemContent: { padding: 12 },
  itemHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  itemName: { ...theme.typography.h3, fontSize: 18, flex: 1, marginRight: 8 },
  vegBadge: { width: 14, height: 14, borderWidth: 1.5, borderColor: '#1b6d24', alignItems: 'center', justifyContent: 'center', borderRadius: 2 },
  vegDot: { width: 6, height: 6, backgroundColor: '#1b6d24', borderRadius: 3 },
  itemDesc: { fontSize: 13, color: theme.colors.onSurfaceVariant, marginBottom: 12 },
  itemFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  itemPrice: { ...theme.typography.h2, fontSize: 18, color: theme.colors.primary },
  addButton: { width: 32, height: 32, borderRadius: 16, backgroundColor: theme.colors.primary, alignItems: 'center', justifyContent: 'center' },
  footerLoader: { paddingVertical: 20, alignItems: 'center', height: 100 },
  fab: { position: 'absolute', bottom: 24, right: 24, width: 64, height: 64, borderRadius: 32, backgroundColor: theme.colors.primary, alignItems: 'center', justifyContent: 'center', ...theme.shadows.level2 },
  fabBadge: { position: 'absolute', top: 0, right: 0, width: 24, height: 24, borderRadius: 12, backgroundColor: '#3d2d26', borderWidth: 2, borderColor: theme.colors.background, alignItems: 'center', justifyContent: 'center' },
  fabBadgeText: { color: theme.colors.background, fontSize: 10, fontWeight: 'bold' }
});
