// tp1/components/CustomImage.tsx
import { useGame } from '@/hooks/useGame';
import { Button } from '@react-navigation/elements';
import React from 'react';
import { Image } from 'react-native';
import '../assets/images/icon.png';
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native';
import TextMain from './TextMain';

export default function CustomImage() {
  const { points, upgrades, currentCost, upgrade } = useGame();
  const notifyInsufficientPoints = () => {
    Alert.alert('Points insuffisants', 'Vous n\'avez pas assez de points pour acheter cette amélioration.');
  };
  return (
    <>
      <Image
        source={require('../assets/images/icon.png')}
        style={styles.image}
      />
      <TextMain label="" unit="">Bienvenue dans l'écran du TP1 !</TextMain>

      <TextMain label="Points : " unit="">{points}</TextMain>
      <TextMain label="Améliorations : " unit="">{upgrades}</TextMain>
      <View>
        <TextMain label="Coût de l'amélioration : " unit=" points">
          {currentCost}
        </TextMain>

        <TouchableOpacity style={styles.button} onPress={() => upgrade()}>
          {currentCost > points ? (
            <Button style={styles.button} onPress={notifyInsufficientPoints}>
              Points insuffisants
            </Button>
          ) : (
            <Button style={styles.button} onPress={() => upgrade()}>
              Acheter Amélioration
            </Button>
          )}
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  button: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#0c0606ff',
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  }
});
