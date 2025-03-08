import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ScreenLayout from '../components/ScreenLayout';
import { scale } from '../utils/responsive';

// Dados mockados para produtos com baixo estoque
const LOW_STOCK_DATA = [
  {
    id: '1',
    name: 'Acaricida',
    category: 'Produtos Veterinários',
    quantity: 1,
    unit: 'Unidades',
    threshold: 5,
  },
  {
    id: '2',
    name: 'Cera Alveolada',
    category: 'Cera',
    quantity: 2,
    unit: 'Unidades',
    threshold: 10,
  },
  {
    id: '3',
    name: 'Ferramentas de Reparo',
    category: 'Ferramentas Apícolas',
    quantity: 1,
    unit: 'Unidades',
    threshold: 3,
  },
  {
    id: '4',
    name: 'Fato de Apicultor',
    category: 'Material de Visita',
    quantity: 1,
    unit: 'Unidades',
    threshold: 3,
  },
];

const LowStockScreen: React.FC = () => {
  const renderLowStockItem = ({ item }: any) => {
    const percentageLeft = (item.quantity / item.threshold) * 100;
    const barWidth = `${Math.min(percentageLeft, 100)}%`;
    
    return (
      <View style={styles.itemContainer}>
        <View style={styles.itemHeader}>
          <Text style={styles.itemName}>{item.name}</Text>
          <View style={styles.alertBadge}>
            <MaterialCommunityIcons name="alert" size={16} color="#FFFFFF" />
          </View>
        </View>
        
        <Text style={styles.itemCategory}>{item.category}</Text>
        
        <View style={styles.stockInfo}>
          <Text style={styles.stockText}>
            {item.quantity} / {item.threshold} {item.unit}
          </Text>
          <Text style={styles.percentageText}>
            {Math.round(percentageLeft)}%
          </Text>
        </View>
        
        <View style={styles.progressBarContainer}>
          <View 
            style={[
              styles.progressBar, 
              { width: barWidth, backgroundColor: percentageLeft < 30 ? '#ff7675' : '#fdcb6e' }
            ]} 
          />
        </View>

        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Adicionar Stock</Text>
          <MaterialCommunityIcons name="plus" size={16} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ScreenLayout title="Baixo Stock">
      <View style={styles.container}>
        <View style={styles.summaryContainer}>
          <MaterialCommunityIcons name="alert-circle" size={24} color="#ff7675" />
          <Text style={styles.summaryText}>
            {LOW_STOCK_DATA.length} produtos com stock abaixo do limite recomendado
          </Text>
        </View>

        <FlatList
          data={LOW_STOCK_DATA}
          renderItem={renderLowStockItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
        />
      </View>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  summaryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2A2A2A',
    borderRadius: scale(8),
    padding: scale(12),
    marginHorizontal: scale(16),
    marginVertical: scale(8),
  },
  summaryText: {
    color: '#FFFFFF',
    marginLeft: scale(8),
    fontSize: scale(14),
  },
  listContent: {
    paddingHorizontal: scale(16),
    paddingTop: scale(8),
    paddingBottom: scale(16),
  },
  itemContainer: {
    backgroundColor: '#1E1E1E',
    borderRadius: scale(10),
    padding: scale(16),
    marginVertical: scale(8),
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemName: {
    color: '#FFFFFF',
    fontSize: scale(16),
    fontWeight: 'bold',
  },
  alertBadge: {
    backgroundColor: '#ff7675',
    borderRadius: scale(12),
    width: scale(24),
    height: scale(24),
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemCategory: {
    color: '#999999',
    fontSize: scale(14),
    marginTop: scale(4),
  },
  stockInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: scale(12),
  },
  stockText: {
    color: '#FFFFFF',
    fontSize: scale(14),
  },
  percentageText: {
    color: '#ff7675',
    fontSize: scale(14),
    fontWeight: 'bold',
  },
  progressBarContainer: {
    height: scale(8),
    backgroundColor: '#2A2A2A',
    borderRadius: scale(4),
    marginTop: scale(8),
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: scale(4),
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3498DB',
    borderRadius: scale(8),
    paddingVertical: scale(10),
    marginTop: scale(16),
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginRight: scale(8),
  },
});

export default LowStockScreen;
