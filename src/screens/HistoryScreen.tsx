import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Platform,
  SafeAreaView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ScreenLayout from '../components/ScreenLayout';
import { scale } from '../utils/responsive';
import CategoryTabs from '../components/CategoryTabs';

// Mock data
const HISTORY_DATA = [
  {
    id: '1',
    type: 'entrada',
    productName: 'Mel Multifloral',
    quantity: 200,
    unit: 'kg',
    date: '04/03/2024',
    time: '14:30',
    category: 'Mel',
  },
  {
    id: '2',
    type: 'saida',
    productName: 'Quadro de Ninho',
    quantity: 5,
    unit: 'Unidades',
    date: '03/03/2024',
    time: '10:15',
    category: 'Material Apícola',
  },
  {
    id: '3',
    type: 'entrada',
    productName: 'Cera Alveolada',
    quantity: 10,
    unit: 'kg',
    date: '02/03/2024',
    time: '16:45',
    category: 'Cera',
  },
  {
    id: '4',
    type: 'saida',
    productName: 'Mel de Rosmaninho',
    quantity: 50,
    unit: 'kg',
    date: '01/03/2024',
    time: '09:20',
    category: 'Mel',
  },
];

type FilterType = 'todos' | 'entrada' | 'saida';

const HistoryScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const [activeFilter, setActiveFilter] = useState<FilterType>('todos');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredData = useCallback(() => {
    if (activeFilter === 'todos') return HISTORY_DATA;
    return HISTORY_DATA.filter(item => item.type === activeFilter);
  }, [activeFilter]);

  const renderHistoryItem = ({ item }: any) => {
    const isEntrada = item.type === 'entrada';
    
    return (
      <View style={styles.historyItem}>
        <View style={[
          styles.iconContainer,
          { backgroundColor: isEntrada ? '#00b894' : '#ff7675' }
        ]}>
          <MaterialCommunityIcons 
            name={isEntrada ? 'arrow-down-circle' : 'arrow-up-circle'} 
            size={24} 
            color="#FFFFFF" 
          />
        </View>
        
        <View style={styles.itemContent}>
          <View style={styles.itemHeader}>
            <Text style={styles.productName}>{item.productName}</Text>
            <Text style={[
              styles.quantity,
              { color: isEntrada ? '#00b894' : '#ff7675' }
            ]}>
              {isEntrada ? '+' : '-'}{item.quantity} {item.unit}
            </Text>
          </View>
          
          <Text style={styles.category}>{item.category}</Text>
          
          <View style={styles.timeContainer}>
            <MaterialCommunityIcons 
              name="clock-outline" 
              size={14} 
              color="#999999" 
            />
            <Text style={styles.timeText}>
              {item.date} às {item.time}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    // Adicionar lógica para filtrar o histórico por categoria se necessário
  };

  return (
    <ScreenLayout title="Histórico" showHomeButton={true}>
      <View style={styles.container}>
        <View style={styles.filterContainer}>
          <TouchableOpacity 
            style={[
              styles.filterButton,
              activeFilter === 'todos' && styles.activeFilterButton
            ]}
            onPress={() => setActiveFilter('todos')}
          >
            <MaterialCommunityIcons 
              name="format-list-bulleted" 
              size={20} 
              color={activeFilter === 'todos' ? '#FFFFFF' : '#999999'} 
            />
            <Text style={[
              styles.filterText,
              activeFilter === 'todos' && styles.activeFilterText
            ]}>
              Todos
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[
              styles.filterButton,
              activeFilter === 'entrada' && styles.activeFilterButton,
              styles.entradaButton
            ]}
            onPress={() => setActiveFilter('entrada')}
          >
            <MaterialCommunityIcons 
              name="arrow-down-circle" 
              size={20} 
              color={activeFilter === 'entrada' ? '#FFFFFF' : '#999999'} 
            />
            <Text style={[
              styles.filterText,
              activeFilter === 'entrada' && styles.activeFilterText
            ]}>
              Entradas
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[
              styles.filterButton,
              activeFilter === 'saida' && styles.activeFilterButton,
              styles.saidaButton
            ]}
            onPress={() => setActiveFilter('saida')}
          >
            <MaterialCommunityIcons 
              name="arrow-up-circle" 
              size={20} 
              color={activeFilter === 'saida' ? '#FFFFFF' : '#999999'} 
            />
            <Text style={[
              styles.filterText,
              activeFilter === 'saida' && styles.activeFilterText
            ]}>
              Saídas
            </Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={filteredData()}
          renderItem={renderHistoryItem}
          keyExtractor={item => item.id}
          contentContainerStyle={[
            styles.listContent,
            { paddingBottom: insets.bottom + scale(16) }
          ]}
          showsVerticalScrollIndicator={false}
        />

        <CategoryTabs 
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />
      </View>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: scale(16),
    paddingVertical: scale(12),
    backgroundColor: Platform.OS === 'ios' ? '#1A1A1A' : '#1E1E1E',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: scale(8),
    paddingHorizontal: scale(12),
    borderRadius: scale(20),
    marginRight: scale(8),
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  activeFilterButton: {
    backgroundColor: '#007AFF',
  },
  entradaButton: {
    backgroundColor: 'rgba(0,184,148,0.1)',
  },
  saidaButton: {
    backgroundColor: 'rgba(255,118,117,0.1)',
  },
  filterText: {
    color: '#999999',
    marginLeft: scale(6),
    fontSize: scale(14),
    fontWeight: '500',
  },
  activeFilterText: {
    color: '#FFFFFF',
  },
  listContent: {
    padding: scale(16),
  },
  historyItem: {
    flexDirection: 'row',
    backgroundColor: Platform.OS === 'ios' ? '#1A1A1A' : '#1E1E1E',
    borderRadius: scale(12),
    padding: scale(16),
    marginBottom: scale(12),
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  iconContainer: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(12),
  },
  itemContent: {
    flex: 1,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productName: {
    fontSize: Platform.OS === 'ios' ? scale(16) : scale(15),
    fontWeight: '600',
    color: '#FFFFFF',
  },
  quantity: {
    fontSize: scale(14),
    fontWeight: '600',
  },
  category: {
    fontSize: scale(14),
    color: '#999999',
    marginTop: scale(4),
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: scale(8),
  },
  timeText: {
    fontSize: scale(12),
    color: '#999999',
    marginLeft: scale(4),
  },
});

export default HistoryScreen;
