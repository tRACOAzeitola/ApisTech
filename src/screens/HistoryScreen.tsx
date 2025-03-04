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

// Dados mockados para o histórico
const HISTORY_DATA = [
  {
    id: '1',
    action: 'add',
    productName: 'Mel Multifloral',
    quantity: 200,
    unit: 'kg',
    date: '04/03/2025',
    time: '14:30',
  },
  {
    id: '2',
    action: 'remove',
    productName: 'Quadro de Ninho',
    quantity: 5,
    unit: 'Unidades',
    date: '03/03/2025',
    time: '10:15',
  },
  {
    id: '3',
    action: 'add',
    productName: 'Cera Alveolada',
    quantity: 2,
    unit: 'Unidades',
    date: '02/03/2025',
    time: '16:45',
  },
  {
    id: '4',
    action: 'add',
    productName: 'Acaricida',
    quantity: 1,
    unit: 'Unidades',
    date: '01/03/2025',
    time: '09:20',
  },
  {
    id: '5',
    action: 'remove',
    productName: 'Mel de Flor de Laranjeira',
    quantity: 50,
    unit: 'kg',
    date: '28/02/2025',
    time: '11:10',
  },
];

const HistoryScreen: React.FC = () => {
  const renderHistoryItem = ({ item }: any) => {
    const isAddition = item.action === 'add';
    
    return (
      <View style={styles.historyItem}>
        <View style={[
          styles.actionIconContainer,
          { backgroundColor: isAddition ? '#00b894' : '#ff7675' }
        ]}>
          <MaterialCommunityIcons 
            name={isAddition ? 'plus' : 'minus'} 
            size={20} 
            color="#FFFFFF" 
          />
        </View>
        <View style={styles.historyContent}>
          <Text style={styles.historyTitle}>
            {isAddition ? 'Adicionado' : 'Removido'}: {item.productName}
          </Text>
          <Text style={styles.historyDetails}>
            {isAddition ? '+' : '-'}{item.quantity} {item.unit}
          </Text>
          <View style={styles.timeContainer}>
            <MaterialCommunityIcons name="clock-outline" size={14} color="#999999" />
            <Text style={styles.timeText}>{item.date} às {item.time}</Text>
          </View>
        </View>
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
        <Text style={styles.title}>Histórico</Text>
      </View>

      <View style={styles.filterContainer}>
        <TouchableOpacity style={[styles.filterButton, styles.filterButtonActive]}>
          <Text style={styles.filterButtonTextActive}>Todos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterButtonText}>Adições</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterButtonText}>Remoções</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={HISTORY_DATA}
        renderItem={renderHistoryItem}
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
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginVertical: 8,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
  },
  filterButtonActive: {
    backgroundColor: '#3498DB',
  },
  filterButtonText: {
    color: '#CCCCCC',
  },
  filterButtonTextActive: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  historyItem: {
    flexDirection: 'row',
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    padding: 16,
    marginVertical: 8,
  },
  actionIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  historyContent: {
    flex: 1,
  },
  historyTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  historyDetails: {
    color: '#FFFFFF',
    fontSize: 14,
    marginTop: 4,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  timeText: {
    color: '#999999',
    fontSize: 12,
    marginLeft: 4,
  },
});

export default HistoryScreen;
