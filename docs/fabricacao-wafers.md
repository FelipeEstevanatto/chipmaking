---
title: Fabricação de wafers
description: Do polissilício EG-Si ao wafer pronto para fab — Czochralski, corte, CMP e limpeza RCA.
dataAsOf: 2025
---

# Fabricação do wafer de silício

A transformação do polissilício de grau eletrônico ([EG-Si](/glossario)) em wafers monocristalinos requer uma sequência rigorosa de processos físico-químicos e mecânicos de precisão. O objetivo primário é produzir lingotes livres de defeitos cristalinos e convertê-los em lâminas extremamente planas, com rugosidade superficial em nível atômico. As oito etapas a seguir cobrem essa sequência, do crescimento do cristal à inspeção final.

## Crescimento do monocristal (Czochralski — CZ)

O método **Czochralski** é o padrão industrial dominante <Cite id="zulehner-2000" />. Pedaços de polissilício de altíssima pureza são depositados em cadinho de quartzo altamente purificado, em forno a vácuo sob argônio inerte. O material é fundido a cerca de **1414 °C**. Um cristal-semente orientado (geralmente &lt;100&gt; ou &lt;111&gt;) é imerso na superfície do silício líquido e puxado lentamente para cima enquanto rotaciona em sentido oposto ao cadinho. Controlando taxa de puxamento e temperatura, forma-se um lingote cilíndrico monocristalino (**bole**) com diâmetros de **200 mm** ou **300 mm** e extensão superior a **1 m**.

Vale notar de onde vem essa pureza. O material que entra no cadinho não passou por filtragem nem por refusão: é o produto da **destilação do triclorossilano** descrita em [Purificação e polissilício](/polissilicio) <Cite id="wikipedia-tcs" />. Ele chega já na casa de **9N a 11N**, e o que o puxamento faz a partir daí é **redistribuir** os poucos dopantes restantes, conforme o coeficiente de segregação de cada um <Cite id="saimm" />.

<DiagramFigure src="/assets/czochralski-process.svg" alt="O processo Czochralski em quatro quadros: fusão do polissilício e dopagem no cadinho, introdução do cristal-semente, início do crescimento do cristal e puxamento do lingote">
O processo Czochralski em quatro quadros: fusão e dopagem, introdução da semente, início do crescimento e puxamento do lingote. Twisp — <a href="https://commons.wikimedia.org/wiki/File:Czochralski_Process.svg" target="_blank" rel="noopener noreferrer">Czochralski Process</a> (domínio público), Wikimedia Commons.
</DiagramFigure>

O princípio não mudou desde os primeiros anos da indústria: um cristal-semente orientado toca a superfície do silício líquido e sobe devagar, girando contra o cadinho, enquanto o lingote solidifica atrás dele.

<DiagramFigure src="/assets/silicon-czochralski-1956.jpg" alt="Um cristal de silício sendo puxado do cadinho pelo processo Czochralski em 1956">
Um cristal de silício sendo puxado na Raytheon, em 1956, para os primeiros transistores de silício. George E. Meyers — <a href="https://commons.wikimedia.org/wiki/File:Silicon_grown_by_Czochralski_process_1956.jpg" target="_blank" rel="noopener noreferrer">Silicon grown by Czochralski process, 1956</a> (domínio público), Wikimedia Commons.
</DiagramFigure>

<DiagramFigure src="/assets/silicon-seed-crystal-rod.jpg" alt="Haste de puxamento com a semente de silício monocristalino na ponta">
A haste de puxamento: a ponta espelhada é a própria **semente** de silício monocristalino, e é dela que o lingote herda a orientação cristalina. Warut Roonguthai — <a href="https://commons.wikimedia.org/wiki/File:Silicon_seed_crystal_puller_rod.jpg" target="_blank" rel="noopener noreferrer">Silicon seed crystal puller rod</a> (CC BY-SA 4.0), Wikimedia Commons.
</DiagramFigure>

### Um acidente com uma caneta

O método nasceu de um equívoco. Em **1916**, o metalurgista polonês **Jan Czochralski** trabalhava em Berlim medindo a velocidade de cristalização de ligas metálicas quando, distraído, mergulhou a pena no **cadinho de estanho fundido** em vez do tinteiro. Ao retirá-la, viu um fio fino de metal solidificado pendurado na ponta <Cite id="iucr-czochralski" />.

Ele refez o gesto de propósito, com várias penas, e notou que o fio se formava sempre — mas não quando puxava rápido. Substituiu a pena por capilares de vidro e passou a controlar a extração, obtendo fios de estanho, zinco e chumbo de cerca de **1 mm de diâmetro** e até **150 cm de comprimento** <Cite id="iucr-czochralski" />. O achado que fez a fama do experimento, porém, veio depois: aqueles fios eram **um único cristal**, contínuo de ponta a ponta — algo que a física da época só conseguia obter por métodos caros e lentos.

Czochralski publicou o método em 1918, com dois anos de atraso causado pela guerra <Cite id="iucr-czochralski" />. A transformação da técnica em ferramenta de semicondutor, no entanto, não foi obra dele.

### Do germânio ao silício

Em **1.º de outubro de 1948**, **Gordon Teal** e **John Little**, na Bell Labs, montaram um equipamento improvisado — sobre rodas, para escondê-lo num armário ao fim de cada noite — e puxaram os primeiros cristais **monocristalinos de germânio** <Cite id="nae-teal" /> <Cite id="chm-grown-junction" />. O ganho foi imediato: sem fronteiras de grão, os portadores minoritários atravessavam o material sem serem capturados, e os transistores ficaram muito mais uniformes. William Shockley chamou aquilo de "o desenvolvimento científico mais importante do início do semicondutor" <Cite id="chm-grown-junction" />.

O passo seguinte foi o silício, bem mais hostil. O banho precisa ser contido num cadinho de **quartzo** (a grafita contamina) e puxado **sob atmosfera controlada**, porque o silício fundido oxida em contato com o ar. Entre **1951 e 1952**, Teal e o técnico **Ernest Buehler** resolveram as duas coisas e anunciaram os primeiros cristais de silício e a primeira junção p-n crescida dentro de um deles <Cite id="teal-buehler-1952" />. É esse arranjo — quartzo, atmosfera inerte, semente girando — que a indústria usa até hoje.

### Oxigênio e carbono: o que o cadinho dissolve

O quartzo do cadinho não é inerte. Em contato com o silício fundido, ele se dissolve lentamente na massa — e é daí que vem a impureza dominante do silício Cz, o **oxigênio**, em concentrações muito acima de qualquer contaminante metálico: **[O] ≈ 5–10 × 10¹⁷ cm⁻³** e **[C] ≈ 5–10 × 10¹⁵ cm⁻³** <Cite id="pv-mfg-cz" />.

A solubilidade do oxigênio no silício cai várias ordens de grandeza entre a fusão e a temperatura ambiente <Cite id="pv-mfg-cz" />. O cristal termina o puxamento **supersaturado**, e no resfriamento o excesso precisa sair de solução: o oxigênio **precipita** como partículas de SiO₂.

O processo tem duas caras. Os precipitados são armadilhas eficientes para metais e funcionam como **gettering interno** — uma limpeza que acontece dentro do próprio wafer <Cite id="pv-mfg-cz" />. Mas o oxigênio que permanece intersticial, sem precipitar, forma **doadores térmicos** eletricamente ativos, que deslocam a resistividade medida. É esse defeito que o tratamento térmico remove depois, na etapa de RTP descrita adiante.

Há ainda uma terceira consequência, que só aparece em células solares e por isso é tratada no [capítulo de células solares](/celulas-solares): o oxigênio intersticial reage com o **boro** sob iluminação e forma um defeito que degrada a eficiência.

### Dopagem e o gradiente de resistividade

Dopar um lingote não é o mesmo que dopar uma solução homogênea. O dopante **não se reparte por igual** entre o líquido e o sólido — cada elemento tem um **coeficiente de segregação** (k), e o cristal incorpora dopante em proporção diferente conforme cresce. Para os dopantes usuais, os valores não poderiam ser mais distintos <Cite id="lid-hallam" />:

| Dopante | Coeficiente de segregação (k) |
| --- | --- |
| Fósforo (tipo n) | ≈ 0,35 |
| Boro (tipo p) | 0,8 |
| Gálio (tipo p) | 0,008 |

Com k < 1, o sólido **rejeita o dopante para o líquido**. Como o banho encolhe conforme o lingote é puxado, a concentração no líquido **sobe** ao longo do processo — e a do cristal que vai solidificando acompanha. O resultado é um **gradiente de resistividade**: a cabeça do lingote sai mais resistiva que a cauda <Cite id="pv-mfg-cz" />.

O caso do **gálio** é o mais extremo. Com k = 0,008, ele praticamente não sai do banho, e a resistividade varia por um fator enorme ao longo de um único lingote — reduzindo a fração aproveitável da peça <Cite id="lid-hallam" />. É esse o preço que a fotovoltaica aceitou ao trocar boro por gálio, como se detalha no [capítulo de células solares](/celulas-solares).

### Variantes do processo: RCz e CCz

Duas variações atacam justamente esse problema de uniformidade.

Na **RCz** (*Recharge Czochralski*), o cadinho é **recarregado com polissilício sem ser resfriado, aberto ou desmontado** — um alimentador introduz material novo no banho ainda quente <Cite id="pv-mfg-cz" />. Como o forno deixa de ser aberto a cada lingote, caem as paradas para manutenção, o *hot zone* fica menos exposto ao ar e a vida útil do equipamento aumenta. A técnica também reduz os ciclos térmicos bruscos que trincam o cadinho <Cite id="pv-mfg-cz" />.

Na **CCz** (*Continuous Czochralski*), o material é adicionado **durante** o puxamento, e não entre lingotes. Isso permite cadinhos bem mais rasos — logo, menos contato com as paredes de quartzo — e mantém a composição do banho **constante**, produzindo lingotes de resistividade uniforme e muito mais longos, já que o processo deixa de estar limitado ao volume inicial de fusão <Cite id="pv-mfg-cz" />. A contrapartida é que impurezas de k baixo **se acumulam** no banho e contaminam a parte final do lingote. Por essa complexidade, a CCz segue restrita a uma escala pequena <Cite id="pv-mfg-cz" />.

## Preparação do lingote e pré-usinagem

Após resfriamento, removem-se as extremidades cônicas (cabeça e cauda). O corpo cilíndrico passa por retificação externa por esmerilhamento para a dimensão exata. Produz-se então o **fiducial de orientação** — um **chanfro plano (*flat*)** nos diâmetros menores ou um **entalhe em V (*notch*)** a partir de 200 mm —, que dá às ferramentas automatizadas a referência cristalográfica e, nos wafers pequenos, também o tipo de dopagem ([como identificar um wafer](/estrutura-wafers#como-identificar-um-wafer-pela-borda)) <Cite id="semi-m1" />.

<DiagramFigure src="/assets/silicon-crystal-boule.jpg" alt="Lingote de silício monocristalino (bole) e hastes de silício em exposição">
Um lingote monocristalino (*boule*) e hastes de silício. Sebastian Wallroth — <a href="https://commons.wikimedia.org/wiki/File:Single-crystal_silicon_boule.jpg" target="_blank" rel="noopener noreferrer">Single-crystal silicon boule</a> (domínio público), Wikimedia Commons.
</DiagramFigure>

## Corte em fatias (wafer slicing)

O lingote retificado é **dividido em blocos** e fatiado com **serras de múltiplos fios diamantados (DWS)** <Cite id="moller-2012" />. Um conjunto paralelo de fios de aço revestidos com micropartículas de diamante move-se em altíssima velocidade sob tensão controlada, cortando centenas de wafers simultaneamente, com espessuras típicas de **700–800 µm**, maximizando rendimento e reduzindo perda de **kerf**.

### Da serra de disco interno ao fio diamantado

O corte já foi o gargalo da cadeia, e sua evolução tem três etapas.

Até os anos 1990, o instrumento padrão era a **serra de diâmetro interno (ID)**: um disco fino, com o abrasivo na face *interna* de um anel, que cortava **um wafer por vez** e levava alguns minutos por corte. O disco podia flexionar ou trazer defeitos próprios, que se transferiam para a lâmina e precisavam ser corrigidos depois. Apesar disso, foi a tecnologia dominante nas três últimas décadas do século XX <Cite id="pv-tech-dws" />.

A virada veio com a **serra de fio múltiplo** (*multi-wire*). A princípio o fio não cortava nada: ele apenas **transportava** até o lingote uma suspensão de **carbeto de silício** em óleo mineral — mais tarde, polietilenoglicol. Quem desgastava o silício era o abrasivo, por indentação sucessiva. Como centenas de fios correm em paralelo, todos os cortes de um lingote saem **de uma só vez**, ao contrário da serra ID, que fatiava lâmina a lâmina. A substituição foi gradual e acompanhou a queda da espessura: as serras de fio ganharam terreno quando as lâminas passaram de **500 µm** para menos <Cite id="pv-tech-dws" />.

A terceira etapa está em curso. No **fio diamantado**, o abrasivo deixa de estar na lama e passa a estar **fixo no próprio fio** — aço revestido com diamante. A produtividade sobe, o *kerf* cai, a lâmina pode ser mais fina e o processo dispensa a lama de SiC, trocando-a por fluido de corte à base de água, com impacto ambiental menor. Em contrapartida, o fio custa mais, quebra com mais facilidade e exige limpeza criteriosa <Cite id="pv-tech-dws" />.

Vale notar que, nos wafers de fab, o objetivo do corte não é a espessura mínima — é a **planura**. Uma lâmina de 300 mm sai com 775 µm e vai *perder* material na lapidação e no polimento, justamente para garantir paralelismo e ausência de dano subsuperficial <Cite id="semi-m1" />. É no ramo fotovoltaico, que aceita lâminas três vezes mais finas, que o *kerf* se torna a variável econômica decisiva — como se vê em [Wafers solares](#wafers-solares-o-outro-produto-da-mesma-cadeia).

## Arredondamento de bordas e lapidação

A aresta que sai do corte é viva e frágil. O **edge profiling** (perfilagem da borda) desbasta um contorno curvo — coroa no ápice, chanfros para os dois lados — para que a tensão se distribua em vez de se concentrar num canto. Sem isso a borda lasca no manuseio e no transporte e, pior, cada trinca vira fonte de partículas que depois voltam à superfície ativa; contornar a borda reduz exatamente esses lascamentos e ainda limita o excesso de material na borda (*edge crown*) e o acúmulo de fotoresistor na borda no *spin coating* <Cite id="semi-mf928" />. Nos wafers de 300 mm o padrão pede mais: **borda polida**, porque os vales deixados pela retificação retêm partículas e até fósforo que retorna à superfície durante a dopagem <Cite id="prostek-edge" /> <Cite id="semi-m1" />.

Depois vem a **lapidação (lapping)**: um lote de wafers é prensado entre duas placas de metal que giram em sentidos opostos, com lama abrasiva de alumina injetada entre elas. Como as duas faces são atacadas ao mesmo tempo, a operação corrige espessura, paralelismo e as ondulações deixadas pelo corte <Cite id="pei-2005" />.

<DiagramFigure src="/assets/wafer-edge-profile.svg" alt="Corte transversal da borda do wafer: acima, a aresta viva do corte, com lasca e microtrincas; abaixo, o perfil arredondado e polido, com coroa no ápice e chanfros frontal e traseiro">
Perfil da borda. Acima, a aresta viva que sai do corte: o canto concentra tensão, lasca e guarda microtrincas. Abaixo, o perfil arredondado — coroa e chanfros — que reparte a carga pelo contorno inteiro e, uma vez polido, não oferece vales para reter partículas. Desenho do autor, a partir de SEMI M1 e SEMI MF928 <Cite id="semi-mf928" /> <Cite id="prostek-edge" />.
</DiagramFigure>

<DiagramFigure src="/assets/wafer-lapping.svg" alt="Lapidação de dupla face: à esquerda, o corte transversal com dois pratos girando em sentidos opostos e lama abrasiva entre eles, com três wafers no meio; à direita, acima um wafer ondulado e abaixo um wafer com faces paralelas depois da lapidação">
Lapidação de dupla face. À esquerda, o princípio: os wafers ficam coplanares entre dois pratos que giram em sentidos opostos, e a lama abrasiva de alumina trabalha as duas faces ao mesmo tempo. À direita, o que se ganha — a ondulação do corte some e as faces ficam paralelas. Desenho do autor, a partir de Pei et al. (2005) <Cite id="pei-2005" />.
</DiagramFigure>

A lapidação, porém, tem custo: é lenta, gasta muito abrasivo, carrega e descarrega wafers à mão e deixa dano subsuperficial que precisa ser removido depois. É por isso que as linhas modernas a substituem pela **retificação simultânea de duas faces (SDSG)**, em que um único wafer passa entre dois rebolos de diamante — mais rendimento, menos consumível, mais automação e bem menos lama descartada <Cite id="pei-2005" />.

## Ataque químico (etching)

Corte e lapidação deixam uma camada danificada — microfraturas, deformação e tensão residual — que desce alguns micrômetros a algumas dezenas de micrômetros abaixo da superfície. O **etching** químico existe para apagá-la: nenhum polimento posterior conserta um defeito que continua enterrado sob uma face espelhada.

O ataque ácido (HF + HNO₃ + CH₃COOH) é **isotrópico** — remove silício na mesma velocidade em todas as direções, sem olhar para a orientação do cristal — e é usado justamente para tirar a camada danificada deixada por corte, chanfro e lapidação, com remoções de poucos a algumas dezenas de micrômetros <Cite id="us-6346485" />. O ataque alcalino (KOH ou NaOH) depende da orientação do cristal e rende wafers mais planos, melhor geometria de face traseira e menos risco de deposição metálica — vantagens que o levaram a substituir o ácido na remoção de dano em muitas linhas de produção <Cite id="dyer-1989" />.

<DiagramFigure src="/assets/wafer-damage-etch.svg" alt="Dois cortes transversais na mesma escala de profundidade: à esquerda, a camada danificada por corte e lapidação com microtrincas até 20 micrômetros; à direita, a mesma superfície depois do ataque, com a região removida marcada em tracejado">
Antes e depois do ataque, na mesma escala de profundidade (em micrômetros abaixo da superfície original). O ataque ácido come o silício danificado nas duas faces até a camada de microtrincas desaparecer; o alcalino faz o mesmo, mas seguindo a orientação do cristal. Desenho do autor, a partir de US 6.346.485 e Dyer et al. (1989) <Cite id="us-6346485" /> <Cite id="dyer-1989" />.
</DiagramFigure>

## Tratamento térmico e RTP

O oxigênio dissolvido no cristal Czochralski não é inerte. Mantido por horas por volta de **450 °C**, ele forma pequenos aglomerados que doam elétrons — os **doadores térmicos** — e desviam a resistividade do wafer do valor que se queria. O tratamento existe para desfazer isso: um recozimento rápido (**RTP**, *Rapid Thermal Processing*), com lâmpadas levando o wafer a **800–1000 °C por cerca de 10 segundos**, aniquila os doadores térmicos e devolve ao cristal a resistividade que eles haviam deslocado <Cite id="tokuda-1989" /> <Cite id="stein-1986" />.

A escolha do RTP em vez do forno não é sobre temperatura — é sobre tempo. O forno levaria **horas** na mesma faixa; em segundos, o wafer recebe o mesmo efeito sobre os doadores sem dar tempo para o boro e o fósforo já implantados difundirem. É a esse produto "temperatura × tempo" que a indústria chama de **orçamento térmico** <Cite id="tokuda-1989" />.

<DiagramFigure src="/assets/rtp-thermal-budget.svg" alt="Dois gráficos de temperatura por tempo: à esquerda, um forno que sobe a mil graus e mantém por horas; à direita, o RTP, que atinge a mesma temperatura por cerca de dez segundos, com uma faixa horizontal marcando os 450 graus onde os doadores térmicos se formam">
Orçamento térmico. Um passo de forno se mede em horas; o RTP, em segundos. Os dois passam pela mesma faixa de temperatura — e a faixa em torno de 450 °C, marcada em laranja, é justamente onde o oxigênio do Czochralski monta os doadores térmicos. Desenho do autor, a partir de Tokuda et al. (1989) e Stein et al. (1986) <Cite id="tokuda-1989" /> <Cite id="stein-1986" />.
</DiagramFigure>

## Polimento químico-mecânico (CMP)

O **CMP** <Cite id="runnels-1994" /> é crítico para [fotolitografia](/fotolitografia). O wafer é pressionado contra almofada rotativa com suspensão alcalina de nanopartículas de sílica: oxidação química suave e remoção mecânica do óxido geram superfície espelhada com rugosidade sub-nanométrica.

A almofada não trabalha sozinha: ela é recondicionada continuamente por um disco abrasivo, que reabre os poros entupidos pelo material removido e mantém a taxa de remoção estável ao longo de milhares de wafers.

<DiagramFigure src="/assets/cmp-pad-conditioner.jpg" alt="Condicionador de almofada (Chiaping 108) usado no polimento químico-mecânico de wafers">
O condicionador de almofada do CMP, que reabre os poros da almofada entre um wafer e o seguinte. cpxmn — <a href="https://commons.wikimedia.org/wiki/File:Chemical-mechanical_polishing_(CMP-108,_conditioner).jpg" target="_blank" rel="noopener noreferrer">Chemical-mechanical polishing</a> (CC BY-SA 2.0), Wikimedia Commons.
</DiagramFigure>

<DiagramFigure src="/assets/silicon-wafer-300mm.jpg" alt="Wafer de silício de 300 mm com superfície espelhada">
O resultado: um wafer de 300 mm com superfície espelhada. Peellden — <a href="https://commons.wikimedia.org/wiki/File:12-inch_silicon_wafer.jpg" target="_blank" rel="noopener noreferrer">12-inch silicon wafer</a> (CC BY-SA 3.0), Wikimedia Commons.
</DiagramFigure>

## Limpeza RCA e inspeção

Limpeza padronizada **RCA** <Cite id="kern-1990" />:

1. **RCA-1 (SC-1):** NH₄OH / H₂O₂ / H₂O a 70–80 °C — oxidação orgânica e partículas.
2. **RCA-2 (SC-2):** HCl / H₂O₂ / H₂O a 70–80 °C — metais alcalinos e pesados.

<DiagramFigure src="/assets/wet-bench.jpg" alt="Bancada úmida (wet bench) de laboratório limpo com tanques para ataques químicos">
A bancada úmida (*wet bench*) onde ataques e limpezas acontecem: tanques com químicos, exaustão e enxágue em cascata. KristianMolhave — <a href="https://commons.wikimedia.org/wiki/File:WetEtchBench.jpg" target="_blank" rel="noopener noreferrer">WetEtchBench</a> (CC BY 2.5), Wikimedia Commons.
</DiagramFigure>

Após secagem Marangoni ou IPA, os wafers passam por metrologia óptica (**Laser Surface Scanning System** — espalhamento de feixe laser) para detecção de defeitos de superfície e contagem de partículas. Por fim, wafers que precisam de camadas especiais passam por **crescimento epitaxial (EPI Growing)** por **CVD** antes de serem embalados a vácuo sob atmosfera limpa (**cleanroom** classe 1/10) para envio às **fabs** (fundições de semicondutores).

## Wafers solares: o outro produto da mesma cadeia

Nem todo wafer de silício termina numa fab. A indústria fotovoltaica consome o mesmo material, mas com regras bastante diferentes — e as divergências começam já na escolha do cristal <Cite id="saimm" />.

### Monocristalino ou multicristalino

A eletrônica usa **exclusivamente silício monocristalino**, porque os requisitos de qualidade são altos demais para abrir exceção. A fotovoltaica usa **os dois** <Cite id="saimm" />.

O silício **multicristalino** tem eficiência de célula menor, mas custa menos — e é esse compromisso que explica sua presença no mercado <Cite id="saimm" />. Em vez de puxar um lingote cilíndrico, ele é produzido por **fundição em bloco** (processo Bridgman): o silício é fundido num cadinho e a **interface cristal-líquido avança de baixo para cima** conforme o resfriamento é controlado <Cite id="saimm" />.

<DiagramFigure src="/assets/multicrystalline-silicon-wafer.jpg" alt="Wafer de silício multicristalino com as fronteiras de grão visíveis e a iridescência de um filme fino de nitreto de silício">
A diferença é visível a olho nu: num wafer multicristalino as **fronteiras de grão** aparecem como um mosaico — algo que um wafer monocristalino nunca mostra. Radiotrefoil — <a href="https://commons.wikimedia.org/wiki/File:Multicrystalline_silicon_wafer_with_thin_film_iridescence.jpg" target="_blank" rel="noopener noreferrer">Multicrystalline silicon wafer</a> (CC BY-SA 4.0), Wikimedia Commons.
</DiagramFigure>

O objetivo é obter **grãos alinhados verticalmente**, o que evita tensões térmicas altas e reduz a densidade de discordâncias. Como os wafers são cortados horizontalmente, isso também garante qualidade consistente de lâmina para lâmina <Cite id="saimm" />. Há um bônus de pureza: as impurezas metálicas são **empurradas para o topo do lingote** conforme o cristal cresce, num refino que acontece de graça dentro do próprio cadinho <Cite id="saimm" />. O cadinho é de **sílica**, revestido com **Si₃N₄** para o silício líquido não grudar nas paredes <Cite id="saimm" />.

Já o **Czochralski**, descrito acima, é um processo em batelada que leva cerca de **dois dias por lingote** <Cite id="saimm" />.

### Espessura: onde a fotovoltaica se separa

Aqui está a diferença mais visível. Para extrair a potência elétrica, bastam cerca de **100 µm de silício** — a luz não precisa de mais material que isso <Cite id="saimm" />. Na prática, a indústria fotovoltaica trabalha com lâminas **abaixo de 200 µm** <Cite id="saimm" /> — e o padrão de 2023 já era de **150 µm** para lâminas monocristalinas do tipo p, com as do tipo n cerca de **5 a 10 µm mais finas** <Cite id="itrpv-2024" /> —, contra os **700 a 800 µm** típicos dos wafers de fab.

Isso não é só economia de material: é economia de uma cadeia inteira. O wafer cristalino responde por **quase metade do custo final do módulo**, e a etapa de fabricação do wafer por cerca de **30%** desse custo <Cite id="saimm" />.

### O corte e o desperdício

O fatiamento usa **serras de fio múltiplo**: um único fio de aço inoxidável de cerca de **180 µm de diâmetro** e **vários quilômetros de comprimento** é movimentado através do cristal numa suspensão abrasiva, formando uma **teia de fios** entre duas bobinas <Cite id="saimm" />. As vantagens são o alto rendimento e a possibilidade de lâminas mais finas <Cite id="saimm" />.

O custo disso é o **kerf**: aproximadamente **30% do silício é perdido como serragem** durante o corte <Cite id="saimm" />. Antes disso, o seccionamento do lingote em blocos já descarta mais material — cerca de **25% nos lingotes monocristalinos e 15% nos multicristalinos** <Cite id="saimm" />. Nos monocristalinos, o cilindro é seccionado até virar um bloco cúbico; nos multicristalinos, o corte remove as **regiões periféricas mais contaminadas** <Cite id="saimm" />.

### O wafer está crescendo

A indústria fotovoltaica migrou para áreas maiores ao longo do tempo: do padrão de **10 × 10 cm²** para **12,5 × 12,5 cm²** e, mais recentemente, **15,6 × 15,6 cm²** <Cite id="saimm" />. A força motriz é simples: célula maior significa **custo menor por watt-pico** <Cite id="saimm" />.

<SourceNote :ids="['zulehner-2000', 'moller-2012', 'runnels-1994', 'kern-1990', 'saimm', 'semi-m1', 'iucr-czochralski', 'nae-teal', 'chm-grown-junction', 'teal-buehler-1952', 'pv-tech-dws', 'asianometry-wafer', 'pv-mfg-cz', 'lid-hallam', 'itrpv-2024']" />

## Vídeos

<YouTubeEmbed id="sIRfWyyOFPg" title="The Amazing, Humble Silicon Wafer (Asianometry)" />

<YouTubeEmbed id="skRmyhSOu28" title="Puxamento de um lingote Czochralski (UNSW)" />

<YouTubeEmbed id="Q5paWn7bFg4" title="From Sand To Silicon: The Making of a Chip (Intel)" />

<YouTubeEmbed id="xo-ir73TA_U" title="Crescimento do lingote dentro do forno LCT (Linton Crystal Technologies)" />

<SeeAlso :links="[
  { text: 'Estrutura e tipos de wafer', href: '/estrutura-wafers', note: 'identificar o wafer pela borda' },
  { text: 'Polissilício', href: '/polissilicio', note: 'matéria-prima EG-Si' },
  { text: 'Referências', href: '/referencias', note: 'papers [6]–[9]' },
]" />
