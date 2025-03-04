/**
 * Tipos relacionados à navegação
 */

import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

export type MenuOption = {
  id: string;
  name: string;
  icon: string;
  screen: string;
};

// Define os parâmetros de cada rota
export type RootStackParamList = {
  Home: undefined;
  AddProduct: { categoryId?: string } | undefined;
  Dashboard: undefined;
  History: undefined;
  LowStock: undefined;
  ProductDetail: { productId: string };
  CategoryDetail: { categoryId: string };
};

// Tipo para propriedades de navegação
export type NavigationProps<T extends keyof RootStackParamList> = {
  navigation: StackNavigationProp<RootStackParamList, T>;
  route: RouteProp<RootStackParamList, T>;
};
