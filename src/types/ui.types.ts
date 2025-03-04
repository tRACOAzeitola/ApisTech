/**
 * Tipos relacionados aos componentes de UI
 */

import { ReactNode } from 'react';
import { TextStyle, ViewStyle } from 'react-native';
import { IconFamily } from './product.types';

export type ThemeColors = {
  primary: string;
  primaryDark: string;
  primaryLight: string;
  background: {
    dark: string;
    medium: string;
    light: string;
  };
  text: {
    primary: string;
    secondary: string;
    disabled: string;
  };
  states: {
    success: string;
    error: string;
    warning: string;
    info: string;
  };
  categories: {
    [key: string]: string;
  };
  border: string;
  divider: string;
  overlay: string;
};

export type IconProps = {
  name: string;
  family: IconFamily;
  size?: number;
  color?: string;
  style?: ViewStyle;
};

export type ButtonProps = {
  text: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'small' | 'medium' | 'large';
  icon?: string;
  iconFamily?: IconFamily;
  iconPosition?: 'left' | 'right';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  fullWidth?: boolean;
};

export type CardProps = {
  children: ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
  elevation?: 'none' | 'small' | 'medium' | 'large';
  borderRadius?: number;
};
