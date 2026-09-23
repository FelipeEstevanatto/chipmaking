---
title: Na fab
description: >-
  O wafer deixa de ser uma lâmina e vira um chip: oxidação, deposição, corrosão,
  implantação, polimento e metrologia, repetidos cerca de mil vezes dentro da fábrica.
---

# Na fab: como um wafer vira um chip

No fim da [fabricação de wafers](/fabricacao-wafers) existe uma lâmina de silício perfeita e **vazia**. Ela tem a pureza certa, a orientação cristalina certa e uma superfície plana a menos de um nanômetro. Não tem nada dentro.

O capítulo da [fotolitografia](/fotolitografia) mostra como um desenho é impresso nessa lâmina. Este mostra o que acontece **em volta** da impressão — porque a litografia sozinha não constrói nada. Ela só abre a porta; quem entra são os outros processos.

## A fábrica é um laço, não uma linha de montagem

<DiagramFigure src="/assets/fab-loop.svg" alt="O wafer circula repetidamente por sete módulos — oxidação, deposição, litografia, corrosão, implantação, planarização e metrologia — acumulando cerca de mil etapas ao longo de aproximadamente três meses">
O wafer não percorre a fábrica uma vez: ele dá dezenas de voltas pelos mesmos equipamentos. Cada volta acrescenta uma camada, apaga parte dela e mede o resultado.
</DiagramFigure>

A imagem mental de uma linha de montagem — entra matéria-prima de um lado, sai produto do outro — não descreve uma fábrica de semicondutores. O wafer é **processado em ciclo**: ele passa por litografia, volta para um forno, volta para a litografia, desce para um reator de plasma, sobe de novo. Essa repetição é o motivo pelo qual os números do setor são tão grandes.

Um processo avançado pode ter de **600 a mais de 1.000 etapas**, com fluxos de 5 nm citados acima de **1.100** <Cite id="semieng-cycle-time" />. A Hitachi High-Tech, que fabrica os equipamentos de inspeção, descreve o mesmo processo como **400 a 600 etapas** ocupando **um a dois meses** <Cite id="hitachi-metrology" />. As duas contagens convivem porque medem coisas diferentes — uma conta passos de receita, a outra conta visitas a equipamentos — e porque a fronteira entre "uma etapa" e "um conjunto de etapas" é convenção, não física.

A métrica que a indústria usa para se planejar é outra, e é mais útil: **dias por camada de máscara**. A média fica entre **1 e 1,5 dia por camada**, e as melhores fábricas chegam a **0,8 dia** <Cite id="semieng-cycle-time" />. Como o número de máscaras cresce com o nó, o tempo total cresce junto:

| Nó | Camadas de máscara | Tempo de ciclo aproximado |
| --- | --- | --- |
| 28 nm | 40 a 50 | ~40 dias |
| 14 / 10 nm | ~60 | ~60 dias |
| 7 nm | 80 a 85 | 80 a 85 dias |
| 5 nm | acima de 100 | — |

<Cite id="semieng-cycle-time" />

O lote padrão é de **25 wafers** <Cite id="semieng-cycle-time" />, e é assim que a fábrica pensa: não em wafers soltos, mas em lotes que caminham juntos e que às vezes são **redistribuídos** entre si para nivelar a carga dos equipamentos.

### A contagem honesta de exposições

Existe uma frase que circula muito em apresentações — "o wafer passa umas 50 a 80 vezes pela litografia" — e que **não tem fonte primária clara**. O que se consegue documentar é mais preciso e menos redondo: um fluxo de **32/28 nm** usava **38 exposições** de litografia, das quais **15 de imersão**; um fluxo de **22/20 nm** usava **52 exposições**, com **31 de imersão** e **11 passos de multipadronagem** <Cite id="semieng-litho-layers" />.

A conclusão prática continua a mesma — são **dezenas** de idas e voltas, não uma — mas o número exato depende do nó e do fabricante. Quando alguém citar um número redondo, vale perguntar de onde ele veio.

### As três zonas do chip

Um fluxo de lógica de ponta se divide em três regiões, e a distinção importa porque os equipamentos e as temperaturas são diferentes <Cite id="imec-roadmap" />:

- **FEOL** (*front-end-of-line*): constrói os transistores. Inclui o isolamento entre dispositivos, a formação dos poços de dopagem, o módulo de porta e as fontes e drenos.
- **MOL** (*middle-of-line*): faz os contatos que ligam o transistor ao primeiro nível de metal.
- **BEOL** (*back-end-of-line*): constrói a escada de fios metálicos que conecta tudo.

O FEOL trabalha em temperaturas altas, porque ainda está formando cristal e dopagem. O BEOL trabalha frio, porque a partir do primeiro nível de metal qualquer calor excessivo estraga o que já está pronto. É por isso que a transição FEOL → BEOL na [fotolitografia](/fotolitografia) tem que acontecer dentro de um orçamento térmico apertado.

## Oxidação térmica: o silício fabricando o próprio isolante

Antes de qualquer coisa, o silício precisa de um isolante. E ele não recebe um: ele **cresce um**. A superfície é exposta a oxigênio ou vapor de água a alta temperatura e o próprio silício se converte em **dióxido de silício**.

Isso é uma vantagem que quase nenhum outro semicondutor tem. O germânio, que foi o primeiro material dos transistores, foi abandonado em boa parte porque **não forma um óxido nativo estável**. É a qualidade dessa interface — uma densidade de defeitos baixa o bastante para não engolir o transistor — que faz o SiO₂ funcionar como isolante de porta, e é o que falta ao germânio <Cite id="ecs-sio2-limits" />.

O modelo que descreve o crescimento é de **1965**, de Deal e Grove, e continua sendo ensinado: em notação compacta,

\[ x_0^2 + A\,x_0 = B\,(t + \tau) \]

onde \(x_0\) é a espessura do óxido. O modelo tem dois regimes, e a razão é intuitiva: quando o óxido é fino, o oxidante chega à superfície rápido e a **reação** manda — o crescimento é **linear** no tempo. Quando o óxido engrossa, o oxidante precisa **difundir** por dentro dele, e a difusão manda — o crescimento passa a ser **parabólico**, ou seja, desacelera <Cite id="deal-grove-1965" />.

O ajuste do modelo original é excelente numa faixa larga e declarada explicitamente no artigo: de **700 a 1.300 °C**, de **0,1 a 1,0 atm**, e espessuras de **300 a 20.000 Å**, para os dois oxidantes <Cite id="deal-grove-1965" />. Repare que essa é a faixa onde o modelo foi **validado** — não uma receita de processo. Citar "800 a 1.200 °C" como temperatura de oxidação é comum, mas a fonte verificável é a do artigo.

### Seco contra úmido

Os dois oxidantes não são equivalentes. O **vapor de água** penetra o óxido muito melhor que o oxigênio molecular: a solubilidade da água no SiO₂ a 1.000 °C é cerca de **600 vezes** a do O₂ <Cite id="tu-wien-oxidation" />. Por isso a oxidação úmida é muito mais rápida — chega a **centenas de nanômetros por hora** — e é usada para **óxidos grossos**: isolamento, máscaras, passivação.

O oxidante **seco** é lento, mas produz um óxido de melhor qualidade e interface mais limpa. É o oxidante da camada que mais importa: a **porta**.

### O óxido de porta e o muro de 1,2 nm

Aqui está uma das transições mais bem documentadas da história do transistor. Trinta anos antes de 2005, o óxido de porta tinha **120 nm**. Em 2005, estava em **1,2 nm** — uma redução de duas ordens de grandeza <Cite id="ecs-sio2-limits" />.

O motivo é direto: o óxido de porta é o que separa a porta do canal, e quanto mais fino, mais controle eletrostático. Só que chega um ponto em que ele deixa de ser um isolante. A **corrente de tunelamento direto** cresce exponencialmente com a redução da espessura, e o limite prático aparece por volta de **3 nm**. Com **1,2 nm**, a corrente de fuga chega a **~100 A/cm² a 1 V** <Cite id="ecs-sio2-limits" /> — um vazamento absurdo para um componente feito para quase não consumir energia em repouso.

O limite último do SiO₂ é perto de **0,7 nm**, ou **duas camadas atômicas** <Cite id="ecs-sio2-limits" />. Foi esse muro que forçou a substituição do dióxido de silício por **materiais de alta constante dielétrica** (*high-k*) — que conseguem a mesma capacitância com uma camada fisicamente mais grossa, já a partir do nó de 45 nm. É a mesma lógica que, mais adiante, levou o transistor de planar a FinFET e depois a [gate-all-around](/transistores).

## Deposição: colocar material onde não havia

Se a oxidação **consome** silício, a deposição **acrescenta** material. É o mesmo problema do padeiro com o bolo: o desafio não é só colocar a camada, é colocá-la com a espessura certa **em todas as superfícies**, inclusive nas paredes laterais e no fundo de trincheiras cada vez mais estreitas.

<DiagramFigure src="/assets/deposition-step-coverage.svg" alt="Três cortes da mesma trincheira preenchida por PVD, CVD e ALD: o sputtering deixa o fundo quase nu, o CVD cobre tudo mas engrossa na boca, e a ALD deposita a mesma espessura no fundo e nas paredes">
A diferença entre os métodos não é a espessura que eles conseguem: é a espessura que eles conseguem **no fundo** da trincheira.
</DiagramFigure>

- **CVD** (*chemical vapor deposition*): precursores gasosos reagem na superfície do wafer e formam o filme. É o método de uso geral.
- **PECVD** (*plasma-enhanced*): a mesma ideia, mas com plasma para **baixar a temperatura**. O plasma ioniza as espécies e reduz a barreira de reação, o que permite depositar mantendo a qualidade do filme em temperaturas bem mais baixas — essencial no BEOL, onde o wafer já não pode ser aquecido <Cite id="lam-ald" />.
- **LPCVD** (*low pressure*): pressão baixa para uniformidade e conformidade melhores; é o método típico de polissilício e nitreto.
- **PVD** (*physical vapor deposition*) ou **sputtering**: não é reação química, é **bombardeamento**. Íons de argônio acelerados contra um alvo arrancam átomos que se depositam no wafer. É um processo direcional, e é justamente por isso que ele cobre mal paredes laterais.

### Por que a ALD passou a ser indispensável

A **ALD** (*atomic layer deposition*) resolve o problema de forma elegante: em vez de controlar quanto material chega, ela o coloca **uma camada atômica por vez** e **para sozinha**. Cada ciclo tem duas etapas de reação química em que o precursor reage até **esgotar os sítios disponíveis na superfície**; a partir daí, não importa quanto precursor a mais se mande — nada mais se deposita <Cite id="amat-ald" />.

O resultado é que a espessura passa a depender **apenas do número de ciclos**, não de tempo, vazão ou temperatura <Cite id="amat-ald" />. E como cada ciclo cobre tudo o que estiver exposto, a espessura é a mesma no topo, na parede e no fundo — inclusive em estruturas muito profundas. A ASM relata gap-fill de estruturas com **razão de aspecto superior a 100:1**, tecnologia escolhida para várias aplicações de 3D NAND <Cite id="asm-ald-gapfill" />.

O preço é a lentidão: o crescimento por ciclo fica na casa de **0,1 nm**, e um ciclo completo com purgas dura segundos <Cite id="yim-ald-gpc" />. Deposições espessas não são feitas por ALD. O que se faz por ALD é o que precisa ser fino, exato e conforme — óxidos de porta de alta constante dielétrica, barreiras de difusão e os espaçadores dos transistores de ponta <Cite id="amat-trillium" />.

## Corrosão: tirar material de propósito

Depositar e depois corrosão é o par que dá forma ao chip. A litografia define **onde**; a corrosão define **o que sobra**.

<DiagramFigure src="/assets/etch-anisotropy.svg" alt="Mesma abertura de máscara, três químicas: o ataque úmido é isotrópico e corrói por baixo da máscara, o RIE é direcional e deixa paredes quase verticais, e o DRIE do processo Bosch corta trincheiras estreitas e profundas">
A máscara define a largura; a química define a forma. Um ataque isotrópico alarga o buraco por baixo da própria máscara.
</DiagramFigure>

A diferença central é a **direção**. Um ataque **úmido**, em solução, remove material em todas as direções no mesmo ritmo — é **isotrópico** — e por isso corrói também **por baixo da máscara**, abrindo o perfil além do que a litografia desenhou. Um ataque **seco**, a plasma, é **direcional**: íons são acelerados contra o wafer e atacam preferencialmente na vertical.

O **RIE** (*reactive ion etching*) é a técnica que combina as duas coisas e domina a indústria. Ele usa ao mesmo tempo a **reatividade química** do plasma, que remove material rápido, e o **bombardeamento iônico**, que dá direção. Os íons chegam perpendiculares porque o wafer está no eletrodo que recebe a maior tensão, e é essa combinação que produz as paredes quase verticais <Cite id="mks-rie" />.

### Seletividade: corroer o alvo sem corroer o resto

Nenhum processo de corrosão é perfeitamente escolhido. A **seletividade** mede a razão entre a velocidade de corrosão do material desejado e a do material que **não** deve sair — normalmente a máscara ou a camada de baixo.

No **DRIE** (*deep reactive ion etching*), que usa o chamado **processo Bosch** alternando uma etapa de corrosão e uma de passivação, os números são impressionantes: a máscara de **fotoresiste** aguenta uma seletividade de **150:1** e a de **óxido**, **450:1** <Cite id="bosch-drie" />. Isso é o que permite cavar mais de 400 µm de silício com uma máscara de poucos micrômetros. O mesmo processo alcança **80:1 de razão de aspecto em capacidade**, **60:1 em desenvolvimento** e **40:1 em produção em massa** <Cite id="bosch-drie" /> — e é o que fabrica as trincheiras do 3D NAND e as estruturas dos MEMS.

### O refinamento final: ALE

Existe um limite para o que se consegue controlar abaixando a pressão e aumentando a direcionalidade. Quando as dimensões críticas passam a se medir em poucos nanômetros e os filmes têm **2 ou 3 nm**, um processo contínuo se torna grosseiro demais: não há como parar no meio de uma camada atômica.

A **ALE** (*atomic layer etching*) aplica à corrosão a mesma ideia da ALD: um ciclo **autolimitante** com duas etapas — uma que **modifica** a superfície e outra que **remove só a camada modificada** <Cite id="ale-overview" />. Existe até uma "janela de energia de íon": energia suficiente para remover a camada modificada, mas **abaixo** do limiar de sputtering do material a granel. Fora dessa janela o processo deixa de ser autolimitante <Cite id="ale-overview" />.

É a tecnologia que permite aos fabricantes de equipamentos prometerem remoção de "algumas camadas atômicas por ciclo" <Cite id="lam-etch" /> — e é o que torna possível a corrosão dos transistores de ponta, onde errar um nanômetro é errar o dispositivo.

## Implantação iônica: dopar à força

Dopar silício é introduzir átomos de outro elemento na rede cristalina para mudar sua condutividade. Durante décadas isso foi feito por **difusão** — expor o wafer a um gás dopante em alta temperatura e deixar o átomo se espalhar. A difusão funciona, mas é difícil de controlar: o perfil resultante depende de temperatura e tempo de forma acoplada, e não há como ser preciso.

A **implantação iônica** resolve isso **atirando** os átomos. Os íons são acelerados a energias altas e literalmente penetram o silício, parando a uma profundidade que depende da **energia** do feixe; a quantidade que entra é a **dose**, medida diretamente como corrente elétrica <Cite id="cityu-implant" />. As duas variáveis ficam **independentes** — o que é a razão do método ter se tornado dominante.

As faixas são largas. Energias vão de **algumas centenas de eV a vários MeV**, o que coloca os íons de **menos de 10 nm** a cerca de **10 µm** de profundidade. As doses vão de **10¹¹ cm⁻²**, para ajustar a tensão de limiar do transistor, até **10¹⁸ cm⁻²**, para formar camadas dielétricas enterradas <Cite id="cityu-implant" />.

<DiagramFigure src="/assets/implant-profile.svg" alt="À esquerda, o feixe de íons inclinado 7 graus em relação à vertical sobre a rede cristalina; à direita, dois perfis de concentração por profundidade, um sem inclinação com cauda profunda e outro com 7 graus bem mais estreito">
O wafer é inclinado de propósito. Sem isso, alguns íons escorregam pelos canais abertos do cristal e aparecem muito mais fundo do que deveriam.
</DiagramFigure>

### Canalização e a inclinação de 7°

A rede cristalina do silício não é um obstáculo homogêneo. Visto ao longo de certas direções, existem **canais** — corredores vazios entre as fileiras de átomos — por onde um íon viaja quase sem colidir. É o efeito de **canalização**, e ele estraga o perfil: aparece uma **cauda profunda** de íons que foram muito além do previsto.

A solução industrial é quase banal de tão simples: **inclinar o wafer cerca de 7° em relação ao feixe** <Cite id="cityu-implant" />. Assim nenhum íon entra alinhado com um canal, e o perfil fica estreito e previsível. Na prática usam-se **8 a 9° de inclinação com 30° de rotação**, valores que também dependem da corrente do feixe <Cite id="implant-dose-rate" />.

### Quantas implantações tem um chip

O número cresceu junto com a complexidade. Um transistor MOS simples dos anos 1970 precisava de **6 a 8 implantações**. Um CMOS moderno com memória embutida pode chegar a **35** <Cite id="axcelis-implant" />. E não são implantações raras: uma fábrica grande processa até **50.000 wafers por mês**, com **20 a 30 implantações por wafer** — o que exige cerca de **20 implantadores** trabalhando em paralelo <Cite id="axcelis-implant" />.

Vale reparar no que isso significa em escala. Cada implantação é uma ida e volta completa: litografia, implantação, limpeza de fotoresiste, e normalmente uma metrologia para conferir. É esse tipo de contagem que faz o número total de etapas chegar a mil.

### O dano e a cura

Implantar íons a energia alta **destrói a rede cristalina** no caminho: os átomos de silício são deslocados das suas posições. O material fica amorfo, e um transistor não funciona em silício amorfo.

A cura é térmica. Um **recozimento** devolve a ordem cristalina e, ao mesmo tempo, ativa eletricamente os dopantes, que precisam ocupar posições substitucionais na rede para funcionar. O problema é o orçamento térmico: o recozimento precisa ser quente o bastante para reparar o cristal e **curto** o bastante para não espalhar os dopantes que acabaram de ser colocados com precisão.

É essa tensão que levou aos recozimentos rápidos — **RTP**, *rapid thermal processing* — e, mais recentemente, a recozimentos por laser, medidos em **milissegundos**. Quanto mais raso o perfil que se quer, mais curto tem que ser o pulso.

## Planarização: apagar o relevo

Depois de algumas camadas, a superfície do wafer deixa de ser plana. Cada depósito e cada corrosão deixam degraus, e os degraus se acumulam.

Isso seria um problema estético se a litografia não fosse **fotográfica**. Um sistema de projeção tem uma **profundidade de foco** finita: fora dela, a imagem sai borrada. Com o wafer acidentado, partes do campo ficam fora de foco e as dimensões críticas saem erradas <Cite id="cmp-depth-of-focus" />.

A solução é o **CMP** (*chemical mechanical planarization*), que faz exatamente o que o nome diz: combina um ataque **químico** da suspensão com um desgaste **mecânico** do pad rotativo. O wafer é pressionado contra um pad giratório com uma **suspensão** de partículas abrasivas e reagentes, e o relevo vai embora <Cite id="amat-cmp" />.

O CMP entrou na produção nos **anos 1980**, na IBM, para planarizar o dielétrico entre níveis de metal. Foi adotado de forma ampla quando a dimensão crítica chegou a **0,35 µm**, ponto em que as alternativas — vidro refluído, ataque reverso, *spin-on glass* — deixaram de atender <Cite id="cmp-history" />. Um passo de CMP pode levar **pouco mais de 60 segundos**, incluindo a limpeza posterior <Cite id="amat-cmp" />.

O defeito característico do CMP tem nome e é fácil de visualizar. Em áreas **largas** de metal, o material afunda: é o **dishing**. Em áreas **densas**, o dielétrico entre os fios se desgasta mais rápido que o metal: é a **erosão** <Cite id="cmp-history" />. Os dois pioram com o excesso de polimento, e os dois prejudicam a litografia da camada seguinte.

## Metrologia: medir para poder continuar

Nenhuma das etapas acima termina sem uma medida. A KLA, que fabrica os equipamentos de inspeção, descreve o arranjo com uma frase simples: **a maior parte dos passos de processo tem alguma metrologia ou inspeção associada** <Cite id="kla-msa" />.

A distinção entre as duas funções é útil e vale a pena guardar:

- **Metrologia** mede o que **está lá** — espessura, largura, alinhamento.
- **Inspeção** procura o que **não deveria estar lá** — partículas, riscos, defeitos <Cite id="kla-msa" />.

Medir tudo seria inviável, então a amostragem é por lote. A metrologia costuma rodar em **100% dos lotes, mas só 2 a 5 wafers de cada lote**; a inspeção de defeitos roda em **10 a 33% dos lotes**, com **1 a 5 wafers** <Cite id="kla-msa" />. Os quatro tipos principais de medida são **overlay**, **espessura de filme**, **dimensão crítica** e **forma do wafer** <Cite id="kla-msa" />.

Duas técnicas merecem nome. O **CD-SEM** usa um feixe de elétrons para medir a largura de uma linha com resolução nanométrica — é o que responde "a porta saiu com a largura que o desenho pedia?". E a **elipsometria espectroscópica** mede espessura **sem tocar** no wafer, e de forma **indireta**: em vez de medir a espessura, mede como a luz muda de polarização ao refletir, e resolve a espessura por modelo <Cite id="horiba-ellipsometry" />. É o método padrão para filmes ultrafinos, de poucos ångströms a dezenas de micrômetros, e para pilhas de múltiplas camadas <Cite id="horiba-ellipsometry" />.

### O laço de controle

Existe um detalhe que distingue uma fábrica de semicondutores de uma fábrica comum: a medida **não serve só para rejeitar**. Ela volta para dentro do processo.

O **SPC** (*statistical process control*) monitora o processo e **avisa** quando ele se desloca ou tende. Mas o SPC só olha: ele aciona o alarme. O que **fecha o laço** é o **controle run-to-run**: comparar a medida obtida depois do processo com o modelo dele, atualizar esse modelo — tipicamente com uma média exponencial — e **calcular um ajuste de receita limitado** para os wafers seguintes <Cite id="r2r-control" />.

No artigo que consolidou a técnica, os autores distinguem dois modos: um **rápido**, para deslocamentos súbitos, e um **gradual**, para derivas lentas <Cite id="r2r-control" />. É essa malha de realimentação que permite a um processo com tolerância de poucos nanômetros se manter estável por meses sem intervenção humana a cada lote.

## Interconexão: a parte do chip que ninguém vê

O transistor é a parte famosa, mas ele ocupa uma fração pequena do volume de um chip moderno. Em cima dele está uma **cidade de fios** — o BEOL — que distribui sinal, alimentação e clock para bilhões de dispositivos, em dezenas de níveis empilhados.

Por muito tempo esses fios foram de **alumínio**. Em **setembro de 1997**, a IBM anunciou a primeira tecnologia de interconexão de **cobre** integrada de forma manufaturável, e começou a entregar produto em 1998 <Cite id="ibm-copper" />. O ganho não era cosmético: o cobre conduz cerca de **duas vezes** melhor que o alumínio, com resistência do fio cerca de **40 a 45% menor**, e a vida útil contra **eletromigração** mais de **duas ordens de grandeza** maior <Cite id="ibm-cu-electroplating" />.

O motivo de trocar ficou claro no mesmo período. Com os fios ficando mais finos e mais próximos, a **constante de tempo RC** do fio cresceu, enquanto o atraso intrínseco do transistor caiu. Por volta de **0,25 µm**, as duas curvas se cruzaram: o **fio passou a ser mais lento que a porta** <Cite id="mpr-rc-limits" />. O próprio ITRS registrou o problema, observando que o atraso RC passara a ser dominado pela **interconexão global** e que só trocar materiais não bastava <Cite id="itrs-interconnect" />.

### Damasceno: como se faz um fio de cobre

O cobre tem um defeito prático: **é difícil de corroer**. Sem corrosão, não há como gravar o fio no metal. A indústria contornou o problema **invertendo a ordem**.

Em vez de gravar o metal, grava-se o **molde** e despeja-se o metal dentro:

<DiagramFigure src="/assets/copper-damascene.svg" alt="Quatro cortes do processo damasceno: trincheira e via abertas no dielétrico, deposição da barreira e da camada de semente, eletrodeposição de cobre de baixo para cima e, por fim, o polimento que remove o excesso">
O nome vem das técnicas de ourivesaria *damascena*, em que o metal é incrustado em sulcos abertos no material. O princípio é o mesmo.
</DiagramFigure>

O eletrólito é formulado para que o cobre cresça **de baixo para cima**, fechando a via antes de fechar a boca da trincheira — do contrário sobraria um vazio no meio do contato <Cite id="ibm-cu-electroplating" />. Em seguida, o **CMP** remove o cobre depositado acima da trincheira, e a superfície volta a ser plana. É por isso que o CMP e o cobre chegaram juntos: um sem o outro não fecha o ciclo.

### Low-k e o preço da proximidade

Trocar o metal resolve metade do problema. A outra metade está do outro lado do capacitor que cada par de fios forma: o **dielétrico entre eles**.

O SiO₂ tem constante dielétrica em torno de **4,0**. Baixá-la reduz a capacitância e, com ela, o atraso. As alternativas usadas na indústria vão de **SiOF** (k ≈ 3,5 a 3,8) e **SiCOH** (k ≈ 2,2 a 3,2) até o extremo: **ar**, com k = **1,0** <Cite id="cu-interconnect-review" />. Daí o nome **air gap** para as arquiteturas que deixam vazios deliberados entre os fios.

Medições em estruturas com air gap encontram k efetivo da ordem de **2,2** <Cite id="air-gap-keff" />, e tecnologias que chegam a **mais de 75% de fração de vazio** com k efetivo **abaixo de 2,1** <Cite id="hollow-airgap" />. É um ganho considerável — e um problema mecânico considerável, porque uma estrutura com 75% de ar tem muito pouco material para sustentar o empilhamento.

### Quantos níveis de metal

O número cresceu, e é maior do que a intuição sugere. A imec descreve pilhas BEOL com **até 15 camadas**, com **3 a 6** sendo os níveis finos "Mx" <Cite id="imec-roadmap" />. Análises físicas de produtos reais vão além: o die do **TSMC N3** usado no Lunar Lake tem **20 camadas de interconexão metálica** <Cite id="techinsights-n3-beol" />.

Cada uma dessas camadas tem sua própria litografia, seu próprio CMP e sua própria metrologia. É essa multiplicação, e não o transistor, que empurra a contagem de etapas para a casa do milhar.

## Rendimento: o número que decide se o produto existe

De tudo que se mede numa fábrica, um número decide mais que os outros: o **rendimento**, a fração de dies que funcionam.

O modelo mais simples supõe que os defeitos se distribuem aleatoriamente, e nesse caso o rendimento cai exponencialmente com a área:

\[ Y = e^{-D_0 A} \]

onde \(D_0\) é a densidade de defeitos e \(A\) a área do die <Cite id="leachman-yield" />. O modelo é bom para dies pequenos — a referência de Berkeley o considera adequado para áreas até cerca de **0,25 cm²** — e é conservador para dies grandes, justamente os que interessam <Cite id="leachman-yield" />.

O primeiro refinamento importante é de **1964**, de B. T. Murphy, dos Bell Labs: defeitos **não** se distribuem ao acaso, eles se **agrupam**. Tratar a densidade como uma variável aleatória e integrar sobre a distribuição dá o modelo de Murphy <Cite id="murphy-1964" />. Na prática, a formulação que a indústria adotou depois foi a **binomial negativa**, mais fácil de manipular e mais aderente aos dados reais <Cite id="murphy-integral" />.

### Por que o rendimento demora meses

A parte contraintuitiva é que o rendimento **não se resolve com um ajuste**. Ele se **aprende**.

O levantamento da Competitive Semiconductor Manufacturing, de Berkeley, mediu isso em número de empresas. Para uma tecnologia **nova**, o tempo médio de qualificação de processo foi de **12 meses**, com o melhor caso em **7**. Para uma tecnologia **parecida com uma que já estava em produção**, a média caiu para **7 meses**, com melhor caso em **4** <Cite id="berkeley-csm" />. E a diferença entre a média e o benchmark, no tempo de subida de rendimento, ficou em torno de **40%** <Cite id="berkeley-csm" />.

Ou seja: a vantagem competitiva não está em ter a receita certa, está em **chegar à receita certa mais rápido**. É uma corrida de aprendizado, e metade do valor de uma fábrica nova está na velocidade com que ela percorre essa curva.

<SourceNote :ids="['semieng-cycle-time', 'semieng-litho-layers', 'hitachi-metrology', 'imec-roadmap', 'deal-grove-1965', 'tu-wien-oxidation', 'ecs-sio2-limits', 'amat-ald', 'lam-ald', 'asm-ald-gapfill', 'yim-ald-gpc', 'amat-trillium', 'mks-rie', 'bosch-drie', 'lam-etch', 'ale-overview', 'cityu-implant', 'axcelis-implant', 'implant-dose-rate', 'cmp-depth-of-focus', 'cmp-history', 'amat-cmp', 'kla-msa', 'horiba-ellipsometry', 'r2r-control', 'ibm-copper', 'ibm-cu-electroplating', 'mpr-rc-limits', 'itrs-interconnect', 'cu-interconnect-review', 'air-gap-keff', 'hollow-airgap', 'techinsights-n3-beol', 'leachman-yield', 'murphy-1964', 'murphy-integral', 'berkeley-csm']" />

<SeeAlso :links="[
  { text: 'Fotolitografia', href: '/fotolitografia', note: 'como o desenho é impresso' },
  { text: 'Evolução dos transistores', href: '/transistores', note: 'o que o FEOL constrói' },
  { text: 'Empacotamento e teste', href: '/empacotamento', note: 'o que acontece depois da fab' },
  { text: 'Fabricação de wafers', href: '/fabricacao-wafers', note: 'antes da fab' },
  { text: 'Referências', href: '/referencias', note: 'lista numerada' },
]" />
