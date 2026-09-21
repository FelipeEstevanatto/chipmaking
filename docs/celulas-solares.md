---
title: Células e módulos solares
description: >-
  Da lâmina de silício à célula fotovoltaica: texturização, emissor,
  antirrefletor, metalização e montagem do módulo.
---

# Células e módulos solares

O wafer de silício tem dois destinos industriais. Um é a **fab** de semicondutores, que percorre a [fotolitografia](/fotolitografia) até chegar aos [transistores](/transistores). O outro é a **linha de células fotovoltaicas**, onde o mesmo material — só que multicristalino e com pureza menor — vira a célula que converte luz em eletricidade.

A célula de silício cristalino é, de longe, a tecnologia dominante: responde por **pelo menos 80%** do mercado fotovoltaico, posição que deve à maturidade da tecnologia e ao custo direto mais baixo <Cite id="saimm" />.

## As sete etapas da célula

<DiagramFigure src="/assets/solar-cell.svg" alt="Corte de uma célula solar de silício cristalino: contatos frontais de prata, camada antirrefletora de nitreto de silício, emissor n+ dopado com fósforo, base p dopada com boro, campo retroativo p+ e contato traseiro de alumínio">
A célula pronta em corte: as camadas que a luz atravessa até a junção p-n, e os dois contatos que recolhem a corrente.
</DiagramFigure>

### Remoção da camada danificada

O wafer sai do corte com uma superfície **danificada e contaminada** pela serra. No início do processo, **10 a 20 µm** são atacados quimicamente de ambos os lados, tipicamente com soluções alcalinas, seguidos de enxágue em água deionizada <Cite id="saimm" />.

### Texturização

Depois do ataque, a superfície fica espelhada e **reflete mais de 35% da luz incidente**. A texturização resolve isso criando rugosidade em escala micrométrica <Cite id="saimm" />.

Em wafers **monocristalinos**, uma solução fraca de hidróxido de sódio e potássio com isopropanol a **80 °C** ataca o silício de forma **anisotrópica** — planos cristalinos diferentes reagem a velocidades diferentes — e produz **pirâmides distribuídas aleatoriamente**, que fazem a luz entrar e ricochetear em vez de voltar <Cite id="saimm" />. Em wafers **multicristalinos** esse truque não funciona, porque a orientação muda de grão para grão; ali a textura é **mecânica** <Cite id="saimm" />. O resultado, nos dois casos, é a reflexão cair **abaixo de 10%** <Cite id="saimm" />.

### Difusão do emissor (junção p-n)

É a etapa que transforma uma lâmina de silício num dispositivo. O wafer de partida é **dopado com boro** (tipo p); introduz-se **fósforo** (tipo n) para formar a **junção p-n** <Cite id="saimm" />.

O processo roda num forno a aproximadamente **900 °C por cerca de 30 minutos**, produzindo uma profundidade de penetração de **0,5 µm** — é essa camada rasa que a figura mostra como emissor. A fonte de dopante mais comum é o **POCl₃**, embora também se usem serigrafia ou deposição química de vapor <Cite id="saimm" />.

### Isolamento de borda

A difusão a partir da fase gasosa forma emissor na **superfície inteira** do wafer, inclusive nas bordas. O resultado é um **curto-circuito (shunt)** entre as regiões n e p <Cite id="saimm" />.

Para isolar o emissor frontal do traseiro usam-se técnicas **mecânicas, de corte a laser ou de ataque por plasma** — esta última a mais associada às células serigrafadas. Os wafers são empilhados numa câmara de vácuo e atacados em plasma de fluoreto ou óxido, removendo **2 a 5 µm** das bordas <Cite id="saimm" />.

### Camada antirrefletora

Reduzir a refletância da face frontal é uma das formas mais diretas de ganhar eficiência. Materiais com **índice de refração entre 1,4 e 2,7** servem como antirrefletor sobre silício <Cite id="saimm" />.

O **dióxido de titânio** foi a escolha industrial por muito tempo. Hoje domina o **nitreto de silício depositado por PECVD**, por combinar índice de refração próximo do ideal com um bônus importante: ele também **passiva a superfície**, reduzindo a recombinação <Cite id="saimm" />.

### Metalização

A formação dos contatos afeta praticamente todo o desempenho da célula: corrente de curto-circuito, tensão de circuito aberto, resistência série, resistência shunt e fator de preenchimento <Cite id="saimm" />. E há um compromisso embutido — o metal frontal precisa ter **baixa resistência e ocupar pouca área**, porque cada milímetro de prata é um milímetro que não recebe luz <Cite id="saimm" />.

A técnica dominante é a **serigrafia** (screen printing), em uso desde o início da década de 1970: pasta de **prata** na face frontal, pasta de **alumínio** na traseira, que se liga ao silício formando o contato e o campo retroativo. As pastas são secas em estufa a cerca de **300 °C** <Cite id="saimm" />. É um processo simples, rápido, barato e com pouco resíduo químico <Cite id="saimm" />.

### Queima dos contatos

Os contatos serigrafados nascem **em cima** da camada antirrefletora, que é isolante. A célula passa então por um tratamento térmico curto, de até **900 °C**, num forno de esteira <Cite id="saimm" />.

Durante a queima, o antirrefletor sofre **dissolução seletiva** e os contatos atravessam a camada até alcançar o emissor, sem penetrar fundo demais no silício — uma janela de processo estreita. É nessa etapa que também se forma o **campo retroativo** com o alumínio <Cite id="saimm" />.

## Da célula ao módulo

Uma célula de silício cristalino produz cerca de **0,5 V** — pouco demais para qualquer uso prático. Por isso as células são **interligadas em série** até atingirem uma tensão útil e depois **encapsuladas** para proteção contra umidade e impacto mecânico. O conjunto é o **módulo** (painel), que pode ser usado isolado ou integrado a um sistema fotovoltaico <Cite id="saimm" />.

O balanço energético é confortável: o **tempo de retorno de energia** fica entre **1 e 2 anos**, enquanto a vida útil do módulo é de **25 a 30 anos** <Cite id="saimm" />. Ou seja, o painel devolve a energia que custou para ser fabricado e ainda opera por mais de duas décadas.

## Uma história que começa antes dos semicondutores

A fotovoltaica é mais antiga que a eletrônica de estado sólido. Em **1839**, Alexandre-Edmond Becquerel observou que uma corrente elétrica surgia num eletrodo de platina coberto de prata imerso em eletrólito quando exposto à luz — o **efeito fotovoltaico** <Cite id="saimm" />. Em **1876**, o mesmo efeito foi demonstrado num sistema inteiramente sólido, com selênio e contatos de platina <Cite id="saimm" />.

A célula moderna nasce em **1954**, nos Bell Laboratories, com Chapin, Fuller e Pearson: silício com **6% de eficiência** <Cite id="saimm" />. Os números anteriores eram modestos — entre **0,1% e 0,5%** —, o que dá a medida do salto. Naquele mesmo ano surgiu uma célula de filme fino de sulfeto de cádmio com eficiência equivalente; em **1956** vieram as células de arseneto de gálio da RCA, também com 6%, e o silício já alcançava **10%** <Cite id="saimm" />.

A primeira aplicação em escala foi espacial: em **1958** os Estados Unidos lançaram o primeiro satélite alimentado por células solares, e eram de silício <Cite id="saimm" />.

## O silício não é o material ideal

Vale registrar uma ironia: o silício **não é o melhor material** para converter luz em eletricidade. Ele é um semicondutor de **gap indireto**, ou seja, o mínimo da banda de condução e o máximo da banda de valência ocorrem em valores diferentes de momento cristalino. A probabilidade de absorver um fóton cai muito, e a luz penetra uma distância considerável antes de ser absorvida <Cite id="saimm" />.

A consequência é material: **1 µm de arseneto de gálio** (gap direto) absorve o que **100 µm de silício** absorvem — duas ordens de grandeza de diferença <Cite id="saimm" />.

Além disso, a eficiência máxima teórica ocorre para gaps entre **1,4 e 1,6 eV**, e o silício fica **abaixo** dessa faixa <Cite id="saimm" />. O telureto de cádmio, que é de gap direto e está dentro do ótimo, é o segundo colocado em participação de mercado <Cite id="saimm" />.

Então por que o silício domina? Por razões **históricas e de oferta**: a indústria de semicondutores já havia construído a capacidade de produzir silício de altíssima pureza em grandes volumes <Cite id="saimm" />. A vantagem do silício não está no átomo, e sim na cadeia industrial que existe em volta dele.

## Escala, eficiência e custo

Os números do setor, na época do levantamento de Xakalashe e Tangstad, dão a dimensão da indústria <Cite id="saimm" />:

- A produção de células solares saltou de **1 GW (2004)** para **10 GW (2009)**, com o silício cristalino respondendo por pelo menos **80%**.
- A capacidade fotovoltaica **acumulada** mundial chegou a quase **40 GW** ao fim de 2010.
- Eficiências de até **22%** foram reportadas na indústria.
- O preço das células se aproximava de **1 dólar por watt-pico (US$/Wp)**; o módulo de silício cristalino mais barato ficava em torno de **2 US$/Wp**, enquanto módulos de CdTe já ficavam **abaixo de 1 US$/Wp**.

São números de 2011 e envelheceram rápido — a produção anual hoje se mede em centenas de gigawatts, não em dezenas. Mas eles mostram o formato da disputa que define a fotovoltaica desde então: o silício ganha em escala e cadeia produtiva, não em física.

<SourceNote :ids="['saimm', 'moller-2012']" />

<SeeAlso :links="[
  { text: 'Fabricação de wafers', href: '/fabricacao-wafers', note: 'de onde vem a lâmina' },
  { text: 'Polissilício', href: '/polissilicio', note: 'grau solar, grau eletrônico e a rota UMG' },
  { text: 'Mineração e MG-Si', href: '/mineracao-mg-si', note: 'o forno de arco submerso' },
  { text: 'Referências', href: '/referencias', note: 'lista numerada' },
]" />
