import { ProductCategory, Product, MenuOption } from '../types';

export const CATEGORIES: ProductCategory[] = [
  {
    id: '1',
    name: 'Mel',
    icon: 'water',
    iconFamily: 'MaterialCommunityIcons',
    totalStock: 2015,
    unit: 'kg',
    color: '#F1C232',
    count: 0
  },
  {
    id: '2',
    name: 'Material de Colmeia',
    icon: 'cube',
    iconFamily: 'FontAwesome',
    totalStock: 1509,
    unit: 'Unidades',
    color: '#8C8C8C',
    count: 6
  },
  {
    id: '3',
    name: 'Produtos Veterinários',
    icon: 'medical-bag',
    iconFamily: 'MaterialCommunityIcons',
    totalStock: 1,
    unit: 'Unidades',
    color: '#FF5252',
    count: 1
  },
  {
    id: '4',
    name: 'Embalamento',
    icon: 'package',
    iconFamily: 'FontAwesome',
    totalStock: 695,
    unit: 'Unidades',
    color: '#8C8C8C',
    count: 6
  },
  {
    id: '5',
    name: 'Material de Visita',
    icon: 'toilet',
    iconFamily: 'FontAwesome',
    totalStock: 5,
    unit: 'Unidades',
    color: '#9B59B6',
    count: 5
  },
  {
    id: '6',
    name: 'Equipamento de Melaria',
    icon: 'cogs',
    iconFamily: 'FontAwesome',
    totalStock: 4,
    unit: 'Unidades',
    color: '#3498DB',
    count: 4
  },
  {
    id: '7',
    name: 'Ferramentas Apícolas',
    icon: 'tools',
    iconFamily: 'FontAwesome',
    totalStock: 4,
    unit: 'Unidades',
    color: '#A0522D',
    count: 4
  },
  {
    id: '8',
    name: 'Cera',
    icon: 'hexagon',
    iconFamily: 'MaterialCommunityIcons',
    totalStock: 2,
    unit: 'Unidades',
    color: '#F1C232',
    count: 2
  },
];

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Mel de Flor de Laranjeira',
    categoryId: '1',
    quantity: 500,
    unit: 'kg',
    dateAdded: new Date('2024-01-15'),
    dateModified: new Date('2024-01-15'),
  },
  {
    id: '2',
    name: 'Mel Multifloral',
    categoryId: '1',
    quantity: 1515,
    unit: 'kg',
    dateAdded: new Date('2024-01-10'),
    dateModified: new Date('2024-02-20'),
  },
  {
    id: '3',
    name: 'Quadro de Ninho',
    categoryId: '2',
    quantity: 500,
    unit: 'Unidades',
    dateAdded: new Date('2024-01-05'),
    dateModified: new Date('2024-01-05'),
  },
  {
    id: '4',
    name: 'Colmeia Completa',
    categoryId: '2',
    quantity: 9,
    unit: 'Unidades',
    dateAdded: new Date('2024-01-15'),
    dateModified: new Date('2024-01-15'),
  },
  // Adicione mais produtos conforme necessário
];

export const MENU_OPTIONS: MenuOption[] = [
  {
    id: '1',
    name: 'Adicionar Produto',
    icon: 'plus',
    screen: 'AddProduct',
  },
  {
    id: '2',
    name: 'Dashboard',
    icon: 'chart-line',
    screen: 'Dashboard',
  },
  {
    id: '3',
    name: 'Histórico',
    icon: 'history',
    screen: 'History',
  },
  {
    id: '4',
    name: 'Baixo Stock',
    icon: 'alert-triangle',
    screen: 'LowStock',
  },
];
