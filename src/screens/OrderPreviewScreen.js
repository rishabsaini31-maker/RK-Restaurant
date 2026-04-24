import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../theme';

export default function OrderPreviewScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order Preview</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    ...theme.typography.h2,
    color: theme.colors.onBackground,
  },
});
