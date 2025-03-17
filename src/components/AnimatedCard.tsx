import React, { useRef, useEffect } from 'react';
import { 
  TouchableOpacity, 
  Animated, 
  StyleSheet, 
  ViewStyle, 
  GestureResponderEvent,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '../context/ThemeContext';

interface AnimatedCardProps {
  children: React.ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
  style?: ViewStyle | ViewStyle[];
  animationDelay?: number;
  animationType?: 'fade' | 'slide' | 'scale' | 'none';
  activeOpacity?: number;
  useGradient?: boolean;
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
  useGradient = false,
}) => {
  const { isDark, getShadow, colors } = useTheme();
  
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
  let initialTransform: any = {};
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
      initialTransform = { transform: [] };
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

  // Definir os gradientes com base no tema com fallback seguro
  const getGradientColors = () => {
    const defaultLight = ['#FFFDF7', '#FFF8E1'];
    const defaultDark = ['#302403', '#1D1705'];
    
    if (colors.gradients?.card) {
      return isDark 
        ? colors.gradients.card.dark || defaultDark
        : colors.gradients.card.light || defaultLight;
    }
    return isDark ? defaultDark : defaultLight;
  };
  
  // Obter cor de fundo de card com fallback
  const getCardBackgroundColor = () => {
    if (isDark) {
      return colors.cardBackground?.dark || '#302403';
    }
    return colors.cardBackground?.light || '#FFFDF7';
  };

  return (
    <Animated.View
      style={[
        styles.container,
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
        {useGradient ? (
          <LinearGradient
            colors={getGradientColors()}
            style={styles.gradientContainer}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
          >
            {children}
          </LinearGradient>
        ) : (
          <Animated.View 
            style={[
              styles.contentContainer, 
              { backgroundColor: getCardBackgroundColor() }
            ]}
          >
            {children}
          </Animated.View>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  touchable: {
    width: '100%',
    height: '100%',
  },
  gradientContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
  }
});

export default AnimatedCard;

