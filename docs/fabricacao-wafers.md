---
title: Fabricação de wafers
description: Do polissilício EG-Si ao wafer pronto para fab — Czochralski, corte, CMP e limpeza RCA.
---

# Fabricação do wafer de silício

A transformação do polissilício de grau eletrônico ([EG-Si](/glossario)) em wafers monocristalinos requer uma sequência rigorosa de processos físico-químicos e mecânicos de precisão. O objetivo primário é produzir lingotes livres de defeitos cristalinos e convertê-los em lâminas extremamente planas, com rugosidade superficial em nível atômico. As oito etapas a seguir cobrem essa sequência, do crescimento do cristal à inspeção final.

## Crescimento do monocristal (Czochralski — CZ)

O método **Czochralski** é o padrão industrial dominante <Cite id="zulehner-2000" />. Pedaços de polissilício de altíssima pureza são depositados em cadinho de quartzo altamente purificado, em forno a vácuo sob argônio inerte. O material é fundido acima de **1420 °C**. Um cristal-semente orientado (geralmente &lt;100&gt; ou &lt;111&gt;) é imerso na superfície do silício líquido e puxado lentamente para cima enquanto rotaciona em sentido oposto ao cadinho. Controlando taxa de puxamento e temperatura, forma-se um lingote cilíndrico monocristalino (**bole**) com diâmetros de **200 mm** ou **300 mm** e extensão superior a **1 m**.

## Preparação do lingote e pré-usinagem

Após resfriamento, removem-se as extremidades cônicas (cabeça e cauda). O corpo cilíndrico passa por retificação externa por esmerilhamento para a dimensão exata. Produz-se um **chanfro plano (flat)** ou **entalhe (notch)** para indicar orientação cristalina e dopagem no manuseio automatizado.

## Corte em fatias (wafer slicing)

O lingote retificado é **dividido em blocos** e fatiado com **serras de múltiplos fios diamantados (DWS)** <Cite id="moller-2012" />. Um conjunto paralelo de fios de aço revestidos com micropartículas de diamante move-se em altíssima velocidade sob tensão controlada, cortando centenas de wafers simultaneamente, com espessuras típicas de **700–800 µm**, maximizando rendimento e reduzindo perda de **kerf**.

## Arredondamento de bordas e lapidação

As bordas passam por **edge profiling** para prevenir trincas e partículas. Depois, **lapidação (lapping)** com pasta abrasiva (alumina ou carbeto de silício) uniformiza espessura, paralelismo e remove irregularidades do corte.

## Ataque químico (etching)

A lapidação deixa tensões residuais e microfraturas. O **etching** químico (HF/HNO₃/CH₃COOH ou KOH/NaOH) remove a camada danificada, deixando superfície quimicamente limpa e livre de estresse.

## Tratamento térmico e RTP

**Tratamento térmico** ou **RTP (Rapid Thermal Processing)** aniquila doadores térmicos de oxigênio do Czochralski, equaliza defeitos pontuais e uniformiza resistividade.

## Polimento químico-mecânico (CMP)

O **CMP** <Cite id="runnels-1994" /> é crítico para [fotolitografia](/fotolitografia). O wafer é pressionado contra almofada rotativa com suspensão alcalina de nanopartículas de sílica: oxidação química suave e remoção mecânica do óxido geram superfície espelhada com rugosidade sub-nanométrica.

## Limpeza RCA e inspeção

Limpeza padronizada **RCA** <Cite id="kern-1990" />:

1. **RCA-1 (SC-1):** NH₄OH / H₂O₂ / H₂O a 70–80 °C — oxidação orgânica e partículas.
2. **RCA-2 (SC-2):** HCl / H₂O₂ / H₂O a 70–80 °C — metais alcalinos e pesados.

Após secagem Marangoni ou IPA, os wafers passam por metrologia óptica (**Laser Surface Scanning System** — espalhamento de feixe laser) para detecção de defeitos de superfície e contagem de partículas. Por fim, wafers que precisam de camadas especiais passam por **crescimento epitaxial (EPI Growing)** por **CVD** antes de serem embalados a vácuo sob atmosfera limpa (**cleanroom** classe 1/10) para envio às **fabs** (fundições de semicondutores).

## Wafers solares: o outro produto da mesma cadeia

Nem todo wafer de silício termina numa fab. A indústria fotovoltaica consome o mesmo material, mas com regras bastante diferentes — e as divergências começam já na escolha do cristal <Cite id="saimm" />.

### Monocristalino ou multicristalino

A eletrônica usa **exclusivamente silício monocristalino**, porque os requisitos de qualidade são altos demais para abrir exceção. A fotovoltaica usa **os dois** <Cite id="saimm" />.

O silício **multicristalino** tem eficiência de célula menor, mas custa menos — e é esse compromisso que explica sua presença no mercado <Cite id="saimm" />. Em vez de puxar um lingote cilíndrico, ele é produzido por **fundição em bloco** (processo Bridgman): o silício é fundido num cadinho e a **interface cristal-líquido avança de baixo para cima** conforme o resfriamento é controlado <Cite id="saimm" />.

O objetivo é obter **grãos alinhados verticalmente**, o que evita tensões térmicas altas e reduz a densidade de discordâncias. Como os wafers são cortados horizontalmente, isso também garante qualidade consistente de lâmina para lâmina <Cite id="saimm" />. Há um bônus de pureza: as impurezas metálicas são **empurradas para o topo do lingote** conforme o cristal cresce, num refino que acontece de graça dentro do próprio cadinho <Cite id="saimm" />. O cadinho é de **sílica**, revestido com **Si₃N₄** para o silício líquido não grudar nas paredes <Cite id="saimm" />.

Já o **Czochralski**, descrito acima, é um processo em batelada que leva cerca de **dois dias por lingote** <Cite id="saimm" />.

### Espessura: onde a fotovoltaica se separa

Aqui está a diferença mais visível. Para extrair a potência elétrica, bastam cerca de **100 µm de silício** — a luz não precisa de mais material que isso <Cite id="saimm" />. Na prática, a indústria fotovoltaica trabalha com lâminas **abaixo de 200 µm** <Cite id="saimm" />, contra os **700 a 800 µm** típicos dos wafers de fab.

Isso não é só economia de material: é economia de uma cadeia inteira. O wafer cristalino responde por **quase metade do custo final do módulo**, e a etapa de fabricação do wafer por cerca de **30%** desse custo <Cite id="saimm" />.

### O corte e o desperdício

O fatiamento usa **serras de fio múltiplo**: um único fio de aço inoxidável de cerca de **180 µm de diâmetro** e **vários quilômetros de comprimento** é movimentado através do cristal numa suspensão abrasiva, formando uma **teia de fios** entre duas bobinas <Cite id="saimm" />. As vantagens são o alto rendimento e a possibilidade de lâminas mais finas <Cite id="saimm" />.

O custo disso é o **kerf**: aproximadamente **30% do silício é perdido como serragem** durante o corte <Cite id="saimm" />. Antes disso, o seccionamento do lingote em blocos já descarta mais material — cerca de **25% nos lingotes monocristalinos e 15% nos multicristalinos** <Cite id="saimm" />. Nos monocristalinos, o cilindro é seccionado até virar um bloco cúbico; nos multicristalinos, o corte remove as **regiões periféricas mais contaminadas** <Cite id="saimm" />.

### O wafer está crescendo

A indústria fotovoltaica migrou para áreas maiores ao longo do tempo: do padrão de **10 × 10 cm²** para **12,5 × 12,5 cm²** e, mais recentemente, **15,6 × 15,6 cm²** <Cite id="saimm" />. A força motriz é simples: célula maior significa **custo menor por watt-pico** <Cite id="saimm" />.

<SourceNote :ids="['zulehner-2000', 'moller-2012', 'runnels-1994', 'kern-1990', 'saimm']" />

<SeeAlso :links="[
  { text: 'Estrutura e tipos de wafer', href: '/estrutura-wafers', note: 'cristal, Miller, dopagem' },
  { text: 'Polissilício', href: '/polissilicio', note: 'matéria-prima EG-Si' },
  { text: 'Referências', href: '/referencias', note: 'papers [6]–[9]' },
]" />
