import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

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

  const getIconComponent = (iconName: string, isActive: boolean) => {
    const color = isActive ? '#FFFFFF' : '#8E8E93';
    return <MaterialCommunityIcons name={iconName} size={20} color={color} />;
  };

  return (
    <View style={styles.tabContainer}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {CATEGORY_TABS.map((category) => {
          const isActive = category.id === activeCategory;
          return (
            <TouchableOpacity 
              key={category.id}
              style={[styles.tabItem, isActive && styles.tabItemActive]}
              onPress={() => handleTabPress(category.id)}
            >
              {getIconComponent(category.icon, isActive)}
              <Text 
                style={[styles.tabText, isActive && styles.tabTextActive]}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    backgroundColor: '#1C1C1E',
    borderTopWidth: 1,
    borderTopColor: '#2C2C2E',
    paddingVertical: 6,
  },
  tabItem: {
    paddingHorizontal: 6,
    paddingVertical: 6,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 60,
    marginHorizontal: 1,
  },
  tabItemActive: {
    borderBottomWidth: 2,
    borderBottomColor: '#007AFF',
  },
  tabText: {
    color: '#8E8E93',
    fontSize: 10,
    marginTop: 2,
    textAlign: 'center',
    width: 60,
  },
  tabTextActive: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
});

export default CategoryTabs; 