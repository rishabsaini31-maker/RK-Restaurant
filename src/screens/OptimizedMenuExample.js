import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image, 
  TouchableOpacity, 
  ActivityIndicator,
  RefreshControl
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from '../theme';
import { useCart } from '../context/CartContext';
import { useCategories, useProducts } from '../api/menu';

export default function OptimizedMenuExample({ navigation }) {
  const [activeCategoryId, setActiveCategoryId] = useState(null);
  const { addToCart, totalItems } = useCart();

  // Fetch cached data via React Query
  const { 
    data: categories = [], 
    isLoading: isCategoriesLoading, 
    error: categoriesError 
  } = useCategories();

  const { 
    data: products = [], 
    isLoading: isProductsLoading, 
    error: productsError,
    refetch: refetchProducts,
    isRefetching
  } = useProducts();

  const isLoading = isCategoriesLoading || isProductsLoading;
  const error = categoriesError || productsError;

  // Filter products by selected category if one is active, otherwise show all
  const displayedProducts = activeCategoryId 
    ? products.filter(p => p.category_id === activeCategoryId)
    : products;

  if (isLoading && !isRefetching) {
    return (
      <SafeAreaView style={[styles.safeArea, styles.centered]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={styles.loadingText}>Loading delicious menu...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={[styles.safeArea, styles.centered]}>
        <MaterialIcons name="error-outline" size={48} color={theme.colors.error} />
        <Text style={styles.errorText}>{error.message || 'Something went wrong.'}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => refetchProducts()}>
          <Text style={styles.retryButtonText}>Tap to Retry</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Top Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <MaterialIcons name="eco" size={28} color={theme.colors.primary} />
          <Text style={styles.headerTitle}>RK Restaurant Menu</Text>
        </View>
      </View>

      <ScrollView 
        style={styles.container} 
        contentContainerStyle={{ paddingBottom: 100 }} 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl 
            refreshing={isRefetching} 
            onRefresh={refetchProducts} 
            colors={[theme.colors.primary]} 
          />
        }
      >
        {/* Categories Carousel */}
        {categories.length > 0 && (
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            contentContainerStyle={styles.categoriesContainer}
          >
            <TouchableOpacity 
              onPress={() => setActiveCategoryId(null)}
              style={[
                styles.categoryChip, 
                activeCategoryId === null ? styles.categoryChipActive : styles.categoryChipInactive
              ]}
            >
              <Text style={[
                styles.categoryText,
                activeCategoryId === null ? styles.categoryTextActive : styles.categoryTextInactive
              ]}>All</Text>
            </TouchableOpacity>

            {categories.map((cat) => (
              <TouchableOpacity 
                key={cat.id} 
                onPress={() => setActiveCategoryId(cat.id)}
                style={[
                  styles.categoryChip, 
                  activeCategoryId === cat.id ? styles.categoryChipActive : styles.categoryChipInactive
                ]}
              >
                <Text style={[
                  styles.categoryText,
                  activeCategoryId === cat.id ? styles.categoryTextActive : styles.categoryTextInactive
                ]}>{cat.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}

        {/* Products Grid */}
        <View style={styles.sectionContainer}>
          {displayedProducts.length === 0 ? (
             <View style={styles.emptyState}>
               <MaterialIcons name="restaurant-menu" size={48} color={theme.colors.outline} />
               <Text style={styles.emptyStateText}>No dishes available in this category.</Text>
             </View>
          ) : (
            <View style={styles.appetizersGrid}>
              {displayedProducts.map((item) => (
                <View key={item.id} style={styles.itemCard}>
                  {item.image_url && <Image source={{ uri: item.image_url }} style={styles.itemImage} />}
                  <View style={styles.itemContent}>
                    <View style={styles.itemHeader}>
                      <Text style={styles.itemName}>{item.name}</Text>
                      <View style={styles.vegBadge}><View style={styles.vegDot} /></View>
                    </View>
                    <Text style={styles.itemDesc} numberOfLines={2}>{item.description}</Text>
                    <View style={styles.itemFooter}>
                      <Text style={styles.itemPrice}>₹{item.price}</Text>
                      <TouchableOpacity style={styles.addButton} onPress={() => addToCart(item)}>
                        <MaterialIcons name="add" size={18} color={theme.colors.onPrimary} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>

      {/* Floating Action Button */}
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
  loadingText: { marginTop: 16, ...theme.typography.bodyMedium, color: theme.colors.onSurfaceVariant },
  errorText: { marginTop: 16, ...theme.typography.bodyMedium, color: theme.colors.error, textAlign: 'center' },
  retryButton: { marginTop: 24, paddingHorizontal: 24, paddingVertical: 12, backgroundColor: theme.colors.primary, borderRadius: 30 },
  retryButtonText: { color: theme.colors.onPrimary, fontWeight: 'bold' },
  header: { padding: theme.spacing.md, backgroundColor: 'rgba(250, 250, 249, 0.9)' },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  headerTitle: { ...theme.typography.h2, fontSize: 22, color: theme.colors.primary, marginLeft: 8 },
  container: { flex: 1 },
  categoriesContainer: { paddingHorizontal: theme.spacing.md, paddingVertical: theme.spacing.md, gap: theme.spacing.sm },
  categoryChip: { paddingHorizontal: 24, paddingVertical: 10, borderRadius: 30 },
  categoryChipActive: { backgroundColor: theme.colors.primary },
  categoryChipInactive: { backgroundColor: '#fee3d8' },
  categoryText: { ...theme.typography.labelSmall },
  categoryTextActive: { color: theme.colors.onPrimary },
  categoryTextInactive: { color: theme.colors.onSurfaceVariant },
  sectionContainer: { paddingHorizontal: theme.spacing.md, marginBottom: theme.spacing.lg },
  emptyState: { alignItems: 'center', marginTop: 40 },
  emptyStateText: { marginTop: 16, color: theme.colors.onSurfaceVariant, ...theme.typography.bodyMedium },
  appetizersGrid: { flexDirection: 'column', gap: theme.spacing.md },
  itemCard: { backgroundColor: '#ffffff', borderRadius: 24, overflow: 'hidden', ...theme.shadows.level1, marginBottom: theme.spacing.md },
  itemImage: { width: '100%', height: 180, resizeMode: 'cover' },
  itemContent: { padding: theme.spacing.md },
  itemHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  itemName: { ...theme.typography.h3, fontSize: 20, flex: 1 },
  vegBadge: { width: 14, height: 14, borderWidth: 1.5, borderColor: '#1b6d24', alignItems: 'center', justifyContent: 'center', borderRadius: 2 },
  vegDot: { width: 6, height: 6, backgroundColor: '#1b6d24', borderRadius: 3 },
  itemDesc: { ...theme.typography.bodyMedium, fontSize: 14, color: theme.colors.onSurfaceVariant, marginBottom: 16 },
  itemFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  itemPrice: { ...theme.typography.h2, fontSize: 20, color: theme.colors.primary },
  addButton: { width: 28, height: 28, borderRadius: 14, backgroundColor: theme.colors.primary, alignItems: 'center', justifyContent: 'center' },
  fab: { position: 'absolute', bottom: 24, right: 24, width: 64, height: 64, borderRadius: 32, backgroundColor: theme.colors.primary, alignItems: 'center', justifyContent: 'center', ...theme.shadows.level2 },
  fabBadge: { position: 'absolute', top: 0, right: 0, width: 24, height: 24, borderRadius: 12, backgroundColor: '#3d2d26', borderWidth: 2, borderColor: theme.colors.background, alignItems: 'center', justifyContent: 'center' },
  fabBadgeText: { color: theme.colors.background, fontSize: 10, fontWeight: 'bold' }
});
