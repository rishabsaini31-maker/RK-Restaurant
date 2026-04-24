import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from '../theme';

const CART_ITEMS = [
  {
    id: '1',
    name: 'Truffle Sage Ravioli',
    desc: 'Handmade pasta, brown butter, crispy sage',
    price: '₹ 850',
    qty: 1,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJgJgM0UJHm4RZUNLVVgv9xtO4Hiaplc5kn9NZvGdSUXtwOn1KDuTU5HFFj4uVpuVGFprGm5q9-1A7-4hpPhfnXvPz9GR-cYUQ-a2AZ95ItGu5GcBmNV-Nq3bmH1ANdrX_6yVfBI4R5DOpub5wfWGTzapJ9q15jUubDTNM1m27zOJappPKToq-GMRA_riZ6xQnrhdqLhYggKgVSMlK23uGFGLEU9g2BXJyVE8j8xps1N7epa1uwS5y2zL6IsjayEDlCjPLQCAwI2QJ'
  },
  {
    id: '2',
    name: 'Heirloom Garden Salad',
    desc: 'Organic tomatoes, pine nuts, basil emulsion',
    price: '₹ 520',
    qty: 2,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBXI4kO8pw6pfsZEYZjIWHun_XNN1vcrx68se7xIo1z6UOKSLi924NicwlUW9I0pRfDov6jXta5T9RZQ2dBopBru0tMV-TP5LRGOpWp-u8rDiptvX4R0Lc5XwTwR8qfPXlAMqZEFLrBVhKSPB3z-igv9Qn5-TXF3jXOAIutTfmpj4kX7o5G0gAW-G3YtYGRjCYBh-PyQldLqrZ-uKFz78ijYBW3Ko9aypTwKa2_MdzjmXZBwMWoS_RgNvNxB5Wg9f_NbRrweCIj7OcF'
  }
];

export default function CartScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Top Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <MaterialIcons name="eco" size={28} color={theme.colors.primary} />
          <Text style={styles.headerTitle}>RK Restaurant</Text>
        </View>
        <View style={styles.headerRight}>
          <View style={styles.profileIconPlaceholder}>
            <Image 
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCw5_Rz8SHwVPExXUpm5pmB8Jhx0NT6r9yrfduOL1IocnycgJ_Jb5gVCAnnLhVXzpra5akp5qKE765vYW2TVQGfvw6Lr2g6hBc7bmI8yZov4D0eM0Z2WKTxMlJUGw_1XgyaVjgQVi7gTWvKPuXZJy4UH2SPFIjwa6ndJrawnvfgibQnbwimnX3lEB2NibLHjs4pO6ARPF9pKfIwP052WS4OPueQUYl6jQAUe8QyQabUEPAD6jHNPvBENxz0XnAIzsdqklaEyHmJ2AWo' }} 
              style={{ width: '100%', height: '100%' }} 
            />
          </View>
        </View>
      </View>

      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 120 }}>
        <View style={styles.headlineSection}>
          <Text style={styles.headline}>Your Selections</Text>
          <Text style={styles.subHeadline}>Refined flavors for a conscious soul.</Text>
        </View>

        {/* Item List */}
        <View style={styles.itemList}>
          {CART_ITEMS.map(item => (
            <View key={item.id} style={styles.cartItem}>
              <View style={styles.itemImageContainer}>
                <Image source={{ uri: item.image }} style={styles.itemImage} />
              </View>
              <View style={styles.itemDetails}>
                <View>
                  <View style={styles.itemHeader}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <View style={styles.vegBadge}><View style={styles.vegDot} /></View>
                  </View>
                  <Text style={styles.itemDesc}>{item.desc}</Text>
                </View>
                
                <View style={styles.itemFooter}>
                  <Text style={styles.itemPrice}>{item.price}</Text>
                  <View style={styles.quantityControl}>
                    <TouchableOpacity style={styles.qtyButton}>
                      <MaterialIcons name="remove" size={16} color={theme.colors.primary} />
                    </TouchableOpacity>
                    <Text style={styles.qtyText}>{item.qty}</Text>
                    <TouchableOpacity style={styles.qtyButton}>
                      <MaterialIcons name="add" size={16} color={theme.colors.primary} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Order Summary */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>₹ 1,890</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>GST & Taxes</Text>
            <Text style={styles.summaryValue}>₹ 94.50</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Delivery Excellence</Text>
            <Text style={styles.summaryValue}>₹ 60</Text>
          </View>
          
          <View style={styles.totalSection}>
            <View>
              <Text style={styles.totalLabel}>TOTAL AMOUNT</Text>
              <Text style={styles.totalAmount}>₹ 2,044.50</Text>
            </View>
            <View style={styles.guaranteeBadge}>
              <MaterialIcons name="verified-user" size={16} color={theme.colors.secondary} />
              <Text style={styles.guaranteeText}>PURITY GUARANTEED</Text>
            </View>
          </View>
        </View>

        {/* Chef Note */}
        <View style={styles.chefNote}>
          <MaterialIcons name="restaurant-menu" size={24} color={theme.colors.primary} style={{ marginTop: 2 }} />
          <Text style={styles.chefNoteText}>
            "Chef's Note: Our pasta is hand-rolled daily using premium semolina. Best consumed within 30 minutes of arrival."
          </Text>
        </View>
      </ScrollView>

      {/* Bottom Action */}
      <View style={styles.bottomAction}>
        <TouchableOpacity style={styles.checkoutButton}>
          <MaterialIcons name="chat" size={24} color="#ffffff" style={{ marginRight: 8 }} />
          <Text style={styles.checkoutButtonText}>Order on WhatsApp</Text>
        </TouchableOpacity>
      </View>
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
  profileIconPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: theme.colors.outline,
    backgroundColor: theme.colors.surfaceVariant,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    paddingHorizontal: theme.spacing.md,
  },
  headlineSection: {
    marginVertical: theme.spacing.md,
  },
  headline: {
    ...theme.typography.h2,
    color: theme.colors.onSurface,
    marginBottom: 4,
  },
  subHeadline: {
    ...theme.typography.bodyMedium,
    color: theme.colors.onSurfaceVariant,
    fontStyle: 'italic',
  },
  itemList: {
    marginBottom: theme.spacing.lg,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    ...theme.shadows.level1,
  },
  itemImageContainer: {
    width: 96,
    height: 96,
    borderRadius: 8,
    overflow: 'hidden',
    marginRight: theme.spacing.md,
  },
  itemImage: {
    width: '100%',
    height: '100%',
  },
  itemDetails: {
    flex: 1,
    justifyContent: 'space-between',
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  itemName: {
    ...theme.typography.h3,
    fontSize: 18,
    color: theme.colors.onSurface,
    flex: 1,
  },
  vegBadge: {
    width: 12,
    height: 12,
    borderWidth: 1,
    borderColor: '#1b6d24',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2,
    marginLeft: 8,
    marginTop: 4,
  },
  vegDot: {
    width: 6,
    height: 6,
    backgroundColor: '#1b6d24',
    borderRadius: 3,
  },
  itemDesc: {
    ...theme.typography.labelSmall,
    color: theme.colors.outline,
    fontStyle: 'italic',
    marginTop: 4,
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: theme.spacing.sm,
  },
  itemPrice: {
    ...theme.typography.h3,
    fontSize: 18,
    color: theme.colors.primary,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff1eb',
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  qtyButton: {
    padding: 4,
  },
  qtyText: {
    ...theme.typography.labelSmall,
    width: 20,
    textAlign: 'center',
    color: theme.colors.onSurface,
  },
  summaryCard: {
    backgroundColor: 'rgba(255, 241, 235, 0.5)',
    borderRadius: 16,
    padding: theme.spacing.lg,
    borderWidth: 1,
    borderColor: 'rgba(226, 191, 176, 0.2)',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },
  summaryLabel: {
    ...theme.typography.bodyMedium,
    color: theme.colors.onSurfaceVariant,
  },
  summaryValue: {
    ...theme.typography.bodyMedium,
    fontWeight: 'bold',
    color: theme.colors.onSurface,
  },
  divider: {
    height: 0.5,
    backgroundColor: 'rgba(226, 191, 176, 0.4)',
    marginVertical: 4,
  },
  totalSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: theme.spacing.md,
  },
  totalLabel: {
    ...theme.typography.labelSmall,
    color: theme.colors.outline,
    marginBottom: 4,
  },
  totalAmount: {
    ...theme.typography.h2,
    color: theme.colors.onSurface,
    lineHeight: 32,
  },
  guaranteeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(160, 243, 153, 0.3)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  guaranteeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: theme.colors.secondary,
    marginLeft: 4,
  },
  chefNote: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(255, 107, 0, 0.05)',
    padding: theme.spacing.md,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 107, 0, 0.1)',
    marginTop: theme.spacing.md,
  },
  chefNoteText: {
    ...theme.typography.bodyMedium,
    fontSize: 14,
    fontStyle: 'italic',
    color: 'rgba(87, 32, 0, 0.8)',
    marginLeft: theme.spacing.sm,
    flex: 1,
  },
  bottomAction: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(250, 250, 249, 0.9)',
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.md,
    paddingBottom: 40,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
  },
  checkoutButton: {
    flexDirection: 'row',
    backgroundColor: theme.colors.primary,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.level2,
  },
  checkoutButtonText: {
    ...theme.typography.h3,
    fontSize: 18,
    color: '#ffffff',
  }
});
