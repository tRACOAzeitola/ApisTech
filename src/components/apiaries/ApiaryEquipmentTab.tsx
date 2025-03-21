import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import sharedStyles from '../../styles/shared';
import TransferHistoryList from './TransferHistoryList';
import { TransferHistory } from '../../types';

interface ApiaryEquipmentProps {
  apiaryEquipment: {
    hives: number;
    supers: number;
  };
  onTransfer: (equipmentType: 'hive' | 'super', action: 'add' | 'return') => void;
  transferHistory: TransferHistory[];
}

const ApiaryEquipmentTab: React.FC<ApiaryEquipmentProps> = ({
  apiaryEquipment,
  onTransfer,
  transferHistory
}) => {
  return (
    <View>
      <View style={sharedStyles.sectionContainer}>
        <Text style={sharedStyles.sectionTitle}>Equipamentos</Text>
        
        <View style={sharedStyles.equipmentContainer}>
          {/* Colmeias */}
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 12,
            borderBottomWidth: 1,
            borderBottomColor: 'rgba(255,255,255,0.1)',
          }}>
            <View style={sharedStyles.equipmentNameContainer}>
              <FontAwesome5 name="home" size={18} color="#FFC107" solid />
              <Text style={{
                color: '#FFFFFF',
                fontSize: 16,
                marginLeft: 8,
              }}>Colmeias</Text>
              <Text style={sharedStyles.equipmentSku}>(COL-COL)</Text>
            </View>
            
            <Text style={sharedStyles.equipmentCount}>{apiaryEquipment.hives}</Text>
            
            <View style={sharedStyles.equipmentActions}>
              <TouchableOpacity
                style={[sharedStyles.equipmentButton, { backgroundColor: '#4CD964' }]}
                onPress={() => onTransfer('hive', 'add')}
              >
                <FontAwesome5 name="plus" size={12} color="#FFFFFF" />
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[sharedStyles.equipmentButton, sharedStyles.removeButton]}
                onPress={() => onTransfer('hive', 'return')}
                disabled={apiaryEquipment.hives <= 0}
              >
                <FontAwesome5 name="minus" size={12} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>
          
          {/* Alças */}
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 12,
            borderBottomWidth: 1,
            borderBottomColor: 'rgba(255,255,255,0.1)',
          }}>
            <View style={sharedStyles.equipmentNameContainer}>
              <FontAwesome5 name="layer-group" size={18} color="#FF9800" solid />
              <Text style={{
                color: '#FFFFFF',
                fontSize: 16,
                marginLeft: 8,
              }}>Alças</Text>
              <Text style={sharedStyles.equipmentSku}>(COL-ALC)</Text>
            </View>
            
            <Text style={sharedStyles.equipmentCount}>{apiaryEquipment.supers}</Text>
            
            <View style={sharedStyles.equipmentActions}>
              <TouchableOpacity
                style={[sharedStyles.equipmentButton, { backgroundColor: '#4CD964' }]}
                onPress={() => onTransfer('super', 'add')}
              >
                <FontAwesome5 name="plus" size={12} color="#FFFFFF" />
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[sharedStyles.equipmentButton, sharedStyles.removeButton]}
                onPress={() => onTransfer('super', 'return')}
                disabled={apiaryEquipment.supers <= 0}
              >
                <FontAwesome5 name="minus" size={12} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      
      <TransferHistoryList transferHistory={transferHistory} />
    </View>
  );
};

export default ApiaryEquipmentTab; 