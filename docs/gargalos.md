---
title: O mapa dos gargalos
description: A geografia da cadeia do silício em uma página — quem domina cada etapa, quanta concentração há em cada uma e o que quebraria se ela parasse.
dataAsOf: 2026
---

# O mapa dos gargalos

Este site descreve a cadeia do silício etapa por etapa, e os fatos de geografia ficaram espalhados: o quartzo de [Spruce Pine](/mineracao-mg-si#spruce-pine-onde-o-quartzo-e-puro-o-suficiente), o polissilício [chinês](/polissilicio#a-ascensao-chinesa), os wafers [japoneses](/estrutura-wafers#quem-fabrica-os-wafers), a litografia [única](/historia-fotolitografia). Esta página junta os pedaços numa tabela só e faz a pergunta que eles, separados, não fazem: **o que para o mundo se cada um desses pontos parar?**

A resposta tem um padrão, e o padrão é o argumento do capítulo.

## O mapa

<ClientOnly>
  <DataChart chart="chokepoint-share" />
</ClientOnly>

| Etapa | Quem domina | Concentração | O que quebraria |
| --- | --- | --- | --- |
| Quartzo de alta pureza (HPQ) | Spruce Pine, EUA (Sibelco e The Quartz Corp) | **70 a 90%** do quartzo de alta pureza do mundo | Os cadinhos de [crescimento Czochralski](/fabricacao-wafers) de toda a indústria — e, sem cadinho, não há lingote |
| Silício metalúrgico (MG-Si) | China | **cerca de 70%** da produção mundial (2.300 de 3.300 mil t em 2023) | A carga dos fornos de refino a montante | 
| Polissilício | China | **mais de 90%** do volume global em 2023 | O insumo tanto do wafer quanto da célula solar |
| Wafers de silício | Japão (Shin-Etsu e SUMCO) | **44,1%** para as duas maiores; cinco maiores somam cerca de **três quartos** | A lâmina de partida de toda fab do planeta |
| Litografia EUV | ASML (Holanda) | **fornecedora única** | As camadas críticas dos nós de ponta |
| Neônio grau semicondutor | Ucrânia | **cerca de metade** do neônio mundial e **90%** do grau semicondutor | Os lasers de excímero da [litografia DUV](/fotolitografia) |

<Cite id="sibelco-hpq" /> <Cite id="usgs-mcs" /> <Cite id="bernreuter-market" /> <Cite id="nikkei-wafer-share" /> <Cite id="asml-euv-products" /> <Cite id="fabm-neon-2022" />

O neônio é o caso que ilustra melhor o padrão, porque ele não é um material de silício: é um gás nobre que sobra da separação do ar, purificado em poucas plantas cujos insumos vêm, em boa parte, da siderurgia russa. Quando a invasão da Ucrânia interrompeu essas plantas em 2022, a indústria descobriu que dependia de um subproduto que ninguém acompanhava — e passou a projetar recuperação e reciclagem de neônio dentro da própria fab <Cite id="fabm-neon-2017" />. É exatamente o mesmo formato do gargalo de Spruce Pine: **um insumo barato, pouco visível e insubstituível a curto prazo**.

## O dinheiro da política

Gargalos visíveis geram política industrial, e os valores envolvidos são a medida do quanto cada governo levou o risco a sério.

- **Estados Unidos.** O *CHIPS and Science Act*, de 2022, destinou **US$ 50 bilhões** ao Departamento de Comércio, divididos em **US$ 39 bilhões** de incentivos à fabricação e **US$ 11 bilhões** para P&D <Cite id="choke-nist-chips" />. O número de manchete, **US$ 52,7 bilhões**, inclui itens que ficam fora desse envelope — vale saber qual dos dois está sendo citado.
- **União Europeia.** O *European Chips Act* entrou em vigor em **21 de setembro de 2023** e, por sua via de auxílios estatais, a Comissão já aprovou **18 decisões** que somam **mais de EUR 32 bilhões** de investimento público e privado. Uma segunda rodada, o **Chips Act 2.0**, foi proposta em **junho de 2026** <Cite id="choke-eu-chips-act" />.
- **China.** O fundo estatal conhecido como *Big Fund* já teve três fases, e a terceira foi lançada em **2024** com porte comparável ao de um programa nacional <Cite id="choke-big-fund" />.

O que esses programas compram é **capacidade**, não autossuficiência. Uma planta nova de wafer leva anos para ser qualificada, e a qualificação de um fornecedor por uma fab é, como este site já registrou, um processo de anos <Cite id="nikkei-wafer-share" />.

## O controle de exportação é um gargalo de projeto

Há uma segunda categoria de gargalo, mais recente: aquele que não é criado pela geologia nem pela economia, e sim por **regra**. Estados Unidos, Holanda e Japão alinharam restrições à exportação de equipamento avançado de litografia — precisamente a etapa em que existe um fornecedor único <Cite id="choke-cset-controls" />.

O ponto técnico é que esse gargalo **não se contorna comprando de outro**. Uma fab não substitui um scanner EUV por dois scanners DUV sem refazer o processo: cada máquina é qualificada dentro de uma receita específica. A restrição comercial funciona, portanto, com a mesma força de um monopólio mineral — só que reversível por decisão política, o que é uma diferença importante.

## Por que a concentração não é acidente

Vale nomear o mecanismo, porque a intuição sugere o contrário: mercados grandes deveriam ter muitos fornecedores.

- **Capacidade ociosa é caríssima.** Uma planta de polissilício ou de wafer custa bilhões e precisa rodar cheia. Dois fornecedores dividindo um mercado do mesmo tamanho ficam os dois abaixo do ponto de equilíbrio — é mais estável que haja um.
- **Qualificação é um ativo.** Trocar de fornecedor de material exige requalificar o processo. Isso prende o cliente e desestimula o entrante, como se discute em [insumos da fab](/insumos-fab).
- **O risco é correlacionado.** Quando cada etapa tem um fornecedor, o risco de cada etapa não se diversifica: ele se soma. É o argumento que a própria [fabricação de wafers](/estrutura-wafers#quem-fabrica-os-wafers) já faz sobre o Japão, e que a [história da litografia](/historia-fotolitografia) faz sobre o consórcio que apostou no EUV quando a lista de candidatos tinha seis nomes.

A conclusão não é que a cadeia seja frágil por descuido. É que ela foi **otimizada para custo** durante décadas, e a concentração é o resultado dessa otimização. O preço da eficiência é a ausência de plano B.

<SourceNote :ids="['sibelco-hpq', 'usgs-mcs', 'bernreuter-market', 'nikkei-wafer-share', 'asml-euv-products', 'fabm-neon-2022', 'fabm-neon-2017', 'choke-nist-chips', 'choke-eu-chips-act', 'choke-big-fund', 'choke-cset-controls']" />

<SeeAlso :links="[
  { text: 'Preços e valor', href: '/precos-e-valor', note: 'onde o dinheiro está na cadeia' },
  { text: 'Os insumos da fab', href: '/insumos-fab', note: 'os materiais por trás das etapas' },
  { text: 'Mineração e MG-Si', href: '/mineracao-mg-si', note: 'Spruce Pine em detalhe' },
  { text: 'Referências', href: '/referencias', note: 'lista numerada' },
]" />
