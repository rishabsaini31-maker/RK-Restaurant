import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from '../theme';

const ALL_ORDERS = [
  { id: '#VD-8921', customer: 'Aarav Sharma', items: '3x Masala Chai, 2x Paneer Tikka', status: 'Delivered', total: '₹2,450.00', time: '10 mins ago', address: 'Bandra West, Mumbai', phone: '+91 98765 43210' },
  { id: '#VD-8920', customer: 'Meera Iyer', items: '1x Truffle Infusion, 2x Sparkling Water', status: 'Preparing', total: '₹1,890.00', time: '15 mins ago', address: 'Jubilee Hills, Hyderabad', phone: '+91 98765 43211' },
  { id: '#VD-8919', customer: 'Rohan Mehra', items: '4x House sourdough', status: 'On Route', total: '₹3,200.50', time: '1 hr ago', address: 'Vasant Kunj, Delhi', phone: '+91 98765 43212' },
  { id: '#VD-8918', customer: 'Ananya Gupta', items: '1x Heritage Thali', status: 'Pending', total: '₹950.00', time: '2 hrs ago', address: 'Indiranagar, Bangalore', phone: '+91 98765 43213' },
];

export default function AdminOrdersScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color={theme.colors.onSurface} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>All Orders</Text>
        <View style={styles.headerRight} />
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        {ALL_ORDERS.map((order, index) => (
          <View key={index} style={styles.orderCard}>
            <View style={styles.orderHeader}>
              <Text style={styles.orderId}>{order.id}</Text>
              <Text style={styles.orderTime}>{order.time}</Text>
            </View>
            <Text style={styles.customerName}>{order.customer}</Text>
            <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 4}}>
              <MaterialIcons name="location-on" size={14} color="#888" style={{marginRight: 4}} />
              <Text style={{fontSize: 12, color: '#888'}}>{order.address}</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 12}}>
              <MaterialIcons name="phone" size={14} color="#888" style={{marginRight: 4}} />
              <Text style={{fontSize: 12, color: '#888'}}>{order.phone}</Text>
            </View>
            <Text style={styles.itemsText}>{order.items}</Text>
            <View style={styles.orderFooter}>
              <Text style={styles.totalText}>{order.total}</Text>
              <Text style={styles.statusBadge}>{order.status}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff', paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 24, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  backButton: { padding: 4 },
  headerTitle: { ...theme.typography.h2, fontSize: 20 },
  headerRight: { width: 32 },
  container: { padding: 24 },
  orderCard: { backgroundColor: '#f9f9f9', padding: 16, borderRadius: 16, marginBottom: 16 },
  orderHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  orderId: { fontWeight: 'bold', color: theme.colors.primary },
  orderTime: { fontSize: 12, color: '#888' },
  customerName: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  itemsText: { fontSize: 14, color: '#666', marginBottom: 12 },
  orderFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  totalText: { fontWeight: 'bold', fontSize: 16 },
  statusBadge: { backgroundColor: theme.colors.primaryContainer + '20', color: theme.colors.primary, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, fontSize: 12, fontWeight: 'bold' },
});
