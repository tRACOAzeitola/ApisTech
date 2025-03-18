import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  StatusBar, 
  ScrollView,
  TouchableOpacity,
  Platform
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { scale } from '../utils/responsive';
import { useTheme } from '../context/ThemeContext';
import { RootStackParamList } from '../types';

export interface ScreenLayoutProps {
  title: string;
  children: React.ReactNode;
  showBackButton?: boolean;
  showHomeButton?: boolean;
  onBackPress?: () => void;
  onHomePress?: () => void;
  rightComponent?: React.ReactNode;
}

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const ScreenLayout: React.FC<ScreenLayoutProps> = ({
  title,
  children,
  showBackButton = false,
  showHomeButton = false,
  onBackPress,
  onHomePress,
  rightComponent
}) => {
  const navigation = useNavigation<NavigationProp>();
  const { colors, isDark } = useTheme();
  
  // Determinar se o botão de voltar deve ser exibido
  const shouldShowBackButton = showBackButton && navigation.canGoBack();
  
  // Lidar com navegação para a tela inicial - MODIFICADO
  const handleHomePress = () => {
    if (onHomePress) {
      onHomePress();
    } else {
      // Navegar para a tela Main em vez de Home
      navigation.navigate('Main');
    }
  };
  
  // Lidar com ação de voltar
  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={[
      styles.container, 
      { backgroundColor: colors.background }
    ]}>
      <StatusBar 
        barStyle={isDark ? 'light-content' : 'dark-content'} 
        backgroundColor="transparent" 
        translucent 
      />
      
      {/* Header - Ajustado com padding superior */}
      <View style={styles.header}>
        <View style={styles.headerLeftSection}>
          {shouldShowBackButton && (
            <TouchableOpacity
              style={styles.backButton}
              onPress={handleBackPress}
            >
              <MaterialCommunityIcons 
                name="arrow-left" 
                size={scale(24)} 
                color={colors.text.primary} 
              />
            </TouchableOpacity>
          )}
          
          {showHomeButton && (
            <TouchableOpacity
              style={styles.homeButton}
              onPress={handleHomePress}
            >
              <Ionicons 
                name="home" 
                size={scale(24)} 
                color={colors.text.primary} 
              />
            </TouchableOpacity>
          )}
          
          <Text style={[
            styles.headerTitle,
            { color: colors.text.primary }
          ]}>
            {title}
          </Text>
        </View>
        
        {/* Componente direito do cabeçalho */}
        {rightComponent && (
          <View style={styles.headerRightSection}>
            {rightComponent}
          </View>
        )}
      </View>
      
      {/* Content */}
      <View style={styles.content}>
        {children}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(16),
    paddingVertical: scale(16), // Aumentado para dar mais espaço
    paddingTop: Platform.OS === 'android' ? scale(20) : scale(16), // Adiciona mais espaço no topo para Android
    marginTop: Platform.OS === 'android' ? scale(10) : 0, // Margem adicional para Android
  },
  headerLeftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  backButton: {
    marginRight: scale(16),
    padding: scale(8), // Adicionado padding para aumentar a área de toque
    marginLeft: scale(-8), // Compensar o padding para manter alinhamento visual
  },
  homeButton: {
    marginRight: scale(16),
    padding: scale(8), // Adicionado padding para aumentar a área de toque
  },
  headerTitle: {
    fontSize: scale(20),
    fontWeight: 'bold',
  },
  headerRightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  }
});

export default ScreenLayout; 