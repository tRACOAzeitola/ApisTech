/**
 * Tipos relacionados a produtos
 */

// Unidades de medida para produtos
export type Unit = 'kg' | 'Unidades' | 'litros' | 'gramas';

// Definição completa de produto
export interface Product {
  id: string;
  name: string;
  description?: string;
  categoryId: string;
  quantity: number;
  unit: Unit;
  dateAdded: Date;
  dateModified: Date;
  
  // Campos opcionais
  notes?: string;
  stockAlert?: number;     // Quantidade mínima antes de alertar baixo estoque
  price?: number;          // Preço do produto
  location?: string;       // Localização do produto no armazém
  barcode?: string;        // Código de barras
  imageUrl?: string;       // URL da imagem principal
  images?: string[];       // URLs de imagens adicionais
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