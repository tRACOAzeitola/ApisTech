import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  FlatList,
  TouchableOpacity,
  Alert,
  TouchableHighlight,
  Platform,
  Image
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ScreenLayout from '../components/ScreenLayout';
import { scale } from '../utils/responsive';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTheme } from '../context/ThemeContext';
import { ProductCategory, RootStackParamList } from '../types';
import { Product } from '../types/models/product.types';
import ProductCard from '../components/ProductCard';
import CategoryTabs from '../components/CategoryTabs';

// Mock data para produtos (no futuro, viria do Firebase)
const MOCK_PRODUCTS: { [key: string]: Product[] } = {
  '1': [ // Mel
    {
      id: '101',
      name: 'Mediterrâneo',
      categoryId: '1',
      quantity: 1010,
      unit: 'kg',
      dateAdded: new Date('2023-01-15'),
      dateModified: new Date('2023-01-15'),
      location: 'Armazém'
    },
    {
      id: '102',
      name: 'Bosque',
      categoryId: '1',
      quantity: 990,
      unit: 'kg',
      dateAdded: new Date('2023-01-18'),
      dateModified: new Date('2023-01-18'),
      location: 'Armazém'
    }
  ],
  '2': [ // Material de Colmeia
    {
      id: '201',
      name: 'Quadros',
      categoryId: '2',
      quantity: 55,
      unit: 'Unidades',
      dateAdded: new Date('2023-02-01'),
      dateModified: new Date('2023-02-01'),
      location: 'Prateleira A'
    }
  ]
};

// Tipagem para as props da rota
// Definindo localmente o tipo da rota para incluir fromTabNavigator
type CategoryProductsParams = {
  category: ProductCategory;
  fromTabNavigator?: boolean;
};

type CategoryProductsRouteProp = RouteProp<
  { CategoryProducts: CategoryProductsParams },
  'CategoryProducts'
>;

type CategoryProductsNavigationProp = NativeStackNavigationProp<RootStackParamList, 'CategoryProducts'>;

interface CategoryProductsScreenProps {
  route: CategoryProductsRouteProp;
  navigation: CategoryProductsNavigationProp;
}

const CategoryProductsScreen: React.FC<CategoryProductsScreenProps> = ({ route, navigation }) => {
  // Obter a categoria dos parâmetros da rota, com fallback para valores padrão
  const { category = { id: '0', name: 'Categoria', count: 0, totalStock: 0, unit: 'itens' } } = route.params || {};
  
  // Certificar que temos um objeto completo de categoria mesmo se alguns campos estiverem faltando
  const safeCategory = {
    id: category.id || '0',
    name: category.name || 'Categoria',
    count: category.count || 0,
    totalStock: category.totalStock || 0,
    unit: category.unit || 'itens'
  };

  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  // Estado para armazenar os produtos da categoria
  const [products, setProducts] = useState<Product[]>([]);
  
  // Efeito para carregar os produtos da categoria selecionada
  useEffect(() => {
    // No futuro, buscar do Firebase
    const categoryProducts = MOCK_PRODUCTS[safeCategory.id] || [];
    setProducts(categoryProducts);
  }, [safeCategory.id]);

  // Lidar com o pressionar de um produto
  const handleProductPress = (product: Product) => {
    // No futuro, navegue para a tela de detalhes do produto
    Alert.alert('Produto selecionado', `Você selecionou ${product.name}`);
  };

  // Lidar com a adição de um novo produto
  const handleAddProduct = () => {
    navigation.navigate('AddProduct', { categoryId: safeCategory.id });
  };

  // Voltar para a tela anterior
  const handleGoBack = () => {
    // Verificar se a navegação veio do TabNavigator
    const { fromTabNavigator } = route.params || {};
    
    if (fromTabNavigator) {
      // Se veio do TabNavigator, voltar para a tela inicial
      navigation.navigate('Home');
    } else {
      // Caso contrário, comportamento normal de voltar
      navigation.goBack();
    }
  };

  const handleDeleteProduct = (productId: string) => {
    Alert.alert(
      'Apagar Produto',
      'Tem certeza que deseja apagar este produto?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Apagar',
          style: 'destructive',
          onPress: () => {
            setProducts(products.filter(product => product.id !== productId));
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handleEditProduct = (product: any) => {
    Alert.alert(
      'Editar Produto',
      'Escolha uma ação',
      [
        {
          text: 'Adicionar Stock',
          onPress: () => {
            // Usar push em vez de navigate
            navigation.push('AddProduct' as any, {
              editMode: true,
              product: product,
              categoryName: safeCategory.name,
            });
          },
        },
        {
          text: 'Editar Detalhes',
          onPress: () => {
            // Usar push em vez de navigate
            navigation.push('EditProduct' as any, {
              product: product,
              categoryName: safeCategory.name,
            });
          },
        },
        {
          text: 'Cancelar',
          style: 'cancel',
        },
      ],
      { cancelable: true }
    );
  };

  const renderProductItem = ({ item }: any) => (
    <TouchableOpacity
      onPress={() => handleEditProduct(item)}
      onLongPress={() => handleDeleteProduct(item.id)}
      delayLongPress={500}
      activeOpacity={0.7}
      style={styles.productItemContainer}
    >
      <View style={styles.productItem}>
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.productQuantity}>
            {item.quantity} {item.unit}
          </Text>
          <Text style={styles.lastUpdated}>
            Última atualização: {item.dateModified.toLocaleDateString()}
          </Text>
        </View>
        
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => handleEditProduct(item)}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <MaterialCommunityIcons 
              name={Platform.OS === 'ios' ? 'square-edit-outline' : 'pencil'} 
              size={22} 
              color="#007AFF" 
            />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, styles.deleteButton]}
            onPress={() => handleDeleteProduct(item.id)}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <MaterialCommunityIcons 
              name={Platform.OS === 'ios' ? 'trash-can-outline' : 'delete'} 
              size={22} 
              color="#FF3B30" 
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  // Estado para a categoria ativa no CategoryTabs
  const [activeCategory, setActiveCategory] = useState<string>(() => {
    // Mapear do ID do banco de dados (numérico) para o ID de categoria usado no CategoryTabs
    const categoryIdMapping: Record<string, string> = {
      '1': 'mel',
      '2': 'colmeia',
      '3': 'veterinario',
      '4': 'embalamento',
      '5': 'visita',
      '6': 'melaria',
      '7': 'ferramentas',
      '8': 'cera'
    };
    
    return categoryIdMapping[safeCategory.id] || 'all';
  });

  // Manipular mudança de categoria no CategoryTabs
  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
  };

  return (
    <View style={styles.containerFull}>
      <ScreenLayout 
        title={safeCategory.name} 
        showBackButton={true}
        showHomeButton={true}
        onBackPress={handleGoBack}
      >
        <View style={styles.container}>
          <FlatList
            data={products}
            keyExtractor={(item) => item.id}
            renderItem={renderProductItem}
            contentContainerStyle={styles.productsList}
            ListHeaderComponent={
              <View style={styles.header}>
                <View style={styles.headerTextContainer}>
                  <Text style={styles.headerText}>
                    {safeCategory.name}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={handleAddProduct}
                >
                  <MaterialCommunityIcons name="plus" size={24} color="#FFFFFF" />
                  <Text style={styles.addButtonText}>Novo</Text>
                </TouchableOpacity>
              </View>
            }
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <MaterialCommunityIcons name="package-variant" size={64} color="#555" />
                <Text style={styles.emptyText}>Nenhum produto encontrado</Text>
                <TouchableOpacity
                  style={styles.emptyAddButton}
                  onPress={handleAddProduct}
                >
                  <Text style={styles.emptyAddButtonText}>Adicionar Produto</Text>
                </TouchableOpacity>
              </View>
            }
          />
        </View>
      </ScreenLayout>
      
      {/* CategoryTabs na parte inferior */}
      <CategoryTabs 
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containerFull: {
    flex: 1,
    backgroundColor: '#000000',
  },
  container: {
    flex: 1,
    paddingHorizontal: scale(16),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: scale(12),
    marginBottom: scale(8),
  },
  headerTextContainer: {
    flex: 1,
    marginRight: scale(12),
  },
  headerText: {
    fontSize: scale(18),
    fontWeight: '600',
    color: '#FFFFFF',
    flexShrink: 1,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    paddingHorizontal: scale(12),
    paddingVertical: scale(8),
    borderRadius: Platform.OS === 'ios' ? scale(8) : scale(4),
    minWidth: scale(80),
    justifyContent: 'center',
    flexShrink: 0,
  },
  addButtonText: {
    color: '#FFFFFF',
    marginLeft: scale(4),
    fontWeight: '500',
    fontSize: Platform.OS === 'ios' ? scale(15) : scale(14),
  },
  productsList: {
    padding: scale(16),
  },
  productItemContainer: {
    backgroundColor: Platform.OS === 'ios' ? '#1A1A1A' : '#1E1E1E',
    borderRadius: scale(10),
    marginBottom: scale(12),
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  productItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: scale(16),
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: Platform.OS === 'ios' ? scale(17) : scale(16),
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: scale(4),
  },
  productQuantity: {
    fontSize: scale(14),
    color: '#CCCCCC',
    marginBottom: scale(4),
  },
  lastUpdated: {
    fontSize: scale(12),
    color: '#999999',
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    padding: scale(8),
    marginLeft: scale(8),
    ...Platform.select({
      ios: {
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: scale(6),
      },
    }),
  },
  deleteButton: {
    marginLeft: scale(16),
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: '#FFFFFF',
    marginBottom: scale(16),
  },
  emptyAddButton: {
    backgroundColor: '#007AFF',
    padding: scale(12),
    borderRadius: scale(8),
  },
  emptyAddButtonText: {
    color: '#FFFFFF',
    fontWeight: '500',
    fontSize: Platform.OS === 'ios' ? scale(15) : scale(14),
  },
});

export default CategoryProductsScreen;
