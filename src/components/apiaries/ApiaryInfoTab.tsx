import React from 'react';
import { View, Text } from 'react-native';
import sharedStyles from '../../styles/shared';
import { Apiary } from '../../types';
import TransferHistoryList from './TransferHistoryList';

interface ApiaryInfoTabProps {
  apiary: Apiary;
  textColor: string;
  secondaryTextColor: string;
  cardBackgroundColor: string;
  transferHistory: any[];
}

const formatDate = (date?: Date) => {
  if (!date) return 'N/A';
  return date.toLocaleDateString('pt-PT', { day: '2-digit', month: '2-digit', year: 'numeric' });
};

const ApiaryInfoTab: React.FC<ApiaryInfoTabProps> = ({
  apiary,
  textColor,
  secondaryTextColor,
  cardBackgroundColor,
  transferHistory
}) => {
  return (
    <View>
      <View style={[sharedStyles.infoCard, { backgroundColor: cardBackgroundColor }]}>
        <View style={sharedStyles.infoRow}>
          <Text style={[sharedStyles.infoLabel, { color: secondaryTextColor }]}>Local</Text>
          <Text style={[sharedStyles.infoValue, { color: textColor }]}>{apiary.location}</Text>
        </View>
        
        <View style={sharedStyles.infoRow}>
          <Text style={[sharedStyles.infoLabel, { color: secondaryTextColor }]}>Colmeias</Text>
          <Text style={[sharedStyles.infoValue, { color: textColor }]}>{apiary.hiveCount}</Text>
        </View>
        
        {apiary.coordinates && (
          <View style={sharedStyles.infoRow}>
            <Text style={[sharedStyles.infoLabel, { color: secondaryTextColor }]}>Coordenadas</Text>
            <Text style={[sharedStyles.infoValue, { color: textColor }]}>{apiary.coordinates}</Text>
          </View>
        )}
        
        <View style={sharedStyles.infoRow}>
          <Text style={[sharedStyles.infoLabel, { color: secondaryTextColor }]}>Data de Criação</Text>
          <Text style={[sharedStyles.infoValue, { color: textColor }]}>{formatDate(apiary.createdAt)}</Text>
        </View>
        
        {apiary.lastVisit && (
          <View style={sharedStyles.infoRow}>
            <Text style={[sharedStyles.infoLabel, { color: secondaryTextColor }]}>Última Visita</Text>
            <Text style={[sharedStyles.infoValue, { color: textColor }]}>{formatDate(apiary.lastVisit)}</Text>
          </View>
        )}
        
        {apiary.floraTypes && apiary.floraTypes.length > 0 && (
          <View style={sharedStyles.infoRow}>
            <Text style={[sharedStyles.infoLabel, { color: secondaryTextColor }]}>Flora</Text>
            <Text style={[sharedStyles.infoValue, { color: textColor }]}>{apiary.floraTypes.join(', ')}</Text>
          </View>
        )}
        
        {apiary.estimatedProduction && (
          <View style={sharedStyles.infoRow}>
            <Text style={[sharedStyles.infoLabel, { color: secondaryTextColor }]}>Produção Estimada</Text>
            <Text style={[sharedStyles.infoValue, { color: textColor }]}>{apiary.estimatedProduction} kg</Text>
          </View>
        )}
        
        {apiary.owner && (
          <View style={sharedStyles.infoRow}>
            <Text style={[sharedStyles.infoLabel, { color: secondaryTextColor }]}>Proprietário</Text>
            <Text style={[sharedStyles.infoValue, { color: textColor }]}>{apiary.owner}</Text>
          </View>
        )}
        
        {apiary.contact && (
          <View style={sharedStyles.infoRow}>
            <Text style={[sharedStyles.infoLabel, { color: secondaryTextColor }]}>Contato</Text>
            <Text style={[sharedStyles.infoValue, { color: textColor }]}>{apiary.contact}</Text>
          </View>
        )}
      </View>
      
      {apiary.notes && (
        <View style={[sharedStyles.notesCard, { backgroundColor: cardBackgroundColor }]}>
          <Text style={[sharedStyles.notesTitle, { color: secondaryTextColor }]}>Notas</Text>
          <Text style={[sharedStyles.notesText, { color: textColor }]}>{apiary.notes}</Text>
        </View>
      )}
      
      <TransferHistoryList transferHistory={transferHistory} />
    </View>
  );
};

export default ApiaryInfoTab; 