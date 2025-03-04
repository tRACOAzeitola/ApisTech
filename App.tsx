/**
 * Inventario - Aplicativo de Gestão de Inventário para Apicultores
 *
 * @format
 */

import React from 'react';
import { StatusBar, Platform, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Importações da aplicação com caminhos atualizados
import { ThemeProvider } from './src/context/ThemeContext';
import AppNavigator from './src/navigation/AppNavigator';
import { COLORS } from './src/styles/theme';

/**
 * Componente principal da aplicação
 */
function App(): React.JSX.Element {
  const colorScheme = useColorScheme();
  
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <StatusBar 
          barStyle="light-content"
          backgroundColor={COLORS.background.dark}
        />
        <AppNavigator />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

export default App;
