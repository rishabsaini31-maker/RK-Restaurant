import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, ActivityIndicator } from 'react-native';
import { 
  useFonts,
  NotoSerif_400Regular,
  NotoSerif_700Bold,
  NotoSerif_600SemiBold,
} from '@expo-google-fonts/noto-serif';
import { 
  BeVietnamPro_400Regular,
  BeVietnamPro_600SemiBold,
  BeVietnamPro_700Bold,
} from '@expo-google-fonts/be-vietnam-pro';
import AppNavigator from './src/navigation/AppNavigator';

import { AuthProvider } from './src/context/AuthContext';
import { CartProvider } from './src/context/CartContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a client for React Query caching
const queryClient = new QueryClient();

export default function App() {
  const [fontsLoaded] = useFonts({
    NotoSerif_400Regular,
    NotoSerif_700Bold,
    NotoSerif_600SemiBold,
    BeVietnamPro_400Regular,
    BeVietnamPro_600SemiBold,
    BeVietnamPro_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#FF6B00" />
      </View>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <AppNavigator />
          <StatusBar style="auto" />
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
