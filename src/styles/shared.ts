import { StyleSheet } from 'react-native';
import { scale } from '../utils/responsive';

/**
 * Estilos compartilhados para uso em múltiplas telas e componentes
 * Reduz a duplicação de código e promove consistência na UI
 */
export const sharedStyles = StyleSheet.create({
  // Containers
  container: {
    flex: 1,
  },
  screenContent: {
    flex: 1,
    paddingHorizontal: scale(16),
  },
  
  // Cards e containers
  card: {
    borderRadius: scale(12),
    padding: scale(16),
    marginBottom: scale(16),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
  // Text
  title: {
    fontSize: scale(20),
    fontWeight: 'bold',
    marginBottom: scale(16),
  },
  subtitle: {
    fontSize: scale(16),
    fontWeight: '600',
    marginBottom: scale(8),
  },
  label: {
    fontSize: scale(14),
    marginBottom: scale(8),
  },
  value: {
    fontSize: scale(14),
    fontWeight: '500',
  },
  
  // Buttons
  button: {
    paddingVertical: scale(12),
    paddingHorizontal: scale(20),
    borderRadius: scale(8),
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: scale(16),
    fontWeight: '600',
    color: '#FFFFFF',
  },
  
  // Icon containers
  iconContainer: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: scale(12),
  },
  
  // Empty states
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: scale(20),
  },
  emptyStateText: {
    fontSize: scale(14),
    textAlign: 'center',
    marginTop: scale(12),
  },
  
  // Lists and item cards
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: scale(16),
    borderRadius: scale(8),
    marginBottom: scale(8),
  },
  
  // Estilos adicionados do ApiaryDetailsScreen
  
  // ---- Header do Apiário ----
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
  
  // ---- Abas ----
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
  
  // ---- Informações do Apiário ----
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
  
  // ---- Equipamentos ----
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
  
  // ---- Tarefas ----
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
  
  // ---- Seções ----
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
  
  // ---- Histórico ----
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
  
  // ---- Equipamentos Específicos ----
  sectionContainer: {
    padding: scale(16),
  },
  equipmentContainer: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
  },
  equipmentNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
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
  removeButton: {
    backgroundColor: '#FF9500', // Laranja
  },
  
  // Estados de carregamento e erro
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
});

export default sharedStyles; 