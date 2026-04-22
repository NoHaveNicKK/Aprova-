import { Redirect } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { inicializarBancoOffline } from './database';

export default function Index() {
  const [pronto, setPronto] = useState(false);

  useEffect(() => {
    // Garante que o perfil do André seja criado antes de abrir a tela
    inicializarBancoOffline().then(() => {
      setPronto(true);
    });
  }, []);

  if (!pronto) {
    return (
      <View style={{ flex: 1, backgroundColor: '#1E1E2E', justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#FF69B4" />
      </View>
    );
  }

  // Uma vez que o banco iniciou, ele pula direto para o Dashboard
  return <Redirect href="/dashboard" />;
}