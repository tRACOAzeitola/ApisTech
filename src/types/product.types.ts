/**
 * Tipos relacionados aos produtos e categorias
 */

export type Unit = 'kg' | 'Unidades';

export type IconFamily = 'MaterialCommunityIcons' | 'FontAwesome' | 'Ionicons';

export type ProductCategory = {
  id: string;
  name: string;
  icon: string;
  iconFamily: IconFamily;
  totalStock: number;
  unit: Unit;
  color: string;
  count?: number;
};

export type Product = {
  id: string;
  name: string;
  categoryId: string;
  quantity: number;
  unit: Unit;
  dateAdded: Date;
  dateModified: Date;
  notes?: string;
  stockAlert?: number; // Quantidade mínima antes de alertar baixo estoque
  price?: number; // Preço do produto (opcional)
  location?: string; // Localização do produto no armazém (opcional)
  barcode?: string; // Código de barras (opcional)
  images?: string[]; // URLs das imagens do produto (opcional)
};

export type StockMovement = {
  id: string;
  productId: string;
  previousQuantity: number;
  newQuantity: number;
  changeAmount: number; // Positivo para adição, negativo para remoção
  movementType: 'add' | 'remove' | 'adjust';
  movementReason?: string;
  dateTime: Date;
  userId: string;
};
