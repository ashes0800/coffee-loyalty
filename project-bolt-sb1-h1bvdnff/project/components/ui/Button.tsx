import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  ActivityIndicator,
  StyleProp,
  ViewStyle,
  TextStyle,
  Platform
} from 'react-native';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  fullWidth?: boolean;
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  style,
  textStyle,
  fullWidth = false,
}: ButtonProps) {
  // Get button and text styles based on variant and size
  const buttonStyles = [
    styles.button,
    styles[`button_${variant}`],
    styles[`button_${size}`],
    fullWidth && styles.fullWidth,
    disabled && styles.disabled,
    style,
  ];

  const textStyles = [
    styles.text,
    styles[`text_${variant}`],
    styles[`text_${size}`],
    disabled && styles.textDisabled,
    textStyle,
  ];

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'primary' ? 'white' : '#00704A'}
          size="small"
        />
      ) : (
        <Text style={textStyles}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    ...Platform.select({
      web: {
        cursor: 'pointer',
        userSelect: 'none',
      },
    }),
  },
  fullWidth: {
    width: '100%',
  },
  button_primary: {
    backgroundColor: '#00704A',
    borderWidth: 0,
  },
  button_secondary: {
    backgroundColor: '#f7f7f7',
    borderWidth: 0,
  },
  button_outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#00704A',
  },
  button_ghost: {
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  button_sm: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    minWidth: 80,
  },
  button_md: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    minWidth: 120,
  },
  button_lg: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    minWidth: 160,
  },
  disabled: {
    opacity: 0.6,
    ...Platform.select({
      web: {
        cursor: 'not-allowed',
      },
    }),
  },
  text: {
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
  },
  text_primary: {
    color: 'white',
  },
  text_secondary: {
    color: '#00704A',
  },
  text_outline: {
    color: '#00704A',
  },
  text_ghost: {
    color: '#00704A',
  },
  text_sm: {
    fontSize: 14,
  },
  text_md: {
    fontSize: 16,
  },
  text_lg: {
    fontSize: 18,
  },
  textDisabled: {
    opacity: 0.8,
  },
});