import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme, Platform } from 'react-native';

// Definição de cores conforme as diretrizes de Material Design (Android) e Human Interface (iOS)
const colors = {
  // Cores primárias
  primary: {
    light: '#ffab40', // Âmbar (cor de mel) para tema claro
    dark: '#ffab40',  // Âmbar (cor de mel) para tema escuro
  },
  // Cores de fundo
  background: {
    light: Platform.OS === 'ios' ? '#F2F2F7' : '#FAFAFA',
    dark: Platform.OS === 'ios' ? '#000000' : '#121212',
  },
  // Cor de cartões/superfícies
  surface: {
    light: Platform.OS === 'ios' ? '#FFFFFF' : '#FFFFFF',
    dark: Platform.OS === 'ios' ? '#1C1C1E' : '#1E1E1E',
  },
  // Textos
  text: {
    primary: {
      light: Platform.OS === 'ios' ? '#000000' : '#212121',
      dark: Platform.OS === 'ios' ? '#FFFFFF' : '#FFFFFF',
    },
    secondary: {
      light: Platform.OS === 'ios' ? '#8E8E93' : '#757575',
      dark: Platform.OS === 'ios' ? '#8E8E93' : '#999999',
    },
  },
  // Bordas
  border: {
    light: Platform.OS === 'ios' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0.12)',
    dark: Platform.OS === 'ios' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.12)',
  },
  // Categorias específicas para o sistema
  categoryColors: [
    '#ffab40', // Mel
    '#4fc3f7', // Material de Colmeia
    '#81c784', // Produtos Veterinários
    '#e57373', // Embalamento
    '#ba68c8', // Material de Visita
    '#ffd54f', // Equipamento de Melaria
    '#7986cb', // Ferramentas Apícolas
    '#ff8a65', // Cera
  ],
};

// Diferentes tamanhos para os elementos de UI conforme plataforma
const sizing = {
  borderRadius: Platform.OS === 'ios' ? 8 : 4,
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  typography: {
    h1: Platform.OS === 'ios' ? 34 : 32,
    h2: Platform.OS === 'ios' ? 28 : 26,
    h3: Platform.OS === 'ios' ? 24 : 22,
    body: Platform.OS === 'ios' ? 17 : 16,
    caption: Platform.OS === 'ios' ? 12 : 12,
  },
};

// Estilo de sombra específico para cada plataforma
const getShadow = (elevation = 2) => {
  if (Platform.OS === 'ios') {
    return {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: elevation },
      shadowOpacity: 0.1,
      shadowRadius: elevation,
    };
  } else {
    return {
      elevation,
    };
  }
};

// Tipos para o contexto
type ThemeType = 'light' | 'dark';

interface ThemeContextType {
  theme: ThemeType;
  colors: any;
  sizing: any;
  toggleTheme: () => void;
  getShadow: (elevation?: number) => any;
  isDark: boolean;
}

// Criar o contexto
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Provedor de tema
export const ThemeProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const deviceColorScheme = useColorScheme();
  const [theme, setTheme] = useState<ThemeType>(deviceColorScheme || 'dark');
  const isDark = theme === 'dark';

  // Atualizar o tema sempre que o esquema de cores do dispositivo mudar
  useEffect(() => {
    if (deviceColorScheme) {
      setTheme(deviceColorScheme);
    }
  }, [deviceColorScheme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // Valores a serem compartilhados pelo contexto
  const value = {
    theme,
    isDark,
    colors: {
      primary: colors.primary[theme],
      background: colors.background[theme],
      surface: colors.surface[theme],
      text: {
        primary: colors.text.primary[theme],
        secondary: colors.text.secondary[theme],
      },
      border: colors.border[theme],
      categoryColors: colors.categoryColors,
    },
    sizing,
    toggleTheme,
    getShadow,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook personalizado para usar o tema
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
