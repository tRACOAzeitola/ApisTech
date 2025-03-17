import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Modal,
  FlatList,
  Platform,
  Animated
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { MenuOption } from '../types';
import { MENU_OPTIONS } from '../constants/menu';
import { useTheme } from '../context/ThemeContext';
import LinearGradient from 'react-native-linear-gradient';

interface MenuProps {
  visible: boolean;
  onClose: () => void;
  onSelectOption: (option: MenuOption) => void;
}

const Menu: React.FC<MenuProps> = ({ visible, onClose, onSelectOption }) => {
  const { colors, sizing, getShadow, isDark } = useTheme();
  const [scaleAnim] = React.useState(new Animated.Value(0.9));
  const [opacityAnim] = React.useState(new Animated.Value(0));
  
  // Definir cores de gradiente padrão para o caso de os gradientes não estarem disponíveis
  const defaultGradientDark = ['#302403', '#1D1705']; // Cores de fallback para tema escuro
  const defaultGradientLight = ['#FFC107', '#FFB300']; // Cores de fallback para tema claro
  
  // Obter gradientes de forma segura, com fallback para valores padrão
  const getHeaderGradient = () => {
    if (colors.gradients && colors.gradients.header) {
      return isDark ? colors.gradients.header.dark : colors.gradients.header.light;
    }
    return isDark ? defaultGradientDark : defaultGradientLight;
  };
  
  React.useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true
        })
      ]).start();
    } else {
      // Reset animation values when menu is closed
      scaleAnim.setValue(0.9);
      opacityAnim.setValue(0);
    }
  }, [visible, scaleAnim, opacityAnim]);
  
  const renderIcon = (iconName: string) => {
    // Mapeamento para melhores ícones do FontAwesome5
    const iconMapping: Record<string, string> = {
      'plus': 'plus',
      'chart-line': 'chart-bar',
      'history': 'history',
      'alert-triangle': 'exclamation-triangle'
    };
    
    const iconName5 = iconMapping[iconName] || iconName;
    return (
      <FontAwesome5 
        name={iconName5} 
        size={18} 
        color={isDark ? '#FFC107' : '#8B4513'} // Amarelo mel ou marrom madeira
        solid 
      />
    );
  };

  const renderItem = ({ item }: { item: MenuOption }) => (
    <TouchableOpacity 
      style={[
        styles.menuItem, 
        { 
          borderBottomColor: isDark 
            ? (colors.border?.dark || 'rgba(255, 193, 7, 0.2)') 
            : (colors.border?.light || 'rgba(139, 69, 19, 0.2)')
        }
      ]} 
      onPress={() => {
        onSelectOption(item);
        onClose();
      }}
      activeOpacity={0.7}
    >
      <View style={[
        styles.iconContainer, 
        { 
          backgroundColor: isDark 
            ? 'rgba(255, 193, 7, 0.1)' // Amarelo mel com transparência
            : 'rgba(139, 69, 19, 0.1)' // Marrom madeira com transparência
        }
      ]}>
        {renderIcon(item.icon)}
      </View>
      <Text style={[
        styles.menuItemText, 
        { 
          color: isDark 
            ? (colors.text?.dark?.primary || '#FFF8E1')  // Fallback para creme claro
            : (colors.text?.light?.primary || '#5D2E0D') // Fallback para marrom escuro
        }
      ]}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  // Definir cores de fundo com fallback seguro
  const getBackgroundColor = () => {
    if (isDark) {
      return colors.cardBackground?.dark || '#302403'; // Fallback para marrom escuro
    } else {
      return colors.cardBackground?.light || '#FFFDF7'; // Fallback para creme muito claro
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <TouchableOpacity 
        style={[styles.modalOverlay, { backgroundColor: colors.overlay || 'rgba(29, 23, 5, 0.6)' }]} 
        activeOpacity={1} 
        onPress={onClose}
      >
        <Animated.View 
          style={[
            styles.menuContainer, 
            { 
              backgroundColor: getBackgroundColor(),
              borderRadius: sizing.borderRadius,
              ...getShadow(5),
              transform: [{ scale: scaleAnim }],
              opacity: opacityAnim
            }
          ]}
        >
          <LinearGradient
            colors={getHeaderGradient()}
            style={styles.menuHeader}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
          >
            <Text style={[
              styles.menuTitle, 
              { 
                color: isDark 
                  ? (colors.text?.dark?.primary || '#FFF8E1')  // Fallback para creme claro
                  : (colors.text?.light?.primary || '#5D2E0D') // Fallback para marrom escuro
              }
            ]}>
              Menu
            </Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <FontAwesome5 
                name="times" 
                size={16} 
                color={isDark 
                  ? (colors.text?.dark?.secondary || '#FFE082')  // Fallback para amarelo claro
                  : (colors.text?.light?.secondary || '#8B4513') // Fallback para marrom
                } 
              />
            </TouchableOpacity>
          </LinearGradient>
          
          <FlatList
            data={MENU_OPTIONS}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingBottom: 8 }}
          />
        </Animated.View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  menuContainer: {
    width: 250,
    maxHeight: '80%',
    marginTop: Platform.OS === 'ios' ? 90 : 70,
    marginRight: 16,
    overflow: 'hidden',
  },
  menuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  closeButton: {
    padding: 6,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default Menu;
