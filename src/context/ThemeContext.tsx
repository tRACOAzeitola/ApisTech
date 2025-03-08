import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme, Platform, Appearance } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Definição de cores conforme a imagem de referência (modo escuro)
const colors = {
  // Cores primárias
  primary: {
    light: '#FF3B30', // Vermelho para tema claro
    dark: '#FF3B30',  // Vermelho para tema escuro (como na imagem)
  },
  accent: {
    light: '#007AFF', // Azul para acentos no tema claro
    dark: '#007AFF',  // Azul para acentos no tema escuro
  },
  // Cores de fundo
  background: {
    light: Platform.OS === 'ios' ? '#F2F2F7' : '#FAFAFA',
    dark: '#000000', // Preto puro como na imagem
  },
  // Cor de cartões/superfícies
  surface: {
    light: Platform.OS === 'ios' ? '#FFFFFF' : '#FFFFFF',
    dark: '#000000', // Cartões pretos como na imagem
  },
  cardBackground: {
    light: '#FFFFFF',
    dark: '#151515', // Cinza muito escuro para os cartões
  },
  // Cores para interruptores (toggle switches)
  switch: {
    activeTrack: {
      light: '#007AFF',
      dark: '#007AFF',
    },
    inactiveTrack: {
      light: 'rgba(0, 0, 0, 0.1)',
      dark: 'rgba(255, 255, 255, 0.2)',
    },
    thumb: {
      light: '#FFFFFF',
      dark: '#FFFFFF',
    },
  },
  // Textos
  text: {
    primary: {
      light: Platform.OS === 'ios' ? '#000000' : '#212121',
      dark: '#FFFFFF', // Branco para texto principal
    },
    secondary: {
      light: Platform.OS === 'ios' ? '#8E8E93' : '#757575',
      dark: '#999999', // Cinza claro para texto secundário
    },
    accent: {
      light: '#007AFF',
      dark: '#007AFF', // Azul para texto de ação
    },
  },
  // Bordas
  border: {
    light: Platform.OS === 'ios' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0.12)',
    dark: 'rgba(255, 255, 255, 0.1)', // Borda sutil
  },
  // Categorias específicas para o sistema (cores vibrantes em fundo escuro)
  categoryColors: [
    '#FCD34D', // Amarelo para Mel (como na imagem)
    '#60A5FA', // Azul para Material de Colmeia (como na imagem)
    '#FC444D', // Vermelho para Produtos Veterinários 
    '#A3A3A3', // Cinza para Embalamento
    '#4ADE80', // Verde para Material de Visita
    '#93C5FD', // Azul claro para Equipamento de Melaria
    '#C084FC', // Roxo para Ferramentas Apícolas
    '#FDBA74', // Laranja para Cera
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
