import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  Platform, 
  StatusBar 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useTheme } from '../context/ThemeContext';
import { CATEGORIES } from '../data/mockData';
import { ProductCategory, MenuOption } from '../types';
import { RootStackParamList } from '../navigation/AppNavigator';
import CategoryCard from '../components/CategoryCard';
import SearchBar from '../components/SearchBar';
import Menu from '../components/Menu';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { colors, sizing, getShadow } = useTheme();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false);

  const filteredCategories = CATEGORIES.filter(
    category => category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCategoryPress = (category: ProductCategory) => {
    console.log('Category pressed:', category.name);
    // No futuro, podemos navegar para uma tela de detalhes da categoria
  };

  const handleMenuOptionSelect = (option: MenuOption) => {
    console.log('Menu option selected:', option.name);
    if (option.screen) {
      navigation.navigate(option.screen as keyof RootStackParamList);
    }
  };

  const handleAddProductPress = () => {
    navigation.navigate('AddProduct');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <StatusBar 
        barStyle={Platform.OS === 'ios' ? 'light-content' : 'light-content'}
        backgroundColor={colors.background}
      />
      
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text.primary, fontSize: sizing.typography.h2 }]}>
          Categorias
        </Text>
        <View style={styles.headerActions}>
          <TouchableOpacity 
            style={[styles.addButton, { backgroundColor: colors.primary }]}
            onPress={handleAddProductPress}
            activeOpacity={0.7}
          >
            {Platform.OS === 'ios' ? (
              <Ionicons name="add" size={24} color="#FFFFFF" />
            ) : (
              <MaterialCommunityIcons name="plus" size={24} color="#FFFFFF" />
            )}
          </TouchableOpacity>
        </View>
      </View>

      <SearchBar
        placeholder="Procurar categoria..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        onClear={() => setSearchQuery('')}
      />

      <FlatList
        data={filteredCategories}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CategoryCard 
            category={item} 
            onPress={handleCategoryPress} 
          />
        )}
        contentContainerStyle={[styles.listContent, { paddingHorizontal: sizing.spacing.md }]}
        showsVerticalScrollIndicator={false}
      />

      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: colors.text.secondary }]}>
          Gestão Profissional de Inventário para Apicultores
        </Text>
      </View>

      <Menu
        visible={isMenuVisible}
        onClose={() => setIsMenuVisible(false)}
        onSelectOption={handleMenuOptionSelect}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  title: {
    fontWeight: Platform.OS === 'ios' ? '600' : 'bold',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
      },
      android: {
        elevation: 4,
      }
    })
  },
  listContent: {
    paddingBottom: 16,
  },
  footer: {
    padding: 16,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
  },
});

export default HomeScreen;
