/**
 * Tipos relacionados à navegação
 */

import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { ProductCategory } from './product.types';

export type MenuOption = {
  id: string;
  name: string;
  icon: string;
  screen: keyof RootStackParamList;
};

// Define os parâmetros de cada rota
export type RootStackParamList = {
  Main: undefined;
  Home: undefined;
  Apiaries: undefined;
  AddProduct: { categoryId?: string } | undefined;
  Dashboard: undefined;
  History: undefined;
  LowStock: undefined;
  ProductDetail: { productId: string };
  CategoryDetail: { categoryId: string };
  CategoryProducts: { category: ProductCategory };
  MainTabs: undefined;
};

// Define os parâmetros para as tabs
export type TabParamList = {
  Home: undefined;
  Dashboard: undefined;
  AddProduct: undefined;
  History: undefined;
  LowStock: undefined;
};

// Tipo para propriedades de navegação
export type NavigationProps<T extends keyof RootStackParamList> = {
  navigation: StackNavigationProp<RootStackParamList, T>;
  route: RouteProp<RootStackParamList, T>;
};
