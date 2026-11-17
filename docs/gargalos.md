---
title: O mapa dos gargalos
description: "A geografia da cadeia do silício em uma página: quem domina cada etapa, quanta concentração há em cada uma e o que quebraria se ela parasse."
dataAsOf: 2026
---

# O mapa dos gargalos

Este site descreve a cadeia do silício etapa por etapa, e os fatos de geografia ficaram espalhados: o quartzo de [Spruce Pine](/mineracao-mg-si#spruce-pine), o polissilício [chinês](/polissilicio#a-ascensao-chinesa), os wafers [japoneses](/estrutura-wafers#quem-fabrica-os-wafers), a litografia [única](/historia-fotolitografia). Esta página junta os pedaços numa tabela só e faz a pergunta que eles, separados, não fazem: o que para o mundo se cada um desses pontos parar?

A página percorre quatro pontos:

1. [O mapa](#o-mapa): quem domina cada etapa e quão concentrada ela é.
2. [O dinheiro da política](#o-dinheiro-da-politica): o que EUA, UE e China comprometeram em resposta.
3. [O controle de exportação](#o-controle-de-exportacao-e-um-gargalo-de-projeto): o gargalo criado por regra.
4. [Por que a concentração não é acidente](#por-que-a-concentracao-nao-e-acidente): as forças que mantêm cada etapa em poucas mãos.

As seções seguem essa ordem.

## O mapa

<ClientOnly>
  <DataChart chart="chokepoint-share" />
</ClientOnly>

<ClientOnly>
  <ChokepointMap />
</ClientOnly>

O neônio é o caso que ilustra melhor o padrão, porque ele não é um material de silício: é um gás nobre que sobra da separação do ar, purificado em poucas plantas cujos insumos vêm, em boa parte, da siderurgia russa. Quando a invasão da Ucrânia interrompeu essas plantas em 2022, a indústria descobriu que dependia de um subproduto que ninguém acompanhava, e passou a projetar recuperação e reciclagem de neônio dentro da própria fab <Cite id="fabm-neon-2017" />. É o mesmo padrão do gargalo de Spruce Pine: um insumo barato, pouco visível e insubstituível a curto prazo.

O encapsulamento, a última etapa antes de o chip ser vendido, também é concentrado. Em 2020, quatro das seis empresas de encapsulamento avançado com participação citada estavam em Taiwan, e as empresas taiwanesas detinham quase metade da capacidade mundial de encapsulamento avançado <Cite id="cset-packaging" />.

<ClientOnly>
  <DataChart chart="advanced-packaging-share" />
</ClientOnly>

## O dinheiro da política

Gargalos visíveis geram política industrial, e os valores envolvidos são a medida do quanto cada governo levou o risco a sério.

| Programa | Instrumento | Valor | Data | Fonte |
| --- | --- | --- | --- | --- |
| Estados Unidos | *CHIPS and Science Act* | **US\$ 50 bilhões** ao Departamento de Comércio, em **US\$ 39 bilhões** de incentivos à fabricação e **US\$ 11 bilhões** para pesquisa e desenvolvimento (P&D) <Cite id="choke-nist-chips" /> | 2022 | NIST (CHIPS) |
| União Europeia | *European Chips Act* | **mais de EUR 32 bilhões** em **18 decisões** de auxílio estatal, de investimento público e privado <Cite id="choke-eu-chips-act" /> | em vigor em **21 de setembro de 2023**; o *Chips Act 2.0* foi proposto em **junho de 2026** | Comissão Europeia |
| China | *Big Fund* | três fases de capital registrado: **138,7 bilhões de yuans** (2014), **204 bilhões** (2019) e **344 bilhões**, cerca de **US\$ 47,5 bilhões** (2024) <Cite id="choke-big-fund" /> | terceira fase criada em **maio de 2024** | Reuters |

::: warning
A cifra que virou manchete, US\$ 52,7 bilhões, soma também programas fora do envelope do Departamento de Comércio acima.
:::

O que esses programas compram é **capacidade**, não autossuficiência. Uma planta nova de wafer leva anos para ser qualificada, e a qualificação de um fornecedor por uma fab é, como este site já registrou, um processo de anos <Cite id="nikkei-wafer-share" />.

## O controle de exportação é um gargalo de projeto

Há uma segunda categoria de gargalo, mais recente: o criado por regra. Estados Unidos, Holanda e Japão alinharam restrições à exportação de equipamento avançado de litografia, precisamente a etapa em que existe um fornecedor único <Cite id="choke-cset-controls" />.

O ponto técnico é que esse gargalo não se resolve comprando de outro fornecedor. Uma fab não substitui um scanner EUV por dois scanners DUV sem refazer o processo: cada máquina é qualificada dentro de uma receita específica. A restrição comercial funciona, portanto, com a mesma força de um monopólio mineral, mas uma decisão política pode revertê-la.

## Por que a concentração não é acidente

Mercados grandes deveriam ter muitos fornecedores. Três forças empurram na direção oposta.

- **Capacidade ociosa é caríssima.** Uma planta de polissilício ou de wafer custa bilhões e precisa rodar cheia. Dois fornecedores dividindo um mercado do mesmo tamanho ficam os dois abaixo do ponto de equilíbrio: é mais estável que haja um.
- **Qualificação é um ativo.** Trocar de fornecedor de material exige requalificar o processo. Isso prende o cliente e desestimula o entrante, como se discute em [insumos da fab](/insumos-fab).
- **O risco é correlacionado.** Quando cada etapa tem um fornecedor, o risco de cada etapa não se diversifica: ele se soma. É o argumento que a própria [fabricação de wafers](/estrutura-wafers#quem-fabrica-os-wafers) já faz sobre o Japão, e que a [história da litografia](/historia-fotolitografia) faz sobre o consórcio que apostou no EUV quando a lista de candidatos tinha seis nomes.

A cadeia foi otimizada para custo durante décadas, e a concentração é o resultado dessa otimização. O preço da eficiência é a ausência de plano B.

<SourceNote :ids="['construction-physics-spruce-pine', 'usgs-mcs-2026', 'bernreuter-market', 'nikkei-wafer-share', 'asml-euv-products', 'usitc-neon-2022', 'fabm-neon-2017', 'choke-nist-chips', 'choke-eu-chips-act', 'choke-big-fund', 'choke-cset-controls', 'cset-packaging']" />

<SeeAlso :links="[
  { text: 'Preços e valor', href: '/precos-e-valor', note: 'onde o dinheiro está na cadeia' },
  { text: 'Os insumos da fab', href: '/insumos-fab', note: 'os materiais por trás das etapas' },
  { text: 'Mineração e MG-Si', href: '/mineracao-mg-si', note: 'Spruce Pine em detalhe' },
  { text: 'Dados e números', href: '/dados', note: 'as séries em gráfico e em CSV' },
  { text: 'Referências', href: '/referencias', note: 'lista numerada' },
]" />
