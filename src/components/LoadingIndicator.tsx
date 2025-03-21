import React, { useEffect } from 'react';
import { StyleSheet, View, Text, ActivityIndicator, ViewStyle } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withRepeat, 
  withTiming,
  withSequence,
  Easing
} from 'react-native-reanimated';
import { useTheme } from '../context/ThemeContext';
import { scale } from '../utils/responsive';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

interface LoadingIndicatorProps {
  message?: string;
  visible?: boolean;
  type?: 'default' | 'overlay' | 'inline' | 'minimal';
  size?: 'small' | 'large';
  style?: ViewStyle;
}

/**
 * Componente de indicador de carregamento com animação e mensagem opcional
 */
const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  message,
  visible = true,
  type = 'default',
  size = 'large',
  style
}) => {
  const { colors, isDark } = useTheme();
  
  // Valores compartilhados para animações
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.8);
  const rotation = useSharedValue(0);
  
  // Iniciar animações quando o componente ficar visível
  useEffect(() => {
    if (visible) {
      opacity.value = withTiming(1, { duration: 300 });
      scale.value = withTiming(1, { duration: 400 });
      rotation.value = withRepeat(
        withSequence(
          withTiming(360, { 
            duration: 1000,
            easing: Easing.linear
          })
        ),
        -1, // Repetir indefinidamente
        false // Não reverter
      );
    } else {
      opacity.value = withTiming(0, { duration: 200 });
      scale.value = withTiming(0.8, { duration: 250 });
    }
  }, [visible, opacity, scale, rotation]);
  
  // Estilos animados
  const containerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ scale: scale.value }]
    };
  });
  
  const iconAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ 
        rotateZ: `${rotation.value}deg` 
      }]
    };
  });
  
  // Se não estiver visível, não renderizar nada
  if (!visible) return null;
  
  // Renderização condicional baseada no tipo
  const renderContent = () => {
    if (type === 'minimal') {
      return (
        <ActivityIndicator 
          size={size} 
          color={isDark ? colors.primary : colors.primaryDark} 
        />
      );
    }
    
    return (
      <View style={styles.contentContainer}>
        <Animated.View style={[styles.iconContainer, iconAnimatedStyle]}>
          <FontAwesome5 
            name="hexagon" 
            size={size === 'large' ? 30 : 20} 
            color={isDark ? colors.primary : colors.primaryDark} 
          />
        </Animated.View>
        
        {message && (
          <Text style={[
            styles.message, 
            { 
              color: isDark ? colors.text?.dark?.secondary : colors.text?.light?.secondary,
              fontSize: size === 'large' ? scale(16) : scale(14)
            }
          ]}>
            {message}
          </Text>
        )}
      </View>
    );
  };
  
  // Renderizar com base no tipo
  if (type === 'overlay') {
    return (
      <View style={[styles.overlayContainer, { backgroundColor: 'rgba(0,0,0,0.7)' }]}>
        <Animated.View style={[styles.container, style, containerAnimatedStyle]}>
          {renderContent()}
        </Animated.View>
      </View>
    );
  }
  
  if (type === 'inline') {
    return (
      <Animated.View style={[styles.inlineContainer, style, containerAnimatedStyle]}>
        {renderContent()}
      </Animated.View>
    );
  }
  
  return (
    <Animated.View style={[styles.container, style, containerAnimatedStyle]}>
      {renderContent()}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  overlayContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  container: {
    padding: scale(20),
    borderRadius: scale(12),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(20, 20, 20, 0.9)',
  },
  inlineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: scale(10),
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: scale(10),
  },
  message: {
    textAlign: 'center',
    marginTop: scale(8),
  }
});

export default LoadingIndicator; 