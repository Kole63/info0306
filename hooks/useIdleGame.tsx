import TextMain from '@/components/TextMain';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from '@react-navigation/elements';
import { useRouter } from 'expo-router';
import { Tabs } from 'expo-router';
import { useEffect, createContext, useState } from "react";
import { Alert, TouchableOpacity} from 'react-native';

const STORAGE_KEY = 'gameData';

export default function useIdleGame() {
  const [points, setPoints] = useState(0);
  const [upgrades, setUpgrades] = useState(1);
  const [currentCost, setCurrentCost] = useState(0);
  const [initialized, setInitialized] = useState(false);
  const GameContext = createContext(null);
  const cost = Math.floor(Math.random() * 10000) + 1;
  const router = useRouter();
  const nav = ()=>{
    router.push('./point');
  }

  // Charger les données
  useEffect(() => {
    let active = true;

    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (!raw || !active) {
          setInitialized(true);
          return;
        }

        const parsed = JSON.parse(raw);

        if (typeof parsed.P === 'number') setPoints(parsed.P);
        if (typeof parsed.PS === 'number') setUpgrades(parsed.PS);
        if (typeof parsed.CA === 'number') setCurrentCost(parsed.CA);
      } catch (e) {
        console.warn('Failed to load game data', e);
      }

      setInitialized(true);
    })();

    return () => { active = false; };
  }, []);

  // Générer coût quand points >= 10000
  useEffect(() => {
    if (!initialized) return;
    if (points >= 10000 && currentCost === 0) {
      setCurrentCost(cost);
    }
  }, [points, currentCost, initialized]);

  // Incrémentation automatique
  useEffect(() => {
    if (!initialized) return;

    const interval = setInterval(() => {
      setPoints(prev => prev + (upgrades > 0 ? upgrades : 1));
    }, 2000);

    return () => clearInterval(interval);
  }, [upgrades, initialized]);

  // Sauvegarde
  useEffect(() => {
    if (!initialized) return;

    const data = { P: points, PS: upgrades, CA: currentCost };
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data))
      .catch(e => console.warn('Failed to save game data', e));

  }, [points, upgrades, currentCost, initialized]);
//fonction upgrade avec un parametre optionnelle
  function upgrade(doubler = false) {
    if (currentCost <= 0) {
      return { success: false, message: "Aucune amélioration disponible." };
    }

    if (points >= currentCost && points > 0 && doubler === false) {
      setPoints(prev => prev - currentCost);
      setUpgrades(prev => prev + 1);
      setCurrentCost(cost);
      return { success: true, message: "Amélioration achetée !" };
    } 
    else if (points >= 2*currentCost && points > 0 && doubler === true) {
      setPoints(prev => prev - currentCost * 2);
      setUpgrades(prev => prev + 1);
      setCurrentCost(cost)
      return { success: true, message: "Amélioration achetée !" };
    }


    return {
      success: false,
      message: `Il faut ${currentCost} points, mais tu n'en as que ${points}.`
    };
  }
  // function notifier() {
  //   if (points >= currentCost) {  x
  //     <TextMain label='' unit=''>Voulez-vous navigeur vers le TP1 ?</TextMain>
      
  //   }
  // }
  return { points, upgrades, currentCost, upgrade, initialized};
}
