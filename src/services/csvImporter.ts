import { Product, Unit } from '../types';
import * as RNFS from 'react-native-fs';
import { saveProducts, getProducts } from './storage';

/**
 * Converte string de unidade para o tipo Unit
 */
const parseUnit = (unitStr: string): Unit => {
  if (unitStr.toLowerCase().includes('kg')) return 'kg';
  if (unitStr.toLowerCase().includes('unidades') || unitStr.toLowerCase().includes('unidade')) return 'Unidades';
  if (unitStr.toLowerCase().includes('litros') || unitStr.toLowerCase().includes('litro')) return 'litros';
  if (unitStr.toLowerCase().includes('gramas') || unitStr.toLowerCase().includes('grama')) return 'gramas';
  if (unitStr.toLowerCase().includes('pares') || unitStr.toLowerCase().includes('par')) return 'Unidades'; // Convertemos pares para unidades
  
  return 'Unidades'; // Valor padrão
};

/**
 * Parseia uma linha do CSV para o formato de produto
 */
const parseCSVLine = (line: string, headers: string[]): Product | null => {
  try {
    // Dividir a linha por vírgulas, considerando possíveis valores entre aspas
    const values = line.match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g) || [];
    
    // Remover aspas extras se existirem
    const cleanValues = values.map(val => val.replace(/^"|"$/g, '').trim());
    
    // Se o número de valores não corresponder ao número de cabeçalhos, a linha é inválida
    if (cleanValues.length !== headers.length) {
      console.log(`Linha com número de valores incorreto. Esperado: ${headers.length}, Recebido: ${cleanValues.length}`);
      return null;
    }
    
    // Criar um objeto mapeando os cabeçalhos com seus valores
    const rowData: Record<string, string> = {};
    headers.forEach((header, index) => {
      rowData[header.trim()] = cleanValues[index];
    });
    
    // Verificar campos importantes
    const productId = rowData['Código do Produto'];
    const productName = rowData['Nome do Produto'];
    const categoryName = rowData['Categoria do Produto'];
    
    if (!productId || !productName || !categoryName) {
      console.log(`Linha com dados incompletos: ID: ${productId}, Nome: ${productName}, Categoria: ${categoryName}`);
      return null;
    }
    
    // Obter o ID da categoria
    const categoryId = getCategoryId(categoryName);
    
    console.log(`Produto '${productName}': Categoria original '${categoryName}' => ID '${categoryId}'`);
    
    // Mapear para o formato de produto
    const product: Product = {
      id: productId,
      name: productName,
      description: `${rowData['Subtipo de Produto']}`,
      categoryId: categoryId,
      quantity: parseFloat(rowData['Quantidade em Stock']) || 0,
      unit: parseUnit(rowData['Unidade de Medida']),
      dateAdded: new Date(),
      dateModified: new Date(),
      notes: rowData['Notas/Observações'] || '',
      location: rowData['Localização Atual'] || 'Armazém',
      locationHistory: [],
    };
    
    return product;
  } catch (error) {
    console.error('Erro ao parsear linha CSV:', error);
    return null;
  }
};

/**
 * Obtém o ID da categoria com base no nome
 */
const getCategoryId = (categoryName: string): string => {
  // Normalizar o nome da categoria (remover acentos, converter para minúsculas)
  const normalizedName = categoryName.toLowerCase().trim();
  console.log(`Mapeando categoria: '${categoryName}' (normalizada: '${normalizedName}')`);
  
  const categoryMap: Record<string, string> = {
    'mel': '1',
    'material de colmeia': '2',
    'colmeia': '2', // Mapeando para a mesma categoria
    'veterinários': '3',
    'veterinarios': '3',
    'embalamento': '4',
    'material de visita': '5',
    'equipamento de melaria': '6',
    'ferramentas apícolas': '7',
    'ferramentas apicolas': '7',
    'cera': '8'
  };
  
  // Tentar encontrar correspondência exata primeiro
  if (categoryMap[normalizedName]) {
    console.log(`Encontrado mapeamento direto para '${normalizedName}': ${categoryMap[normalizedName]}`);
    return categoryMap[normalizedName];
  }
  
  // Se não encontrar correspondência exata, procurar por correspondência parcial
  for (const [key, value] of Object.entries(categoryMap)) {
    if (normalizedName.includes(key) || key.includes(normalizedName)) {
      console.log(`Encontrado mapeamento parcial '${key}' para '${normalizedName}': ${value}`);
      return value;
    }
  }
  
  console.log(`Nenhum mapeamento encontrado para '${normalizedName}', usando categoria padrão '1'`);
  return '1'; // Categoria padrão (Mel)
};

/**
 * Importa produtos de um arquivo CSV 
 */
export const importProductsFromCSV = async (filePath: string): Promise<{ success: boolean; count: number; message?: string }> => {
  try {
    // Ler o conteúdo do arquivo
    const fileContent = await RNFS.readFile(filePath, 'utf8');
    
    // Dividir o conteúdo em linhas
    const lines = fileContent.split('\n');
    
    // A primeira linha deve conter os cabeçalhos
    if (lines.length < 2) {
      return { success: false, count: 0, message: 'Arquivo CSV vazio ou inválido' };
    }
    
    const headers = lines[0].split(',').map(header => header.trim());
    
    // Processar as linhas de dados (excluindo a linha de cabeçalho)
    const products: Product[] = [];
    
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line) {
        const product = parseCSVLine(line, headers);
        if (product) {
          products.push(product);
        }
      }
    }
    
    // Se não houver produtos, retornar erro
    if (products.length === 0) {
      return { success: false, count: 0, message: 'Nenhum produto válido encontrado no arquivo' };
    }
    
    // Corrigir categorias antes de salvar
    const correctedProducts = fixCategories(products);
    
    // Verificar categorias dos produtos corrigidos
    const correctedCategoriesMap: Record<string, number> = {};
    correctedProducts.forEach(product => {
      correctedCategoriesMap[product.categoryId] = (correctedCategoriesMap[product.categoryId] || 0) + 1;
    });
    
    console.log('Distribuição de categorias após correção:');
    Object.entries(correctedCategoriesMap).forEach(([categoryId, count]) => {
      console.log(`- Categoria ${categoryId}: ${count} produtos`);
    });
    
    // Salvar produtos corrigidos no armazenamento
    await saveProducts(correctedProducts);
    console.log(`${correctedProducts.length} produtos salvos com sucesso`);
    
    return { success: true, count: correctedProducts.length };
  } catch (error) {
    console.error('Erro ao importar produtos do CSV:', error);
    return { 
      success: false, 
      count: 0, 
      message: `Erro ao importar: ${error instanceof Error ? error.message : 'Erro desconhecido'}` 
    };
  }
};

/**
 * Importa produtos de uma string CSV (para testes)
 */
export const importProductsFromCSVString = async (csvString: string): Promise<{ success: boolean; count: number; message?: string }> => {
  try {
    console.log('Iniciando importação de CSV...');
    
    // Dividir o conteúdo em linhas
    const lines = csvString.split('\n');
    console.log(`Total de linhas no CSV: ${lines.length}`);
    
    // A primeira linha deve conter os cabeçalhos
    if (lines.length < 2) {
      console.log('CSV vazio ou inválido');
      return { success: false, count: 0, message: 'Dados CSV vazios ou inválidos' };
    }
    
    const headers = lines[0].split(',').map(header => header.trim());
    console.log(`Cabeçalhos encontrados: ${headers.join(', ')}`);
    
    // Verificar se os cabeçalhos necessários estão presentes
    const requiredHeaders = ['Código do Produto', 'Nome do Produto', 'Categoria do Produto'];
    const missingHeaders = requiredHeaders.filter(h => !headers.includes(h));
    
    if (missingHeaders.length > 0) {
      console.log(`Cabeçalhos obrigatórios ausentes: ${missingHeaders.join(', ')}`);
      return { 
        success: false, 
        count: 0, 
        message: `Cabeçalhos obrigatórios ausentes: ${missingHeaders.join(', ')}` 
      };
    }
    
    // Processar as linhas de dados (excluindo a linha de cabeçalho)
    const products: Product[] = [];
    let invalidLines = 0;
    
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line) {
        const product = parseCSVLine(line, headers);
        if (product) {
          products.push(product);
        } else {
          invalidLines++;
        }
      }
    }
    
    console.log(`Produtos válidos: ${products.length}, Linhas inválidas: ${invalidLines}`);
    
    // Verificar categorias dos produtos
    const categoriesMap: Record<string, number> = {};
    products.forEach(product => {
      categoriesMap[product.categoryId] = (categoriesMap[product.categoryId] || 0) + 1;
    });
    
    console.log('Distribuição de categorias:');
    Object.entries(categoriesMap).forEach(([categoryId, count]) => {
      console.log(`- Categoria ${categoryId}: ${count} produtos`);
    });
    
    // Se não houver produtos, retornar erro
    if (products.length === 0) {
      console.log('Nenhum produto válido encontrado nos dados');
      return { success: false, count: 0, message: 'Nenhum produto válido encontrado nos dados' };
    }
    
    // Corrigir categorias antes de salvar
    const correctedProducts = fixCategories(products);
    
    // Verificar categorias dos produtos corrigidos
    const correctedCategoriesMap: Record<string, number> = {};
    correctedProducts.forEach(product => {
      correctedCategoriesMap[product.categoryId] = (correctedCategoriesMap[product.categoryId] || 0) + 1;
    });
    
    console.log('Distribuição de categorias após correção:');
    Object.entries(correctedCategoriesMap).forEach(([categoryId, count]) => {
      console.log(`- Categoria ${categoryId}: ${count} produtos`);
    });
    
    // Salvar produtos corrigidos no armazenamento
    await saveProducts(correctedProducts);
    console.log(`${correctedProducts.length} produtos salvos com sucesso`);
    
    return { success: true, count: correctedProducts.length };
  } catch (error) {
    console.error('Erro ao importar produtos da string CSV:', error);
    return { 
      success: false, 
      count: 0, 
      message: `Erro ao importar: ${error instanceof Error ? error.message : 'Erro desconhecido'}` 
    };
  }
};

/**
 * Corrige categorias nos produtos com base em correspondências de nomes
 */
const fixCategories = (products: Product[]): Product[] => {
  // Dicionário de termos de categorias
  const categoryTerms: Record<string, string> = {
    'mel': '1',
    'material': '2',
    'colmeia': '2',
    'veterinar': '3',
    'embal': '4',
    'visita': '5',
    'melaria': '6',
    'ferrament': '7',
    'cera': '8'
  };
  
  console.log('Aplicando correções nas categorias...');
  
  return products.map(product => {
    // Se já tem categoria válida (1-8), manter
    if (product.categoryId >= '1' && product.categoryId <= '8') {
      return product;
    }
    
    // Tentar determinar a categoria pelo nome do produto
    let matchedCategory = '1'; // Categoria padrão (Mel)
    const normalizedName = product.name.toLowerCase();
    
    for (const [term, categoryId] of Object.entries(categoryTerms)) {
      if (normalizedName.includes(term)) {
        matchedCategory = categoryId;
        console.log(`Produto '${product.name}': Atribuída categoria ${categoryId} com base no nome (contém '${term}')`);
        break;
      }
    }
    
    return {
      ...product,
      categoryId: matchedCategory
    };
  });
}; 