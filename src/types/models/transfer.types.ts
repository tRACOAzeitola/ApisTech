// Novo arquivo para armazenar o modelo de transferência

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