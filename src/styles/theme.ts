/**
 * Tema da aplicação - Sistema de Inventário para Apicultores
 * Paleta de cores inspirada em apicultura
 */

export const COLORS = {
  // Cores primárias
  primary: '#FFC107', // Amarelo/Dourado (cor do mel)
  primaryDark: '#E6A800', // Mel mais escuro
  primaryLight: '#FFE082', // Mel mais claro
  
  // Cores secundárias
  secondary: '#8B4513', // Marrom madeira
  secondaryDark: '#5D2E0D', // Madeira mais escura
  secondaryLight: '#A05629', // Madeira mais clara
  
  // Cores terciárias
  tertiary: '#FFF8E1', // Branco creme (como cera de abelha)
  tertiaryDark: '#F5EED5', // Creme mais escuro
  tertiaryLight: '#FFFDF7', // Creme mais claro
  
  // Cores de fundo
  background: {
    light: '#FFF8E1', // Creme claro para tema claro
    dark: '#1D1705', // Marrom muito escuro para tema escuro
    medium: {
      light: '#FFF3CC', // Creme médio para tema claro
      dark: '#302403', // Marrom escuro para tema escuro
    },
    card: {
      light: '#FFFDF7', // Creme muito claro para cartões no tema claro
      dark: '#261C06', // Marrom meio escuro para cartões no tema escuro
    }
  },
  
  // Cores de texto
  text: {
    light: {
      primary: '#5D2E0D', // Marrom escuro para texto principal no tema claro
      secondary: '#8B4513', // Marrom para texto secundário no tema claro
      accent: '#E6A800', // Amarelo escuro para texto de destaque no tema claro
    },
    dark: {
      primary: '#FFF8E1', // Creme claro para texto principal no tema escuro
      secondary: '#FFE082', // Amarelo claro para texto secundário no tema escuro
      accent: '#FFC107', // Amarelo mel para texto de destaque no tema escuro
    }
  },
  
  // Estados de interação
  states: {
    success: '#8BC34A', // Verde oliva (representando plantas que abelhas visitam)
    error: '#E64A19', // Vermelho alaranjado (perigo para colmeias)
    warning: '#FFA000', // Âmbar (mel mais escuro, aviso)
    info: '#0288D1', // Azul (céu, dia bom para as abelhas)
  },
  
  // Cores de categorias
  categories: {
    mel: '#FFC107', // Amarelo mel
    materialColmeia: '#8B4513', // Marrom madeira
    produtosVeterinarios: '#0288D1', // Azul
    embalamento: '#FFF8E1', // Creme claro
    materialVisita: '#8BC34A', // Verde oliva
    equipamentoMelaria: '#FFB300', // Âmbar
    ferramentasApicolas: '#795548', // Marrom mais escuro
    cera: '#FFE082', // Amarelo claro
  },
  
  // Bordas e separadores
  border: {
    light: 'rgba(139, 69, 19, 0.2)', // Marrom transparente para tema claro
    dark: 'rgba(255, 193, 7, 0.2)', // Amarelo transparente para tema escuro
  },
  
  // Gradientes
  gradients: {
    primary: ['#FFC107', '#FFB300', '#FFA000'], // Gradiente de amarelo mel
    secondary: ['#8B4513', '#795548', '#5D2E0D'], // Gradiente de marrom
    card: {
      light: ['#FFFDF7', '#FFF8E1'], // Gradiente claro para cartões no tema claro
      dark: ['#302403', '#1D1705'], // Gradiente escuro para cartões no tema escuro
    },
    header: {
      light: ['#FFC107', '#FFB300'], // Gradiente amarelo para cabeçalhos no tema claro
      dark: ['#5D2E0D', '#3E1F08'], // Gradiente marrom para cabeçalhos no tema escuro
    }
  },
  
  // Outros
  overlay: 'rgba(29, 23, 5, 0.6)', // Sobreposição escura semi-transparente
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
  xxl: 24,
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
