import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { scale } from '../utils/responsive';
import { LocationHistory } from '../types';
import { useTheme } from '../context/ThemeContext';

interface TransferHistoryListProps {
  transfers: LocationHistory[];
  productName: string;
}

const TransferHistoryList: React.FC<TransferHistoryListProps> = ({
  transfers,
  productName
}) => {
  const { colors } = useTheme();
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-PT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  const renderTransferItem = ({ item }: { item: LocationHistory }) => {
    return (
      <View style={styles.transferItem}>
        <View style={styles.transferIcon}>
          <MaterialCommunityIcons 
            name="transfer" 
            size={22} 
            color="#4CD964" 
          />
        </View>
        
        <View style={styles.transferDetails}>
          <Text style={styles.transferTitle}>
            {item.quantity} unidades transferidas
          </Text>
          
          <View style={styles.locationContainer}>
            <Text style={styles.locationText}>
              De: {item.fromLocation === 'Armazém' ? 'Armazém' : `Apiário: ${item.fromLocation}`}
            </Text>
            <MaterialCommunityIcons 
              name="arrow-right" 
              size={14} 
              color="#999" 
              style={styles.arrowIcon}
            />
            <Text style={styles.locationText}>
              Para: {item.toLocation === 'Armazém' ? 'Armazém' : `Apiário: ${item.toLocation}`}
            </Text>
          </View>
          
          <Text style={styles.transferDate}>
            {formatDate(item.date)}
          </Text>
          
          {item.notes && (
            <Text style={styles.transferNotes}>
              Notas: {item.notes}
            </Text>
          )}
        </View>
      </View>
    );
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Histórico de Transferências - {productName}</Text>
      
      {transfers.length > 0 ? (
        <FlatList
          data={transfers}
          renderItem={renderTransferItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <MaterialCommunityIcons
            name="information-outline"
            size={24}
            color="#999"
          />
          <Text style={styles.emptyText}>
            Nenhuma transferência registrada para este produto
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: scale(16),
  },
  title: {
    fontSize: scale(18),
    fontWeight: 'bold',
    color: 'white',
    marginBottom: scale(16),
  },
  listContent: {
    paddingBottom: scale(16),
  },
  transferItem: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: scale(8),
    padding: scale(12),
    marginBottom: scale(8),
  },
  transferIcon: {
    marginRight: scale(12),
    alignItems: 'center',
    justifyContent: 'center',
    width: scale(40),
  },
  transferDetails: {
    flex: 1,
  },
  transferTitle: {
    fontSize: scale(16),
    fontWeight: '600',
    color: 'white',
    marginBottom: scale(4),
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: scale(4),
  },
  locationText: {
    fontSize: scale(14),
    color: '#CCC',
  },
  arrowIcon: {
    marginHorizontal: scale(4),
  },
  transferDate: {
    fontSize: scale(12),
    color: '#999',
    marginBottom: scale(4),
  },
  transferNotes: {
    fontSize: scale(12),
    color: '#BBB',
    fontStyle: 'italic',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: scale(24),
  },
  emptyText: {
    color: '#999',
    marginTop: scale(8),
    textAlign: 'center',
  }
});

export default TransferHistoryList; 