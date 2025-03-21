import AsyncStorage from '@react-native-async-storage/async-storage';
import { Product } from '../types';

// Chaves para armazenamento
const STORAGE_KEYS = {
  PRODUCTS: 'inventory_products',
};

/**
 * Salva a lista de produtos no AsyncStorage
 */
export const saveProducts = async (products: Product[]): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(products);
    await AsyncStorage.setItem(STORAGE_KEYS.PRODUCTS, jsonValue);
  } catch (error) {
    console.error('Erro ao salvar produtos:', error);
    throw error;
  }
};

/**
 * Recupera a lista de produtos do AsyncStorage
 */
export const getProducts = async (): Promise<Product[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEYS.PRODUCTS);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (error) {
    console.error('Erro ao recuperar produtos:', error);
    return [];
  }
};

/**
 * Adiciona um novo produto ou atualiza um existente
 */
export const saveProduct = async (product: Product): Promise<void> => {
  try {
    const products = await getProducts();
    
    // Verifica se o produto já existe
    const index = products.findIndex(p => p.id === product.id);
    
    if (index >= 0) {
      // Atualizar produto existente
      products[index] = { ...products[index], ...product };
    } else {
      // Adicionar novo produto
      products.push(product);
    }
    
    await saveProducts(products);
  } catch (error) {
    console.error('Erro ao salvar produto:', error);
    throw error;
  }
};

/**
 * Remove um produto pelo ID
 */
export const deleteProduct = async (productId: string): Promise<void> => {
  try {
    const products = await getProducts();
    const updatedProducts = products.filter(product => product.id !== productId);
    await saveProducts(updatedProducts);
  } catch (error) {
    console.error('Erro ao excluir produto:', error);
    throw error;
  }
};

/**
 * Limpa todos os produtos
 */
export const clearProducts = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEYS.PRODUCTS);
  } catch (error) {
    console.error('Erro ao limpar produtos:', error);
    throw error;
  }
}; 