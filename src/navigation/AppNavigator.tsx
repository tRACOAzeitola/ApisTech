import React from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useTheme } from '../context/ThemeContext';
import HomeScreen from '../screens/HomeScreen';
import DashboardScreen from '../screens/DashboardScreen';
import AddProductScreen from '../screens/AddProductScreen';
import HistoryScreen from '../screens/HistoryScreen';
import LowStockScreen from '../screens/LowStockScreen';

export type RootStackParamList = {
  MainTabs: undefined;
  Home: undefined;
  Dashboard: undefined;
  AddProduct: undefined;
  History: undefined;
  LowStock: undefined;
};

export type TabParamList = {
  Home: undefined;
  Dashboard: undefined;
  AddProduct: undefined;
  History: undefined;
  LowStock: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

const MainTabs = () => {
  const { colors, isDark } = useTheme();
  
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          } else if (route.name === 'Dashboard') {
            iconName = focused ? 'chart-box' : 'chart-box-outline';
            return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
          } else if (route.name === 'AddProduct') {
            iconName = focused ? 'plus-circle' : 'plus-circle-outline';
            return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
          } else if (route.name === 'History') {
            iconName = focused ? 'history' : 'history';
            return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
          } else if (route.name === 'LowStock') {
            iconName = focused ? 'alert-circle' : 'alert-circle-outline';
            return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
          }
          
          // Ícone padrão
          return <Ionicons name={'apps'} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.text.secondary,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          height: Platform.OS === 'ios' ? 88 : 60,
          paddingBottom: Platform.OS === 'ios' ? 28 : 8,
        },
        headerStyle: {
          backgroundColor: colors.surface,
          shadowColor: colors.border,
          shadowOpacity: 0.5,
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 2,
          elevation: 2,
        },
        headerTintColor: colors.text.primary,
        headerTitleStyle: {
          fontWeight: Platform.OS === 'ios' ? 'bold' : '500',
        },
        headerShadowVisible: Platform.OS === 'ios',
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ 
          title: 'Categorias',
          headerShown: false
        }} 
      />
      <Tab.Screen 
        name="Dashboard" 
        component={DashboardScreen} 
        options={{ 
          title: 'Dashboard',
          headerShown: true
        }} 
      />
      <Tab.Screen 
        name="AddProduct" 
        component={AddProductScreen} 
        options={{ 
          title: 'Adicionar Produto',
          headerShown: true
        }} 
      />
      <Tab.Screen 
        name="History" 
        component={HistoryScreen} 
        options={{ 
          title: 'Histórico',
          headerShown: true
        }} 
      />
      <Tab.Screen 
        name="LowStock" 
        component={LowStockScreen} 
        options={{ 
          title: 'Baixo Stock',
          headerShown: true
        }} 
      />
    </Tab.Navigator>
  );
};

const AppNavigator: React.FC = () => {
  const { colors } = useTheme();
  
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="MainTabs"
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
          animation: Platform.OS === 'ios' ? 'default' : 'slide_from_right',
        }}
      >
        <Stack.Screen name="MainTabs" component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
