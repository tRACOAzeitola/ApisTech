import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useTheme } from '../context/ThemeContext';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onPress: (product: Product) => void;
  categoryColor: string;
  style?: any;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onPress, 
  categoryColor,
  style 
}) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity 
      style={[
        styles.container, 
        { 
          backgroundColor: colors.cardBackground.dark,
          borderRadius: 10
        },
        style
      ]} 
      onPress={() => onPress(product)}
      activeOpacity={0.6}
    >
      {/* Ícone da categoria */}
      <View style={styles.iconContainer}>
        <View style={[styles.iconCircle, { backgroundColor: categoryColor }]}>
          <FontAwesome5 
            name="tint" 
            size={20} 
            color="#FFFFFF" 
            solid 
          />
        </View>
      </View>

      {/* Informações do produto */}
      <View style={styles.contentContainer}>
        <Text style={[styles.productName, { color: colors.text.primary }]}>
          {product.name}
        </Text>
        
        <View style={styles.locationContainer}>
          <Text style={[styles.locationLabel, { color: colors.text.secondary }]}>
            Localização
          </Text>
          <Text style={[styles.locationValue, { color: colors.text.secondary }]}>
            {product.location || "Armazém"}
          </Text>
        </View>
      </View>

      {/* Quantidade */}
      <View style={styles.quantityContainer}>
        <Text style={[styles.quantity, { color: colors.text.primary }]}>
          {product.quantity}
          <Text style={styles.unit}>
            {product.unit === 'kg' ? ' kg' : ''}
          </Text>
        </Text>
        
        <View style={styles.arrowContainer}>
          <FontAwesome5 
            name="chevron-right" 
            size={14} 
            color="#666666" 
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 16,
    marginVertical: 6,
    borderRadius: 10,
  },
  iconContainer: {
    marginRight: 12,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
  },
  productName: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationLabel: {
    fontSize: 13,
    marginRight: 4,
    opacity: 0.7,
  },
  locationValue: {
    fontSize: 13,
    opacity: 0.9,
  },
  quantityContainer: {
    alignItems: 'flex-end',
  },
  quantity: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  unit: {
    fontSize: 14,
    fontWeight: '400',
  },
  arrowContainer: {
    opacity: 0.5,
  },
});

export default ProductCard;
