import React, { useEffect } from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withSequence,
  withRepeat,
  Easing 
} from 'react-native-reanimated';

interface PulseProps {
  children: React.ReactNode;
  scaleRange?: [number, number]; // [min, max] escala
  duration?: number;
  autoPlay?: boolean;
  repeat?: number;
  style?: ViewStyle;
}

/**
 * Componente que aplica uma animação de pulsar aos seus filhos
 */
const Pulse: React.FC<PulseProps> = ({
  children,
  scaleRange = [0.95, 1.05],
  duration = 500,
  autoPlay = true,
  repeat = -1, // -1 para repetir indefinidamente
  style
}) => {
  // Valor compartilhado para controlar a escala
  const scale = useSharedValue(1);

  // Configurar a animação ao montar o componente
  useEffect(() => {
    if (autoPlay) {
      startPulse();
    }
  }, [autoPlay]);

  const startPulse = () => {
    // Definir sequência de animação: normal -> ampliado -> normal
    scale.value = withRepeat(
      withSequence(
        withTiming(scaleRange[1], { 
          duration: duration / 2,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1)
        }),
        withTiming(scaleRange[0], { 
          duration: duration / 2,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1)
        }),
        withTiming(1, { 
          duration: duration / 2,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1)
        })
      ),
      repeat,
      false // não reverter a animação
    );
  };

  // Estilo animado que será aplicado
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }]
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

export default Pulse; 