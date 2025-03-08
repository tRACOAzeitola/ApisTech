/**
 * Inventario - Aplicativo de Gestão de Inventário para Apicultores
 *
 * @format
 */

import React from 'react';
import { StatusBar } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import { ThemeProvider } from './src/context/ThemeContext';

const App = () => {
  return (
    <ThemeProvider>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <AppNavigator />
    </ThemeProvider>
  );
};

export default App;
