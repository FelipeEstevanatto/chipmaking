---
title: Fabricação de wafers
description: Do polissilício EG-Si ao wafer pronto para fab — Czochralski, corte, CMP e limpeza RCA.
---

# Fabricação do wafer de silício

A transformação do polissilício de grau eletrônico ([EG-Si](/glossario)) em wafers monocristalinos requer uma sequência rigorosa de processos físico-químicos e mecânicos de precisão. O objetivo primário é produzir lingotes livres de defeitos cristalinos e convertê-los em lâminas extremamente planas, com rugosidade superficial em nível atômico.

## 1. Crescimento do monocristal (Czochralski — CZ)

O método **Czochralski** é o padrão industrial dominante <Cite id="zulehner-2000" />. Pedaços de polissilício de altíssima pureza são depositados em cadinho de quartzo altamente purificado, em forno a vácuo sob argônio inerte. O material é fundido acima de **1420 °C**. Um cristal-semente orientado (geralmente &lt;100&gt; ou &lt;111&gt;) é imerso na superfície do silício líquido e puxado lentamente para cima enquanto rotaciona em sentido oposto ao cadinho. Controlando taxa de puxamento e temperatura, forma-se um lingote cilíndrico monocristalino (**bole**) com diâmetros de **200 mm** ou **300 mm** e extensão superior a **1 m**.

## 2. Preparação do lingote e pré-usinagem

Após resfriamento, removem-se as extremidades cônicas (cabeça e cauda). O corpo cilíndrico passa por retificação externa por esmerilhamento para a dimensão exata. Produz-se um **chanfro plano (flat)** ou **entalhe (notch)** para indicar orientação cristalina e dopagem no manuseio automatizado.

## 3. Corte em fatias (wafer slicing)

O lingote retificado é **dividido em blocos** e fatiado com **serras de múltiplos fios diamantados (DWS)** <Cite id="moller-2012" />. Um conjunto paralelo de fios de aço revestidos com micropartículas de diamante move-se em altíssima velocidade sob tensão controlada, cortando centenas de wafers simultaneamente, com espessuras típicas de **700–800 µm**, maximizando rendimento e reduzindo perda de **kerf**.

## 4. Arredondamento de bordas e lapidação

As bordas passam por **edge profiling** para prevenir trincas e partículas. Depois, **lapidação (lapping)** com pasta abrasiva (alumina ou carbeto de silício) uniformiza espessura, paralelismo e remove irregularidades do corte.

## 5. Ataque químico (etching)

A lapidação deixa tensões residuais e microfraturas. O **etching** químico (HF/HNO₃/CH₃COOH ou KOH/NaOH) remove a camada danificada, deixando superfície quimicamente limpa e livre de estresse.

## 6. Tratamento térmico e RTP

**Tratamento térmico** ou **RTP (Rapid Thermal Processing)** aniquila doadores térmicos de oxigênio do Czochralski, equaliza defeitos pontuais e uniformiza resistividade.

## 7. Polimento químico-mecânico (CMP)

O **CMP** <Cite id="runnels-1994" /> é crítico para [fotolitografia](/fotolitografia). O wafer é pressionado contra almofada rotativa com suspensão alcalina de nanopartículas de sílica: oxidação química suave e remoção mecânica do óxido geram superfície espelhada com rugosidade sub-nanométrica.

## 8. Limpeza RCA e inspeção

Limpeza padronizada **RCA** <Cite id="kern-1990" />:

1. **RCA-1 (SC-1):** NH₄OH / H₂O₂ / H₂O a 70–80 °C — oxidação orgânica e partículas.
2. **RCA-2 (SC-2):** HCl / H₂O₂ / H₂O a 70–80 °C — metais alcalinos e pesados.

Após secagem Marangoni ou IPA, os wafers passam por metrologia óptica (**Laser Surface Scanning System** — espalhamento de feixe laser) para detecção de defeitos de superfície e contagem de partículas. Por fim, wafers que precisam de camadas especiais passam por **crescimento epitaxial (EPI Growing)** por **CVD** antes de serem embalados a vácuo sob atmosfera limpa (**cleanroom** classe 1/10) para envio às **fabs** (fundições de semicondutores).

<SourceNote :ids="['zulehner-2000', 'moller-2012', 'runnels-1994', 'kern-1990']" />

<div class="see-also">

<p class="see-also-title">Veja também</p>

<ul>
  <li><a href="/estrutura-wafers">Estrutura e tipos de wafer</a> — cristal, Miller, dopagem</li>
  <li><a href="/polissilicio">Polissilício</a> — matéria-prima EG-Si</li>
  <li><a href="/referencias">Referências</a> — papers [6]–[9]</li>
</ul>

</div>
