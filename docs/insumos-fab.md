---
title: Os insumos da fab
description: O que uma fábrica de semicondutores consome além do silício — fotorresiste, máscara, slurry, gases e água ultrapura — e por que essa lista é um gargalo tão silencioso quanto o quartzo.
dataAsOf: 2026
---

# Os insumos da fab

O wafer é o protagonista deste site: ele percorre a [fábrica](/na-fab), recebe camadas, é exposto na [litografia](/fotolitografia) e sai como chip. Mas nenhuma dessas etapas acontece no vácuo de material — a fab consome, a cada wafer, um conjunto de químicos e gases cuja cadeia de fornecimento tem exatamente o mesmo formato do gargalo de Spruce Pine descrito em [mineração e MG-Si](/mineracao-mg-si).

Esta página trata dos insumos que não são silício, mas que decidem se o silício vira produto.

## O fotorresiste: amplificação química

O insumo mais característico da litografia é o **fotorresiste**, e a invenção que o transformou veio de Hiroshi Ito e C. Grant Willson, no início dos anos 1980: em vez de cada fóton provocar uma única reação na molécula de resiste, eles desenharam um sistema em que o fóton gera um **catalisador ácido**, que por sua vez desencadeia centenas de reações em cascata na etapa de revelação <Cite id="fabm-ito-1983" />.

É esse princípio, a **amplificação química**, que permite usar doses de luz baixas o bastante para expor rápido e traços finos o bastante para os nós seguintes. Sem ele, cada redução de comprimento de onda exigiria uma dose maior — e a litografia teria esbarrado em produtividade muito antes do que esbarrou.

No **EUV** o compromisso volta pela espessura. Como o ultravioleta extremo é absorvido por quase tudo, o resiste precisa ser **mais fino** que nas gerações anteriores para que a luz o atravesse e chegue ao filme a ser gravado <Cite id="asianometry-euv" />. Um resiste fino protege menos o substrato durante a corrosão — o que empurra o problema para o próximo passo do fluxo.

## A máscara, que também é óptica

No DUV a máscara é uma placa de quartzo com cromo: luz atravessa onde há desenho. No EUV isso deixa de funcionar, porque não existe material transparente a 13,5 nm, e a máscara passa a ser um **espelho multicamada**, do mesmo tipo dos espelhos do scanner <Cite id="asianometry-euv" />.

Isso muda a natureza do defeito. Um defeito enterrado na multicamada de uma máscara não pode ser corrigido depois de pronto: ele se replica em cada wafer exposto com aquela máscara, e o blank precisa chegar **livre de defeitos** para que a máscara seja utilizável <Cite id="asianometry-euv" />. É a mesma lógica dos insumos de quartzo: **a qualidade tem de estar no material de entrada**, porque a etapa seguinte não conserta.

## O slurry do CMP

A [planarização químico-mecânica](/fabricacao-wafers#polimento-quimico-mecanico-cmp) parece um polimento, e é — mas com química envolvida. O **slurry** é uma suspensão de partículas abrasivas em uma solução que ataca quimicamente a superfície, de modo que o material é primeiro enfraquecido por reação e depois removido mecanicamente <Cite id="runnels-1994" />.

A consequência de projeto é que o slurry é **específico de cada material**: o que remove óxido sem arranhar cobre, e vice-versa, são formulações diferentes. A história do processo, com a troca de abrasivos e a passagem do alumínio ao cobre, está em [na fab](/na-fab) <Cite id="cmp-history" />.

## Gases e o neônio

Excimer lasers da litografia DUV precisam de **neônio** na mistura gasosa, e a recuperação desse gás virou projeto de engenharia dentro da fábrica à medida que o custo dele subiu <Cite id="fabm-neon-2017" />.

O episódio que expôs a dependência foi a invasão da Ucrânia em 2022. O país respondia por **cerca de metade** do neônio mundial e por **90%** do neônio de grau semicondutor, produzido como subproduto da siderurgia — e a interrupção das plantas de purificação transformou um gás que ninguém acompanhava num item de risco de cadeia <Cite id="fabm-neon-2022" />.

Vale reter o formato, porque ele se repete: **insumo barato, pouco visível, insubstituível no curto prazo e produzido como subproduto de outra indústria**. É o mesmo desenho do quartzo de Spruce Pine e da participação chinesa no polissilício, tratados em [o mapa dos gargalos](/gargalos).

## Água ultrapura

A água é, em volume, o insumo mais íntimo de uma fab — e o mais fácil de subestimar, porque "água" sugere um recurso qualquer. A água que entra em contato com o wafer é **ultrapura** (UPW): resistividade da ordem de **18,2 MΩ·cm** a 25 °C e carbono orgânico total na casa das **partes por trilhão** <Cite id="fabm-upw" />.

A razão dos limites é a escala em que a fab trabalha. Íons dissolvidos são, literalmente, **dopantes** — sódio e potássio no nível de ppb já alteram a tensão de limiar de um transistor —, e matéria orgânica vira defeito na superfície onde a próxima camada precisa crescer. O resultado é que a água é produzida e purificada **no próprio site**, com a resistividade medida em linha, porque uma especificação dessas não sobrevive ao transporte.

## Por que essa lista é um gargalo

Nenhum dos insumos desta página é caro por unidade. Todos são difíceis de substituir.

O motivo é o mesmo que aparece em [o mapa dos gargalos](/gargalos): trocar um fornecedor de material exige **requalificar o processo inteiro**, e um resiste ou um slurry novos significam semanas de receita nova, com rendimento incerto, numa linha que custa por hora. O comprador tem, portanto, um incentivo estrutural para não trocar — e o fornecedor, para continuar sendo o único que sabe formular aquele produto.

<SourceNote :ids="['fabm-ito-1983', 'asianometry-euv', 'runnels-1994', 'cmp-history', 'fabm-neon-2017', 'fabm-neon-2022', 'fabm-upw']" />

<SeeAlso :links="[
  { text: 'O mapa dos gargalos', href: '/gargalos', note: 'a concentração de cada etapa' },
  { text: 'Na fab', href: '/na-fab', note: 'onde cada insumo entra no fluxo' },
  { text: 'Fabricação de wafers', href: '/fabricacao-wafers', note: 'o cadinho e o CMP' },
  { text: 'Referências', href: '/referencias', note: 'lista numerada' },
]" />
