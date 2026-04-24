import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, StatusBar, TextInput, Image, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { theme } from '../theme';
import { supabase } from '../services/supabase';

export default function AddDishScreen({ navigation }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    if (!name || !price) {
      Alert.alert('Error', 'Please fill in the dish name and price.');
      return;
    }

    try {
      setLoading(true);
      let uploadedImageUrl = null;

      // 1. Upload Image to Supabase Storage if selected
      if (imageUri) {
        const response = await fetch(imageUri);
        const blob = await response.blob();
        const fileExt = imageUri.split('.').pop() || 'jpg';
        const fileName = `${Date.now()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('dish_images')
          .upload(fileName, blob, {
            contentType: `image/${fileExt}`,
          });
          
        if (uploadError) throw uploadError;
        
        const { data: publicUrlData } = supabase.storage
          .from('dish_images')
          .getPublicUrl(fileName);
          
        uploadedImageUrl = publicUrlData.publicUrl;
      }

      // 2. We need a category_id to insert into products table.
      // For now, let's fetch any existing category or create a dummy one.
      let categoryId = null;
      const { data: categories } = await supabase.from('categories').select('id').limit(1);
      
      if (categories && categories.length > 0) {
        categoryId = categories[0].id;
      } else {
        const { data: newCat } = await supabase.from('categories').insert([{ name: 'General' }]).select();
        if (newCat) categoryId = newCat[0].id;
      }

      // 3. Insert Product into database
      const { error: insertError } = await supabase.from('products').insert([
        {
          name,
          price: parseFloat(price),
          image_url: uploadedImageUrl,
          category_id: categoryId,
          is_available: true,
        }
      ]);

      if (insertError) throw insertError;

      Alert.alert('Success', 'Dish added successfully!');
      navigation.goBack();
    } catch (err) {
      Alert.alert('Error', err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <MaterialIcons name="arrow-back" size={24} color={theme.colors.onSurface} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Add New Dish</Text>
          <View style={styles.headerRight} />
        </View>

        {/* Image Picker */}
        <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.previewImage} />
          ) : (
            <View style={styles.imagePlaceholder}>
              <MaterialIcons name="add-a-photo" size={40} color="#ccc" />
              <Text style={styles.imagePlaceholderText}>Upload Dish Image</Text>
            </View>
          )}
        </TouchableOpacity>

        <View style={styles.formGroup}>
          <Text style={styles.label}>DISH NAME</Text>
          <TextInput 
            style={styles.input} 
            placeholder="e.g. Saffron Infused Risotto" 
            value={name}
            onChangeText={setName}
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>PRICE ($)</Text>
          <TextInput 
            style={styles.input} 
            placeholder="0.00" 
            keyboardType="numeric" 
            value={price}
            onChangeText={setPrice}
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>DESCRIPTION</Text>
          <TextInput 
            style={[styles.input, { height: 100 }]} 
            placeholder="Describe the dish..." 
            multiline 
            value={description}
            onChangeText={setDescription}
          />
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.saveButtonText}>SAVE TO MENU</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff', paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
  container: { padding: 24, paddingBottom: 60 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 },
  backButton: { padding: 4 },
  headerTitle: { ...theme.typography.h2, fontSize: 20 },
  headerRight: { width: 32 },
  imagePicker: { width: '100%', height: 200, backgroundColor: '#f9f9f9', borderRadius: 16, marginBottom: 24, overflow: 'hidden', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#eee', borderStyle: 'dashed' },
  previewImage: { width: '100%', height: '100%' },
  imagePlaceholder: { alignItems: 'center' },
  imagePlaceholderText: { marginTop: 8, color: '#888', fontWeight: 'bold' },
  formGroup: { marginBottom: 24 },
  label: { fontSize: 12, fontWeight: 'bold', color: '#888', marginBottom: 8, textTransform: 'uppercase' },
  input: { backgroundColor: '#f9f9f9', padding: 16, borderRadius: 16, fontSize: 16, textAlignVertical: 'top' },
  saveButton: { backgroundColor: theme.colors.primary, padding: 16, borderRadius: 30, alignItems: 'center', marginTop: 16 },
  saveButtonText: { color: '#fff', fontSize: 14, fontWeight: 'bold', textTransform: 'uppercase' },
});
