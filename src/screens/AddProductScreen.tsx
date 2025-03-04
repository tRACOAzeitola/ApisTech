import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { CATEGORIES } from '../data/mockData';

const AddProductScreen: React.FC = () => {
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [notes, setNotes] = useState('');

  const handleSaveProduct = () => {
    if (!productName || !quantity || !selectedCategory) {
      Alert.alert(
        'Campos Obrigatórios',
        'Por favor, preencha todos os campos obrigatórios (nome, quantidade e categoria).'
      );
      return;
    }

    // Aqui você adicionaria a lógica para salvar o produto
    Alert.alert(
      'Produto Adicionado',
      `${productName} foi adicionado ao inventário.`,
      [{ text: 'OK', onPress: () => clearForm() }]
    );
  };

  const clearForm = () => {
    setProductName('');
    setQuantity('');
    setSelectedCategory('');
    setNotes('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />

      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.title}>Adicionar Produto</Text>
      </View>

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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    marginRight: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  formGroup: {
    marginBottom: 24,
  },
  label: {
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#2A2A2A',
    borderRadius: 8,
    color: '#FFFFFF',
    fontSize: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  textArea: {
    height: 100,
    paddingTop: 12,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  categoryButton: {
    backgroundColor: '#2A2A2A',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  categoryButtonSelected: {
    backgroundColor: '#3498DB',
  },
  categoryButtonText: {
    color: '#CCCCCC',
    fontSize: 14,
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
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    color: '#FFFFFF',
    fontSize: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  unitSelector: {
    backgroundColor: '#3A3A3A',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  unitText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#00b894',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginVertical: 24,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddProductScreen;
