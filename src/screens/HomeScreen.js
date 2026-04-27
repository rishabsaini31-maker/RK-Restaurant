import React from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Image, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from '../theme';
import { useCart } from '../context/CartContext';

const { width } = Dimensions.get('window');

const CATEGORIES = ['Pure Veg', 'Jain Food', 'South Indian', 'North Indian', 'Snacks', 'Beverages'];

import { useProducts } from '../api/menu';

export default function HomeScreen({ navigation }) {
  const { addToCart } = useCart();
  
  // Use global cache for fast loading
  const { data: allProducts = [], isLoading } = useProducts();

  // Simulate curated lists from the live DB
  const specials = allProducts.slice(0, 4);
  const popularDishes = allProducts.slice(4, 8);
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Top Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <MaterialIcons name="eco" size={28} color={theme.colors.primary} />
          <Text style={styles.headerTitle}>RK Restaurant</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Image 
            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCw5_Rz8SHwVPExXUpm5pmB8Jhx0NT6r9yrfduOL1IocnycgJ_Jb5gVCAnnLhVXzpra5akp5qKE765vYW2TVQGfvw6Lr2g6hBc7bmI8yZov4D0eM0Z2WKTxMlJUGw_1XgyaVjgQVi7gTWvKPuXZJy4UH2SPFIjwa6ndJrawnvfgibQnbwimnX3lEB2NibLHjs4pO6ARPF9pKfIwP052WS4OPueQUYl6jQAUe8QyQabUEPAD6jHNPvBENxz0XnAIzsdqklaEyHmJ2AWo' }} 
            style={styles.profileImage} 
          />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <View style={styles.heroImageContainer}>
            <Image 
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCoioOjlsIuOoX3Xo1ldyEwYrrg1RpZxenPgSYxlJO-FLdovbIdW2XEtGQ7zO_T4a_Yswctd-t7iOEiLXDdW8DhdibBKaxu2jbnUKSiuvCUPeKAdxtEHMR2dURTOTGgz8XmnVelhvgbMM2j0LcMGnSiai_7XOAT9-1-vZqANxYjwwwf_oc0Mu1Eu3KKImVBCJWHNOQmdmUP25IaZIAWUkR0ue3r2EJxkvk701USQZHE7n9zynnESDZzxDCqVpShBkznSShEmoJF3sYF' }}
              style={styles.heroImage}
            />
          </View>
          <Text style={styles.heroText}>Pure flavors, conscious soul.</Text>

          <View style={styles.searchContainer}>
            <MaterialIcons name="search" size={24} color={theme.colors.outline} style={styles.searchIcon} />
            <TextInput 
              style={styles.searchInput}
              placeholder="Search for artisanal vegetarian delicacies..."
              placeholderTextColor={theme.colors.outline}
            />
          </View>
        </View>

        {/* Categories */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesContainer}>
          {CATEGORIES.map((cat, index) => (
            <TouchableOpacity 
              key={index} 
              style={[
                styles.categoryChip, 
                index === 0 && styles.categoryChipActive
              ]}
              onPress={() => navigation.navigate('Menu')}
            >
              <Text style={[
                styles.categoryText,
                index === 0 && styles.categoryTextActive
              ]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Heritage Stories */}
        <View style={styles.sectionContainer}>
          <View style={styles.heritageCard}>
            <Image 
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA8JTSATGxYKOBdHMK71PoM9Gg8A58Mhi_0DAR6h91QRLiZMLHxIaY93vUXAgvPCVjC-Q2aypV2MR_c0Z2U-6AAMaCvIAk3KAXPWAgJ7rjJfpbZd_VpbN5vJaJRyqd-EZ-CKu3g-7Yrt3dS5mg9ges09E_E8P1IwxHdRqmKuGWxgOkAip7zFC-8KpVA86Dv1d95JIMqC1KVrD_JXHgEZGJ_r53Bk1Eu8pP566vKtkHJvb7PBKOrgIBgJUrFwf3jOHI37hk1ilqpU2_J' }}
              style={styles.heritageImage}
            />
            <View style={styles.heritageOverlay}>
              <Text style={styles.heritageSubtitle}>HERITAGE STORIES</Text>
              <Text style={styles.heritageTitle}>The Art of Cold-Pressed Saffron</Text>
              <Text style={styles.heritageDesc}>Discover how we source our world-class Kesari from the valleys of Pampore.</Text>
            </View>
          </View>
        </View>

        {/* Chef's Signature Specials */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Chef's Signature Specials</Text>
          <View style={styles.gridContainer}>
            {isLoading ? (
              <Text style={{ textAlign: 'center', margin: 20 }}>Loading live specials...</Text>
            ) : specials.map(dish => (
              <View key={dish.id} style={styles.dishCard}>
                <Image source={{ uri: dish.image_url, cache: 'force-cache' }} style={styles.dishImage} />
                <Text style={styles.dishName} numberOfLines={1}>{dish.name}</Text>
                <Text style={styles.dishDesc} numberOfLines={1}>{dish.description}</Text>
                <View style={styles.dishFooter}>
                  <Text style={styles.dishPrice}>₹{dish.price}</Text>
                  <TouchableOpacity style={styles.addButton} onPress={() => addToCart(dish)}>
                    <MaterialIcons name="add" size={18} color={theme.colors.onPrimary} />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Popular Dishes */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Popular Dishes</Text>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => navigation.navigate('Menu')}>
              <Text style={styles.viewAllText}>View All</Text>
              <MaterialIcons name="arrow-forward" size={16} color={theme.colors.primary} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.gridContainer}>
            {isLoading ? (
              <Text style={{ textAlign: 'center', margin: 20 }}>Loading popular dishes...</Text>
            ) : popularDishes.map(dish => (
              <View key={dish.id} style={styles.dishCard}>
                <Image source={{ uri: dish.image_url, cache: 'force-cache' }} style={styles.dishImage} />
                <Text style={styles.dishName} numberOfLines={1}>{dish.name}</Text>
                <Text style={styles.dishDesc} numberOfLines={1}>{dish.description}</Text>
                <View style={styles.dishFooter}>
                  <Text style={styles.dishPrice}>₹{dish.price}</Text>
                  <TouchableOpacity style={styles.addButton} onPress={() => addToCart(dish)}>
                    <MaterialIcons name="add" size={18} color={theme.colors.onPrimary} />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingTop: 40,
    paddingBottom: theme.spacing.sm,
    backgroundColor: 'rgba(255, 248, 246, 0.9)',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    ...theme.typography.h2,
    fontSize: 22,
    color: theme.colors.primary,
    marginLeft: theme.spacing.xs,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: theme.colors.outline,
  },
  container: {
    flex: 1,
  },
  heroSection: {
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
  },
  heroImageContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 4,
    borderColor: '#ffffff',
    overflow: 'hidden',
    ...theme.shadows.level2,
    marginBottom: theme.spacing.md,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroText: {
    ...theme.typography.h1,
    fontSize: 36,
    textAlign: 'center',
    color: theme.colors.onSurface,
    marginBottom: theme.spacing.lg,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 30,
    paddingHorizontal: 20,
    height: 56,
    width: '100%',
    ...theme.shadows.level1,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    ...theme.typography.bodyMedium,
    color: theme.colors.onSurface,
  },
  categoriesContainer: {
    paddingHorizontal: theme.spacing.md,
    paddingBottom: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  categoryChip: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 30,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: theme.colors.outline,
    marginRight: theme.spacing.sm,
  },
  categoryChipActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  categoryText: {
    ...theme.typography.labelSmall,
    color: theme.colors.onSurfaceVariant,
  },
  categoryTextActive: {
    color: theme.colors.onPrimary,
  },
  sectionContainer: {
    paddingHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  heritageCard: {
    height: 350,
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
  },
  heritageImage: {
    width: '100%',
    height: '100%',
  },
  heritageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: theme.spacing.md,
    paddingTop: 60,
    backgroundColor: 'rgba(0,0,0,0.4)', // Using rgba directly for gradient fallback
  },
  heritageSubtitle: {
    ...theme.typography.labelSmall,
    color: '#ffffff',
    letterSpacing: 2,
    marginBottom: theme.spacing.xs,
  },
  heritageTitle: {
    ...theme.typography.h2,
    color: '#ffffff',
    marginBottom: theme.spacing.xs,
  },
  heritageDesc: {
    ...theme.typography.bodyMedium,
    color: 'rgba(255,255,255,0.9)',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  sectionTitle: {
    ...theme.typography.h2,
    color: theme.colors.onSurface,
    marginBottom: theme.spacing.md,
  },
  viewAllText: {
    ...theme.typography.labelSmall,
    color: theme.colors.primary,
    marginRight: 4,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  dishCard: {
    width: (width - theme.spacing.md * 2 - theme.spacing.sm) / 2,
    backgroundColor: '#ffffff',
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
    ...theme.shadows.level1,
    borderWidth: 1,
    borderColor: '#e2bfb0', // outline-variant
  },
  dishImage: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: theme.borderRadius.sm,
    marginBottom: theme.spacing.sm,
  },
  dishName: {
    ...theme.typography.bodyMedium,
    fontWeight: 'bold',
    color: theme.colors.onSurface,
  },
  dishDesc: {
    fontSize: 12,
    color: theme.colors.onSurfaceVariant,
    marginBottom: theme.spacing.sm,
  },
  dishFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dishPrice: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  addButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  curatedCard: {
    backgroundColor: '#ffffff',
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
    marginBottom: theme.spacing.md,
    ...theme.shadows.level1,
  },
  curatedImageContainer: {
    height: 200,
    position: 'relative',
  },
  curatedImage: {
    width: '100%',
    height: '100%',
  },
  ratingBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    ...theme.typography.labelSmall,
    color: theme.colors.onSurface,
    marginLeft: 4,
  },
  curatedContent: {
    padding: theme.spacing.md,
  },
  vegBadge: {
    width: 12,
    height: 12,
    borderWidth: 1,
    borderColor: '#1b6d24',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  vegDot: {
    width: 6,
    height: 6,
    backgroundColor: '#1b6d24',
    borderRadius: 3,
  },
  curatedTitle: {
    ...theme.typography.h3,
    color: theme.colors.onSurface,
  },
  curatedDesc: {
    ...theme.typography.bodyMedium,
    color: theme.colors.onSurfaceVariant,
    fontStyle: 'italic',
    marginBottom: theme.spacing.md,
  },
  viewMenuBtn: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
  },
  viewMenuText: {
    ...theme.typography.labelSmall,
    color: theme.colors.onPrimary,
  }
});
