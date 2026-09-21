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

### Superfície: virgem ou processado

Um wafer **virgem** e polido é um espelho cinza. Um wafer que já passou pela litografia mostra um padrão **iridescente**, e as cores não são tinta nem oxidação: são **interferência de filme fino** nas camadas de poucos nanômetros empilhadas sobre a lâmina, somada à difração da própria grade de traços. Sob luz forte dá para ver a grade de *dice* e as linhas de corte (*scribe lines*) a olho nu — o que distingue de imediato um wafer processado de uma lâmina de teste em branco.

## Dopagem

A dopagem introduz impurezas intencionais em semicondutor **intrínseco** (sem dopagem intencional) para modular propriedades elétricas, ópticas ou estruturais, gerando semicondutor **extrínseco**.

- **Dopagem leve:** ~1 átomo dopante por 100 milhões de átomos.
- **Dopagem pesada:** ~1 por 10 mil átomos.

Um semicondutor com igual número de elétrons excitados e buracos (**n = p**) está **compensado** (comportamento próximo ao intrínseco em equilíbrio térmico).

<DiagramFigure src="/assets/silicon-doping-p-n.svg" alt="Silício intrínseco, dopagem tipo P (B) e tipo N (Sb)">
Tipo P: buraco (<em>void</em>) com boro (B). Tipo N: quinto elétron de valência com antimônio (Sb). VectorVoyager — <a href="https://commons.wikimedia.org/wiki/File:Silicon_doping_-_Type_P_and_N.svg" target="_blank" rel="noopener noreferrer">Silicon doping (P and N)</a> (CC BY-SA 4.0), SVG da Wikimedia Commons.
</DiagramFigure>

<SeeAlso :links="[
  { text: 'Fabricação de wafers', href: '/fabricacao-wafers', note: 'orientação &lt;100&gt; / &lt;111&gt; no CZ' },
  { text: 'Transistores', href: '/transistores', note: 'dopagem e implantação iônica' },
]" />
