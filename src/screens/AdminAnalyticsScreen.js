import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, StatusBar, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from '../theme';

const { width } = Dimensions.get('window');

const KPICard = ({ title, value, icon, change, isPositive, color }) => (
  <View style={styles.kpiCard}>
    <View style={styles.kpiHeader}>
      <View style={[styles.iconWrapper, { backgroundColor: color + '20' }]}>
        <MaterialIcons name={icon} size={24} color={color} />
      </View>
      <View style={[styles.changeWrapper, { backgroundColor: isPositive ? '#a0f39940' : '#ffdad640' }]}>
        <Text style={[styles.changeText, { color: isPositive ? '#1b6d24' : '#ba1a1a' }]}>{change}</Text>
      </View>
    </View>
    <Text style={styles.kpiTitle}>{title}</Text>
    <Text style={styles.kpiValue}>{value}</Text>
  </View>
);

const PopularDish = ({ name, orders, change, image, isPositive }) => (
  <View style={styles.dishRow}>
    <View style={styles.dishLeft}>
      <Image source={{ uri: image }} style={styles.dishImage} />
      <View>
        <Text style={styles.dishName}>{name}</Text>
        <Text style={styles.dishOrders}>{orders} orders</Text>
      </View>
    </View>
    <Text style={[styles.dishChange, { color: isPositive ? '#1b6d24' : '#ba1a1a' }]}>{change}</Text>
  </View>
);

export default function AdminAnalyticsScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color={theme.colors.onSurface} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Analytics Dashboard</Text>
        <View style={styles.headerRight} />
      </View>
      
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.topSection}>
          <Text style={styles.subtitle}>Performance Overview</Text>
          <View style={styles.actions}>
            <TouchableOpacity style={styles.actionBtn}>
              <MaterialIcons name="calendar-today" size={16} color={theme.colors.onSurface} />
              <Text style={styles.actionBtnText}>Last 30 Days</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.kpiGrid}>
          <KPICard title="Total Revenue" value="$128,430" icon="payments" change="+12.4%" isPositive={true} color={theme.colors.primary} />
          <KPICard title="Total Orders" value="3,241" icon="shopping-bag" change="+8.1%" isPositive={true} color="#1b6d24" />
          <KPICard title="Avg. Order Value" value="$39.60" icon="restaurant" change="-2.4%" isPositive={false} color="#0062a1" />
          <KPICard title="Retention Rate" value="64.2%" icon="group" change="+5.6%" isPositive={true} color="#5a4136" />
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Popular Dishes</Text>
          <PopularDish 
            name="Zesty Buddha Bowl" 
            orders="842" 
            change="+15%" 
            isPositive={true}
            image="https://lh3.googleusercontent.com/aida-public/AB6AXuDnISMq-8WcpJ7Ih7ncq6SYBi_eLYH1A4-LIWjycV91_sF_a0m3lgR9X4rxwHHCkwVWOyZCo566plfScnNvl0ELMTmGaIoRkx2dC-q3ss1QDc5wmd73S_o7YSGNqFbMXFKiecc_mJXzYxzeDFUyVDJ-0f4afszD91PYDkI0AUzIipOSE7_J_EyB-ax7jRiZC391PDWz0FXmLMjLlLf-4onL8rFXRrhjQdJq6aXTPcgwZR3WglJTEqnLeiec8_zV-_Q5sPtNQnFKL_CK" 
          />
          <PopularDish 
            name="Heritage Greek Salad" 
            orders="765" 
            change="+12%" 
            isPositive={true}
            image="https://lh3.googleusercontent.com/aida-public/AB6AXuAqfDfWeC7DZQfQZNxHkEurgNRB6nEQiRitR5CrEnbU7sZMblIfInRTkFCQVKyiqFtdZq9SorzT3TumPpL-VzXJ99-InCVXsxy5Xo-QhQvjnrPwHS8q6j9KSz9BFq5AREj5gHfNvLf6o30oDtSk-at-BYEtumZo_bpiwH2GZD6Z3j-ziY6o-88UTSigiCuatWxty3qhqg2bffYpLH4avbIP5FyHN2hlYGtNYS_H1tMMUXdqIkYD_IuBjRfL2SrHn6qvDuO1ii7sqLEz" 
          />
          <PopularDish 
            name="Truffle Mushroom Risotto" 
            orders="621" 
            change="-4%" 
            isPositive={false}
            image="https://lh3.googleusercontent.com/aida-public/AB6AXuCfbY7YVbnGZTefLxi2ccufj0D0DX0yMQnR2oFfFvzsv1mgYkeqn9CaE5MOxwMYW4m629BIvrz4__wSHMhk5Lj2PgZ3swq2SzhmKr8uyI6huCQX13YhvvZBbAmcSXRuWmzZTJ1NXg_YF4WEzTaEQ2TmQQOKU-lnpxiikzDIsEqQJAXwzbKcmtR1kpJVfEyLYJ1-dxUD03cQqA-I0yAmUyTZAURmaG4n06jLzWmV6wnWReOEph0He4mptK5VPogluAJwVB_QKeQyWmzm" 
          />
          <TouchableOpacity style={styles.viewAllBtn}>
            <Text style={styles.viewAllText}>View All Menu Analytics</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: theme.colors.background, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 24, paddingBottom: 16 },
  backButton: { padding: 4 },
  headerTitle: { ...theme.typography.h2, fontSize: 24, color: theme.colors.onSurface },
  headerRight: { width: 32 },
  container: { padding: 24, paddingBottom: 80 },
  topSection: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 24 },
  subtitle: { ...theme.typography.labelSmall, color: theme.colors.primary, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 4 },
  actions: { flexDirection: 'row' },
  actionBtn: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: theme.colors.outlineVariant },
  actionBtnText: { ...theme.typography.labelSmall, marginLeft: 8, color: theme.colors.onSurface },
  
  kpiGrid: { flexDirection: width > 600 ? 'row' : 'column', flexWrap: 'wrap', gap: 16, marginBottom: 24 },
  kpiCard: { backgroundColor: '#fff', padding: 20, borderRadius: 16, width: width > 600 ? '48%' : '100%', ...theme.shadows.level1 },
  kpiHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  iconWrapper: { padding: 8, borderRadius: 8 },
  changeWrapper: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  changeText: { fontSize: 12, fontWeight: 'bold' },
  kpiTitle: { ...theme.typography.bodyMedium, color: theme.colors.onSurfaceVariant, marginBottom: 4 },
  kpiValue: { ...theme.typography.h2, fontSize: 32, color: theme.colors.onSurface },

  sectionCard: { backgroundColor: '#fff', padding: 20, borderRadius: 16, ...theme.shadows.level1 },
  sectionTitle: { ...theme.typography.h3, marginBottom: 20 },
  dishRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  dishLeft: { flexDirection: 'row', alignItems: 'center' },
  dishImage: { width: 48, height: 48, borderRadius: 8, marginRight: 16 },
  dishName: { ...theme.typography.bodyMedium, fontWeight: 'bold', color: theme.colors.onSurface },
  dishOrders: { fontSize: 12, color: '#888', marginTop: 2 },
  dishChange: { fontWeight: 'bold' },
  viewAllBtn: { padding: 12, borderRadius: 30, borderWidth: 1, borderColor: theme.colors.outlineVariant, alignItems: 'center', marginTop: 8 },
  viewAllText: { fontSize: 12, fontWeight: 'bold', color: theme.colors.outline },
});
