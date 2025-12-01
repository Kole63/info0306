import React from "react";
import { Text, StyleSheet, type StyleProp, type TextStyle } from 'react-native';
import { GlobalStyles } from '../constants/global_style';

interface Props {
  children?: React.ReactNode;
  style?: StyleProp<TextStyle>;
  label: string;
  unit: string;
}

export default function TextMain({ children, style, label, unit }: Props) {
 
  const defaultStyles = styles;
  const combinedStyles: StyleProp<TextStyle> = [
    GlobalStyles.globalText,
    defaultStyles.text,
    style,
  ];

  return (
    <Text style={combinedStyles}>
      {label}
      {children}
      {unit}
    </Text>
  );
}
const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: 'blue',
  },
});