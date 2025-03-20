import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Platform, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { scale } from '../utils/responsive';

// Definimos o tipo para as rotas
type RootStackParamList = {
  Home: undefined;
  Dashboard: undefined;
  AddProduct: { 
    categoryId?: string;
    editMode?: boolean;
    product?: any;
    categoryName?: string;
  };
  EditProduct: {
    product: any;
    categoryName: string;
  };
  CategoryProducts: { 
    category: { 
      id: string; 
      name: string; 
      count?: number; 
      totalStock?: number; 
      unit?: string 
    };
    fromTabNavigator?: boolean;
  };
  History: undefined;
  LowStock: undefined;
};

// Tipo para navegação
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

// Definir tipo para as categorias do tab
type CategoryTabId = 'all' | 'mel' | 'colmeia' | 'veterinario' | 'embalamento' | 'visita' | 'melaria' | 'ferramentas' | 'cera';

// Mapeamento entre IDs do CategoryTabs e IDs do banco de dados de produtos
const CATEGORY_ID_MAPPING: Record<CategoryTabId, string> = {
  'all': '0',
  'mel': '1',
  'colmeia': '2',
  'veterinario': '3',
  'embalamento': '4',
  'visita': '5',
  'melaria': '6',
  'ferramentas': '7',
  'cera': '8'
};

// Definição das cores específicas para cada categoria
const CATEGORY_COLORS: Record<CategoryTabId, string> = {
  'all': '#FFFFFF',         // Branco para "Todos"
  'mel': '#FFD700',         // Amarelo dourado para "Mel"
  'colmeia': '#8B4513',     // Marrom (castanho) para "Material de Colmeia"
  'veterinario': '#FF4D4D', // Vermelho para "Produtos Veterinários"
  'embalamento': '#9E9E9E', // Cinza para "Embalamento"
  'visita': '#4DA6FF',      // Azul para "Material de Visita"
  'melaria': '#00BFFF',     // Azul claro para "Equipamento de Melaria"
  'ferramentas': '#808080', // Cinza escuro para "Ferramentas Apícolas"
  'cera': '#FFA500'         // Laranja para "Cera"
};

// Definição das categorias com seus respectivos ícones
const CATEGORY_TABS = [
  { id: 'all' as CategoryTabId, name: 'Todos', icon: 'layers' },
  { id: 'mel' as CategoryTabId, name: 'Mel', icon: 'water' },
  { id: 'colmeia' as CategoryTabId, name: 'Material de Colmeia', icon: 'beehive-outline' },
  { id: 'veterinario' as CategoryTabId, name: 'Produtos Veterinários', icon: 'hospital-box' },
  { id: 'embalamento' as CategoryTabId, name: 'Embalamento', icon: 'package-variant' },
  { id: 'visita' as CategoryTabId, name: 'Material de Visita', icon: 'bee' },
  { id: 'melaria' as CategoryTabId, name: 'Equipamento de Melaria', icon: 'state-machine' },
  { id: 'ferramentas' as CategoryTabId, name: 'Ferramentas Apícolas', icon: 'hammer-wrench' },
  { id: 'cera' as CategoryTabId, name: 'Cera', icon: 'hexagon-outline' },
];

interface CategoryTabsProps {
  activeCategory?: string;
  onCategoryChange?: (categoryId: string) => void;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({ 
  activeCategory = 'all',
  onCategoryChange = () => {} 
}) => {
  const navigation = useNavigation<NavigationProp>();
  const screenWidth = Dimensions.get('window').width;

  const handleTabPress = (categoryId: string) => {
    // Atualizar estado de categoria ativa
    onCategoryChange(categoryId);
    
    // Se a categoria não for "Todos", navegar para a tela de produtos daquela categoria
    if (categoryId !== 'all') {
      const selectedCategory = CATEGORY_TABS.find(cat => cat.id === categoryId);
      // Obter o ID correspondente no banco de dados
      const databaseId = CATEGORY_ID_MAPPING[categoryId as CategoryTabId] || categoryId;
      
      console.log(`Navegando para categoria: ${selectedCategory?.name}, ID: ${databaseId}`);
      
      // Adicionar um parâmetro para indicar que veio do TabNavigator
      navigation.push('CategoryProducts', { 
        category: { 
          id: databaseId, // Usar o ID mapeado em vez do ID do tab
          name: selectedCategory?.name || '',
          count: 0, // Valor padrão para count
          totalStock: 0, // Valor padrão para totalStock
          unit: 'itens' // Valor padrão para unidade
        },
        fromTabNavigator: true // Novo parâmetro para indicar a origem
      });
    } else {
      // Se for "Todos", voltar para a tela inicial
      navigation.navigate('Home');
    }
  };

  const getIconComponent = (iconName: string, categoryId: CategoryTabId, isActive: boolean) => {
    // Use a cor específica da categoria quando ativa, senão use cinza
    const color = isActive ? CATEGORY_COLORS[categoryId] : '#8E8E93';
    return <MaterialCommunityIcons name={iconName} size={scale(18)} color={color} />;
  };

  const renderTabItem = ({ item }: { item: typeof CATEGORY_TABS[0] }) => {
    const isActive = item.id === activeCategory;
    return (
      <TouchableOpacity 
        key={item.id}
        style={[styles.tabItem, isActive && styles.tabItemActive]}
        onPress={() => handleTabPress(item.id)}
        activeOpacity={0.7}
      >
        {getIconComponent(item.icon, item.id as CategoryTabId, isActive)}
        <Text 
          style={[styles.tabText, isActive && styles.tabTextActive]}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.tabContainer}>
      <FlatList
        data={CATEGORY_TABS}
        renderItem={renderTabItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        snapToAlignment="center"
        snapToInterval={Platform.OS === 'android' ? scale(70) : undefined}
        decelerationRate="fast"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    backgroundColor: '#1C1C1E',
    borderTopWidth: 1,
    borderTopColor: '#2C2C2E',
    paddingVertical: scale(6),
    width: '100%',
  },
  listContent: {
    paddingHorizontal: Platform.OS === 'android' ? scale(8) : scale(4),
    alignItems: 'center',
  },
  tabItem: {
    paddingHorizontal: scale(6),
    paddingVertical: scale(6),
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: scale(60),
    width: Platform.OS === 'android' ? scale(70) : scale(60),
    marginHorizontal: Platform.OS === 'android' ? scale(4) : scale(2),
    borderRadius: Platform.OS === 'android' ? scale(4) : 0,
    backgroundColor: Platform.OS === 'android' ? 'rgba(30, 30, 30, 0.6)' : 'transparent',
  },
  tabItemActive: {
    borderBottomWidth: 2,
    borderBottomColor: '#007AFF',
    ...(Platform.OS === 'android' && {
      backgroundColor: 'rgba(0, 122, 255, 0.1)',
    }),
  },
  tabText: {
    color: '#8E8E93',
    fontSize: scale(10),
    marginTop: scale(2),
    textAlign: 'center',
    width: Platform.OS === 'android' ? scale(65) : scale(60),
  },
  tabTextActive: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
});

export default CategoryTabs; 