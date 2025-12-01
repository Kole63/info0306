import { useEffect, useState } from 'react';
import * as Location from 'expo-location';
export default function useMyLocation() {
    
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const test = async () =>{
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.watchPositionAsync({}, (loc) => {
        setLocation(loc);
      });

    }

    test();
    const interval = setInterval(() => {
      test();
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, []); 
  return { location, errorMsg };
}

