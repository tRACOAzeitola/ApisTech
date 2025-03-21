import React, { useEffect } from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  Easing
} from 'react-native-reanimated';

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  style?: ViewStyle;
}

/**
 * Componente que aplica uma animação fade-in aos seus filhos
 */
const FadeIn: React.FC<FadeInProps> = ({
  children,
  delay = 0,
  duration = 300,
  style
}) => {
  // Valor compartilhado para controlar a opacidade
  const opacity = useSharedValue(0);

  // Configurar a animação ao montar o componente
  useEffect(() => {
    // Atraso opcional antes de iniciar a animação
    const timer = setTimeout(() => {
      opacity.value = withTiming(1, {
        duration,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      });
    }, delay);

    return () => clearTimeout(timer);
  }, [opacity, delay, duration]);

  // Estilo animado que será aplicado
  const animatedStyle = useAnimatedStyle(() => {
    return {
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

export default FadeIn; 