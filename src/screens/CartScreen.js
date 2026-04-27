import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Linking, Alert, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from '../theme';

import { useCart } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

export default function CartScreen({ navigation }) {
  const { cartItems, updateQuantity, subtotal, taxes, deliveryFee, total, clearCart } = useCart();
  const { user } = useContext(AuthContext);
  const [customerName, setCustomerName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [address, setAddress] = useState('');

  const handleCheckout = () => {
    if (!user) {
      Alert.alert(
        "Login Required", 
        "Please login to proceed with placing your order.",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Login", onPress: () => navigation.navigate("Login") }
        ]
      );
      return;
    }

    if (cartItems.length === 0) {
      Alert.alert("Cart is Empty", "Please add some items to your cart before proceeding.");
      return;
    }

    if (!customerName.trim() || !contactNumber.trim() || !address.trim()) {
      Alert.alert("Missing Details", "Please fill in your name, contact number, and delivery address to proceed.");
      return;
    }

    const itemsString = cartItems.map(item => `${item.qty}x ${item.name} - ₹${item.numericPrice * item.qty}`).join('\n');

    const phoneNumber = '+918080380261'; // Restaurant's WhatsApp number
    const message = `Hello RK Restaurant,

I would like to place an order!

*Delivery Details:*
Name: ${customerName}
Contact: ${contactNumber}
Address: ${address}

*Order Items:*
${itemsString}

*Bill Summary:*
Subtotal: ₹${subtotal.toFixed(2)}
GST & Taxes: ₹${taxes.toFixed(2)}
Delivery: ₹${deliveryFee.toFixed(2)}
*Total: ₹${total.toFixed(2)}*

Please confirm my order.`;
    
    const url = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        return Linking.openURL(url);
      } else {
        Alert.alert(
          "WhatsApp not found", 
          "Please install WhatsApp to place your order directly with the restaurant."
        );
      }
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        {/* Top Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <MaterialIcons name="eco" size={28} color={theme.colors.primary} />
            <Text style={styles.headerTitle}>RK Restaurant</Text>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.profileIconPlaceholder}>
              <Image 
                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCw5_Rz8SHwVPExXUpm5pmB8Jhx0NT6r9yrfduOL1IocnycgJ_Jb5gVCAnnLhVXzpra5akp5qKE765vYW2TVQGfvw6Lr2g6hBc7bmI8yZov4D0eM0Z2WKTxMlJUGw_1XgyaVjgQVi7gTWvKPuXZJy4UH2SPFIjwa6ndJrawnvfgibQnbwimnX3lEB2NibLHjs4pO6ARPF9pKfIwP052WS4OPueQUYl6jQAUe8QyQabUEPAD6jHNPvBENxz0XnAIzsdqklaEyHmJ2AWo' }} 
                style={{ width: '100%', height: '100%', borderRadius: 20 }} 
              />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 120 }}>
          <View style={styles.headlineSection}>
            <Text style={styles.headline}>Your Selections</Text>
            <Text style={styles.subHeadline}>Refined flavors for a conscious soul.</Text>
          </View>

          {/* Item List */}
          <View style={styles.itemList}>
            {cartItems.map(item => (
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
                    <Text style={styles.itemPrice}>₹{item.numericPrice * item.qty}</Text>
                    <View style={styles.quantityControl}>
                      <TouchableOpacity style={styles.qtyButton} onPress={() => updateQuantity(item.id, -1)}>
                        <MaterialIcons name="remove" size={16} color={theme.colors.primary} />
                      </TouchableOpacity>
                      <Text style={styles.qtyText}>{item.qty}</Text>
                      <TouchableOpacity style={styles.qtyButton} onPress={() => updateQuantity(item.id, 1)}>
                        <MaterialIcons name="add" size={16} color={theme.colors.primary} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </View>

          {/* Delivery Form */}
          <View style={styles.formContainer}>
            <Text style={styles.formTitle}>Delivery Details</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Full Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your name"
                placeholderTextColor={theme.colors.outlineVariant}
                value={customerName}
                onChangeText={setCustomerName}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Contact Number</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your phone number"
                placeholderTextColor={theme.colors.outlineVariant}
                keyboardType="phone-pad"
                value={contactNumber}
                onChangeText={setContactNumber}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Complete Address</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Enter your delivery address"
                placeholderTextColor={theme.colors.outlineVariant}
                multiline
                numberOfLines={3}
                value={address}
                onChangeText={setAddress}
              />
            </View>
          </View>

          {/* Order Summary */}
          <View style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>₹ {subtotal.toFixed(2)}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>GST & Taxes</Text>
              <Text style={styles.summaryValue}>₹ {taxes.toFixed(2)}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Delivery Excellence</Text>
              <Text style={styles.summaryValue}>₹ {deliveryFee.toFixed(2)}</Text>
            </View>
            
            <View style={styles.totalSection}>
              <View>
                <Text style={styles.totalLabel}>TOTAL AMOUNT</Text>
                <Text style={styles.totalAmount}>₹ {total.toFixed(2)}</Text>
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
          <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
            <MaterialIcons name="chat" size={24} color="#ffffff" style={{ marginRight: 8 }} />
            <Text style={styles.checkoutButtonText}>Proceed to Order</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
    marginBottom: theme.spacing.md,
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
  formContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.lg,
    ...theme.shadows.level1,
  },
  formTitle: {
    ...theme.typography.h3,
    color: theme.colors.onSurface,
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    ...theme.typography.labelSmall,
    color: theme.colors.onSurfaceVariant,
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#f5f5f4', // stone-100
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    ...theme.typography.bodyMedium,
    color: theme.colors.onSurface,
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
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
