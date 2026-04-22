import { router } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { obterJogador, questoesENEM, salvarJogador } from './database';

export default function BattleScreen() {
  const [materiaSelecionada, setMateriaSelecionada] = useState(null);
  const [questao, setQuestao] = useState(null);
  const [selecionada, setSelecionada] = useState(null);
  const [tentativas, setTentativas] = useState(0);
  const [modal, setModal] = useState({ visivel: false, titulo: '', msg: '', tipo: 'vitoria' });

  const portais = [
    { nome: 'Matemática', icone: '📐', cor: '#FF4500' },
    { nome: 'Biologia', icone: '🧬', cor: '#32CD32' },
    { nome: 'História', icone: '📜', cor: '#FFD700' },
    { nome: 'Português', icone: '📚', cor: '#00BFFF' },
    { nome: 'Química', icone: '🧪', cor: '#9370DB' },
  ];

  const iniciarCombate = (materia) => {
    const filtradas = questoesENEM.filter(q => q.disciplina === materia);
    if (filtradas.length > 0) {
      const sorteada = filtradas[Math.floor(Math.random() * filtradas.length)];
      setQuestao(sorteada);
      setMateriaSelecionada(materia);
      setTentativas(0);
      setSelecionada(null);
    }
  };

  const abrirConfirmacaoFuga = () => {
    setModal({
      visivel: true,
      titulo: 'FUGIR? 🏳️',
      msg: 'Se você fugir agora, perderá 20 XP. Tem certeza que deseja abandonar a batalha?',
      tipo: 'fuga'
    });
  };

  const executarDesistencia = async () => {
    try {
      const j = await obterJogador();
      if (j) {
        const novoXp = Math.max(0, (j.xp || 0) - 20); 
        await salvarJogador({ ...j, xp: novoXp });
        setModal({ ...modal, visivel: false });
        router.replace('/dashboard');
      }
    } catch (error) {
      console.error(error);
      router.replace('/dashboard');
    }
  };

  const confirmar = async () => {
    if (!questao) return;

    if (selecionada === questao.correta) {
      let xpGanhado = questao.xp_recompensa;
      if (tentativas === 1) xpGanhado = Math.floor(xpGanhado * 0.5);
      else if (tentativas >= 2) xpGanhado = 10;

      const j = await obterJogador();
      let nXp = (j.xp || 0) + xpGanhado;
      let nNivel = j.nivel;
      if (nXp >= 1000) { nNivel++; nXp -= 1000; }

      const matKey = questao.disciplina.toLowerCase();
      const nAcertosMat = j.acertosPorMateria || {};
      nAcertosMat[matKey] = (nAcertosMat[matKey] || 0) + 1;

      await salvarJogador({ 
        ...j, xp: nXp, nivel: nNivel, total_questoes: j.total_questoes + 1, 
        acertos: j.acertos + 1, acertosPorMateria: nAcertosMat 
      });

      setModal({ visivel: true, titulo: 'VITÓRIA! ⚔️', msg: `Ataque crítico! Você ganhou +${xpGanhado} XP.`, tipo: 'vitoria' });
    } else {
      setTentativas(prev => prev + 1);
      setModal({ visivel: true, titulo: 'ERRO! 🛡️', msg: 'O inimigo defendeu. O bônus de XP diminuiu!', tipo: 'erro' });
    }
  };

  if (!materiaSelecionada) {
    return (
      <View style={styles.container}>
        <Text style={styles.menuTitle}>ESCOLHA SEU PORTAL</Text>
        <Text style={styles.menuSub}>Selecione a área para batalhar offline</Text>
        <ScrollView contentContainerStyle={styles.portalGrid}>
          {portais.map(p => (
            <TouchableOpacity key={p.nome} style={[styles.portalCard, {borderColor: p.cor}]} onPress={() => iniciarCombate(p.nome)}>
              <Text style={{fontSize: 40, marginBottom: 10}}>{p.icone}</Text>
              <Text style={styles.portalName}>{p.nome}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <TouchableOpacity onPress={() => router.back()} style={{marginTop: 20}}>
          <Text style={{color:'#888', textAlign:'center'}}>VOLTAR AO HUB</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!questao) return <ActivityIndicator style={{flex:1, backgroundColor:'#1E1E2E'}}/>;

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        <View style={styles.header}>
          <Text style={styles.title}>{questao.disciplina}</Text>
          <View style={styles.xpBadge}>
            <Text style={{color:'#FFF', fontWeight:'bold', fontSize:10}}>
                Bônus: {tentativas === 0 ? questao.xp_recompensa : tentativas === 1 ? Math.floor(questao.xp_recompensa * 0.5) : 10} XP
            </Text>
          </View>
        </View>

        <View style={styles.card}><Text style={styles.qText}>{questao.enunciado}</Text></View>

        {questao.alternativas.map((alt, i) => {
          const letra = ['A','B','C','D'][i];
          const isSelected = selecionada === letra;
          return (
            <TouchableOpacity key={i} style={[styles.opt, isSelected && styles.sel]} onPress={() => setSelecionada(letra)}>
              <View style={[styles.circle, isSelected && {backgroundColor:'#FF69B4'}]}><Text style={{color:'#FFF'}}>{letra}</Text></View>
              <Text style={{color:'#D8BFD8', flex:1}}>{alt}</Text>
            </TouchableOpacity>
          );
        })}

        <TouchableOpacity style={[styles.btn, !selecionada && {opacity: 0.5}]} disabled={!selecionada} onPress={confirmar}>
          <Text style={styles.btnTxt}>LANÇAR ATAQUE</Text>
        </TouchableOpacity>

        {/* NOVO BOTÃO DE DESISTÊNCIA (SÓLIDO E VERMELHO) */}
        <TouchableOpacity style={styles.btnDesistirCard} onPress={abrirConfirmacaoFuga}>
          <Text style={styles.btnDesistirTxt}>DESISTIR DA BATALHA</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal visible={modal.visivel} transparent={true} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[
            styles.modalContent, 
            {borderColor: modal.tipo === 'vitoria' ? '#FF69B4' : modal.tipo === 'fuga' ? '#FFD700' : '#FF4500'}
          ]}>
            <Text style={[
              styles.modalTitle, 
              {color: modal.tipo === 'vitoria' ? '#FF69B4' : modal.tipo === 'fuga' ? '#FFD700' : '#FF4500'}
            ]}>
              {modal.titulo}
            </Text>
            
            <Text style={{color:'#FFF', textAlign:'center', marginBottom:25}}>{modal.msg}</Text>
            
            {modal.tipo === 'fuga' ? (
              <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
                <TouchableOpacity 
                  style={[styles.modalBtn, {backgroundColor: '#1E1E2E', borderWidth: 1, borderColor: '#FF4500', width: '48%'}]} 
                  onPress={executarDesistencia}
                >
                  <Text style={{color:'#FF4500', fontWeight:'bold', textAlign: 'center'}}>SIM, FUGIR</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.modalBtn, {backgroundColor: '#8A2BE2', width: '48%'}]} 
                  onPress={() => setModal({...modal, visivel: false})}
                >
                  <Text style={{color:'#FFF', fontWeight:'bold', textAlign: 'center'}}>LUTAR</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity 
                style={[styles.modalBtn, {backgroundColor: modal.tipo === 'vitoria' ? '#8A2BE2' : '#FF4500'}]} 
                onPress={() => { setModal({...modal, visivel:false}); if(modal.tipo==='vitoria') router.replace('/dashboard'); }}
              >
                <Text style={{color:'#FFF', fontWeight:'bold', textAlign: 'center'}}>
                  {modal.tipo === 'vitoria' ? 'CONTINUAR' : 'TENTAR DE NOVO'}
                </Text>
              </TouchableOpacity>
            )}

          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1E1E2E', padding: 20, paddingTop: 50 },
  menuTitle: { color: '#FFF', fontSize: 24, fontWeight: 'bold', textAlign: 'center' },
  menuSub: { color: '#FF69B4', fontSize: 13, textAlign: 'center', marginBottom: 30, marginTop: 5 },
  portalGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  portalCard: { width: '47%', backgroundColor: '#2A2A3C', borderRadius: 20, padding: 20, alignItems: 'center', marginBottom: 15, borderWidth: 2 },
  portalName: { color: '#FFF', fontWeight: 'bold', fontSize: 14 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  title: { color: '#FF69B4', fontSize: 20, fontWeight: 'bold' },
  xpBadge: { backgroundColor: '#8A2BE2', padding: 8, borderRadius: 15 },
  card: { backgroundColor: '#2A2A3C', padding: 20, borderRadius: 15, marginBottom: 20 },
  qText: { color: '#FFF', fontSize: 16, lineHeight: 24 },
  opt: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#2A2A3C', padding: 15, borderRadius: 12, marginBottom: 10, borderWidth: 2, borderColor: 'transparent' },
  sel: { borderColor: '#FF69B4', backgroundColor: 'rgba(255,105,180,0.1)' },
  circle: { width: 30, height: 30, borderRadius: 15, backgroundColor: '#1E1E2E', alignItems: 'center', justifyContent: 'center', marginRight: 15 },
  btn: { backgroundColor: '#8A2BE2', padding: 18, borderRadius: 15, alignItems: 'center', marginTop: 10 },
  btnTxt: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  
  // ESTILOS ATUALIZADOS DO BOTÃO DE DESISTIR (Igual ao de ataque, mas vermelho)
  btnDesistirCard: { 
    marginTop: 15, 
    backgroundColor: '#FF3333', // Vermelho sólido 
    padding: 18, // Mesmo padding do botão roxo
    borderRadius: 15, // Mesmo arredondamento
    alignItems: 'center', 
    marginBottom: 40 
  },
  btnDesistirTxt: { 
    color: '#FFF', // Texto branco
    fontSize: 16, // Mesmo tamanho do "LANÇAR ATAQUE"
    fontWeight: 'bold' 
  },
  btnDesistirSub: { 
    color: '#FFF', 
    fontSize: 12, 
    opacity: 0.9, 
    marginTop: 2 
  },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.85)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  modalContent: { backgroundColor: '#1E1E2E', width: '100%', padding: 25, borderRadius: 25, borderWidth: 3, alignItems: 'center' },
  modalTitle: { fontSize: 26, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
  modalBtn: { padding: 15, borderRadius: 12, width: '100%', alignItems: 'center', justifyContent: 'center' }
});