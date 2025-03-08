import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  Platform,
  ScrollView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { scale } from '../utils/responsive';
import { useTheme } from '../context/ThemeContext';
import { RootStackParamList } from '../types';

type MainScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Main'>;

interface MenuItemProps {
  title: string;
  subtitle?: string;
  icon: string;
  iconColor: string;
  iconFamily: 'Ionicons' | 'MaterialCommunityIcons' | 'FontAwesome5';
  onPress: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({
  title,
  subtitle,
  icon,
  iconColor,
  iconFamily,
  onPress
}) => {
  // Renderiza o ícone com base na família especificada
  const renderIcon = () => {
    const size = scale(24);
    
    if (iconFamily === 'Ionicons') {
      return <Ionicons name={icon} size={size} color={iconColor} />;
    } else if (iconFamily === 'MaterialCommunityIcons') {
      return <MaterialCommunityIcons name={icon} size={size} color={iconColor} />;
    } else if (iconFamily === 'FontAwesome5') {
      return <FontAwesome5 name={icon} size={size} color={iconColor} />;
    }
    
    return null;
  };

  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress} activeOpacity={0.7}>
      <View style={[styles.iconContainer, { backgroundColor: `${iconColor}20` }]}>
        {renderIcon()}
      </View>
      <View style={styles.menuItemTextContainer}>
        <Text style={styles.menuItemTitle}>{title}</Text>
        {subtitle && <Text style={styles.menuItemSubtitle}>{subtitle}</Text>}
      </View>
    </TouchableOpacity>
  );
};

const MainScreen: React.FC = () => {
  const navigation = useNavigation<MainScreenNavigationProp>();
  const { colors } = useTheme();
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle="light-content" />
      
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Armazém</Text>
      </View>
      
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.columnsContainer}>
          {/* Coluna Esquerda - Inventário */}
          <View style={styles.column}>
            <View style={styles.columnHeader}>
              <Text style={styles.columnTitle}>Inventário</Text>
              <Text style={styles.columnSubtitle}>Gestão de Stock</Text>
            </View>
            
            <MenuItem
              title="Controle"
              subtitle="de produtos"
              icon="package-variant"
              iconColor="#007AFF"
              iconFamily="MaterialCommunityIcons"
              onPress={() => navigation.navigate('Home')}
            />
            
            <MenuItem
              title="Relatórios"
              icon="file-document-outline"
              iconColor="#007AFF"
              iconFamily="MaterialCommunityIcons"
              onPress={() => navigation.navigate('Dashboard')}
            />
            
            <MenuItem
              title="Histórico"
              icon="history"
              iconColor="#007AFF"
              iconFamily="MaterialCommunityIcons"
              onPress={() => navigation.navigate('History')}
            />
          </View>
          
          {/* Coluna Direita - Apiários */}
          <View style={styles.column}>
            <View style={styles.columnHeader}>
              <Text style={styles.columnTitle}>Apiários</Text>
              <Text style={styles.columnSubtitle}>Gestão de Apiários</Text>
            </View>
            
            <MenuItem
              title="Material"
              subtitle="por apiário"
              icon="archive"
              iconColor="#32CD32"
              iconFamily="MaterialCommunityIcons"
              onPress={() => navigation.navigate('Apiaries')}
            />
            
            <MenuItem
              title="Estado das"
              subtitle="colmeias"
              icon="home-variant"
              iconColor="#32CD32"
              iconFamily="MaterialCommunityIcons"
              onPress={() => {}} // Será implementado posteriormente
            />
            
            <MenuItem
              title="Relatórios"
              icon="chart-line"
              iconColor="#32CD32"
              iconFamily="MaterialCommunityIcons"
              onPress={() => {}} // Será implementado posteriormente
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    paddingHorizontal: scale(20),
    paddingTop: scale(20),
    paddingBottom: scale(10),
  },
  headerTitle: {
    fontSize: scale(36),
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: scale(20),
  },
  columnsContainer: {
    flexDirection: 'row',
    paddingHorizontal: scale(16),
    paddingTop: scale(20),
  },
  column: {
    flex: 1,
    paddingHorizontal: scale(4),
  },
  columnHeader: {
    marginBottom: scale(16),
  },
  columnTitle: {
    fontSize: scale(20),
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: scale(4),
  },
  columnSubtitle: {
    fontSize: scale(14),
    color: '#9E9E9E',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    borderRadius: scale(10),
    marginBottom: scale(12),
    padding: scale(16),
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  iconContainer: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(8),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(12),
  },
  menuItemTextContainer: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: scale(16),
    fontWeight: '600',
    color: '#FFFFFF',
  },
  menuItemSubtitle: {
    fontSize: scale(14),
    color: '#9E9E9E',
    marginTop: scale(2),
  },
});

export default MainScreen; 