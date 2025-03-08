/**
 * Tipos relacionados à navegação e rotas
 */

import { ProductCategory } from '../models/category.types';
import { Product } from '../models/product.types';

// Definição de todas as rotas do aplicativo
export type RootStackParamList = {
  // Telas principais
  Home: undefined;
  Dashboard: undefined;
  History: undefined;
  LowStock: undefined;
  
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
  
  // Outros
  MainTabs?: undefined;
}; 