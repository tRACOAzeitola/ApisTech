import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Modal,
  FlatList
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { MenuOption } from '../types';
import { MENU_OPTIONS } from '../data/mockData';

interface MenuProps {
  visible: boolean;
  onClose: () => void;
  onSelectOption: (option: MenuOption) => void;
}

const Menu: React.FC<MenuProps> = ({ visible, onClose, onSelectOption }) => {
  const renderIcon = (iconName: string) => {
    if (iconName === 'alert-triangle') {
      return <FontAwesome name="exclamation-triangle" size={20} color="#FFFFFF" />;
    } else if (iconName === 'chart-line') {
      return <FontAwesome name="bar-chart" size={20} color="#FFFFFF" />;
    } else {
      return <MaterialCommunityIcons name={iconName as any} size={20} color="#FFFFFF" />;
    }
  };

  const renderItem = ({ item }: { item: MenuOption }) => (
    <TouchableOpacity 
      style={styles.menuItem} 
      onPress={() => {
        onSelectOption(item);
        onClose();
      }}
    >
      <View style={styles.iconContainer}>
        {renderIcon(item.icon)}
      </View>
      <Text style={styles.menuItemText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity 
        style={styles.modalOverlay} 
        activeOpacity={1} 
        onPress={onClose}
      >
        <View style={styles.menuContainer}>
          <FlatList
            data={MENU_OPTIONS}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  menuContainer: {
    width: 200,
    backgroundColor: '#333333',
    borderRadius: 8,
    marginTop: 60,
    marginRight: 10,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  iconContainer: {
    width: 24,
    marginRight: 12,
    alignItems: 'center',
  },
  menuItemText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default Menu;
