import React from 'react';
import { View, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import sharedStyles from '../../styles/shared';

interface ApiaryHeaderProps {
  name: string;
  location: string;
  lastVisit?: Date;
  isDark: boolean;
}

const formatDate = (date?: Date) => {
  if (!date) return 'N/A';
  return date.toLocaleDateString('pt-PT', { day: '2-digit', month: '2-digit', year: 'numeric' });
};

const ApiaryHeader: React.FC<ApiaryHeaderProps> = ({ 
  name, 
  location, 
  lastVisit,
  isDark
}) => {
  return (
    <LinearGradient
      colors={isDark 
        ? ['#5D2E0D', '#3E1F08'] 
        : ['#FFC107', '#FFB300']}
      style={sharedStyles.apiaryHeader}
    >
      <View style={sharedStyles.apiaryHeaderContent}>
        <View style={sharedStyles.apiaryIconContainer}>
          <FontAwesome5 name="house" size={28} color="#FFFFFF" />
        </View>
        <View style={sharedStyles.apiaryHeaderInfo}>
          <Text style={sharedStyles.apiaryHeaderTitle}>{name}</Text>
          <Text style={sharedStyles.apiaryHeaderSubtitle}>{location}</Text>
          {lastVisit && (
            <View style={sharedStyles.lastVisitContainer}>
              <FontAwesome5 name="calendar-alt" size={12} color="#FFFFFF" style={sharedStyles.lastVisitIcon} />
              <Text style={sharedStyles.lastVisitText}>Última visita: {formatDate(lastVisit)}</Text>
            </View>
          )}
        </View>
      </View>
    </LinearGradient>
  );
};

export default ApiaryHeader; 