import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  Alert,
  ActivityIndicator
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { scale } from '../utils/responsive';
import { useTheme } from '../context/ThemeContext';
import { RootStackParamList } from '../types';
import ScreenLayout from '../components/ScreenLayout';
import AnimatedCard from '../components/AnimatedCard';

// Definir o tipo de navegação específico para esta tela
type ApiariesScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

// Interface para Apiário
interface Apiary {
  id: string;
  name: string;
  location: string;
  hiveCount: number;
  createdAt: Date;
  lastVisit?: Date;
  notes?: string;
  floraTypes?: string[];
  estimatedProduction?: number;
  owner?: string;
  contact?: string;
  imageUrl?: string;
  lastInspection: string;
  nextTask: string;
  nextTaskDate: string;
}

// Dados de exemplo para apiários
const MOCK_APIARIES: Apiary[] = [
  {
    id: '1',
    name: 'Mediterraneo',
    location: 'Meimoa, Benquerença',
    hiveCount: 12,
    createdAt: new Date('2024-01-15'),
    lastVisit: new Date('2024-05-10'),
    floraTypes: ['Eucalipto', 'Silvestre'],
    lastInspection: '10/05/2023',
    nextTask: 'Inspeção de rotina',
    nextTaskDate: '25/05/2023',
  },
  {
    id: '2',
    name: 'Bosque',
    location: 'Meimao',
    hiveCount: 8,
    createdAt: new Date('2023-11-03'),
    lastVisit: new Date('2024-04-22'),
    floraTypes: ['Laranjeira', 'Acácia'],
    lastInspection: '15/05/2023',
    nextTask: 'Colheita de mel',
    nextTaskDate: '01/06/2023',
  },
  {
    id: '3',
    name: 'Apiário Litoral',
    location: 'Figueira da Foz',
    hiveCount: 15,
    createdAt: new Date('2023-08-20'),
    estimatedProduction: 450,
    lastVisit: new Date('2024-05-05'),
    lastInspection: '05/05/2023',
    nextTask: 'Tratamento contra varroa',
    nextTaskDate: '20/05/2023',
  },
  {
    id: '4',
    name: 'Apiário Centro',
    location: 'Coimbra',
    hiveCount: 10,
    createdAt: new Date('2024-02-08'),
    estimatedProduction: 320,
    lastInspection: '12/05/2023',
    nextTask: 'Substituição de rainha',
    nextTaskDate: '29/05/2023',
  },
  {
    id: '5',
    name: 'Apiário Norte',
    location: 'Porto',
    hiveCount: 14,
    createdAt: new Date('2024-03-15'),
    estimatedProduction: 380,
    lastVisit: new Date('2024-05-18'),
    lastInspection: '18/05/2023',
    nextTask: 'Inspeção sanitária',
    nextTaskDate: '02/06/2023',
  },
  {
    id: '6',
    name: 'Apiário Sul',
    location: 'Faro',
    hiveCount: 9,
    createdAt: new Date('2024-01-25'),
    estimatedProduction: 290,
    lastVisit: new Date('2024-05-15'),
    lastInspection: '15/05/2023',
    nextTask: 'Divisão de colmeia',
    nextTaskDate: '30/05/2023',
  }
];

type ApiaryItemProps = {
  apiary: Apiary;
  onPress: (id: string) => void;
};

const ApiaryItem: React.FC<ApiaryItemProps> = ({ apiary, onPress }) => {
  const { colors, isDark } = useTheme();
  
  return (
    <TouchableOpacity
      style={[
        styles.apiaryCard,
        { backgroundColor: isDark ? colors.cardBackground.dark : colors.cardBackground.light }
      ]}
      onPress={() => onPress(apiary.id)}
    >
      <View style={styles.apiaryHeader}>
        <Text style={[styles.apiaryName, { color: colors.text.primary }]}>
          {apiary.name}
        </Text>
        <View style={[styles.hivesContainer, { backgroundColor: 'rgba(10, 132, 255, 0.1)' }]}>
          <MaterialCommunityIcons 
            name="hexagon-multiple" 
            size={16} 
            color={isDark ? '#0A84FF' : '#007AFF'} 
          />
          <Text style={[styles.hivesCount, { color: colors.text.secondary }]}>
            {apiary.hiveCount}
          </Text>
        </View>
      </View>
      
      <Text style={[styles.apiaryLocation, { color: colors.text.secondary }]}>
        <Ionicons name="location-outline" size={14} /> {apiary.location}
      </Text>
      
      <View style={styles.divider} />
      
      <View style={styles.apiaryFooter}>
        <View style={styles.footerItem}>
          <Text style={[styles.footerLabel, { color: colors.text.secondary }]}>
            Última inspeção:
          </Text>
          <Text style={[styles.footerValue, { color: colors.text.primary }]}>
            {apiary.lastInspection}
          </Text>
        </View>
        
        <View style={styles.footerItem}>
          <Text style={[styles.footerLabel, { color: colors.text.secondary }]}>
            Próxima tarefa:
          </Text>
          <Text style={[styles.footerValue, { color: colors.text.primary }]}>
            {apiary.nextTask} ({apiary.nextTaskDate})
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const ApiariesScreen: React.FC = () => {
  const navigation = useNavigation<ApiariesScreenNavigationProp>();
  const { colors, isDark } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [apiaries, setApiaries] = useState<Apiary[]>([]);

  // Carregar apiários
  useEffect(() => {
    // Simulação de carregamento de dados
    const loadApiaries = async () => {
      try {
        // Em uma implementação real, isso seria uma chamada API
        setTimeout(() => {
          setApiaries(MOCK_APIARIES);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Erro ao carregar apiários:', error);
        setIsLoading(false);
        Alert.alert('Erro', 'Não foi possível carregar os apiários.');
      }
    };

    loadApiaries();
  }, []);

  // Filtrar apiários com base na busca
  const filteredApiaries = searchQuery.length > 0
    ? apiaries.filter(apiary => 
        apiary.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        apiary.location.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : apiaries;

  // Total de colmeias
  const totalHives = apiaries.reduce((sum, apiary) => sum + apiary.hiveCount, 0);

  // Data da última visita mais recente
  const lastVisit = apiaries
    .map(apiary => apiary.lastVisit)
    .filter(date => date !== undefined)
    .sort((a, b) => (b as Date).getTime() - (a as Date).getTime())[0];

  // Função para abrir tela de detalhes
  const handleApiaryPress = (id: string) => {
    navigation.navigate('ApiaryDetails', { apiaryId: id });
  };

  // Função para adicionar novo apiário
  const handleAddApiary = () => {
    navigation.navigate('AddApiary');
  };

  // Formatação de data
  const formatDate = (date?: Date) => {
    if (!date) return 'N/A';
    return date.toLocaleDateString('pt-PT');
  };

  // Obter cores baseadas no tema
  const cardBackgroundColor = isDark 
    ? (colors.cardBackground?.dark || '#302403')
    : (colors.cardBackground?.light || '#FFFDF7');
  const textColor = isDark 
    ? (colors.text?.dark?.primary || '#FFF8E1')
    : (colors.text?.light?.primary || '#5D2E0D');
  const secondaryTextColor = isDark 
    ? (colors.text?.dark?.secondary || '#FFE082') 
    : (colors.text?.light?.secondary || '#8B4513');
  const accentColor = isDark
    ? (colors.primary?.dark || '#FFC107')
    : (colors.primary?.light || '#FFC107');
  const borderColor = isDark
    ? 'rgba(255, 193, 7, 0.2)'  // Amarelo transparente
    : 'rgba(139, 69, 19, 0.2)'; // Marrom transparente

  // Updated status color function
  const getStatusColor = (lastVisit?: Date): string => {
    if (!lastVisit) return '#8E8E93'; // Cinza para nunca visitado
    
    const daysElapsed = Math.floor((new Date().getTime() - lastVisit.getTime()) / (1000 * 3600 * 24));
    
    if (daysElapsed <= 15) return '#4CD964'; // Verde: recente 
    if (daysElapsed <= 30) return '#007AFF'; // Azul: dentro de um mês
    return '#FF3B30'; // Vermelho: mais de um mês
  };

  // Card para cada apiário
  const renderApiaryCard = ({ item, index }: { item: Apiary, index: number }) => {
    // Status do apiário baseado na última visita
    const statusColor = getStatusColor(item.lastVisit);

    return (
      <AnimatedCard
        animationDelay={index * 50}
        animationType="slide"
        onPress={() => handleApiaryPress(item.id)}
        style={styles.cardContainer}
      >
        <View style={[styles.card, { backgroundColor: cardBackgroundColor }]}>
          {/* Cabeçalho simplificado */}
          <View style={styles.cardHeader}>
            <View style={styles.cardTitleContainer}>
              <Text style={[styles.cardTitle, { color: textColor }]} numberOfLines={1}>{item.name}</Text>
              <Text style={[styles.cardSubtitle, { color: secondaryTextColor }]} numberOfLines={1}>{item.location}</Text>
            </View>
            <View style={[styles.statusIndicator, { backgroundColor: statusColor }]} />
          </View>

          {/* Detalhes simplificados */}
          <View style={styles.cardDetails}>
            {/* Linha 1: Colmeias e Flora */}
            <View style={styles.detailRow}>
              {/* Colmeias */}
              <View style={styles.detailItem}>
                <FontAwesome5 name="home" size={14} color="#007AFF" />
                <Text style={[styles.detailValue, { color: textColor, marginLeft: scale(4) }]}>{item.hiveCount}</Text>
              </View>

              {/* Flora */}
              <View style={[styles.detailItem, { flex: 1, marginLeft: scale(8) }]}>
                {item.floraTypes && item.floraTypes.length > 0 ? (
                  <>
                    <FontAwesome5 name="leaf" size={14} color="#8BC34A" />
                    <Text 
                      style={[styles.detailValue, { color: textColor, marginLeft: scale(4), flex: 1 }]} 
                      numberOfLines={1}
                    >
                      {item.floraTypes.join(', ')}
                    </Text>
                  </>
                ) : item.estimatedProduction ? (
                  <>
                    <FontAwesome5 name="chart-line" size={14} color="#42A5F5" />
                    <Text style={[styles.detailValue, { color: textColor, marginLeft: scale(4) }]}>
                      {item.estimatedProduction} kg
                    </Text>
                  </>
                ) : (
                  <>
                    <FontAwesome5 name="leaf" size={14} color="#8BC34A" />
                    <Text style={[styles.detailValue, { color: secondaryTextColor, marginLeft: scale(4) }]}>-</Text>
                  </>
                )}
              </View>
            </View>

            {/* Linha 2: Data e seta */}
            <View style={[styles.detailRow, { marginTop: scale(4), justifyContent: 'space-between' }]}>
              {/* Última visita */}
              <View style={styles.detailItem}>
                <FontAwesome5 name="calendar" size={14} color="#FF9500" />
                <Text style={[styles.detailValue, { color: textColor, marginLeft: scale(4) }]}>
                  {item.lastVisit ? formatDate(item.lastVisit) : 'N/A'}
                </Text>
              </View>

              {/* Ícone de seta */}
              <FontAwesome5 name="chevron-right" size={14} color={secondaryTextColor} />
            </View>
          </View>
        </View>
      </AnimatedCard>
    );
  };

  return (
    <ScreenLayout 
      title="Apiários" 
      showBackButton={true}
      showHomeButton={true}
      onBackPress={() => navigation.goBack()}
    >
      <View style={styles.container}>
        {/* Barra de pesquisa */}
        <View style={[styles.searchContainer, { backgroundColor: cardBackgroundColor }]}>
          <FontAwesome5 name="search" size={16} color={secondaryTextColor} style={styles.searchIcon} />
          <TextInput
            style={[styles.searchInput, { color: textColor }]}
            placeholder="Buscar apiários..."
            placeholderTextColor={secondaryTextColor}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <FontAwesome5 name="times-circle" size={16} color={secondaryTextColor} />
            </TouchableOpacity>
          )}
        </View>

        {/* Estatísticas gerais */}
        {!isLoading && apiaries.length > 0 && (
          <View style={styles.statsContainer}>
            {/* Número de apiários */}
            <View style={styles.statItem}>
              <FontAwesome5 name="map-marker-alt" size={22} color="#FFC107" />
              <Text style={styles.statValue}>{apiaries.length}</Text>
              <Text style={styles.statLabel}>Apiários</Text>
            </View>

            {/* Número de colmeias */}
            <View style={styles.statItem}>
              <FontAwesome5 name="home" size={22} color="#FFA000" />
              <Text style={styles.statValue}>{totalHives}</Text>
              <Text style={styles.statLabel}>Colmeias</Text>
            </View>

            {/* Última visita */}
            {lastVisit && (
              <View style={styles.statItem}>
                <FontAwesome5 name="calendar-alt" size={22} color="#4CAF50" />
                <Text style={styles.statValue}>{formatDate(lastVisit)}</Text>
                <Text style={styles.statLabel}>Última visita</Text>
              </View>
            )}
          </View>
        )}

        {/* Conteúdo principal */}
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#FFC107" />
            <Text style={styles.loadingText}>Carregando apiários...</Text>
          </View>
        ) : apiaries.length > 0 ? (
          <FlatList
            data={filteredApiaries}
            renderItem={renderApiaryCard}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
            initialNumToRender={8}
            windowSize={4}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <FontAwesome5 name="map-marker-alt" size={50} color="#CCCCCC" />
            <Text style={styles.emptyText}>Nenhum apiário encontrado</Text>
            <Text style={styles.emptySubText}>Adicione seu primeiro apiário</Text>
          </View>
        )}

        {/* Botão flutuante para adicionar */}
        <TouchableOpacity style={styles.fab} onPress={handleAddApiary}>
          <LinearGradient
            colors={['#0A84FF', '#007AFF', '#0063CC']}
            style={styles.fabGradient}
          >
            <FontAwesome5 name="plus" size={20} color="#FFFFFF" />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: scale(16),
    marginTop: scale(16),
    marginBottom: scale(12),
    paddingHorizontal: scale(12),
    paddingVertical: scale(8),
    borderRadius: scale(10),
  },
  searchIcon: {
    marginRight: scale(8),
  },
  searchInput: {
    flex: 1,
    paddingVertical: scale(6),
    fontSize: scale(16),
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: scale(16),
    marginBottom: scale(16),
  },
  statItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    padding: scale(10),
  },
  statValue: {
    fontSize: scale(18),
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: scale(4),
  },
  statLabel: {
    fontSize: scale(12),
    color: '#DDDDDD',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: scale(16),
    fontSize: scale(16),
    color: '#FFFFFF',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scale(20),
  },
  emptyText: {
    marginTop: scale(20),
    fontSize: scale(18),
    color: '#FFFFFF',
    textAlign: 'center',
  },
  emptySubText: {
    marginTop: scale(8),
    fontSize: scale(14),
    color: '#DDDDDD',
    textAlign: 'center',
  },
  listContainer: {
    paddingHorizontal: scale(12),
    paddingTop: scale(8),
    paddingBottom: scale(80), // Espaço para o botão FAB
  },
  cardContainer: {
    marginBottom: scale(8),
  },
  card: {
    borderRadius: scale(10),
    overflow: 'hidden',
    padding: scale(10),
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: scale(6),
  },
  cardTitleContainer: {
    flex: 1,
    marginRight: scale(4),
  },
  cardTitle: {
    fontSize: scale(14),
    fontWeight: 'bold',
  },
  cardSubtitle: {
    fontSize: scale(12),
    marginTop: scale(1),
  },
  statusIndicator: {
    width: scale(6),
    height: scale(6),
    borderRadius: scale(3),
    marginLeft: scale(4),
  },
  divider: {
    height: 1,
    marginBottom: scale(6),
  },
  cardDetails: {
    flexDirection: 'column',
    marginTop: scale(6),
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailValue: {
    fontSize: scale(12),
    fontWeight: '600',
  },
  detailLabel: {
    fontSize: scale(10),
  },
  fab: {
    position: 'absolute',
    bottom: scale(20),
    right: scale(20),
    borderRadius: scale(28),
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  fabGradient: {
    width: scale(56),
    height: scale(56),
    borderRadius: scale(28),
    justifyContent: 'center',
    alignItems: 'center',
  },
  apiaryCard: {
    borderRadius: scale(12),
    padding: scale(16),
    marginBottom: scale(16),
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  apiaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scale(8),
  },
  apiaryName: {
    fontSize: scale(18),
    fontWeight: 'bold',
    flex: 1,
  },
  hivesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 193, 7, 0.1)',
    paddingHorizontal: scale(8),
    paddingVertical: scale(4),
    borderRadius: scale(12),
  },
  hivesCount: {
    marginLeft: scale(4),
    fontWeight: 'bold',
  },
  apiaryLocation: {
    fontSize: scale(14),
    marginBottom: scale(12),
  },
  apiaryFooter: {
    marginTop: scale(8),
  },
  footerItem: {
    marginBottom: scale(6),
  },
  footerLabel: {
    fontSize: scale(12),
    marginBottom: scale(2),
  },
  footerValue: {
    fontSize: scale(14),
    fontWeight: '500',
  },
});

export default ApiariesScreen; 