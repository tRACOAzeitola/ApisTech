import React, { useRef, useEffect } from 'react';
import { 
  TouchableOpacity, 
  Animated, 
  StyleSheet, 
  ViewStyle, 
  GestureResponderEvent,
  Platform,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';

interface AnimatedCardProps {
  children: React.ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
  style?: ViewStyle | ViewStyle[];
  animationDelay?: number;
  animationType?: 'fade' | 'slide' | 'scale' | 'none';
  activeOpacity?: number;
}

/**
 * Componente de cartão animado que pode ser usado para envolver qualquer componente
 * com animações de entrada e feedback de toque
 */
const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  onPress,
  style,
  animationDelay = 0,
  animationType = 'fade',
  activeOpacity = 0.7,
}) => {
  const { isDark, getShadow } = useTheme();
  
  // Ref para a animação
  const animatedValue = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(1)).current;
  
  // Configurar a animação inicial
  useEffect(() => {
    // Atraso para animação em cascata (útil para listas)
    const delay = animationDelay > 0 ? animationDelay : 0;
    
    // Não animar se o tipo for 'none'
    if (animationType === 'none') {
      animatedValue.setValue(1);
      return;
    }
    
    // Iniciar a animação após o delay
    setTimeout(() => {
      Animated.spring(animatedValue, {
        toValue: 1,
        useNativeDriver: true,
        tension: 50,
        friction: 8,
      }).start();
    }, delay);
  }, [animatedValue, animationDelay, animationType]);

  // Configurar as animações iniciais com base no tipo
  let initialTransform = {};
  switch (animationType) {
    case 'fade':
      initialTransform = { opacity: animatedValue };
      break;
    case 'slide':
      initialTransform = {
        opacity: animatedValue,
        transform: [
          {
            translateY: animatedValue.interpolate({
              inputRange: [0, 1],
              outputRange: [50, 0],
            }),
          },
        ],
      };
      break;
    case 'scale':
      initialTransform = {
        opacity: animatedValue,
        transform: [
          {
            scale: animatedValue.interpolate({
              inputRange: [0, 1],
              outputRange: [0.8, 1],
            }),
          },
        ],
      };
      break;
    case 'none':
    default:
      initialTransform = {};
      break;
  }

  // Manipuladores para animação de toque (feedback)
  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.95,
      useNativeDriver: true,
      tension: 100,
      friction: 5,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
      tension: 100,
      friction: 10,
    }).start();
  };

  return (
    <Animated.View
      style={[
        styles.container,
        isDark ? styles.containerDark : styles.containerLight,
        getShadow(2),
        style,
        initialTransform,
        {
          transform: [
            ...(initialTransform.transform || []),
            { scale: scaleValue },
          ],
        },
      ]}
    >
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={activeOpacity}
        style={styles.touchable}
      >
        {children}
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  containerLight: {
    backgroundColor: '#FFFFFF',
  },
  containerDark: {
    backgroundColor: '#151515',
  },
  touchable: {
    width: '100%',
    height: '100%',
  },
});

export default AnimatedCard;
