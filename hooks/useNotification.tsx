import { useState, useEffect } from 'react';
import { Platform, Alert } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});
export function usePushNotifications() {
  const [expoPushToken, setExpoPushToken] = useState<string>('');
  const [channels, setChannels] = useState<Notifications.NotificationChannel[]>([]);
  const [notification, setNotification] = useState<Notifications.Notification | null>(null);

  useEffect(() => {
    // Enregistrement pour les notifications push
    registerForPushNotificationsAsync().then(token => {
      if (token) setExpoPushToken(token);
    });

    // Sur Android, récupérer les canaux existants
    if (Platform.OS === 'android') {
      Notifications.getNotificationChannelsAsync().then(channels => {
        setChannels(channels ?? []);
      });
    }

    // Écoute les notifications reçues
    const notificationListener = Notifications.addNotificationReceivedListener(notif => {
      setNotification(notif);

      // Action spécifique : afficher une alerte
      Alert.alert(
        notif.request.content.title ?? 'Notification',
        notif.request.content.body ?? 'Vous avez reçu une notification',
      );
    });

    // 4️⃣ Écoute les réponses aux notifications (clic sur la notification)
    const responseListener = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('Réponse à la notification:', response);
    });

    // Nettoyage à la désactivation du composant
    return () => {
      notificationListener.remove();
      responseListener.remove();
    };
  }, []);

  return { expoPushToken, channels, notification };
}

// Fonction pour s'enregistrer et récupérer le token push
async function registerForPushNotificationsAsync(): Promise<string | undefined> {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'Default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      alert('Impossible d’obtenir le token pour les notifications push!');
      return;
    }

    try {
      const projectId =
        Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;

      if (!projectId) throw new Error('Project ID introuvable');

      token = (await Notifications.getExpoPushTokenAsync({ projectId })).data;
      console.log('Token push:', token);
    } catch (e) {
      console.log('Erreur push token:', e);
      token = undefined;
    }
  } else {
    alert('Les notifications push nécessitent un appareil physique.');
  }
    
  return token;
}
