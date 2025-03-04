/**
 * Tema da aplicação - Sistema de Inventário para Apicultores
 * Tema escuro conforme especificado nos requisitos do projeto
 */

export const COLORS = {
  // Cores primárias
  primary: '#FFC107', // Amarelo/Dourado (cor do mel)
  primaryDark: '#FFA000',
  primaryLight: '#FFECB3',
  
  // Cores de fundo
  background: {
    dark: '#121212', // Fundo principal escuro
    medium: '#1E1E1E', // Fundo secundário
    light: '#2C2C2C', // Fundo terciário para cards e elementos elevados
  },
  
  // Cores de texto
  text: {
    primary: '#FFFFFF',
    secondary: '#B0B0B0',
    disabled: '#757575',
  },
  
  // Estados de interação
  states: {
    success: '#4CAF50',
    error: '#F44336',
    warning: '#FF9800',
    info: '#2196F3',
  },
  
  // Cores de categorias
  categories: {
    mel: '#FFC107',
    materialColmeia: '#795548',
    produtosVeterinarios: '#2196F3',
    embalamento: '#607D8B',
    materialVisita: '#FF5722',
    equipamentoMelaria: '#9C27B0',
    ferramentasApicolas: '#4CAF50',
    cera: '#FFEB3B',
  },
  
  // Bordas e separadores
  border: '#424242',
  divider: '#424242',
  
  // Outros
  overlay: 'rgba(0, 0, 0, 0.6)',
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const FONT_SIZE = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const FONT_FAMILY = {
  regular: 'Roboto-Regular',
  medium: 'Roboto-Medium',
  bold: 'Roboto-Bold',
  light: 'Roboto-Light',
};

export const BORDER_RADIUS = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  round: 999,
};

export const SHADOW = {
  sm: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },
};

export const Z_INDEX = {
  base: 0,
  card: 10,
  modal: 100,
  overlay: 90,
  tooltip: 200,
};

export default {
  COLORS,
  SPACING,
  FONT_SIZE,
  FONT_FAMILY,
  BORDER_RADIUS,
  SHADOW,
  Z_INDEX,
};
