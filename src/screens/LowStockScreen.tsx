import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />

      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.title}>Baixo Stock</Text>
      </View>

      <View style={styles.summaryContainer}>
        <MaterialCommunityIcons name="alert-circle" size={24} color="#ff7675" />
        <Text style={styles.summaryText}>
          4 produtos com stock abaixo do limite recomendado
        </Text>
      </View>

      <FlatList
        data={LOW_STOCK_DATA}
        renderItem={renderLowStockItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
      />
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
  summaryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2A2A2A',
    borderRadius: 8,
    padding: 12,
    marginHorizontal: 16,
    marginVertical: 8,
  },
  summaryText: {
    color: '#FFFFFF',
    marginLeft: 8,
    fontSize: 14,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  itemContainer: {
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    padding: 16,
    marginVertical: 8,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  alertBadge: {
    backgroundColor: '#ff7675',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemCategory: {
    color: '#999999',
    fontSize: 14,
    marginTop: 4,
  },
  stockInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  stockText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  percentageText: {
    color: '#ff7675',
    fontSize: 14,
    fontWeight: 'bold',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#2A2A2A',
    borderRadius: 4,
    marginTop: 8,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3498DB',
    borderRadius: 8,
    paddingVertical: 10,
    marginTop: 16,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginRight: 8,
  },
});

export default LowStockScreen;
