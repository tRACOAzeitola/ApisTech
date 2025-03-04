import { ProductCategory } from '../types';

/**
 * Categorias de produtos para o sistema de inventário de apicultura
 */
export const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    id: '1',
    name: 'Mel',
    icon: 'honey-pot',
    iconFamily: 'MaterialCommunityIcons',
    totalStock: 0,
    unit: 'kg',
    color: '#FFC107',
  },
  {
    id: '2',
    name: 'Material de Colmeia',
    icon: 'archive',
    iconFamily: 'MaterialCommunityIcons',
    totalStock: 0,
    unit: 'Unidades',
    color: '#795548',
  },
  {
    id: '3',
    name: 'Produtos Veterinários',
    icon: 'pill',
    iconFamily: 'MaterialCommunityIcons',
    totalStock: 0,
    unit: 'Unidades',
    color: '#2196F3',
  },
  {
    id: '4',
    name: 'Embalamento',
    icon: 'package-variant-closed',
    iconFamily: 'MaterialCommunityIcons',
    totalStock: 0,
    unit: 'Unidades',
    color: '#607D8B',
  },
  {
    id: '5',
    name: 'Material de Visita',
    icon: 'toolbox',
    iconFamily: 'MaterialCommunityIcons',
    totalStock: 0,
    unit: 'Unidades',
    color: '#FF5722',
  },
  {
    id: '6',
    name: 'Equipamento de Melaria',
    icon: 'factory',
    iconFamily: 'MaterialCommunityIcons',
    totalStock: 0,
    unit: 'Unidades',
    color: '#9C27B0',
  },
  {
    id: '7',
    name: 'Ferramentas Apícolas',
    icon: 'tools',
    iconFamily: 'MaterialCommunityIcons',
    totalStock: 0,
    unit: 'Unidades',
    color: '#4CAF50',
  },
  {
    id: '8',
    name: 'Cera',
    icon: 'beehive-outline',
    iconFamily: 'MaterialCommunityIcons',
    totalStock: 0,
    unit: 'kg',
    color: '#FFEB3B',
  },
];

/**
 * Obter uma categoria pelo seu ID
 */
export const getCategoryById = (id: string): ProductCategory | undefined => {
  return PRODUCT_CATEGORIES.find(category => category.id === id);
};

/**
 * Obter todas as categorias com unidades em kg
 */
export const getKgCategories = (): ProductCategory[] => {
  return PRODUCT_CATEGORIES.filter(category => category.unit === 'kg');
};

/**
 * Obter todas as categorias com unidades em unidades
 */
export const getUnitCategories = (): ProductCategory[] => {
  return PRODUCT_CATEGORIES.filter(category => category.unit === 'Unidades');
};
