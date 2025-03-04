import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useTheme } from '../context/ThemeContext';
import { ProductCategory } from '../types';

interface CategoryCardProps {
  category: ProductCategory;
  onPress: (category: ProductCategory) => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, onPress }) => {
  const { colors, sizing, getShadow } = useTheme();

  const renderIcon = () => {
    const iconSize = Platform.OS === 'ios' ? 32 : 30;
    
    switch (category.iconFamily) {
      case 'MaterialCommunityIcons':
        return (
          <MaterialCommunityIcons 
            name={category.icon} 
            size={iconSize} 
            color={category.color} 
          />
        );
      case 'FontAwesome':
        return (
          <FontAwesome 
            name={category.icon} 
            size={iconSize} 
            color={category.color} 
          />
        );
      default:
        return (
          <Ionicons 
            name={category.icon as any} 
            size={iconSize} 
            color={category.color} 
          />
        );
    }
  };

  const renderChevron = () => {
    if (Platform.OS === 'ios') {
      return <Ionicons name="chevron-forward" size={20} color={colors.text.secondary} />;
    } else {
      return <MaterialCommunityIcons name="chevron-right" size={24} color={colors.text.secondary} />;
    }
  };

  return (
    <TouchableOpacity 
      style={[
        styles.container, 
        { 
          backgroundColor: colors.surface,
          borderRadius: sizing.borderRadius,
          ...getShadow(2)
        }
      ]} 
      onPress={() => onPress(category)}
      activeOpacity={0.7}
    >
      <View style={styles.contentContainer}>
        <View style={[
          styles.iconContainer, 
          { 
            backgroundColor: Platform.OS === 'ios' ? 'rgba(0,0,0,0.03)' : 'transparent',
            borderRadius: Platform.OS === 'ios' ? 10 : 0,
          }
        ]}>
          {renderIcon()}
        </View>
        <View style={styles.infoContainer}>
          <Text style={[
            styles.title, 
            { 
              color: colors.text.primary,
              fontWeight: Platform.OS === 'ios' ? '600' : 'bold',
              fontSize: Platform.OS === 'ios' ? 17 : 16,
            }
          ]}>
            {category.name}
          </Text>
          <Text style={[styles.subtitle, { color: colors.text.secondary }]}>
            Total Stock
          </Text>
          <Text style={[styles.stockValue, { color: colors.text.primary }]}>
            {category.totalStock} {category.unit}
          </Text>
        </View>
      </View>
      <View style={styles.arrowContainer}>
        {renderChevron()}
        {category.count !== undefined && category.count > 0 && (
          <View style={[styles.countBadge, { backgroundColor: category.color }]}>
            <Text style={styles.countText}>{category.count}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: Platform.OS === 'ios' ? 14 : 16,
    marginVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: 16,
    padding: Platform.OS === 'ios' ? 8 : 0,
    width: Platform.OS === 'ios' ? 48 : 40,
    height: Platform.OS === 'ios' ? 48 : 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    flex: 1,
  },
  title: {
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
  },
  stockValue: {
    fontSize: 14,
    marginTop: 2,
  },
  arrowContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  countBadge: {
    position: 'absolute',
    top: -15,
    right: -5,
    borderRadius: 15,
    minWidth: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  countText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default CategoryCard;
