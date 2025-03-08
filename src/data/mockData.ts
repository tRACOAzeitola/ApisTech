import { ProductCategory, Product, MenuOption } from '../types';

export const CATEGORIES: ProductCategory[] = [
  {
    id: '1',
    name: 'Mel',
    icon: 'tint',
    iconFamily: 'FontAwesome5',
    totalStock: 2000,
    unit: 'kg',
    color: '#C8FF00', // Amarelo-verde como na imagem
    count: 2
  },
  {
    id: '2',
    name: 'Material de Colmeia',
    icon: 'home',
    iconFamily: 'FontAwesome5',
    totalStock: 3317,
    unit: 'Unidades',
    color: '#3F9FFF', // Azul como na imagem
    count: 7
  },
  {
    id: '3',
    name: 'Produtos Veterinários',
    icon: 'medkit',
    iconFamily: 'FontAwesome5',
    totalStock: 60,
    unit: 'Unidades',
    color: '#FF4257', // Vermelho como na imagem
    count: 1
  },
  {
    id: '4',
    name: 'Embalamento',
    icon: 'box',
    iconFamily: 'FontAwesome5',
    totalStock: 405,
    unit: 'Unidades',
    color: '#9CA3AF', // Cinza como na imagem
    count: 3
  },
  {
    id: '5',
    name: 'Material de Visita',
    icon: 'toolbox',
    iconFamily: 'FontAwesome5',
    totalStock: 12,
    unit: 'Unidades',
    color: '#3B82F6', // Azul como na imagem 
    count: 3
  },
  {
    id: '6',
    name: 'Equipamento de Melaria',
    icon: 'cog',
    iconFamily: 'FontAwesome5',
    totalStock: 2,
    unit: 'Unidades',
    color: '#38BDF8', // Azul claro como na imagem
    count: 2
  },
  {
    id: '7',
    name: 'Ferramentas Apícolas',
    icon: 'tools',
    iconFamily: 'FontAwesome5',
    totalStock: 4,
    unit: 'Unidades',
    color: '#A78BFA', // Roxo 
    count: 4
  },
  {
    id: '8',
    name: 'Cera',
    icon: 'certificate',
    iconFamily: 'FontAwesome5',
    totalStock: 2,
    unit: 'Unidades',
    color: '#FB923C', // Laranja
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

// MENU_OPTIONS foi movido para /src/constants/menu.ts
