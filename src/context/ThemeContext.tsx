import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme, Platform, Appearance } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Definição de cores para tema inspirado em apicultura
const colors = {
  // Cores primárias
  primary: {
    light: '#FFC107', // Amarelo mel para tema claro
    dark: '#FFC107',  // Amarelo mel para tema escuro
  },
  accent: {
    light: '#8B4513', // Marrom madeira para acentos no tema claro
    dark: '#A05629',  // Marrom madeira mais claro para acentos no tema escuro
  },
  // Cores de fundo
  background: {
    light: '#FFF8E1', // Creme claro (cera de abelha) para fundo no tema claro
    dark: '#1D1705',  // Marrom muito escuro para fundo no tema escuro
  },
  // Cor de cartões/superfícies
  surface: {
    light: '#FFFDF7', // Creme muito claro para superfícies no tema claro
    dark: '#261C06',  // Marrom meio escuro para superfícies no tema escuro
  },
  cardBackground: {
    light: '#FFFDF7', // Creme muito claro para cartões no tema claro
    dark: '#302403',  // Marrom escuro para cartões no tema escuro
  },
  // Cores para interruptores (toggle switches)
  switch: {
    activeTrack: {
      light: '#FFC107', // Amarelo mel para trilha ativa no tema claro
      dark: '#FFC107',  // Amarelo mel para trilha ativa no tema escuro
    },
    inactiveTrack: {
      light: 'rgba(139, 69, 19, 0.3)', // Marrom transparente para trilha inativa no tema claro
      dark: 'rgba(255, 193, 7, 0.3)',  // Amarelo transparente para trilha inativa no tema escuro
    },
    thumb: {
      light: '#FFFFFF', // Branco para o polegar no tema claro
      dark: '#FFF8E1',  // Creme claro para o polegar no tema escuro
    },
  },
  // Textos
  text: {
    primary: {
      light: '#5D2E0D', // Marrom escuro para texto principal no tema claro
      dark: '#FFF8E1',  // Creme claro para texto principal no tema escuro
    },
    secondary: {
      light: '#8B4513', // Marrom para texto secundário no tema claro
      dark: '#FFE082',  // Amarelo claro para texto secundário no tema escuro
    },
    accent: {
      light: '#E6A800', // Amarelo escuro para texto de destaque no tema claro
      dark: '#FFC107',  // Amarelo mel para texto de destaque no tema escuro
    },
  },
  // Bordas
  border: {
    light: 'rgba(139, 69, 19, 0.2)', // Marrom transparente para tema claro
    dark: 'rgba(255, 193, 7, 0.2)',  // Amarelo transparente para tema escuro
  },
  // Categorias específicas para o sistema (cores inspiradas em apicultura)
  categoryColors: [
    '#FFC107', // Amarelo mel
    '#8B4513', // Marrom madeira
    '#0288D1', // Azul (céu)
    '#FFF8E1', // Creme claro (cera de abelha)
    '#8BC34A', // Verde oliva (plantas)
    '#FFB300', // Âmbar (mel mais escuro)
    '#795548', // Marrom mais escuro (madeira envelhecida)
    '#FFE082', // Amarelo claro (mel claro)
  ],
  // Gradientes para componentes
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
  setThemeMode: (mode: 'system' | 'manual') => void;
  themeMode: 'system' | 'manual';
  getShadow: (elevation?: number) => any;
  isDark: boolean;
}

// Criar o contexto
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Provedor de tema
export const ThemeProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const deviceColorScheme = useColorScheme();
  const [theme, setTheme] = useState<ThemeType>(deviceColorScheme || 'dark');
  const [themeMode, setThemeMode] = useState<'system' | 'manual'>('system');
  const isDark = theme === 'dark';

  // Carregar preferências salvas ao iniciar
  useEffect(() => {
    const loadThemePreferences = async () => {
      try {
        const savedThemeMode = await AsyncStorage.getItem('@theme_mode');
        if (savedThemeMode) {
          setThemeMode(savedThemeMode as 'system' | 'manual');
        }

        // Se o modo for manual, carregar o tema salvo
        if (savedThemeMode === 'manual') {
          const savedTheme = await AsyncStorage.getItem('@theme');
          if (savedTheme) {
            setTheme(savedTheme as ThemeType);
          }
        }
      } catch (error) {
        console.error('Erro ao carregar preferências de tema:', error);
      }
    };

    loadThemePreferences();
  }, []);

  // Atualizar o tema sempre que o esquema de cores do dispositivo mudar (se no modo sistema)
  useEffect(() => {
    if (themeMode === 'system' && deviceColorScheme) {
      setTheme(deviceColorScheme);
    }
  }, [deviceColorScheme, themeMode]);

  // Adicionar listener para mudanças de aparência do sistema
  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      if (themeMode === 'system' && colorScheme) {
        setTheme(colorScheme as ThemeType);
      }
    });

    return () => {
      // Remover o listener quando o componente for desmontado
      subscription.remove();
    };
  }, [themeMode]);

  const toggleTheme = async () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    
    // Se estiver no modo manual, salvar a preferência
    if (themeMode === 'manual') {
      try {
        await AsyncStorage.setItem('@theme', newTheme);
      } catch (error) {
        console.error('Erro ao salvar preferência de tema:', error);
      }
    }
  };

  // Função para alterar o modo de tema (sistema ou manual)
  const handleSetThemeMode = async (mode: 'system' | 'manual') => {
    setThemeMode(mode);
    try {
      await AsyncStorage.setItem('@theme_mode', mode);
      
      // Se mudar para o modo sistema, aplicar o tema do sistema
      if (mode === 'system' && deviceColorScheme) {
        setTheme(deviceColorScheme);
      } else if (mode === 'manual') {
        // Se mudar para o modo manual, salvar o tema atual
        await AsyncStorage.setItem('@theme', theme);
      }
    } catch (error) {
      console.error('Erro ao salvar modo de tema:', error);
    }
  };

  // Valores a serem compartilhados pelo contexto
  const value = {
    theme,
    isDark,
    themeMode,
    colors: {
      primary: colors.primary,
      accent: colors.accent,
      background: colors.background[theme],
      surface: colors.surface[theme],
      cardBackground: colors.cardBackground[theme], // Usar tema correto
      text: {
        primary: colors.text.primary[theme],
        secondary: colors.text.secondary[theme],
        accent: colors.text.accent[theme],
      },
      border: colors.border[theme],
      categoryColors: colors.categoryColors,
      switch: colors.switch, // Adicionar as cores do switch
      gradients: colors.gradients, // Adicionar os gradientes
    },
    sizing,
    toggleTheme,
    setThemeMode: handleSetThemeMode,
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
