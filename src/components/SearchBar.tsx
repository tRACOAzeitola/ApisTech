import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useTheme } from '../context/ThemeContext';

interface SearchBarProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  onClear: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder,
  value,
  onChangeText,
  onClear,
}) => {
  const { colors } = useTheme();
  return (
    <View style={[
      styles.container, 
      { 
        backgroundColor: '#151515', // Cor escura como na imagem de referência
        borderColor: 'rgba(255,255,255,0.1)',
        borderWidth: 0.5,
        borderRadius: 8,
      }
    ]}>
      <FontAwesome5 
        name="search" 
        size={16} 
        color="#666666" 
        style={styles.searchIcon} 
      />
      <TextInput
        style={[styles.input, { color: '#FFFFFF' }]}
        placeholder={placeholder}
        placeholderTextColor="#666666"
        value={value}
        onChangeText={onChangeText}
        selectionColor="#007AFF"
      />
      {value.length > 0 && (
        <TouchableOpacity onPress={onClear} style={styles.clearButton}>
          <FontAwesome5 name="times-circle" size={16} color="#666666" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginHorizontal: 16,
    marginVertical: 12,
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 15,
    paddingVertical: 0,
    fontWeight: '400',
    paddingHorizontal: 2,
  },
  clearButton: {
    padding: 6,
  },
});

export default SearchBar;
