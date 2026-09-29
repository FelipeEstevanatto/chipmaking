---
title: Introdução
description: Produção de silício metálico (USGS), o quartzo como matéria-prima, e por que células solares e chips exigem purezas diferentes.
dataAsOf: 2025
---

# Introdução

<DiagramFigure src="/pdf-images/p01-1.jpeg" alt="Silício metálico cristalino">
Amostra de silício metalúrgico, o produto industrial que depois vira wafers para células solares e chips.
</DiagramFigure>

A fabricação de wafers de silício em quantidade e qualidade é o principal fator determinante para o preço de painéis solares, e essencial para a produção de chips de computadores. Porém a pureza necessária do material para esses dois setores é completamente diferente, e segundo a edição de 2026 do *Mineral Commodity Summaries* do Serviço Geológico dos Estados Unidos (USGS) <Cite id="usgs-mcs-2026" />, a China respondeu por quase 80% da produção mundial estimada de materiais de silício (silício metálico e ferrossilício) em 2025.

## Produção estimada {#producao-estimada}

Milhares de toneladas de **silício metálico** (não confundir com polissilício de grau eletrônico) e de **ferrossilício**, a partir das edições de 2024 a 2026 do USGS:

<UsgsProductionTable />

O USGS publica silício metálico e ferrossilício separadamente desde a edição de 2024, que publica 2022; as edições de 2020 a 2023 somavam os dois produtos em uma única série, em teor de silício, e é por isso que a tabela começa em 2022. Cada edição revisa os anos anteriores, então parte da variação entre as colunas é revisão, não produção. Cada coluna traz a estimativa mais recente para o ano: 2022 na edição de 2024 <Cite id="usgs-mcs-2024" />, 2023 na de 2025 <Cite id="usgs-mcs-2025" />, e 2024 e 2025 na de 2026 <Cite id="usgs-mcs-2026" />. Os Estados Unidos aparecem como *W* (dado retido) nas três edições, e o total mundial exclui a produção americana.

<SourceNote :ids="['usgs-mcs-2024', 'usgs-mcs-2025', 'usgs-mcs-2026']" />

### Gráfico interativo

<ClientOnly>
  <UsgsProductionChart />
</ClientOnly>

<SourceNote label="Dados do gráfico" :ids="['usgs-mcs-2024', 'usgs-mcs-2025', 'usgs-mcs-2026']" />

O silício é o segundo material mais abundante na crosta terrestre (27%) e pode ser minerado de diversas fontes, sendo encontrado como óxido (sílica) e silicatos: areia, quartzo, ametista, ágata e sílex. A maneira mais eficiente vem da mineração e incineração do quartzo, que é dióxido de silício (SiO₂).

<SeeAlso :links="[
  { text: 'Mineração e MG-Si', href: '/mineracao-mg-si', note: 'primeiro passo industrial após o quartzo' },
  { text: 'Glossário', href: '/glossario', note: 'diferença entre MG-Si, polissilício e EG-Si' },
  { text: 'Referências', href: '/referencias', note: 'lista completa de fontes' },
]" />
