import { MenuOption } from '../types';

/**
 * Opções do menu principal da aplicação
 */
export const MENU_OPTIONS: MenuOption[] = [
  {
    id: 'add_product',
    name: 'Adicionar Produto',
    icon: 'plus-circle',
    screen: 'AddProduct',
  },
  {
    id: 'dashboard',
    name: 'Dashboard',
    icon: 'chart-bar',
    screen: 'Dashboard',
  },
  {
    id: 'history',
    name: 'Histórico',
    icon: 'history',
    screen: 'History',
  },
  {
    id: 'low_stock',
    name: 'Baixo Stock',
    icon: 'alert-circle',
    screen: 'LowStock',
  },
];
