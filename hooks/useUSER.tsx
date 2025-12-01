import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState, useContext, createContext} from 'react';
import { Alert } from 'react-native';

const STORAGE_KEY = 'usersList';

export default function useUser() {
  const [name, setName] = useState('');
  const [users, setUsers] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) {
          setUsers(JSON.parse(raw));
        }
      } catch (e) {
        console.warn('Echec de chargement des utilisateurs', e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(users));
      } catch (e) {
        console.warn('Echec de sauvegarde des utilisateurs', e);
      }
    })();
  }, [users]);

  function addUser() {
    const chaine = name.trim();
    if (!chaine) {
      Alert.alert("Nom vide", "Veuillez saisir un nom d'utilisateur.");
      return;
    }

    setUsers(prev => [chaine, ...prev]);
    setName('');
  }
  function deleteUser(index: number) {
    setUsers(prev => prev.filter((_, i) => i !== index));
  }
    return { name, setName, users, addUser, deleteUser };
}