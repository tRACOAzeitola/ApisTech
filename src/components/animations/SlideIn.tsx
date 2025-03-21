import React, { useEffect } from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  Easing,
  WithTimingConfig
} from 'react-native-reanimated';

// Direções possíveis para o slide
export type SlideDirection = 'left' | 'right' | 'up' | 'down';

interface SlideInProps {
  children: React.ReactNode;
  direction?: SlideDirection;
  delay?: number;
  duration?: number;
  distance?: number;
  style?: ViewStyle;
}

/**
 * Componente que aplica uma animação slide-in aos seus filhos
 */
const SlideIn: React.FC<SlideInProps> = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 400,
  distance = 50,
  style
}) => {
  // Valores compartilhados para controlar a transformação
  const translateX = useSharedValue(direction === 'left' ? distance : direction === 'right' ? -distance : 0);
  const translateY = useSharedValue(direction === 'up' ? distance : direction === 'down' ? -distance : 0);
  const opacity = useSharedValue(0);

  // Configuração da animação
  const timingConfig: WithTimingConfig = {
    duration,
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
  };

  // Configurar a animação ao montar o componente
  useEffect(() => {
    // Atraso opcional antes de iniciar a animação
    const timer = setTimeout(() => {
      translateX.value = withTiming(0, timingConfig);
      translateY.value = withTiming(0, timingConfig);
      opacity.value = withTiming(1, timingConfig);
    }, delay);

    return () => clearTimeout(timer);
  }, [translateX, translateY, opacity, delay, timingConfig]);

  // Estilo animado que será aplicado
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value }
      ],
      opacity: opacity.value,
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
    // Estilos padrão para o contêiner, podem ser sobrescritos pelas props
  },
});

export default SlideIn; 