import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from '../theme';

const { width } = Dimensions.get('window');

const CATEGORIES = ['Appetizers', 'Mains', 'Desserts', 'Beverages'];

const APPETIZERS = [
  {
    id: '1',
    name: 'Crispy Lotus Stem',
    desc: 'Thinly sliced lotus root tossed in a tangy honey-chili glaze with toasted sesame.',
    price: '$14.00',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBkaOctLSrYdWNe6OuYKsOQcpyD6kIQKRMcGmwX0yJdsa4k74wliqxZ_FIeJolFtAdijxZuqzKRnLFtMCjFI5H5EWuOB5Ksdnmlp3DuEij64K3buOEYSHZB6D59NtNhB8myPdJaBzfFhQkD4uWDwxpicozeExyU_icatHLw9bpSF_xzbIiHyXULmca_zaF1B4wRXyFfUYPleVVHhDDwfjZhEnevKuWV0Byb2rUofRUhT786yMtLxMutfd5Lv1-MWreqrXzOPevk7MWv'
  },
  {
    id: '2',
    name: 'Truffle Broccoli',
    desc: 'Oven-roasted florets marinated in cardamom cream and white truffle essence.',
    price: '$18.00',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA8AN_8cp8yzBLlRPJQikU1zv8W5LXMWM1FDmNFvEPdrDheXEowGX1ezVK1WJI_DvywkvevBTotUW1AzvUq5JmKBojQYa22iIn-EX90ji6vqknTLKHrDt5b6QFvUO9Ip7zs9siJhjQccjGVBDgpLTOAxrZ14nSriepMYppLuDiBqOkeH-DM3URN0Dz96exnS5IADV0C5rl3UD0Z7279p0fAY5Xnl5CWN40xErmfmwFOV6P0LdfwRf6DMbAI4Kwm5mq0CVDInivv8RUb'
  }
];

export default function MenuScreen({ navigation }) {
  const [activeCategory, setActiveCategory] = useState('Appetizers');

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Top Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <MaterialIcons name="eco" size={28} color={theme.colors.primary} />
          <Text style={styles.headerTitle}>RK Restaurant</Text>
        </View>
        <View style={styles.headerRight}>
          <MaterialIcons name="search" size={24} color={theme.colors.onSurfaceVariant} style={{ marginRight: 16 }} />
          <Image 
            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCw5_Rz8SHwVPExXUpm5pmB8Jhx0NT6r9yrfduOL1IocnycgJ_Jb5gVCAnnLhVXzpra5akp5qKE765vYW2TVQGfvw6Lr2g6hBc7bmI8yZov4D0eM0Z2WKTxMlJUGw_1XgyaVjgQVi7gTWvKPuXZJy4UH2SPFIjwa6ndJrawnvfgibQnbwimnX3lEB2NibLHjs4pO6ARPF9pKfIwP052WS4OPueQUYl6jQAUe8QyQabUEPAD6jHNPvBENxz0XnAIzsdqklaEyHmJ2AWo' }} 
            style={styles.profileImage} 
          />
        </View>
      </View>

      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
        {/* Hero Banner */}
        <View style={styles.heroSection}>
          <Image 
            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAzwNEMIjkRNxubidrqvkTvnRO-jtbEmL2Zc7JfGykZfoScGl4siw998R0o2IfOHIlP8btsdRyPxDkSC-HFXIjmLIhpQc4SKuvw-m626dXmARJW8kBSysfFCtmxHNsNWBkNTInAOMN3jGaskIuEjrkYWj7sqVa58F0vLeHlSpQHVEJwVEs3E3v0zOWcn3pCZ0NVx6jpRP746Ipk9DtDVopk1S_Z_tNXpXGIstRx5QjOU642MCZ0LRC0IvHuvEuMKN_wnqkMj1roWJcF' }}
            style={styles.heroImage}
          />
        </View>

        {/* Restaurant Identity */}
        <View style={styles.identityCardWrapper}>
          <View style={styles.identityCard}>
            <View style={styles.identityHeader}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.identityTitle}>Sattva Dining</Text>
                <View style={styles.vegBadge}><View style={styles.vegDot} /></View>
              </View>
              <View style={styles.ratingBadge}>
                <MaterialIcons name="star" size={16} color={theme.colors.primary} />
                <Text style={styles.ratingText}>4.9 (120+)</Text>
              </View>
            </View>
            <Text style={styles.identityDesc}>
              Elevated plant-based cuisine inspired by ancient Vedic traditions. We source only organic, seasonal ingredients for a pure dining experience.
            </Text>
            <View style={styles.identityFooter}>
              <View style={styles.footerItem}>
                <MaterialIcons name="schedule" size={18} color={theme.colors.onSurfaceVariant} />
                <Text style={styles.footerText}>12:00 PM - 10:30 PM</Text>
              </View>
              <View style={styles.footerItem}>
                <MaterialIcons name="local-shipping" size={18} color={theme.colors.onSurfaceVariant} />
                <Text style={styles.footerText}>2.4 km</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Categories */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesContainer}>
          {CATEGORIES.map((cat, index) => (
            <TouchableOpacity 
              key={index} 
              onPress={() => setActiveCategory(cat)}
              style={[
                styles.categoryChip, 
                activeCategory === cat ? styles.categoryChipActive : styles.categoryChipInactive
              ]}
            >
              <Text style={[
                styles.categoryText,
                activeCategory === cat ? styles.categoryTextActive : styles.categoryTextInactive
              ]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Appetizers Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Appetizers</Text>
            <View style={styles.sectionUnderline} />
          </View>
          
          <View style={styles.appetizersGrid}>
            {APPETIZERS.map((item) => (
              <TouchableOpacity 
                key={item.id} 
                style={styles.itemCard}
                onPress={() => navigation.navigate('DishDetails', { dish: item })}
              >
                <Image source={{ uri: item.image }} style={styles.itemImage} />
                <View style={styles.itemContent}>
                  <View style={styles.itemHeader}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <View style={styles.vegBadge}><View style={styles.vegDot} /></View>
                  </View>
                  <Text style={styles.itemDesc}>{item.desc}</Text>
                  <View style={styles.itemFooter}>
                    <Text style={styles.itemPrice}>{item.price}</Text>
                    <TouchableOpacity style={styles.addButton}>
                      <Text style={styles.addButtonText}>ADD</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Signature Mains Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Signature Mains</Text>
            <View style={styles.sectionUnderline} />
          </View>

          <View style={styles.signatureCard}>
            <Image 
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_vFki5wUmrdQn7c2dx2q8idsrVRe6aNXzW9rFW0fEmHeRpVIoP8ezNbaCuYCFADS29Wt15K_jdhzkFMSQ-0x5Lo38F_rmwKbEFK_T4lUdZkXFfZIVc8ukJqm2Nf6f7bZv32d8BHb7zUgqv2GBD04s5KHyTIQ9HlgPLuhwDOXW87phpujQDK5lv_xpnZWzzdUVD6UEEGXc9Zvd-y0beu_YXyZqv-vidk7MDRhBuxaN4JNArMG1sfSE8JLJ9Jy-7W_Z2E3mJF00aIzP' }} 
              style={styles.signatureImage} 
            />
            <View style={styles.signatureContent}>
              <View style={styles.signatureBadges}>
                <View style={styles.chefChoiceBadge}>
                  <Text style={styles.chefChoiceText}>CHEF'S CHOICE</Text>
                </View>
                <View style={styles.vegBadge}><View style={styles.vegDot} /></View>
              </View>
              <Text style={styles.signatureTitle}>Saffron Risotto</Text>
              <Text style={styles.signatureDesc}>
                Acquerello rice slow-cooked with Kashmiri saffron, vegan parmesan, and topped with delicate gold leaf. A meditative blend of textures and warmth.
              </Text>
              <View style={styles.itemFooter}>
                <Text style={styles.signaturePrice}>$32.00</Text>
                <TouchableOpacity style={styles.addButton}>
                  <Text style={styles.addButtonText}>ADD TO CART</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab}>
        <MaterialIcons name="shopping-bag" size={28} color={theme.colors.onPrimary} />
        <View style={styles.fabBadge}>
          <Text style={styles.fabBadgeText}>2</Text>
        </View>
      </TouchableOpacity>
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
    backgroundColor: 'rgba(250, 250, 249, 0.9)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerRight: {
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
    height: 300,
    width: '100%',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  identityCardWrapper: {
    paddingHorizontal: theme.spacing.md,
    marginTop: -40,
  },
  identityCard: {
    backgroundColor: '#ffffff',
    borderRadius: 32,
    padding: theme.spacing.md,
    ...theme.shadows.level1,
  },
  identityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  identityTitle: {
    ...theme.typography.h2,
    color: theme.colors.onSurface,
    marginRight: 8,
  },
  vegBadge: {
    width: 14,
    height: 14,
    borderWidth: 1.5,
    borderColor: '#1b6d24',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2,
    marginLeft: 8,
  },
  vegDot: {
    width: 6,
    height: 6,
    backgroundColor: '#1b6d24',
    borderRadius: 3,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    ...theme.typography.labelSmall,
    color: theme.colors.primary,
    marginLeft: 4,
  },
  identityDesc: {
    ...theme.typography.bodyMedium,
    color: theme.colors.onSurfaceVariant,
    marginBottom: theme.spacing.md,
  },
  identityFooter: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: theme.colors.surfaceVariant,
    paddingTop: theme.spacing.sm,
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  footerText: {
    ...theme.typography.labelSmall,
    color: theme.colors.onSurfaceVariant,
    marginLeft: 4,
  },
  categoriesContainer: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
  },
  categoryChip: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 30,
    marginRight: theme.spacing.sm,
  },
  categoryChipActive: {
    backgroundColor: theme.colors.primary,
  },
  categoryChipInactive: {
    backgroundColor: '#fee3d8', // surface-container-high approx
  },
  categoryText: {
    ...theme.typography.labelSmall,
  },
  categoryTextActive: {
    color: theme.colors.onPrimary,
  },
  categoryTextInactive: {
    color: theme.colors.onSurfaceVariant,
  },
  sectionContainer: {
    paddingHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  sectionHeader: {
    marginBottom: theme.spacing.md,
  },
  sectionTitle: {
    ...theme.typography.h3,
    color: theme.colors.onSurface,
    marginBottom: 8,
  },
  sectionUnderline: {
    width: 48,
    height: 4,
    backgroundColor: theme.colors.primary,
    borderRadius: 2,
  },
  appetizersGrid: {
    flexDirection: width > 600 ? 'row' : 'column',
    gap: theme.spacing.md,
  },
  itemCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 24,
    overflow: 'hidden',
    ...theme.shadows.level1,
    marginBottom: theme.spacing.md,
  },
  itemImage: {
    width: '100%',
    aspectRatio: 4/3,
  },
  itemContent: {
    padding: theme.spacing.md,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  itemName: {
    ...theme.typography.h3,
    fontSize: 20,
    color: theme.colors.onSurface,
    flex: 1,
  },
  itemDesc: {
    ...theme.typography.bodyMedium,
    fontSize: 14,
    color: theme.colors.onSurfaceVariant,
    fontStyle: 'italic',
    marginBottom: theme.spacing.md,
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemPrice: {
    ...theme.typography.h2,
    fontSize: 20,
    color: theme.colors.primary,
  },
  addButton: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 30,
  },
  addButtonText: {
    ...theme.typography.labelSmall,
    color: theme.colors.onPrimary,
  },
  signatureCard: {
    backgroundColor: '#ffffff',
    borderRadius: 32,
    overflow: 'hidden',
    ...theme.shadows.level1,
  },
  signatureImage: {
    width: '100%',
    height: 250,
  },
  signatureContent: {
    padding: theme.spacing.md,
  },
  signatureBadges: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  chefChoiceBadge: {
    backgroundColor: 'rgba(255,107,0,0.1)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  chefChoiceText: {
    ...theme.typography.labelSmall,
    fontSize: 10,
    color: theme.colors.primary,
  },
  signatureTitle: {
    ...theme.typography.h2,
    color: theme.colors.onSurface,
    marginBottom: theme.spacing.sm,
  },
  signatureDesc: {
    ...theme.typography.bodyMedium,
    color: theme.colors.onSurfaceVariant,
    marginBottom: theme.spacing.md,
  },
  signaturePrice: {
    ...theme.typography.h1,
    fontSize: 28,
    color: theme.colors.primary,
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.level2,
  },
  fabBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: theme.colors.inverseSurface || '#3d2d26',
    borderWidth: 2,
    borderColor: theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fabBadgeText: {
    color: theme.colors.background,
    fontSize: 10,
    fontWeight: 'bold',
  }
});
