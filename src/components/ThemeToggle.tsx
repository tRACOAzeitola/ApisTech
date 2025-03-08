import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../context/ThemeContext';

interface ThemeToggleProps {
  compact?: boolean;
  style?: any;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ compact = false, style }) => {
  const { theme, isDark, toggleTheme, themeMode, setThemeMode, colors } = useTheme();

  const handleToggleTheme = () => {
    toggleTheme();
    
    // Se estiver no modo sistema, mudar para manual quando alternar o tema manualmente
    if (themeMode === 'system') {
      setThemeMode('manual');
    }
  };

  const toggleThemeMode = () => {
    setThemeMode(themeMode === 'system' ? 'manual' : 'system');
  };

  if (compact) {
    return (
      <TouchableOpacity 
        style={[styles.compactContainer, style]}
        onPress={handleToggleTheme}
      >
        <Ionicons 
          name={isDark ? 'moon' : 'sunny'} 
          size={22} 
          color={isDark ? colors.accent.dark : colors.primary.light}
        />
      </TouchableOpacity>
    );
  }

  return (
    <View style={[styles.container, style]}>
      <View style={styles.row}>
        <Text style={[styles.label, { color: colors.text.primary }]}>
          Tema {isDark ? 'escuro' : 'claro'}
        </Text>
        <Switch
          value={isDark}
          onValueChange={handleToggleTheme}
          trackColor={{
            false: colors.switch.inactiveTrack.light,
            true: colors.switch.activeTrack.dark,
          }}
          thumbColor={colors.switch.thumb.light}
          ios_backgroundColor={colors.switch.inactiveTrack.light}
        />
      </View>
      
      <View style={styles.row}>
        <Text style={[styles.label, { color: colors.text.primary }]}>
          Usar tema do sistema
        </Text>
        <Switch
          value={themeMode === 'system'}
          onValueChange={toggleThemeMode}
          trackColor={{
            false: colors.switch.inactiveTrack.light,
            true: colors.switch.activeTrack.dark,
          }}
          thumbColor={colors.switch.thumb.light}
          ios_backgroundColor={colors.switch.inactiveTrack.light}
        />
      </View>
      
      <View style={styles.infoContainer}>
        <Ionicons name="information-circle-outline" size={16} color={colors.text.secondary} />
        <Text style={[styles.infoText, { color: colors.text.secondary }]}>
          {themeMode === 'system' 
            ? 'A app segue o tema do seu dispositivo' 
            : 'Tema definido manualmente'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.1)',
    marginHorizontal: 16,
    marginVertical: 8,
  },
  compactContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  infoText: {
    fontSize: 12,
    marginLeft: 6,
  },
});

export default ThemeToggle;
