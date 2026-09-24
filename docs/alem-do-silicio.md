---
title: Além do silício
description: Os semicondutores de banda larga que competem com o silício onde ele perde — SiC e GaN — e as outras funções que o próprio silício desempenha além de processar e gerar energia.
dataAsOf: 2026
---

# Além do silício

Todo este site trata o silício como **o** material dos semicondutores. Isso é verdade para a lógica e para a fotovoltaica, e falso em duas direções que valem um capítulo.

Na primeira, existem semicondutores que **não** são silício e ganham dele em aplicações específicas — não por serem melhores em tudo, mas por terem uma propriedade que o silício não tem. Na segunda, o silício faz muito mais coisas do que processar dados e gerar energia: ele também é estrutura mecânica, sensor e, mais recentemente, hospedeiro de qubits.

## Os vizinhos de banda larga

O parâmetro que separa essa família é o **gap de banda**, e a diferença é grande: o silício tem **1,12 eV**, o carbeto de silício (4H-SiC) tem **3,26 eV** e o nitreto de gálio (GaN) tem **3,40 eV** <Cite id="elem-ioffe" /> <Cite id="wbg-ioffe-sic" /> <Cite id="wbg-ioffe-gan" />.

| Material | Gap (300 K) | Onde ganha |
| --- | --- | --- |
| **Si** | 1,12 eV | Lógica, memória, fotovoltaica, sensores |
| **4H-SiC** | 3,26 eV | Chaveamento de potência em alta tensão |
| **GaN** | 3,40 eV | Potência em alta frequência, radiofrequência e luz azul |

A consequência do gap maior é uma **tensão de ruptura muito mais alta**: um material com banda proibida larga suporta um campo elétrico maior antes de entrar em avalanche <Cite id="elem-sze" />. E isso muda a geometria do dispositivo. Um transistor de potência precisa de uma região de deriva espessa e pouco dopada para segurar a tensão; quanto maior o campo crítico, **mais fina e mais dopada** essa região pode ser, e menor é a resistência em condução. É por isso que SiC e GaN conseguem fazer, num volume pequeno, o que o silício só faz num volume maior.

No chaveamento de alta tensão — inversores de tração de veículos elétricos, conversores de rede e fontes industriais —, o concorrente direto do SiC não é o transistor de silício, e sim o **IGBT**, um dispositivo bipolar que acumula portadores minoritários e por isso tem uma cauda de corrente no desligamento. O MOSFET de SiC elimina essa cauda, e a diferença de perda aparece justamente na frequência de chaveamento <Cite id="elem-sze" />.

No GaN, a vantagem vem de outra interface: no contato entre AlGaN e GaN forma-se um **gás de elétrons bidimensional**, uma camada de portadores de alta mobilidade sem dopagem intencional — o que dá origem ao transistor HEMT e às suas versões de potência e de radiofrequência <Cite id="wbg-ioffe-gan" />. E a mesma família de materiais resolveu um problema que o silício não resolve por física, e não por engenharia: **emitir luz azul**. O LED azul eficiente, de Akasaki, Amano e Nakamura, é o que tornou possível a iluminação branca de estado sólido, e rendeu o Nobel de Física de 2014 <Cite id="wbg-nobel-2014" />.

Vale reter a razão pela qual esses materiais **não** substituem o silício na lógica: o problema não é o gap, é o **substrato**. Crescer um cristal grande e sem defeitos é a parte difícil, e é ali que o silício tem décadas de vantagem — o mesmo argumento que o capítulo de [células e módulos solares](/celulas-solares) faz para explicar por que o silício domina a fotovoltaica apesar de ter um gap indireto pior para absorver luz.

## As outras vidas do silício

Antes de ser um processador, o silício é um material estrutural excelente: duro, elástico em uma faixa previsível e moldável com precisão submicro-métrica. Três dessas funções merecem registro.

**MEMS.** Sensores de sistema microeletromecânico — acelerômetros, giroscópios, microfones, sensores de pressão — são silício usinado, não silício dopado. A fabricação usa as mesmas ferramentas da fab: corrosão úmida **anisotrópica**, que ataca planos cristalinos diferentes em velocidades diferentes, e corrosão profunda por plasma (**DRIE**), que escava trincheiras verticais <Cite id="bosch-drie" />. Todo telefone carrega dezenas deles.

**Sensores de imagem.** O sensor CMOS é, hoje, provavelmente o produto de silício mais numeroso do mundo. A geração atual empilha duas lâminas — a de pixels e a de circuitos — e as liga por **vias passantes** (TSV), a mesma tecnologia que o capítulo de [empacotamento](/empacotamento) descreve para os pacotes 3D <Cite id="semieng-tsv" />.

**Fotônica de silício.** Aqui o silício é, de novo, vítima do próprio gap. Um material de gap indireto **não emite luz com eficiência** <Cite id="elem-sze" />, e por isso um circuito fotônico integrado em silício não consegue fazer seu próprio laser: ele guia, modula e detecta luz muito bem, mas precisa buscar a fonte em outro material, integrado ao chip. É a mesma propriedade física que explica, no capítulo solar, por que são necessários **100 µm de silício** para absorver o que **1 µm de arseneto de gálio** absorve <Cite id="saimm" />.

**Qubits.** E há um uso em que o silício é escolhido exatamente por ser silício: como o isótopo ²⁹Si tem spin nuclear, o silício natural é um ambiente **magneticamente ruidoso** para um qubit. Purificar o isótopo — deixar quase só ²⁸Si — cria o ambiente silencioso em que qubits de spin operam <Cite id="wbg-si28-qubit" /> <Cite id="elem-ciaaw" />.

## O que fica

O silício não venceu por ser o melhor material em cada função. Ele venceu por ser **bom o bastante** numa faixa larguíssima de funções, com um óxido nativo que serve de isolante, um substrato que se cresce em diâmetros grandes e uma cadeia industrial construída em volta dele por sete décadas <Cite id="saimm" />.

Os materiais deste capítulo entram onde essa combinação não basta — e a entrada deles não substitui o silício, ela o complementa. Um chip de potência em SiC continua sendo montado sobre silício, empacotado com silício e alimentado por silício.

<SourceNote :ids="['elem-ioffe', 'wbg-ioffe-sic', 'wbg-ioffe-gan', 'elem-sze', 'wbg-nobel-2014', 'bosch-drie', 'semieng-tsv', 'saimm', 'wbg-si28-qubit', 'elem-ciaaw']" />

<SeeAlso :links="[
  { text: 'O elemento silício', href: '/o-elemento-silicio', note: 'por que o silício, e não o germânio' },
  { text: 'Evolução dos transistores', href: '/transistores', note: 'o transistor de potência no plano do silício' },
  { text: 'Células e módulos solares', href: '/celulas-solares', note: 'o gap indireto como limite' },
  { text: 'Referências', href: '/referencias', note: 'lista numerada' },
]" />
