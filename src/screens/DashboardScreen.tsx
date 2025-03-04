import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  StatusBar,
  ScrollView,
  TouchableOpacity 
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { CATEGORIES } from '../data/mockData';

const DashboardScreen: React.FC = () => {
  const totalProducts = CATEGORIES.reduce(
    (sum, category) => sum + (category.count || 0), 
    0
  );
  
  const totalStock = CATEGORIES.reduce(
    (sum, category) => {
      if (category.unit === 'kg') {
        return {
          ...sum,
          kg: sum.kg + category.totalStock
        };
      } else {
        return {
          ...sum,
          units: sum.units + category.totalStock
        };
      }
    }, 
    { kg: 0, units: 0 }
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.title}>Dashboard</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.summaryContainer}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Total de Produtos</Text>
            <Text style={styles.summaryValue}>{totalProducts}</Text>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons name="cube-outline" size={36} color="#6c5ce7" style={styles.summaryIcon} />
            </View>
          </View>

          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Estoque Total (kg)</Text>
            <Text style={styles.summaryValue}>{totalStock.kg} kg</Text>
            <View style={styles.iconContainer}>
              <FontAwesome name="balance-scale" size={32} color="#00b894" style={styles.summaryIcon} />
            </View>
          </View>

          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Estoque Total (Unidades)</Text>
            <Text style={styles.summaryValue}>{totalStock.units}</Text>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons name="package-variant" size={36} color="#fdcb6e" style={styles.summaryIcon} />
            </View>
          </View>
        </View>

        <View style={styles.chartContainer}>
          <Text style={styles.sectionTitle}>Distribuição por Categoria</Text>
          <View style={styles.chartPlaceholder}>
            <Text style={styles.chartPlaceholderText}>Gráfico de Distribuição</Text>
            <FontAwesome name="bar-chart" size={60} color="#FFFFFF" />
          </View>
        </View>

        <View style={styles.recentActivityContainer}>
          <Text style={styles.sectionTitle}>Atividade Recente</Text>
          <View style={styles.activityItem}>
            <View style={styles.activityIconContainer}>
              <MaterialCommunityIcons name="plus-circle" size={24} color="#00b894" />
            </View>
            <View style={styles.activityDetails}>
              <Text style={styles.activityText}>Adicionado: Mel Multifloral</Text>
              <Text style={styles.activityTimestamp}>Hoje, 14:30</Text>
            </View>
          </View>
          
          <View style={styles.activityItem}>
            <View style={styles.activityIconContainer}>
              <MaterialCommunityIcons name="minus-circle" size={24} color="#ff7675" />
            </View>
            <View style={styles.activityDetails}>
              <Text style={styles.activityText}>Removido: Quadro de Ninho</Text>
              <Text style={styles.activityTimestamp}>Ontem, 10:15</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    marginRight: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  summaryContainer: {
    marginVertical: 16,
  },
  summaryCard: {
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    position: 'relative',
    overflow: 'hidden',
  },
  summaryTitle: {
    color: '#CCCCCC',
    fontSize: 14,
  },
  summaryValue: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 8,
  },
  iconContainer: {
    position: 'absolute',
    right: 16,
    top: '50%',
    transform: [{ translateY: -18 }],
  },
  summaryIcon: {
    opacity: 0.8,
  },
  chartContainer: {
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  chartPlaceholder: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2A2A2A',
    borderRadius: 8,
  },
  chartPlaceholderText: {
    color: '#CCCCCC',
    marginBottom: 8,
  },
  recentActivityContainer: {
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  activityIconContainer: {
    marginRight: 12,
  },
  activityDetails: {
    flex: 1,
  },
  activityText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  activityTimestamp: {
    color: '#999999',
    fontSize: 12,
    marginTop: 4,
  },
});

export default DashboardScreen;
