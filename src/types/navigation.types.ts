/**
 * Tipos relacionados à navegação
 */

import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { ProductCategory } from './models/category.types';

export type MenuOption = {
  id: string;
  title: string;
  icon: string;
  screen: keyof RootStackParamList;
};

// Interface para Apiário
export interface Apiary {
  id: string;
  name: string;
  location: string;
  coordinates?: string;
  hiveCount: number;
  createdAt: Date;
  lastVisit?: Date;
  notes?: string;
  floraTypes?: string[];
  estimatedProduction?: number;
  owner?: string;
  contact?: string;
  imageUrl?: string;
}

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

  // Novas rotas para apiários
  AddApiary: undefined;
  ApiaryDetails: { apiaryId: string };
  EditApiary: { apiaryId: string };
  AddApiaryTask: { apiaryId: string };
  AddApiaryEquipment: { apiaryId: string };
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
