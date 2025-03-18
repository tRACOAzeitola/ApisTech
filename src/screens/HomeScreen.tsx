import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  Platform, 
  StatusBar,
  Animated,
  Dimensions,
  Image,
  Modal,
  LayoutAnimation,
  UIManager,
  TextInput,
  ScrollView,
  SafeAreaView
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView as SafeAreaViewRN } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

import { useTheme } from '../context/ThemeContext';
import { CATEGORIES } from '../data/mockData';
import { ProductCategory, MenuOption, RootStackParamList } from '../types';
import CategoryCard from '../components/CategoryCard';
import SearchBar from '../components/SearchBar';
import Menu from '../components/Menu';
import ThemeToggle from '../components/ThemeToggle';
import CategoryTabs from '../components/CategoryTabs';
import { scale, scaleWidth, scaleHeight, screenWidth, isTablet, addDimensionsListener } from '../utils/responsive';
import ScreenLayout from '../components/ScreenLayout';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

// Habilitar LayoutAnimation para Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// Definir número de colunas com base no tamanho da tela
const numColumns = isTablet() ? 3 : 2;

// Adicionar objeto de cores para categorias
const CATEGORY_COLORS = {
  '1': '#FFD700', // Amarelo dourado para Mel
  '2': '#8B4513', // Marrom (castanho) para Material de Colmeia
  '3': '#FF4D4D', // Vermelho para Produtos Veterinários
  '4': '#9E9E9E', // Cinza para Embalamento
  '5': '#4DA6FF', // Azul para Material de Visita
  '6': '#00BFFF', // Azul claro para Equipamento de Melaria
  '7': '#808080', // Cinza escuro para Ferramentas Apícolas
  '8': '#FFA500'  // Laranja para Cera
};

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { colors, sizing, getShadow, isDark } = useTheme();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false);
  const [isThemeModalVisible, setIsThemeModalVisible] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [screenOrientation, setScreenOrientation] = useState<'portrait' | 'landscape'>(screenWidth > Dimensions.get('window').height ? 'landscape' : 'portrait');
  const scrollY = useRef(new Animated.Value(0)).current;
  const [isSearchVisible, setIsSearchVisible] = useState<boolean>(false);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  
  // Configurar a barra de status para o tema escuro
  useEffect(() => {
    StatusBar.setBarStyle('light-content');
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('#000000');
    }
  }, []);
  
  // Monitorar mudanças na orientação da tela
  useEffect(() => {
    const removeListener = addDimensionsListener(() => {
      const { width, height } = Dimensions.get('window');
      const newOrientation = width > height ? 'landscape' : 'portrait';
      
      if (newOrientation !== screenOrientation) {
        // Animar as mudanças de layout quando a orientação mudar
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setScreenOrientation(newOrientation);
      }
    });
    
    return removeListener;
  }, [screenOrientation]);
  
  const headerHeight = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [120, 70],
    extrapolate: 'clamp'
  });
  
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 60],
    outputRange: [1, 0],
    extrapolate: 'clamp'
  });

  const filteredCategories = CATEGORIES.filter(
    category => {
      // Filtrar por pesquisa de texto
      const matchesSearch = category.name.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Filtrar por categoria selecionada
      const matchesCategory = activeCategory === 'all' || category.id === activeCategory;
      
      return matchesSearch && matchesCategory;
    }
  );

  const handleCategoryPress = (category: ProductCategory) => {
    // Usar push() em vez de navigate() para criar uma nova entrada no histórico de navegação
    navigation.push('CategoryProducts', { category });
  };

  const handleMenuOptionSelect = (option: MenuOption) => {
    console.log('Menu option selected:', option.title);
    
    switch (option.screen) {
      case 'Home':
        navigation.navigate('Home');
        break;
      case 'Dashboard':
        navigation.navigate('Dashboard');
        break;
      case 'AddProduct':
        navigation.navigate('AddProduct', {});
        break;
      case 'History':
        navigation.navigate('History');
        break;
      case 'LowStock':
        navigation.navigate('LowStock');
        break;
      case 'MainTabs':
        navigation.navigate('Main');
        break;
      case 'CategoryProducts':
        // Essa navegação requer um parâmetro de categoria, que deve ser fornecido
        // Você precisará modificar MenuOption para incluir dados de categoria quando necessário
        console.warn('Navegação para CategoryProducts requer uma categoria');
        break;
      case 'ProductDetail':
        console.warn('Navegação para ProductDetail requer um ID de produto');
        break;
      case 'CategoryDetail':
        console.warn('Navegação para CategoryDetail requer um ID de categoria');
        break;
    }
  };

  const handleAddProductPress = () => {
    navigation.navigate('AddProduct', {});
  };
  
  const toggleThemeModal = () => {
    setIsThemeModalVisible(!isThemeModalVisible);
  };
  
  const onRefresh = () => {
    setRefreshing(true);
    // Simulate fetching data
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };
  
  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: false }
  );

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
  };

  // Resetar a categoria ativa para 'all' quando a tela receber foco
  useFocusEffect(
    React.useCallback(() => {
      // Resetar para 'all' (Todos) sempre que a tela receber foco
      setActiveCategory('all');
      
      return () => {
        // Cleanup se necessário
      };
    }, [])
  );

  return (
    <SafeAreaViewRN style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header with History, Dashboard and Search icons */}
      <View style={styles.headerContainer}>
        <TouchableOpacity 
          style={styles.iconButton} 
          onPress={() => navigation.navigate('Main')}
        >
          <Ionicons name="home" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Inventário</Text>
        
        <View style={styles.rightIcons}>
          <TouchableOpacity 
            style={styles.iconButton} 
            onPress={() => setIsSearchVisible(!isSearchVisible)}
          >
            <Ionicons name="search" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.iconButton} 
            onPress={() => navigation.navigate('Dashboard')}
          >
            <MaterialCommunityIcons name="menu" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Search input field that appears when search icon is clicked */}
      {isSearchVisible && (
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Pesquisar categorias..."
            placeholderTextColor="#8E8E93"
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoFocus
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity 
              style={styles.clearButton}
              onPress={() => setSearchQuery('')}
            >
              <FontAwesome5 name="times" size={16} color="#8E8E93" />
            </TouchableOpacity>
          )}
        </View>
      )}
      
      {/* Add Product Button below header */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('AddProduct', {})}
        >
          <Ionicons name="add-circle" size={24} color="#007AFF" style={styles.addButtonIcon} />
          <Text style={styles.addButtonText} numberOfLines={1} ellipsizeMode="tail">Adicionar Produto</Text>
        </TouchableOpacity>
      </View>

      {/* Categories Grid - 2x2 layout */}
      <FlatList
        data={filteredCategories}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.categoryCard}
            onPress={() => handleCategoryPress(item)}
          >
            <View style={styles.cardContent}>
              <View style={styles.iconContainer}>
                {item.id === '1' && <MaterialCommunityIcons name="water" size={28} color={CATEGORY_COLORS['1']} />}
                {item.id === '2' && <MaterialCommunityIcons name="beehive-outline" size={28} color={CATEGORY_COLORS['2']} />}
                {item.id === '3' && <MaterialCommunityIcons name="hospital-box" size={28} color={CATEGORY_COLORS['3']} />}
                {item.id === '4' && <MaterialCommunityIcons name="package-variant" size={28} color={CATEGORY_COLORS['4']} />}
                {item.id === '5' && <MaterialCommunityIcons name="bee" size={28} color={CATEGORY_COLORS['5']} />}
                {item.id === '6' && <MaterialCommunityIcons name="state-machine" size={28} color={CATEGORY_COLORS['6']} />}
                {item.id === '7' && <MaterialCommunityIcons name="hammer-wrench" size={28} color={CATEGORY_COLORS['7']} />}
                {item.id === '8' && <MaterialCommunityIcons name="hexagon-outline" size={28} color={CATEGORY_COLORS['8']} />}
                {/* Fallback icon for any other categories */}
                {!['1', '2', '3', '4', '5', '6', '7', '8'].includes(item.id) && 
                  <MaterialCommunityIcons name="cube-outline" size={28} color="#FFFFFF" />
                }
              </View>
              
              <View style={styles.categoryInfo}>
                <Text style={styles.categoryName} numberOfLines={1} ellipsizeMode="tail">{item.name}</Text>
                <Text style={styles.stockLabel}>Total Stock</Text>
                <Text style={styles.stockValue}>
                  {item.count} {item.count === 1 ? 'item' : 'itens'}
                </Text>
              </View>
              
              <View style={styles.productCountBadge}>
                <Text style={styles.productCount}>{item.count}</Text>
              </View>
              
              <Ionicons 
                name="chevron-forward" 
                size={16} 
                color="#8E8E93" 
                style={styles.chevronIcon} 
              />
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.categoriesContainer}
        showsVerticalScrollIndicator={false}
      />

      {/* Category Tab Navigation at bottom */}
      <CategoryTabs 
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />

      {/* Menu e Modal */}
      <Menu
        visible={isMenuVisible}
        onClose={() => setIsMenuVisible(false)}
        onSelectOption={handleMenuOptionSelect}
      />
      
      <Modal
        visible={isThemeModalVisible}
        transparent
        animationType="fade"
        onRequestClose={toggleThemeModal}
      >
        <TouchableOpacity 
          style={[styles.modalOverlay, { backgroundColor: isDark ? 'rgba(0,0,0,0.7)' : 'rgba(0,0,0,0.4)' }]} 
          activeOpacity={1} 
          onPress={toggleThemeModal}
        >
          <View 
            style={[
              styles.themeModalContainer, 
              { 
                backgroundColor: isDark ? '#151515' : '#FFFFFF',
                ...getShadow(5)
              }
            ]}
          >
            <View style={styles.themeModalHeader}>
              <Text style={[styles.themeModalTitle, { color: colors.text.primary }]}>Configurações de Tema</Text>
              <TouchableOpacity onPress={toggleThemeModal} style={styles.closeButton}>
                <FontAwesome5 name="times" size={16} color={colors.text.secondary} />
              </TouchableOpacity>
            </View>
            
            <ThemeToggle />
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaViewRN>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1C1C1E',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headerIcon: {
    width: 24,
    height: 24,
    tintColor: '#FFFFFF',
  },
  iconButton: {
    padding: 8,
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#1C1C1E',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    height: 48,
    position: 'relative',
    backgroundColor: '#1C1C1E',
    borderRadius: 10,
    maxWidth: '100%',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.5,
        paddingTop: 10,
        paddingBottom: 10,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  addButtonIcon: {
    marginRight: 8,
    flexShrink: 0,
    ...Platform.select({
      ios: {
        marginTop: 2, // Pequeno ajuste para alinhamento vertical no iOS
      },
    }),
  },
  addButtonText: {
    color: '#007AFF',
    fontSize: 18,
    fontWeight: '600',
    flexShrink: 1,
    ...Platform.select({
      ios: {
        fontSize: 17, // Ajustar tamanho da fonte para iOS
        fontWeight: '500',
      },
    }),
  },
  categoriesContainer: {
    padding: 8,
    paddingBottom: 80, // Espaço para o CategoryTabs na parte inferior
  },
  categoryCard: {
    flex: 1,
    margin: 8,
    backgroundColor: '#1C1C1E',
    borderRadius: 12,
    overflow: 'hidden',
    height: 160,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  cardContent: {
    padding: 16,
    height: '100%',
  },
  iconContainer: {
    marginBottom: 12,
  },
  categoryIcon: {
    width: 28,
    height: 28,
  },
  categoryInfo: {
    marginBottom: 8,
    flex: 1,
  },
  categoryName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  stockLabel: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 2,
  },
  stockValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  productCountBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: '#2C2C2E',
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  productCount: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  chevronIcon: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    width: 16,
    height: 16,
    tintColor: '#8E8E93',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  themeModalContainer: {
    width: '80%',
    maxWidth: scale(350),
    borderRadius: scale(16),
    overflow: 'hidden',
  },
  themeModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(16),
    paddingVertical: scale(14),
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  themeModalTitle: {
    fontSize: scale(18),
    fontWeight: '600',
  },
  closeButton: {
    padding: scale(8),
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1C1C1E',
    borderRadius: 10,
    margin: 16,
    marginTop: 0,
    paddingHorizontal: 12,
    height: 40,
  },
  searchInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
    paddingVertical: 8,
  },
  clearButton: {
    padding: 8,
  },
});

export default HomeScreen;
