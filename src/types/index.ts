/**
 * Arquivo índice que exporta todos os tipos do aplicativo
 * Permite importar de 'src/types' em vez de caminhos específicos
 */

// Re-exportar tipos de produtos
export * from './models/product.types';

// Re-exportar tipos de categorias
export * from './models/category.types';

// Re-exportar tipos de navegação
export * from './navigation/routes.types';

// Re-exportar tipos de UI
export * from './models/ui.types';

export type RootStackParamList = {
  Main: undefined;
  Home: undefined;
  Apiaries: undefined;
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
  AddApiary: undefined;
  ApiaryDetails: { apiaryId: string };
  
  // Nova rota para transferência
  TransferProduct: {
    product: Product;
    returnToWarehouse?: boolean;
  };
  
  // Nova rota para transferência específica de equipamentos
  TransferEquipment: {
    apiaryId: string;
    apiaryName: string;
    productId: string;     // 'COL-COL' ou 'COL-ALC'
    productName: string;   // 'Colmeias' ou 'Alças'
    isReturn: boolean;     // true para devolver ao armazém, false para adicionar ao apiário
    currentCount?: number; // quantidade atual no apiário
  };
};
