---
title: Na fab
description: >-
  Como uma lâmina vazia vira um chip: oxidação, deposição, corrosão, implantação,
  polimento e metrologia, ao longo de 600 a mais de 1.000 etapas de processo.
dataAsOf: 2025
---

# Na fab: como um wafer vira um chip

No fim da [fabricação de wafers](/fabricacao-wafers) existe uma lâmina de silício com a pureza certa, a orientação cristalina certa e uma superfície plana a menos de um nanômetro, ainda sem nenhum dispositivo.

O capítulo da [fotolitografia](/fotolitografia) mostra como um desenho é impresso nessa lâmina. Este trata dos processos em volta da impressão, que acrescentam material, removem, dopam e medem.

## A fabricação é um laço

<DiagramFigure src="/assets/fab-loop.svg" alt="O wafer circula repetidamente por sete módulos numerados (oxidação, deposição, litografia, corrosão, implantação, planarização e metrologia), acumulando de 600 a mais de mil etapas ao longo de cerca de três meses">
O wafer dá dezenas de voltas pelos mesmos equipamentos. Os sete módulos estão numerados na ordem em que o wafer os visita; a litografia está destacada porque tem capítulo próprio, e a metrologia porque é ela que mede o resultado. Cada volta acrescenta uma camada, remove parte dela e mede o que sobrou.
</DiagramFigure>

O laço tem sete módulos. Seis têm seção neste capítulo, na ordem em que o wafer os visita. O sétimo, a litografia, tem [capítulo próprio](/fotolitografia), porque é ali que está a maior parte da dificuldade de escala.

1. [Oxidação térmica](#oxidacao-termica): o silício fabricando o próprio isolante.
2. [Deposição](#deposicao): acrescentar um filme.
3. [Litografia](/fotolitografia): imprimir o desenho, em capítulo separado.
4. [Corrosão](#corrosao): remover material onde o desenho deixou aberto.
5. [Implantação iônica](#implantacao-ionica): colocar dopantes numa profundidade escolhida.
6. [Planarização](#planarizacao): polir a superfície para que a camada seguinte possa ser impressa.
7. [Metrologia](#metrologia): medir o resultado e corrigir os wafers seguintes.

<ClientOnly>
  <FabProcess />
</ClientOnly>

Duas seções fora do laço fecham o capítulo: [interconexão](#interconexao), que constrói a fiação, e [rendimento](#rendimento), que mede quantos dies funcionam.

O wafer é processado em ciclo: passa pela litografia, volta para um forno, volta para a litografia, desce para um reator de plasma e sobe de novo. Um processo avançado pode ter de 600 a mais de 1.000 etapas, com fluxos de 5 nm citados acima de 1.100 <Cite id="semieng-cycle-time" />. A Hitachi High-Tech, que fabrica os equipamentos de inspeção, descreve o mesmo processo como 400 a 600 etapas ocupando um a dois meses <Cite id="hitachi-metrology" />. As duas contagens diferem porque medem coisas diferentes (uma conta passos de receita, a outra conta visitas a equipamentos), e onde uma etapa termina e a próxima começa é uma convenção.

As fábricas se planejam com outra métrica, os dias por camada de máscara. A média fica entre 1 e 1,5 dia por camada, e as melhores fábricas chegam a 0,8 dia <Cite id="semieng-cycle-time" />. Como o número de máscaras cresce com o nó, o tempo total cresce junto:

| Nó | Camadas de máscara | Tempo de ciclo aproximado |
| --- | --- | --- |
| 28 nm | 40 a 50 | ~40 dias |
| 14 / 10 nm | ~60 | ~60 dias |
| 7 nm | 80 a 85 | 80 a 85 dias |
| 5 nm | acima de 100 | — |

<Cite id="semieng-cycle-time" />

Os wafers andam em lotes, e o lote padrão é de 25 wafers <Cite id="semieng-cycle-time" />. Às vezes os lotes são redistribuídos entre si para nivelar a carga dos equipamentos.

### Exposições de litografia

Um fluxo de 32/28 nm usava 38 exposições de litografia, das quais 15 de imersão; um fluxo de 22/20 nm usava 52 exposições, com 31 de imersão e 11 passos de multipadronagem <Cite id="semieng-litho-layers" />. O wafer volta ao scanner dezenas de vezes, e o número exato depende do nó e do fabricante.

### As três zonas do chip

Um fluxo de lógica de ponta se divide em três regiões, que usam equipamentos e temperaturas diferentes <Cite id="imec-roadmap" />:

- **FEOL** (*front-end-of-line*): constrói os transistores. Inclui o isolamento entre dispositivos, a formação dos poços de dopagem, o módulo de porta e as fontes e drenos.
- **MOL** (*middle-of-line*): faz os contatos que ligam o transistor ao primeiro nível de metal.
- **BEOL** (*back-end-of-line*): constrói a pilha de fios metálicos que conecta tudo.

O FEOL trabalha em temperaturas altas, porque ainda está formando cristal e dopagem. O BEOL trabalha frio, porque a partir do primeiro nível de metal o calor em excesso estraga o que já está pronto. Toda etapa depois do FEOL, inclusive a [fotolitografia](/fotolitografia), precisa caber num orçamento térmico apertado.

## Oxidação térmica

O silício cresce o próprio isolante. A superfície é exposta a oxigênio ou vapor de água a alta temperatura, e o próprio silício se converte em dióxido de silício.

Quase nenhum outro semicondutor consegue isso. O germânio, que foi o primeiro material dos transistores, foi abandonado em boa parte porque não forma um óxido nativo estável. A qualidade da interface do silício (uma densidade de defeitos baixa o bastante para não engolir o transistor) é o que faz o SiO₂ funcionar como isolante de porta, e é o que falta ao germânio <Cite id="ecs-sio2-limits" />.

O modelo de crescimento é de 1965, de Deal e Grove, e continua sendo ensinado. Em notação compacta,

$$
x_0^2 + A\,x_0 = B\,(t + \tau)
$$

onde $x_0$ é a espessura do óxido. O modelo tem dois regimes. Enquanto o óxido é fino, o oxidante chega rápido à superfície e a reação dita o ritmo, então o crescimento é linear no tempo. Quando o óxido engrossa, o oxidante precisa difundir por dentro dele, e o crescimento passa a ser parabólico: desacelera <Cite id="deal-grove-1965" />.

O artigo declara a faixa em que o modelo se ajusta: de 700 a 1.300 °C, de 0,1 a 1,0 atm, e espessuras de 300 a 20.000 Å, para os dois oxidantes <Cite id="deal-grove-1965" />. É a faixa em que o modelo foi validado; não é uma receita de processo.

### Seco contra úmido

O vapor de água penetra o óxido muito melhor que o oxigênio molecular: a solubilidade da água no SiO₂ a 1.000 °C é cerca de 600 vezes a do O₂ <Cite id="tu-wien-oxidation" />. Por isso a oxidação úmida é muito mais rápida, chegando a centenas de nanômetros por hora, e é usada para óxidos grossos: isolamento, máscaras, passivação.

A oxidação seca é lenta, mas produz um óxido melhor, com interface mais limpa, e por isso é a usada no óxido de porta.

### O óxido de porta e o limite de 1,2 nm

Trinta anos antes de 2005, o óxido de porta tinha 120 nm. Em 2005, estava em 1,2 nm, uma redução de duas ordens de grandeza <Cite id="ecs-sio2-limits" />.

O óxido de porta separa a porta do canal, e quanto mais fino, maior o controle da porta sobre o canal. Abaixo de certa espessura ele deixa de isolar. A corrente de tunelamento direto cresce exponencialmente com a redução da espessura, e o limite prático aparece por volta de 3 nm. Com 1,2 nm, a corrente de fuga chega a ~100 A/cm² a 1 V <Cite id="ecs-sio2-limits" />, num componente feito para quase não consumir energia em repouso.

O limite último do SiO₂ é perto de 0,7 nm, ou duas camadas atômicas <Cite id="ecs-sio2-limits" />. Esse limite forçou a substituição do dióxido de silício por materiais de alta constante dielétrica (*high-k*), que conseguem a mesma capacitância com uma camada fisicamente mais grossa, a partir do nó de 45 nm. A mesma pressão sobre o controle da porta levou depois o transistor de planar a FinFET e então a [gate-all-around](/transistores).

## Deposição

A oxidação consome silício; a deposição acrescenta material por cima. A dificuldade é colocar um filme com a espessura certa em todas as superfícies, inclusive nas paredes laterais e no fundo de trincheiras cada vez mais estreitas.

<DiagramFigure src="/assets/deposition-step-coverage.svg" alt="Três cortes da mesma trincheira preenchida por PVD, CVD e ALD: o sputtering deixa o fundo quase nu, o CVD cobre tudo mas engrossa na boca, e a ALD deposita a mesma espessura no fundo e nas paredes">
Os métodos diferem na quantidade de filme que deixam no fundo da trincheira.
</DiagramFigure>

- **CVD** (*chemical vapor deposition*): precursores gasosos reagem na superfície do wafer e formam o filme. É o método de uso geral.
- **PECVD** (*plasma-enhanced*): a mesma reação, com plasma para baixar a temperatura. O plasma ioniza as espécies e reduz a barreira de reação, o que permite depositar um filme bom em temperaturas bem mais baixas, como o BEOL exige, porque ali o wafer já não pode ser aquecido <Cite id="lam-ald" />.
- **LPCVD** (*low pressure*): pressão baixa para uniformidade e conformidade melhores; é o método típico de polissilício e nitreto.
- **PVD** (*physical vapor deposition*) ou sputtering: íons de argônio acelerados contra um alvo arrancam átomos que se depositam no wafer. Os átomos chegam de uma direção só, e as paredes laterais recebem pouco filme.

### ALD

A ALD (*atomic layer deposition*) coloca uma camada atômica por vez e para sozinha. Cada ciclo tem duas etapas de reação química em que o precursor reage até esgotar os sítios disponíveis na superfície; a partir daí, precursor a mais não deposita nada <Cite id="amat-ald" />.

A espessura passa a depender apenas do número de ciclos, e não de tempo, vazão ou temperatura <Cite id="amat-ald" />. Como cada ciclo cobre tudo o que estiver exposto, o filme tem na parede e no fundo a mesma espessura que no topo, inclusive em estruturas muito profundas. A ASM relata gap-fill de estruturas com razão de aspecto superior a 100:1, tecnologia escolhida para várias aplicações de 3D NAND <Cite id="asm-ald-gapfill" />.

A ALD é lenta. O crescimento por ciclo fica na casa de 0,1 nm, e um ciclo completo com purgas dura segundos <Cite id="yim-ald-gpc" />. Filmes grossos são feitos por outros métodos, e a ALD fica com o que precisa ser fino, exato e conforme: óxidos de porta de alta constante dielétrica, barreiras de difusão e os espaçadores dos transistores de ponta <Cite id="amat-trillium" />.

## Corrosão

A litografia decide onde o material fica; a corrosão remove o que o desenho deixou exposto.

<DiagramFigure src="/assets/etch-anisotropy.svg" alt="Mesma abertura de máscara, três químicas: o ataque úmido é isotrópico e corrói por baixo da máscara, o RIE é direcional e deixa paredes quase verticais, e o DRIE do processo Bosch corta trincheiras estreitas e profundas">
A máscara define a largura e a química define a forma. Um ataque isotrópico alarga o buraco por baixo da própria máscara.
</DiagramFigure>

Um ataque úmido, em solução, remove material em todas as direções no mesmo ritmo. É isotrópico, e por isso corrói também por baixo da máscara, abrindo o perfil além do que a litografia desenhou. Um ataque seco, a plasma, é direcional: íons são acelerados contra o wafer e atacam preferencialmente na vertical.

O RIE (*reactive ion etching*) combina as duas coisas e domina a indústria. Ele usa a reatividade química do plasma, que remove material rápido, junto com o bombardeamento iônico, que dá direção ao ataque. Os íons chegam perpendiculares porque o wafer está no eletrodo que recebe a maior tensão, e a combinação produz paredes quase verticais <Cite id="mks-rie" />.

### Seletividade

Nenhuma corrosão é perfeitamente seletiva. A **seletividade** é a razão entre a velocidade de corrosão do material desejado e a do material que deve ficar, normalmente a máscara ou a camada de baixo.

O DRIE (*deep reactive ion etching*) usa o processo Bosch, que alterna uma etapa de corrosão e uma de passivação. A máscara de fotoresiste aguenta uma seletividade de 150:1 e a de óxido, 450:1 <Cite id="bosch-drie" />, o suficiente para cavar mais de 400 µm de silício sob uma máscara de poucos micrômetros. O mesmo processo alcança razão de aspecto de 80:1 em capacidade, 60:1 em desenvolvimento e 40:1 em produção em massa <Cite id="bosch-drie" />, e corta as trincheiras do 3D NAND e as estruturas dos MEMS.

### ALE

Baixar a pressão e tornar os íons mais direcionais tem limite. Quando as dimensões críticas são de poucos nanômetros e os filmes têm 2 ou 3 nm, um processo contínuo não consegue parar no meio de uma camada atômica.

A ALE (*atomic layer etching*) aplica à corrosão a ideia da ALD: um ciclo autolimitante com duas etapas, uma que modifica a superfície e outra que remove só a camada modificada <Cite id="ale-overview" />. A energia dos íons precisa ficar numa janela, alta o bastante para remover a camada modificada e abaixo do limiar de sputtering do material a granel. Fora dessa janela o processo deixa de ser autolimitante <Cite id="ale-overview" />.

Os fabricantes de equipamentos vendem a ALE como remoção de "algumas camadas atômicas por ciclo" <Cite id="lam-etch" />, e ela é usada nos filmes mais finos dos transistores de ponta.

## Implantação iônica

Dopar silício é introduzir átomos de outro elemento na rede cristalina para mudar sua condutividade. Durante décadas isso foi feito por difusão: o wafer era exposto a um gás dopante em alta temperatura e os átomos se espalhavam. O perfil resultante depende de temperatura e tempo ao mesmo tempo, o que o torna difícil de controlar.

A implantação iônica acelera os íons do dopante a energias altas e os dispara contra o silício, onde param a uma profundidade definida pela energia do feixe; a quantidade que entra é a dose, medida diretamente como corrente elétrica <Cite id="cityu-implant" />. Profundidade e dose viram variáveis independentes, e é por isso que o método se impôs.

As energias vão de algumas centenas de eV a vários MeV, o que coloca os íons de menos de 10 nm a cerca de 10 µm de profundidade. As doses vão de 10¹¹ cm⁻², para ajustar a tensão de limiar do transistor, até 10¹⁸ cm⁻², para formar camadas dielétricas enterradas <Cite id="cityu-implant" />.

<DiagramFigure src="/assets/implant-profile.svg" alt="À esquerda, o feixe de íons inclinado 7 graus em relação à vertical sobre a rede cristalina; à direita, dois perfis de concentração por profundidade, um sem inclinação com cauda profunda e outro com 7 graus bem mais estreito">
O wafer é inclinado de propósito. Sem a inclinação, alguns íons escorregam pelos canais abertos do cristal e param muito mais fundo do que deveriam.
</DiagramFigure>

### Canalização e a inclinação de 7°

Vista ao longo de certas direções, a rede do silício tem corredores abertos entre as fileiras de átomos, por onde um íon viaja quase sem colidir. É a **canalização**, que acrescenta ao perfil uma cauda profunda de íons que foram muito além do previsto.

A solução industrial é inclinar o wafer cerca de 7° em relação ao feixe <Cite id="cityu-implant" />, para que nenhum íon entre alinhado com um canal e o perfil fique estreito. Na prática usam-se 8 a 9° de inclinação com 30° de rotação, valores que também dependem da corrente do feixe <Cite id="implant-dose-rate" />.

### Quantas implantações tem um chip

Um transistor MOS simples dos anos 1970 precisava de 6 a 8 implantações. Um CMOS moderno com memória embutida pode precisar de 35 <Cite id="axcelis-implant" />. Uma fábrica grande processa até 50.000 wafers por mês, com 20 a 30 implantações por wafer, o que exige cerca de 20 implantadores trabalhando em paralelo <Cite id="axcelis-implant" />.

Cada implantação é uma volta completa do laço: litografia, implantação, remoção do fotoresiste e, normalmente, uma medida.

### Dano e recozimento

Íons de energia alta deslocam os átomos de silício das suas posições ao longo do caminho. A região implantada fica amorfa, e um transistor não funciona em silício amorfo.

Um recozimento devolve a ordem cristalina e, ao mesmo tempo, ativa eletricamente os dopantes, que precisam ocupar posições substitucionais na rede para funcionar. O recozimento precisa ser quente o bastante para reparar o cristal e curto o bastante para não espalhar os dopantes que acabaram de ser colocados.

Esse compromisso levou aos recozimentos rápidos (RTP, *rapid thermal processing*) e, mais recentemente, a recozimentos por laser medidos em milissegundos. Quanto mais raso o perfil, mais curto o pulso.

## Planarização

Depois de algumas camadas, a superfície do wafer deixa de ser plana. Cada depósito e cada corrosão deixam degraus, e os degraus se acumulam.

Os degraus importam porque a litografia é fotográfica. Um sistema de projeção tem uma profundidade de foco finita, e fora dela a imagem sai borrada. Com o wafer irregular, partes do campo ficam fora de foco e as dimensões críticas saem erradas <Cite id="cmp-depth-of-focus" />.

O CMP (*chemical mechanical planarization*) combina o ataque químico de uma suspensão com o desgaste mecânico de um pad rotativo. O wafer é pressionado contra o pad girando até o relevo se desgastar <Cite id="amat-cmp" />. A química da suspensão está descrita em [os insumos da fab](/insumos-fab).

O CMP entrou na produção nos anos 1980, na IBM, para planarizar o dielétrico entre níveis de metal. Foi adotado de forma ampla quando a dimensão crítica chegou a 0,35 µm, ponto em que as alternativas (vidro refluído, ataque reverso, *spin-on glass*) deixaram de atender <Cite id="cmp-history" />. Um passo de CMP pode levar pouco mais de 60 segundos, incluindo a limpeza posterior <Cite id="amat-cmp" />.

O CMP tem dois defeitos característicos. Em áreas largas de metal, o metal afunda abaixo da superfície, o que se chama **dishing**. Em áreas densas, o dielétrico entre os fios se desgasta mais rápido que o metal, o que se chama **erosão** <Cite id="cmp-history" />. Os dois pioram com o excesso de polimento, e os dois prejudicam a litografia da camada seguinte.

## Metrologia

A KLA, que fabrica equipamentos de inspeção, diz que a maior parte dos passos de processo tem alguma metrologia ou inspeção associada <Cite id="kla-msa" />. São trabalhos diferentes:

- **Metrologia** mede o que está lá: espessura, largura, alinhamento.
- **Inspeção** procura o que não deveria estar lá: partículas, riscos, defeitos <Cite id="kla-msa" />.

Medir todos os wafers seria inviável, então as fábricas amostram por lote. A metrologia costuma rodar em 100% dos lotes, mas só em 2 a 5 wafers de cada lote; a inspeção de defeitos roda em 10 a 33% dos lotes, com 1 a 5 wafers <Cite id="kla-msa" />. Os quatro tipos principais de medida são overlay, espessura de filme, dimensão crítica e forma do wafer <Cite id="kla-msa" />.

O CD-SEM usa um feixe de elétrons para medir a largura de uma linha com resolução nanométrica, e é assim que a fábrica confere se a porta saiu com a largura que o desenho pedia. A elipsometria espectroscópica mede espessura sem tocar no wafer: mede como a luz muda de polarização ao refletir e resolve a espessura por modelo <Cite id="horiba-ellipsometry" />. É o método padrão para filmes ultrafinos, de poucos ångströms a dezenas de micrômetros, e para pilhas de múltiplas camadas <Cite id="horiba-ellipsometry" />.

### O laço de controle

As medidas também voltam para dentro do processo. O SPC (*statistical process control*) monitora o processo e dispara um alarme quando ele se desloca ou deriva. O controle run-to-run fecha o laço: compara a medida obtida depois do processo com o modelo dele, atualiza esse modelo (tipicamente com uma média móvel exponencial) e calcula um ajuste de receita limitado para os wafers seguintes <Cite id="r2r-control" />.

No artigo que consolidou a técnica, os autores distinguem um modo rápido, para deslocamentos súbitos, e um modo gradual, para derivas lentas <Cite id="r2r-control" />. Essa realimentação mantém no alvo, de lote em lote, um processo com tolerância de poucos nanômetros, sem um engenheiro ajustando cada lote.

## Interconexão

Os transistores ocupam uma camada fina no fundo de um chip moderno. Acima deles fica o BEOL, uma pilha de dezenas de níveis de fiação que leva sinal, alimentação e clock a bilhões de dispositivos.

Por muito tempo esses fios foram de alumínio. Em setembro de 1997, a IBM anunciou a primeira tecnologia de interconexão de cobre integrada de forma manufaturável, e começou a entregar produto em 1998 <Cite id="ibm-copper" />. A fiação de cobre apresentou 40 a 45% menos resistência que a de alumínio e resistência muito maior à eletromigração <Cite id="ibm-cu-electroplating" />.

O motivo da troca está no atraso. Com os fios ficando mais finos e mais próximos, a constante de tempo RC do fio cresceu, enquanto o atraso intrínseco do transistor caiu. Por volta de 0,25 µm as duas curvas se cruzaram, e o fio passou a ser mais lento que a porta <Cite id="mpr-rc-limits" />. O ITRS registrou que o atraso RC passara a ser dominado pela interconexão global e que só trocar materiais não bastava <Cite id="itrs-interconnect" />.

### Damasceno

O cobre é difícil de corroer, então o fio não pode ser gravado num filme de cobre. O processo damasceno inverte a ordem: primeiro se grava a trincheira no dielétrico, depois se despeja o cobre dentro dela.

<DiagramFigure src="/assets/copper-damascene.svg" alt="Quatro cortes do processo damasceno: trincheira e via abertas no dielétrico, deposição da barreira e da camada de semente, eletrodeposição de cobre de baixo para cima e, por fim, o polimento que remove o excesso">
O nome vem da ourivesaria damascena, em que o metal é incrustado em sulcos abertos numa superfície.
</DiagramFigure>

O eletrólito é formulado para que o cobre cresça de baixo para cima, fechando a via antes de fechar a boca da trincheira; do contrário sobraria um vazio no meio do contato <Cite id="ibm-cu-electroplating" />. Em seguida o CMP remove o cobre acima da trincheira e deixa a superfície plana de novo. O damasceno depende desse polimento, e por isso o CMP e a fiação de cobre chegaram juntos.

### Dielétricos low-k

Cada par de fios vizinhos forma um capacitor, e o dielétrico entre eles define a capacitância. O SiO₂ tem constante dielétrica em torno de 4,0. Baixá-la reduz a capacitância e, com ela, o atraso. As alternativas usadas na indústria vão de SiOF (k ≈ 3,5 a 3,8) e SiCOH (k ≈ 2,2 a 3,2) até o ar, com k = 1,0 <Cite id="cu-interconnect-review" />. As arquiteturas de air gap deixam vazios deliberados entre os fios.

Medições em estruturas com air gap encontram k efetivo da ordem de 2,2 <Cite id="air-gap-keff" />, e tecnologias que chegam a mais de 75% de fração de vazio alcançam k efetivo abaixo de 2,1 <Cite id="hollow-airgap" />. O custo é mecânico: uma estrutura com 75% de ar tem pouco material para sustentar a pilha acima dela.

### Quantos níveis de metal

A imec descreve pilhas BEOL com até 15 camadas, das quais 3 a 6 são os níveis finos "Mx" <Cite id="imec-roadmap" />. Análises físicas de produtos reais encontram mais: o die do TSMC N3 usado no Lunar Lake tem 20 camadas de interconexão metálica <Cite id="techinsights-n3-beol" />.

Cada uma dessas camadas tem sua própria litografia, seu próprio CMP e sua própria metrologia, e cada uma acrescenta mais voltas ao laço.

## Rendimento

O **rendimento** é a fração dos dies de um wafer que funcionam. O modelo mais simples supõe que os defeitos se distribuem aleatoriamente, e nesse caso o rendimento cai exponencialmente com a área:

$$
Y = e^{-D_0 A}
$$

onde $D_0$ é a densidade de defeitos e $A$ a área do die <Cite id="leachman-yield" />. O modelo funciona para dies pequenos (a referência de Berkeley o considera adequado para áreas até cerca de 0,25 cm²) e é conservador para dies grandes <Cite id="leachman-yield" />.

Em 1964, B. T. Murphy, dos Bell Labs, observou que os defeitos se agrupam em vez de cair ao acaso. Tratar a densidade como uma variável aleatória e integrar sobre a distribuição dá o modelo de Murphy <Cite id="murphy-1964" />. Mais tarde a indústria adotou a formulação binomial negativa, mais fácil de manipular e mais aderente aos dados reais <Cite id="murphy-integral" />.

### Por que o rendimento demora meses

O rendimento sobe à medida que a fábrica aprende o processo, e nenhuma mudança isolada de receita o resolve. O levantamento da Competitive Semiconductor Manufacturing, de Berkeley, mediu quanto tempo esse aprendizado leva em várias empresas. Para uma tecnologia nova, o tempo médio de qualificação de processo foi de 12 meses, com o melhor caso em 7. Para uma tecnologia parecida com uma que já estava em produção, a média caiu para 7 meses, com melhor caso em 4 <Cite id="berkeley-csm" />. A diferença entre a média e o benchmark, no tempo de subida de rendimento, ficou em torno de 40% <Cite id="berkeley-csm" />.

<SourceNote :ids="['semieng-cycle-time', 'semieng-litho-layers', 'hitachi-metrology', 'imec-roadmap', 'deal-grove-1965', 'tu-wien-oxidation', 'ecs-sio2-limits', 'amat-ald', 'lam-ald', 'asm-ald-gapfill', 'yim-ald-gpc', 'amat-trillium', 'mks-rie', 'bosch-drie', 'lam-etch', 'ale-overview', 'cityu-implant', 'axcelis-implant', 'implant-dose-rate', 'cmp-depth-of-focus', 'cmp-history', 'amat-cmp', 'kla-msa', 'horiba-ellipsometry', 'r2r-control', 'ibm-copper', 'ibm-cu-electroplating', 'mpr-rc-limits', 'itrs-interconnect', 'cu-interconnect-review', 'air-gap-keff', 'hollow-airgap', 'techinsights-n3-beol', 'leachman-yield', 'murphy-1964', 'murphy-integral', 'berkeley-csm']" />

<SeeAlso :links="[
  { text: 'Fotolitografia', href: '/fotolitografia', note: 'como o desenho é impresso' },
  { text: 'Evolução dos transistores', href: '/transistores', note: 'o que o FEOL constrói' },
  { text: 'Empacotamento e teste', href: '/empacotamento', note: 'o que acontece depois da fab' },
  { text: 'Fabricação de wafers', href: '/fabricacao-wafers', note: 'antes da fab' },
  { text: 'Referências', href: '/referencias', note: 'lista numerada' },
]" />
