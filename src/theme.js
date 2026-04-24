export const theme = {
  colors: {
    primary: '#FF6B00',
    secondary: '#2E7D32', // Override from Fidelity
    background: '#fff8f6', // Warm Cream
    surface: '#ffffff',
    surfaceVariant: '#f8ddd2',
    onBackground: '#261812',
    onSurface: '#261812',
    onPrimary: '#ffffff',
    onSecondary: '#ffffff',
    outline: '#8e7164',
    error: '#ba1a1a',
    goldAccent: '#D4AF37', // Custom accent for loyalty/chef specials
  },
  typography: {
    h1: {
      fontFamily: 'NotoSerif_700Bold',
      fontSize: 48,
      lineHeight: 57.6, // 48 * 1.2
      letterSpacing: -0.96,
    },
    h2: {
      fontFamily: 'NotoSerif_600SemiBold',
      fontSize: 32,
      lineHeight: 41.6, // 32 * 1.3
      letterSpacing: -0.32,
    },
    h3: {
      fontFamily: 'NotoSerif_600SemiBold',
      fontSize: 24,
      lineHeight: 33.6, // 24 * 1.4
    },
    bodyLarge: {
      fontFamily: 'BeVietnamPro_400Regular',
      fontSize: 18,
      lineHeight: 28.8, // 18 * 1.6
    },
    bodyMedium: {
      fontFamily: 'BeVietnamPro_400Regular',
      fontSize: 16,
      lineHeight: 25.6, // 16 * 1.6
    },
    labelSmall: {
      fontFamily: 'BeVietnamPro_600SemiBold',
      fontSize: 12,
      lineHeight: 12,
      letterSpacing: 0.6,
      textTransform: 'uppercase',
    },
  },
  spacing: {
    xs: 4,
    base: 8,
    sm: 12,
    md: 24,
    lg: 48,
    xl: 80,
  },
  borderRadius: {
    sm: 4,
    md: 12,
    lg: 16, // Primary containers and cards (16px to 20px)
    xl: 24,
    full: 9999,
  },
  shadows: {
    level1: {
      shadowColor: '#1C1C1C',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.04,
      shadowRadius: 30,
      elevation: 2,
    },
    level2: {
      shadowColor: '#FF6B00',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.08,
      shadowRadius: 40,
      elevation: 4,
    },
  },
};
