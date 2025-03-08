import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import AnimatedCard from './AnimatedCard';
import { scale, scaleWidth, scaleHeight } from '../utils/responsive';

import { useTheme } from '../context/ThemeContext';
import { ProductCategory } from '../types';

interface CategoryCardProps {
  category: ProductCategory;
  onPress: (category: ProductCategory) => void;
  style?: any;
  animationDelay?: number;
  animationType?: 'fade' | 'slide' | 'scale' | 'none';
}

const CategoryCard: React.FC<CategoryCardProps> = ({ 
  category, 
  onPress, 
  style, 
  animationDelay = 0,
  animationType = 'slide'
}) => {
  const { colors, sizing, getShadow } = useTheme();

  // Função para mapear ícones consistentes para todas as categorias
  const getBetterIcon = () => {
    const iconSize = scale(26); // Ícones maiores como na imagem
    const iconColor = "#FFFFFF";
    
    // Definir ícones fixos baseado no id da categoria para evitar problemas com ícones faltantes
    switch(category.id) {
      case '1': // Mel
        return <FontAwesome5 name="tint" size={iconSize} color={iconColor} solid />;  
      case '2': // Material de Colmeia
        return <FontAwesome5 name="home" size={iconSize} color={iconColor} solid />;
      case '3': // Produtos Veterinários
        return <FontAwesome5 name="medkit" size={iconSize} color={iconColor} solid />;
      case '4': // Embalamento
        return <FontAwesome5 name="box" size={iconSize} color={iconColor} solid />;
      case '5': // Material de Visita
        return <FontAwesome5 name="toolbox" size={iconSize} color={iconColor} solid />;
      case '6': // Equipamento
        return <FontAwesome5 name="cog" size={iconSize} color={iconColor} solid />;
      case '7': // Ferramentas Apícolas
        return <FontAwesome5 name="tools" size={iconSize} color={iconColor} solid />;
      case '8': // Cera
        return <FontAwesome5 name="certificate" size={iconSize} color={iconColor} solid />;
      default:
        return <FontAwesome5 name="question-circle" size={iconSize} color={iconColor} solid />;
    }
  };

  const renderChevron = () => {
    return <FontAwesome5 name="chevron-right" size={16} color="#FFFFFF" />;
  };

  // Criar cores para o gradiente baseadas na cor da categoria
  const getGradientColors = (baseColor: string) => {
    // Retornar um tom mais claro como segunda cor
    return [baseColor, `${baseColor}88`];
  };

  // Definir cores e estilos baseados no tema atual
  return (
    <AnimatedCard
      style={[
        styles.container,
        style
      ]}
      onPress={() => onPress(category)}
      animationDelay={animationDelay}
      animationType={animationType}
      activeOpacity={0.7}
    >
      <LinearGradient
        colors={['#151515', '#0d2944']} // Gradiente escuro para azul mais visível como na imagem
        style={styles.cardContent}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        {/* Cabeçalho do card com ícone e números */}
        <View style={styles.cardHeader}>
          {/* Ícone da categoria */}
          <View style={[styles.iconCircle, { backgroundColor: category.color }]}>
            {getBetterIcon()}
          </View>
          
          {/* Informação de quantidade */}
          <View style={styles.quantityInfo}>
            <Text style={styles.numberText}>{category.count || Math.floor(Math.random() * 8) + 1}</Text>
            <Text style={styles.stockValue} numberOfLines={1} ellipsizeMode="tail">
              {category.totalStock} {category.unit}
            </Text>
          </View>
        </View>
        
        {/* Nome da categoria */}
        <View style={styles.nameContainer}>
          <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
            {category.name}
          </Text>
        </View>
        
        {/* Rodapé do card */}
        <View style={styles.footerContainer}>
          <Text style={styles.subtitle}>
            Total Stock
          </Text>
          {renderChevron()}
        </View>
      </LinearGradient>
    </AnimatedCard>
  );
};

// Cria estilos responsivos usando o utilitário
const styles = StyleSheet.create({
  container: {
    marginVertical: scale(6),
    marginHorizontal: scale(4),
    overflow: 'hidden',
    borderRadius: scale(12),
    // Altura muito maior para corresponder à imagem
    height: scale(240),
  },
  cardContent: {
    flex: 1,
    padding: scale(16),
    justifyContent: 'flex-start', // Alinha os elementos no topo
    paddingTop: scale(20),
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  iconCircle: {
    width: scale(56),
    height: scale(56),
    borderRadius: scale(28),
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityInfo: {
    alignItems: 'flex-end',
  },
  numberText: {
    fontSize: scale(26),
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  nameContainer: {
    marginTop: scale(16),
    marginBottom: 'auto', // Empurra o título para cima
  },
  title: {
    fontSize: scale(18),
    fontWeight: '600',
    color: '#FFFFFF',
    marginRight: scale(8), // Dar espaço para texto não ficar colado na borda
  },
  subtitle: {
    fontSize: scale(14),
    color: '#999999',
  },
  stockValue: {
    fontSize: scale(22),
    fontWeight: '600',
    color: '#FFFFFF',
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
    paddingTop: scale(10),
  },
});

export default CategoryCard;
