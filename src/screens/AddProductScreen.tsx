import React, { useState, useEffect, useCallback } from 'react';
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
  Platform,
  Switch
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { CATEGORIES } from '../data/mockData';
import { RootStackParamList } from '../types';
import { Unit } from '../types/models/product.types';
import { scale } from '../utils/responsive';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '../context/ThemeContext';

// Lista de apiários - seria carregada de uma API/banco de dados real
const APIARIES = [
  { id: '1', name: 'Apiário Sul' },
  { id: '2', name: 'Apiário Norte' },
  { id: '3', name: 'Apiário Centro' },
  { id: '4', name: 'Apiário Litoral' },
];

type AddProductScreenRouteProp = RouteProp<RootStackParamList, 'AddProduct'>;

/**
 * Tela de adição de novo produto
 * 
 * Considerações importantes:
 * 1. O ID é gerado automaticamente com base na categoria (MEL-, VET-, etc.)
 * 2. Localização varia para colmeias (armazém ou apiários específicos)
 * 3. Campos adaptados conforme o tipo de produto
 */
const AddProductScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<AddProductScreenRouteProp>();
  const { colors, isDark } = useTheme();
  
  // Estados básicos do produto
  const [productName, setProductName] = useState('');
  const [productId, setProductId] = useState('');
  const [productSubtype, setProductSubtype] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categoryName, setCategoryName] = useState('Selecionar');
  
  // Estados de quantidade
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState<Unit>('kg');
  
  // Estados de localização e status
  const [status, setStatus] = useState('Novo');
  const [location, setLocation] = useState('Armazém');
  const [apiary, setApiary] = useState('');
  const [isHive, setIsHive] = useState(false); // Flag para identificar se é uma colmeia
  
  // Informações adicionais
  const [campaign, setCampaign] = useState('');
  const [notes, setNotes] = useState('');
  const [stockAlert, setStockAlert] = useState('');
  const [price, setPrice] = useState('');

  // Gerar ID baseado na categoria e subtipo
  const generateProductId = useCallback(() => {
    if (!selectedCategory || !productSubtype) return '';
    
    // Extrair as 3 primeiras iniciais do subtipo (ou menos, se o subtipo for menor)
    const subtypeInitials = productSubtype.substring(0, 3).toUpperCase();
    
    // Gerar prefixo baseado na categoria
    let prefix = '';
    const category = CATEGORIES.find(cat => cat.id === selectedCategory);
    
    if (category) {
      if (category.id === '1') { // Mel
        prefix = 'MEL';
      } else if (category.id === '3') { // Produtos Veterinários
        prefix = 'VET';
      } else if (category.id === '2') { // Material de Colmeia
        prefix = 'COL';
        setIsHive(productSubtype.toLowerCase().includes('colmeia'));
      } else if (category.id === '4') { // Embalamento
        prefix = 'EMB';
      } else if (category.id === '5') { // Material de Visita
        prefix = 'VIS';
      } else if (category.id === '6') { // Equipamento de Melaria
        prefix = 'EQP';
      } else if (category.id === '7') { // Ferramentas Apícolas
        prefix = 'FER';
      } else if (category.id === '8') { // Cera
        prefix = 'CER';
      } else {
        prefix = 'PRD'; // Produto genérico
      }
    }
    
    if (subtypeInitials.length > 0) {
      return `${prefix} - ${subtypeInitials}`;
    }
    
    return prefix;
  }, [selectedCategory, productSubtype]);

  // Atualizar ID quando categoria ou subtipo mudarem
  useEffect(() => {
    const newId = generateProductId();
    setProductId(newId);
  }, [selectedCategory, productSubtype, generateProductId]);

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
        
        // Verificar se a categoria está relacionada a colmeias
        if (category.id === '2') { // Material de Colmeia
          setIsHive(true);
        }
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
    
    // Verificação adicional para colmeias
    if (isHive && location !== 'Armazém' && !apiary) {
      Alert.alert(
        'Localização Incompleta',
        'Para colmeias fora do armazém, por favor selecione um apiário.'
      );
      return;
    }
    
    // Criação do objeto de produto
    const newProduct = {
      id: productId || Math.random().toString(36).substring(2, 15),
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
      location: isHive && location !== 'Armazém' ? apiary : location,
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
    setProductId('');
    setProductSubtype('');
    setSelectedCategory('');
    setCategoryName('Selecionar');
    setQuantity('');
    setUnit('kg');
    setStatus('Novo');
    setLocation('Armazém');
    setApiary('');
    setIsHive(false);
    setCampaign('');
    setNotes('');
    setStockAlert('');
    setPrice('');
  };

  /**
   * Abre o seletor de categorias
   */
  const handleCategorySelect = () => {
    Alert.alert(
      'Selecionar Categoria',
      'Escolha uma categoria:',
      CATEGORIES.map(cat => ({
        text: cat.name,
        onPress: () => {
          setSelectedCategory(cat.id);
          setCategoryName(cat.name);
          setUnit(cat.unit || 'kg');
          
          // Verificar se a categoria está relacionada a colmeias
          if (cat.id === '2') { // Material de Colmeia
            // Verifica se o subtipo já foi preenchido e contém "colmeia"
            setIsHive(productSubtype.toLowerCase().includes('colmeia'));
          } else {
            setIsHive(false);
          }
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
   * Abre o seletor de localização para colmeias
   */
  const handleLocationSelect = () => {
    if (isHive) {
      Alert.alert(
        'Selecionar Localização',
        'Onde este produto está localizado?',
        [
          { text: 'Armazém', onPress: () => {
            setLocation('Armazém');
            setApiary('');
          }},
          { text: 'Apiário', onPress: () => {
            setLocation('Apiário');
            handleApiarySelect();
          }},
          { text: 'Cancelar', style: 'cancel' }
        ]
      );
    } else {
      Alert.alert(
        'Selecionar Localização',
        'Onde este produto está localizado?',
        [
          { text: 'Armazém', onPress: () => setLocation('Armazém') },
          { text: 'Estoque', onPress: () => setLocation('Estoque') },
          { text: 'Prateleira', onPress: () => setLocation('Prateleira') },
          { text: 'Outro', onPress: () => {
            // Permitir inserir localização personalizada
            setLocation('');
          }},
          { text: 'Cancelar', style: 'cancel' }
        ]
      );
    }
  };

  /**
   * Abre o seletor de apiários para colmeias
   */
  const handleApiarySelect = () => {
    Alert.alert(
      'Selecionar Apiário',
      'Em qual apiário este produto está localizado?',
      [
        ...APIARIES.map(apiaryItem => ({
          text: apiaryItem.name,
          onPress: () => setApiary(apiaryItem.name)
        })),
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

  // Definir cores baseadas no tema
  const backgroundColor = isDark ? colors.background : colors.background;
  const cardBackgroundColor = isDark 
    ? (colors.cardBackground?.dark || '#302403')
    : (colors.cardBackground?.light || '#FFFDF7');
  const textColor = isDark 
    ? (colors.text?.dark?.primary || '#FFF8E1')
    : (colors.text?.light?.primary || '#5D2E0D');
  const secondaryTextColor = isDark 
    ? (colors.text?.dark?.secondary || '#FFE082') 
    : (colors.text?.light?.secondary || '#8B4513');
  const accentColor = isDark
    ? (colors.primary?.dark || '#FFC107')
    : (colors.primary?.light || '#FFC107');
  const borderColor = isDark
    ? 'rgba(255, 193, 7, 0.2)'  // Amarelo transparente
    : 'rgba(139, 69, 19, 0.2)'; // Marrom transparente

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      {/* Cabeçalho com botões de ação */}
      <LinearGradient
        colors={isDark 
          ? (colors.gradients?.header?.dark || ['#5D2E0D', '#3E1F08']) 
          : (colors.gradients?.header?.light || ['#FFC107', '#FFB300'])}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <TouchableOpacity onPress={handleCancel} style={styles.headerButton}>
          <Text style={[styles.cancelButtonText, { color: isDark ? '#FFF8E1' : '#5D2E0D' }]}>Cancelar</Text>
        </TouchableOpacity>
        
        <Text style={[styles.headerTitle, { color: textColor }]}>Adicionar Produto</Text>
        
        <TouchableOpacity onPress={handleSaveProduct} style={styles.headerButton}>
          <Text style={[styles.saveButtonText, { color: accentColor }]}>Salvar</Text>
        </TouchableOpacity>
      </LinearGradient>
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingContainer}
      >
        <ScrollView 
          style={styles.content}
          contentContainerStyle={{ paddingBottom: scale(80) }}
        >
          {/* SEÇÃO: INFORMAÇÕES BÁSICAS */}
          <Text style={[styles.sectionTitle, { color: secondaryTextColor }]}>INFORMAÇÕES BÁSICAS</Text>
          <View style={[styles.formSection, { backgroundColor: cardBackgroundColor }]}>
            {/* Nome do Produto */}
            <View style={[styles.inputContainer, { borderBottomColor: borderColor }]}>
              <TextInput
                style={[styles.input, { color: textColor }]}
                placeholder="Nome do Produto"
                placeholderTextColor={secondaryTextColor}
                value={productName}
                onChangeText={setProductName}
              />
            </View>
            
            {/* ID do Produto (gerado automaticamente) */}
            <View style={[styles.inputContainer, { borderBottomColor: borderColor }]}>
              <Text style={[styles.inputLabel, { color: secondaryTextColor }]}>ID do Produto</Text>
              <Text style={[styles.generatedIdText, { color: accentColor }]}>{productId || 'Automático'}</Text>
            </View>
            
            {/* Subtipo */}
            <View style={[styles.inputContainer, { borderBottomColor: borderColor }]}>
              <TextInput
                style={[styles.input, { color: textColor }]}
                placeholder="Subtipo (Mediterrâneo, Varroa, etc.)"
                placeholderTextColor={secondaryTextColor}
                value={productSubtype}
                onChangeText={setProductSubtype}
              />
            </View>
            
            {/* Categoria */}
            <TouchableOpacity 
              style={[styles.selectContainer, { borderBottomColor: borderColor }]} 
              onPress={handleCategorySelect}
            >
              <Text style={[styles.selectLabel, { color: textColor }]}>Categoria</Text>
              <View style={styles.selectValue}>
                <Text style={[styles.selectValueText, { color: accentColor }]}>{categoryName}</Text>
                <MaterialCommunityIcons name="chevron-down" size={24} color={accentColor} />
              </View>
            </TouchableOpacity>
            
            {/* Notas - opcionais */}
            <View style={[styles.inputContainer, { borderBottomColor: borderColor }]}>
              <TextInput
                style={[styles.input, { color: textColor }]}
                placeholder="Notas (opcional)"
                placeholderTextColor={secondaryTextColor}
                value={notes}
                onChangeText={setNotes}
                multiline
              />
            </View>
          </View>
          
          {/* SEÇÃO: LOCALIZAÇÃO */}
          <Text style={[styles.sectionTitle, { color: secondaryTextColor }]}>LOCALIZAÇÃO</Text>
          <View style={[styles.formSection, { backgroundColor: cardBackgroundColor }]}>
            {/* Localização */}
            <TouchableOpacity 
              style={[styles.selectContainer, { borderBottomColor: borderColor }]} 
              onPress={handleLocationSelect}
            >
              <Text style={[styles.selectLabel, { color: textColor }]}>Localização</Text>
              <View style={styles.selectValue}>
                <Text style={[styles.selectValueText, { color: accentColor }]}>{location}</Text>
                <MaterialCommunityIcons name="chevron-down" size={24} color={accentColor} />
              </View>
            </TouchableOpacity>
            
            {/* Apiário - apenas para colmeias */}
            {isHive && location !== 'Armazém' && (
              <TouchableOpacity 
                style={[styles.selectContainer, { borderBottomColor: borderColor }]} 
                onPress={handleApiarySelect}
              >
                <Text style={[styles.selectLabel, { color: textColor }]}>Apiário</Text>
                <View style={styles.selectValue}>
                  <Text style={[styles.selectValueText, { color: accentColor }]}>{apiary || 'Selecionar'}</Text>
                  <MaterialCommunityIcons name="chevron-down" size={24} color={accentColor} />
                </View>
              </TouchableOpacity>
            )}
            
            {/* Status */}
            <TouchableOpacity 
              style={[styles.selectContainer, { borderBottomColor: borderColor }]} 
              onPress={handleStatusSelect}
            >
              <Text style={[styles.selectLabel, { color: textColor }]}>Estado</Text>
              <View style={styles.selectValue}>
                <Text style={[styles.selectValueText, { color: accentColor }]}>{status}</Text>
                <MaterialCommunityIcons name="chevron-down" size={24} color={accentColor} />
              </View>
            </TouchableOpacity>
          </View>
          
          {/* SEÇÃO: QUANTIDADE */}
          <Text style={[styles.sectionTitle, { color: secondaryTextColor }]}>QUANTIDADE</Text>
          <View style={[styles.formSection, { backgroundColor: cardBackgroundColor }]}>
            {/* Quantidade */}
            <View style={[styles.inputContainer, { borderBottomColor: borderColor }]}>
              <TextInput
                style={[styles.input, { color: textColor }]}
                placeholder="Quantidade"
                placeholderTextColor={secondaryTextColor}
                value={quantity}
                onChangeText={setQuantity}
                keyboardType="numeric"
              />
            </View>
            
            {/* Unidade */}
            <TouchableOpacity 
              style={[styles.selectContainer, { borderBottomColor: borderColor }]} 
              onPress={handleUnitSelect}
            >
              <Text style={[styles.selectLabel, { color: textColor }]}>Unidade</Text>
              <View style={styles.selectValue}>
                <Text style={[styles.selectValueText, { color: accentColor }]}>{unit}</Text>
                <MaterialCommunityIcons name="chevron-down" size={24} color={accentColor} />
              </View>
            </TouchableOpacity>
            
            {/* Alerta de estoque */}
            <View style={[styles.inputContainer, { borderBottomColor: borderColor }]}>
              <TextInput
                style={[styles.input, { color: textColor }]}
                placeholder="Alerta de estoque mínimo (opcional)"
                placeholderTextColor={secondaryTextColor}
                value={stockAlert}
                onChangeText={setStockAlert}
                keyboardType="numeric"
              />
            </View>
          </View>
          
          {/* SEÇÃO: INFORMAÇÕES ADICIONAIS */}
          <Text style={[styles.sectionTitle, { color: secondaryTextColor }]}>INFORMAÇÕES ADICIONAIS</Text>
          <View style={[styles.formSection, { backgroundColor: cardBackgroundColor }]}>
            {/* Campanha */}
            <View style={[styles.inputContainer, { borderBottomColor: borderColor }]}>
              <TextInput
                style={[styles.input, { color: textColor }]}
                placeholder="Campanha (opcional)"
                placeholderTextColor={secondaryTextColor}
                value={campaign}
                onChangeText={setCampaign}
              />
            </View>
            
            {/* Preço */}
            <View style={[styles.inputContainer, { borderBottomColor: borderColor }]}>
              <TextInput
                style={[styles.input, { color: textColor }]}
                placeholder="Preço (opcional)"
                placeholderTextColor={secondaryTextColor}
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
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  headerButton: {
    padding: scale(8),
  },
  headerTitle: {
    fontSize: scale(20),
    fontWeight: 'bold',
  },
  cancelButtonText: {
    fontSize: scale(16),
  },
  saveButtonText: {
    fontSize: scale(16),
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: scale(16),
  },
  sectionTitle: {
    fontSize: scale(14),
    marginBottom: scale(8),
    marginTop: scale(16),
  },
  formSection: {
    borderRadius: scale(12),
    marginBottom: scale(16),
    overflow: 'hidden',
  },
  inputContainer: {
    borderBottomWidth: 1,
    paddingHorizontal: scale(16),
    paddingVertical: scale(12),
  },
  inputLabel: {
    fontSize: scale(14),
    marginBottom: scale(4),
  },
  input: {
    fontSize: scale(16),
    paddingVertical: scale(4),
  },
  generatedIdText: {
    fontSize: scale(16),
    fontWeight: '500',
    paddingVertical: scale(4),
  },
  selectContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(16),
    paddingVertical: scale(16),
    borderBottomWidth: 1,
  },
  selectLabel: {
    fontSize: scale(16),
  },
  selectValue: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectValueText: {
    fontSize: scale(16),
    marginRight: scale(8),
  },
});

export default AddProductScreen;
