import { Dimensions, PixelRatio, Platform } from 'react-native';

// Obtém as dimensões da tela do dispositivo
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Tamanho base de tela para cálculos - baseado em iPhone X
const baseWidth = 375;
const baseHeight = 812;

/**
 * Calcula o tamanho responsivo com base na largura da tela
 * @param size Tamanho desejado para a tela base
 * @returns Tamanho ajustado para a tela atual
 */
export const widthPercentageToDP = (widthPercent: number | string) => {
  const elemWidth = typeof widthPercent === 'number' ? widthPercent : parseFloat(widthPercent);
  return PixelRatio.roundToNearestPixel((SCREEN_WIDTH * elemWidth) / 100);
};

/**
 * Calcula o tamanho responsivo com base na altura da tela
 * @param size Tamanho desejado para a tela base
 * @returns Tamanho ajustado para a tela atual
 */
export const heightPercentageToDP = (heightPercent: number | string) => {
  const elemHeight = typeof heightPercent === 'number' ? heightPercent : parseFloat(heightPercent);
  return PixelRatio.roundToNearestPixel((SCREEN_HEIGHT * elemHeight) / 100);
};

/**
 * Escala um tamanho horizontal proporcionalmente ao tamanho da tela
 * @param size Tamanho em pixels para a tela base
 * @returns Tamanho escalado para a tela atual
 */
export const scaleWidth = (size: number) => {
  return (SCREEN_WIDTH / baseWidth) * size;
};

/**
 * Escala um tamanho vertical proporcionalmente ao tamanho da tela
 * @param size Tamanho em pixels para a tela base
 * @returns Tamanho escalado para a tela atual
 */
export const scaleHeight = (size: number) => {
  return (SCREEN_HEIGHT / baseHeight) * size;
};

/**
 * Escala um tamanho proporcionalmente para todas dimensões (fonte, icones, etc)
 * O fator de escala é limitado para evitar fontes muito grandes em tablets
 * @param size Tamanho em pixels para a tela base
 * @returns Tamanho escalado para a tela atual
 */
export const scale = (size: number) => {
  const scale = Math.min(SCREEN_WIDTH / baseWidth, SCREEN_HEIGHT / baseHeight);
  // Ajuste para evitar escalas muito grandes em telas maiores
  const scaleFactor = scale > 1.2 ? 1.2 : scale;
  return PixelRatio.roundToNearestPixel(size * scaleFactor);
};

/**
 * Função utilitária para criar estilos responsivos
 * @param styles Objeto de estilos com valores para a tela base
 * @returns Objeto de estilos com valores escalados para a tela atual
 */
export const createResponsiveStyles = (styles: Record<string, any>) => {
  const responsiveStyles: Record<string, any> = {};
  
  Object.keys(styles).forEach(key => {
    const style = styles[key];
    const responsiveStyle: Record<string, any> = {};
    
    Object.keys(style).forEach(prop => {
      // Escalar propriedades específicas que precisam de ajuste
      if (
        ['fontSize', 'lineHeight', 'borderRadius', 'margin', 'padding', 
         'width', 'height', 'top', 'bottom', 'left', 'right'].some(p => prop.includes(p)) &&
        typeof style[prop] === 'number'
      ) {
        // Usar scale para tipografia e espaçamentos menores
        if (prop.includes('fontSize') || prop.includes('lineHeight') || 
            (style[prop] < 20 && (prop.includes('margin') || prop.includes('padding')))) {
          responsiveStyle[prop] = scale(style[prop]);
        } 
        // Usar scaleWidth para dimensões horizontais
        else if (prop.includes('Width') || prop.includes('Left') || prop.includes('Right')) {
          responsiveStyle[prop] = scaleWidth(style[prop]);
        }
        // Usar scaleHeight para dimensões verticais
        else if (prop.includes('Height') || prop.includes('Top') || prop.includes('Bottom')) {
          responsiveStyle[prop] = scaleHeight(style[prop]);
        }
        // Para outros casos numéricos, usar scale
        else if (typeof style[prop] === 'number') {
          responsiveStyle[prop] = scale(style[prop]);
        }
      } else {
        // Manter outros valores inalterados
        responsiveStyle[prop] = style[prop];
      }
    });
    
    responsiveStyles[key] = responsiveStyle;
  });
  
  return responsiveStyles;
};

/**
 * Verifica se o dispositivo é um tablet
 * @returns boolean indicando se é tablet
 */
export const isTablet = () => {
  const pixelDensity = PixelRatio.get();
  const adjustedWidth = SCREEN_WIDTH * pixelDensity;
  const adjustedHeight = SCREEN_HEIGHT * pixelDensity;
  
  // Se a menor dimensão for maior que 600dp, consideramos um tablet
  return Math.min(adjustedWidth, adjustedHeight) >= 600;
};

/**
 * Verifica se o dispositivo está em modo paisagem
 * @returns boolean indicando se está em modo paisagem
 */
export const isLandscape = () => {
  return SCREEN_WIDTH > SCREEN_HEIGHT;
};

// Exporta dimensões da tela para fácil acesso
export const screenWidth = SCREEN_WIDTH;
export const screenHeight = SCREEN_HEIGHT;

// Adiciona um ouvinte para quando as dimensões mudarem (rotação da tela)
export const addDimensionsListener = (callback: () => void) => {
  const dimensionsSub = Dimensions.addEventListener('change', callback);
  return () => dimensionsSub.remove();
};
