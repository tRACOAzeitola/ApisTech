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
  Platform
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { Unit } from '../types/models/product.types';
import { scale } from '../utils/responsive';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '../context/ThemeContext';

// Lista de categorias disponíveis - similar ao Swift
const CATEGORIAS = [
  "Mel",
  "Material de Colmeia",
  "Produtos Veterinários",
  "Embalamento",
  "Material de Visita",
  "Equipamento de Melaria",
  "Ferramentas Apícolas",
  "Cera"
];

// Estados disponíveis para o produto - similar ao Swift
const ESTADOS = ["Novo", "Usado"];

// Unidades disponíveis - similar ao Swift
const UNIDADES = ["kg", "g", "L", "ml", "unid."];

type AddProductScreenRouteProp = RouteProp<RootStackParamList, 'AddProduct'>;

/**
 * Tela de adição de novo produto
 * Adaptado de AddProdutoView.swift para React Native
 */
const AddProductScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<AddProductScreenRouteProp>();
  const { colors, isDark } = useTheme();
  
  // Estados básicos do produto - alinhados com Swift
  const [codigo, setCodigo] = useState('');
  const [nome, setNome] = useState('');
  const [categoria, setCategoria] = useState('Mel'); // Valor padrão como no Swift
  const [subtipo, setSubtipo] = useState('');
  
  // Estados de localização e status
  const [estado, setEstado] = useState('Novo');
  const [localizacao, setLocalizacao] = useState('');
  
  // Estados de quantidade
  const [quantidade, setQuantidade] = useState('');
  const [unidade, setUnidade] = useState<Unit>('kg');
  
  // Informações adicionais
  const [campanha, setCampanha] = useState('');
  const [notas, setNotas] = useState('');

  /**
   * Gera o ID do produto baseado no nome e categoria
   * Adaptado diretamente de AddProdutoView.swift - função atualizarCodigo()
   */
  const atualizarCodigo = useCallback(() => {
    // Definir prefixos específicos para cada categoria
    let prefixoCategoria = '';
    
    switch (categoria) {
      case "Mel":
        prefixoCategoria = "MEL";
        break;
      case "Produtos Veterinários":
        prefixoCategoria = "VET";
        break;
      case "Material de Colmeia":
        prefixoCategoria = "COL";
        break;
      case "Embalamento":
        prefixoCategoria = "EMB";
        break;
      case "Material de Visita":
        prefixoCategoria = "VIS";
        break;
      case "Equipamento de Melaria":
        prefixoCategoria = "EQP";
        break;
      case "Ferramentas Apícolas":
        prefixoCategoria = "FER";
        break;
      case "Cera":
        prefixoCategoria = "CER";
        break;
      default:
        prefixoCategoria = String(categoria.substring(0, 3)).toUpperCase();
    }
    
    // Se não tiver nome, retorna apenas o prefixo da categoria
    if (!nome) {
      setCodigo(prefixoCategoria);
      return;
    }
    
    // Separar o nome em palavras e pegar as três primeiras letras de cada palavra
    const palavras = nome.split(' ');
    const codigosPalavras = palavras.map(palavra => 
      String(palavra.substring(0, 3)).toUpperCase()
    );
    
    // Juntar tudo com hífens
    const codigoPalavras = codigosPalavras.join('-');
    
    if (codigoPalavras) {
      setCodigo(`${prefixoCategoria}-${codigoPalavras}`);
    } else {
      setCodigo(prefixoCategoria);
    }
  }, [categoria, nome]);

  // Atualizar ID quando nome do produto ou categoria mudarem
  useEffect(() => {
    atualizarCodigo();
  }, [categoria, nome, atualizarCodigo]);

  // Verifica se há uma categoria pré-selecionada nos parâmetros de navegação
  useEffect(() => {
    if (route.params?.categoryId) {
      const categoryId = route.params.categoryId;
      
      // Encontra a categoria e atualiza o nome
      const categoryIndex = parseInt(categoryId) - 1;
      if (categoryIndex >= 0 && categoryIndex < CATEGORIAS.length) {
        setCategoria(CATEGORIAS[categoryIndex]);
      }
    }
  }, [route.params]);

  /**
   * Salva o novo produto após validações
   * Adaptado de AddProdutoView.swift - função salvarProduto()
   */
  const handleSaveProduct = () => {
    // Validação de campos obrigatórios
    if (!nome || !categoria) {
      Alert.alert(
        'Campos Obrigatórios',
        'Por favor, preencha o nome e a categoria do produto.'
      );
      return;
    }
    
    // Validar quantidade
    const quantidadeValue = parseFloat(quantidade.replace(',', '.'));
    if (isNaN(quantidadeValue) || quantidadeValue <= 0) {
      Alert.alert(
        'Quantidade Inválida',
        'Por favor, insira uma quantidade válida.'
      );
      return;
    }
    
    // Criação do objeto de produto
    const novoProduto = {
      id: Math.random().toString(36).substring(2, 15),
      codigo: codigo,
      nome: nome,
      categoria: categoria,
      subtipo: subtipo || undefined,
      estado: estado || 'Novo',
      localizacao: localizacao || 'Armazém',
      quantidade: quantidadeValue,
      unidade: unidade || 'kg',
      campanha: campanha || undefined,
      notas: notas || undefined,
      dataAdicao: new Date(),
      dataModificacao: new Date()
    };
    
    console.log('Novo produto:', novoProduto);
    
    // Também criar um registro de movimento de entrada - como no Swift
    const movimentacao = {
      id: Math.random().toString(36).substring(2, 15),
      produtoId: novoProduto.id,
      tipo: 'entrada',
      quantidade: quantidadeValue,
      unidade: unidade || 'kg',
      observacao: 'Produto adicionado ao estoque',
      data: new Date()
    };
    
    console.log('Movimento de entrada:', movimentacao);
    
    // Mock de salvamento - em produção, isso chamaria um serviço de API
    Alert.alert(
      'Produto Adicionado',
      `${nome} foi adicionado com sucesso.`,
      [{ text: 'OK', onPress: () => {
        clearForm();
        // Navegar de volta após salvar
        navigation.goBack();
      }}]
    );
  };

  /**
   * Limpa todos os campos do formulário
   */
  const clearForm = () => {
    setNome('');
    setCodigo('');
    setSubtipo('');
    setCategoria('Mel');
    setQuantidade('');
    setUnidade('kg');
    setEstado('Novo');
    setLocalizacao('');
    setCampanha('');
    setNotas('');
  };

  /**
   * Abre o seletor de categorias
   */
  const handleCategorySelect = () => {
    Alert.alert(
      'Selecionar Categoria',
      'Escolha uma categoria:',
      CATEGORIAS.map((cat, index) => ({
        text: cat,
        onPress: () => {
          setCategoria(cat);
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
        ...ESTADOS.map(state => ({
          text: state,
          onPress: () => setEstado(state)
        })),
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
        ...UNIDADES.map(unitItem => ({
          text: unitItem,
          onPress: () => setUnidade(unitItem as Unit)
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

  // Updated colors based on CategoryProductsScreen
  const backgroundColor = isDark ? '#000000' : '#F2F2F7';
  const cardBackgroundColor = isDark 
    ? '#1A1A1A'
    : '#FFFFFF';
  const textColor = isDark 
    ? '#FFFFFF'
    : '#000000';
  const secondaryTextColor = isDark 
    ? '#CCCCCC' 
    : '#666666';
  const accentColor = '#007AFF';  // iOS blue color instead of yellow
  const borderColor = isDark
    ? 'rgba(255, 255, 255, 0.1)'
    : 'rgba(0, 0, 0, 0.1)';

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      {/* Cabeçalho com botões de ação */}
      <LinearGradient
        colors={isDark 
          ? ['#0A84FF', '#007AFF'] 
          : ['#0A84FF', '#007AFF']}
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
              <Text style={[styles.inputLabel, { color: secondaryTextColor }]}>Nome</Text>
              <TextInput
                style={[styles.input, { color: textColor }]}
                placeholder="Digite o nome do produto"
                placeholderTextColor={secondaryTextColor}
                value={nome}
                onChangeText={setNome}
              />
            </View>
            
            {/* ID do Produto (gerado automaticamente) */}
            <View style={[styles.inputContainer, { borderBottomColor: borderColor }]}>
              <Text style={[styles.inputLabel, { color: secondaryTextColor }]}>Código</Text>
              <Text style={[styles.generatedIdText, { color: accentColor }]}>{codigo}</Text>
            </View>
            
            {/* Categoria */}
            <TouchableOpacity 
              style={[styles.selectContainer, { borderBottomColor: borderColor }]} 
              onPress={handleCategorySelect}
            >
              <Text style={[styles.selectLabel, { color: textColor }]}>Categoria</Text>
              <View style={styles.selectValue}>
                <Text style={[styles.selectValueText, { color: accentColor }]}>{categoria}</Text>
                <MaterialCommunityIcons name="chevron-down" size={24} color={accentColor} />
              </View>
            </TouchableOpacity>
            
            {/* Subtipo */}
            <View style={[styles.inputContainer, { borderBottomColor: borderColor }]}>
              <Text style={[styles.inputLabel, { color: secondaryTextColor }]}>Subtipo (opcional)</Text>
              <TextInput
                style={[styles.input, { color: textColor }]}
                placeholder="Subtipo (opcional)"
                placeholderTextColor={secondaryTextColor}
                value={subtipo}
                onChangeText={setSubtipo}
              />
            </View>
          </View>
          
          {/* SEÇÃO: ESTADO E LOCALIZAÇÃO */}
          <Text style={[styles.sectionTitle, { color: secondaryTextColor }]}>ESTADO E LOCALIZAÇÃO</Text>
          <View style={[styles.formSection, { backgroundColor: cardBackgroundColor }]}>
            {/* Estado */}
            <TouchableOpacity 
              style={[styles.selectContainer, { borderBottomColor: borderColor }]} 
              onPress={handleStatusSelect}
            >
              <Text style={[styles.selectLabel, { color: textColor }]}>Estado</Text>
              <View style={styles.selectValue}>
                <Text style={[styles.selectValueText, { color: accentColor }]}>{estado}</Text>
                <MaterialCommunityIcons name="chevron-down" size={24} color={accentColor} />
              </View>
            </TouchableOpacity>
            
            {/* Localização */}
            <View style={[styles.inputContainer, { borderBottomColor: borderColor }]}>
              <Text style={[styles.inputLabel, { color: secondaryTextColor }]}>Localização</Text>
              <TextInput
                style={[styles.input, { color: textColor }]}
                placeholder="Localização (ex: Armazém)"
                placeholderTextColor={secondaryTextColor}
                value={localizacao}
                onChangeText={setLocalizacao}
              />
            </View>
          </View>
          
          {/* SEÇÃO: QUANTIDADE */}
          <Text style={[styles.sectionTitle, { color: secondaryTextColor }]}>QUANTIDADE</Text>
          <View style={[styles.formSection, { backgroundColor: cardBackgroundColor }]}>
            {/* Quantidade */}
            <View style={[styles.inputContainer, { borderBottomColor: borderColor }]}>
              <Text style={[styles.inputLabel, { color: secondaryTextColor }]}>Quantidade</Text>
              <TextInput
                style={[styles.input, { color: textColor }]}
                placeholder="Digite a quantidade"
                placeholderTextColor={secondaryTextColor}
                value={quantidade}
                onChangeText={setQuantidade}
                keyboardType="numeric"
              />
            </View>
            
            {/* Unidade */}
            <TouchableOpacity 
              style={[styles.selectContainer, { borderBottomColor: 'transparent' }]} 
              onPress={handleUnitSelect}
            >
              <Text style={[styles.selectLabel, { color: textColor }]}>Unidade</Text>
              <View style={styles.selectValue}>
                <Text style={[styles.selectValueText, { color: accentColor }]}>{unidade}</Text>
                <MaterialCommunityIcons name="chevron-down" size={24} color={accentColor} />
              </View>
            </TouchableOpacity>
          </View>
          
          {/* SEÇÃO: INFORMAÇÕES ADICIONAIS */}
          <Text style={[styles.sectionTitle, { color: secondaryTextColor }]}>INFORMAÇÕES ADICIONAIS</Text>
          <View style={[styles.formSection, { backgroundColor: cardBackgroundColor }]}>
            {/* Campanha */}
            <View style={[styles.inputContainer, { borderBottomColor: borderColor }]}>
              <Text style={[styles.inputLabel, { color: secondaryTextColor }]}>Campanha (opcional)</Text>
              <TextInput
                style={[styles.input, { color: textColor }]}
                placeholder="Campanha (opcional)"
                placeholderTextColor={secondaryTextColor}
                value={campanha}
                onChangeText={setCampanha}
              />
            </View>
            
            {/* Notas */}
            <View style={[styles.inputContainer, { borderBottomColor: 'transparent' }]}>
              <Text style={[styles.inputLabel, { color: secondaryTextColor }]}>Notas (opcional)</Text>
              <TextInput
                style={[styles.textArea, { color: textColor, backgroundColor: isDark ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.5)' }]}
                placeholder="Informações adicionais (opcional)"
                placeholderTextColor={secondaryTextColor}
                value={notas}
                onChangeText={setNotas}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>
          </View>
          
          {/* Botão de Salvar */}
          <TouchableOpacity 
            style={[styles.saveButton, { backgroundColor: accentColor }]}
            onPress={handleSaveProduct}
          >
            <Text style={styles.saveButtonFullText}>SALVAR PRODUTO</Text>
          </TouchableOpacity>
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
    fontWeight: '600',
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
  textArea: {
    fontSize: scale(16),
    height: scale(100),
    borderRadius: scale(8),
    padding: scale(10),
    marginTop: scale(4),
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
  saveButton: {
    paddingVertical: scale(16),
    paddingHorizontal: scale(20),
    borderRadius: scale(8),
    alignItems: 'center',
    marginTop: scale(8),
    marginBottom: scale(24),
  },
  saveButtonFullText: {
    color: 'white',
    fontSize: scale(16),
    fontWeight: 'bold',
  }
});

export default AddProductScreen;
