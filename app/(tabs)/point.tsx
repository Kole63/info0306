// tp1/app/(tabs)/explore.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import CustomImage from '../../components/point';

export default function ExploreScreen() {
  return (
    <View style={styles.container}>
      <CustomImage />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
});
