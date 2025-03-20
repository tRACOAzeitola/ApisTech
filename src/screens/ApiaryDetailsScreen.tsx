import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Modal,
  TextInput
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

// Interface para Equipamento
interface Equipment {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  notes?: string;
}

// Interface para Transferência
interface Transfer {
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
  createdAt: new Date('2024-01-15'),
  lastVisit: new Date('2024-05-10'),
  floraTypes: ['Eucalipto', 'Silvestre'],
  estimatedProduction: 480,
  owner: 'João Silva',
  contact: '912345678',
  notes: 'Apiário localizado próximo a uma área de eucaliptos. Acesso por estrada de terra, a 3 km da estrada principal.',
  coordinates: '40.7128,-74.0060'
};

// Dados de exemplo para equipamentos
const MOCK_EQUIPMENT: Equipment[] = [
  { id: 'COL-LAN', name: 'Colmeia Langstroth', quantity: 8, unit: 'unidades' },
  { id: 'COL-REV', name: 'Colmeia Reversível', quantity: 4, unit: 'unidades' },
  { id: 'COL-ALC', name: 'Alças', quantity: 16, unit: 'unidades' }
];

// Mock data para transferências
const MOCK_TRANSFERS: Transfer[] = [
  { 
    id: '1',
    productId: 'COL-LAN',
    productName: 'Colmeia Langstroth',
    quantity: 5,
    fromLocation: 'Armazém',
    toLocation: 'Apiário Sul',
    date: new Date('2025-03-13'),
    notes: 'Instalação inicial'
  },
  {
    id: '2',
    productId: 'COL-ALC',
    productName: 'Alças',
    quantity: 10,
    fromLocation: 'Armazém',
    toLocation: 'Apiário Sul',
    date: new Date('2025-03-15')
  }
];

const ApiaryDetailsScreen: React.FC = () => {
  const navigation = useNavigation<ApiaryDetailsNavigationProp>();
  const route = useRoute<ApiaryDetailsRouteProp>();
  const { colors, isDark } = useTheme();
  
  // Estados
  const [apiary, setApiary] = useState<Apiary | null>(null);
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [transfers, setTransfers] = useState<Transfer[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'info' | 'equipment' | 'tasks'>('info');
  const [modalVisible, setModalVisible] = useState(false);
  const [editingEquipment, setEditingEquipment] = useState<Equipment | null>(null);
  const [newQuantity, setNewQuantity] = useState('');
  
  // Carregar dados do apiário
  useEffect(() => {
    const loadApiary = async () => {
      try {
        // Em uma implementação real, isso seria uma chamada API
        setTimeout(() => {
          setApiary(MOCK_APIARY);
          setEquipment(MOCK_EQUIPMENT);
          setTransfers(MOCK_TRANSFERS);
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
    // Apenas permite adicionar colmeias e alças
    Alert.alert(
      'Adicionar Equipamento',
      'Selecione o tipo de equipamento:',
      [
        { 
          text: 'Colmeia Langstroth', 
          onPress: () => {
            Alert.alert('Quantidade', 'Digite a quantidade:', [
              { text: 'Cancelar', style: 'cancel' },
              { 
                text: 'Adicionar', 
                onPress: () => {
                  Alert.alert('Sucesso', 'Colmeia Langstroth adicionada ao apiário.');
                }
              }
            ]);
          }
        },
        { 
          text: 'Colmeia Reversível', 
          onPress: () => {
            Alert.alert('Quantidade', 'Digite a quantidade:', [
              { text: 'Cancelar', style: 'cancel' },
              { 
                text: 'Adicionar', 
                onPress: () => {
                  Alert.alert('Sucesso', 'Colmeia Reversível adicionada ao apiário.');
                }
              }
            ]);
          }
        },
        { 
          text: 'Alças', 
          onPress: () => {
            Alert.alert('Quantidade', 'Digite a quantidade:', [
              { text: 'Cancelar', style: 'cancel' },
              { 
                text: 'Adicionar', 
                onPress: () => {
                  Alert.alert('Sucesso', 'Alças adicionadas ao apiário.');
                }
              }
            ]);
          }
        },
        { text: 'Cancelar', style: 'cancel' }
      ]
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

  // Função para atualizar a quantidade
  const updateEquipmentQuantity = () => {
    if (editingEquipment && newQuantity) {
      const quantity = parseInt(newQuantity);
      if (!isNaN(quantity) && quantity >= 0) {
        // Atualiza o equipamento localmente (em produção, isso seria uma chamada à API)
        const updatedEquipment = equipment.map(item => 
          item.id === editingEquipment.id 
            ? { ...item, quantity } 
            : item
        );
        setEquipment(updatedEquipment);
        
        // Feedback ao usuário
        Alert.alert(
          'Quantidade Atualizada', 
          `A quantidade de ${editingEquipment.name} foi atualizada para ${quantity} unidades.`
        );
        
        // Fecha o modal e reseta estados
        setModalVisible(false);
        setEditingEquipment(null);
        setNewQuantity('');
      } else {
        Alert.alert('Erro', 'Por favor, insira um número válido.');
      }
    }
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
              name="home" 
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
              Colmeias
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
            </View>
          )}
          
          {/* Tab de Equipamentos */}
          {activeTab === 'equipment' && (
            <View>
              <View style={[styles.equipmentHeader, { backgroundColor: cardBackgroundColor }]}>
                <Text style={[styles.equipmentHeaderTitle, { color: textColor }]}>Colmeias e Alças</Text>
                <TouchableOpacity style={styles.addButton} onPress={handleAddEquipment}>
                  <FontAwesome5 name="plus" size={16} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
              
              {equipment.length === 0 ? (
                <View style={[styles.emptyStateCard, { backgroundColor: cardBackgroundColor }]}>
                  <FontAwesome5 name="tools" size={40} color={secondaryTextColor} />
                  <Text style={[styles.emptyStateText, { color: secondaryTextColor }]}>
                    Nenhum equipamento registrado neste apiário
                  </Text>
                </View>
              ) : (
                <>
                  {equipment.map((item) => (
                    <View 
                      key={item.id} 
                      style={[styles.equipmentCard, { backgroundColor: cardBackgroundColor }]}
                    >
                      <View style={styles.equipmentIconContainer}>
                        {item.id === 'COL-LAN' ? (
                          <FontAwesome5 name="home" size={20} color="#FFC107" />
                        ) : item.id === 'COL-REV' ? (
                          <FontAwesome5 name="home" size={20} color="#FF9800" />
                        ) : item.id === 'COL-ALC' ? (
                          <MaterialCommunityIcons name="layers" size={22} color="#8BC34A" />
                        ) : (
                          <FontAwesome5 name="box" size={20} color="#78909C" />
                        )}
                      </View>
                      
                      <View style={styles.equipmentInfo}>
                        <Text style={[styles.equipmentName, { color: textColor }]}>
                          {item.name}
                          {item.id && (
                            <Text style={[styles.equipmentCode, { color: secondaryTextColor }]}>
                              {" "}({item.id})
                            </Text>
                          )}
                        </Text>
                        {item.notes && (
                          <Text style={[styles.equipmentNotes, { color: secondaryTextColor }]}>
                            {item.notes}
                          </Text>
                        )}
                      </View>
                      
                      <View style={styles.quantityContainer}>
                        <Text style={[styles.equipmentQuantityValue, { color: textColor }]}>
                          {item.quantity}
                        </Text>
                        
                        <TouchableOpacity 
                          style={[styles.editQuantityButton]} 
                          onPress={() => {
                            // Abrir modal para edição
                            setEditingEquipment(item);
                            setNewQuantity(item.quantity.toString());
                            setModalVisible(true);
                          }}
                        >
                          <FontAwesome5 name="edit" size={14} color="#FFFFFF" />
                        </TouchableOpacity>
                      </View>
                    </View>
                  ))}
                  
                  <View style={styles.historyContainer}>
                    <Text style={[styles.historyTitle, { color: textColor }]}>
                      Histórico de Transferências
                    </Text>
                    
                    {transfers && transfers.length > 0 ? (
                      transfers.map((transfer, index) => (
                        <View 
                          key={index} 
                          style={[styles.transferItem, { backgroundColor: cardBackgroundColor }]}
                        >
                          <View style={styles.transferHeader}>
                            <View style={styles.transferTypeContainer}>
                              <FontAwesome5 name="home" size={14} color="#FFC107" />
                              <Text style={[styles.transferType, { color: textColor }]}>
                                {transfer.productName}
                              </Text>
                            </View>
                            <Text style={[styles.transferDate, { color: secondaryTextColor }]}>
                              {formatDate(transfer.date)}
                            </Text>
                          </View>
                          
                          <View style={styles.transferDirection}>
                            <Text style={[styles.transferLocation, { color: secondaryTextColor }]}>
                              {transfer.fromLocation}
                            </Text>
                            <MaterialCommunityIcons name="arrow-right" size={16} color={secondaryTextColor} />
                            <Text style={[styles.transferLocation, { color: secondaryTextColor }]}>
                              {transfer.toLocation}
                            </Text>
                          </View>
                          
                          <Text style={[styles.transferQuantity, { color: textColor }]}>
                            {transfer.quantity} unidades
                          </Text>
                          
                          {transfer.notes && (
                            <Text style={[styles.transferNotes, { color: secondaryTextColor }]}>
                              Notas: {transfer.notes}
                            </Text>
                          )}
                        </View>
                      ))
                    ) : (
                      <View style={[styles.emptyTransfers, { backgroundColor: cardBackgroundColor }]}>
                        <Text style={[styles.emptyTransfersText, { color: secondaryTextColor }]}>
                          Nenhuma transferência registrada
                        </Text>
                      </View>
                    )}
                  </View>
                </>
              )}
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
            </View>
          )}
        </ScrollView>
      </View>
      
      {/* Modal para edição de quantidade */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
          setEditingEquipment(null);
        }}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: cardBackgroundColor }]}>
            <Text style={[styles.modalTitle, { color: textColor }]}>
              Editar Quantidade
            </Text>
            
            {editingEquipment && (
              <Text style={[styles.modalSubtitle, { color: secondaryTextColor }]}>
                {editingEquipment.name}
              </Text>
            )}
            
            <TextInput
              style={[styles.quantityInput, { 
                color: textColor,
                borderColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)',
                backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'
              }]}
              placeholder="Digite a nova quantidade"
              placeholderTextColor={secondaryTextColor}
              keyboardType="number-pad"
              value={newQuantity}
              onChangeText={setNewQuantity}
              autoFocus={true}
            />
            
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelButton]} 
                onPress={() => {
                  setModalVisible(false);
                  setEditingEquipment(null);
                  setNewQuantity('');
                }}
              >
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.modalButton, styles.confirmButton]} 
                onPress={updateEquipmentQuantity}
              >
                <Text style={styles.modalButtonText}>Confirmar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  equipmentIconContainer: {
    width: scale(34),
    height: scale(34),
    borderRadius: scale(17),
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  equipmentInfo: {
    flex: 1,
  },
  equipmentName: {
    fontSize: scale(16),
    fontWeight: '500',
  },
  equipmentCode: {
    fontSize: scale(12),
    marginTop: scale(4),
  },
  equipmentNotes: {
    fontSize: scale(12),
    marginTop: scale(4),
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  equipmentQuantityValue: {
    fontSize: scale(14),
    fontWeight: '500',
  },
  editQuantityButton: {
    width: scale(34),
    height: scale(34),
    borderRadius: scale(17),
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: scale(10),
  },
  historyContainer: {
    marginTop: scale(16),
    padding: scale(16),
  },
  historyTitle: {
    fontSize: scale(16),
    fontWeight: 'bold',
    marginBottom: scale(8),
  },
  transferItem: {
    padding: scale(16),
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  transferHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  transferTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  transferType: {
    fontSize: scale(14),
    fontWeight: '500',
  },
  transferDate: {
    fontSize: scale(12),
  },
  transferDirection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  transferLocation: {
    fontSize: scale(14),
  },
  transferQuantity: {
    fontSize: scale(14),
    fontWeight: '500',
  },
  transferNotes: {
    fontSize: scale(12),
  },
  emptyTransfers: {
    padding: scale(16),
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTransfersText: {
    fontSize: scale(14),
    textAlign: 'center',
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
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    borderRadius: scale(12),
    padding: scale(20),
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: scale(18),
    fontWeight: 'bold',
    marginBottom: scale(8),
  },
  modalSubtitle: {
    fontSize: scale(16),
    marginBottom: scale(20),
  },
  quantityInput: {
    width: '100%',
    borderWidth: 1,
    borderRadius: scale(8),
    padding: scale(12),
    fontSize: scale(16),
    marginBottom: scale(20),
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    padding: scale(12),
    borderRadius: scale(8),
    alignItems: 'center',
    marginHorizontal: scale(6),
  },
  cancelButton: {
    backgroundColor: '#F44336',
  },
  confirmButton: {
    backgroundColor: '#4CAF50',
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: scale(14),
  },
});

export default ApiaryDetailsScreen; 