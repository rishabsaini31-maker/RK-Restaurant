import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from '../theme';
import { useAuth } from '../context/AuthContext';

import { supabase } from '../services/supabase';

export default function ProfileScreen({ navigation }) {
  const { user, role, profileName, logout } = useAuth();
  const [orders, setOrders] = React.useState([]);
  const [reviewsCount, setReviewsCount] = React.useState(0);
  const [isLoadingStats, setIsLoadingStats] = React.useState(true);

  React.useEffect(() => {
    if (user) {
      const fetchProfileData = async () => {
        setIsLoadingStats(true);
        try {
          const { data: ordersData } = await supabase
            .from('orders')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false });
          
          if (ordersData) setOrders(ordersData);

          const { count: revCount } = await supabase
            .from('reviews')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', user.id);
            
          if (revCount !== null) setReviewsCount(revCount);
        } catch (e) {
          console.log("Tables might not exist yet:", e);
        } finally {
          setIsLoadingStats(false);
        }
      };
      fetchProfileData();
    }
  }, [user]);
  
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Top Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <MaterialIcons name="eco" size={28} color={theme.colors.primary} />
          <Text style={styles.headerTitle}>RK Restaurant</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={{ marginRight: 16 }}>
            <MaterialIcons name="settings" size={24} color={theme.colors.outline} />
          </TouchableOpacity>
          <View style={styles.profileIconContainer}>
            <Image 
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCw5_Rz8SHwVPExXUpm5pmB8Jhx0NT6r9yrfduOL1IocnycgJ_Jb5gVCAnnLhVXzpra5akp5qKE765vYW2TVQGfvw6Lr2g6hBc7bmI8yZov4D0eM0Z2WKTxMlJUGw_1XgyaVjgQVi7gTWvKPuXZJy4UH2SPFIjwa6ndJrawnvfgibQnbwimnX3lEB2NibLHjs4pO6ARPF9pKfIwP052WS4OPueQUYl6jQAUe8QyQabUEPAD6jHNPvBENxz0XnAIzsdqklaEyHmJ2AWo' }} 
              style={styles.profileIconImage} 
            />
          </View>
        </View>
      </View>

      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Profile Info */}
        <View style={styles.profileHeader}>
          <View style={styles.profileAvatarWrapper}>
            <Image 
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCw5_Rz8SHwVPExXUpm5pmB8Jhx0NT6r9yrfduOL1IocnycgJ_Jb5gVCAnnLhVXzpra5akp5qKE765vYW2TVQGfvw6Lr2g6hBc7bmI8yZov4D0eM0Z2WKTxMlJUGw_1XgyaVjgQVi7gTWvKPuXZJy4UH2SPFIjwa6ndJrawnvfgibQnbwimnX3lEB2NibLHjs4pO6ARPF9pKfIwP052WS4OPueQUYl6jQAUe8QyQabUEPAD6jHNPvBENxz0XnAIzsdqklaEyHmJ2AWo' }} 
              style={styles.largeAvatar} 
            />
            <View style={styles.editBadge}>
              <MaterialIcons name="edit" size={16} color="#ffffff" />
            </View>
          </View>
          
          <View style={styles.profileDetails}>
            <Text style={styles.profileName}>{user ? (profileName || user.email.split('@')[0]) : 'Guest'}</Text>
            <View style={styles.memberStatus}>
              <MaterialIcons name="verified" size={18} color={theme.colors.primary} style={{ marginRight: 4 }} />
              <Text style={styles.memberText}>{user ? 'Elite Connoisseur Member' : 'Welcome to our sanctuary'}</Text>
            </View>
            <View style={styles.tagsContainer}>
              <View style={styles.vegTag}>
                <MaterialIcons name="spa" size={14} color={theme.colors.secondary} style={{ marginRight: 4 }} />
                <Text style={styles.vegTagText}>Pure Vegetarian</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Auth Action Buttons or Logout */}
        {!user ? (
          <View style={styles.authButtonsContainer}>
            <TouchableOpacity 
              style={[styles.authButton, styles.loginButton]}
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.authButton, styles.signupButton]}
              onPress={() => navigation.navigate('Signup')}
            >
              <Text style={styles.signupButtonText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.authButtonsContainer}>
            <TouchableOpacity 
              style={[styles.authButton, styles.signupButton]} // re-use outlined style for logout
              onPress={async () => {
                await logout();
              }}
            >
              <Text style={styles.signupButtonText}>Logout</Text>
            </TouchableOpacity>
          </View>
        )}

        {user && (
          <>
            {/* Stats Grid */}
            <View style={styles.statsGrid}>
              <View style={styles.statBox}>
                <Text style={styles.statLabel}>Orders</Text>
                <Text style={styles.statValue}>{isLoadingStats ? '-' : orders.length}</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statLabel}>Sattva Tier</Text>
                <Text style={styles.statValue}>Gold</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statLabel}>Reviews</Text>
                <Text style={styles.statValue}>{isLoadingStats ? '-' : reviewsCount}</Text>
              </View>
            </View>

            {/* Order History */}
            <View style={styles.sectionContainer}>
              <View style={styles.sectionHeaderRow}>
                <Text style={styles.sectionTitle}>Order History</Text>
                <TouchableOpacity>
                  <Text style={styles.viewAllHistory}>View All History</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.ordersList}>
                {isLoadingStats ? (
                  <Text style={{ textAlign: 'center', marginTop: 20, color: theme.colors.outlineVariant }}>Loading history...</Text>
                ) : orders.length === 0 ? (
                  <Text style={{ textAlign: 'center', marginTop: 20, color: theme.colors.outlineVariant }}>No orders yet. Discover our pure flavors!</Text>
                ) : (
                  orders.map(order => (
                    <View key={order.id} style={[styles.orderCard, order.status === 'Cancelled' && styles.orderCardCancelled]}>
                      <View style={styles.orderDetails}>
                        <View style={styles.orderHeaderRow}>
                          <Text style={styles.orderRestaurant}>RK Restaurant</Text>
                          <View style={[
                            styles.statusBadge, 
                            order.status === 'Cancelled' ? styles.statusBadgeCancelled : styles.statusBadgeDelivered
                          ]}>
                            <Text style={[
                              styles.statusText,
                              order.status === 'Cancelled' ? styles.statusTextCancelled : styles.statusTextDelivered
                            ]}>{order.status || 'Processing'}</Text>
                          </View>
                        </View>
                        <Text style={styles.orderDate}>{new Date(order.created_at).toLocaleDateString()}</Text>
                        <Text style={styles.orderItems}>{order.items_string || 'Order items'}</Text>
                      </View>
                      <View style={styles.orderFooter}>
                        <Text style={styles.orderPrice}>₹{order.total_amount || 0}</Text>
                        <TouchableOpacity style={styles.reorderButton}>
                          <Text style={styles.reorderText}>{order.status === 'Cancelled' ? 'View Details' : 'Reorder'}</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  ))
                )}
              </View>
            </View>
          </>
        )}

        {/* Settings Menu */}
        {role === 'admin' && (
          <View style={styles.settingsContainer}>
            <TouchableOpacity 
              style={styles.settingItem}
              onPress={() => navigation.navigate('AdminDashboard')}
            >
              <View style={styles.settingItemLeft}>
                <View style={[styles.settingIconWrapper, { backgroundColor: theme.colors.primaryContainer + '20' }]}>
                  <MaterialIcons name="dashboard" size={20} color={theme.colors.primary} />
                </View>
                <Text style={[styles.settingItemText, { fontWeight: 'bold' }]}>Admin Panel</Text>
              </View>
              <MaterialIcons name="chevron-right" size={24} color="#ccc" />
            </TouchableOpacity>
          </View>
        )}

        {/* Heritage Journey */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Your Heritage Journey</Text>
          
          <View style={styles.journeyCard}>
            <MaterialIcons name="restaurant-menu" size={24} color={theme.colors.primary} style={{ marginBottom: 16 }} />
            <Text style={styles.journeyTitle}>Flavor Profile</Text>
            <Text style={styles.journeyDesc}>
              Based on your orders, you prefer earthy, aromatic spices and high-protein alternatives.
            </Text>
            <TouchableOpacity style={styles.journeyAction}>
              <Text style={styles.journeyActionText}>Update Preferences</Text>
              <MaterialIcons name="arrow-forward" size={16} color={theme.colors.primary} />
            </TouchableOpacity>
          </View>

          <View style={[styles.journeyCard, { marginTop: 16 }]}>
            <MaterialIcons name="nature-people" size={24} color={theme.colors.secondary} style={{ marginBottom: 16 }} />
            <Text style={styles.journeyTitle}>Impact Tracker</Text>
            <Text style={styles.journeyDesc}>
              Your vegetarian choices have saved 120kg of CO2 this year. A conscious lifestyle, rewarded.
            </Text>
            <TouchableOpacity style={styles.journeyAction}>
              <Text style={[styles.journeyActionText, { color: theme.colors.secondary }]}>Share Impact</Text>
              <MaterialIcons name="share" size={16} color={theme.colors.secondary} />
            </TouchableOpacity>
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
  profileIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'rgba(255, 107, 0, 0.2)',
    overflow: 'hidden',
  },
  profileIconImage: {
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    paddingTop: theme.spacing.lg,
  },
  profileHeader: {
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.xl,
  },
  profileAvatarWrapper: {
    position: 'relative',
    marginBottom: theme.spacing.md,
  },
  largeAvatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#ffffff',
  },
  editBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: theme.colors.primary,
    padding: 8,
    borderRadius: 20,
    ...theme.shadows.level1,
  },
  profileDetails: {
    alignItems: 'center',
  },
  profileName: {
    ...theme.typography.h1,
    fontSize: 32,
    color: theme.colors.onSurface,
    marginBottom: 4,
  },
  memberStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  memberText: {
    ...theme.typography.bodyLarge,
    color: theme.colors.onSurfaceVariant,
  },
  tagsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  vegTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(27, 109, 36, 0.1)',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  vegTagText: {
    ...theme.typography.labelSmall,
    color: theme.colors.secondary,
  },
  joinTag: {
    backgroundColor: 'rgba(255, 107, 0, 0.1)',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    justifyContent: 'center',
  },
  joinTagText: {
    ...theme.typography.labelSmall,
    color: theme.colors.primary,
  },
  authButtonsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: theme.spacing.lg,
    paddingHorizontal: theme.spacing.md,
  },
  authButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButton: {
    backgroundColor: theme.colors.primary,
  },
  loginButtonText: {
    ...theme.typography.bodyMedium,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  signupButton: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  signupButtonText: {
    ...theme.typography.bodyMedium,
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.xl,
    justifyContent: 'space-between',
  },
  statBox: {
    width: '31%',
    backgroundColor: '#ffffff',
    padding: theme.spacing.md,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 16,
    ...theme.shadows.level1,
  },
  statLabel: {
    ...theme.typography.labelSmall,
    color: '#a8a29e', // stone-400
    marginBottom: 4,
  },
  statValue: {
    ...theme.typography.h3,
    color: theme.colors.primary,
  },
  sectionContainer: {
    paddingHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.xl,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: theme.spacing.lg,
  },
  sectionTitle: {
    ...theme.typography.h2,
    fontSize: 24,
    color: theme.colors.onSurface,
  },
  viewAllHistory: {
    ...theme.typography.labelSmall,
    color: theme.colors.primary,
  },
  ordersList: {
    gap: theme.spacing.md,
  },
  orderCard: {
    backgroundColor: '#ffffff',
    padding: theme.spacing.md,
    borderRadius: 20,
    ...theme.shadows.level1,
  },
  orderCardCancelled: {
    opacity: 0.8,
  },
  orderImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginBottom: theme.spacing.md,
  },
  orderDetails: {
    marginBottom: theme.spacing.md,
  },
  orderHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  orderRestaurant: {
    ...theme.typography.h3,
    fontSize: 18,
    color: theme.colors.onSurface,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusBadgeDelivered: {
    backgroundColor: 'rgba(160, 243, 153, 0.3)',
  },
  statusBadgeCancelled: {
    backgroundColor: '#f5f5f4', // stone-100
  },
  statusText: {
    ...theme.typography.labelSmall,
  },
  statusTextDelivered: {
    color: theme.colors.secondary,
  },
  statusTextCancelled: {
    color: '#78716c', // stone-500
  },
  orderDate: {
    ...theme.typography.bodyMedium,
    fontSize: 14,
    color: '#78716c',
    marginBottom: 4,
  },
  orderItems: {
    ...theme.typography.labelSmall,
    color: '#a8a29e',
    textTransform: 'none',
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#f5f5f4',
    paddingTop: theme.spacing.md,
  },
  orderPrice: {
    ...theme.typography.h3,
    fontSize: 18,
    color: theme.colors.onSurface,
  },
  reorderButton: {
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: theme.colors.outline,
    borderRadius: 20,
  },
  reorderText: {
    ...theme.typography.labelSmall,
    color: theme.colors.onSurface,
  },
  journeyCard: {
    backgroundColor: 'rgba(255, 234, 225, 0.5)', // surface-container approx
    padding: theme.spacing.lg,
    borderRadius: 20,
  },
  journeyTitle: {
    ...theme.typography.h3,
    fontSize: 18,
    marginBottom: 8,
    color: theme.colors.onSurface,
  },
  journeyDesc: {
    ...theme.typography.bodyMedium,
    color: theme.colors.onSurfaceVariant,
    marginBottom: theme.spacing.md,
  },
  journeyAction: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  journeyActionText: {
    ...theme.typography.labelSmall,
    color: theme.colors.primary,
    marginRight: 8,
  }
});
