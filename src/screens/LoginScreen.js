import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground, Dimensions, ScrollView, Platform, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from '../theme';
import { useAuth } from '../context/AuthContext';

const { width, height } = Dimensions.get('window');

export default function LoginScreen({ navigation }) {
  const { login, continueAsGuest } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      setError(null);
      await login(email, password);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground 
        source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDboyg_xWvjyH6MOzXz7C92Q1IIiahcgPnL8RL5G5wVDa8FefjXV4BYvTHUfPGJjeB3viebgJnxoG-a88rQ943VHmmcKbsLTE5haHrnCIP3K_jBXUNNytgiqShPwZOENzzQMeTkPQ5tOHgpWKM3u7_cDgnm_Z9adwquC-339A5pTwJLsWZFQa8R9i8f5p8N7tSAolqZe4cPo4fpy9ViwgoBlQSWnJDLhech3pM8tSB_4KdNTSnlgxWOFs3PbhmcdTsRxvVGxWRlmuJO' }}
        style={styles.backgroundImage}
      >
        <View style={styles.overlay} />
      </ImageBackground>

      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header Identity */}
        <View style={styles.header}>
          <Text style={styles.brandTitle}>RK Restaurant</Text>
          <Text style={styles.brandSubtitle}>PURE FLAVORS, CONSCIOUS SOUL</Text>
        </View>

        {/* Login Card */}
        <View style={styles.card}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Email</Text>
            <View style={styles.inputContainer}>
              <TextInput 
                style={styles.input} 
                placeholder="Enter your email"
                placeholderTextColor={theme.colors.outline}
                autoCapitalize="none"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Password</Text>
            <View style={styles.inputContainer}>
              <TextInput 
                style={styles.input} 
                placeholder="••••••••"
                placeholderTextColor={theme.colors.outline}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity style={styles.eyeIcon}>
                <MaterialIcons name="visibility" size={20} color={theme.colors.outline} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          {error && <Text style={{ color: theme.colors.error, marginBottom: 16, textAlign: 'center' }}>{error}</Text>}

          <TouchableOpacity 
            style={styles.primaryButton} 
            onPress={handleLogin}
          >
            <Text style={styles.primaryButtonText}>Login to Sanctuary</Text>
            <MaterialIcons name="arrow-forward" size={18} color="#ffffff" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.primaryButton, { backgroundColor: 'transparent', borderWidth: 1, borderColor: theme.colors.outline, marginTop: 12 }]} 
            onPress={continueAsGuest}
          >
            <Text style={[styles.primaryButtonText, { color: theme.colors.onSurface }]}>Continue as Guest</Text>
          </TouchableOpacity>

          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>HARMONY VIA</Text>
            <View style={styles.divider} />
          </View>

          <View style={styles.socialGrid}>
            <TouchableOpacity style={styles.socialButton}>
              <Text style={styles.socialText}>Google</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Text style={styles.socialText}>Apple</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>New to the journey? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
              <Text style={styles.footerLink}>Create an Account</Text>
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
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: 350,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 248, 246, 0.7)', // Fallback for gradient
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: theme.spacing.md,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 40 : 80,
    paddingBottom: 40,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  brandTitle: {
    ...theme.typography.h2,
    color: theme.colors.primary,
    fontStyle: 'italic',
    marginBottom: 4,
  },
  brandSubtitle: {
    ...theme.typography.labelSmall,
    color: theme.colors.outline,
    letterSpacing: 2,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 32,
    padding: theme.spacing.lg,
    ...theme.shadows.level2,
  },
  inputGroup: {
    marginBottom: theme.spacing.md,
  },
  inputLabel: {
    ...theme.typography.labelSmall,
    color: theme.colors.onSurfaceVariant,
    marginBottom: 8,
    marginLeft: 4,
  },
  inputContainer: {
    backgroundColor: '#fff1eb', // surface-container-low
    borderRadius: 12,
    borderBottomWidth: 2,
    borderBottomColor: '#ffeae1', // surface-container
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
    ...theme.typography.bodyMedium,
    color: theme.colors.onSurface,
  },
  eyeIcon: {
    padding: 16,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: 8,
  },
  forgotPasswordText: {
    ...theme.typography.labelSmall,
    color: theme.colors.primary,
    fontStyle: 'italic',
  },
  primaryButton: {
    backgroundColor: theme.colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 30,
    marginTop: theme.spacing.sm,
    ...theme.shadows.level1,
  },
  primaryButtonText: {
    ...theme.typography.bodyMedium,
    fontWeight: 'bold',
    color: '#ffffff',
    marginRight: 8,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: theme.spacing.lg,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#ffeae1', // surface-container
  },
  dividerText: {
    ...theme.typography.labelSmall,
    color: theme.colors.outline,
    marginHorizontal: 16,
  },
  socialGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  socialButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: theme.colors.outlineVariant,
    borderRadius: 30,
  },
  socialText: {
    ...theme.typography.labelSmall,
    color: theme.colors.onSurface,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: theme.spacing.xl,
  },
  footerText: {
    ...theme.typography.bodyMedium,
    color: theme.colors.onSurfaceVariant,
  },
  footerLink: {
    ...theme.typography.bodyMedium,
    fontWeight: 'bold',
    color: theme.colors.primary,
    textDecorationLine: 'underline',
  }
});
