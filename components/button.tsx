import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";

interface Props {
  label: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

export default function MainButton({ label, onPress, style}: Props) {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={[styles.text]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignSelf: "center",       // centre automatiquement
    width: "60%",              // 80% de la largeur de l'écran
    maxWidth: 350,             // limite pour grands écrans
    minWidth: 200,             // limite pour petits écrans

    backgroundColor: "#007bff",
    paddingVertical: 14,
    paddingHorizontal: 20,

    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",

    elevation: 2,               // ombre Android
    shadowColor: "#000",        // ombre iOS
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
  },

  text: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
  },
});
