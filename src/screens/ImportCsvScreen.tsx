import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useTheme } from '../context/ThemeContext';
import { scale } from '../utils/responsive';
import ScreenLayout from '../components/ScreenLayout';
import { FadeIn, SlideIn } from '../components/animations';
import { Feedback, FeedbackType } from '../utils/feedback';
import LoadingIndicator from '../components/LoadingIndicator';

// Dados de exemplo apenas para visualização
const EXAMPLE_DATA = [
  { name: "Mel Multifloral", category: "Mel", quantity: 100, unit: "kg" },
  { name: "Colmeia Langstroth", category: "Material de Colmeia", quantity: 5, unit: "unidades" },
  { name: "Cera Alveolada", category: "Cera", quantity: 10, unit: "kg" },
  { name: "Fumigador", category: "Ferramentas Apícolas", quantity: 2, unit: "unidades" },
  { name: "Fato Apícola", category: "Material de Visita", quantity: 3, unit: "unidades" }
];

const ImportCsvScreen: React.FC = () => {
  const navigation = useNavigation();
  const { colors, isDark } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleImportDemoData = async () => {
    try {
      // Ativa o feedback tátil
      Feedback.triggerHaptic(FeedbackType.Impact);
      
      setIsLoading(true);
      setMessage('Processando dados de demonstração...');
      
      // Simulação de tempo de processamento
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setMessage('Importação concluída! 5 produtos importados.');
      setShowSuccess(true);
      
      // Feedback tátil de sucesso
      Feedback.triggerHaptic(FeedbackType.Success);
      
      setTimeout(() => {
        Alert.alert(
          'Sucesso',
          'Dados de demonstração importados com sucesso!',
          [{ text: 'OK', onPress: () => navigation.goBack() }]
        );
      }, 800); // Aguarda um momento para mostrar a animação de sucesso antes do alerta
      
    } catch (error) {
      console.error('Erro na simulação:', error);
      setMessage(`Erro: Falha na simulação`);
      
      // Feedback tátil de erro
      Feedback.triggerHaptic(FeedbackType.Error);
      
      Alert.alert('Erro', 'Falha na simulação de importação');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScreenLayout title="Importar Dados" showBackButton={true}>
      <ScrollView style={styles.container}>
        {/* Mensagem de status com animação */}
        {message && (
          <SlideIn direction="down">
            <View style={[
              styles.messageCard,
              message.includes('Erro') 
                ? styles.errorCard 
                : showSuccess ? styles.successCard : styles.processingCard
            ]}>
              {isLoading ? (
                <ActivityIndicator size="small" color="#007AFF" style={styles.loader} />
              ) : message.includes('Erro') ? (
                <FontAwesome5 name="exclamation-circle" size={20} color="#FF3B30" />
              ) : (
                <FontAwesome5 
                  name="check-circle" 
                  size={20} 
                  color="#4CD964" 
                />
              )}
              <Text style={[
                styles.messageText,
                message.includes('Erro') ? styles.errorText : styles.successText
              ]}>
                {message}
              </Text>
            </View>
          </SlideIn>
        )}

        {/* Botão de importação com animação de escala ao pressionar */}
        <SlideIn>
          <TouchableOpacity
            style={[styles.importButton, isLoading && styles.disabledButton]}
            onPress={handleImportDemoData}
            disabled={isLoading}
            activeOpacity={0.7}
          >
            <FontAwesome5 
              name="database" 
              size={20} 
              color="#FFFFFF" 
            />
            <Text style={styles.importButtonText}>
              {isLoading ? 'Importando...' : 'Importar Dados de Demonstração'}
            </Text>
          </TouchableOpacity>
        </SlideIn>

        {/* Dados de exemplo com animação de fade-in escalonada */}
        <FadeIn delay={300}>
          <View style={styles.demoDataContainer}>
            <Text style={styles.demoDataTitle}>Dados de Demonstração</Text>
            
            {EXAMPLE_DATA.map((item, index) => (
              <FadeIn 
                key={index} 
                delay={500 + (index * 100)} 
                style={styles.demoItem}
              >
                <Text style={styles.demoItemName}>{item.name}</Text>
                <View style={styles.demoItemDetails}>
                  <Text style={styles.demoItemCategory}>{item.category}</Text>
                  <Text style={styles.demoItemQuantity}>
                    {item.quantity} {item.unit}
                  </Text>
                </View>
              </FadeIn>
            ))}
          </View>
        </FadeIn>
        
        {/* Indicador de carregamento sobreposto */}
        {isLoading && (
          <LoadingIndicator 
            type="overlay" 
            message="Importando dados..." 
          />
        )}
      </ScrollView>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  messageCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: scale(12),
    borderRadius: scale(8),
    marginBottom: scale(16),
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  processingCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  successCard: {
    backgroundColor: 'rgba(76, 217, 100, 0.15)',
  },
  errorCard: {
    backgroundColor: 'rgba(255, 59, 48, 0.15)',
  },
  loader: {
    marginRight: scale(12),
  },
  messageText: {
    flex: 1,
    marginLeft: scale(12),
    fontSize: scale(16),
    color: '#FFFFFF',
  },
  errorText: {
    color: '#FF3B30',
  },
  successText: {
    color: '#4CD964',
  },
  importButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: scale(16),
    paddingHorizontal: scale(20),
    borderRadius: scale(10),
    marginBottom: scale(16),
    backgroundColor: '#8B4513',
  },
  disabledButton: {
    backgroundColor: '#666666',
    opacity: 0.7,
  },
  importButtonText: {
    fontSize: scale(16),
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: scale(10),
  },
  demoDataContainer: {
    backgroundColor: '#1C1C1E',
    padding: scale(16),
    borderRadius: scale(10),
    marginTop: scale(16),
  },
  demoDataTitle: {
    fontSize: scale(18),
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: scale(12),
  },
  demoItem: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
    paddingVertical: scale(10),
  },
  demoItemName: {
    color: '#FFFFFF',
    fontSize: scale(16),
    fontWeight: '600',
    marginBottom: scale(4),
  },
  demoItemDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  demoItemCategory: {
    color: '#999999',
    fontSize: scale(14),
  },
  demoItemQuantity: {
    color: '#FFC107',
    fontSize: scale(14),
    fontWeight: '600',
  }
});

export default ImportCsvScreen;