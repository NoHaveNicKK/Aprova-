import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { inicializarBancoOffline } from './database';

export default function RootLayout() {
  useEffect(() => {
    inicializarBancoOffline();
  }, []);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="dashboard" />
      <Stack.Screen name="battle" />
    </Stack>
  );
}