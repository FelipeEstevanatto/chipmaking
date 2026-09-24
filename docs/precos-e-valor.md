---
title: Preços e valor
description: A escada de preços do silício — de dólares por quilo no MG-Si à fração de valor de um chip pronto — e o degrau que a indústria não publica.
dataAsOf: 2026
---

# Preços e valor

Os capítulos anteriores contam o silício em quilos, graus de pureza e nanômetros. Esta página conta a mesma cadeia em **dinheiro**, porque é o preço que decide onde cada etapa é feita, quem sobrevive a uma queda e por que a concentração geográfica de que trata o [mapa dos gargalos](/gargalos) existe.

O exercício tem uma virtude e um limite. A virtude é que o preço é o resumo mais honesto de uma cadeia industrial: ele já embutiu energia, rendimento, capital e risco. O limite é que nem todos os degraus são públicos — e vale dizer **quais** não são, em vez de preencher a lacuna com um número redondo.

## A escada

| Degrau | Unidade | Ordem de grandeza | Fonte |
| --- | --- | --- | --- |
| Silício metalúrgico (MG-Si) | US$/kg | **poucos dólares**, conforme qualidade e granulometria | <Cite id="saimm" /> |
| Polissilício — fundo do ciclo | US$/kg | **6,75** (junho de 2020, preço à vista) | <Cite id="bernreuter-pork-cycle" /> |
| Polissilício — pico do ciclo | US$/kg | **39** (agosto de 2022) | <Cite id="bernreuter-pork-cycle" /> |
| Célula solar | US$/Wp | **≈ 1** (2011) | <Cite id="saimm" /> |
| Módulo solar | US$/Wp | **≈ 2** de silício cristalino (2011); **¥ 0,70/W** em 2025 | <Cite id="saimm" /> <Cite id="trendforce-2025" /> |
| Teste do circuito integrado | % da receita | **menos de 2 a 3%** | <Cite id="itrs-2015-test" /> |
| Montagem, teste e empacotamento | % do valor do chip pronto | **cerca de 10%** (SIA/BCG estima **6%**) | <Cite id="cset-packaging" /> |
| Projeto + fabricação de front-end | % do valor do chip pronto | **cerca de 45%** | <Cite id="cset-packaging" /> |

Duas leituras dessa tabela merecem destaque.

A primeira é a **queda de massa**. Um quilo de silício metalúrgico vira menos de um quilo de polissilício, que vira uma lâmina de algumas centenas de gramas, que vira um chip de alguns gramas. A massa encolhe a cada degrau; o preço **por unidade de massa** sobe em ordens de grandeza.

A segunda é que a maior parte do valor **não está no material**. Projeto e front-end somam cerca de 45% do valor de um chip pronto, enquanto a etapa de montagem e teste — a que o site trata em [empacotamento](/empacotamento) — fica perto de 10%, e o próprio material semicondutor é uma fração menor ainda <Cite id="cset-packaging" />.

## O degrau de commodity

O polissilício é o degrau da cadeia em que o preço se comporta como commodity, e por isso é o único em que se observa o ciclo inteiro em números públicos: **6,75 US$/kg** no fundo histórico de junho de 2020 e **39 US$/kg** em agosto de 2022, com a subida completa em cerca de dois anos <Cite id="bernreuter-pork-cycle" />.

Esse intervalo — quase **6×** entre vale e pico — é o que decidiu quem construiu planta nova e quem fechou. A dinâmica do *pork cycle* e a lista de empresas que saíram do mercado estão no capítulo de [polissilício](/polissilicio).

Do outro lado da cadeia, o preço do módulo desceu por um motivo diferente: escala e eficiência, com o custo caindo uma fração fixa a cada duplicação da produção acumulada <Cite id="fraunhofer-pv-report" />. É a mesma física que fez a célula sair de cerca de **1 US$/Wp** em 2011 para um módulo em torno de **¥ 0,70/W** em 2025 <Cite id="saimm" /> <Cite id="trendforce-2025" />.

## O degrau que não se publica

Falta na tabela o degrau mais interessante para quem quer entender o custo real de um chip: o **preço do wafer** e, sobretudo, o preço do wafer **processado** num nó de ponta.

Ele não aparece aqui porque não é publicado de forma comparável. Contratos de fornecimento de wafer são negociados caso a caso e cobertos por confidencialidade, de modo que os números que circulam em apresentações raramente têm uma fonte primária que os sustente — o mesmo problema que este site já registrou ao tratar da participação de mercado dos fabricantes de wafer em [estrutura e tipos](/estrutura-wafers#quem-fabrica-os-wafers), onde a cifra redonda de "60%" não sobreviveu aos dados.

A consequência prática é uma regra de leitura: **quando um degrau é apresentado como um número fechado, vale perguntar de onde ele veio**. Onde há índice público — como o preço de contrato de polissilício — a série é auditável; onde não há, o que existe é estimativa de consultoria.

## Do quilo ao milímetro quadrado

A unidade final da cadeia não é massa nem área: é o **custo por porta lógica**, ou por transistor. É ela que decide se vale encolher.

O capítulo de [evolução dos transistores](/transistores) mostra que o "número do nó" deixou de medir uma dimensão física — hoje é nome de geração, não medida <Cite id="ieee-node" />. O preço seguiu o mesmo caminho: como a densidade já não dobra a cada geração, o custo por transistor passou a depender de quantas funções cabem no mesmo passo de metal, e não do rótulo do processo.

É por isso que o valor da cadeia migrou para os extremos — o **projeto**, que decide a arquitetura, e a **ferramenta**, que decide o que é possível fabricar. Os dois são o assunto do [mapa dos gargalos](/gargalos).

<SourceNote :ids="['saimm', 'bernreuter-pork-cycle', 'trendforce-2025', 'itrs-2015-test', 'cset-packaging', 'fraunhofer-pv-report', 'ieee-node']" />

<SeeAlso :links="[
  { text: 'Polissilício', href: '/polissilicio', note: 'o ciclo de preço e a ascensão chinesa' },
  { text: 'O mapa dos gargalos', href: '/gargalos', note: 'onde o valor está concentrado' },
  { text: 'Dados e números', href: '/dados', note: 'as séries em gráfico e em CSV' },
  { text: 'Referências', href: '/referencias', note: 'lista numerada' },
]" />
