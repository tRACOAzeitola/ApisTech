/**
 * Tipos relacionados a elementos da interface do usuário
 */

// Opções do menu
export interface MenuOption {
  id: string;
  title: string;
  icon: string;
  screen?: string;
  action?: string;
  params?: any;
} 