---
title: Mineração e MG-Si
description: Quartzo HPQ, forno de arco submerso, redução carbotérmica e obtenção de silício metalúrgico (MG-Si).
---

# Mineração e produção de silício metalúrgico

## Mineração de quartzo (HPQ)

O primeiro passo na cadeia de produção do silício é a obtenção de **Quartzo de Alta Pureza (HPQ)**, extraído de depósitos de quartzito ou quartzo mineral, extremamente abundante na crosta terrestre <Cite id="pv-education" />. O silício é o **segundo elemento mais abundante** da crosta, atrás apenas do oxigênio, e ocorre como sílica praticamente pura ou como silicatos; os recursos são, na prática, **ilimitados** — embora a pureza varie consideravelmente de depósito para depósito <Cite id="saimm" />. Na década de 1970, essa mineração era altamente seletiva, focando em pegmatitos em regiões como o Brasil e Madagascar para garantir que as amostras fossem livres de impurezas críticas como ferro e boro <Cite id="sciencedirect-hpq" />. Atualmente, mineradoras como a COVIA (Carolina do Norte, EUA) e a Quartz Corp (Noruega) realizam a extração de quartzo em larga escala, já que o processo subsequente de purificação física e química consegue elevar a pureza do material a níveis aceitáveis <Cite id="sciencedirect-hpq" />.

## Redução carbotérmica (MG-Si)

Para extrair o silício metálico a partir do quartzo (dióxido de silício, SiO₂), o mineral é submetido à **redução carbotérmica** <Cite id="elkem" />. Esse processo ocorre em fornos elétricos de arco submerso a temperaturas de aproximadamente 2000 °C, consumindo altos níveis de energia <Cite id="csiro" />.

O quartzo é misturado a agentes redutores ricos em carbono (carvão vegetal, coque, carvão mineral e lascas de madeira) <Cite id="saimm" />. A reação geral simplificada do processo é expressa por:

```text
SiO₂ (s) + 2C (s) → Si (l) + 2CO (g)
```

Dentro do forno, a reação real ocorre em etapas térmicas distintas <Cite id="pv-education" />:

1. **Região superior** (temperaturas menores, ~1600 °C): o quartzo reage com o carbono para formar carbeto de silício (SiC):

   ```text
   SiO₂ + 3C → SiC + 2CO (g)
   ```

2. **Região inferior** (temperaturas maiores, >1780 °C): o carbeto de silício desce e reage com o quartzo restante para gerar silício metálico puro e monóxido de carbono gasoso:

   ```text
   SiO₂ + 2SiC → 3Si + 2CO (g)
   ```

Uma terceira reação fecha o ciclo do forno <Cite id="pv-mfg-polysilicon" />:

```text
2SiO₂ + SiC → 3SiO (g) + CO (g)
```

O **monóxido de silício** (SiO) e o CO sobem pelas zonas frias da carga e recombinam-se, regenerando SiO₂ e carbono que voltam a alimentar o topo do forno. Por isso o forno é praticamente **autossuficiente em reagentes**: ele é um grande consumidor de energia elétrica, mas desperdiça pouca matéria-prima <Cite id="pv-mfg-polysilicon" />.

### O forno de arco submerso

<DiagramFigure src="/assets/submerged-arc-furnace.svg" alt="Corte esquemático de um forno elétrico de arco submerso: três eletrodos de carbono mergulhados na carga, zona de reação externa sólida sobre a zona de reação interna fundida, gás de exaustão recolhido como fume de sílica e vazamento do silício pelo fundo">
Corte de um forno de arco submerso: as duas zonas de reação, os três eletrodos trifásicos, a saída de gás e o vazamento pelo fundo.
</DiagramFigure>

A geometria do forno é simples e brutal: um invólucro com cerca de **10 m de diâmetro**, atravessado por **três eletrodos de carbono pré-cozido** mergulhados na carga, que conduzem **corrente trifásica** e levam o material a aproximadamente 2000 °C <Cite id="saimm" />.

O desenho térmico é intencional. Mantém-se uma camada de material sólido (a **zona de reação externa**) sobre o banho fundido (a **zona de reação interna**) justamente para **maximizar o rendimento de silício**: é nessa interface que o SiO gerado consegue voltar a reagir antes de escapar com o gás <Cite id="saimm" />.

O silício é então **vazado por um furo no fundo** do forno e refinado por tratamento com escória ou purga de gás, que removem inclusões e ajustam a composição ao valor especificado. Depois o metal é deixado solidificar em molde e é britado no tamanho pedido <Cite id="saimm" />.

O MG-Si resultante tem especificação típica de **98,5% a 99,5% de Si**, com carbono, metais alcalinoterrosos e de transição, boro e fósforo entre as impurezas características <Cite id="saimm" />. Essas impurezas viajam com o material até a purificação química, descrita em [Polissilício](/polissilicio).

### Fume de sílica e energia do gás

Nem tudo que entra no forno sai como silício. Cada tonelada de silício metálico produz de **0,2 a 0,4 tonelada de fume de sílica condensada**, uma poeira ultrafina arrastada pelo gás e recolhida na casa de filtros <Cite id="saimm" />. Longe de ser rejeito, o fume de sílica encontrou aplicações industriais amplas <Cite id="saimm" />.

O gás de exaustão é o outro subproduto relevante, e seu conteúdo energético é da **mesma ordem de grandeza** da energia elétrica injetada no forno <Cite id="saimm" />. Por isso ele costuma ser desviado para sistemas de recuperação, produzindo água quente ou vapor saturado para aquecimento — ou vapor superaquecido para geração elétrica <Cite id="saimm" />.

O consumo elétrico do forno fica entre **11 e 13 MWh por tonelada** de silício metálico, e cai sensivelmente quando o produto final é uma liga com mais ferro <Cite id="saimm" />. É essa conta de energia, e não a disponibilidade de quartzo, que decide onde o MG-Si é produzido: em países com eletricidade barata, redutores abundantes e bons depósitos de quartzo <Cite id="saimm" />.

### Escala e uso do MG-Si

A produção mundial de MG-Si passa de **1 milhão de toneladas métricas por ano**, a um custo de poucos dólares por quilograma, conforme qualidade, pureza e granulometria <Cite id="saimm" />. A demanda vem sobretudo das **indústrias de alumínio e química**, e apenas uma fração pequena segue para refino em grau semicondutor <Cite id="saimm" />.

Vale notar que boa parte do silício produzido industrialmente nem chega ao MG-Si puro: sai como **ferrossilício**, usado na desoxidação e na liga de aços e ferros fundidos <Cite id="saimm" />. O mercado que mais cresce, porém, é o fotovoltaico <Cite id="saimm" /> — e é ele que dá sentido econômico à cadeia de purificação descrita a seguir.

<SourceNote :ids="['pv-education', 'pv-mfg-polysilicon', 'sciencedirect-hpq', 'elkem', 'csiro', 'saimm']" />

<SeeAlso :links="[
  { text: 'Introdução', href: '/introducao', note: 'produção mundial de silício metálico', cite: 'usgs-mcs' },
  { text: 'Polissilício', href: '/polissilicio', note: 'refinamento químico a partir do MG-Si' },
  { text: 'Referências', href: '/referencias', note: 'lista numerada' },
]" />
