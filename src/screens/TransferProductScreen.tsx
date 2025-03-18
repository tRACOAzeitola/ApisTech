import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform,
  TextInput
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ScreenLayout from '../components/ScreenLayout';
import { scale } from '../utils/responsive';
import { useTheme } from '../context/ThemeContext';
import { Product, RootStackParamList } from '../types';

type TransferProductRouteProp = RouteProp<RootStackParamList, 'TransferProduct'>;
type TransferProductNavigationProp = NativeStackNavigationProp<RootStackParamList, 'TransferProduct'>;

// Mock data para apiários
const MOCK_APIARIES = [
  { id: '1', name: 'Carreira de Tiro', location: 'Lisboa' },
  { id: '2', name: 'Serra da Estrela', location: 'Covilhã' },
  { id: '3', name: 'Montanhas', location: 'Viseu' },
];

const TransferProductScreen: React.FC = () => {
  const route = useRoute<TransferProductRouteProp>();
  const navigation = useNavigation<TransferProductNavigationProp>();
  const { colors } = useTheme();
  
  const { product, returnToWarehouse = false } = route.params;
  
  const [quantity, setQuantity] = useState<string>('1');
  const [selectedApiaryId, setSelectedApiaryId] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [apiaries, setApiaries] = useState(MOCK_APIARIES);
  
  useEffect(() => {
    // Em uma implementação real, carregue os apiários do banco de dados
    // setApiaries(await apiaryService.getApiaries());
  }, []);
  
  const handleQuantityChange = (text: string) => {
    // Permitir apenas números
    const numericValue = text.replace(/[^0-9]/g, '');
    setQuantity(numericValue);
  };
  
  const handleTransfer = () => {
    const numQuantity = parseInt(quantity, 10);
    
    // Validações
    if (isNaN(numQuantity) || numQuantity <= 0) {
      Alert.alert('Erro', 'Por favor, insira uma quantidade válida.');
      return;
    }
    
    if (numQuantity > product.quantity) {
      Alert.alert('Erro', `Quantidade maior que o disponível (${product.quantity} ${product.unit}).`);
      return;
    }
    
    if (!returnToWarehouse && !selectedApiaryId) {
      Alert.alert('Erro', 'Por favor, selecione um apiário de destino.');
      return;
    }
    
    // Aqui você faria a chamada para o serviço de transferência
    // Em uma implementação real:
    /*
    try {
      await transferService.transferProduct({
        productId: product.id,
        fromLocation: returnToWarehouse ? product.location : 'Armazém',
        toLocation: returnToWarehouse ? 'Armazém' : selectedApiaryId,
        quantity: numQuantity,
        notes: notes
      });
      
      Alert.alert('Sucesso', 'Transferência realizada com sucesso!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível realizar a transferência.');
    }
    */
    
    // Para este exemplo, apenas mostraremos um alerta
    const fromLocation = returnToWarehouse ? product.location : 'Armazém';
    const toLocation = returnToWarehouse ? 'Armazém' : 
      apiaries.find(a => a.id === selectedApiaryId)?.name || 'Apiário Selecionado';
    
    Alert.alert(
      'Transferência Simulada',
      `Transferência de ${numQuantity} ${product.unit} de ${product.name} de ${fromLocation} para ${toLocation}.`,
      [{ text: 'OK', onPress: () => navigation.goBack() }]
    );
  };
  
  return (
    <ScreenLayout 
      title={returnToWarehouse ? 'Retornar ao Armazém' : 'Transferir para Apiário'}
      showBackButton={true}
    >
      <ScrollView style={styles.container}>
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productDetails}>
            Disponível: {product.quantity} {product.unit}
          </Text>
          <Text style={styles.productDetails}>
            Localização atual: {product.location || 'Armazém'}
          </Text>
        </View>
        
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Quantidade a transferir</Text>
          <TextInput
            style={styles.quantityInput}
            value={quantity}
            onChangeText={handleQuantityChange}
            keyboardType="numeric"
            placeholder="Quantidade"
            placeholderTextColor="#999"
          />
        </View>
        
        {!returnToWarehouse && (
          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>Selecione o Apiário Destino</Text>
            <View style={styles.apiaryList}>
              {apiaries.map(apiary => (
                <TouchableOpacity
                  key={apiary.id}
                  style={[
                    styles.apiaryItem,
                    selectedApiaryId === apiary.id && styles.selectedApiaryItem
                  ]}
                  onPress={() => setSelectedApiaryId(apiary.id)}
                >
                  <MaterialCommunityIcons
                    name={selectedApiaryId === apiary.id ? 'radiobox-marked' : 'radiobox-blank'}
                    size={24}
                    color={selectedApiaryId === apiary.id ? colors.accent.dark : colors.text.secondary}
                  />
                  <View style={styles.apiaryInfo}>
                    <Text style={styles.apiaryName}>{apiary.name}</Text>
                    <Text style={styles.apiaryLocation}>{apiary.location}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
        
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Notas (opcional)</Text>
          <TextInput
            style={styles.notesInput}
            value={notes}
            onChangeText={setNotes}
            placeholder="Adicione notas sobre esta transferência"
            placeholderTextColor="#999"
            multiline
          />
        </View>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.transferButton}
            onPress={handleTransfer}
          >
            <Text style={styles.transferButtonText}>
              {returnToWarehouse ? 'Retornar ao Armazém' : 'Transferir'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: scale(16),
  },
  productInfo: {
    marginBottom: scale(24),
    padding: scale(16),
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: scale(8),
  },
  productName: {
    fontSize: scale(18),
    fontWeight: 'bold',
    color: 'white',
    marginBottom: scale(8),
  },
  productDetails: {
    fontSize: scale(14),
    color: '#CCCCCC',
    marginBottom: scale(4),
  },
  formSection: {
    marginBottom: scale(24),
  },
  sectionTitle: {
    fontSize: scale(16),
    fontWeight: '600',
    color: 'white',
    marginBottom: scale(12),
  },
  quantityInput: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: scale(8),
    padding: scale(12),
    color: 'white',
    fontSize: scale(16),
  },
  apiaryList: {
    marginTop: scale(8),
  },
  apiaryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: scale(12),
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: scale(8),
    marginBottom: scale(8),
  },
  selectedApiaryItem: {
    backgroundColor: 'rgba(10, 132, 255, 0.2)',
  },
  apiaryInfo: {
    marginLeft: scale(12),
  },
  apiaryName: {
    fontSize: scale(16),
    fontWeight: '500',
    color: 'white',
  },
  apiaryLocation: {
    fontSize: scale(14),
    color: '#CCCCCC',
  },
  notesInput: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: scale(8),
    padding: scale(12),
    color: 'white',
    fontSize: scale(14),
    minHeight: scale(80),
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: scale(24),
  },
  cancelButton: {
    flex: 1,
    padding: scale(14),
    borderRadius: scale(8),
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginRight: scale(8),
    alignItems: 'center',
  },
  cancelButtonText: {
    color: 'white',
    fontWeight: '500',
  },
  transferButton: {
    flex: 2,
    padding: scale(14),
    borderRadius: scale(8),
    backgroundColor: '#4CD964',
    alignItems: 'center',
  },
  transferButtonText: {
    color: 'white',
    fontWeight: '600',
  },
});

export default TransferProductScreen; 