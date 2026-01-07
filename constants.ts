import { CalendarEvent } from './types';

export const WEEKDAYS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];

export const MONTHS = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

// Complete 2026 List for Brazil (National) and SP (State/City)
export const EVENTS_2026: CalendarEvent[] = [
  // JANEIRO
  { 
    date: '2026-01-01', 
    title: 'Confraternização Universal', 
    type: 'holiday',
    description: 'Celebração do Ano Novo e da paz mundial.',
    businessTip: 'Inicie promoções de "Ano Novo, Vida Nova", focando em produtos para metas pessoais, organização e bem-estar.'
  },
  { 
    date: '2026-01-06', 
    title: 'Dia de Reis', 
    type: 'commemorative',
    description: 'Data cristã que marca a visita dos Reis Magos a Jesus. Tradicionalmente, é o dia de desmontar a árvore de Natal.',
    businessTip: 'Última oportunidade para realizar um "bota-fora" dos estoques remanescentes de Natal com descontos agressivos.'
  },
  { 
    date: '2026-01-20', 
    title: 'Dia do Farmacêutico', 
    type: 'commemorative',
    description: 'Homenagem aos profissionais da farmácia.',
    businessTip: 'Farmácias e perfumarias podem criar campanhas de saúde preventiva e oferecer descontos em vitaminas e dermocosméticos.'
  },
  { 
    date: '2026-01-24', 
    title: 'Dia dos Aposentados', 
    type: 'commemorative',
    description: 'Dia de homenagear quem já contribuiu muito com o trabalho.',
    businessTip: 'Crie ofertas exclusivas para a terceira idade ou pacotes de turismo e lazer focados neste público.'
  },
  { 
    date: '2026-01-25', 
    title: 'Aniversário de São Paulo', 
    type: 'holiday',
    description: 'Feriado municipal celebrando a fundação da maior cidade do Brasil.',
    businessTip: 'Restaurantes e comércios locais podem criar pratos ou produtos temáticos que celebrem a cultura paulistana (ex: virado à paulista).'
  },
  { 
    date: '2026-01-26', 
    title: 'Dia da Gula', 
    type: 'special',
    description: 'Um dia para deixar a dieta de lado e aproveitar.',
    businessTip: 'Essencial para o setor de alimentação: ofereça rodízios, combos "tamanho família" ou sobremesas em dobro.'
  },
  { 
    date: '2026-01-30', 
    title: 'Dia da Saudade', 
    type: 'commemorative',
    description: 'Dia para recordar pessoas e momentos queridos.',
    businessTip: 'Engaje nas redes sociais pedindo para os clientes postarem fotos antigas com seus produtos (TBT) ou relance um produto clássico.'
  },

  // FEVEREIRO
  { 
    date: '2026-02-14', 
    title: 'Dia da Amizade', 
    type: 'special',
    description: 'Embora o dia internacional seja em julho, muitos celebram o Valentine\'s Day como dia da amizade no Brasil.',
    businessTip: 'Promoções do tipo "Compre 1 e leve outro para seu amigo" funcionam muito bem.'
  },
  { 
    date: '2026-02-16', 
    title: 'Segunda de Carnaval', 
    type: 'special',
    description: 'Ponto facultativo tradicional.',
    businessTip: 'Foco total em turismo, lazer e entretenimento. Bares e restaurantes devem preparar programações especiais.'
  },
  { 
    date: '2026-02-17', 
    title: 'Carnaval', 
    type: 'holiday',
    description: 'A maior festa popular brasileira.',
    businessTip: 'Venda de fantasias, glitter, bebidas e kits para churrasco. O pós-festa (isotônicos, analgésicos) também tem alta demanda.'
  },
  { 
    date: '2026-02-18', 
    title: 'Quarta-feira de Cinzas', 
    type: 'special',
    description: 'Início da Quaresma.',
    businessTip: 'Restaurantes podem começar a destacar opções de peixes e pratos sem carne vermelha.'
  },

  // MARÇO
  { 
    date: '2026-03-08', 
    title: 'Dia Internacional da Mulher', 
    type: 'commemorative',
    description: 'Celebração das conquistas sociais, políticas e econômicas das mulheres.',
    businessTip: 'Vá além das flores: ofereça descontos reais em produtos de interesse feminino e destaque histórias inspiradoras de clientes ou colaboradoras.'
  },
  { 
    date: '2026-03-15', 
    title: 'Dia do Consumidor', 
    type: 'commemorative',
    description: 'Data criada para reforçar os direitos dos consumidores.',
    businessTip: 'Muitas lojas fazem a "Semana do Consumidor". É uma espécie de "Black Friday" do primeiro semestre. Ofereça frete grátis e cupons.'
  },
  { 
    date: '2026-03-20', 
    title: 'Início do Outono', 
    type: 'special',
    description: 'Mudança de estação, dias mais curtos e temperaturas amenas.',
    businessTip: 'Lançamento de coleções Outono/Inverno em moda. Cafeterias podem lançar bebidas quentes especiais.'
  },

  // ABRIL
  { 
    date: '2026-04-01', 
    title: 'Dia da Mentira', 
    type: 'special',
    description: 'Dia de brincadeiras e pegadinhas.',
    businessTip: 'Crie posts interativos e divertidos nas redes sociais ("Verdade ou Mentira"). Cuidado para não confundir o cliente com ofertas falsas.'
  },
  { 
    date: '2026-04-03', 
    title: 'Sexta-feira Santa', 
    type: 'holiday',
    description: 'Data religiosa cristã que relembra a crucificação de Jesus.',
    businessTip: 'Alta procura por peixes, azeites e vinhos. Supermercados e peixarias devem reforçar o estoque.'
  },
  { 
    date: '2026-04-05', 
    title: 'Páscoa', 
    type: 'holiday',
    description: 'Celebração da ressurreição. Dia de trocar ovos de chocolate.',
    businessTip: 'Ovos de Páscoa, chocolates e almoços em família. Restaurantes devem aceitar reservas com antecedência.'
  },
  { 
    date: '2026-04-21', 
    title: 'Tiradentes', 
    type: 'holiday',
    description: 'Homenagem a Joaquim José da Silva Xavier, mártir da Inconfidência Mineira.',
    businessTip: 'Como é feriado nacional, o foco é em turismo de curta distância e lazer.'
  },
  { 
    date: '2026-04-22', 
    title: 'Descobrimento do Brasil', 
    type: 'commemorative',
    description: 'Data histórica da chegada dos portugueses.',
    businessTip: 'Livrarias e instituições de ensino podem promover conteúdos sobre a história do país.'
  },
  { 
    date: '2026-04-28', 
    title: 'Dia do Frete Grátis', 
    type: 'special',
    description: 'Data promocional focada no comércio eletrônico.',
    businessTip: 'O nome diz tudo: zere o custo de entrega para aumentar a taxa de conversão e atrair novos clientes online.'
  },

  // MAIO
  { 
    date: '2026-05-01', 
    title: 'Dia do Trabalho', 
    type: 'holiday',
    description: 'Celebração das conquistas dos trabalhadores.',
    businessTip: 'Ótima data para endomarketing: valorize sua equipe. Para o comércio, foca-se em itens de lazer e descanso (churrasco, bebidas).'
  },
  { 
    date: '2026-05-10', 
    title: 'Dia das Mães', 
    type: 'holiday',
    description: 'A segunda data mais importante para o comércio brasileiro.',
    businessTip: 'Invista em kits de presentes, vale-presentes e campanhas emocionais. Setores de moda, beleza e floricultura têm alta demanda.'
  },
  { 
    date: '2026-05-25', 
    title: 'Dia do Orgulho Nerd', 
    type: 'special',
    description: 'Também conhecido como Dia da Toalha.',
    businessTip: 'Lojas de games, livrarias e vestuário podem fazer promoções temáticas de cultura pop, Star Wars e tecnologia.'
  },

  // JUNHO
  { 
    date: '2026-06-04', 
    title: 'Corpus Christi', 
    type: 'holiday',
    description: 'Data religiosa comemorada com procissões e tapetes nas ruas.',
    businessTip: 'Feriado prolongado tradicional. Agências de viagem e hotéis devem focar em pacotes de "escapada".'
  },
  { 
    date: '2026-06-11', 
    title: 'Início da Copa do Mundo', 
    type: 'special', 
    description: 'Abertura do mundial de futebol sediado nos EUA, México e Canadá.',
    businessTip: 'Bares e restaurantes devem preparar infraestrutura de transmissão (TVs/Telões). Decoração verde e amarela é obrigatória no varejo.'
  },
  { 
    date: '2026-06-12', 
    title: 'Dia dos Namorados', 
    type: 'commemorative',
    description: 'Celebração do amor e da união de casais.',
    businessTip: 'Jantares românticos, motéis, floriculturas e presentes personalizados. Ofereça opções de "presentes de última hora".'
  },
  { 
    date: '2026-06-21', 
    title: 'Início do Inverno', 
    type: 'special',
    description: 'Chegada das temperaturas mais frias no hemisfério sul.',
    businessTip: 'Hora de vender roupas pesadas, cobertores, fondues, vinhos e aquecedores.'
  },
  { 
    date: '2026-06-24', 
    title: 'Dia de São João', 
    type: 'commemorative',
    description: 'Auge das festas juninas.',
    businessTip: 'Decoração temática, venda de milho, amendoim, quentão e tecidos xadrez. Padarias podem vender kits de festa junina.'
  },

  // JULHO
  { 
    date: '2026-07-09', 
    title: 'Revolução Constitucionalista', 
    type: 'holiday',
    description: 'Feriado estadual em São Paulo, celebrando a revolta de 1932.',
    businessTip: 'Como é feriado apenas em SP, o turismo para o litoral e interior do estado aumenta significativamente.'
  },
  { 
    date: '2026-07-13', 
    title: 'Dia Mundial do Rock', 
    type: 'special',
    description: 'Celebração do gênero musical.',
    businessTip: 'Bares podem contratar bandas cover. Lojas de roupa podem destacar camisetas de banda e coturnos.'
  },
  { 
    date: '2026-07-19', 
    title: 'Final da Copa do Mundo', 
    type: 'special', 
    description: 'Grande final do torneio mais importante do futebol mundial.',
    businessTip: 'Prepare-se para alta demanda de bebidas e carnes para churrasco. Se o Brasil chegar, o comércio para durante o jogo.'
  },
  { 
    date: '2026-07-20', 
    title: 'Dia do Amigo', 
    type: 'commemorative',
    description: 'Mais uma oportunidade para celebrar a amizade.',
    businessTip: 'Restaurantes e bares podem oferecer "double drink" ou descontos para mesas grandes de amigos.'
  },
  { 
    date: '2026-07-26', 
    title: 'Dia dos Avós', 
    type: 'commemorative',
    description: 'Data com cunho afetivo muito forte.',
    businessTip: 'Sugira presentes que evocam memória e conforto (pantufas, porta-retratos, cestas de café da manhã).'
  },

  // AGOSTO
  { 
    date: '2026-08-09', 
    title: 'Dia dos Pais', 
    type: 'holiday',
    description: 'Homenagem à figura paterna.',
    businessTip: 'Foco em presentes masculinos: eletrônicos, ferramentas, bebidas artesanais e vestuário. Churrascarias ficam lotadas.'
  },
  { 
    date: '2026-08-15', 
    title: 'Dia dos Solteiros', 
    type: 'special',
    description: 'Data para celebrar a liberdade e o amor próprio.',
    businessTip: 'Baladas e bares podem promover a "Noite dos Solteiros". O varejo pode focar em itens de indulgência pessoal.'
  },
  { 
    date: '2026-08-22', 
    title: 'Dia do Folclore', 
    type: 'commemorative',
    description: 'Celebração da cultura popular brasileira.',
    businessTip: 'Escolas e livrarias podem promover eventos culturais e venda de livros nacionais.'
  },

  // SETEMBRO
  { 
    date: '2026-09-07', 
    title: 'Independência do Brasil', 
    type: 'holiday',
    description: 'Feriado nacional cívico.',
    businessTip: 'Feriado que movimenta o turismo nacional. O varejo pode usar as cores verde e amarelo em vitrines temáticas.'
  },
  { 
    date: '2026-09-15', 
    title: 'Dia do Cliente', 
    type: 'commemorative',
    description: 'Dia criado especialmente para agradecer quem move o comércio.',
    businessTip: 'Não tente apenas vender: dê mimos, brindes ou descontos exclusivos como forma de agradecimento pela fidelidade.'
  },
  { 
    date: '2026-09-21', 
    title: 'Dia da Árvore', 
    type: 'commemorative',
    description: 'Conscientização ambiental.',
    businessTip: 'Empresas podem distribuir sementes ou mudas como brinde, reforçando uma imagem sustentável.'
  },
  { 
    date: '2026-09-22', 
    title: 'Início da Primavera', 
    type: 'special',
    description: 'Estação das flores.',
    businessTip: 'Renovação de vitrines com muitas cores e flores. Floriculturas e jardinagem têm pico de vendas.'
  },

  // OUTUBRO
  { 
    date: '2026-10-04', 
    title: 'Eleições - 1º Turno', 
    type: 'holiday', 
    description: 'Dia de votação para Presidente, Governadores, Senadores e Deputados.',
    businessTip: 'Evite manifestações políticas na marca para não alienar clientes. O foco do dia é a cidadania.'
  },
  { 
    date: '2026-10-04', 
    title: 'Dia dos Animais', 
    type: 'commemorative',
    description: 'Dia de São Francisco de Assis, padroeiro dos animais.',
    businessTip: 'Pet shops podem oferecer banhos promocionais, brindes para pets e feiras de adoção.'
  },
  { 
    date: '2026-10-12', 
    title: 'N. Sra. Aparecida / Crianças', 
    type: 'holiday',
    description: 'Feriado religioso e Dia das Crianças.',
    businessTip: 'Data crucial para lojas de brinquedos e vestuário infantil. Ofereça atividades recreativas na loja para atrair as famílias.'
  },
  { 
    date: '2026-10-15', 
    title: 'Dia dos Professores', 
    type: 'commemorative',
    description: 'Homenagem aos mestres.',
    businessTip: 'Papelarias e lojas de presentes devem montar kits prontos ("lembrancinhas") para alunos presentearem seus professores.'
  },
  { 
    date: '2026-10-25', 
    title: 'Eleições - 2º Turno', 
    type: 'holiday', 
    description: 'Rodada decisiva das eleições gerais.',
    businessTip: 'Atenção aos horários de funcionamento. Garanta que colaboradores tenham tempo hábil para votar.'
  },
  { 
    date: '2026-10-31', 
    title: 'Halloween', 
    type: 'special',
    description: 'O Dia das Bruxas tem ganhado muita força no Brasil.',
    businessTip: 'Festas temáticas, venda de doces, fantasias e maquiagem artística. Decore a loja para atrair atenção.'
  },

  // NOVEMBRO
  { 
    date: '2026-11-02', 
    title: 'Finados', 
    type: 'holiday',
    description: 'Dia de respeito e memória aos falecidos.',
    businessTip: 'Floriculturas são o foco principal. O comércio em geral deve manter um tom respeitoso.'
  },
  { 
    date: '2026-11-15', 
    title: 'Proclamação da República', 
    type: 'holiday',
    description: 'Feriado histórico nacional.',
    businessTip: 'Mais um feriado que beneficia o turismo e o lazer de fim de semana.'
  },
  { 
    date: '2026-11-20', 
    title: 'Dia da Consciência Negra', 
    type: 'holiday',
    description: 'Reflexão sobre a inserção do negro na sociedade brasileira. Agora feriado nacional.',
    businessTip: 'Promova a literatura e a cultura afro-brasileira. Dê espaço para criadores e empreendedores negros.'
  },
  { 
    date: '2026-11-27', 
    title: 'Black Friday', 
    type: 'special',
    description: 'A maior data de descontos do varejo mundial.',
    businessTip: 'Prepare seu estoque e logística. Ofereça descontos agressivos e reais. O consumidor espera por oportunidades imperdíveis.'
  },

  // DEZEMBRO
  { 
    date: '2026-12-21', 
    title: 'Início do Verão', 
    type: 'special',
    description: 'Estação mais quente do ano e férias escolares.',
    businessTip: 'Moda praia, protetor solar, sorveterias e academias (projeto verão) estão em alta.'
  },
  { 
    date: '2026-12-24', 
    title: 'Véspera de Natal', 
    type: 'holiday',
    description: 'Últimos preparativos para o Natal.',
    businessTip: 'Horário estendido de funcionamento para atender os atrasados. Foco em presentes fáceis de escolher.'
  },
  { 
    date: '2026-12-25', 
    title: 'Natal', 
    type: 'holiday',
    description: 'A data mais importante do ano para o comércio cristão ocidental.',
    businessTip: 'O foco muda para o pós-venda: facilite trocas para fidelizar o cliente que ganhou o presente.'
  },
  { 
    date: '2026-12-31', 
    title: 'Véspera de Ano Novo', 
    type: 'holiday',
    description: 'Preparação para o Réveillon.',
    businessTip: 'Venda de roupas brancas, espumantes, lentilha e romã. Supermercados ficam lotados.'
  },
];