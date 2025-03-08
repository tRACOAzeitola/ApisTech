import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Platform
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { CATEGORIES } from '../data/mockData';
import ScreenLayout from '../components/ScreenLayout';
import { scale } from '../utils/responsive';
import { Product } from '../types/models/product.types';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNPrint from 'react-native-print';
import RNFS from 'react-native-fs';

const DashboardScreen: React.FC = () => {
  const [lowStockProducts, setLowStockProducts] = useState<Product[]>([]);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [isPdfLibAvailable, setIsPdfLibAvailable] = useState<boolean>(true);
  
  // Verificar bibliotecas disponíveis
  useEffect(() => {
    const checkLibraries = async () => {
      try {
        // Verificar se a biblioteca PDF está disponível
        const isPdfAvailable = typeof RNHTMLtoPDF?.convert === 'function';
        console.log('RNHTMLtoPDF disponível:', isPdfAvailable);
        // Comentamos esta linha para que os botões sempre estejam habilitados
        // setIsPdfLibAvailable(isPdfAvailable);
        
        if (!isPdfAvailable) {
          console.warn('Biblioteca de PDF não está disponível, mas os botões estarão habilitados para tentar mesmo assim.');
        }
      } catch (err) {
        console.error('Erro ao verificar bibliotecas:', err);
      }
    };
    
    checkLibraries();
  }, []);
  
  // Simulate low stock products
  useEffect(() => {
    // For demo purposes, we'll set the first 5 products as low stock
    const fakeStockAlerts = [
      { id: '1', name: 'Extrator 16Q', categoryId: '6', quantity: 1, stockAlert: 5, location: 'Armazém' },
      { id: '2', name: 'Tina Desopercoladar', categoryId: '6', quantity: 1, stockAlert: 5, location: 'Armazém' },
      { id: '3', name: 'Fatos L', categoryId: '5', quantity: 3, stockAlert: 5, location: 'Armazém' },
      { id: '4', name: 'Fatos XL', categoryId: '5', quantity: 3, stockAlert: 5, location: 'Armazém' },
      { id: '5', name: 'Desopercolador', categoryId: '7', quantity: 5, stockAlert: 5, location: 'Armazém' },
    ] as Product[];
    
    setLowStockProducts(fakeStockAlerts);
  }, []);

  // Find category name by ID
  const getCategoryName = (categoryId: string): string => {
    const category = CATEGORIES.find(cat => cat.id === categoryId);
    return category ? category.name : 'Desconhecido';
  };

  // Generate a formatted date for the report
  const getCurrentDate = (): string => {
    const now = new Date();
    return `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;
  };

  // Generate HTML for complete stock report
  const generateCompleteStockHTML = (): string => {
    // Calculate total numbers
    const totalCategories = CATEGORIES.length;
    const totalStock = CATEGORIES.reduce((sum, cat) => sum + (cat.totalStock || 0), 0);
    
    // Generate HTML content
    return `
      <html>
        <head>
          <style>
            body { font-family: 'Helvetica', sans-serif; color: #333; margin: 20px; }
            h1 { color: #1a237e; font-size: 24px; text-align: center; margin-bottom: 30px; }
            h2 { color: #283593; font-size: 18px; margin-top: 30px; border-bottom: 1px solid #ccc; padding-bottom: 5px; }
            .date { text-align: right; font-size: 12px; color: #666; margin-bottom: 30px; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
            th { background-color: #e8eaf6; border: 1px solid #c5cae9; padding: 10px; text-align: left; }
            td { border: 1px solid #c5cae9; padding: 10px; }
            .summary { background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin-bottom: 30px; }
            .footer { text-align: center; font-size: 12px; color: #666; margin-top: 50px; }
          </style>
        </head>
        <body>
          <h1>Relatório Completo de Estoque</h1>
          <div class="date">Data: ${getCurrentDate()}</div>
          
          <div class="summary">
            <p><strong>Total de Categorias:</strong> ${totalCategories}</p>
            <p><strong>Total de Itens em Estoque:</strong> ${totalStock.toLocaleString()}</p>
          </div>
          
          <h2>Detalhe por Categoria</h2>
          <table>
            <tr>
              <th>Categoria</th>
              <th>Quantidade</th>
              <th>Unidade</th>
              <th>% do Estoque</th>
            </tr>
            ${CATEGORIES.map(cat => {
              const percentage = ((cat.totalStock || 0) / totalStock * 100).toFixed(1);
              return `
                <tr>
                  <td>${cat.name}</td>
                  <td>${(cat.totalStock || 0).toLocaleString()}</td>
                  <td>${cat.unit || ''}</td>
                  <td>${percentage}%</td>
                </tr>
              `;
            }).join('')}
          </table>
          
          <div class="footer">
            <p>© ${new Date().getFullYear()} Inventário Apícola - Todos os direitos reservados</p>
            <p>Este relatório foi gerado automaticamente pelo sistema Inventário</p>
          </div>
        </body>
      </html>
    `;
  };

  // Generate HTML for low stock report
  const generateLowStockHTML = (): string => {
    return `
      <html>
        <head>
          <style>
            body { font-family: 'Helvetica', sans-serif; color: #333; margin: 20px; }
            h1 { color: #d32f2f; font-size: 24px; text-align: center; margin-bottom: 30px; }
            h2 { color: #c62828; font-size: 18px; margin-top: 30px; border-bottom: 1px solid #ccc; padding-bottom: 5px; }
            .date { text-align: right; font-size: 12px; color: #666; margin-bottom: 30px; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
            th { background-color: #ffebee; border: 1px solid #ffcdd2; padding: 10px; text-align: left; }
            td { border: 1px solid #ffcdd2; padding: 10px; }
            .critical { color: #d50000; font-weight: bold; }
            .warning { color: #ff6d00; font-weight: bold; }
            .summary { background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin-bottom: 30px; }
            .footer { text-align: center; font-size: 12px; color: #666; margin-top: 50px; }
          </style>
        </head>
        <body>
          <h1>Relatório de Estoque Baixo</h1>
          <div class="date">Data: ${getCurrentDate()}</div>
          
          <div class="summary">
            <p><strong>Total de Produtos com Estoque Baixo:</strong> ${lowStockProducts.length}</p>
            <p><strong>Data da Análise:</strong> ${getCurrentDate()}</p>
          </div>
          
          <h2>Produtos com Estoque Baixo</h2>
          <table>
            <tr>
              <th>Produto</th>
              <th>Categoria</th>
              <th>Localização</th>
              <th>Estoque Atual</th>
              <th>Estoque Mínimo</th>
              <th>Status</th>
            </tr>
            ${lowStockProducts.map(product => {
              const isCritical = product.quantity <= ((product.stockAlert || 0) / 2);
              return `
                <tr>
                  <td>${product.name}</td>
                  <td>${getCategoryName(product.categoryId)}</td>
                  <td>${product.location || 'N/A'}</td>
                  <td>${product.quantity}</td>
                  <td>${product.stockAlert || 'N/A'}</td>
                  <td class="${isCritical ? 'critical' : 'warning'}">${isCritical ? 'CRÍTICO' : 'ATENÇÃO'}</td>
                </tr>
              `;
            }).join('')}
          </table>
          
          <h2>Recomendações</h2>
          <p>Com base na análise atual do estoque, recomendamos:</p>
          <ul>
            <li>Reabastecer os itens marcados como CRÍTICO o mais rapidamente possível</li>
            <li>Planejar o reabastecimento dos itens marcados como ATENÇÃO nas próximas semanas</li>
            <li>Revisar os níveis de alerta de estoque se necessário</li>
          </ul>
          
          <div class="footer">
            <p>© ${new Date().getFullYear()} Inventário Apícola - Todos os direitos reservados</p>
            <p>Este relatório foi gerado automaticamente pelo sistema Inventário</p>
          </div>
        </body>
      </html>
    `;
  };

  // Generate HTML for honey inventory report
  const generateHoneyReportHTML = (): string => {
    // Find honey category
    const honeyCategory = CATEGORIES.find(cat => cat.name === 'Mel');
    const honeyStock = honeyCategory?.totalStock || 0;
    
    return `
      <html>
        <head>
          <style>
            body { font-family: 'Helvetica', sans-serif; color: #333; margin: 20px; }
            h1 { color: #f57f17; font-size: 24px; text-align: center; margin-bottom: 30px; }
            h2 { color: #ff8f00; font-size: 18px; margin-top: 30px; border-bottom: 1px solid #ccc; padding-bottom: 5px; }
            .date { text-align: right; font-size: 12px; color: #666; margin-bottom: 30px; }
            .honey-card { background-color: #fff8e1; border: 1px solid #ffecb3; border-radius: 8px; padding: 20px; margin-bottom: 30px; }
            .honey-value { font-size: 48px; color: #ff8f00; text-align: center; font-weight: bold; margin: 20px 0; }
            .honey-unit { font-size: 24px; color: #ff8f00; }
            .footer { text-align: center; font-size: 12px; color: #666; margin-top: 50px; }
            .chart-placeholder { background-color: #fafafa; height: 200px; border: 1px dashed #ccc; margin: 20px 0; display: flex; justify-content: center; align-items: center; color: #999; }
          </style>
        </head>
        <body>
          <h1>Relatório de Estoque de Mel</h1>
          <div class="date">Data: ${getCurrentDate()}</div>
          
          <div class="honey-card">
            <h2>Estoque Atual de Mel</h2>
            <div class="honey-value">${honeyStock.toLocaleString()} <span class="honey-unit">kg</span></div>
          </div>
          
          <h2>Análise de Estoque</h2>
          <p>O estoque atual de mel representa uma quantidade significativa, que deve ser gerenciada adequadamente para garantir a qualidade e frescor do produto.</p>
          
          <div class="chart-placeholder">
            Gráfico de Tendência de Estoque de Mel
          </div>
          
          <h2>Recomendações</h2>
          <p>Com base nos dados atuais, recomendamos:</p>
          <ul>
            <li>Monitorar condições de armazenamento para manter a qualidade</li>
            <li>Verificar datas de colheita e prazos de validade</li>
            <li>Planejar estratégias de venda para manter rotatividade de estoque</li>
          </ul>
          
          <div class="footer">
            <p>© ${new Date().getFullYear()} Inventário Apícola - Todos os direitos reservados</p>
            <p>Este relatório foi gerado automaticamente pelo sistema Inventário</p>
          </div>
        </body>
      </html>
    `;
  };

  // Generate and download PDF
  const generatePDF = async (htmlContent: string, fileName: string) => {
    if (isGeneratingPDF) return;
    
    try {
      setIsGeneratingPDF(true);
      
      // Generate PDF file
      const options = {
        html: htmlContent,
        fileName: fileName,
        directory: Platform.OS === 'ios' ? 'Documents' : 'Download',
        base64: false
      };
      
      console.log('Tentando converter HTML para PDF...');
      
      let file;
      try {
        // Primeiro método
        file = await RNHTMLtoPDF.convert(options);
        console.log('Arquivo PDF gerado via método padrão:', file);
      } catch (err) {
        console.warn('Método padrão falhou, tentando método alternativo...', err);
        // Tenta acessar via require para contornar possíveis problemas de inicialização
        const altHtmlToPdf = require('react-native-html-to-pdf').default;
        file = await altHtmlToPdf.convert(options);
        console.log('Arquivo PDF gerado via método alternativo:', file);
      }
      
      // Show success message with file path
      if (file && file.filePath) {
        Alert.alert(
          'Relatório Gerado',
          `O relatório foi salvo em: ${file.filePath}`,
          [
            { 
              text: 'Visualizar', 
              onPress: () => {
                console.log('Abrindo arquivo para visualização:', file.filePath);
                try {
                  RNPrint.print({ filePath: file.filePath })
                    .catch(err => {
                      console.error('Erro ao abrir visualização:', err);
                      Alert.alert('Erro', 'Não foi possível abrir o arquivo para visualização.');
                    });
                } catch (err) {
                  console.error('Erro ao tentar imprimir:', err);
                  Alert.alert('Erro', 'Não foi possível abrir o visualizador de PDF.');
                }
              } 
            },
            { text: 'OK' }
          ]
        );
      } else {
        Alert.alert('Erro', 'O arquivo PDF foi gerado, mas o caminho não foi retornado.');
      }
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      Alert.alert('Erro', `Não foi possível gerar o relatório PDF: ${(error as Error)?.message || 'erro desconhecido'}\n\nVerifique se a aplicação tem permissão para acessar armazenamento.`);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  // Handle report button clicks
  const handleCompleteReportClick = () => {
    const htmlContent = generateCompleteStockHTML();
    generatePDF(htmlContent, 'relatorio-completo-estoque');
  };
  
  const handleLowStockReportClick = () => {
    const htmlContent = generateLowStockHTML();
    generatePDF(htmlContent, 'relatorio-baixo-estoque');
  };
  
  const handleHoneyReportClick = () => {
    const htmlContent = generateHoneyReportHTML();
    generatePDF(htmlContent, 'relatorio-mel');
  };

  const renderCategoryBar = (category: typeof CATEGORIES[0], maxValue: number) => {
    const percentage = ((category.totalStock || 0) / maxValue) * 100;
    const percentageText = `${Math.round(percentage)}%`;
    
    return (
      <View key={category.id} style={styles.categoryBarContainer}>
        <View style={styles.categoryIconLabel}>
          {category.iconFamily === 'FontAwesome5' && (
            <FontAwesome5 name={category.icon} size={16} color={category.color} style={styles.categoryIcon} />
          )}
          <Text style={styles.categoryLabel}>{category.name}</Text>
        </View>
        
        <View style={styles.barBackground}>
          <View 
            style={[
              styles.barFill, 
              { width: `${percentage}%`, backgroundColor: category.color }
            ]} 
          />
        </View>
        
        <View style={styles.categoryValueContainer}>
          <Text style={styles.categoryValue}>
            {(category.totalStock || 0).toLocaleString()} <Text style={styles.percentageText}>({percentageText})</Text>
          </Text>
        </View>
      </View>
    );
  };

  // Sort categories by totalStock in descending order and get max value
  const sortedCategories = [...CATEGORIES].sort((a, b) => (b.totalStock || 0) - (a.totalStock || 0));
  const maxStockValue = sortedCategories.length > 0 ? (sortedCategories[0].totalStock || 0) : 0;

  return (
    <ScreenLayout title="Resumo do Inventário" showHomeButton={true}>
      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Alerta de Estoque</Text>
          
          <View style={styles.summaryCardsContainer}>
            {/* Low Stock Card */}
            <View style={[styles.summaryCard, styles.fullWidthCard]}>
              <View style={[styles.iconBox, { backgroundColor: '#FF3D00' }]}>
                <MaterialCommunityIcons name="alert-outline" size={24} color="#FFFFFF" />
              </View>
              <Text style={styles.summaryValue}>{lowStockProducts.length}</Text>
              <Text style={styles.summaryLabel}>Estoque Baixo</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quantidade por Categoria</Text>
          
          <View style={styles.categoryChartContainer}>
            {sortedCategories.map(category => renderCategoryBar(category, maxStockValue))}
          </View>
        </View>
        
        {lowStockProducts.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Produtos com Estoque Baixo</Text>
            
            {lowStockProducts.map(product => (
              <View key={product.id} style={styles.lowStockItem}>
                <View style={styles.productInfo}>
                  <Text style={styles.productName}>{product.name}</Text>
                  <Text style={styles.productCategory}>
                    {getCategoryName(product.categoryId)} • {product.location}
                  </Text>
                </View>
                
                <View style={styles.stockInfo}>
                  <Text style={[
                    styles.stockLevel, 
                    product.quantity <= ((product.stockAlert || 0) / 2) ? styles.criticalStock : styles.warningStock
                  ]}>
                    {product.quantity}/{product.stockAlert}
                  </Text>
                  <Text style={styles.stockAlertLabel}>Estoque Mínimo</Text>
                </View>
              </View>
            ))}
            
            <View style={styles.downloadButtonsContainer}>
              <TouchableOpacity 
                style={[styles.downloadButton, isGeneratingPDF && styles.disabledButton]} 
                onPress={handleCompleteReportClick}
                disabled={isGeneratingPDF}
              >
                <FontAwesome5 
                  name="file-download" 
                  size={16} 
                  color={isGeneratingPDF ? '#6B7280' : '#3B82F6'} 
                />
                <Text style={[
                  styles.downloadButtonText, 
                  isGeneratingPDF && styles.disabledButtonText
                ]}>
                  {isGeneratingPDF ? 'Gerando relatório...' : 'Baixar Relatório Completo'}
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.downloadButton, isGeneratingPDF && styles.disabledButton]} 
                onPress={handleHoneyReportClick}
                disabled={isGeneratingPDF}
              >
                <FontAwesome5 
                  name="file-download" 
                  size={16} 
                  color={isGeneratingPDF ? '#6B7280' : '#3B82F6'} 
                />
                <Text style={[
                  styles.downloadButtonText, 
                  isGeneratingPDF && styles.disabledButtonText
                ]}>
                  {isGeneratingPDF ? 'Gerando relatório...' : 'Baixar Relatório de Mel'}
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.downloadButton, isGeneratingPDF && styles.disabledButton]} 
                onPress={handleLowStockReportClick}
                disabled={isGeneratingPDF}
              >
                <FontAwesome5 
                  name="exclamation-triangle" 
                  size={16} 
                  color={isGeneratingPDF ? '#6B7280' : '#3B82F6'} 
                />
                <Text style={[
                  styles.downloadButtonText, 
                  isGeneratingPDF && styles.disabledButtonText
                ]}>
                  {isGeneratingPDF ? 'Gerando relatório...' : 'Baixar Relatório de Baixo Estoque'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: '#000000',
  },
  section: {
    backgroundColor: '#121212',
    margin: scale(10),
    padding: scale(16),
    borderRadius: scale(12),
  },
  sectionTitle: {
    fontSize: scale(18),
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: scale(16),
  },
  summaryCardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: -scale(5),
  },
  summaryCard: {
    backgroundColor: '#1E1E1E',
    borderRadius: scale(10),
    padding: scale(16),
    marginBottom: scale(10),
    width: '48%',
    alignItems: 'center',
    marginHorizontal: scale(5),
  },
  fullWidthCard: {
    width: '100%',
  },
  iconBox: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(8),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: scale(8),
  },
  summaryValue: {
    fontSize: scale(28),
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginVertical: scale(4),
  },
  summaryLabel: {
    fontSize: scale(14),
    color: '#AAAAAA',
  },
  categoryChartContainer: {
    marginTop: scale(10),
  },
  categoryBarContainer: {
    marginBottom: scale(16),
  },
  categoryIconLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(5),
  },
  categoryIcon: {
    marginRight: scale(8),
  },
  categoryLabel: {
    color: '#FFFFFF',
    fontSize: scale(14),
  },
  barBackground: {
    height: scale(16),
    backgroundColor: '#2A2A2A',
    borderRadius: scale(8),
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: scale(8),
  },
  categoryValueContainer: {
    marginTop: scale(4),
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  categoryValue: {
    color: '#FFFFFF',
    fontSize: scale(14),
    fontWeight: 'bold',
  },
  percentageText: {
    color: '#AAAAAA',
    fontWeight: 'normal',
  },
  lowStockItem: {
    backgroundColor: '#1E1E1E',
    borderRadius: scale(10),
    padding: scale(16),
    marginBottom: scale(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    color: '#FFFFFF',
    fontSize: scale(16),
    fontWeight: 'bold',
    marginBottom: scale(4),
  },
  productCategory: {
    color: '#AAAAAA',
    fontSize: scale(14),
  },
  stockInfo: {
    alignItems: 'flex-end',
  },
  stockLevel: {
    fontSize: scale(18),
    fontWeight: 'bold',
  },
  warningStock: {
    color: '#FFB700',
  },
  criticalStock: {
    color: '#FF4D4D',
  },
  stockAlertLabel: {
    color: '#AAAAAA',
    fontSize: scale(12),
  },
  downloadButtonsContainer: {
    marginTop: scale(16),
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: scale(12),
  },
  downloadButtonText: {
    color: '#3B82F6',
    fontSize: scale(16),
    marginLeft: scale(10),
  },
  disabledButton: {
    opacity: 0.5,
  },
  disabledButtonText: {
    color: '#6B7280',
  },
});

export default DashboardScreen;
