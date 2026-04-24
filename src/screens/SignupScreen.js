import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Platform, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from '../theme';
import { useAuth } from '../context/AuthContext';

export default function SignupScreen({ navigation }) {
  const [isChecked, setIsChecked] = useState(false);
  const { signup } = useAuth();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSignup = async () => {
    if (!isChecked) {
      setError("Please agree to the Terms and Conditions.");
      return;
    }
    try {
      setError(null);
      await signup(email, password, name);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header Navigation */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <MaterialIcons name="eco" size={24} color={theme.colors.primary} />
          <Text style={styles.brandText}>RK Restaurant</Text>
        </View>
        <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
          <MaterialIcons name="close" size={16} color={theme.colors.outline} />
          <Text style={styles.closeText}>Exit</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.formCard}>
          <View style={styles.titleSection}>
            <View style={styles.subtitleRow}>
              <View style={styles.dash} />
              <Text style={styles.subtitleText}>THE INNER CIRCLE</Text>
            </View>
            <Text style={styles.titleText}>Join the Sattva Community</Text>
            <Text style={styles.descText}>Create your profile to experience elevated vegetarian fine dining.</Text>
          </View>

          <View style={styles.form}>
            {/* Full Name */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Full Name</Text>
              <View style={styles.inputContainer}>
                <MaterialIcons name="person" size={20} color={theme.colors.outline} style={styles.inputIcon} />
                <TextInput 
                  style={styles.input} 
                  placeholder="Aravind Sharma"
                  placeholderTextColor={theme.colors.outlineVariant}
                  value={name}
                  onChangeText={setName}
                />
              </View>
            </View>

            {/* Email */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Email Address</Text>
              <View style={styles.inputContainer}>
                <MaterialIcons name="mail" size={20} color={theme.colors.outline} style={styles.inputIcon} />
                <TextInput 
                  style={styles.input} 
                  placeholder="aravind@example.com"
                  placeholderTextColor={theme.colors.outlineVariant}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>
            </View>

            {/* Phone */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Phone Number</Text>
              <View style={styles.inputContainer}>
                <MaterialIcons name="phone-iphone" size={20} color={theme.colors.outline} style={styles.inputIcon} />
                <TextInput 
                  style={styles.input} 
                  placeholder="+91 98765 43210"
                  placeholderTextColor={theme.colors.outlineVariant}
                  keyboardType="phone-pad"
                />
              </View>
            </View>

            {/* Password */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Password</Text>
              <View style={styles.inputContainer}>
                <MaterialIcons name="lock" size={20} color={theme.colors.outline} style={styles.inputIcon} />
                <TextInput 
                  style={styles.input} 
                  placeholder="••••••••"
                  placeholderTextColor={theme.colors.outlineVariant}
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity>
                  <MaterialIcons name="visibility" size={20} color={theme.colors.outlineVariant} />
                </TouchableOpacity>
              </View>
            </View>

            {/* Terms */}
            <View style={styles.termsContainer}>
              <TouchableOpacity style={styles.checkbox} onPress={() => setIsChecked(!isChecked)}>
                {isChecked && <MaterialIcons name="check" size={14} color={theme.colors.primary} />}
              </TouchableOpacity>
              <Text style={styles.termsText}>
                I agree to the <Text style={styles.termsLink}>Terms and Conditions</Text> and Privacy Policy.
              </Text>
            </View>

            {error && <Text style={{ color: theme.colors.error, marginBottom: 16, textAlign: 'center' }}>{error}</Text>}

            {/* Submit Button */}
            <TouchableOpacity 
              style={styles.primaryButton}
              onPress={handleSignup}
            >
              <Text style={styles.primaryButtonText}>Sign Up</Text>
              <MaterialIcons name="arrow-forward" size={18} color="#ffffff" />
            </TouchableOpacity>

            <View style={styles.dividerContainer}>
              <View style={styles.divider} />
              <View style={styles.dividerTextContainer}>
                <Text style={styles.dividerText}>Already a member?</Text>
              </View>
            </View>

            {/* Login Link */}
            <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.navigate('Login')}>
              <Text style={styles.secondaryButtonText}>Login</Text>
            </TouchableOpacity>
          </View>

          {/* Pure Veg Indicator */}
          <View style={styles.vegIndicator}>
            <View style={styles.vegBadge}>
              <View style={styles.vegDot} />
            </View>
            <Text style={styles.vegIndicatorText}>100% PURE VEGETARIAN EXCELLENCE</Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.footerIcons}>
            <MaterialIcons name="energy-savings-leaf" size={24} color={theme.colors.primaryContainer} />
            <MaterialIcons name="local-florist" size={24} color={theme.colors.primaryContainer} />
            <MaterialIcons name="eco" size={24} color={theme.colors.primaryContainer} />
          </View>
          <Text style={styles.footerText}>EST. 2024 — CONSCIOUS LUXURY</Text>
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
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 20 : 20,
    paddingBottom: theme.spacing.sm,
    backgroundColor: 'rgba(255, 248, 246, 0.9)',
    zIndex: 10,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandText: {
    ...theme.typography.h3,
    fontSize: 18,
    color: theme.colors.primary,
    fontStyle: 'italic',
    marginLeft: 8,
  },
  closeButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  closeText: {
    ...theme.typography.labelSmall,
    color: theme.colors.outline,
    marginLeft: 4,
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.lg,
    paddingBottom: 40,
  },
  formCard: {
    backgroundColor: '#ffffff',
    borderRadius: 32,
    padding: theme.spacing.lg,
    ...theme.shadows.level2,
  },
  titleSection: {
    marginBottom: theme.spacing.xl,
  },
  subtitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  dash: {
    width: 40,
    height: 1,
    backgroundColor: theme.colors.primaryContainer,
    marginRight: 8,
  },
  subtitleText: {
    ...theme.typography.labelSmall,
    color: theme.colors.primaryContainer,
    letterSpacing: 2,
  },
  titleText: {
    ...theme.typography.h2,
    fontSize: 32,
    color: theme.colors.onSurface,
    marginBottom: 12,
  },
  descText: {
    ...theme.typography.bodyMedium,
    color: theme.colors.onSurfaceVariant,
  },
  form: {
    marginBottom: theme.spacing.lg,
  },
  inputGroup: {
    marginBottom: theme.spacing.md,
  },
  inputLabel: {
    ...theme.typography.labelSmall,
    color: theme.colors.outlineVariant,
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(226, 191, 176, 0.4)',
    paddingBottom: 8,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    ...theme.typography.bodyMedium,
    color: theme.colors.onSurface,
    padding: 0,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 8,
    marginBottom: theme.spacing.lg,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: theme.colors.outlineVariant,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  termsText: {
    flex: 1,
    ...theme.typography.labelSmall,
    color: theme.colors.onSurfaceVariant,
    lineHeight: 18,
  },
  termsLink: {
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
  primaryButton: {
    backgroundColor: theme.colors.primaryContainer,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 30,
    ...theme.shadows.level1,
  },
  primaryButtonText: {
    ...theme.typography.bodyMedium,
    fontWeight: 'bold',
    color: '#ffffff',
    marginRight: 8,
  },
  dividerContainer: {
    position: 'relative',
    paddingVertical: 24,
    alignItems: 'center',
  },
  divider: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(226, 191, 176, 0.2)',
  },
  dividerTextContainer: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
  },
  dividerText: {
    ...theme.typography.labelSmall,
    color: theme.colors.outlineVariant,
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: theme.colors.primaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 30,
  },
  secondaryButtonText: {
    ...theme.typography.bodyMedium,
    color: theme.colors.primaryContainer,
  },
  vegIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(27, 109, 36, 0.05)',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'rgba(27, 109, 36, 0.1)',
  },
  vegBadge: {
    width: 14,
    height: 14,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: theme.colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  vegDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.secondary,
  },
  vegIndicatorText: {
    ...theme.typography.labelSmall,
    fontSize: 10,
    letterSpacing: 1.5,
    color: theme.colors.secondary,
    fontWeight: 'bold',
  },
  footer: {
    alignItems: 'center',
    marginTop: theme.spacing.xl,
    opacity: 0.4,
  },
  footerIcons: {
    flexDirection: 'row',
    gap: 32,
    marginBottom: 24,
  },
  footerText: {
    ...theme.typography.labelSmall,
    fontSize: 10,
    color: theme.colors.outline,
    letterSpacing: 2,
  }
});
