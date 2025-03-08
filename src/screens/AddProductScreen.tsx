import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  SafeAreaView,
} from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { CATEGORIES } from '../data/mockData';
import { RootStackParamList } from '../types';
import ScreenLayout from '../components/ScreenLayout';
import { scale } from '../utils/responsive';
import CategoryTabs from '../components/CategoryTabs';

type AddProductScreenRouteProp = RouteProp<RootStackParamList, 'AddProduct'>;

const AddProductScreen: React.FC = () => {
  const route = useRoute<AddProductScreenRouteProp>();
  
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [notes, setNotes] = useState('');
  const [location, setLocation] = useState('Armazém');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  
  useEffect(() => {
    if (route.params?.categoryId) {
      setSelectedCategory(route.params.categoryId);
    }
  }, [route.params]);

  const handleSaveProduct = () => {
    if (!productName || !quantity || !selectedCategory) {
      Alert.alert(
        'Campos Obrigatórios',
        'Por favor, preencha todos os campos obrigatórios (nome, quantidade e categoria).'
      );
      return;
    }
    
    const newProduct = {
      id: Math.random().toString(36).substring(2, 15),
      name: productName,
      categoryId: selectedCategory,
      quantity: parseFloat(quantity),
      unit: CATEGORIES.find(cat => cat.id === selectedCategory)?.unit || 'kg',
      dateAdded: new Date(),
      dateModified: new Date(),
      location: location,
      notes: notes || undefined
    };
    
    console.log('Novo produto:', newProduct);
    
    Alert.alert(
      'Produto Adicionado',
      `${productName} foi adicionado com sucesso.`,
      [{ text: 'OK', onPress: clearForm }]
    );
  };

  const clearForm = () => {
    setProductName('');
    setQuantity('');
    setSelectedCategory('');
    setNotes('');
  };

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    // Adicionar lógica adicional se necessário
  };

  return (
    <ScreenLayout title="Adicionar Produto">
      <ScrollView style={styles.content}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Nome do Produto *</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite o nome do produto"
            placeholderTextColor="#999999"
            value={productName}
            onChangeText={setProductName}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Categoria *</Text>
          <View style={styles.categoryContainer}>
            {CATEGORIES.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryButton,
                  selectedCategory === category.id && styles.categoryButtonSelected,
                ]}
                onPress={() => setSelectedCategory(category.id)}
              >
                <Text
                  style={[
                    styles.categoryButtonText,
                    selectedCategory === category.id && styles.categoryButtonTextSelected,
                  ]}
                >
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Quantidade *</Text>
          <View style={styles.quantityContainer}>
            <TextInput
              style={styles.quantityInput}
              placeholder="0"
              placeholderTextColor="#999999"
              value={quantity}
              onChangeText={setQuantity}
              keyboardType="numeric"
            />
            <View style={styles.unitSelector}>
              <Text style={styles.unitText}>
                {selectedCategory ? 
                  CATEGORIES.find(cat => cat.id === selectedCategory)?.unit || 'Unidades' 
                  : 'Unidades'}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Localização</Text>
          <TextInput
            style={styles.input}
            placeholder="Local de armazenamento"
            placeholderTextColor="#999999"
            value={location}
            onChangeText={setLocation}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Notas</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Adicione notas sobre o produto"
            placeholderTextColor="#999999"
            value={notes}
            onChangeText={setNotes}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSaveProduct}
        >
          <Text style={styles.saveButtonText}>Salvar Produto</Text>
        </TouchableOpacity>
      </ScrollView>

      <CategoryTabs 
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: scale(16),
  },
  formGroup: {
    marginBottom: scale(24),
  },
  label: {
    color: '#FFFFFF',
    fontSize: scale(16),
    marginBottom: scale(8),
  },
  input: {
    backgroundColor: '#2A2A2A',
    borderRadius: scale(8),
    color: '#FFFFFF',
    fontSize: scale(16),
    paddingHorizontal: scale(12),
    paddingVertical: scale(10),
  },
  textArea: {
    height: scale(100),
    paddingTop: scale(12),
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  categoryButton: {
    backgroundColor: '#2A2A2A',
    borderRadius: scale(8),
    paddingVertical: scale(8),
    paddingHorizontal: scale(12),
    marginRight: scale(8),
    marginBottom: scale(8),
  },
  categoryButtonSelected: {
    backgroundColor: '#3498DB',
  },
  categoryButtonText: {
    color: '#CCCCCC',
    fontSize: scale(14),
  },
  categoryButtonTextSelected: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityInput: {
    flex: 1,
    backgroundColor: '#2A2A2A',
    borderTopLeftRadius: scale(8),
    borderBottomLeftRadius: scale(8),
    color: '#FFFFFF',
    fontSize: scale(16),
    paddingHorizontal: scale(12),
    paddingVertical: scale(10),
  },
  unitSelector: {
    backgroundColor: '#3A3A3A',
    paddingHorizontal: scale(12),
    paddingVertical: scale(12),
    borderTopRightRadius: scale(8),
    borderBottomRightRadius: scale(8),
  },
  unitText: {
    color: '#FFFFFF',
    fontSize: scale(16),
  },
  saveButton: {
    backgroundColor: '#00b894',
    borderRadius: scale(8),
    paddingVertical: scale(14),
    alignItems: 'center',
    marginVertical: scale(24),
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: scale(16),
    fontWeight: 'bold',
  },
});

export default AddProductScreen;
