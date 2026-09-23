---
title: Empacotamento e teste
description: >-
  Depois da fábrica: o wafer é testado, cortado, ligado ao invólucro, protegido
  e testado de novo. É onde nascem o HBM, os chiplets e a ligação híbrida.
---

# Empacotamento e teste

A [fábrica](/na-fab) entrega um wafer com milhares de chips prontos — e inúteis. Eles estão grudados uns nos outros, sem ligação com o mundo exterior, expostos ao ar e à umidade, e ninguém sabe ainda **quais** deles funcionam.

Esta é a parte da cadeia que costuma ficar de fora das explicações, e é um erro. Em valor, ela é pequena; em **capacidade**, ela virou o gargalo da indústria de IA. E é aqui que estão algumas das apostas tecnológicas mais interessantes do setor: a memória que precisou morar do lado do processador, os chips que passaram a ser montados como um quebra-cabeça e a ligação que dispensa solda.

<DiagramFigure src="/assets/back-end-flow.svg" alt="A sequência após a fábrica: teste de wafer, fatiamento, empacotamento com ligação por fio, encapsulamento e teste final do componente montado">
O wafer entra à esquerda como uma peça única e sai à direita como componentes avulsos, testados e prontos para soldar numa placa.
</DiagramFigure>

## Teste de wafer: separar o joio antes de pagar o molde

A primeira coisa que acontece com o wafer é uma medida. Um **cartão de sondas** desce sobre cada die, agulhas fazem contato com seus pads e um testador elétrico verifica se ele funciona <Cite id="semiprobe-wafer-test" />.

A razão é puramente econômica: **empacotar custa dinheiro**, e não faz sentido gastar invólucro, fio e molde em um die que já nasceu ruim. O teste de wafer encontra os dies ruins **antes** de qualquer um desses gastos <Cite id="semiprobe-wafer-test" />.

A sequência de fabricação fica assim: **fab → teste de wafer → empacotamento → teste final** <Cite id="semiprobe-wafer-test" />.

### O cartão de sondas é uma peça sob medida

Cada produto precisa do seu próprio cartão. Ele é um conjunto de agulhas ou molas posicionadas exatamente sobre os pads do die, e um cartão pode ter **literalmente alguns milhares de sondas** — o que o torna complexo e caro de fazer <Cite id="cadence-kgd" />.

Isso impõe uma limitação prática que costuma surpreender: o teste de wafer **não é igual** ao teste final. O cartão tem características elétricas diferentes das do invólucro e, muitas vezes, **não consegue rodar na velocidade de operação** do produto <Cite id="cadence-kgd" />. O teste de wafer é uma peneira grossa, não a medida definitiva.

### O problema do die bom

Existe um conceito que se tornou central com o empacotamento avançado: o **die sabidamente bom** (*known good die*, KGD). Em um pacote onde vários dies são montados juntos, um die ruim que escapa pode levar os outros junto — o artigo da Cadence chama isso de **dano colateral** <Cite id="cadence-kgd" />.

Em um pacote monolítico, um die ruim custa um die. Em um pacote 2.5D com oito pilhas de HBM e dois chips lógicos, um die ruim custa o pacote inteiro. Por isso o teste de wafer, que começou como economia, virou **requisito de viabilidade** nos pacotes modernos.

### Quem testa o quê

O mercado de testadores elétricos (**ATE**, *automated test equipment*) é um dos mais concentrados do setor. A Advantest estima ter **58% do mercado global em 2024**, e declara que **Advantest e Teradyne juntas somam cerca de 80%** do mercado de testadores <Cite id="advantest-ir" />.

O custo do teste é frequentemente descrito como uma fração pequena do valor do chip, e isso é verdade — mas com nuances. O ITRS registra que melhorias contínuas levaram o custo típico de teste para **menos de 2 a 3% da receita** de um circuito integrado <Cite id="itrs-2015-test" />. O mesmo documento faz uma conta útil: em um dispositivo que custa **US$ 1,00** para fabricar, com teste a **5%**, cortar 10% do custo de teste economiza **US$ 0,005** por peça, enquanto ganhar 1% de rendimento economiza **US$ 0,01** <Cite id="itrs-2015-test" />.

A conclusão prática dessa aritmética é que o teste **não se paga por si**: ele se justifica pelo que evita. E o que ele evita tem nome próprio — em um piso de teste de memória analisado pelo ITRS, **o cartão de sondas representava 60% de todo o custo do teste de wafer** <Cite id="itrs-2013-test" />.

### Uma terceira peneira

Além do teste de wafer e do teste final, existe um terceiro ponto, cada vez mais comum: o **teste em nível de sistema** (*system-level test*, SLT). Em vez de medir parâmetros elétricos, ele **liga o dispositivo** — o componente já montado roda *firmware* real e executa cargas de trabalho num ambiente parecido com o de uso <Cite id="teradyne-slt" />.

É a resposta para um problema crescente: alguns defeitos só aparecem quando o chip faz aquilo para que foi feito, e nenhuma medida isolada de parâmetro os captura.

## Fatiamento: separar os dies

Terminado o teste, o wafer precisa ser **cortado**. Parece a etapa mais trivial do processo e não é: cada corte introduz trincas microscópicas, e uma trinca na borda de um die é uma falha mecânica que vai aparecer depois, muitas vezes já no produto do cliente.

O método mais comum é a **lâmina de diamante**, e a geometria importa. A largura do corte — o **kerf** — não é a espessura da lâmina: é a espessura **mais o lascamento**. Em silício, o lascamento acrescenta cerca de **20 µm de cada lado**; em vidro, cerca de **10 µm** <Cite id="ku-dicing-sop" />. A lâmina em si tem dezenas de micrômetros: uma lâmina de níquel padrão mede **40 µm**, e as resinadas para vidro chegam a **100 µm** <Cite id="ku-dicing-sop" />.

Os parâmetros acompanham o material. Para silício usa-se o fuso a **30.000 rpm** com avanço de **5 a 10 mm/s**; para vidro, rotação menor <Cite id="disco-dad3221" />.

### Quando a lâmina deixa de servir

Três situações empurraram a indústria para alternativas.

A primeira é a **fragilidade dos dielétricos de baixa constante dielétrica**. Os filmes *low-k* do [BEOL](/na-fab#interconexao-a-parte-do-chip-que-ninguem-ve) são mecanicamente frágeis e **se danificam facilmente** no corte com lâmina, o que motivou a busca por outros métodos <Cite id="ectc-2016-dicing" />.

A segunda é o **lascamento em wafers finos**. Em um wafer de **25 µm** de espessura — número que hoje é comum em memorias empilhadas — uma lâmina padrão causa lascamento substancial na face de trás; é preciso recorrer a grãos muito mais finos <Cite id="disco-thin-wafer" />.

A terceira é o **HBM**, onde as camadas são finas e a resistência da peça é crítica. Um estudo comparando lâmina, laser e *stealth* em wafers para integração 2.5D/3D encontrou a **maior resistência à fratura no fatiamento por *stealth***, e observou que wafers de **60 µm** resistem mais que os de 90 ou 120 µm <Cite id="mdpi-singulation-hbm" />.

As alternativas se dividem em três famílias:

- **Laser de corte** e ***stealth dicing***: no *stealth*, um laser com comprimento de onda que **atravessa** o silício é focalizado **dentro** do wafer, formando uma camada modificada; a separação acontece depois, por expansão da fita. O processo é totalmente seco, **sem kerf** e sem lascamento <Cite id="hamamatsu-stealth" />.
- ***Laser grooving* + plasma**: o laser abre um sulco estreito e o plasma aprofunda e separa, com larguras **abaixo de 10 µm** e bordas limpas <Cite id="imaps-plasma-dicing" />.
- **PDBG** (*plasma dicing before grinding*): separa por plasma **antes** do afinamento, o que reduz contaminação e trincas <Cite id="pdbg-dicing" />.

Vale registrar o quanto esse cuidado paga. Um estudo clássico mostrou que o **desbaste mecânico** cria regiões fracas onde a resistência da pastilha cai **30 a 35%** em relação à média do wafer. Duas intervenções melhoraram isso de forma dramática: **reduzir a velocidade de desbaste pela metade aumentou a resistência média em 56%**, e **desgastar de propósito o fio de uma lâmina nova aumentou a resistência em cinco vezes** <Cite id="ieee-die-strength" />. O corte não é o fim de um processo; é o começo da confiabilidade mecânica do produto.

## Wire bonding: a tecnologia que monta 80% do mundo

Existe uma tentação de tratar *wire bonding* como tecnologia do passado. Os números dizem o contrário: **mais de 80% dos invólucros de semicondutores** ainda são montados por fiação <Cite id="semieng-wirebond" />, e uma revisão acadêmica de 2023 confirma o mesmo patamar, acrescentando um dado incômodo — cerca de **um quarto a um terço das falhas de pacote** vem justamente da ligação por fio <Cite id="pmc-bonding-wire" />.

O princípio é o que se vê na figura: o die fica **de face para cima**, e fios finíssimos saem dos pads na sua **periferia** e descem até o substrato. Cada fio é uma conexão elétrica, e há dois tipos de ponta: a **ball bond**, em que uma esfera de fio é fundida e prensada sobre o pad, e a **wedge bond**, em que o fio é esmagado lateralmente — esta produz laços mais baixos, o que importa em radiofrequência <Cite id="inseto-wire-guide" />.

O diâmetro do fio é a dimensão crítica. A fiação de cobre de ponta usa **15 µm de fio com passo de 40 µm**; a de ouro usa **18 µm** no mesmo passo <Cite id="imaps-cu-wire" />.

### A troca do ouro pelo cobre

Por décadas o fio foi de **ouro**. Por volta de **2010**, o preço do ouro subiu, e a indústria migrou para o **cobre** <Cite id="semieng-wirebond2" />. Hoje cerca de **70% dos pacotes com fiação usam cobre** <Cite id="semieng-wirebond2" />, e a SEMI registrou em 2019 o cobre passando de **54% dos embarques de fio de ligação**, com o ouro **abaixo de 32%** <Cite id="semi-gspmo-2020" />.

Não foi só preço. O cobre é **melhor condutor** e tem **maior condutividade térmica** que o ouro, além de crescer compostos intermetálicos mais lentamente com o alumínio — o que melhora a confiabilidade <Cite id="pmc-bonding-wire" />. A comparação entre os dois é eloquente: a resistividade do cobre é **1,72×10⁻⁸ Ω·m** contra **2,2×10⁻⁸** do ouro; a dureza Vickers é **369** contra **216**; e o módulo de elasticidade é **130 GPa** contra **78** <Cite id="gold-bulletin-ball-bonds" />.

Os dois "contra" são o preço dessa escolha. O cobre é mais **duro**, o que aumenta a tensão sobre o silício, e **oxida** com facilidade, exigindo atmosfera inerte de nitrogênio durante a ligação <Cite id="pmc-bonding-wire" />.

### Por que a fiação ainda ganha

A economia explica bem. Um fio de cobre de 25 µm custa **menos de um décimo** de um fio de ouro equivalente; e enquanto a fiação de **ouro** se torna mais cara que o flip-chip acima de **1.024 contatos**, a de **cobre** continua competitiva **até cerca de 2.000 contatos** <Cite id="imaps-cu-wire" />.

Ou seja: a fiação não sobreviveu por inércia. Ela ganhou uma faixa de aplicação muito mais larga, e é lá que vive a maior parte dos chips do mundo — microcontroladores, reguladores, sensores, memórias, praticamente tudo que não é processador de alta performance.

## Flip-chip: virar o die de cabeça para baixo

A limitação da fiação é geométrica: os pads precisam ficar na **borda** do die, porque é de lá que o fio sai. Isso limita o número de conexões ao perímetro — e o perímetro cresce com a raiz da área.

O **flip-chip** resolve invertendo o die. Ele é montado **de face para baixo**, e a conexão é feita por esferas de solda ou pilares de cobre distribuídos por **toda a superfície ativa** <Cite id="wiley-packaging-ch3" />.

<DiagramFigure src="/assets/wirebond-vs-flipchip.svg" alt="Comparação lado a lado: à esquerda o die de face para cima com fios em laço saindo da borda; à direita o die de face para baixo com esferas de solda distribuídas por toda a área">
A escolha é uma só — face para cima ou para baixo — e ela determina quantas conexões o pacote consegue ter.
</DiagramFigure>

O ganho é triplo: o caminho elétrico fica **curto**, a **indutância** cai muito e o número de contatos deixa de ser limitado pelo perímetro. É por isso que microprocessadores, GPUs e aceleradores são flip-chip: eles precisam de **milhares** de conexões simultâneas <Cite id="wiley-packaging-ch3" />.

### C4: uma invenção com 60 anos

A conexão por esferas de solda nasceu na IBM. No **verão de 1962**, a empresa reduziu a prática um transistor flip-chip com conexões de solda — eram apenas **3 esferas por chip**, cada uma com uma esfera de cobre de *5 mil* embutida para servir de espaçador <Cite id="totta-flipchip" />. Depois vieram as **barreiras de vidro**, que impediam a solda de espalhar e de fazer o chip colapsar: daí o nome **C4**, *controlled collapse chip connection* <Cite id="totta-flipchip" />.

A descrição formal do processo C4 é de **L. F. Miller**, em 1969, e a patente americana **3.429.040** foi concedida em fevereiro daquele ano <Cite id="springer-flipchip-history" />. Em **quarenta anos**, o número de esferas por chip saiu de **3 para 7.018** <Cite id="totta-flipchip" /> — provavelmente a melhor medida de quanto essa ideia rendeu.

### Do C4 ao pilar de cobre

As esferas de solda têm um limite de escala. O C4 padrão opera em passos de **130 a 250 µm**, e abaixo de cerca de **130 µm** simplesmente não sobra espaço lateral — com altura de esfera de ~70 µm, as soldas vizinhas se tocam e curto-circuitam <Cite id="semieng-flipchip-bumps" />.

A resposta foi o **pilar de cobre**: em vez de uma esfera achatada, um cilindro de cobre com uma camada de solda no topo. A IBM patenteou a tecnologia em **2001**; a Intel a usou em processadores de 65 nm em **2006**, citando melhor resistência à eletromigração, melhor condução térmica e maior densidade de contatos <Cite id="synopsys-cu-pillar" />. O pilar é usado **abaixo de 130 µm de passo**, tipicamente com **~40 µm de cobre e ~25 µm de solda**, e os microbumps ficam **abaixo de 10 µm de altura** <Cite id="semieng-flipchip-bumps" />.

## 2.5D, 3D e a hierarquia dos pacotes

Até aqui, cada invólucro continha **um** die. A partir daqui, a pergunta muda: como colocar vários chips no mesmo pacote, ligados de forma rápida o bastante para se comportarem como um só?

<DiagramFigure src="/assets/package-generations.svg" alt="Quatro gerações de conexão lado a lado: fiação na borda com fio de 15 a 25 micrômetros, flip-chip com bumps acima de 130 micrômetros, 2.5D com microbumps de cerca de 40 micrômetros sobre um interposer, e 3D empilhado com ligação direta abaixo de 10 micrômetros">
A estrada do empacotamento avançado é uma só métrica descendo: a distância entre duas conexões vizinhas.
</DiagramFigure>

### 2.5D: os chips lado a lado

Na integração **2.5D**, os dies ficam **lado a lado** sobre uma peça intermediária chamada **interposer**, tipicamente de silício. Detalhe importante: são apenas **os interposers que precisam de vias atravessando o silício**, não os chips — o que permite reaproveitar projetos de die existentes <Cite id="fue-packaging-roadmap" />.

A TSMC chama sua plataforma 2.5D de **CoWoS** (*chip on wafer on substrate*), e ela está em produção **desde 2012** <Cite id="tsmc-cowos" />. Hoje são três variantes que vale distinguir:

- **CoWoS-S**: interposer de **silício**, suportando até **3,3× o retículo** (cerca de **2.700 mm²**), com capacitores de trincheira profunda embutidos <Cite id="tsmc-cowos" />.
- **CoWoS-R**: em vez de silício, um **interposer de redistribuição** — polímero com trilhas de cobre. Está em produção em volume **desde 2023** e escala além das 3,3× <Cite id="tsmc-cowos" />.
- **CoWoS-L**: combina um interposer de redistribuição com **pontes de silício localizadas** (*LSI*), posicionadas apenas onde a densidade de conexão exigir <Cite id="tsmc-cowos" />.

A primeira quebra da barreira do retículo veio em **março de 2020**, com a TSMC e a Broadcom anunciando um interposer de **2× o retículo** (~1.700 mm²). Ele suportava até **6 cubos de HBM**, **96 GB** de memória e **2,7 TB/s** de banda — **2,7 vezes** a solução CoWoS de 2016 —, usando **costura de máscaras** para ultrapassar o tamanho de um campo de exposição <Cite id="tsmc-2x-cowos" />.

### 3D: os chips empilhados

Na integração **3D**, os dies são **empilhados** e ligados por **vias que atravessam o silício** (TSV). As dimensões contam a história do processo: em HBM, as TSVs têm tipicamente **2 a 5 µm de diâmetro** e **30 a 60 µm de profundidade**, no esquema *via-middle* — formadas **depois** do front-end e **antes** do BEOL, equilíbrio entre densidade, custo e térmica <Cite id="semieng-tsv" />. Em interposers, as TSVs são maiores, **10 µm ou mais**, com razão de aspecto em torno de **10:1** <Cite id="semieng-tsv" />.

Estamos falando de furos de poucos micrômetros de diâmetro, com dezenas de micrômetros de profundidade, **preenchidos com cobre** e polidos — em cada uma das centenas de milhares de vias de uma pilha de memória.

### A ligação híbrida

O empilhamento por microbumps tem um teto. Os microbumps mais avançados hoje ficam em torno de **40 µm de passo** — o que significa esferas de **20 a 25 µm** separadas por **15 µm** —, e a tecnologia é viável até cerca de **10 a 20 µm**. Abaixo disso, a solda não funciona mais <Cite id="semieng-bump-pitch" />.

A saída é eliminar a solda. Na **ligação híbrida** (*hybrid bonding*), as superfícies de **cobre** e de dielétrico são polidas até ficarem atomicamente planas, postas em contato e aquecidas. O cobre se difunde e se une **diretamente** ao cobre do outro lado, sem material de solda no meio.

Os números que isso destrava são de outra ordem: **mais de um milhão de interconexões por mm²** com passo de cobre de cerca de **1 µm** <Cite id="imec-hybrid-bonding" />. A imec demonstrou ligação **die-a-wafer com passo de 2 µm e alinhamento melhor que 350 nm** <Cite id="imec-d2w-hb" />, e a ligação **wafer-a-wafer a 400 nm de passo** exige alinhamento **abaixo de 100 nm** <Cite id="imec-hybrid-bonding" />. A própria imec estima que a solda em die-a-wafer vai **estagnar entre 10 e 5 µm de passo** <Cite id="imec-hybrid-bonding" />.

A Intel descreve sua implementação — **Foveros Direct 3D** — como capaz de passo **abaixo de 10 µm** e **até 10 vezes** a densidade de interconexão dos microbumps convencionais <Cite id="intel-foveros-direct" />.

Há uma razão de rendimento por trás disso, e ela é elegante: ligar **die a wafer** permite empilhar apenas **dies sabidamente bons**, elevando o rendimento composto, e permite unir **dies de tamanhos diferentes** — o que a ligação wafer-a-wafer não permite <Cite id="imec-d2w-hb" />.

## HBM: a memória que precisou morar ao lado

A faixa de memória de um sistema é limitada por **largura de banda**, e a largura de banda é limitada pela **distância**. Mandar dados por uma placa de circuito é lento, trabalhoso e energicamente caro. A solução do **HBM** (*high bandwidth memory*) foi radical: em vez de aproximar a memória do processador, **coloque-a no mesmo pacote**.

O HBM é um padrão JEDEC, e a evolução das versões é a própria história do gargalo de IA:

| Padrão | Publicação | Interface | Banda por pilha |
| --- | --- | --- | --- |
| HBM2 (JESD235A) | janeiro de 2016 | 1.024 bits, 8 canais | 256 GB/s |
| HBM3 (JESD238) | janeiro de 2022 | 1.024 bits, 16 canais | 819 GB/s |
| HBM4 (JESD270-4) | abril de 2025 | 2.048 bits, 32 canais | 2 TB/s |

<Cite id="jedec-hbm2" /> <Cite id="jedec-hbm3" /> <Cite id="jedec-hbm4" />

<DiagramFigure src="/assets/hbm-bandwidth.svg" alt="Gráfico de barras da banda por pilha de HBM, de 128 gigabytes por segundo na primeira geração até cerca de 2.048 no HBM4 e 4.096 projetados para o HBM4E, com os padrões numerados pela JEDEC destacados">
Cada geração dobra algo: a taxa por pino, a largura da interface ou a contagem de canais. O resultado composto é o salto que se vê no gráfico.
</DiagramFigure>

O HBM4 é o exemplo mais claro de por que essa memória **não pode** ser um módulo encaixado. O padrão dobra a interface de **1.024 para 2.048 bits** e os canais de **16 para 32 por pilha**, com velocidade de até **8 Gb/s** e densidades de **4 a 64 GB** <Cite id="jedec-hbm4" />.

Do lado do processador, isso significa uma contagem de trilhas que não tem como existir em placa: são **mais de mil fios** entre o acelerador e uma única pilha de HBM já na geração HBM3E, densidade **impossível de rotear** em substrato orgânico ou placa de circuito <Cite id="semianalysis-hbm" />. No HBM4, são **2.048 fios de dados** e cerca de **3.000 trilhas** contando clock, controle e endereço <Cite id="rambus-hbm" />.

Aí entra a integração **2.5D**, descrita acima. O interposer de silício existe, em boa medida, para tornar fisicamente possível essa contagem de fios.

### O que o HBM custa

Nada disso é de graça, e o custo aparece na densidade. As TSVs, que precisam atravessar cada die da pilha, ocupam **área que não armazena nada**. A comparação feita pela SemiAnalysis com números da SK hynix é direta: uma pastilha DDR4 D1z entrega **0,296 Gb/mm²**, enquanto uma HBM3 entrega **0,16 Gb/mm²** — **85% mais densa** no caso do DDR4 <Cite id="semianalysis-hbm" />.

Ou seja: a memória mais rápida do mundo é também a **menos densa**. A indústria aceita esse trade-off porque, em sistemas de IA, a largura de banda limita o desempenho mais do que a capacidade — e um acelerador sem banda suficiente deixa unidades de computação **paradas** <Cite id="semianalysis-hbm" />.

## Chiplets: dividir para render

Um chip é limitado por um número físico: o **retículo**. Uma exposição de litografia cobre no máximo cerca de **830 mm²** <Cite id="ectc-cowos-s5" />. Nenhum desenho maior que isso é possível — não por dificuldade de projeto, mas porque não cabe no equipamento.

O problema é que o retículo não é o único limite. Rendimento também é, e piora com a área.

<DiagramFigure src="/assets/chiplet-yield.svg" alt="Curva de rendimento em função da área do die: um die único de 800 milímetros quadrados rende cerca de 45%, enquanto um chiplet de 200 milímetros quadrados rende cerca de 82%; o limite do retículo é marcado perto de 830 milímetros quadrados">
Cada defeito mata um die inteiro. Quanto maior o die, mais defeitos ele encontra pela frente.
</DiagramFigure>

A alternativa é **partir o produto em chips menores**. Em vez de um die monolítico grande, fabricam-se vários *chiplets* que depois são montados juntos no mesmo pacote, comunicando-se por interconexões rápidas em vez de trilhas internas.

A aritmética da AMD, apresentada no Hot Chips de 2017, é o exemplo clássico. Substituir um die monolítico hipotético de **777 mm²** por **quatro dies de 213 mm²** — totalizando **852 mm²**, ou seja, cerca de **10% mais silício** — resultou em um custo de aproximadamente **0,59 vezes** o do monolítico <Cite id="amd-chiplet-economics" />. Mais área total, **41% menos custo**.

O motivo é exatamente o da figura: os quatro dies pequenos rendem muito melhor individualmente, e só os que funcionam seguem para a montagem.

### UCIe e a padronização da interface

O chiplet criou um problema novo: cada fabricante definia sua própria forma de os dies conversarem. Isso amarra o cliente ao fornecedor — o oposto do ecossistema que fez o resto da indústria crescer.

A resposta veio em **março de 2022**, quando **ASE, AMD, Arm, Google Cloud, Intel, Meta, Microsoft, Qualcomm, Samsung e TSMC** se juntaram para ratificar a especificação **UCIe** (*Universal Chiplet Interconnect Express*), uma interface die-a-die aberta. A UCIe 1.0 previa taxas de até **32 GT/s** com **16 a 64 pistas** <Cite id="ucie-formation" />. Em agosto de **2025**, a versão **3.0** dobrou as taxas para **48 e 64 GT/s** <Cite id="ucie-3" />.

A aposta é a mesma que fez o PCIe e o USB funcionarem: um barramento comum transforma um produto proprietário num mercado.

## Teste final, queima e classificação

Depois de montado, o componente volta para o testador. O **teste final** repete boa parte do que o teste de wafer já fez, e isso não é redundância: ele existe para pegar **defeitos que a própria montagem criou** — uma esfera de solda faltando, um fio não ligado <Cite id="anysilicon-wafer-sort" />.

### A queima

Existe uma classe de falhas que nenhum teste elétrico simples captura: os defeitos **latentes**, que só se manifestam depois de algum tempo de uso. Eles produzem a chamada **mortalidade infantil** — a concentração de falhas nos primeiros meses de vida do produto.

O ***burn-in*** existe para antecipar isso: os componentes são submetidos a condições **no nível ou acima do máximo especificado**, com o objetivo de **estressar os defeitos para fora** antes do embarque <Cite id="mil-std-883" />. Na produção, ele é feito no componente **já montado**, em soquetes e fornos, tipicamente por **24 a 48 horas** <Cite id="semieng-burnin" />.

É uma troca explícita: a queima **reduz o custo de garantia ao custo de algum rendimento**, porque parte dos dispositivos não sobrevive ao próprio teste <Cite id="ieee-burnin" />. Ela também pode **danificar** dispositivos por fuga térmica, descarga eletrostática ou sobretensão <Cite id="semieng-burnin" />. Há um tempo ótimo, e ele é uma decisão econômica, não técnica.

### Binning: um die, vários produtos

Nem todo chip funcional é igual. No **teste final**, os dispositivos são classificados — ***binned*** — por **frequência máxima de operação**, por **tensão**, por **temperatura**, por **corrente de fuga** ou por capacidade de excitação de saída <Cite id="semieng-binning" />.

É por isso que o mesmo die aparece na loja em várias versões com preços diferentes. A classificação é feita **depois do empacotamento**, no teste final <Cite id="semieng-binning" />, e converte a variabilidade natural do processo em uma **linha de produtos** em vez de desperdício. Um die que não alcança a frequência do modelo topo ainda pode ser vendido como o modelo de baixo.

## Quanto vale o empacotamento

Vale fechar com o tamanho econômico dessa parte da cadeia, porque ele é contraintuitivo em duas direções ao mesmo tempo.

A primeira: é **pequeno**. A CSET cita um relatório anterior que estimava a montagem, teste e empacotamento (*ATP*) em cerca de **10% do valor de um chip pronto**, contra aproximadamente **45%** agregados pelas etapas de projeto e fabricação de front-end. Um relatório da SIA com a BCG chega a um número ainda menor, de **6%** — com o segmento respondendo por **3% do P&D** e **13% do capital** da indústria <Cite id="cset-packaging" />.

A segunda: apesar disso, o **ITRS registra que o custo de empacotamento frequentemente excede o custo de fabricação do próprio circuito integrado** <Cite id="itrs-assembly" />. As duas afirmações convivem porque medem coisas diferentes — participação no valor final do produto, de um lado, e custo industrial da etapa, do outro.

E há um terceiro dado, mais recente, que explica por que o assunto deixou de ser periférico. O mercado de **empacotamento avançado** — a parte que faz CoWoS, HBM e chiplets — movimentou cerca de **US$ 46 bilhões em 2024** e caminha para **mais de US$ 79 bilhões em 2030** <Cite id="yole-advanced-packaging" />. É uma fração menor do total, mas é a fração que **limita** o resto: a TSMC declarou em 2024 que a capacidade de CoWoS **mais que dobrou** em relação ao ano anterior e que pretendia dobrar de novo, e ainda assim a demanda dos clientes **excedia em muito** a capacidade de fornecimento <Cite id="tsmc-q3-2024" />.

Um gargalo pequeno em valor pode ser um gargalo grande em consequência. Foi o que aconteceu com o empacotamento: durante décadas a etapa barata no fim da linha, hoje é a etapa que decide quantos chips de IA o mundo consegue montar.

<SourceNote :ids="['semiprobe-wafer-test', 'cadence-kgd', 'advantest-ir', 'itrs-2015-test', 'itrs-2013-test', 'teradyne-slt', 'ku-dicing-sop', 'disco-dad3221', 'disco-thin-wafer', 'ectc-2016-dicing', 'mdpi-singulation-hbm', 'hamamatsu-stealth', 'imaps-plasma-dicing', 'pdbg-dicing', 'ieee-die-strength', 'semieng-wirebond', 'semieng-wirebond2', 'pmc-bonding-wire', 'inseto-wire-guide', 'imaps-cu-wire', 'semi-gspmo-2020', 'gold-bulletin-ball-bonds', 'wiley-packaging-ch3', 'totta-flipchip', 'springer-flipchip-history', 'semieng-flipchip-bumps', 'synopsys-cu-pillar', 'fue-packaging-roadmap', 'tsmc-cowos', 'tsmc-2x-cowos', 'semieng-tsv', 'semieng-bump-pitch', 'imec-hybrid-bonding', 'imec-d2w-hb', 'intel-foveros-direct', 'jedec-hbm2', 'jedec-hbm3', 'jedec-hbm4', 'rambus-hbm', 'semianalysis-hbm', 'ectc-cowos-s5', 'amd-chiplet-economics', 'ucie-formation', 'ucie-3', 'anysilicon-wafer-sort', 'mil-std-883', 'semieng-burnin', 'ieee-burnin', 'semieng-binning', 'cset-packaging', 'itrs-assembly', 'yole-advanced-packaging', 'tsmc-q3-2024']" />

<SeeAlso :links="[
  { text: 'Na fab', href: '/na-fab', note: 'de onde sai o wafer processado' },
  { text: 'Fotolitografia', href: '/fotolitografia', note: 'o limite do retículo' },
  { text: 'Evolução dos transistores', href: '/transistores', note: 'o que está dentro do die' },
  { text: 'Fabricação de wafers', href: '/fabricacao-wafers', note: 'espessura e afinamento' },
  { text: 'Referências', href: '/referencias', note: 'lista numerada' },
]" />
