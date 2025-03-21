import { Vibration, Platform } from 'react-native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

// Configuração para o feedback tátil
const hapticOptions = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false
};

/**
 * Tipos de feedback disponíveis
 */
export enum FeedbackType {
  Success = 'success',
  Warning = 'warning',
  Error = 'error',
  Impact = 'impact',
  Selection = 'selection'
}

/**
 * Fornece feedback tátil com base no tipo especificado
 */
export const triggerHaptic = (type: FeedbackType) => {
  try {
    if (Platform.OS === 'ios') {
      // Usa HapticFeedback em iOS para feedback mais refinado
      switch (type) {
        case FeedbackType.Success:
          ReactNativeHapticFeedback.trigger('notificationSuccess', hapticOptions);
          break;
        case FeedbackType.Warning:
          ReactNativeHapticFeedback.trigger('notificationWarning', hapticOptions);
          break;
        case FeedbackType.Error:
          ReactNativeHapticFeedback.trigger('notificationError', hapticOptions);
          break;
        case FeedbackType.Impact:
          ReactNativeHapticFeedback.trigger('impactMedium', hapticOptions);
          break;
        case FeedbackType.Selection:
          ReactNativeHapticFeedback.trigger('selection', hapticOptions);
          break;
        default:
          ReactNativeHapticFeedback.trigger('impactLight', hapticOptions);
      }
    } else {
      // Em Android, use padrões de vibração diferentes para diferentes tipos
      switch (type) {
        case FeedbackType.Success:
          Vibration.vibrate([0, 50]);
          break;
        case FeedbackType.Warning:
          Vibration.vibrate([0, 75, 50, 75]);
          break;
        case FeedbackType.Error:
          Vibration.vibrate([0, 100, 50, 100]);
          break;
        case FeedbackType.Impact:
          Vibration.vibrate(80);
          break;
        case FeedbackType.Selection:
          Vibration.vibrate(40);
          break;
        default:
          Vibration.vibrate(30);
      }
    }
  } catch (error) {
    console.warn('Feedback tátil não disponível:', error);
  }
};

// Exporta tudo como um objeto para facilitar a importação
export const Feedback = {
  triggerHaptic,
  FeedbackType
}; 