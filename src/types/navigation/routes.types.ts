/**
 * Tipos relacionados à navegação e rotas
 */

import { ProductCategory } from '../models/category.types';
import { Product } from '../models/product.types';

// Definição de todas as rotas do aplicativo
export type RootStackParamList = {
  // Menu principal
  Main: undefined;
  
  // Telas principais
  Home: undefined;
  Dashboard: undefined;
  History: undefined;
  LowStock: undefined;
  
  // Telas de apiários
  Apiaries: undefined;
  AddApiary: undefined;
  ApiaryDetails: { apiaryId: string };
  EditApiary: { apiaryId: string };
  AddApiaryTask: { apiaryId: string };
  AddApiaryEquipment: { apiaryId: string };
  
  // Telas de produtos
  CategoryProducts: {
    category: ProductCategory;
    fromTabNavigator?: boolean;
  };
  
  // Telas de gestão
  AddProduct: {
    categoryId?: string;
    editMode?: boolean;
    product?: Product;
    categoryName?: string;
  };
  
  EditProduct: {
    product: Product;
    categoryName: string;
  };
  
  // Telas de transferência
  TransferProduct: {
    product: Product;
    returnToWarehouse?: boolean;
  };
  
  TransferEquipment: {
    apiaryId: string;
    apiaryName: string;
    productId: string;
    productName: string;
    isReturn: boolean;
    currentCount?: number;
  };
  
  // Outros
  MainTabs?: undefined;
}; 