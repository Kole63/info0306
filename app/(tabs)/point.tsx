// tp1/components/CustomImage.tsx
import { useGame } from '@/hooks/useGame';
// import { Button } from '@react-navigation/elements';
import React from 'react';
import { Image } from 'react-native';
import '../../assets/images/icon.png';
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native';
import TextMain from '../../components/TextMain';
import MonButton from '../../components/button';
import MonImage from '../../components/MonImage';



export default function CustomImage() {
  const { points, upgrades, currentCost, upgrade } = useGame();
  const notifyInsufficientPoints = () => {
    const result = upgrade();
    if (!result?.success) {
      Alert.alert(result!.message);
      return;
    }
  };
  return (
    <>
      <MonImage
        source={require('../../assets/images/icon.png')}
      />
      <TextMain label="" unit="">Bienvenue dans l'écran du TP1 !</TextMain>

      <TextMain label="Points : " unit="">{points}</TextMain>
      <TextMain label="Améliorations : " unit="">{upgrades}</TextMain>
      <View>
        <TextMain label="Coût de l'amélioration : " unit=" points">
          {currentCost}
        </TextMain>
          {currentCost > points ? (
          <MonButton onPress={notifyInsufficientPoints} label='Points insuffisants'/>
          ) : (
            <MonButton onPress={() => upgrade()} label='Acheter Amélioration'/>
          )}
      </View>
    </>
  );
}
