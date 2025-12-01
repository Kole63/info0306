import React, { useEffect, useState, useContext } from "react";
import useMyLocation from "@/hooks/useGPS";
import { GameContext } from "@/contexts/GameContext";
import TextMain from "./TextMain";
import { View, StyleSheet, ActivityIndicator, Alert } from "react-native";
import MapView, { Marker, Circle, Region } from "react-native-maps";
import { Button } from "@react-navigation/elements";

const BUILDING_LAT = 49.243944;
const BUILDING_LON = 4.062722;

export default function GpsScreen() {
  const { location } = useMyLocation();
  const [region, setRegion] = useState<Region | null>(null);
  const [expanded, setExpanded] = useState(false);
  const gameContext = useContext(GameContext);

  useEffect(() => {
    if (location?.coords) {
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }
  }, [location]);

  if (!region) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const isNearBuilding = () => {
    const dLat = Math.abs(region.latitude - BUILDING_LAT);
    const dLon = Math.abs(region.longitude - BUILDING_LON);
    return dLat < 0.005 && dLon < 0.005; // ≈500m
  };

  function handleUpgradePress() {
    //si le cout de l'amelioration est inferieure au point alert
    if (isNearBuilding()) {
      const result = gameContext?.upgrade(true);
      if (!result?.success) {
        Alert.alert("Points insuffisants");
        return;
      }
      Alert.alert("Cout de l'amelioration doublé");
      return gameContext!.currentCost * 2;
    }
  }

  return (
    <View style={styles.container}>
      {/* CARTE AVEC STYLE QUI CHANGE SELON expanded */}
      <MapView
        style={expanded ? styles.mapExpanded : styles.map}
        region={region}
      >
        <Marker
          coordinate={{
            latitude: region.latitude,
            longitude: region.longitude,
          }}
          title="Votre position"
        />

        <Marker
          coordinate={{ latitude: BUILDING_LAT, longitude: BUILDING_LON }}
          title="Bâtiment 2-3"
          pinColor="red"
        />

        <Circle
          center={{ latitude: BUILDING_LAT, longitude: BUILDING_LON }}
          radius={500}
          strokeColor="rgba(255,0,0,0.7)"
          fillColor="rgba(255,0,0,0.2)"
        />
      </MapView>

      {/* BOUTON QUI AGRANDIT OU RÉDUIT */}
      <Button style={styles.ouvrir} onPress={() => setExpanded(!expanded)}>
        {expanded ? "Réduire la carte" : "Ouvrir la carte"}
      </Button>
      {expanded ? (
        <TextMain
          style={[styles.title, { color: isNearBuilding() ? "red" : "black" }]}
          label=""
          unit=""
        ></TextMain>
      ) : (
        <View>
          <TextMain
            style={[
              styles.title,
              { color: isNearBuilding() ? "red" : "black" },
            ]}
            label=""
            unit=""
          >
            Points: {gameContext?.points}
          </TextMain>
          <TextMain
            style={[
              styles.title,
              { color: isNearBuilding() ? "red" : "black" },
            ]}
            label=""
            unit=""
          >
            Ameliorations: {gameContext?.upgrades}
          </TextMain>
          <TextMain
            style={[
              styles.title,
              { color: isNearBuilding() ? "red" : "black" },
            ]}
            label=""
            unit=""
          >
            Coût de l'amélioration:{" "}
            {isNearBuilding()
              ? `${gameContext!.currentCost * 2}`
              : `${gameContext!.currentCost}`}
          </TextMain>

          <Button style={styles.button} onPress={handleUpgradePress}>
            {isNearBuilding()
              ? "Vous êtes près du bâtiment\nLe coût est doublé"
              : "Acheter amélioration "}
          </Button>
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF3E0", position: "relative" },
  map: {
    width: "50%",
    height: "10%",
    justifyContent: "center",
    alignSelf: "center",
  },
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, textAlign: "center", marginTop: 10 },
  button: {
    width: "50%",
    padding: 10,
    backgroundColor: "#0c0606ff",
    borderRadius: 5,
    alignItems: "center",
    marginTop: 15,
    alignSelf: "center",
  },
  ouvrir: {
    width: "50%",
    padding: 10,
    backgroundColor: "#0c0606ff",
    borderRadius: 5,
    alignItems: "center",
    marginTop: 15,
    alignSelf: "center",
  },
  mapExpanded: {
    width: "100%",
    height: "90%", // ou 100% si tu veux plein écran total
    alignSelf: "center",
  },
});
