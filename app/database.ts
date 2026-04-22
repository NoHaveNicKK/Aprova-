import AsyncStorage from '@react-native-async-storage/async-storage';

// ==========================================
// BANCO DE DADOS DE QUESTÕES (100 Questões)
// ==========================================
export const questoesENEM = [
  // --- MATEMÁTICA (20 Questões) ---
  { disciplina: 'Matemática', enunciado: 'Um produto sofreu um aumento de 20% e, em seguida, um desconto de 20%. Em relação ao preço inicial, o preço final do produto:', alternativas: ['Aumentou 4%', 'Diminuiu 4%', 'Permaneceu o mesmo', 'Aumentou 2%'], correta: 'B', xp_recompensa: 40 },
  { disciplina: 'Matemática', enunciado: 'A probabilidade de um atirador acertar o alvo é de 80%. Se ele atirar duas vezes, qual a probabilidade de acertar ambas?', alternativas: ['64%', '160%', '80%', '16%'], correta: 'A', xp_recompensa: 50 },
  { disciplina: 'Matemática', enunciado: 'Se a área de um quadrado é 144 cm², qual é o perímetro desse quadrado?', alternativas: ['12 cm', '48 cm', '36 cm', '24 cm'], correta: 'B', xp_recompensa: 30 },
  { disciplina: 'Matemática', enunciado: 'Em uma urna há 5 bolas vermelhas e 3 azuis. Retirando-se uma bola ao acaso, qual a probabilidade de ser azul?', alternativas: ['3/5', '3/8', '5/8', '1/3'], correta: 'B', xp_recompensa: 40 },
  { disciplina: 'Matemática', enunciado: 'Uma torneira enche um tanque em 2 horas. Outra enche em 3 horas. Juntas, elas encherão o tanque em:', alternativas: ['5 horas', '1 hora e 12 minutos', '2 horas e 30 minutos', '1 hora e 50 minutos'], correta: 'B', xp_recompensa: 60 },
  { disciplina: 'Matemática', enunciado: 'Qual é o valor de x na equação 3x - 12 = 15?', alternativas: ['9', '3', '27', '5'], correta: 'A', xp_recompensa: 20 },
  { disciplina: 'Matemática', enunciado: 'Em um triângulo retângulo, os catetos medem 3 e 4. Qual o valor da hipotenusa?', alternativas: ['5', '6', '7', '8'], correta: 'A', xp_recompensa: 30 },
  { disciplina: 'Matemática', enunciado: 'A média aritmética dos números 10, 15, 20 e 25 é:', alternativas: ['15', '17.5', '20', '22.5'], correta: 'B', xp_recompensa: 20 },
  { disciplina: 'Matemática', enunciado: 'Qual é o volume de um cubo cujas arestas medem 3 cm?', alternativas: ['9 cm³', '18 cm³', '27 cm³', '12 cm³'], correta: 'C', xp_recompensa: 30 },
  { disciplina: 'Matemática', enunciado: 'Em uma escala cartográfica de 1:100.000, 5 cm no mapa representam na realidade:', alternativas: ['500 m', '5 km', '50 km', '500 km'], correta: 'B', xp_recompensa: 40 },
  { disciplina: 'Matemática', enunciado: 'Qual é o logaritmo de 100 na base 10?', alternativas: ['1', '2', '10', '100'], correta: 'B', xp_recompensa: 30 },
  { disciplina: 'Matemática', enunciado: 'O 10º termo da Progressão Aritmética (2, 5, 8, 11...) é:', alternativas: ['27', '29', '31', '32'], correta: 'B', xp_recompensa: 50 },
  { disciplina: 'Matemática', enunciado: 'A área de um círculo de raio 5 cm é (considere π = 3):', alternativas: ['15 cm²', '30 cm²', '75 cm²', '100 cm²'], correta: 'C', xp_recompensa: 40 },
  { disciplina: 'Matemática', enunciado: 'Qual o valor do seno de 30°?', alternativas: ['1/2', '√2/2', '√3/2', '1'], correta: 'A', xp_recompensa: 30 },
  { disciplina: 'Matemática', enunciado: 'Quantos anagramas possui a palavra AMOR?', alternativas: ['12', '16', '24', '36'], correta: 'C', xp_recompensa: 40 },
  { disciplina: 'Matemática', enunciado: 'Se 4 operários constroem um muro em 10 dias, 8 operários construirão o mesmo muro em:', alternativas: ['5 dias', '15 dias', '20 dias', '2.5 dias'], correta: 'A', xp_recompensa: 30 },
  { disciplina: 'Matemática', enunciado: 'Um capital de R$ 1.000 aplicado a juros simples de 10% ao mês rende em 3 meses:', alternativas: ['R$ 1.300', 'R$ 300', 'R$ 1.331', 'R$ 130'], correta: 'B', xp_recompensa: 40 },
  { disciplina: 'Matemática', enunciado: 'As raízes da equação x² - 5x + 6 = 0 são:', alternativas: ['-2 e -3', '2 e 3', '1 e 6', '0 e 6'], correta: 'B', xp_recompensa: 50 },
  { disciplina: 'Matemática', enunciado: 'O valor de 2 elevado a 5 é:', alternativas: ['10', '16', '32', '64'], correta: 'C', xp_recompensa: 20 },
  { disciplina: 'Matemática', enunciado: 'Se uma pizza é dividida em 8 pedaços e você come 3, que fração da pizza sobrou?', alternativas: ['3/8', '5/8', '1/8', '8/3'], correta: 'B', xp_recompensa: 20 },

  // --- BIOLOGIA (20 Questões) ---
  { disciplina: 'Biologia', enunciado: 'Qual organela celular é conhecida como a "usina de energia" da célula?', alternativas: ['Complexo de Golgi', 'Lisossomo', 'Mitocôndria', 'Ribossomo'], correta: 'C', xp_recompensa: 30 },
  { disciplina: 'Biologia', enunciado: 'O processo pelo qual as plantas produzem seu próprio alimento é a:', alternativas: ['Fotossíntese', 'Respiração Celular', 'Fermentação', 'Quimiossíntese'], correta: 'A', xp_recompensa: 20 },
  { disciplina: 'Biologia', enunciado: 'Qual é a base nitrogenada exclusiva do RNA?', alternativas: ['Citosina', 'Guanina', 'Uracila', 'Adenina'], correta: 'C', xp_recompensa: 50 },
  { disciplina: 'Biologia', enunciado: 'Indivíduos que possuem dois alelos idênticos para uma mesma característica são chamados:', alternativas: ['Heterozigotos', 'Homozigotos', 'Dominantes', 'Recessivos'], correta: 'B', xp_recompensa: 40 },
  { disciplina: 'Biologia', enunciado: 'Qual é o tipo sanguíneo considerado o doador universal?', alternativas: ['A', 'B', 'AB', 'O'], correta: 'D', xp_recompensa: 30 },
  { disciplina: 'Biologia', enunciado: 'A organela responsável pela síntese de proteínas é o:', alternativas: ['Lisossomo', 'Vacúolo', 'Ribossomo', 'Centríolo'], correta: 'C', xp_recompensa: 30 },
  { disciplina: 'Biologia', enunciado: 'O processo de divisão celular que gera gametas (espermatozoides e óvulos) é a:', alternativas: ['Mitose', 'Meiose', 'Fagocitose', 'Pinocitose'], correta: 'B', xp_recompensa: 40 },
  { disciplina: 'Biologia', enunciado: 'Qual cientista naturalista propôs a Teoria da Evolução por Seleção Natural?', alternativas: ['Gregor Mendel', 'Louis Pasteur', 'Charles Darwin', 'Albert Einstein'], correta: 'C', xp_recompensa: 20 },
  { disciplina: 'Biologia', enunciado: 'Organismos que não possuem núcleo celular delimitado por membrana são chamados de:', alternativas: ['Eucariontes', 'Procariontes', 'Pluricelulares', 'Vírus'], correta: 'B', xp_recompensa: 30 },
  { disciplina: 'Biologia', enunciado: 'Cogumelos e leveduras pertencem a qual reino biológico?', alternativas: ['Plantae', 'Animalia', 'Fungi', 'Protista'], correta: 'C', xp_recompensa: 30 },
  { disciplina: 'Biologia', enunciado: 'A relação ecológica onde ambas as espécies se beneficiam e a união é obrigatória chama-se:', alternativas: ['Comensalismo', 'Parasitismo', 'Mutualismo', 'Competição'], correta: 'C', xp_recompensa: 40 },
  { disciplina: 'Biologia', enunciado: 'Qual hormônio pancreático é responsável por reduzir a taxa de glicose no sangue?', alternativas: ['Glucagon', 'Adrenalina', 'Tiroxina', 'Insulina'], correta: 'D', xp_recompensa: 30 },
  { disciplina: 'Biologia', enunciado: 'As vacinas atuam no nosso organismo estimulando a produção de:', alternativas: ['Antígenos', 'Memória imunológica (anticorpos)', 'Células vermelhas', 'Plaquetas'], correta: 'B', xp_recompensa: 40 },
  { disciplina: 'Biologia', enunciado: 'O inseto "barbeiro" é o transmissor de qual doença?', alternativas: ['Dengue', 'Malária', 'Doença de Chagas', 'Febre Amarela'], correta: 'C', xp_recompensa: 40 },
  { disciplina: 'Biologia', enunciado: 'Na cadeia alimentar, os organismos fotossintetizantes ocupam a posição de:', alternativas: ['Consumidores primários', 'Decompositores', 'Produtores', 'Consumidores secundários'], correta: 'C', xp_recompensa: 20 },
  { disciplina: 'Biologia', enunciado: 'Qual gás é considerado o principal responsável pelo agravamento do Efeito Estufa?', alternativas: ['Gás Oxigênio (O2)', 'Gás Carbônico (CO2)', 'Gás Nitrogênio (N2)', 'Gás Hélio (He)'], correta: 'B', xp_recompensa: 20 },
  { disciplina: 'Biologia', enunciado: 'A unidade estrutural e funcional do sistema nervoso é o:', alternativas: ['Néfron', 'Neurônio', 'Alvéolo', 'Hepatócito'], correta: 'B', xp_recompensa: 30 },
  { disciplina: 'Biologia', enunciado: 'Estrutura celular presente em células vegetais, responsável por manter a rigidez:', alternativas: ['Parede Celular', 'Membrana Plasmática', 'Citoesqueleto', 'Complexo de Golgi'], correta: 'A', xp_recompensa: 40 },
  { disciplina: 'Biologia', enunciado: 'Qual é o ácido nucleico em formato de dupla hélice que carrega nossas informações genéticas?', alternativas: ['RNA', 'DNA', 'ATP', 'ADP'], correta: 'B', xp_recompensa: 20 },
  { disciplina: 'Biologia', enunciado: 'A digestão intracelular é a principal função de qual organela?', alternativas: ['Lisossomos', 'Mitocôndrias', 'Cloroplastos', 'Centríolos'], correta: 'A', xp_recompensa: 50 },

  // --- HISTÓRIA (20 Questões) ---
  { disciplina: 'História', enunciado: 'Qual evento marcou o início oficial da Idade Contemporânea em 1789?', alternativas: ['Revolução Industrial', 'Revolução Francesa', 'Independência dos EUA', 'Primeira Guerra'], correta: 'B', xp_recompensa: 40 },
  { disciplina: 'História', enunciado: 'No Brasil, o período conhecido como "Estado Novo" (1937-1945) foi liderado por:', alternativas: ['Juscelino Kubitschek', 'João Goulart', 'Getúlio Vargas', 'Marechal Deodoro'], correta: 'C', xp_recompensa: 50 },
  { disciplina: 'História', enunciado: 'A Guerra Fria foi um conflito político-ideológico polarizado entre:', alternativas: ['EUA e Alemanha', 'EUA e União Soviética', 'Inglaterra e França', 'Japão e China'], correta: 'B', xp_recompensa: 30 },
  { disciplina: 'História', enunciado: 'Qual civilização antiga desenvolveu a escrita cuneiforme na Mesopotâmia?', alternativas: ['Egípcios', 'Gregos', 'Romanos', 'Sumérios'], correta: 'D', xp_recompensa: 60 },
  { disciplina: 'História', enunciado: 'A Lei Áurea, que aboliu a escravidão no Brasil em 1888, foi assinada por:', alternativas: ['Dom Pedro I', 'Dom Pedro II', 'Princesa Isabel', 'Deodoro da Fonseca'], correta: 'C', xp_recompensa: 20 },
  { disciplina: 'História', enunciado: 'O Tratado de Tordesilhas (1494) dividiu as terras descobertas entre:', alternativas: ['Espanha e Inglaterra', 'Portugal e França', 'Portugal e Espanha', 'Espanha e Holanda'], correta: 'C', xp_recompensa: 30 },
  { disciplina: 'História', enunciado: 'A Inconfidência Mineira (1789) teve como um de seus principais mártires:', alternativas: ['Zumbi dos Palmares', 'Tiradentes', 'Frei Caneca', 'Bento Gonçalves'], correta: 'B', xp_recompensa: 40 },
  { disciplina: 'História', enunciado: 'Quem proclamou a Independência do Brasil no ano de 1822?', alternativas: ['Dom João VI', 'Dom Pedro I', 'Dom Pedro II', 'Marechal Deodoro'], correta: 'B', xp_recompensa: 20 },
  { disciplina: 'História', enunciado: 'A Proclamação da República no Brasil ocorreu em que ano?', alternativas: ['1822', '1888', '1889', '1930'], correta: 'C', xp_recompensa: 40 },
  { disciplina: 'História', enunciado: 'As potências do Eixo na Segunda Guerra Mundial eram formadas principalmente por:', alternativas: ['EUA, Inglaterra e França', 'Alemanha, Itália e Japão', 'URSS, China e EUA', 'Alemanha, URSS e Japão'], correta: 'B', xp_recompensa: 50 },
  { disciplina: 'História', enunciado: 'O regime fascista italiano foi fundado e liderado por:', alternativas: ['Adolf Hitler', 'Joseph Stalin', 'Benito Mussolini', 'Francisco Franco'], correta: 'C', xp_recompensa: 40 },
  { disciplina: 'História', enunciado: 'A Primeira Revolução Industrial teve início em qual país?', alternativas: ['França', 'Alemanha', 'Estados Unidos', 'Inglaterra'], correta: 'D', xp_recompensa: 30 },
  { disciplina: 'História', enunciado: 'O sistema socioeconômico predominante na Europa durante a Idade Média foi o:', alternativas: ['Capitalismo', 'Socialismo', 'Feudalismo', 'Mercantilismo'], correta: 'C', xp_recompensa: 20 },
  { disciplina: 'História', enunciado: 'Qual movimento cultural e científico floresceu na Europa na transição da Idade Média para a Moderna?', alternativas: ['Iluminismo', 'Renascimento', 'Romantismo', 'Absolutismo'], correta: 'B', xp_recompensa: 40 },
  { disciplina: 'História', enunciado: 'A Queda do Muro de Berlim em 1989 simbolizou o fim do(a):', alternativas: ['Segunda Guerra Mundial', 'Guerra Fria', 'União Europeia', 'Apartheid'], correta: 'B', xp_recompensa: 30 },
  { disciplina: 'História', enunciado: 'A grave crise econômica mundial de 1929 iniciou-se com a quebra da bolsa de valores de:', alternativas: ['Londres', 'Tóquio', 'Nova York', 'Paris'], correta: 'C', xp_recompensa: 40 },
  { disciplina: 'História', enunciado: 'A CLT (Consolidação das Leis do Trabalho) foi criada no governo de:', alternativas: ['Juscelino Kubitschek', 'João Goulart', 'Getúlio Vargas', 'Lula'], correta: 'C', xp_recompensa: 30 },
  { disciplina: 'História', enunciado: 'O período da Ditadura Militar no Brasil iniciou-se em qual ano?', alternativas: ['1930', '1945', '1964', '1985'], correta: 'C', xp_recompensa: 50 },
  { disciplina: 'História', enunciado: 'O movimento popular brasileiro que exigia eleições diretas para presidente em 1984 chamou-se:', alternativas: ['Caras Pintadas', 'Revolução de 30', 'Diretas Já', 'Tenentismo'], correta: 'C', xp_recompensa: 30 },
  { disciplina: 'História', enunciado: 'Em que país originou-se a religião Islâmica no século VII?', alternativas: ['Egito', 'Arábia', 'Índia', 'Espanha'], correta: 'B', xp_recompensa: 50 },

  // --- PORTUGUÊS (20 Questões) ---
  { disciplina: 'Português', enunciado: 'A frase "Ele chorou rios de lágrimas" é um exemplo de qual figura de linguagem?', alternativas: ['Metáfora', 'Metonímia', 'Hipérbole', 'Eufemismo'], correta: 'C', xp_recompensa: 30 },
  { disciplina: 'Português', enunciado: 'Qual é a função da linguagem que tem como foco principal o emissor da mensagem?', alternativas: ['Referencial', 'Emotiva (ou Expressiva)', 'Apelativa', 'Metalinguística'], correta: 'B', xp_recompensa: 50 },
  { disciplina: 'Português', enunciado: 'O movimento literário brasileiro marcado pela valorização do índio e da natureza é o:', alternativas: ['Realismo', 'Arcadismo', 'Romantismo', 'Parnasianismo'], correta: 'C', xp_recompensa: 40 },
  { disciplina: 'Português', enunciado: 'Assinale a alternativa em que a crase está empregada corretamente:', alternativas: ['Fomos à praia.', 'Entreguei o prêmio à ele.', 'Começou à chover.', 'Vendeu o carro à prazo.'], correta: 'A', xp_recompensa: 50 },
  { disciplina: 'Português', enunciado: 'Em "O menino quebrou o vidro", qual é o sujeito da oração?', alternativas: ['quebrou', 'o vidro', 'O menino', 'menino quebrou'], correta: 'C', xp_recompensa: 20 },
  { disciplina: 'Português', enunciado: 'Quando substituímos "a marca" pelo "produto" (ex: Comprei um Danone), usamos a:', alternativas: ['Metáfora', 'Antítese', 'Metonímia', 'Pleonasmo'], correta: 'C', xp_recompensa: 40 },
  { disciplina: 'Português', enunciado: 'Qual escola literária buscava a "Arte pela Arte", perfeição formal e rimas ricas?', alternativas: ['Romantismo', 'Parnasianismo', 'Naturalismo', 'Barroco'], correta: 'B', xp_recompensa: 60 },
  { disciplina: 'Português', enunciado: 'Machado de Assis é considerado o maior representante de qual movimento no Brasil?', alternativas: ['Realismo', 'Simbolismo', 'Romantismo', 'Arcadismo'], correta: 'A', xp_recompensa: 30 },
  { disciplina: 'Português', enunciado: 'A Semana de Arte Moderna, marco inicial do Modernismo no Brasil, ocorreu em:', alternativas: ['1900', '1922', '1945', '1964'], correta: 'B', xp_recompensa: 40 },
  { disciplina: 'Português', enunciado: 'A palavra "CAFÉ" é acentuada por ser uma:', alternativas: ['Oxítona terminada em E', 'Paroxítona', 'Proparoxítona', 'Monossílabo átono'], correta: 'A', xp_recompensa: 20 },
  { disciplina: 'Português', enunciado: 'Em "Comprei um livro", o verbo comprar classifica-se como:', alternativas: ['Intransitivo', 'Transitivo Direto', 'Transitivo Indireto', 'Verbo de Ligação'], correta: 'B', xp_recompensa: 40 },
  { disciplina: 'Português', enunciado: '"Claro como a noite" é um exemplo de:', alternativas: ['Ironia', 'Eufemismo', 'Antítese', 'Paradoxo'], correta: 'A', xp_recompensa: 50 },
  { disciplina: 'Português', enunciado: '"Subir para cima" ou "entrar para dentro" é um vício de linguagem chamado:', alternativas: ['Cacofonia', 'Ambiguidade', 'Pleonasmo', 'Estrangeirismo'], correta: 'C', xp_recompensa: 20 },
  { disciplina: 'Português', enunciado: 'O uso de palavras para suavizar uma ideia forte (ex: "Faltou com a verdade" em vez de "Mentiu") é o:', alternativas: ['Eufemismo', 'Hipérbole', 'Ironia', 'Anáfora'], correta: 'A', xp_recompensa: 30 },
  { disciplina: 'Português', enunciado: 'A literatura feita no Brasil durante o século XVI, como a Carta de Caminha, é chamada de:', alternativas: ['Quinhentismo', 'Barroco', 'Arcadismo', 'Trovadorismo'], correta: 'A', xp_recompensa: 40 },
  { disciplina: 'Português', enunciado: 'Qual é a classe gramatical da palavra "MAS" na frase "Estudou, mas não passou"?', alternativas: ['Preposição', 'Substantivo', 'Conjunção', 'Advérbio'], correta: 'C', xp_recompensa: 30 },
  { disciplina: 'Português', enunciado: 'Na oração "Precisa-se de funcionários", o "se" atua como:', alternativas: ['Pronome apassivador', 'Índice de indeterminação do sujeito', 'Conjunção', 'Pronome reflexivo'], correta: 'B', xp_recompensa: 60 },
  { disciplina: 'Português', enunciado: 'As palavras "seção", "sessão" e "cessão" são classificadas como:', alternativas: ['Sinônimas', 'Antônimas', 'Parônimas', 'Homônimas'], correta: 'D', xp_recompensa: 50 },
  { disciplina: 'Português', enunciado: 'A variação linguística que ocorre devido à região geográfica do falante é chamada de variação:', alternativas: ['Histórica', 'Social', 'Diatópica (Regional)', 'Diastrática'], correta: 'C', xp_recompensa: 30 },
  { disciplina: 'Português', enunciado: 'Na palavra "INFELIZMENTE", temos quantos afixos?', alternativas: ['1 prefixo', '1 sufixo', '1 prefixo e 1 sufixo', 'Nenhum afixo'], correta: 'C', xp_recompensa: 40 },

  // --- QUÍMICA (20 Questões) ---
  { disciplina: 'Química', enunciado: 'Na Tabela Periódica, os elementos da família 1A são conhecidos como:', alternativas: ['Gases Nobres', 'Halogênios', 'Metais Alcalinos', 'Metais Alcalino-Terrosos'], correta: 'C', xp_recompensa: 40 },
  { disciplina: 'Química', enunciado: 'Qual é a fórmula molecular da água oxigenada?', alternativas: ['H2O', 'H2O2', 'HO', 'H3O+'], correta: 'B', xp_recompensa: 30 },
  { disciplina: 'Química', enunciado: 'Reações que liberam calor para o ambiente são chamadas de:', alternativas: ['Endotérmicas', 'Exotérmicas', 'Isotérmicas', 'Acinéticas'], correta: 'B', xp_recompensa: 40 },
  { disciplina: 'Química', enunciado: 'Qual é o elemento base de todas as moléculas na Química Orgânica?', alternativas: ['Oxigênio', 'Nitrogênio', 'Hidrogênio', 'Carbono'], correta: 'D', xp_recompensa: 20 },
  { disciplina: 'Química', enunciado: 'Uma solução cujo pH é igual a 3 é classificada como:', alternativas: ['Ácida', 'Básica (Alcalina)', 'Neutra', 'Saturada'], correta: 'A', xp_recompensa: 30 },
  { disciplina: 'Química', enunciado: 'Átomos do mesmo elemento químico com diferentes números de nêutrons são:', alternativas: ['Isóbaros', 'Isótopos', 'Isótonos', 'Íons'], correta: 'B', xp_recompensa: 40 },
  { disciplina: 'Química', enunciado: 'O número atômico (Z) de um elemento indica a quantidade de:', alternativas: ['Nêutrons', 'Elétrons', 'Prótons', 'Massa'], correta: 'C', xp_recompensa: 20 },
  { disciplina: 'Química', enunciado: 'A ligação química onde ocorre o compartilhamento de elétrons entre ametais é a:', alternativas: ['Ligação Iônica', 'Ligação Metálica', 'Ligação Covalente', 'Ponte de Hidrogênio'], correta: 'C', xp_recompensa: 50 },
  { disciplina: 'Química', enunciado: 'A família 8A (ou 18) da Tabela Periódica agrupa os:', alternativas: ['Halogênios', 'Metais de Transição', 'Actinídeos', 'Gases Nobres'], correta: 'D', xp_recompensa: 20 },
  { disciplina: 'Química', enunciado: 'Qual das substâncias abaixo é considerada uma substância simples?', alternativas: ['H2O (Água)', 'CO2 (Gás Carbônico)', 'O2 (Gás Oxigênio)', 'NaCl (Sal)'], correta: 'C', xp_recompensa: 30 },
  { disciplina: 'Química', enunciado: 'O valor da Constante de Avogadro (1 mol) é aproximadamente:', alternativas: ['6,02 x 10^23', '3,14 x 10^15', '9,8 x 10^2', '1,6 x 10^-19'], correta: 'A', xp_recompensa: 40 },
  { disciplina: 'Química', enunciado: 'A capacidade de um átomo de atrair elétrons em uma ligação é chamada de:', alternativas: ['Energia de Ionização', 'Eletroafinidade', 'Eletronegatividade', 'Raio Atômico'], correta: 'C', xp_recompensa: 50 },
  { disciplina: 'Química', enunciado: 'Compostos orgânicos formados unicamente por Carbono e Hidrogênio são os:', alternativas: ['Álcoois', 'Carboidratos', 'Hidrocarbonetos', 'Proteínas'], correta: 'C', xp_recompensa: 30 },
  { disciplina: 'Química', enunciado: 'O grupo funcional hidroxila (-OH) ligado a um carbono saturado caracteriza a função:', alternativas: ['Aldeído', 'Cetona', 'Álcool', 'Ácido Carboxílico'], correta: 'C', xp_recompensa: 40 },
  { disciplina: 'Química', enunciado: 'Numa solução de água e sal, a água atua como:', alternativas: ['Soluto', 'Solvente', 'Precipitado', 'Catalisador'], correta: 'B', xp_recompensa: 20 },
  { disciplina: 'Química', enunciado: 'A passagem direta do estado sólido para o gasoso recebe o nome de:', alternativas: ['Fusão', 'Condensação', 'Sublimação', 'Ebulição'], correta: 'C', xp_recompensa: 30 },
  { disciplina: 'Química', enunciado: 'O gás presente na nossa atmosfera em maior quantidade (cerca de 78%) é o:', alternativas: ['Oxigênio', 'Gás Carbônico', 'Nitrogênio', 'Hidrogênio'], correta: 'C', xp_recompensa: 40 },
  { disciplina: 'Química', enunciado: 'O modelo atômico de Rutherford ficou conhecido como o modelo do:', alternativas: ['Pudim de Passas', 'Sistema Planetário', 'Bola de Bilhar', 'Orbital molecular'], correta: 'B', xp_recompensa: 50 },
  { disciplina: 'Química', enunciado: 'Qual metal é líquido em temperatura ambiente?', alternativas: ['Ouro', 'Ferro', 'Mercúrio', 'Prata'], correta: 'C', xp_recompensa: 30 },
  { disciplina: 'Química', enunciado: 'O pH de uma solução neutra, como a água pura a 25°C, é:', alternativas: ['0', '7', '14', '10'], correta: 'B', xp_recompensa: 20 }
];


// ==========================================
// FUNÇÕES DO BANCO DE DADOS OFFLINE
// ==========================================

const CHAVE_JOGADOR = '@aprova_jogador';

const jogadorInicial = {
  nome: 'Guerreiro',
  avatar: '🐱',
  nivel: 1,
  xp: 0,
  acertos: 0,
  total_questoes: 0,
  streak: 0,
  ultimo_login: new Date().toDateString(),
  acertosPorMateria: {
    'matemática': 0,
    'biologia': 0,
    'história': 0,
    'português': 0,
    'química': 0
  },
  questoes_respondidas: [] // Guarda as questoes já feitas para não repetir!
};

export const inicializarBancoOffline = async () => {
  try {
    const dados = await AsyncStorage.getItem(CHAVE_JOGADOR);
    if (!dados) {
      await AsyncStorage.setItem(CHAVE_JOGADOR, JSON.stringify(jogadorInicial));
    } else {
      const j = JSON.parse(dados);
      const hoje = new Date().toDateString();
      if (j.ultimo_login !== hoje) {
        j.streak = j.ultimo_login === new Date(Date.now() - 86400000).toDateString() ? j.streak + 1 : 1;
        j.ultimo_login = hoje;
        await AsyncStorage.setItem(CHAVE_JOGADOR, JSON.stringify(j));
      }
    }
  } catch (error) {
    console.error("Erro ao iniciar o banco:", error);
  }
};

export const obterJogador = async () => {
  try {
    const dados = await AsyncStorage.getItem(CHAVE_JOGADOR);
    return dados ? JSON.parse(dados) : jogadorInicial;
  } catch (error) {
    console.error("Erro ao obter jogador:", error);
    return jogadorInicial;
  }
};

export const salvarJogador = async (dadosJogador) => {
  try {
    await AsyncStorage.setItem(CHAVE_JOGADOR, JSON.stringify(dadosJogador));
  } catch (error) {
    console.error("Erro ao salvar jogador:", error);
  }
};