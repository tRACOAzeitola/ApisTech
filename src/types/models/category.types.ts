/**
 * Tipos relacionados a categorias de produtos
 */

import { Unit } from './product.types';

// Famílias de ícones disponíveis
export type IconFamily = 'MaterialCommunityIcons' | 'FontAwesome' | 'FontAwesome5' | 'Ionicons';

// Definição completa de categoria
export interface ProductCategory {
  id: string;
  name: string;
  
  // Metadados de exibição
  icon: string;
  iconFamily: IconFamily;
  color: string;
  
  // Estatísticas
  count?: number;           // Contagem de produtos nesta categoria
  totalStock?: number;      // Quantidade total de produtos nesta categoria
  unit?: Unit;              // Unidade padrão para produtos desta categoria
} 