import { useEffect, useContext, useRef } from "react";
import * as Notifications from "expo-notifications";
import { useRouter } from "expo-router";
import { GameContext } from "@/contexts/GameContext";
import { usePushNotifications } from "../../hooks/useNotification";

export default function App() {
  const { expoPushToken } = usePushNotifications();
  const gameContext = useContext(GameContext);
  const router = useRouter();

  const hasNotified = useRef(false);

  async function notifier() {
    if (!gameContext) return;

    // On évite les notifications répétées
    if (gameContext.points >= gameContext.currentCost && !hasNotified.current) {
      hasNotified.current = true;

      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Amélioration disponible",
          body: "Vous pouvez faire une amélioration !",
          data: { route: "/point" }
        },
        trigger: { seconds: 2, type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL },
      });
    }

    // Reset si plus possible d'améliorer
    if (gameContext.points < gameContext.currentCost) {
      hasNotified.current = false;
    }
  }

  useEffect(() => {
    notifier();
  }, [gameContext?.points, gameContext?.currentCost]);

  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener(response => {
      const route = response.notification.request.content.data?.route;
      if (route) router.push("./point");
    });

    return () => subscription.remove();
  }, []);

  return null;
}
