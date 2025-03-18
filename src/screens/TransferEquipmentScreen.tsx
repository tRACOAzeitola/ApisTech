import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ScreenLayout from '../components/ScreenLayout';
import { scale } from '../utils/responsive';
import { useTheme } from '../context/ThemeContext';
import { RootStackParamList } from '../types';

type TransferEquipmentRouteProp = RouteProp<RootStackParamList, 'TransferEquipment'>;
type TransferEquipmentNavigationProp = NativeStackNavigationProp<RootStackParamList, 'TransferEquipment'>;

const TransferEquipmentScreen: React.FC = () => {
  const route = useRoute<TransferEquipmentRouteProp>();
  const navigation = useNavigation<TransferEquipmentNavigationProp>();
  const { colors } = useTheme();
  
  const { 
    apiaryId, 
    apiaryName, 
    productId, 
    productName, 
    isReturn,
    currentCount = 0
  } = route.params;
  
  const [quantity, setQuantity] = useState('1');
  const [notes, setNotes] = useState('');
  const [warehouseStock, setWarehouseStock] = useState(0);
  
  // Carregar estoque do armazém quando a tela é montada
  useEffect(() => {
    // Aqui você buscaria o estoque atual do armazém para este item
    // Para o exemplo, usamos valor fixo
    setWarehouseStock(productId === 'COL-COL' ? 150 : 300);
  }, [productId]);
  
  const handleQuantityChange = (text: string) => {
    // Apenas números positivos
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
    
    // Verificar limites
    if (isReturn) {
      // Não pode devolver mais do que existe no apiário
      if (numQuantity > currentCount) {
        Alert.alert('Erro', `Não é possível devolver mais do que ${currentCount} unidades existentes no apiário.`);
        return;
      }
    } else {
      // Não pode adicionar mais do que existe no armazém
      if (numQuantity > warehouseStock) {
        Alert.alert('Erro', `Não há estoque suficiente no armazém. Disponível: ${warehouseStock} unidades.`);
        return;
      }
    }
    
    // Simulação da transferência
    // Em uma implementação real, você faria a chamada para APIs/serviços
    
    // Criar registro da transferência
    const transferRecord = {
      id: Date.now().toString(),
      productId,
      productName,
      quantity: numQuantity,
      fromLocation: isReturn ? apiaryName : 'Armazém',
      toLocation: isReturn ? 'Armazém' : apiaryName,
      date: new Date(),
      notes: notes || undefined,
    };
    
    console.log('Transferência:', transferRecord);
    
    // Mostrar mensagem de sucesso e retornar
    Alert.alert(
      'Transferência concluída',
      `${numQuantity} unidades de ${productName} ${isReturn ? 'devolvidas ao armazém' : `transferidas para ${apiaryName}`}.`,
      [
        { 
          text: 'OK', 
          onPress: () => navigation.goBack() 
        }
      ]
    );
  };
  
  return (
    <ScreenLayout
      title={isReturn 
        ? `Devolver ${productName} ao Armazém` 
        : `Adicionar ${productName} ao Apiário`}
      showBackButton={true}
    >
      <ScrollView style={styles.container}>
        <View style={styles.infoCard}>
          <View style={styles.transferInfo}>
            <FontAwesome5 
              name={productId === 'COL-COL' ? 'home' : 'layer-group'} 
              size={24} 
              color={productId === 'COL-COL' ? '#FFC107' : '#FF9800'} 
              solid 
            />
            <View style={styles.transferDetails}>
              <Text style={styles.productTitle}>{productName} ({productId})</Text>
              <Text style={styles.locationText}>
                {isReturn
                  ? `De: ${apiaryName} → Para: Armazém`
                  : `De: Armazém → Para: ${apiaryName}`
                }
              </Text>
            </View>
          </View>
          
          <View style={styles.stockInfo}>
            <View style={styles.stockItem}>
              <Text style={styles.stockLabel}>No Armazém:</Text>
              <Text style={styles.stockValue}>{warehouseStock} unidades</Text>
            </View>
            <View style={styles.stockItem}>
              <Text style={styles.stockLabel}>No Apiário:</Text>
              <Text style={styles.stockValue}>{currentCount} unidades</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>
            {isReturn ? 'Quantidade a devolver:' : 'Quantidade a transferir:'}
          </Text>
          <TextInput
            style={styles.quantityInput}
            value={quantity}
            onChangeText={handleQuantityChange}
            keyboardType="numeric"
            placeholder="Quantidade"
            placeholderTextColor="#999"
          />
        </View>
        
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Notas (opcional):</Text>
          <TextInput
            style={styles.notesInput}
            value={notes}
            onChangeText={setNotes}
            placeholder="Adicione notas sobre esta transferência"
            placeholderTextColor="#999"
            multiline={true}
            numberOfLines={4}
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
            style={[
              styles.transferButton,
              isReturn ? styles.returnButton : styles.addButton
            ]}
            onPress={handleTransfer}
          >
            <Text style={styles.transferButtonText}>
              {isReturn ? 'Devolver ao Armazém' : 'Adicionar ao Apiário'}
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
  infoCard: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: scale(8),
    padding: scale(16),
    marginBottom: scale(20),
  },
  transferInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: scale(12),
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  transferDetails: {
    marginLeft: scale(12),
  },
  productTitle: {
    fontSize: scale(18),
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  locationText: {
    fontSize: scale(14),
    color: '#CCCCCC',
    marginTop: scale(4),
  },
  stockInfo: {
    marginTop: scale(12),
  },
  stockItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: scale(8),
  },
  stockLabel: {
    fontSize: scale(14),
    color: '#CCCCCC',
  },
  stockValue: {
    fontSize: scale(14),
    fontWeight: '500',
    color: '#FFFFFF',
  },
  formSection: {
    marginBottom: scale(20),
  },
  sectionTitle: {
    fontSize: scale(16),
    fontWeight: '500',
    color: '#FFFFFF',
    marginBottom: scale(8),
  },
  quantityInput: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: scale(8),
    padding: scale(12),
    color: '#FFFFFF',
    fontSize: scale(16),
  },
  notesInput: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: scale(8),
    padding: scale(12),
    color: '#FFFFFF',
    minHeight: scale(100),
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: scale(16),
    marginBottom: scale(24),
  },
  cancelButton: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingVertical: scale(12),
    borderRadius: scale(8),
    marginRight: scale(8),
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  transferButton: {
    flex: 2,
    paddingVertical: scale(12),
    borderRadius: scale(8),
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: '#4CD964', // Verde
  },
  returnButton: {
    backgroundColor: '#FF9500', // Laranja
  },
  transferButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});

export default TransferEquipmentScreen; 