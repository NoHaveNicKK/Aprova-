from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import random
import sqlite3
from datetime import date, timedelta # Verifique se esta linha está exatamente assim

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

def iniciar_banco():
    conn = sqlite3.connect('banco.db')
    cursor = conn.cursor()
    # Garantindo que todas as colunas existam
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS jogador (
            id INTEGER PRIMARY KEY,
            nome TEXT,
            nivel INTEGER,
            xp INTEGER,
            streak INTEGER,
            ultima_jogada TEXT,
            total_questoes INTEGER DEFAULT 0,
            acertos INTEGER DEFAULT 0
        )
    ''')
    
    cursor.execute("SELECT * FROM jogador WHERE id=1")
    if not cursor.fetchone():
        ontem = (date.today() - timedelta(days=1)).isoformat()
        cursor.execute(
            "INSERT INTO jogador (nome, nivel, xp, streak, ultima_jogada, total_questoes, acertos) VALUES (?, ?, ?, ?, ?, ?, ?)", 
            ('André', 5, 750, 3, ontem, 0, 0)
        )
    conn.commit()
    conn.close()

iniciar_banco()

questoes_enem = [
    {
        "id": 1,
        "disciplina": "Matemática",
        "enunciado": "(ENEM) Um ciclista percorre uma praça circular com raio de 50m. Qual a distância percorrida? (Considere π = 3,14).",
        "alternativas": ["157 metros", "314 metros", "500 metros", "628 metros"],
        "correta": "B",
        "xp_recompensa": 50
    },
    {
        "id": 2,
        "disciplina": "Matemática",
        "enunciado": "(ENEM) Se um triângulo tem base de 10cm e altura de 5cm, qual a sua área?",
        "alternativas": ["25 cm²", "50 cm²", "15 cm²", "100 cm²"],
        "correta": "A",
        "xp_recompensa": 40
    }
]

@app.get("/perfil")
async def obter_perfil():
    conn = sqlite3.connect('banco.db')
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM jogador WHERE id=1")
    jogador = dict(cursor.fetchone())
    conn.close()
    return jogador

@app.get("/missao-do-dia")
async def obter_missao():
    return random.choice(questoes_enem)

@app.post("/ganhar-xp")
async def adicionar_xp(quantidade: int):
    try:
        conn = sqlite3.connect('banco.db')
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        
        cursor.execute("SELECT nivel, xp, streak, ultima_jogada, total_questoes, acertos FROM jogador WHERE id=1")
        jogador = cursor.fetchone()
        
        novo_xp = jogador['xp'] + quantidade
        novo_nivel = jogador['nivel']
        streak_atual = jogador['streak']
        ultima_jogada_str = jogador['ultima_jogada']
        novo_total = jogador['total_questoes'] + 1
        novos_acertos = jogador['acertos'] + 1
        
        subiu_nivel = False
        if novo_xp >= 1000:
            novo_nivel += 1
            novo_xp -= 1000
            subiu_nivel = True

        hoje = date.today()
        hoje_iso = hoje.isoformat()
        ontem_iso = (hoje - timedelta(days=1)).isoformat()
        
        if ultima_jogada_str != hoje_iso:
            if ultima_jogada_str == ontem_iso:
                streak_atual += 1
            else:
                streak_atual = 1
            ultima_jogada_str = hoje_iso
            
        cursor.execute("""
            UPDATE jogador 
            SET nivel = ?, xp = ?, streak = ?, ultima_jogada = ?, total_questoes = ?, acertos = ? 
            WHERE id = 1
        """, (novo_nivel, novo_xp, streak_atual, ultima_jogada_str, novo_total, novos_acertos))
        
        conn.commit()
        conn.close()
            
        return {
            "novo_xp": novo_xp, 
            "novo_nivel": novo_nivel,
            "subiu_nivel": subiu_nivel,
            "total_questoes": novo_total,
            "acertos": novos_acertos
        }
    except Exception as e:
        print(f"Erro no servidor: {e}")
        return {"erro": str(e)}

if __name__ == "__main__":
    import uvicorn
    # Certifique-se de que está exatamente assim:
    uvicorn.run(app, host="0.0.0.0", port=8000)