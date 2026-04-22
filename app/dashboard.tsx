import { router, useFocusEffect } from 'expo-router';
import React, { useCallback, useRef, useState } from 'react';
import { ActivityIndicator, Animated, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Tooltip } from '../components/tooltip';
import { obterJogador, salvarJogador } from './database';

export default function DashboardScreen() {
  const [jogador, setJogador] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const animacaoXP = useRef(new Animated.Value(0)).current;

  // Lista de avatares disponíveis (Herois do Conhecimento)
  const avataresDisponiveis = ["🥷", "🧙‍♂️", "👩‍🚀", "🤖", "🧛", "🧟", "🦸‍♂️", "🧝‍♀️", "🐯", "🐲", "🐱"];

  useFocusEffect(
    useCallback(() => {
      obterJogador().then(dados => {
        if (dados) {
          setJogador(dados);
          Animated.timing(animacaoXP, { 
            toValue: (dados.xp / 500) * 100, 
            duration: 1200, 
            useNativeDriver: false 
          }).start();
        }
      });
    }, [])
  );

  const mudarAvatar = async (novoEmoji) => {
    const novosDados = { ...jogador, avatar: novoEmoji };
    setJogador(novosDados);
    await salvarJogador(novosDados);
    setModalVisible(false);
  };

  const larguraBarra = animacaoXP.interpolate({ 
    inputRange: [0, 100], 
    outputRange: ['0%', '100%'] 
  });

  if (!jogador) return <ActivityIndicator size="large" color="#FF69B4" style={{flex:1, backgroundColor:'#1E1E2E'}}/>;

  return (
    <View style={styles.container}>
      {/* HEADER PREMIUM */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Bem-vindo, {jogador.nome}!</Text>
          <Text style={styles.subGreeting}>Sua jornada épica continua...</Text>
        </View>
        <Tooltip text="Ver status do herói">
          <TouchableOpacity style={styles.profileBtn} onPress={() => router.push('/profile')}>
             <Text style={{fontSize: 22}}>📊</Text>
          </TouchableOpacity>
        </Tooltip>
      </View>

      {/* ÁREA DO AVATAR E NÍVEL */}
      <View style={styles.avatarCard}>
        <Tooltip text="Mudar herói">
          <TouchableOpacity style={styles.avatarCircle} onPress={() => setModalVisible(true)}>
            <Text style={styles.avatarEmoji}>{jogador.avatar || "👤"}</Text>
            <View style={styles.editBadge}><Text style={{fontSize: 10}}>✏️</Text></View>
          </TouchableOpacity>
        </Tooltip>
        
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{jogador.nivel}</Text>
            <Text style={styles.statLabel}>NÍVEL</Text>
          </View>
          <View style={[styles.statBox, {borderLeftWidth: 1, borderRightWidth: 1, borderColor: '#444'}]}>
            <Text style={styles.statValue}>{jogador.streak}</Text>
            <Text style={styles.statLabel}>DIAS CONSECUTIVOS </Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{jogador.acertos}</Text>
            <Text style={styles.statLabel}>ACERTOS</Text>
          </View>
        </View>
      </View>

      {/* BARRA DE PROGRESSO ESTILIZADA */}
      <View style={styles.progressSection}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressTitle}>Progresso de Nível</Text>
          <Text style={styles.xpText}>{jogador.xp}/500 XP</Text>
        </View>
        <View style={styles.barContainer}>
          <Animated.View style={[styles.barFill, { width: larguraBarra }]} />
        </View>
      </View>

      {/* BOTÃO DE AÇÃO PRINCIPAL */}
      <Tooltip text="Enfrente questões do ENEM e ganhe XP">
        <TouchableOpacity style={styles.battleBtn} onPress={() => router.push('/battle')}>
          <Text style={styles.battleBtnText}>INVADIR ARENA ENEM</Text>
          <Text style={styles.battleBtnSub}>Ganhe XP e conquiste territórios</Text>
        </TouchableOpacity>
      </Tooltip>

      {/* MODAL DE CRIAÇÃO DE AVATAR */}
      <Modal visible={modalVisible} transparent={true} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Escolha seu Herói</Text>
            <View style={styles.avatarGrid}>
              {avataresDisponiveis.map(emoji => (
                <Tooltip key={emoji} text={`Escolher ${emoji}`}>
                  <TouchableOpacity style={styles.gridItem} onPress={() => mudarAvatar(emoji)}>
                    <Text style={{fontSize: 40}}>{emoji}</Text>
                  </TouchableOpacity>
                </Tooltip>
              ))}
            </View>
            <Tooltip text="Fechar seleção" position="bottom">
              <TouchableOpacity style={styles.closeBtn} onPress={() => setModalVisible(false)}>
                <Text style={styles.closeBtnText}>FECHAR</Text>
              </TouchableOpacity>
            </Tooltip>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1E1E2E', padding: 25, paddingTop: 60 },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 },
  greeting: { color: '#FFF', fontSize: 24, fontWeight: 'bold' },
  subGreeting: { color: '#FF69B4', fontSize: 14, fontWeight: '500' },
  profileBtn: { backgroundColor: '#2A2A3C', width: 50, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#8A2BE2' },
  
  avatarCard: { backgroundColor: '#2A2A3C', borderRadius: 25, padding: 20, alignItems: 'center', marginBottom: 30, elevation: 10 },
  avatarCircle: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#1E1E2E', justifyContent: 'center', alignItems: 'center', borderWidth: 3, borderColor: '#8A2BE2', marginBottom: 20 },
  avatarEmoji: { fontSize: 55 },
  editBadge: { position: 'absolute', bottom: 0, right: 0, backgroundColor: '#FF69B4', width: 26, height: 26, borderRadius: 13, justifyContent: 'center', alignItems: 'center' },
  
  statsRow: { flexDirection: 'row', width: '100%', marginTop: 10 },
  statBox: { flex: 1, alignItems: 'center' },
  statValue: { color: '#FFF', fontSize: 20, fontWeight: 'bold' },
  statLabel: { color: '#888', fontSize: 10, marginTop: 4 },

  progressSection: { marginBottom: 40 },
  progressHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  progressTitle: { color: '#D8BFD8', fontSize: 14 },
  xpText: { color: '#8A2BE2', fontWeight: 'bold' },
  barContainer: { height: 14, backgroundColor: '#2A2A3C', borderRadius: 7, overflow: 'hidden', borderWidth: 1, borderColor: '#444' },
  barFill: { height: '100%', backgroundColor: '#8A2BE2', borderRadius: 7 },

  battleBtn: { backgroundColor: '#FF69B4', borderRadius: 20, paddingVertical: 20, alignItems: 'center', shadowColor: '#FF69B4', shadowOpacity: 0.5, shadowRadius: 10, elevation: 8 },
  battleBtnText: { color: '#FFF', fontSize: 20, fontWeight: 'bold', letterSpacing: 1 },
  battleBtnSub: { color: 'rgba(255,255,255,0.7)', fontSize: 12, marginTop: 5 },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.9)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { backgroundColor: '#2A2A3C', width: '85%', borderRadius: 30, padding: 20, alignItems: 'center', borderWidth: 2, borderColor: '#8A2BE2' },
  modalTitle: { color: '#FFF', fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  avatarGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' },
  gridItem: { width: 70, height: 70, backgroundColor: '#1E1E2E', margin: 10, borderRadius: 15, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#444' },
  closeBtn: { marginTop: 20, padding: 10 },
  closeBtnText: { color: '#FF69B4', fontWeight: 'bold' }
});