import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import sharedStyles from '../../styles/shared';
import TransferHistoryList from './TransferHistoryList';
import { TransferHistory } from '../../types';

interface ApiaryTasksTabProps {
  cardBackgroundColor: string;
  textColor: string;
  secondaryTextColor: string;
  onAddTask: () => void;
  transferHistory: TransferHistory[];
}

const ApiaryTasksTab: React.FC<ApiaryTasksTabProps> = ({
  cardBackgroundColor,
  textColor,
  secondaryTextColor,
  onAddTask,
  transferHistory
}) => {
  return (
    <View>
      <View style={[sharedStyles.tasksHeader, { backgroundColor: cardBackgroundColor }]}>
        <Text style={[sharedStyles.tasksHeaderTitle, { color: textColor }]}>Tarefas do Apiário</Text>
        <TouchableOpacity style={sharedStyles.addButton} onPress={onAddTask}>
          <FontAwesome5 name="plus" size={16} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
      
      <View style={[sharedStyles.emptyStateCard, { backgroundColor: cardBackgroundColor }]}>
        <FontAwesome5 name="tasks" size={40} color={secondaryTextColor} />
        <Text style={[sharedStyles.emptyStateText, { color: secondaryTextColor }]}>
          Nenhuma tarefa programada para este apiário
        </Text>
      </View>
      
      <TransferHistoryList transferHistory={transferHistory} />
    </View>
  );
};

export default ApiaryTasksTab; 