---
title: O elemento silício
description: A ficha do elemento — massa atômica, densidades, gap de banda, isótopos e por que esses números reaparecem em todo o resto do site.
dataAsOf: 2026
---

# O elemento silício

Todos os capítulos deste site tratam do silício como matéria-prima: minério, forno, lingote, wafer, transistor. Esta página faz o caminho inverso e olha para o **átomo** — as constantes que a indústria não escolhe, apenas obedece.

Elas reaparecem em cada etapa da cadeia. O [forno de arco](/mineracao-mg-si) precisa vencer uma ligação forte; o [crescimento do cristal](/fabricacao-wafers) precisa de uma rede que se repete; a [célula solar](/celulas-solares) é limitada por um número que está nesta tabela desde o começo.

## A ficha do elemento

| Grandeza | Valor |
| --- | --- |
| Número atômico | **14** (grupo 14, período 3) |
| Massa atômica padrão | **28,084 a 28,086 u** |
| Ponto de fusão | **1414 °C** |
| Ponto de ebulição | **3265 °C** |
| Densidade do sólido (25 °C) | **2,329 g/cm³** |
| Densidade do fundido | **≈ 2,57 g/cm³** |
| Constante de rede (cúbica de diamante) | **5,431 Å** |
| Gap de banda (300 K) | **1,12 eV**, indireto |
| Constante dielétrica relativa | **11,7** |
| Mobilidade dos elétrons / buracos | **1400 / 450 cm²/V·s** |
| Condutividade térmica | **148 W/(m·K)** |
| Coeficiente de expansão térmica | **2,6 × 10⁻⁶ /K** |
| Concentração intrínseca de portadores (300 K) | **≈ 1 × 10¹⁰ cm⁻³** |

<Cite id="elem-ioffe" /> <Cite id="elem-sze" /> <Cite id="elem-ciaaw" />

Três coisas nessa tabela merecem atenção, e as três têm consequência industrial.

A primeira é a densidade. O silício sólido é **menos denso que o próprio fundido** — 2,33 contra cerca de 2,57 g/cm³. Quase todo material encolhe ao solidificar; o silício **expande**. É por isso que o cristal cresce flutuando sobre o banho no [Czochralski](/fabricacao-wafers), e não afundando nele <Cite id="zulehner-2000" />.

A segunda é a condutividade térmica. **148 W/(m·K)** é um valor de metal, não de isolante, e é uma das razões pelas quais o silício continua sendo o substrato preferido mesmo quando outro material poderia fazer o trabalho elétrico — ele também faz o trabalho de tirar o calor <Cite id="elem-ioffe" />.

A terceira é o gap.

## O gap indireto explica mais do que o solar

O silício tem gap de **1,12 eV**, estreito o suficiente para conduzir quando se quer e largo o suficiente para não conduzir quando não se quer — a razão pela qual ele desbancou o [germânio](/estrutura-wafers), cujo gap é de 0,66 eV <Cite id="elem-sze" />.

O detalhe decisivo, porém, é que esse gap é **indireto**: o mínimo da banda de condução e o máximo da banda de valência não estão no mesmo ponto do espaço de momentos. Absorver ou emitir um fóton exige, então, a ajuda de uma vibração da rede, o que torna os dois processos muito menos prováveis <Cite id="elem-sze" />.

Daí saem duas consequências que aparecem em capítulos separados deste site. A primeira é que **1 µm de arseneto de gálio absorve o que 100 µm de silício absorvem** — o que explica a espessura da lâmina solar e a escolha de materiais de filme fino no capítulo de [células e módulos](/celulas-solares) <Cite id="saimm" />. A segunda é que o silício **não emite luz com eficiência**, o que obriga a fotônica de silício a buscar o laser em outro material, como se discute em [Além do silício](/alem-do-silicio).

<ClientOnly>
  <DataChart chart="band-gap" />
</ClientOnly>

O mapa acima mostra onde o silício cai entre os semicondutores: gap estreito e rede grande, vizinho do germânio.

## Os três isótopos

O silício natural é uma mistura de três isótopos estáveis, e a proporção entre eles é notavelmente constante na Terra <Cite id="elem-ciaaw" />:

| Isótopo | Abundância |
| --- | --- |
| ²⁸Si | **92,19% a 92,32%** |
| ²⁹Si | **4,65% a 4,70%** |
| ³⁰Si | **3,04% a 3,11%** |

A variação é pequena, mas não nula, e é medida com precisão suficiente para virar ferramenta: a razão entre isótopos de silício num sedimento conta a história do clima em que ele se formou <Cite id="elem-ciaaw" />.

Para a indústria, a consequência prática é outra. Os **0,47% de ²⁹Si** não são um detalhe químico: o núcleo do ²⁹Si tem spin, e um spin no silício é um ruído magnético para quem tenta usar o próprio silício como qubit. Purificar o isótopo — não a substância, mas o **isótopo** — é o que torna o silício um material quântico, assunto de [Além do silício](/alem-do-silicio) <Cite id="wbg-si28-qubit" />.

## Por que a indústria usa este elemento

Vale fechar com a pergunta que os capítulos anteriores respondem por partes: por que **este** elemento, e por que ele virou sinônimo de eletrônica e de energia solar ao mesmo tempo?

- Ele é o **segundo mais abundante** da crosta terrestre, o que mantém o insumo barato <Cite id="saimm" />.
- Ele forma um **óxido nativo** estável, isolante e insolúvel em água, que serve de máscara e de dielétrico de porta — o que o germânio não faz <Cite id="ge-vs-si" />.
- E ele tem uma **temperatura de fusão** que a metalurgia comum alcança, 1414 °C, o que permite reduzi-lo em fornos elétricos antes de qualquer química fina <Cite id="saimm" />.

Nenhuma dessas propriedades é a melhor possível isoladamente. É a combinação delas, mais a cadeia industrial construída em volta, que sustenta a posição do silício — a mesma conclusão a que chega o capítulo de [células e módulos solares](/celulas-solares).

<SourceNote :ids="['elem-ioffe', 'elem-sze', 'elem-ciaaw', 'zulehner-2000', 'saimm', 'ge-vs-si', 'wbg-si28-qubit']" />

<SeeAlso :links="[
  { text: 'Estrutura e tipos de wafer', href: '/estrutura-wafers', note: 'a rede cúbica de diamante e a dopagem' },
  { text: 'Além do silício', href: '/alem-do-silicio', note: 'SiC, GaN e as outras funções do silício' },
  { text: 'Células e módulos solares', href: '/celulas-solares', note: 'por que o gap indireto encarece a absorção' },
  { text: 'Referências', href: '/referencias', note: 'lista numerada' },
]" />
