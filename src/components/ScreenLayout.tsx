import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Platform,
  StatusBar 
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { scale } from '../utils/responsive';
import { useTheme } from '../context/ThemeContext';

export interface ScreenLayoutProps {
  children: React.ReactNode;
  title: string;
  showBackButton?: boolean;
  backButton?: boolean;
  showHomeButton?: boolean;
  onBackPress?: () => void;
}

const ScreenLayout: React.FC<ScreenLayoutProps> = ({ 
  children, 
  title, 
  showBackButton, 
  backButton,
  showHomeButton = false,
  onBackPress 
}) => {
  const navigation = useNavigation();
  const route = useRoute();
  const insets = useSafeAreaInsets();
  const isHomeScreen = route.name === 'Home';
  const { colors } = useTheme();
  
  const shouldShowBackButton = showBackButton || backButton;

  const handleHomePress = () => {
    // @ts-ignore: Navigation type issue
    navigation.navigate('Main');
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top, backgroundColor: colors.background.primary }]}>
      <StatusBar 
        barStyle="light-content"
        backgroundColor="#000000"
      />
      
      {/* Header */}
      <View style={styles.header}>
        {shouldShowBackButton && (
          <TouchableOpacity 
            style={styles.backButton}
            onPress={onBackPress}
          >
            <MaterialCommunityIcons 
              name="arrow-left" 
              size={scale(24)} 
              color={colors.text.primary} 
            />
          </TouchableOpacity>
        )}
        <Text style={[
          styles.title,
          { color: colors.text.primary }
        ]}>{title}</Text>
        
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
      </View>

      {/* Content */}
      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(16),
    paddingVertical: scale(12),
  },
  backButton: {
    marginRight: scale(16),
  },
  title: {
    fontSize: scale(24),
    fontWeight: 'bold',
    flex: 1,
  },
  homeButton: {
    marginLeft: scale(16),
  },
  content: {
    flex: 1,
  }
});

export default ScreenLayout; 