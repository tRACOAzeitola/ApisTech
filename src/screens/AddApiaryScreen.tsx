import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  Switch
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { scale } from '../utils/responsive';
import { useTheme } from '../context/ThemeContext';
import { RootStackParamList } from '../types';
import ScreenLayout from '../components/ScreenLayout';

type AddApiaryScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'AddApiary'>;

// Interface para novo apiário
interface NewApiary {
  name: string;
  location: string;
  coordinates?: string;
  hiveCount: number;
  notes?: string;
  floraTypes?: string[];
  estimatedProduction?: number;
  owner?: string;
  contact?: string;
}

// Opções comuns de flora para seleção rápida
const COMMON_FLORA_OPTIONS = [
  "Rosmaninho",
  "Queiró",
  "Torga",
  "Urze",
  "Carvalho",
  "Castanheiro",
  "Multi-flora"
];

const AddApiaryScreen: React.FC = () => {
  const navigation = useNavigation<AddApiaryScreenNavigationProp>();
  const { colors, isDark } = useTheme();
  
  // Estados para os campos do formulário
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [coordinates, setCoordinates] = useState('');
  const [hiveCount, setHiveCount] = useState('');
  const [notes, setNotes] = useState('');
  const [floraTypes, setFloraTypes] = useState('');
  const [estimatedProduction, setEstimatedProduction] = useState('');
  const [owner, setOwner] = useState('');
  const [contact, setContact] = useState('');
  
  // Adicionar um tipo de flora à lista
  const addFloraType = (flora: string) => {
    // Converter a string atual em array para verificar se o tipo já existe
    const currentFlora = floraTypes
      .split(',')
      .map(item => item.trim())
      .filter(item => item.length > 0);
    
    // Verificar se o tipo já está na lista
    if (!currentFlora.includes(flora)) {
      if (floraTypes.length === 0) {
        setFloraTypes(flora);
      } else {
        setFloraTypes(floraTypes + ', ' + flora);
      }
    }
  };
  
  // Salvar o novo apiário
  const handleSaveApiary = () => {
    // Validações básicas
    if (!name || !location) {
      Alert.alert('Campos Obrigatórios', 'Por favor, preencha o nome e a localização do apiário.');
      return;
    }
    
    // Validar número de colmeias
    const hiveCountNum = parseInt(hiveCount);
    if (isNaN(hiveCountNum) || hiveCountNum <= 0) {
      Alert.alert('Número Inválido', 'Por favor, insira um número válido de colmeias.');
      return;
    }
    
    // Converter string de flora para array
    let floraTypesArray: string[] | undefined;
    if (floraTypes.trim().length > 0) {
      floraTypesArray = floraTypes
        .split(',')
        .map(item => item.trim())
        .filter(item => item.length > 0);
    }
    
    // Converter produção estimada para número, se preenchido
    let estimatedProductionNum: number | undefined;
    if (estimatedProduction.trim().length > 0) {
      estimatedProductionNum = parseFloat(estimatedProduction.replace(',', '.'));
      if (isNaN(estimatedProductionNum)) {
        Alert.alert('Valor Inválido', 'Por favor, insira um valor numérico válido para a produção estimada.');
        return;
      }
    }
    
    // Criar objeto do novo apiário
    const newApiary: NewApiary = {
      name,
      location,
      hiveCount: hiveCountNum,
      notes: notes.trim().length > 0 ? notes : undefined,
      floraTypes: floraTypesArray,
      estimatedProduction: estimatedProductionNum,
      owner: owner.trim().length > 0 ? owner : undefined,
      contact: contact.trim().length > 0 ? contact : undefined,
      coordinates: coordinates.trim().length > 0 ? coordinates : undefined
    };
    
    // Aqui você enviaria os dados para uma API ou armazenaria localmente
    console.log('Novo apiário:', newApiary);
    
    // Sucesso ao salvar
    Alert.alert(
      'Apiário Adicionado',
      `O apiário ${name} foi adicionado com sucesso.`,
      [{ text: 'OK', onPress: () => navigation.goBack() }]
    );
  };
  
  // Cores atualizadas baseadas no tema
  const backgroundColor = isDark ? '#000000' : '#F2F2F7';
  const cardBackgroundColor = isDark 
    ? '#1A1A1A' // Cinza escuro
    : '#FFFFFF'; // Branco
  const textColor = isDark 
    ? '#FFFFFF' // Branco
    : '#000000'; // Preto
  const secondaryTextColor = isDark 
    ? '#CCCCCC' // Cinza claro
    : '#666666'; // Cinza
  const inputBackgroundColor = isDark
    ? 'rgba(30, 30, 30, 0.8)' // Cinza muito escuro semi-transparente
    : 'rgba(242, 242, 247, 0.7)'; // Cinza muito claro semi-transparente
  const placeholderColor = isDark
    ? 'rgba(255, 255, 255, 0.5)' // Branco semi-transparente
    : 'rgba(0, 0, 0, 0.3)'; // Preto semi-transparente
  const accentColor = '#007AFF'; // Azul iOS

  return (
    <ScreenLayout 
      title="Novo Apiário" 
      showBackButton={true}
      showHomeButton={false}
      onBackPress={() => navigation.goBack()}
      rightComponent={
        <TouchableOpacity onPress={handleSaveApiary}>
          <Text style={{ color: '#007AFF', fontSize: scale(16), fontWeight: 'bold' }}>Salvar</Text>
        </TouchableOpacity>
      }
    >
      <ScrollView 
        style={styles.container}
        contentContainerStyle={{ paddingBottom: scale(40) }}
        showsVerticalScrollIndicator={false}
      >
        {/* SEÇÃO: INFORMAÇÕES BÁSICAS */}
        <Text style={[styles.sectionTitle, { color: secondaryTextColor }]}>INFORMAÇÕES BÁSICAS</Text>
        <View style={[styles.formSection, { backgroundColor: cardBackgroundColor }]}>
          {/* Nome do Apiário */}
          <View style={styles.inputContainer}>
            <Text style={[styles.inputLabel, { color: secondaryTextColor }]}>Nome do Apiário</Text>
            <TextInput
              style={[styles.input, { 
                color: textColor,
                backgroundColor: inputBackgroundColor
              }]}
              value={name}
              onChangeText={setName}
              placeholder="Digite o nome do apiário"
              placeholderTextColor={placeholderColor}
            />
          </View>
          
          {/* Localização */}
          <View style={styles.inputContainer}>
            <Text style={[styles.inputLabel, { color: secondaryTextColor }]}>Localização</Text>
            <TextInput
              style={[styles.input, { 
                color: textColor,
                backgroundColor: inputBackgroundColor
              }]}
              value={location}
              onChangeText={setLocation}
              placeholder="Digite a localização do apiário"
              placeholderTextColor={placeholderColor}
            />
          </View>
          
          {/* Coordenadas */}
          <View style={styles.inputContainer}>
            <Text style={[styles.inputLabel, { color: secondaryTextColor }]}>Coordenadas (opcional)</Text>
            <TextInput
              style={[styles.input, { 
                color: textColor,
                backgroundColor: inputBackgroundColor
              }]}
              value={coordinates}
              onChangeText={setCoordinates}
              placeholder="Ex: 40.2033° N, 8.4103° W"
              placeholderTextColor={placeholderColor}
            />
          </View>
          
          {/* Número de Colmeias */}
          <View style={styles.inputContainer}>
            <Text style={[styles.inputLabel, { color: secondaryTextColor }]}>Número de Colmeias</Text>
            <TextInput
              style={[styles.input, { 
                color: textColor,
                backgroundColor: inputBackgroundColor
              }]}
              value={hiveCount}
              onChangeText={setHiveCount}
              placeholder="Insira o número de colmeias"
              placeholderTextColor={placeholderColor}
              keyboardType="numeric"
            />
          </View>
        </View>
        
        {/* SEÇÃO: FLORA PREDOMINANTE */}
        <Text style={[styles.sectionTitle, { color: secondaryTextColor }]}>FLORA PREDOMINANTE</Text>
        <View style={[styles.formSection, { backgroundColor: cardBackgroundColor }]}>
          <View style={styles.inputContainer}>
            <Text style={[styles.inputLabel, { color: secondaryTextColor }]}>Tipos de Flora (separados por vírgula)</Text>
            <TextInput
              style={[styles.input, { 
                color: textColor,
                backgroundColor: inputBackgroundColor
              }]}
              value={floraTypes}
              onChangeText={setFloraTypes}
              placeholder="Ex: Eucalipto, Laranjeira, Silvestre"
              placeholderTextColor={placeholderColor}
              multiline
            />
          </View>
          
          {/* Opções rápidas de flora - atualizado para usar azul */}
          <Text style={[styles.quickOptionsLabel, { color: secondaryTextColor }]}>Opções Comuns:</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.quickOptionsContainer}
          >
            {COMMON_FLORA_OPTIONS.map((flora, index) => (
              <TouchableOpacity 
                key={index}
                style={[styles.floraOption, { 
                  backgroundColor: isDark ? 'rgba(10, 132, 255, 0.15)' : 'rgba(10, 132, 255, 0.1)'
                }]}
                onPress={() => addFloraType(flora)}
              >
                <Text style={[styles.floraOptionText, { color: accentColor }]}>{flora}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        
        {/* SEÇÃO: INFORMAÇÕES ADICIONAIS */}
        <Text style={[styles.sectionTitle, { color: secondaryTextColor }]}>INFORMAÇÕES ADICIONAIS (OPCIONAL)</Text>
        <View style={[styles.formSection, { backgroundColor: cardBackgroundColor }]}>
          {/* Produção Estimada */}
          <View style={styles.inputContainer}>
            <Text style={[styles.inputLabel, { color: secondaryTextColor }]}>Produção Estimada (kg)</Text>
            <TextInput
              style={[styles.input, { 
                color: textColor,
                backgroundColor: inputBackgroundColor
              }]}
              value={estimatedProduction}
              onChangeText={setEstimatedProduction}
              placeholder="Estimativa de produção anual em kg"
              placeholderTextColor={placeholderColor}
              keyboardType="numeric"
            />
          </View>
          
          {/* Proprietário */}
          <View style={styles.inputContainer}>
            <Text style={[styles.inputLabel, { color: secondaryTextColor }]}>Proprietário</Text>
            <TextInput
              style={[styles.input, { 
                color: textColor,
                backgroundColor: inputBackgroundColor
              }]}
              value={owner}
              onChangeText={setOwner}
              placeholder="Nome do proprietário"
              placeholderTextColor={placeholderColor}
            />
          </View>
          
          {/* Contato */}
          <View style={styles.inputContainer}>
            <Text style={[styles.inputLabel, { color: secondaryTextColor }]}>Contato</Text>
            <TextInput
              style={[styles.input, { 
                color: textColor,
                backgroundColor: inputBackgroundColor
              }]}
              value={contact}
              onChangeText={setContact}
              placeholder="Número de telefone ou email"
              placeholderTextColor={placeholderColor}
              keyboardType="phone-pad"
            />
          </View>
        </View>
        
        {/* SEÇÃO: NOTAS */}
        <Text style={[styles.sectionTitle, { color: secondaryTextColor }]}>NOTAS (OPCIONAL)</Text>
        <View style={[styles.formSection, { backgroundColor: cardBackgroundColor }]}>
          <View style={styles.textAreaContainer}>
            <TextInput
              style={[styles.textArea, { 
                color: textColor,
                backgroundColor: inputBackgroundColor
              }]}
              value={notes}
              onChangeText={setNotes}
              placeholder="Adicione informações adicionais sobre o apiário"
              placeholderTextColor={placeholderColor}
              multiline
              numberOfLines={5}
              textAlignVertical="top"
            />
          </View>
        </View>
        
        {/* Botão de Salvar */}
        <TouchableOpacity 
          style={styles.saveButton} 
          onPress={handleSaveApiary}
        >
          <LinearGradient
            colors={['#0A84FF', '#007AFF', '#0063CC']}
            style={styles.saveButtonGradient}
          >
            <Text style={styles.saveButtonText}>SALVAR APIÁRIO</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: scale(16),
    backgroundColor: '#000000',
  },
  sectionTitle: {
    fontSize: scale(13),
    fontWeight: '600',
    textTransform: 'uppercase',
    marginBottom: scale(8),
    marginTop: scale(16),
  },
  formSection: {
    borderRadius: scale(12),
    overflow: 'hidden',
    marginBottom: scale(8),
  },
  inputContainer: {
    marginBottom: scale(16),
    paddingHorizontal: scale(16),
    paddingTop: scale(12),
  },
  inputLabel: {
    fontSize: scale(14),
    marginBottom: scale(8),
    fontWeight: '500',
  },
  input: {
    height: scale(44),
    borderRadius: scale(8),
    paddingHorizontal: scale(12),
    fontSize: scale(16),
  },
  quickOptionsLabel: {
    fontSize: scale(14),
    marginTop: scale(4),
    marginLeft: scale(16),
    marginBottom: scale(8),
  },
  quickOptionsContainer: {
    flexDirection: 'row',
    paddingHorizontal: scale(12),
    marginBottom: scale(16),
  },
  floraOption: {
    paddingHorizontal: scale(12),
    paddingVertical: scale(6),
    borderRadius: scale(16),
    marginRight: scale(8),
    marginBottom: scale(8),
  },
  floraOptionText: {
    fontSize: scale(14),
    fontWeight: '500',
  },
  textAreaContainer: {
    padding: scale(16),
  },
  textArea: {
    height: scale(120),
    borderRadius: scale(8),
    paddingHorizontal: scale(12),
    paddingVertical: scale(10),
    fontSize: scale(16),
    textAlignVertical: 'top',
  },
  saveButton: {
    marginTop: scale(24),
    marginBottom: scale(16),
    borderRadius: scale(8),
    overflow: 'hidden',
  },
  saveButtonGradient: {
    paddingVertical: scale(16),
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: scale(16),
    fontWeight: 'bold',
  },
  apiaryCard: {
    backgroundColor: '#1A1A1A',
  },
  hivesContainer: {
    backgroundColor: 'rgba(10, 132, 255, 0.1)',
  },
  fabGradient: {
  },
});

export default AddApiaryScreen; 