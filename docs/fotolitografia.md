---
title: Fotolitografia
description: Como o scanner transporta a luz da fonte ao wafer, o fotoresistor, o realce de resolução, a imersão e o passo a passo do processo.
---

# Fotolitografia

A fotolitografia é a etapa que **desenha o circuito** no wafer. Máquinas da **ASML** (origem na Philips), com precisão nanométrica, alinham o wafer em equipamentos que projetam luz ultravioleta através de uma **máscara (retículo)** com o circuito gravado; o fotoresistor reage apenas nos pontos selecionados.

A mesa de posicionamento do wafer pesa cerca de **15 kg** e pode acelerar com força de até **20 G** (cerca de três vezes a aceleração típica de um carro de Fórmula 1), movendo-se com precisão de **nanômetros** para **multi-padrões** — vários retículos em sequência para linhas menores que o permitido por uma única exposição. Qualquer vibração indesejada pode destruir o padrão.

Quando a TSMC ainda fazia parte da Philips, motores lineares **hidráulicos** eram usados: muito precisos, porém com alta manutenção — custo e tempo significativos até soluções mais robustas.

<DiagramFigure src="/pdf-images/p12-1.png" alt="Exposição EUV em wafer ASML">
Exposição EUV em wafer — <a href="https://www.asml.com/" target="_blank" rel="noopener noreferrer">ASML</a> <Cite id="asml-gaa" />.
</DiagramFigure>

<DiagramFigure src="/pdf-images/p13-1.png" alt="Diagrama de posicionamento a laser sobre granito">
*Laser controlled positioning and a solid, vibration-suppressing granite base ensure precise alignment of the exposure chuck.*
</DiagramFigure>

## Como a luz chega ao wafer

O scanner é, no fundo, um **caminho óptico** muito bem controlado. A luz nasce numa fonte (o laser de excímero de **193 nm** no DUV, ou o plasma de estanho de **13,5 nm** no EUV), passa pelo **iluminador**, que dá forma ao feixe e define o modo de iluminação e a dose, atravessa o **retículo** e é reduzida pela **óptica de projeção** até o wafer <Cite id="kato-litho" />.

<DiagramFigure src="/assets/scanner-optical-column.svg" alt="Corte do caminho óptico de um scanner de imersão DUV: fonte, iluminador, retículo, óptica de projeção, água de imersão, wafer e mesa sobre bloco de granito">
O caminho óptico de um scanner de imersão DUV, da fonte ao wafer. Desenho do autor.
</DiagramFigure>

O retículo não tem o padrão em tamanho final: ele é **maior**, e a óptica o **reduz** por um fator fixo (4× nos scanners atuais). Isso existe porque uma máscara com traços de poucos nanômetros não seria fabricável — é mais fácil desenhar grande e reduzir do que desenhar no tamanho do alvo.

Duas peças fora do eixo óptico tornam o desenho possível. A primeira é a **mesa do wafer**, que se move de campo em campo com precisão de nanômetros e por isso é medida continuamente por **interferometria a laser**; a segunda é o **bloco de granito**, sólido e pesado, que absorve a vibração antes que ela chegue ao padrão.

## O fotoresistor

O fotoresistor é um polímero **sensível à luz**: a exposição muda a sua solubilidade, e a revelação transforma essa mudança química em uma máscara física. Em resists **positivos** a região exposta é a que se dissolve; em **negativos**, o oposto.

Os resists modernos são **quimicamente amplificados** (*chemically amplified resist*, CAR): um único fóton gera um catalisador que dispara muitas reações, o que permite expor com doses baixas — e é isso que torna viável a vazão atual. Em troca, o filme fica mais sensível a contaminação e a efeitos de borda.

<DiagramFigure src="/assets/photoresist-spin-coating.jpg" alt="Fotoresistor sendo espalhado por rotação sobre um wafer de silício">
Fotoresistor sendo espalhado por rotação sobre um wafer — <a href="https://commons.wikimedia.org/wiki/File:Photoresist_spin_coating.jpg" target="_blank" rel="noopener noreferrer">Photoresist spin coating</a>, Sei (CC BY-SA 4.0), Wikimedia Commons.
</DiagramFigure>

## Passo a passo do processo

<DiagramFigure src="/assets/lithography-process-steps.svg" alt="Seis etapas da litografia sobre resist positivo: preparo do substrato, revestimento, pré-cozimento, exposição, revelação e transferência de padrão">
As seis etapas do ciclo, do substrato limpo ao padrão gravado. Desenho do autor.
</DiagramFigure>

Executado em sequência, com controle rigoroso de temperatura e contaminantes:

1. **Preparação e limpeza do substrato:** *dehydration bake* (200–400 °C); promotor de adesão **HMDS** (hexametildisilazano) torna a superfície hidrofóbica.
2. **Revestimento (spin coating):** fotoresistor depositado e espalhado por rotação a milhares de RPM, formando filme uniforme micrométrico ou nanométrico.
3. **Pré-cozimento (soft bake):** hotplate 90–100 °C — evapora solventes, estabiliza o filme.
4. **Alinhamento e exposição:** steppers/scanners; retículo de quartzo com cromo; **DUV (193 nm)** ou **EUV (13,5 nm)** altera solubilidade da resina.
5. **Cozimento pós-exposição (PEB):** 100–130 °C — catalisa reações latentes; reduz *standing waves* nas paredes do resiste.
6. **Revelação (development):** TMAH ou poça; em resiste **positivo**, região exposta dissolve; enxágue com DIW e secagem com N₂.
7. **Cozimento final (hard bake):** 120–150 °C — reticulação (*cross-linking*) para resistir a etch e implantação.
8. **Transferência de padrão e stripping:** gravação por **etch** ou **implantação iônica**; remoção do resiste por solventes ou **plasma ashing**.

## Realce de resolução e multi-padrão

Existe um limite físico para o que uma exposição consegue desenhar, e a indústria passou **décadas** contornando-o por software e por processo em vez de trocar a fonte de luz: máscaras de **deslocamento de fase**, iluminação **fora de eixo**, correção óptica de proximidade (**OPC**) e, quando nada disso bastou, **expor mais de uma vez** <Cite id="asianometry-euv" />.

A ideia de **duplicação de linhas** (*line doubling*) é a versão mais direta do multi-padrão: o primeiro padrão é gravado na camada dura, o segundo é exposto no fotoresistor **entre** os traços que já existem e, na gravação seguinte, as duas máscaras se somam — o número de traços dobra sem que nenhuma exposição tenha ficado mais fina.

<DiagramFigure src="/assets/line-doubling.svg" alt="Sequência de duplicação de linhas: segunda exposição entre traços já gravados e gravação da camada com as duas máscaras somadas">
Duplicação de linhas: o padrão final sai da soma de duas exposições — <a href="https://commons.wikimedia.org/wiki/File:Line_doubling.svg" target="_blank" rel="noopener noreferrer">Line doubling</a>, Wdwd (CC BY 3.0), Wikimedia Commons (baseado em Guiding light, en.Wikipedia).
</DiagramFigure>

## Imersão: a água que esticou o 193 nm

O truque que segurou a litografia óptica por mais de uma década foi trocar o **ar** entre a última lente e o wafer por **água purificada**. Como o índice de refração da água é maior que o do ar, o comprimento de onda **efetivo** cai de 193 nm para cerca de **135 nm** — sem trocar óptica, máscara ou fotoresistor <Cite id="asml-immersion" />.

<DiagramFigure src="/assets/immersion-lithography.svg" alt="Comparação entre exposição a seco e exposição com água entre a última lente e o wafer">
A última lente, a água e o wafer na litografia por imersão — <a href="https://commons.wikimedia.org/wiki/File:Immersion_lithography_illustration.svg" target="_blank" rel="noopener noreferrer">Immersion lithography illustration</a>, Oleg Alexandrov (domínio público), Wikimedia Commons.
</DiagramFigure>

O **EUV** segue o caminho oposto. Como **tudo absorve EUV**, ele não usa lentes nem imersão: a luz viaja **refletida por espelhos multicamada**, dentro de vácuo, e a própria máscara é **refletiva** <Cite id="asianometry-euv" />. Por isso o EUV entrou como uma tecnologia paralela, para os nós de **7 nm e abaixo**, e não como substituto do parque de 193 nm por imersão.

A história de como se chegou a essa combinação — as quatro gerações ópticas, os candidatos descartados e a eleição do EUV — está em [História da fotolitografia](/historia-fotolitografia).

<SourceNote :ids="['kato-litho', 'asml-immersion', 'asianometry-euv', 'asml-gaa']" />

## Vídeos

<SourceNote label="Vídeos relacionados" :ids="['asml-gaa']" />

<YouTubeEmbed id="jL7HvnBgrJ4" title="Processo ASML" />

<YouTubeEmbed id="rCwgAGG2sZQ" title="RTX 5090 Chip Deep-Dive" />

<SeeAlso :links="[
  { text: 'História da fotolitografia', href: '/historia-fotolitografia', note: 'do contato ao EUV' },
  { text: 'Fabricação de wafers', href: '/fabricacao-wafers', note: 'superfície pós-CMP exigida para litografia' },
  { text: 'Evolução dos transistores', href: '/transistores', note: 'o que a litografia permitiu construir' },
  { text: 'Glossário', href: '/glossario', note: 'DUV, EUV' },
]" />
