---
title: Polissilício
description: Purificação química via TCS, processos Siemens e FBR, e histórico do mercado de polissilício.
---

# Purificação química e polissilício

O Silício de Grau Metalúrgico ([MG-Si](/glossario)) contém impurezas metálicas e dopantes que afetam severamente o desempenho de semicondutores e painéis solares <Cite id="energy-central" />. Para atingir o grau de **polissilício** (silício policristalino de altíssima pureza), ele deve ser refinado quimicamente <Cite id="csiro" />.

A matéria-prima nunca foi o gargalo: o silício é o **segundo elemento mais abundante da crosta terrestre**, atrás apenas do oxigênio <Cite id="pv-mfg-polysilicon" />. Todo o valor desta etapa está em separar do silício os poucos átomos de boro, fósforo e metais que arruínam um transistor ou uma célula solar — e nenhuma filtragem física dá conta disso.

## Visão geral da rota

<DiagramFigure src="/assets/polysilicon-process.svg" alt="Fluxograma da rota do polissilício: quartzo e carbono no forno de arco, MG-Si moído, cloração em leito fluidizado formando triclorossilano, destilação fracionada e deposição no reator Siemens ou no reator de leito fluidizado">
A rota completa: o quartzo vira silício bruto no forno de arco; o silício bruto vira gás para poder ser destilado; e o gás volta a ser silício sólido — agora ultrapuro — nos reatores de deposição.
</DiagramFigure>

O princípio que organiza a rota é contraintuitivo: **o silício não se purifica como sólido, e sim como gás**. Convertê-lo em triclorossilano, cujo ponto de ebulição é de apenas **31,8 °C**, permite usar **destilação fracionada** — a mesma tecnologia das refinarias de petróleo — para separar impurezas que nenhum filtro conseguiria reter <Cite id="pv-mfg-polysilicon" />. Purificar um gás e depois solidificá-lo de volta é o que separa o silício de grau metalúrgico do silício de grau solar ou eletrônico.

## Do forno de arco ao MG-Si

A etapa anterior a esta página já entrega o material de partida. O quartzo (SiO₂) é reduzido com carbono em um **forno elétrico de arco submerso** a cerca de 2000 °C <Cite id="csiro" />, numa sequência de reações em que o carbeto de silício (SiC) é um intermediário essencial:

```text
SiO₂ + 3C → SiC + 2CO (g)          (região superior, ~1600 °C)
SiO₂ + 2SiC → 3Si + 2CO (g)        (região inferior, >1780 °C)
```

O detalhe que explica a economia do forno é uma terceira reação, que fecha o ciclo <Cite id="pv-mfg-polysilicon" />:

```text
2SiO₂ + SiC → 3SiO (g) + CO (g)
```

O **monóxido de silício** gasoso sobe junto com o CO, recombina-se nas zonas frias da carga e regenera SiO₂ e carbono — que voltam a alimentar a primeira reação. Por isso o forno é praticamente **autossuficiente em reagentes**: consome energia elétrica em grande quantidade, mas desperdiça pouca matéria-prima <Cite id="pv-mfg-polysilicon" />.

O produto é o **MG-Si**, drenado pelo fundo do forno com pureza de 98% a 99,5% <Cite id="saimm" />. O passo seguinte, a cloração, é justamente onde a impureza deixa de ser um problema de minério e passa a ser um problema de química. Os detalhes da redução carbotérmica estão em [Mineração e MG-Si](/mineracao-mg-si).

## Conversão em triclorossilano (TCS)

Para virar gás, o MG-Si não é fundido: ele é **moído até virar pó**. A moagem não é um detalhe — ela multiplica a área de superfície exposta ao gás, e é o que permite que a reação aconteça em segundos em vez de horas.

Esse pó é injetado em um **reator de leito fluidizado** operando com **alta pressão e velocidade**, onde partículas sofrem a ação de um **gás clorídrico anidro (HCl)** na presença de um **catalisador** <Cite id="pv-mfg-polysilicon" />. O resultado não é uma substância só, mas uma **família de clorossilanos** e outros cloretos voláteis, dos quais o **triclorossilano** (TCS, SiHCl₃) é de longe o mais importante <Cite id="pv-mfg-polysilicon" />:

```text
Si + 3HCl → SiHCl₃ + H₂
```

Com ponto de ebulição de apenas **31,8 °C**, o TCS sai do reator já como gás <Cite id="ratedpower" />. No topo do reator um filtro separa o TCS gasoso do hidrogênio e do HCl residual <Cite id="pv-mfg-polysilicon" />, e o gás segue para **destilação fracionada**, onde a diferença de volatilidade entre o TCS e os cloretos de boro, fósforo e metais faz a separação com altíssima precisão <Cite id="ratedpower" />. É aqui, e não antes, que o silício se torna realmente puro.

## Processos de obtenção do polissilício sólido

O gás TCS purificado é convertido de volta a silício metálico sólido e ultra-puro por dois métodos principais.

### Processo Siemens (CVD)

Criado na década de 1950 pelas empresas Siemens e Wacker, é o método dominante no mercado mundial <Cite id="bernreuter" />. O gás TCS é injetado com hidrogênio (H₂) em um reator de redoma de aço onde **eletrodos de grafita** fazem passar corrente por um **núcleo de silício em forma de “U”** — a semente <Cite id="pv-mfg-polysilicon" />. Esse núcleo é aquecido eletricamente a cerca de **1100–1150 °C** <Cite id="bernreuter" />, e o TCS sofre **redução por hidrogênio**, num mecanismo equivalente ao de um **CVD** (*chemical vapour deposition*): o silício sólido se deposita sobre a semente e cresce ao redor dela, liberando HCl gasoso <Cite id="pv-mfg-polysilicon" />.

Quando o processo termina, o núcleo em “U” e o silício depositado são extraídos juntos e fraturados. Os bastões atingem de **15 a 20 cm de diâmetro** <Cite id="ratedpower" /> e o material sai com pureza de **9N** ou mais, pronto para ser classificado <Cite id="pv-mfg-polysilicon" />. É um processo de altíssimo consumo de energia — a principal desvantagem do método.

Classes de pureza:

- **Grau solar (SoG-Si):** 7N (99,99999%) a 9N — células fotovoltaicas <Cite id="ratedpower" />.
- **Grau eletrônico (EG-Si):** 10N a 11N — semicondutores <Cite id="ratedpower" />.

### Reator de leito fluidizado (FBR)

Método de fluxo contínuo em que partículas semente de silício são mantidas suspensas por gás portador contendo monossilano (SiH₄) ou TCS <Cite id="bernreuter" />. O gás se decompõe a temperaturas bem menores — **650–700 °C** no caso do monossilano —, acumulando silício nas sementes até formarem grânulos colhidos continuamente, sem a etapa de fratura dos bastões. Consome cerca de **90% menos energia elétrica** que o Siemens, embora gere uma fração indesejada de poeira de silício <Cite id="bernreuter" />.

<VideoPressEmbed id="ZlxguS11" title="Animação da rota de produção de polissilício" />

<SourceNote :ids="['pv-mfg-polysilicon', 'bernreuter', 'ratedpower', 'csiro', 'saimm']" />

*Animação e esquema da rota: [PV-Manufacturing.org](https://pv-manufacturing.org/silicon-production/polysilicon-production/) — o fluxograma acima foi redesenhado a partir do diagrama dessa página e da descrição das reações* <Cite id="pv-mfg-polysilicon" />.

## Dinâmica e histórico de mercado

Em **1995**, cerca de 90% da demanda global por polissilício ia para semicondutores e 10% para fotovoltaica <Cite id="bernreuter" />. Em **2014**, a proporção inverteu-se: o setor fotovoltaico passou a consumir a esmagadora maioria, elevando a demanda de **1.500 toneladas** (1995) para **420.000 toneladas** (2018).

<DiagramFigure src="/pdf-images/p05-1.png" alt="Demanda de polissilício semicondutores vs fotovoltaica 1995 e 2014">
Inversão das fatias de mercado e crescimento de **18,4×** entre 1995 e 2014 (15,1 kt → 278 kt).
</DiagramFigure>

<SourceNote :ids="['bernreuter']" />

*Between 1995 and 2014, the annual polysilicon demand increased by a factor of 18.4; the ratio between the shares of semiconductors and photovoltaics reversed completely* — fontes do gráfico no PDF: PV News, Sage Concepts e Bernreuter Research <Cite id="bernreuter" />.

<DiagramFigure src="/pdf-images/p05-2.png" alt="Preço histórico do polissilício 1977–2017">
Ciclos de escassez (*shortage*) e sobreoferta (*oversupply*).
</DiagramFigure>

<SourceNote :ids="['bernreuter']" />

Esse crescimento nos anos 2000 fez o número de plantas saltar de **11** (2004) para **61** (2010). A sobreoferta global provocou o fechamento de mais de **40 plantas** apenas na China nos três anos seguintes <Cite id="bernreuter" />.

A partir desse marco, a China consolidou liderança ao investir em refinamento tecnológico e subsídios para baratear custos <Cite id="bernreuter" />.

<SeeAlso :links="[
  { text: 'Linha do tempo', href: '/linha-do-tempo', note: 'marcos do mercado de polissilício' },
  { text: 'Fabricação de wafers', href: '/fabricacao-wafers', note: 'EG-Si → lingote CZ' },
  { text: 'Mineração e MG-Si', href: '/mineracao-mg-si', note: 'o forno de arco antes da purificação' },
  { text: 'Referências', href: '/referencias#ref-3', note: 'Bernreuter Research' },
]" />
