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
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { CATEGORIES } from '../data/mockData';
import { RootStackParamList } from '../types';
import { Unit } from '../types/models/product.types';
import { scale } from '../utils/responsive';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

type AddProductScreenRouteProp = RouteProp<RootStackParamList, 'AddProduct'>;

/**
 * Tela de adição de novo produto
 * 
 * Considerações importantes:
 * 1. Validação dos campos obrigatórios: nome, categoria, quantidade
 * 2. A unidade é determinada automaticamente com base na categoria selecionada
 * 3. Valores padrão são definidos quando apropriado (como status "Novo" e localização "Armazém")
 * 4. A pré-seleção de categoria pode ocorrer via parâmetros de navegação
 */
const AddProductScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<AddProductScreenRouteProp>();
  
  // Estados básicos do produto
  const [productName, setProductName] = useState('');
  const [productSubtype, setProductSubtype] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categoryName, setCategoryName] = useState('Selecionar');
  
  // Estados de quantidade
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState<Unit>('kg');
  
  // Estados de localização e status
  const [status, setStatus] = useState('Novo');
  const [location, setLocation] = useState('Armazém');
  
  // Informações adicionais
  const [campaign, setCampaign] = useState('');
  const [notes, setNotes] = useState('');
  const [stockAlert, setStockAlert] = useState('');
  const [price, setPrice] = useState('');

  // Verifica se há uma categoria pré-selecionada nos parâmetros de navegação
  useEffect(() => {
    if (route.params?.categoryId) {
      const categoryId = route.params.categoryId;
      setSelectedCategory(categoryId);
      
      // Encontra a categoria e atualiza o nome e a unidade
      const category = CATEGORIES.find(cat => cat.id === categoryId);
      if (category) {
        setCategoryName(category.name);
        setUnit(category.unit || 'kg');
      }
    }
  }, [route.params]);

  /**
   * Salva o novo produto após validações
   * 
   * Fluxo:
   * 1. Valida campos obrigatórios
   * 2. Cria o objeto de produto
   * 3. Salva no armazenamento (mock por enquanto)
   * 4. Mostra confirmação e limpa o formulário
   */
  const handleSaveProduct = () => {
    // Validação de campos obrigatórios
    if (!productName || !quantity || !selectedCategory) {
      Alert.alert(
        'Campos Obrigatórios',
        'Por favor, preencha todos os campos obrigatórios (nome, quantidade e categoria).'
      );
      return;
    }
    
    // Criação do objeto de produto
    const newProduct = {
      id: Math.random().toString(36).substring(2, 15),
      name: productName,
      description: productSubtype || undefined,
      categoryId: selectedCategory,
      quantity: parseFloat(quantity),
      unit: unit,
      dateAdded: new Date(),
      dateModified: new Date(),
      
      // Campos opcionais
      notes: notes || undefined,
      stockAlert: stockAlert ? parseFloat(stockAlert) : undefined,
      price: price ? parseFloat(price) : undefined,
      location: location,
      // Outros campos podem ser adicionados aqui conforme necessário
    };
    
    console.log('Novo produto:', newProduct);
    
    // Mock de salvamento - em produção, isso chamaria um serviço de API
    Alert.alert(
      'Produto Adicionado',
      `${productName} foi adicionado com sucesso.`,
      [{ text: 'OK', onPress: () => {
        clearForm();
        // Opcional: navegar de volta após salvar
        // navigation.goBack();
      }}]
    );
  };

  /**
   * Limpa todos os campos do formulário
   */
  const clearForm = () => {
    setProductName('');
    setProductSubtype('');
    setSelectedCategory('');
    setCategoryName('Selecionar');
    setQuantity('');
    setUnit('kg');
    setStatus('Novo');
    setLocation('Armazém');
    setCampaign('');
    setNotes('');
    setStockAlert('');
    setPrice('');
  };

  /**
   * Abre o seletor de categorias
   * Na implementação real, isso abriria um modal ou navegaria para uma tela de seleção
   */
  const handleCategorySelect = () => {
    // Mock - em produção, isso abriria um modal ou navegaria para uma tela de seleção
    Alert.alert(
      'Selecionar Categoria',
      'Escolha uma categoria:',
      CATEGORIES.map(cat => ({
        text: cat.name,
        onPress: () => {
          setSelectedCategory(cat.id);
          setCategoryName(cat.name);
          setUnit(cat.unit || 'kg');
        }
      }))
    );
  };

  /**
   * Abre o seletor de estados do produto
   */
  const handleStatusSelect = () => {
    Alert.alert(
      'Selecionar Estado',
      'Escolha o estado do produto:',
      [
        { text: 'Novo', onPress: () => setStatus('Novo') },
        { text: 'Usado', onPress: () => setStatus('Usado') },
        { text: 'Reacondicionado', onPress: () => setStatus('Reacondicionado') },
        { text: 'Cancelar', style: 'cancel' }
      ]
    );
  };

  /**
   * Abre o seletor de unidades
   */
  const handleUnitSelect = () => {
    Alert.alert(
      'Selecionar Unidade',
      'Escolha a unidade de medida:',
      [
        { text: 'kg', onPress: () => setUnit('kg') },
        { text: 'Unidades', onPress: () => setUnit('Unidades') },
        { text: 'litros', onPress: () => setUnit('litros') },
        { text: 'gramas', onPress: () => setUnit('gramas') },
        { text: 'Cancelar', style: 'cancel' }
      ]
    );
  };

  /**
   * Cancela a adição e volta para a tela anterior
   */
  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Cabeçalho com botões de ação */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleCancel} style={styles.headerButton}>
          <Text style={styles.cancelButtonText}>Cancelar</Text>
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Adicionar Produto</Text>
        
        <TouchableOpacity onPress={handleSaveProduct} style={styles.headerButton}>
          <Text style={styles.saveButtonText}>Salvar</Text>
        </TouchableOpacity>
      </View>
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingContainer}
      >
        <ScrollView style={styles.content}>
          {/* SEÇÃO: INFORMAÇÕES BÁSICAS */}
          <Text style={styles.sectionTitle}>INFORMAÇÕES BÁSICAS</Text>
          <View style={styles.formSection}>
            {/* Nome do Produto */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Nome"
                placeholderTextColor="#999999"
                value={productName}
                onChangeText={setProductName}
              />
            </View>
            
            {/* Campo MEL (Descrição ou tipo do mel) */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="MEL"
                placeholderTextColor="#999999"
                value={productSubtype}
                onChangeText={setProductSubtype}
              />
            </View>
            
            {/* Categoria */}
            <TouchableOpacity style={styles.selectContainer} onPress={handleCategorySelect}>
              <Text style={styles.selectLabel}>Categoria</Text>
              <View style={styles.selectValue}>
                <Text style={styles.selectValueText}>{categoryName}</Text>
                <MaterialCommunityIcons name="chevron-down" size={24} color="#3B82F6" />
              </View>
            </TouchableOpacity>
            
            {/* Subtipo (opcional) */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Subtipo (opcional)"
                placeholderTextColor="#999999"
                value={notes}
                onChangeText={setNotes}
              />
            </View>
          </View>
          
          {/* SEÇÃO: ESTADO E LOCALIZAÇÃO */}
          <Text style={styles.sectionTitle}>ESTADO E LOCALIZAÇÃO</Text>
          <View style={styles.formSection}>
            {/* Estado */}
            <TouchableOpacity style={styles.selectContainer} onPress={handleStatusSelect}>
              <Text style={styles.selectLabel}>Estado</Text>
              <View style={styles.selectValue}>
                <Text style={styles.selectValueText}>{status}</Text>
                <MaterialCommunityIcons name="chevron-down" size={24} color="#3B82F6" />
              </View>
            </TouchableOpacity>
            
            {/* Localização */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Localização"
                placeholderTextColor="#999999"
                value={location}
                onChangeText={setLocation}
              />
            </View>
          </View>
          
          {/* SEÇÃO: QUANTIDADE */}
          <Text style={styles.sectionTitle}>QUANTIDADE</Text>
          <View style={styles.formSection}>
            {/* Quantidade */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Quantidade"
                placeholderTextColor="#999999"
                value={quantity}
                onChangeText={setQuantity}
                keyboardType="numeric"
              />
            </View>
            
            {/* Unidade */}
            <TouchableOpacity style={styles.selectContainer} onPress={handleUnitSelect}>
              <Text style={styles.selectLabel}>Unidade</Text>
              <View style={styles.selectValue}>
                <Text style={styles.selectValueText}>{unit}</Text>
                <MaterialCommunityIcons name="chevron-down" size={24} color="#3B82F6" />
              </View>
            </TouchableOpacity>
          </View>
          
          {/* SEÇÃO: INFORMAÇÕES ADICIONAIS */}
          <Text style={styles.sectionTitle}>INFORMAÇÕES ADICIONAIS</Text>
          <View style={styles.formSection}>
            {/* Campanha */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Campanha (opcional)"
                placeholderTextColor="#999999"
                value={campaign}
                onChangeText={setCampaign}
              />
            </View>
            
            {/* Alerta de estoque */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Alerta de estoque mínimo (opcional)"
                placeholderTextColor="#999999"
                value={stockAlert}
                onChangeText={setStockAlert}
                keyboardType="numeric"
              />
            </View>
            
            {/* Preço */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Preço (opcional)"
                placeholderTextColor="#999999"
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  keyboardAvoidingContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(16),
    paddingVertical: scale(16),
    backgroundColor: '#121212',
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  headerButton: {
    padding: scale(8),
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: scale(20),
    fontWeight: 'bold',
  },
  cancelButtonText: {
    color: '#3B82F6',
    fontSize: scale(16),
  },
  saveButtonText: {
    color: '#3B82F6',
    fontSize: scale(16),
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: scale(16),
  },
  sectionTitle: {
    color: '#AAAAAA',
    fontSize: scale(14),
    marginBottom: scale(8),
  },
  formSection: {
    backgroundColor: '#121212',
    borderRadius: scale(12),
    marginBottom: scale(24),
    overflow: 'hidden',
  },
  inputContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  input: {
    color: '#FFFFFF',
    fontSize: scale(16),
    paddingHorizontal: scale(16),
    paddingVertical: scale(16),
  },
  selectContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(16),
    paddingVertical: scale(16),
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  selectLabel: {
    color: '#FFFFFF',
    fontSize: scale(16),
  },
  selectValue: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectValueText: {
    color: '#3B82F6',
    fontSize: scale(16),
    marginRight: scale(8),
  },
});

export default AddProductScreen;
