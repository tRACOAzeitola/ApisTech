import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainScreen from '../screens/MainScreen';
import HomeScreen from '../screens/HomeScreen';
import ApiariesScreen from '../screens/ApiariesScreen';
import DashboardScreen from '../screens/DashboardScreen';
import AddProductScreen from '../screens/AddProductScreen';
import CategoryProductsScreen from '../screens/CategoryProductsScreen';
import HistoryScreen from '../screens/HistoryScreen';
import LowStockScreen from '../screens/LowStockScreen';

// Novas telas para apiários
import AddApiaryScreen from '../screens/AddApiaryScreen';
import ApiaryDetailsScreen from '../screens/ApiaryDetailsScreen';

// Telas de transferência
import TransferProductScreen from '../screens/TransferProductScreen';
import TransferEquipmentScreen from '../screens/TransferEquipmentScreen';

import { RootStackParamList } from '../types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Main"
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
          contentStyle: { backgroundColor: '#000000' }
        }}
      >
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Apiaries" component={ApiariesScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="AddProduct" component={AddProductScreen} />
        <Stack.Screen name="CategoryProducts" component={CategoryProductsScreen} />
        <Stack.Screen name="History" component={HistoryScreen} />
        <Stack.Screen name="LowStock" component={LowStockScreen} />
        
        {/* Novas telas para apiários */}
        <Stack.Screen name="AddApiary" component={AddApiaryScreen} />
        <Stack.Screen name="ApiaryDetails" component={ApiaryDetailsScreen} />
        
        {/* Telas de transferência */}
        <Stack.Screen name="TransferProduct" component={TransferProductScreen} />
        <Stack.Screen name="TransferEquipment" component={TransferEquipmentScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
