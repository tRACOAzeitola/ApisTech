import React, { useEffect } from 'react';
import { StyleSheet, Dimensions, ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  runOnJS
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

interface ScreenTransitionProps {
  children: React.ReactNode;
  type?: 'fade' | 'slide' | 'scale';
  direction?: 'left' | 'right' | 'up' | 'down';
  duration?: number;
  style?: ViewStyle;
  onAnimationComplete?: () => void;
}

/**
 * Componente que anima transições entre telas
 */
const ScreenTransition: React.FC<ScreenTransitionProps> = ({
  children,
  type = 'fade',
  direction = 'right',
  duration = 300,
  style,
  onAnimationComplete
}) => {
  // Valores compartilhados para animações
  const opacity = useSharedValue(0);
  const translateX = useSharedValue(
    type === 'slide' && direction === 'left' ? width : 
    type === 'slide' && direction === 'right' ? -width : 0
  );
  const translateY = useSharedValue(
    type === 'slide' && direction === 'up' ? height : 
    type === 'slide' && direction === 'down' ? -height : 0
  );
  const scale = useSharedValue(type === 'scale' ? 0.8 : 1);

  // Configuração da animação
  const animationConfig = {
    duration,
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
  };

  // Função para notificar que a animação está completa
  const notifyAnimationComplete = () => {
    if (onAnimationComplete) {
      onAnimationComplete();
    }
  };

  // Iniciar a animação de entrada quando o componente é montado
  useEffect(() => {
    opacity.value = withTiming(1, animationConfig, (finished) => {
      if (finished && onAnimationComplete) {
        runOnJS(notifyAnimationComplete)();
      }
    });
    translateX.value = withTiming(0, animationConfig);
    translateY.value = withTiming(0, animationConfig);
    scale.value = withTiming(1, animationConfig);
  }, []);

  // Estilo animado baseado no tipo de transição
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { scale: scale.value }
      ]
    };
  });

  return (
    <Animated.View style={[styles.container, style, animatedStyle]}>
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default ScreenTransition; 