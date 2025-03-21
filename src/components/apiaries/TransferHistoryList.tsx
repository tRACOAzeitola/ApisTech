import React from 'react';
import { View, Text } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import sharedStyles from '../../styles/shared';
import { TransferHistory } from '../../types';

interface TransferHistoryListProps {
  transferHistory: TransferHistory[];
}

const TransferHistoryList: React.FC<TransferHistoryListProps> = ({
  transferHistory
}) => {
  return (
    <View style={sharedStyles.historySection}>
      <Text style={sharedStyles.historyTitle}>Histórico de Transferências</Text>
      
      {transferHistory.length === 0 ? (
        <Text style={sharedStyles.noHistoryText}>Sem registros de transferências</Text>
      ) : (
        transferHistory.map(transfer => (
          <View key={transfer.id} style={sharedStyles.historyItem}>
            <View style={sharedStyles.historyHeader}>
              <View style={sharedStyles.productTypeTag}>
                <FontAwesome5 
                  name={transfer.productId === 'COL-COL' ? 'home' : 'layer-group'} 
                  size={12} 
                  color="#FFFFFF" 
                />
                <Text style={sharedStyles.productTypeText}>
                  {transfer.productName}
                </Text>
              </View>
              <Text style={sharedStyles.transferDate}>
                {transfer.date.toLocaleDateString()}
              </Text>
            </View>
            
            <View style={sharedStyles.transferFlow}>
              <Text style={sharedStyles.locationText}>{transfer.fromLocation}</Text>
              <FontAwesome5 
                name="arrow-right" 
                size={12} 
                color="#999999" 
                style={sharedStyles.arrowIcon} 
              />
              <Text style={sharedStyles.locationText}>{transfer.toLocation}</Text>
            </View>
            
            <View style={sharedStyles.transferDetails}>
              <Text style={sharedStyles.quantityText}>
                {transfer.quantity} unidades
              </Text>
              {transfer.notes && (
                <Text style={sharedStyles.notesText}>
                  Notas: {transfer.notes}
                </Text>
              )}
            </View>
          </View>
        ))
      )}
    </View>
  );
};

export default TransferHistoryList; 