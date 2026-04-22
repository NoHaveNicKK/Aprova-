import { router, useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Tooltip } from '../components/tooltip';
import { obterJogador } from './database';

export default function ProfileScreen() {
  const [jogador, setJogador] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useFocusEffect(
    useCallback(() => {
      setCarregando(true);
      obterJogador().then(dados => {
        if (dados) setJogador(dados);
        setCarregando(false);
      });
    }, [])
  );

  if (carregando || !jogador) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#FF69B4" />
      </View>
    );
  }

  // Lista de matérias para as barras de progresso
  const materias = [
    { nome: 'Matemática', cor: '#FF4500', chave: 'matemática' },
    { nome: 'Biologia', cor: '#32CD32', chave: 'biologia' },
    { nome: 'História', cor: '#FFD700', chave: 'história' },
    { nome: 'Português', cor: '#00BFFF', chave: 'português' },
    { nome: 'Química', cor: '#9370DB', chave: 'química' },
  ];

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Tooltip text="Voltar ao dashboard">
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Text style={{color: '#FFF', fontSize: 20}}>←</Text>
          </TouchableOpacity>
        </Tooltip>
        <Text style={styles.headerTitle}>Status do Herói</Text>
        <View style={{width: 40}} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* CARD DO AVATAR */}
        <View style={styles.avatarCard}>
          <Text style={{fontSize: 70}}>{jogador.avatar || "🥷"}</Text>
          <Text style={styles.playerName}>{jogador.nome}</Text>
          <View style={styles.levelBadge}>
            <Text style={styles.levelBadgeText}>NÍVEL {jogador.nivel}</Text>
          </View>
        </View>

        {/* ESTATÍSTICAS GERAIS */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statVal}>{jogador.total_questoes}</Text>
            <Text style={styles.statLab}>BATALHAS</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statVal}>{jogador.acertos}</Text>
            <Text style={styles.statLab}>ACERTOS</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statVal}>{jogador.streak}d</Text>
            <Text style={styles.statLab}>OFENSIVA</Text>
          </View>
        </View>

        {/* DOMÍNIO POR MATÉRIA (BARRAS COLORIDAS) */}
        <Text style={styles.sectionTitle}>Domínio de Disciplinas</Text>
        <View style={styles.profContainer}>
          {materias.map((m) => {
            const acertos = jogador.acertosPorMateria?.[m.chave] || 0;
            // A cada 10 acertos a barra enche 100%
            const porcentagem = Math.min((acertos / 10) * 100, 100);

            return (
              <View key={m.nome} style={styles.materiaRow}>
                <View style={styles.materiaInfo}>
                  <Text style={styles.materiaName}>{m.nome}</Text>
                  <Text style={styles.materiaCount}>{acertos} acertos</Text>
                </View>
                <View style={styles.barBg}>
                  <View style={[styles.barFill, { width: `${porcentagem}%`, backgroundColor: m.cor }]} />
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1E1E2E', padding: 25, paddingTop: 50 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 25 },
  headerTitle: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  backBtn: { backgroundColor: '#2A2A3C', width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  
  avatarCard: { backgroundColor: '#2A2A3C', borderRadius: 25, padding: 25, alignItems: 'center', marginBottom: 25, borderWidth: 1, borderColor: '#8A2BE2' },
  playerName: { color: '#FFF', fontSize: 22, fontWeight: 'bold', marginTop: 10 },
  levelBadge: { backgroundColor: '#8A2BE2', paddingHorizontal: 15, paddingVertical: 5, borderRadius: 20, marginTop: 10 },
  levelBadgeText: { color: '#FFF', fontWeight: 'bold', fontSize: 12 },

  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 },
  statBox: { flex: 1, backgroundColor: '#2A2A3C', marginHorizontal: 5, padding: 15, borderRadius: 15, alignItems: 'center' },
  statVal: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  statLab: { color: '#888', fontSize: 10 },

  sectionTitle: { color: '#FF69B4', fontSize: 14, fontWeight: 'bold', marginBottom: 15, textTransform: 'uppercase' },
  profContainer: { backgroundColor: '#2A2A3C', borderRadius: 20, padding: 20, marginBottom: 30 },
  materiaRow: { marginBottom: 18 },
  materiaInfo: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  materiaName: { color: '#FFF', fontWeight: 'bold', fontSize: 14 },
  materiaCount: { color: '#888', fontSize: 11 },
  barBg: { height: 8, backgroundColor: '#1E1E2E', borderRadius: 4, overflow: 'hidden' },
  barFill: { height: '100%', borderRadius: 4 },
});