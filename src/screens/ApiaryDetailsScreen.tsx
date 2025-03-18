import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { scale } from '../utils/responsive';
import { useTheme } from '../context/ThemeContext';
import { RootStackParamList } from '../types';
import ScreenLayout from '../components/ScreenLayout';

type ApiaryDetailsRouteProp = RouteProp<RootStackParamList, 'ApiaryDetails'>;
type ApiaryDetailsNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ApiaryDetails'>;

// Interface para Apiário
interface Apiary {
  id: string;
  name: string;
  location: string;
  hiveCount: number;
  superCount?: number;
  createdAt: Date;
  lastVisit?: Date;
  notes?: string;
  floraTypes?: string[];
  estimatedProduction?: number;
  owner?: string;
  contact?: string;
  imageUrl?: string;
  coordinates?: string;
}

// Interface para Equipment
interface Equipment {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  notes?: string;
}

// Add missing TransferHistory interface
interface TransferHistory {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  fromLocation: string;
  toLocation: string;
  date: Date;
  notes?: string;
}

// Dados de exemplo para um apiário
const MOCK_APIARY: Apiary = {
  id: '1',
  name: 'Apiário Sul',
  location: 'Serra da Estrela',
  hiveCount: 12,
  superCount: 24,
  createdAt: new Date('2024-01-15'),
  lastVisit: new Date('2024-05-10'),
  floraTypes: ['Eucalipto', 'Silvestre'],
  estimatedProduction: 480,
  owner: 'João Silva',
  contact: '912345678',
  notes: 'Apiário localizado próximo a uma área de eucaliptos. Acesso por estrada de terra, a 3 km da estrada principal.'
};

// Dados de exemplo para equipamentos
const MOCK_EQUIPMENT: Equipment[] = [
  { id: '1', name: 'Colmeia Langstroth', quantity: 8, unit: 'unidades' },
  { id: '2', name: 'Melgueira', quantity: 16, unit: 'unidades' },
  { id: '3', name: 'Fumigador', quantity: 1, unit: 'unidade' },
  { id: '4', name: 'Macacão de apicultor', quantity: 2, unit: 'unidades' }
];

const ApiaryDetailsScreen: React.FC = () => {
  const navigation = useNavigation<ApiaryDetailsNavigationProp>();
  const route = useRoute<ApiaryDetailsRouteProp>();
  const { colors, isDark } = useTheme();
  
  // Estados
  const [apiary, setApiary] = useState<Apiary | null>(null);
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'info' | 'equipment' | 'tasks'>('info');
  const [transferHistory, setTransferHistory] = useState<TransferHistory[]>([]);
  const [apiaryEquipment, setApiaryEquipment] = useState({
    hives: 0,  // Colmeias (COL-COL)
    supers: 0  // Alças (COL-ALC)
  });
  
  // Carregar dados do apiário
  useEffect(() => {
    const loadApiary = async () => {
      try {
        // Em uma implementação real, isso seria uma chamada API
        setTimeout(() => {
          setApiary(MOCK_APIARY);
          setEquipment(MOCK_EQUIPMENT);
          setApiaryEquipment({
            hives: MOCK_APIARY?.hiveCount || 0,
            supers: MOCK_APIARY?.superCount || 0
          });
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Erro ao carregar dados do apiário:', error);
        setLoading(false);
        Alert.alert('Erro', 'Não foi possível carregar os dados do apiário.');
      }
    };

    loadApiary();
  }, [route.params?.apiaryId]);

  // Carregar histórico quando a tela é montada
  useEffect(() => {
    // Na implementação real, você buscaria do banco de dados
    // Aqui estamos apenas simulando com dados estáticos
    const mockHistory = [
      {
        id: '1',
        productId: 'COL-COL',
        productName: 'Colmeias',
        quantity: 5,
        fromLocation: 'Armazém',
        toLocation: apiary?.name || 'Apiário',
        date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 dias atrás
        notes: 'Instalação inicial',
      },
      {
        id: '2',
        productId: 'COL-ALC',
        productName: 'Alças',
        quantity: 10,
        fromLocation: 'Armazém',
        toLocation: apiary?.name || 'Apiário',
        date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 dias atrás
        notes: 'Preparação para produção',
      },
      {
        id: '3',
        productId: 'COL-COL',
        productName: 'Colmeias',
        quantity: 2,
        fromLocation: apiary?.name || 'Apiário',
        toLocation: 'Armazém',
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 dias atrás
        notes: 'Manutenção necessária',
      },
    ];
    
    setTransferHistory(mockHistory);
  }, [apiary?.name]);

  // Formatação de data
  const formatDate = (date?: Date) => {
    if (!date) return 'N/A';
    return date.toLocaleDateString('pt-PT', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  // Função para confirmar exclusão
  const confirmDelete = () => {
    Alert.alert(
      'Confirmar Exclusão',
      `Tem certeza que deseja excluir o apiário ${apiary?.name}? Esta ação não pode ser desfeita.`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Excluir', 
          style: 'destructive',
          onPress: handleDeleteApiary
        }
      ]
    );
  };

  // Função para excluir apiário
  const handleDeleteApiary = () => {
    // Em uma implementação real, isso seria uma chamada API
    console.log('Excluindo apiário:', apiary?.id);
    
    // Simular sucesso após exclusão
    Alert.alert(
      'Apiário Excluído',
      'O apiário foi excluído com sucesso.',
      [{ text: 'OK', onPress: () => navigation.goBack() }]
    );
  };

  // Função para editar apiário
  const handleEditApiary = () => {
    Alert.alert(
      'Em desenvolvimento',
      'A funcionalidade de editar apiário está em desenvolvimento.',
      [{ text: 'OK' }]
    );
    // Futuramente:
    // navigation.navigate('EditApiary', { apiaryId: apiary?.id });
  };

  // Função para adicionar tarefa
  const handleAddTask = () => {
    Alert.alert(
      'Em desenvolvimento',
      'A funcionalidade de adicionar tarefa está em desenvolvimento.',
      [{ text: 'OK' }]
    );
  };

  // Função para adicionar equipamento
  const handleAddEquipment = () => {
    Alert.alert(
      'Em desenvolvimento',
      'A funcionalidade de adicionar equipamento está em desenvolvimento.',
      [{ text: 'OK' }]
    );
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
  
  // Menu do cabeçalho
  const renderHeaderMenu = () => (
    <View style={{ flexDirection: 'row' }}>
      <TouchableOpacity 
        style={{ marginRight: scale(20) }} 
        onPress={handleEditApiary}
      >
        <FontAwesome5 name="edit" size={20} color={accentColor} />
      </TouchableOpacity>
      <TouchableOpacity onPress={confirmDelete}>
        <FontAwesome5 name="trash-alt" size={20} color="#F44336" />
      </TouchableOpacity>
    </View>
  );

  const renderApiarySections = () => (
    <View style={styles.sections}>
      {/* Seção existente sobre colmeias */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Colmeias</Text>
        <Text style={styles.sectionValue}>{apiary?.hiveCount || 0}</Text>
        <View style={styles.sectionActions}>
          <TouchableOpacity
            style={styles.sectionButton}
            onPress={handleAddEquipment}
          >
            <Text style={styles.sectionButtonText}>Adicionar</Text>
          </TouchableOpacity>
          
          {/* Novo botão para retornar colmeias ao armazém */}
          <TouchableOpacity
            style={[styles.sectionButton, styles.returnButton]}
            onPress={handleReturnToWarehouse}
          >
            <Text style={styles.sectionButtonText}>Retornar ao Armazém</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      {/* ... outras seções existentes ... */}
    </View>
  );

  // Nova função para lidar com retorno ao armazém
  const handleReturnToWarehouse = () => {
    // Mostrar uma lista dos itens do apiário e permitir seleção para retorno
    navigation.navigate('ApiaryInventory', {
      apiaryId: apiary?.id,
      apiaryName: apiary?.name,
      mode: 'return'
    });
  };

  // Adicionar seção de histórico de transferências
  const renderTransferHistory = () => (
    <View style={styles.historySection}>
      <Text style={styles.historyTitle}>Histórico de Transferências</Text>
      
      {transferHistory.length === 0 ? (
        <Text style={styles.noHistoryText}>Sem registros de transferências</Text>
      ) : (
        transferHistory.map(transfer => (
          <View key={transfer.id} style={styles.historyItem}>
            <View style={styles.historyHeader}>
              <View style={styles.productTypeTag}>
                <FontAwesome5 
                  name={transfer.productId === 'COL-COL' ? 'home' : 'layer-group'} 
                  size={12} 
                  color="#FFFFFF" 
                />
                <Text style={styles.productTypeText}>
                  {transfer.productName}
                </Text>
              </View>
              <Text style={styles.transferDate}>
                {transfer.date.toLocaleDateString()}
              </Text>
            </View>
            
            <View style={styles.transferFlow}>
              <Text style={styles.locationText}>{transfer.fromLocation}</Text>
              <FontAwesome5 
                name="arrow-right" 
                size={12} 
                color="#999999" 
                style={styles.arrowIcon} 
              />
              <Text style={styles.locationText}>{transfer.toLocation}</Text>
            </View>
            
            <View style={styles.transferDetails}>
              <Text style={styles.quantityText}>
                {transfer.quantity} unidades
              </Text>
              {transfer.notes && (
                <Text style={styles.notesText}>
                  Notas: {transfer.notes}
                </Text>
              )}
            </View>
          </View>
        ))
      )}
    </View>
  );

  // Criar uma nova função para renderizar a seção de equipamentos
  const renderEquipmentSection = () => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Equipamentos</Text>
      
      <View style={styles.equipmentContainer}>
        {/* Colmeias */}
        <View style={styles.equipmentRow}>
          <View style={styles.equipmentNameContainer}>
            <FontAwesome5 name="home" size={18} color="#FFC107" solid />
            <Text style={styles.equipmentName}>Colmeias</Text>
            <Text style={styles.equipmentSku}>(COL-COL)</Text>
          </View>
          
          <Text style={styles.equipmentCount}>{apiaryEquipment.hives}</Text>
          
          <View style={styles.equipmentActions}>
            <TouchableOpacity
              style={[styles.equipmentButton, styles.addButton]}
              onPress={() => handleEquipmentTransfer('hive', 'add')}
            >
              <FontAwesome5 name="plus" size={12} color="#FFFFFF" />
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.equipmentButton, styles.removeButton]}
              onPress={() => handleEquipmentTransfer('hive', 'return')}
              disabled={apiaryEquipment.hives <= 0}
            >
              <FontAwesome5 name="minus" size={12} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Alças */}
        <View style={styles.equipmentRow}>
          <View style={styles.equipmentNameContainer}>
            <FontAwesome5 name="layer-group" size={18} color="#FF9800" solid />
            <Text style={styles.equipmentName}>Alças</Text>
            <Text style={styles.equipmentSku}>(COL-ALC)</Text>
          </View>
          
          <Text style={styles.equipmentCount}>{apiaryEquipment.supers}</Text>
          
          <View style={styles.equipmentActions}>
            <TouchableOpacity
              style={[styles.equipmentButton, styles.addButton]}
              onPress={() => handleEquipmentTransfer('super', 'add')}
            >
              <FontAwesome5 name="plus" size={12} color="#FFFFFF" />
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.equipmentButton, styles.removeButton]}
              onPress={() => handleEquipmentTransfer('super', 'return')}
              disabled={apiaryEquipment.supers <= 0}
            >
              <FontAwesome5 name="minus" size={12} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  // Função para lidar com transferências de equipamentos
  const handleEquipmentTransfer = (
    equipmentType: 'hive' | 'super', 
    action: 'add' | 'return'
  ) => {
    const productId = equipmentType === 'hive' ? 'COL-COL' : 'COL-ALC';
    const productName = equipmentType === 'hive' ? 'Colmeias' : 'Alças';
    
    navigation.navigate('TransferEquipment', {
      apiaryId: apiary?.id,
      apiaryName: apiary?.name || 'Apiário',
      productId: productId,
      productName: productName,
      isReturn: action === 'return',
      currentCount: equipmentType === 'hive' ? apiaryEquipment.hives : apiaryEquipment.supers
    });
  };

  if (loading) {
    return (
      <ScreenLayout 
        title="Detalhes do Apiário" 
        showBackButton={true}
        onBackPress={() => navigation.goBack()}
      >
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FFC107" />
          <Text style={styles.loadingText}>Carregando dados do apiário...</Text>
        </View>
      </ScreenLayout>
    );
  }

  if (!apiary) {
    return (
      <ScreenLayout 
        title="Erro" 
        showBackButton={true}
        onBackPress={() => navigation.goBack()}
      >
        <View style={styles.loadingContainer}>
          <FontAwesome5 name="exclamation-triangle" size={50} color="#F44336" />
          <Text style={styles.errorText}>Apiário não encontrado</Text>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout 
      title={apiary.name} 
      showBackButton={true}
      onBackPress={() => navigation.goBack()}
      rightComponent={renderHeaderMenu()}
    >
      <View style={styles.container}>
        {/* Cabeçalho do Apiário */}
        <LinearGradient
          colors={isDark 
            ? ['#5D2E0D', '#3E1F08'] 
            : ['#FFC107', '#FFB300']}
          style={styles.apiaryHeader}
        >
          <View style={styles.apiaryHeaderContent}>
            <View style={styles.apiaryIconContainer}>
              <FontAwesome5 name="house" size={28} color="#FFFFFF" />
            </View>
            <View style={styles.apiaryHeaderInfo}>
              <Text style={styles.apiaryHeaderTitle}>{apiary.name}</Text>
              <Text style={styles.apiaryHeaderSubtitle}>{apiary.location}</Text>
              {apiary.lastVisit && (
                <View style={styles.lastVisitContainer}>
                  <FontAwesome5 name="calendar-alt" size={12} color="#FFFFFF" style={styles.lastVisitIcon} />
                  <Text style={styles.lastVisitText}>Última visita: {formatDate(apiary.lastVisit)}</Text>
                </View>
              )}
            </View>
          </View>
        </LinearGradient>
        
        {/* Abas de navegação */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity 
            style={[
              styles.tabButton, 
              activeTab === 'info' && styles.activeTabButton
            ]}
            onPress={() => setActiveTab('info')}
          >
            <FontAwesome5 
              name="info-circle" 
              size={16} 
              color={activeTab === 'info' ? accentColor : secondaryTextColor} 
            />
            <Text 
              style={[
                styles.tabButtonText, 
                activeTab === 'info' && styles.activeTabText,
                { color: activeTab === 'info' ? accentColor : secondaryTextColor }
              ]}
            >
              Informações
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.tabButton, 
              activeTab === 'equipment' && styles.activeTabButton
            ]}
            onPress={() => setActiveTab('equipment')}
          >
            <FontAwesome5 
              name="tools" 
              size={16} 
              color={activeTab === 'equipment' ? accentColor : secondaryTextColor} 
            />
            <Text 
              style={[
                styles.tabButtonText, 
                activeTab === 'equipment' && styles.activeTabText,
                { color: activeTab === 'equipment' ? accentColor : secondaryTextColor }
              ]}
            >
              Equipamentos
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.tabButton, 
              activeTab === 'tasks' && styles.activeTabButton
            ]}
            onPress={() => setActiveTab('tasks')}
          >
            <FontAwesome5 
              name="tasks" 
              size={16} 
              color={activeTab === 'tasks' ? accentColor : secondaryTextColor} 
            />
            <Text 
              style={[
                styles.tabButtonText, 
                activeTab === 'tasks' && styles.activeTabText,
                { color: activeTab === 'tasks' ? accentColor : secondaryTextColor }
              ]}
            >
              Tarefas
            </Text>
          </TouchableOpacity>
        </View>
        
        <ScrollView 
          style={styles.content}
          contentContainerStyle={{ paddingBottom: scale(40) }}
          showsVerticalScrollIndicator={false}
        >
          {/* Tab de Informações */}
          {activeTab === 'info' && (
            <View>
              <View style={[styles.infoCard, { backgroundColor: cardBackgroundColor }]}>
                <View style={styles.infoRow}>
                  <Text style={[styles.infoLabel, { color: secondaryTextColor }]}>Local</Text>
                  <Text style={[styles.infoValue, { color: textColor }]}>{apiary.location}</Text>
                </View>
                
                <View style={styles.infoRow}>
                  <Text style={[styles.infoLabel, { color: secondaryTextColor }]}>Colmeias</Text>
                  <Text style={[styles.infoValue, { color: textColor }]}>{apiary.hiveCount}</Text>
                </View>
                
                {apiary.coordinates && (
                  <View style={styles.infoRow}>
                    <Text style={[styles.infoLabel, { color: secondaryTextColor }]}>Coordenadas</Text>
                    <Text style={[styles.infoValue, { color: textColor }]}>{apiary.coordinates}</Text>
                  </View>
                )}
                
                <View style={styles.infoRow}>
                  <Text style={[styles.infoLabel, { color: secondaryTextColor }]}>Data de Criação</Text>
                  <Text style={[styles.infoValue, { color: textColor }]}>{formatDate(apiary.createdAt)}</Text>
                </View>
                
                {apiary.lastVisit && (
                  <View style={styles.infoRow}>
                    <Text style={[styles.infoLabel, { color: secondaryTextColor }]}>Última Visita</Text>
                    <Text style={[styles.infoValue, { color: textColor }]}>{formatDate(apiary.lastVisit)}</Text>
                  </View>
                )}
                
                {apiary.floraTypes && apiary.floraTypes.length > 0 && (
                  <View style={styles.infoRow}>
                    <Text style={[styles.infoLabel, { color: secondaryTextColor }]}>Flora</Text>
                    <Text style={[styles.infoValue, { color: textColor }]}>{apiary.floraTypes.join(', ')}</Text>
                  </View>
                )}
                
                {apiary.estimatedProduction && (
                  <View style={styles.infoRow}>
                    <Text style={[styles.infoLabel, { color: secondaryTextColor }]}>Produção Estimada</Text>
                    <Text style={[styles.infoValue, { color: textColor }]}>{apiary.estimatedProduction} kg</Text>
                  </View>
                )}
                
                {apiary.owner && (
                  <View style={styles.infoRow}>
                    <Text style={[styles.infoLabel, { color: secondaryTextColor }]}>Proprietário</Text>
                    <Text style={[styles.infoValue, { color: textColor }]}>{apiary.owner}</Text>
                  </View>
                )}
                
                {apiary.contact && (
                  <View style={styles.infoRow}>
                    <Text style={[styles.infoLabel, { color: secondaryTextColor }]}>Contato</Text>
                    <Text style={[styles.infoValue, { color: textColor }]}>{apiary.contact}</Text>
                  </View>
                )}
              </View>
              
              {apiary.notes && (
                <View style={[styles.notesCard, { backgroundColor: cardBackgroundColor }]}>
                  <Text style={[styles.notesTitle, { color: secondaryTextColor }]}>Notas</Text>
                  <Text style={[styles.notesText, { color: textColor }]}>{apiary.notes}</Text>
                </View>
              )}
              
              {/* Move the history section here for the info tab */}
              {renderTransferHistory()}
            </View>
          )}
          
          {/* Tab de Equipamentos */}
          {activeTab === 'equipment' && (
            <View>
              {renderEquipmentSection()}
              
              {/* Optional: Also show history in equipment tab */}
              {renderTransferHistory()}
            </View>
          )}
          
          {/* Tab de Tarefas */}
          {activeTab === 'tasks' && (
            <View>
              <View style={[styles.tasksHeader, { backgroundColor: cardBackgroundColor }]}>
                <Text style={[styles.tasksHeaderTitle, { color: textColor }]}>Tarefas do Apiário</Text>
                <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
                  <FontAwesome5 name="plus" size={16} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
              
              <View style={[styles.emptyStateCard, { backgroundColor: cardBackgroundColor }]}>
                <FontAwesome5 name="tasks" size={40} color={secondaryTextColor} />
                <Text style={[styles.emptyStateText, { color: secondaryTextColor }]}>
                  Nenhuma tarefa programada para este apiário
                </Text>
              </View>
              
              {/* Optional: Also show history in tasks tab */}
              {renderTransferHistory()}
            </View>
          )}
        </ScrollView>
      </View>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: scale(20),
  },
  loadingText: {
    marginTop: scale(16),
    fontSize: scale(16),
    color: '#FFFFFF',
    textAlign: 'center',
  },
  errorText: {
    marginTop: scale(20),
    fontSize: scale(18),
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: scale(20),
  },
  backButton: {
    backgroundColor: '#FFC107',
    paddingHorizontal: scale(20),
    paddingVertical: scale(10),
    borderRadius: scale(8),
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: scale(16),
    fontWeight: 'bold',
  },
  apiaryHeader: {
    padding: scale(16),
    borderBottomLeftRadius: scale(16),
    borderBottomRightRadius: scale(16),
  },
  apiaryHeaderContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  apiaryIconContainer: {
    width: scale(60),
    height: scale(60),
    borderRadius: scale(30),
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(16),
  },
  apiaryHeaderInfo: {
    flex: 1,
  },
  apiaryHeaderTitle: {
    fontSize: scale(20),
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  apiaryHeaderSubtitle: {
    fontSize: scale(16),
    color: '#FFFFFF',
    opacity: 0.9,
    marginTop: scale(2),
  },
  lastVisitContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: scale(6),
  },
  lastVisitIcon: {
    marginRight: scale(4),
  },
  lastVisitText: {
    fontSize: scale(12),
    color: '#FFFFFF',
    opacity: 0.8,
  },
  tabsContainer: {
    flexDirection: 'row',
    marginTop: scale(16),
    paddingHorizontal: scale(16),
    marginBottom: scale(16),
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: scale(10),
    borderRadius: scale(8),
  },
  activeTabButton: {
    backgroundColor: 'rgba(255, 193, 7, 0.1)',
  },
  tabButtonText: {
    marginLeft: scale(6),
    fontSize: scale(14),
    fontWeight: '500',
  },
  activeTabText: {
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    paddingHorizontal: scale(16),
  },
  infoCard: {
    borderRadius: scale(12),
    padding: scale(16),
    marginBottom: scale(16),
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: scale(8),
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  infoLabel: {
    fontSize: scale(14),
  },
  infoValue: {
    fontSize: scale(14),
    fontWeight: '500',
    flex: 1,
    textAlign: 'right',
  },
  notesCard: {
    borderRadius: scale(12),
    padding: scale(16),
    marginBottom: scale(16),
  },
  notesTitle: {
    fontSize: scale(16),
    fontWeight: 'bold',
    marginBottom: scale(8),
  },
  notesText: {
    fontSize: scale(14),
    lineHeight: scale(22),
  },
  equipmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: scale(12),
    padding: scale(16),
    marginBottom: scale(16),
  },
  equipmentHeaderTitle: {
    fontSize: scale(16),
    fontWeight: 'bold',
  },
  addButton: {
    width: scale(34),
    height: scale(34),
    borderRadius: scale(17),
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyStateCard: {
    borderRadius: scale(12),
    padding: scale(20),
    marginBottom: scale(16),
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyStateText: {
    fontSize: scale(14),
    textAlign: 'center',
    marginTop: scale(12),
  },
  equipmentCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: scale(12),
    padding: scale(16),
    marginBottom: scale(16),
  },
  equipmentInfo: {
    flex: 1,
  },
  equipmentName: {
    fontSize: scale(16),
    fontWeight: '500',
  },
  equipmentQuantity: {
    fontSize: scale(14),
    marginTop: scale(4),
  },
  equipmentNotes: {
    fontSize: scale(12),
    marginTop: scale(4),
  },
  equipmentActionButton: {
    width: scale(34),
    height: scale(34),
    borderRadius: scale(17),
    backgroundColor: 'rgba(244, 67, 54, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tasksHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: scale(12),
    padding: scale(16),
    marginBottom: scale(16),
  },
  tasksHeaderTitle: {
    fontSize: scale(16),
    fontWeight: 'bold',
  },
  sections: {
    padding: scale(16),
  },
  section: {
    marginBottom: scale(16),
  },
  sectionTitle: {
    fontSize: scale(16),
    fontWeight: 'bold',
    color: 'white',
    marginBottom: scale(8),
  },
  sectionValue: {
    fontSize: scale(14),
    color: 'white',
    fontWeight: '500',
  },
  sectionActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionButton: {
    padding: scale(12),
    borderRadius: scale(8),
    backgroundColor: '#4CAF50',
  },
  sectionButtonText: {
    color: 'white',
    fontWeight: '500',
  },
  returnButton: {
    backgroundColor: '#FFC107',
  },
  historySection: {
    marginTop: scale(20),
    padding: scale(16),
  },
  historyTitle: {
    fontSize: scale(18),
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: scale(16),
  },
  noHistoryText: {
    color: '#999999',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  historyItem: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: scale(8),
    padding: scale(12),
    marginBottom: scale(10),
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scale(8),
  },
  productTypeTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,193,7,0.2)',
    paddingHorizontal: scale(8),
    paddingVertical: scale(4),
    borderRadius: scale(4),
  },
  productTypeText: {
    color: '#FFFFFF',
    fontSize: scale(12),
    marginLeft: scale(4),
    fontWeight: '500',
  },
  transferDate: {
    color: '#999999',
    fontSize: scale(12),
  },
  transferFlow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(8),
  },
  locationText: {
    color: '#FFFFFF',
    fontSize: scale(14),
  },
  arrowIcon: {
    marginHorizontal: scale(8),
  },
  transferDetails: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
    paddingTop: scale(8),
  },
  quantityText: {
    color: '#FFFFFF',
    fontSize: scale(14),
    fontWeight: '500',
  },
  notesText: {
    color: '#CCCCCC',
    fontSize: scale(12),
    fontStyle: 'italic',
    marginTop: scale(4),
  },
  sectionContainer: {
    padding: scale(16),
  },
  equipmentContainer: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
  },
  equipmentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  equipmentNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  equipmentName: {
    color: '#FFFFFF',
    fontSize: 16,
    marginLeft: 8,
  },
  equipmentSku: {
    color: '#CCCCCC',
    fontSize: 14,
    marginLeft: 4,
  },
  equipmentCount: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    minWidth: 40,
    textAlign: 'center',
  },
  equipmentActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: 90,
  },
  equipmentButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  addButton: {
    backgroundColor: '#4CD964', // Verde
  },
  removeButton: {
    backgroundColor: '#FF9500', // Laranja
  },
});

export default ApiaryDetailsScreen; 