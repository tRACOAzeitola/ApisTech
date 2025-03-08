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
        color={colors.primary}
        solid 
      />
    );
  };

  const renderItem = ({ item }: { item: MenuOption }) => (
    <TouchableOpacity 
      style={[styles.menuItem, { borderBottomColor: colors.border }]} 
      onPress={() => {
        onSelectOption(item);
        onClose();
      }}
      activeOpacity={0.7}
    >
      <View style={[styles.iconContainer, { backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)' }]}>
        {renderIcon(item.icon)}
      </View>
      <Text style={[styles.menuItemText, { color: colors.text.primary }]}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <TouchableOpacity 
        style={[styles.modalOverlay, { backgroundColor: isDark ? 'rgba(0,0,0,0.6)' : 'rgba(0,0,0,0.3)' }]} 
        activeOpacity={1} 
        onPress={onClose}
      >
        <Animated.View 
          style={[
            styles.menuContainer, 
            { 
              backgroundColor: colors.surface,
              borderRadius: sizing.borderRadius,
              ...getShadow(5),
              transform: [{ scale: scaleAnim }],
              opacity: opacityAnim
            }
          ]}
        >
          <LinearGradient
            colors={isDark ? ['#323232', colors.surface] : ['#fafafa', colors.surface]}
            style={styles.menuHeader}
          >
            <Text style={[styles.menuTitle, { color: colors.text.primary }]}>Menu</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <FontAwesome5 name="times" size={16} color={colors.text.secondary} />
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
    borderBottomColor: 'rgba(0,0,0,0.05)',
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
