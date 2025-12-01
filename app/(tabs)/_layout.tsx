import { FontAwesome } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function Layout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: { fontSize: 14 },
        tabBarStyle: { backgroundColor: 'lightgray' },
        tabBarIcon: ({ color, size }) => {
          let name: string = 'home';
          if (route.name === 'user') name = 'user';
          else if (route.name === 'point') name = 'university';
          else if (route.name === 'index') name = 'male';
          else if (route.name === 'gps') name = 'location-arrow';
          return <FontAwesome name={name as any} size={size} color={color} />;
        },
      })}
    >
      <Tabs.Screen name="gps" options={{ title: 'GPS' }} />
      <Tabs.Screen name="user" options={{ title: 'User' }} />
      <Tabs.Screen name="point" options={{ title: 'TP1' }} />
      <Tabs.Screen name="index" options={{ title: 'Kolé' }} />
      <Tabs.Screen name="notif" options={{ title: 'Notifications' }} />

    </Tabs>
  );
}