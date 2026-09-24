---
title: Dados e números
description: As séries do site em gráfico e em arquivo — contagem de transistores, modelo de rendimento e o selo de atualidade de cada capítulo.
dataAsOf: 2026
---

# Dados e números

Este site tem uma regra que vem desde a primeira linha: **um número sem fonte não entra no texto**. As tabelas trazem o marcador `[n]` que aponta para a [lista de referências](/referencias), e cada página fecha com as fontes que usou.

Esta página é o outro lado dessa regra: reunir as **séries** que sustentam os capítulos em um lugar só, com o gráfico interativo e o arquivo de dados correspondente, para que qualquer leitor possa refazer a conta em vez de aceitar a conclusão.

## Transistores por chip

A curva mais citada da indústria é também a mais difícil de atribuir, porque nenhuma fonte primária tabula contagens de transistores atravessando cinco décadas e vários fabricantes. A série abaixo é uma **compilação**, e a tabela nomeia cada produto para que a origem de cada ponto seja rastreável <Cite id="dados-transistor-count" />.

<ClientOnly>
  <DataChart chart="transistor-count" />
</ClientOnly>

| Ano | Produto | Transistores | Fonte |
| --- | --- | --- | --- |
| 1971 | Intel 4004 | **2.300** | <Cite id="intel-4004" /> |
| 1978 | Intel 8086 | **29.000** | <Cite id="dados-transistor-count" /> |
| 1985 | Intel 80386 | **275.000** | <Cite id="dados-transistor-count" /> |
| 1993 | Intel Pentium | **3,1 milhões** | <Cite id="dados-transistor-count" /> |
| 2000 | Pentium 4 | **42 milhões** | <Cite id="dados-transistor-count" /> |
| 2006 | Core 2 Duo | **291 milhões** | <Cite id="dados-transistor-count" /> |
| 2013 | Apple A7 | **1 bilhão** | <Cite id="dados-transistor-count" /> |
| 2020 | Apple M1 | **16 bilhões** | <Cite id="dados-transistor-count" /> |
| 2024 | Apple M4 | **28 bilhões** | <Cite id="dados-transistor-count" /> |

A leitura da série é mais interessante na escala **logarítmica**, que o botão acima alterna: em escala linear, as últimas duas linhas achatam todo o resto, e a impressão de continuidade da lei de Moore desaparece. O que a curva log mostra é uma reta — crescimento **exponencial** com tempo de duplicação de poucos anos — e é essa regularidade, não o valor absoluto, que a indústria perseguiu por décadas.

## Rendimento contra área

O segundo gráfico não é uma medição: é o **modelo de Poisson** do rendimento, calculado a partir da equação que o capítulo de [na fab](/na-fab) apresenta, para cinco densidades de defeitos <Cite id="leachman-yield" />.

<ClientOnly>
  <DataChart chart="yield-vs-area" />
</ClientOnly>

Vale olhar a inclinação antes dos valores. Dobrar a área de um die derruba o rendimento **mais que pela metade**, e a perda cresce com a densidade de defeitos — é o motivo econômico pelo qual dies muito grandes são raros e pelos quais a indústria foi para [chiplets](/empacotamento#chiplets-dividir-para-render) em vez de continuar aumentando o monolito. O modelo de Poisson é otimista para áreas grandes, como o próprio capítulo registra, e a correção que a indústria usa é a distribuição binomial negativa <Cite id="murphy-1964" />.

## As séries em arquivo

Cada gráfico do site existe também como arquivo de dados, gerado a partir da **mesma definição** que o desenha — não de uma planilha paralela que envelheceria sozinha:

- [Contagem de transistores](/data/transistor-count.csv)
- [Rendimento contra área](/data/yield-vs-area.csv)
- [Gap de banda × constante de rede](/data/band-gap.csv)
- [Concentração por etapa](/data/chokepoint-share.csv)
- [Eficiência fotovoltaica](/data/pv-efficiency.csv)
- [Curva da banheira](/data/bathtub.csv)

O script `scripts/export-chart-data.ts` reescreve todos eles a partir de `docs/.vitepress/theme/charts/specs.ts`, então o gráfico e o CSV não podem divergir.

## O selo de atualidade

Nem todo capítulo é igualmente recente, e até agora o leitor não tinha como saber. O capítulo de [células e módulos solares](/celulas-solares) usava, para a escala e o custo do setor, números de **2011** — que o próprio texto admite estarem defasados —, enquanto [estrutura e tipos](/estrutura-wafers) cita dados do ano corrente.

Por isso cada capítulo declara, abaixo do título, o **ano do dado mais recente que cita**. É uma informação de leitura, não de validade: um número de 2011 pode continuar sendo a melhor referência para o que ele descreve, mas o leitor tem o direito de saber que está lendo 2011.

<SourceNote :ids="['dados-transistor-count', 'intel-4004', 'leachman-yield', 'murphy-1964']" />

<SeeAlso :links="[
  { text: 'Na fab', href: '/na-fab', note: 'de onde sai a equação do rendimento' },
  { text: 'Preços e valor', href: '/precos-e-valor', note: 'os degraus de preço da cadeia' },
  { text: 'Referências', href: '/referencias', note: 'a lista completa de fontes' },
]" />
