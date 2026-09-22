---
title: Estrutura e tipos de wafer
description: Estrutura cúbica de diamante, índices de Miller, classificação de wafers e dopagem tipo P/N.
---

# Estrutura cristalina e tipos de wafer

## Estrutura do silício puro

O silício cristalino adota a **estrutura cúbica de diamante** (*diamond cubic crystal structure*).

<DiagramFigure src="/pdf-images/p08-1.png" alt="Estrutura cúbica de diamante">
The diamond cubic crystal structure.
</DiagramFigure>

<DiagramFigure src="/pdf-images/p08-2.png" alt="Célula unitária do silício">
Orientações cristalográficas (&lt;100&gt;, &lt;110&gt;, &lt;001&gt;) e constante de rede a<sub>Si</sub>.
</DiagramFigure>

### Recursos adicionais

- [Estrutura cristalina — YouTube](https://www.youtube.com/watch?v=lgYQE2aTNNc)
- [Orientação e estrutura cristalina — WaferPro](https://waferpro.com/understanding-silicon-wafer-orientation-and-crystal-structure/)
- [Miller indices — YouTube](https://www.youtube.com/watch?v=_A7oqoMFIiA)
- [Miller Indices (SVG) — Wikimedia](https://upload.wikimedia.org/wikipedia/commons/d/d5/Miller_Indices_Felix_Kling.svg) · [página Commons](https://commons.wikimedia.org/wiki/File:Miller_Indices_Felix_Kling.svg) (DeepKling, CC BY 3.0)

Podemos inferir a estrutura do cristal com **DRX (difração de raios-X)** em condições controladas (amostra limpa e orientada). A **lei de Bragg** descreve a reflexão dos raios X pelos planos cristalinos e permite determinar geometria da rede — inclusive em alguns materiais parcialmente cristalinos ou filmes finos quando a resolução experimental é suficiente.

### Índices de Miller

Índices que descrevem direções e planos cristalográficos; planos podem ter propriedades **anisotrópicas** (dependentes da direção).

<DiagramFigure src="/assets/miller-indices.svg" alt="Índices de Miller em estrutura cúbica">
DeepKling — <a href="https://commons.wikimedia.org/wiki/File:Miller_Indices_Felix_Kling.svg" target="_blank" rel="noopener noreferrer">Miller Indices</a> (CC BY 3.0), SVG da Wikimedia Commons.
</DiagramFigure>

## Por que silício, e não germânio

Os primeiros transistores não eram de silício, e sim de **germânio** — o material que Bardeen e Brattain usaram em 1947. A troca não foi preferência estética: foram três propriedades que decidiram a disputa <Cite id="ge-vs-si" />.

A primeira é o **gap de banda**. O germânio tem 0,7 eV; o silício, 1,1 eV. Um gap estreito significa que pares elétron-buraco se formam termicamente com pouca energia, e o material passa a conduzir sozinho quando esquenta. Dispositivos de germânio perdiam controle a temperaturas modestas, enquanto os de silício operavam centenas de graus mais alto, com correntes de fuga muito menores <Cite id="ge-vs-si" />.

A segunda — e historicamente a decisiva — é o **óxido nativo**. O silício, exposto ao oxigênio, forma espontaneamente uma camada de **SiO₂** estável, isolante e insolúvel em água, que protege a superfície do cristal e ainda serve de máscara de difusão na fabricação. O óxido do germânio (**GeO₂**) é o oposto: termicamente instável e solúvel em água, inútil como proteção. Foi essa diferença que viabilizou o **processo planar** e, com ele, o circuito integrado — e mais tarde o próprio MOSFET, que depende de uma interface SiO₂–Si com densidade de estados de superfície baixíssima <Cite id="ge-vs-si" />.

A terceira é a mais prosaica: o silício é **abundante** e, por isso, barato; o germânio é raro <Cite id="ge-vs-si" />.

Nada disso tornou o germânio inútil: ele voltou como **SiGe**, estirando a rede do silício em canais avançados ([Evolução dos transistores](/transistores)) <Cite id="ge-vs-si" />. Mas o wafer de partida continua sendo de silício.

## Tipos de wafer

Classificamos wafers por **tamanho**, **pureza**, **tipo de dopagem** e **índices de Miller** (orientação dos planos na rede cristalina). A orientação cristalográfica do silício é verificada por DRX e marcada no lingote (chanfro/entalhe) antes do processamento na fab.

## Como identificar um wafer pela borda

Uma lâmina redonda não tem "cima". Sem uma referência na borda, nada diz à máquina para onde apontam os eixos do cristal — e é essa referência que permite alinhar máscara e rede cristalina camada após camada. Por isso todo wafer leva um **fiducial de orientação**: um chanfro plano (*flat*) nos diâmetros menores, ou um **entalhe em V** (*notch*) a partir de 200 mm <Cite id="semi-m1" />. Ler esse fiducial é a forma mais direta de identificar um wafer que você tem em mãos.

<DiagramFigure src="/assets/wafer-identification.svg" alt="Quatro wafers com flats mostrando as combinações de tipo e orientação (P 111 sem flat secundário, N 111 a 45 graus, P 100 a 90 graus, N 100 a 180 graus) e, abaixo, um wafer de 300 mm com notch, com o detalhe ampliado do entalhe de 90 graus e 1,00 mm de profundidade">
Como a borda codifica a orientação — e, nos wafers menores, também a dopagem. Desenho do autor, a partir da SEMI M1 <Cite id="semi-m1" />.
</DiagramFigure>

### *Flats*: wafers de até 150 mm

Nesses wafers a borda traz **dois** chanfros de comprimentos diferentes. O **primário**, mais longo, fica na parte de baixo e é paralelo a um plano {110}: é a referência de orientação. O **secundário**, mais curto, existe em apenas parte dos wafers — e é a **posição angular dele** que informa, de uma só vez, a orientação e o tipo de dopagem <Cite id="semi-m1" />.

| Ângulo do flat secundário | Tipo | Orientação |
| --- | --- | --- |
| ausente | P | &lt;111&gt; |
| 45° | N | &lt;111&gt; |
| 90° | P | &lt;100&gt; |
| 180° | N | &lt;100&gt; |

Existe uma exceção para os wafers de **150 mm** do tipo (100) N: o flat secundário fica a **135°**, não a 180°. A própria norma registra a mudança com data — ela vale desde 1.º de janeiro de 1990, e wafers fabricados antes disso seguem a convenção antiga <Cite id="semi-m1" />.

### *Notch*: 200 mm e 300 mm

A partir de 200 mm o chanfro reto é substituído por um único **entalhe em V** de 90°. A razão é área útil: quanto mais reta a borda, menos pastilhas inteiras cabem dentro do círculo. As dimensões são fixadas pela SEMI M1 <Cite id="semi-m1" />:

- profundidade de **1,00 mm** (+0,25 / −0,00);
- ângulo incluído de **90°** (+5 / −1);
- eixo alinhado a **&lt;110&gt;**, com tolerância de **±1°**.

Esse é todo o conteúdo informacional do notch: **orientação**. A norma também define wafers de 200 mm *com* flat, e nesse caso eles vêm explicitamente **sem** fiducial secundário <Cite id="semi-m1" />. Ou seja: a partir de 200 mm a borda deixa de dizer se o wafer é **P** ou **N**. Essa informação passa a vir do certificado do lote ou da **marcação a laser no verso** (formato **SEMI T7**, com campo opcional **A/N**) <Cite id="semi-m1" />.

### O que o diâmetro informa

Diâmetro e espessura caminham juntos, porque a lâmina precisa continuar rígida conforme cresce. Valores nominais da SEMI M1, todos com tolerância de **±20 µm** <Cite id="semi-m1" />:

| Diâmetro | Espessura nominal | Fiducial |
| --- | --- | --- |
| 100 mm | 525 µm | dois flats |
| 125 mm | 625 µm | dois flats |
| 150 mm | 675 µm | dois flats |
| 200 mm | 725 µm | notch |
| 300 mm | 775 µm | notch |

A mesma norma limita a variação de espessura (**TTV**) a **10 µm** e a deformação da lâmina — *bow* e *warp*. Para 200 mm a M1 admite até **65 µm** de *bow* e **75 µm** de *warp*; para 300 mm o *bow* fica em aberto e o *warp* em **100 µm** <Cite id="semi-m1" />. Folhas de especificação de fornecedor costumam trazer números bem mais apertados, porque o limite da norma é o mínimo que um wafer *prime* precisa cumprir — não o que a indústria de fato entrega.

### 450 mm: a transição que não aconteceu

O diâmetro parou de crescer em 300 mm, e não por falta de ambição. A lógica é irrecusável: a área de um wafer de 450 mm é **2,25×** a de um de 300 mm, o que multiplicaria o número de pastilhas por lâmina praticamente sem multiplicar o custo do processamento.

A história começou antes, e com outro número. Os primeiros cristais de **400 mm** foram puxados em **1995**, e a ideia era continuar nessa medida — mas em 2000 o *roadmap* da indústria (ITRS) fixou a próxima geração em **450 mm**, não 400 <Cite id="eng-450mm" />. O plano previa linhas-piloto em 2012 e produção entre 2014 e 2016 <Cite id="eng-450mm" />.

Em maio de 2008, **Intel, Samsung e TSMC** anunciaram um acordo para perseguir justamente essa meta <Cite id="intel-450mm" />. Do outro lado da mesa estavam os fornecedores de equipamento e de wafer, que teriam de refazer toda a base instalada — e que não enxergavam o retorno. O consórcio **G450C** foi montado em 2012, mas a Intel recolheu seus recursos em 2014 e a transição derrapou até parar <Cite id="eng-450mm" />.

O diagnóstico que sobrou é econômico, não técnico: a mudança dependia de a economia de escala compensar o custo de refazer equipamento, metrologia e infraestrutura, e essa conta nunca fechou <Cite id="eng-450mm" />. O 300 mm continua sendo o teto.

### Superfície: virgem ou processado

Um wafer **virgem** e polido é um espelho cinza. Um wafer que já passou pela litografia mostra um padrão **iridescente**, e as cores não são tinta nem oxidação: são **interferência de filme fino** nas camadas de poucos nanômetros empilhadas sobre a lâmina, somada à difração da própria grade de traços. Sob luz forte dá para ver a grade de *dice* e as linhas de corte (*scribe lines*) a olho nu — o que distingue de imediato um wafer processado de uma lâmina de teste em branco.

## Quem fabrica os wafers

A oferta de wafers é muito concentrada, e a maior parte da capacidade líder está no Japão. Na pesquisa anual de participação de mercado da Nikkei, a **Shin-Etsu** aparece em primeiro com **26,3%** e a **SUMCO** em segundo com **17,8%**, **44,1%** somados, à frente dos fornecedores seguintes <Cite id="nikkei-wafer-share" />.

Vale registrar um número que circula com frequência: que as duas teriam "60% do mercado". Os dados da pesquisa apontam para **44,1%** em unidades, e para pouco mais da metade do **volume de 300 mm** <Cite id="nikkei-wafer-share" /> <Cite id="wafer-market" /> — não 60%. O que não está em dúvida é a concentração: as três empresas seguintes vêm de Taiwan, Alemanha e Coreia do Sul e, somadas, chegam a **31,9%** <Cite id="nikkei-wafer-share" />. As cinco maiores respondem, portanto, por cerca de **três quartos** de tudo.

Não há espaço real para um entrante novo, e as barreiras se acumulam há décadas: o cristal é difícil de puxar, a especificação é implacável e a qualificação de um fornecedor por uma fab leva anos.

A geografia é igualmente reveladora. A maior parte dessa capacidade está no **Japão**, herança dos anos 1980, quando as grandes químicas japonesas investiram em materiais para atender a própria indústria nacional de semicondutores <Cite id="nikkei-wafer-share" />. Isso cria um ponto único de falha — quando um terremoto ou incêndio atinge uma dessas plantas, a cadeia global sente <Cite id="asianometry-wafer" />.

## Dopagem

A dopagem introduz impurezas intencionais em semicondutor **intrínseco** (sem dopagem intencional) para modular propriedades elétricas, ópticas ou estruturais, gerando semicondutor **extrínseco**.

- **Dopagem leve:** ~1 átomo dopante por 100 milhões de átomos.
- **Dopagem pesada:** ~1 por 10 mil átomos.

Um semicondutor com igual número de elétrons excitados e buracos (**n = p**) está **compensado** (comportamento próximo ao intrínseco em equilíbrio térmico).

Há um caso em que a escolha do dopante deixa de ser detalhe de processo e passa a decidir a confiabilidade do produto: na fotovoltaica, o boro reage com o oxigênio do silício Cz e degrada a célula sob iluminação, o que levou a indústria a substituí-lo pelo **gálio** — assunto tratado no capítulo de [células e módulos solares](/celulas-solares).

<DiagramFigure src="/assets/silicon-doping-p-n.svg" alt="Silício intrínseco, dopagem tipo P (B) e tipo N (Sb)">
Tipo P: buraco (<em>void</em>) com boro (B). Tipo N: quinto elétron de valência com antimônio (Sb). VectorVoyager — <a href="https://commons.wikimedia.org/wiki/File:Silicon_doping_-_Type_P_and_N.svg" target="_blank" rel="noopener noreferrer">Silicon doping (P and N)</a> (CC BY-SA 4.0), SVG da Wikimedia Commons.
</DiagramFigure>

<SourceNote :ids="['ge-vs-si', 'semi-m1', 'nikkei-wafer-share', 'wafer-market', 'eng-450mm', 'intel-450mm', 'asianometry-wafer', 'lid-hallam']" />

<SeeAlso :links="[
  { text: 'Fabricação de wafers', href: '/fabricacao-wafers', note: 'orientação &lt;100&gt; / &lt;111&gt; no CZ' },
  { text: 'Transistores', href: '/transistores', note: 'dopagem e implantação iônica' },
]" />
