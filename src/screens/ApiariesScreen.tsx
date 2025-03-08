import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { scale } from '../utils/responsive';
import { useTheme } from '../context/ThemeContext';
import { RootStackParamList } from '../types';
import ScreenLayout from '../components/ScreenLayout';

type ApiariesScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Apiaries'>;

const ApiariesScreen: React.FC = () => {
  const navigation = useNavigation<ApiariesScreenNavigationProp>();
  const { colors } = useTheme();

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <ScreenLayout 
      title="Apiários" 
      showBackButton={true}
      showHomeButton={true}
      onBackPress={handleBackPress}
    >
      <View style={styles.content}>
        <Text style={styles.placeholderText}>
          Tela de Apiários em desenvolvimento
        </Text>
        
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Voltar para o Menu</Text>
        </TouchableOpacity>
      </View>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scale(20),
  },
  placeholderText: {
    fontSize: scale(18),
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: scale(30),
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: scale(20),
    paddingVertical: scale(12),
    borderRadius: scale(8),
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: scale(16),
    fontWeight: '600',
  }
});

export default ApiariesScreen; 