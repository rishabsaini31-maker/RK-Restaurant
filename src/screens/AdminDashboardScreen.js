import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from '../theme';
import { useAuth } from '../context/AuthContext';

const RECENT_ORDERS = [
  { id: '#VD-8921', customer: 'Aarav Sharma', location: 'Bandra West, Mumbai', status: 'Delivered', total: '₹2,450.00' },
  { id: '#VD-8920', customer: 'Meera Iyer', location: 'Jubilee Hills, Hyderabad', status: 'Preparing', total: '₹1,890.00' },
  { id: '#VD-8919', customer: 'Rohan Mehra', location: 'Vasant Kunj, Delhi', status: 'On Route', total: '₹3,200.50' },
];

export default function AdminDashboardScreen({ navigation }) {
  const { logout } = useAuth();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <MaterialIcons name="arrow-back" size={24} color={theme.colors.onSurface} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Veda Admin</Text>
          <TouchableOpacity onPress={logout} style={styles.headerRight}>
            <MaterialIcons name="logout" size={24} color={theme.colors.error} />
          </TouchableOpacity>
        </View>

        {/* Dashboard Overview Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Dashboard Overview</Text>
          <View style={{ flexDirection: 'row', gap: 12, marginTop: 16, flexWrap: 'wrap' }}>
            <TouchableOpacity onPress={() => navigation.navigate('AddDish')} style={{ backgroundColor: '#000', paddingHorizontal: 20, paddingVertical: 12, borderRadius: 24 }}>
              <Text style={{ color: '#fff', fontSize: 14, fontWeight: 'bold' }}>+ Add Dish</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('AdminOrders')} style={{ backgroundColor: '#000', paddingHorizontal: 20, paddingVertical: 12, borderRadius: 24 }}>
              <Text style={{ color: '#fff', fontSize: 14, fontWeight: 'bold' }}>View Orders</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('AdminAnalytics')} style={{ backgroundColor: '#000', paddingHorizontal: 20, paddingVertical: 12, borderRadius: 24 }}>
              <Text style={{ color: '#fff', fontSize: 14, fontWeight: 'bold' }}>Analytics</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Stats Grid */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.statsContainer}>
          <View style={styles.statCard}>
            <View style={styles.statHeader}>
              <View style={[styles.iconWrapper, { backgroundColor: theme.colors.surfaceContainerHigh }]}>
                <MaterialIcons name="shopping-bag" size={20} color={theme.colors.primary} />
              </View>
              <Text style={styles.statTrendUp}>+12%</Text>
            </View>
            <Text style={styles.statLabel}>Total Orders</Text>
            <Text style={styles.statValue}>1,284</Text>
          </View>
          
          <View style={[styles.statCard, { backgroundColor: theme.colors.primary }]}>
            <View style={styles.statHeader}>
              <View style={[styles.iconWrapper, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
                <MaterialIcons name="payments" size={20} color="#ffffff" />
              </View>
              <Text style={[styles.statTrendUp, { color: '#ffffff' }]}>+8.4%</Text>
            </View>
            <Text style={[styles.statLabel, { color: 'rgba(255,255,255,0.8)' }]}>Revenue</Text>
            <Text style={[styles.statValue, { color: '#ffffff' }]}>₹4,82,900</Text>
          </View>
          
          <View style={styles.statCard}>
            <View style={styles.statHeader}>
              <View style={[styles.iconWrapper, { backgroundColor: '#f5f5f5' }]}>
                <MaterialIcons name="group" size={20} color="#666" />
              </View>
              <Text style={styles.statTrendDown}>-2%</Text>
            </View>
            <Text style={styles.statLabel}>New Users</Text>
            <Text style={styles.statValue}>456</Text>
          </View>
        </ScrollView>

        {/* Live Feed Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Live Feed</Text>
          <View style={styles.realtimeBadge}>
            <View style={styles.pulseDot} />
            <Text style={styles.realtimeText}>Real-time</Text>
          </View>
        </View>

        <View style={styles.liveOrderCard}>
          <View style={styles.liveOrderHeader}>
            <View style={styles.urgentBadge}>
              <Text style={styles.urgentText}>URGENT</Text>
            </View>
            <Text style={styles.timeAgoText}>2 mins ago</Text>
          </View>
          <Text style={styles.liveOrderTitle}>Heritage Thali Special</Text>
          <Text style={styles.liveOrderDesc}>3x Masala Chai, 2x Paneer Tikka, 1x Saffron Pilaf</Text>
          <TouchableOpacity style={styles.acceptButton}>
            <Text style={styles.acceptButtonText}>ACCEPT</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.liveOrderCardStandard}>
          <View style={styles.liveOrderHeader}>
            <View style={styles.standardBadge}>
              <Text style={styles.standardText}>STANDARD</Text>
            </View>
            <Text style={styles.timeAgoText}>8 mins ago</Text>
          </View>
          <Text style={styles.liveOrderTitle}>Wild Mushroom Risotto</Text>
          <Text style={styles.liveOrderDesc}>1x Truffle Infusion, 2x Sparkling Water</Text>
          <TouchableOpacity style={styles.detailsButton}>
            <Text style={styles.detailsButtonText}>DETAILS</Text>
          </TouchableOpacity>
        </View>

        {/* Recent Transactions */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          <TouchableOpacity>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.transactionsContainer}>
          {RECENT_ORDERS.map((order, index) => (
            <View key={index} style={styles.transactionRow}>
              <View style={styles.transactionCol}>
                <Text style={styles.transactionCustomer}>{order.customer}</Text>
                <Text style={styles.transactionLocation}>{order.location}</Text>
              </View>
              <View style={styles.transactionRightCol}>
                <Text style={styles.transactionTotal}>{order.total}</Text>
                <Text style={styles.transactionStatus}>{order.status}</Text>
              </View>
            </View>
          ))}
        </View>
        
        {/* Bottom padding for scroll */}
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    padding: theme.spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  backButton: {
    padding: theme.spacing.xs,
  },
  headerTitle: {
    ...theme.typography.h2,
    fontSize: 20,
    color: theme.colors.primary,
    fontStyle: 'italic',
  },
  headerRight: {
    width: 32, // to balance back button
  },
  titleContainer: {
    marginBottom: theme.spacing.md,
  },
  titleText: {
    ...theme.typography.h2,
    fontSize: 24,
  },
  statsContainer: {
    gap: 16,
    marginBottom: theme.spacing.xl,
    paddingRight: theme.spacing.md,
  },
  statCard: {
    width: 160,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: theme.spacing.md,
    ...theme.shadows.medium,
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statTrendUp: {
    ...theme.typography.labelSmall,
    color: '#1b6d24',
  },
  statTrendDown: {
    ...theme.typography.labelSmall,
    color: theme.colors.error,
  },
  statLabel: {
    ...theme.typography.bodyMedium,
    color: '#888',
    fontStyle: 'italic',
    fontSize: 12,
  },
  statValue: {
    ...theme.typography.h2,
    fontSize: 24,
    marginTop: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  sectionTitle: {
    ...theme.typography.h3,
    fontSize: 20,
  },
  realtimeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  pulseDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#22c55e',
  },
  realtimeText: {
    ...theme.typography.labelSmall,
    color: '#888',
  },
  liveOrderCard: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.primary,
    ...theme.shadows.medium,
  },
  liveOrderCardStandard: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.xl,
    borderLeftWidth: 4,
    borderLeftColor: '#e5e7eb',
    ...theme.shadows.medium,
  },
  liveOrderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  urgentBadge: {
    backgroundColor: theme.colors.primaryContainer + '20',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  urgentText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  standardBadge: {
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  standardText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#888',
  },
  timeAgoText: {
    fontSize: 10,
    color: '#888',
  },
  liveOrderTitle: {
    ...theme.typography.h3,
    fontSize: 18,
    marginBottom: 4,
  },
  liveOrderDesc: {
    ...theme.typography.bodyMedium,
    color: '#888',
    fontSize: 14,
    marginBottom: 16,
  },
  acceptButton: {
    backgroundColor: theme.colors.onSurface,
    alignSelf: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  acceptButtonText: {
    ...theme.typography.labelSmall,
    color: '#ffffff',
  },
  detailsButton: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    alignSelf: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  detailsButtonText: {
    ...theme.typography.labelSmall,
    color: theme.colors.onSurface,
  },
  viewAllText: {
    ...theme.typography.labelSmall,
    color: theme.colors.primary,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.primary,
  },
  transactionsContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: theme.spacing.md,
    ...theme.shadows.medium,
  },
  transactionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  transactionCol: {
    flex: 1,
  },
  transactionCustomer: {
    ...theme.typography.bodyMedium,
    fontWeight: '600',
    color: theme.colors.onSurface,
  },
  transactionLocation: {
    fontSize: 12,
    color: '#888',
    fontStyle: 'italic',
    marginTop: 2,
  },
  transactionRightCol: {
    alignItems: 'flex-end',
  },
  transactionTotal: {
    fontWeight: 'bold',
    color: theme.colors.onSurface,
  },
  transactionStatus: {
    fontSize: 10,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginTop: 4,
    backgroundColor: theme.colors.primaryContainer + '10',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    overflow: 'hidden',
  },
});
