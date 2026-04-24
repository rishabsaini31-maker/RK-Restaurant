import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Platform, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from '../theme';

export default function DishDetailsScreen({ navigation, route }) {
  // Assuming dish data is passed via route.params
  const dish = route.params?.dish || {
    name: 'Saffron Infused Risotto',
    price: '₹2,450.00',
    description: 'Creamy arborio rice infused with premium Kashmiri saffron, topped with roasted pine nuts and micro-greens. A testament to artisanal purity.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBMSvWLRp2HXoz-roX3VlmaKT0VZztKaqq4QhCJpu_D0EBzvU-C5krlRnr8ETqgSddsBMoP4DlwH9pzK-acs9DRvKzdTmMV1C1WxgL2wVKPNZhxI7X5BM9xfwwZ9J17ZHIhhSiaC_G4eeaorefZnUkfABWuMD4eS3RFGg5WFJ-x1jfSFGum6kujEF_E3G840H6cmPaxydhG35DPtZHSlyDHlAYpg2_T-bpy6MCV1vG_hib39MhUQhemk1cuPJoeUERbJM99osR7yLkI',
    category: 'Heritage Entrées'
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: dish.image }} style={styles.image} />
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <Text style={styles.category}>{dish.category}</Text>
          <View style={styles.titleRow}>
            <Text style={styles.title}>{dish.name}</Text>
            <Text style={styles.price}>{dish.price}</Text>
          </View>
          <Text style={styles.description}>{dish.description}</Text>
          
          <View style={styles.tagsContainer}>
            <View style={styles.tag}>
              <MaterialIcons name="eco" size={16} color="green" />
              <Text style={styles.tagText}>100% Vegan</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.addToCartButton}>
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff', paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
  imageContainer: { width: '100%', height: 350, position: 'relative' },
  image: { width: '100%', height: '100%', resizeMode: 'cover' },
  backButton: { position: 'absolute', top: 16, left: 16, backgroundColor: 'rgba(255,255,255,0.8)', padding: 8, borderRadius: 20 },
  content: { padding: 24 },
  category: { color: theme.colors.primary, fontSize: 12, fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 8 },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  title: { ...theme.typography.h2, fontSize: 24, flex: 1 },
  price: { ...theme.typography.h3, fontSize: 20, color: theme.colors.onSurface },
  description: { ...theme.typography.bodyMedium, color: '#666', fontStyle: 'italic', marginBottom: 24, lineHeight: 24 },
  tagsContainer: { flexDirection: 'row', gap: 12 },
  tag: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: '#f5f5f5', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12 },
  tagText: { fontSize: 12, fontWeight: 'bold' },
  bottomBar: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 24, backgroundColor: '#fff', borderTopWidth: 1, borderColor: '#eee' },
  addToCartButton: { backgroundColor: theme.colors.primary, paddingVertical: 16, borderRadius: 30, alignItems: 'center' },
  addToCartText: { color: '#fff', fontSize: 16, fontWeight: 'bold', textTransform: 'uppercase' },
});
