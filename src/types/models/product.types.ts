/**
 * Tipos relacionados a produtos
 */

// Unidades de medida para produtos
export type Unit = 'kg' | 'Unidades' | 'litros' | 'gramas';

// Definição completa de produto
export interface Product {
  id: string;           // Pode ser 'COL-COL' ou 'COL-ALC' para os produtos específicos
  name: string;
  description?: string;
  categoryId: string;
  quantity: number;
  unit: string;
  dateAdded: Date;
  dateModified: Date;
  
  // Campos opcionais
  notes?: string;
  stockAlert?: number;     // Quantidade mínima antes de alertar baixo estoque
  price?: number;          // Preço do produto
  location?: string;    // 'Armazém' ou ID do apiário
  barcode?: string;        // Código de barras
  imageUrl?: string;       // URL da imagem principal
  images?: string[];       // URLs de imagens adicionais
  locationHistory?: LocationHistory[];
  skuPrefix?: string;   // 'COL-COL' ou 'COL-ALC'
}

export interface LocationHistory {
  id: string;
  fromLocation: string; // "Armazém" ou ID do apiário de origem
  toLocation: string;   // "Armazém" ou ID do apiário de destino
  quantity: number;
  date: Date;
  notes?: string;
  userId?: string;      // Usuário que realizou a transferência
}

// Movimento de estoque (entrada/saída/ajuste)
export interface StockMovement {
  id: string;
  productId: string;
  previousQuantity: number;
  newQuantity: number;
  changeAmount: number;    // Positivo para adição, negativo para remoção
  movementType: 'add' | 'remove' | 'adjust';
  movementReason?: string;
  dateTime: Date;
  userId: string;
}

// Histórico de transferências para rastreamento
export interface TransferHistory {
  id: string;
  productId: string;    // 'COL-COL' ou 'COL-ALC'
  productName: string;  // 'Colmeias' ou 'Alças'
  quantity: number;
  fromLocation: string; // 'Armazém' ou nome do apiário
  toLocation: string;   // 'Armazém' ou nome do apiário
  date: Date;
  notes?: string;
  userId?: string;      // Opcional: usuário que realizou a transferência
} 