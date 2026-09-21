# Fotolitografia

Máquinas da **ASML** (originadas da Philips), com precisão nanométrica, alinham wafers em equipamentos que projetam luz ultravioleta através de uma **máscara (retículo)** com o circuito gravado, reagindo com o fotoresistor apenas em pontos selecionados.

A mesa de posicionamento do wafer pesa cerca de **15 kg** e pode acelerar com força de até **20 G** (cerca de três vezes a aceleração típica de um carro de Fórmula 1), movendo-se com precisão de **nanômetros** para **multi-padrões** — vários retículos em sequência para linhas menores que o permitido por uma única exposição. Qualquer vibração indesejada pode destruir o padrão.

Quando a TSMC ainda fazia parte da Philips, motores lineares **hidráulicos** eram usados: muito precisos, porém com alta manutenção — custo e tempo significativos até soluções mais robustas.

### Vídeos

- [Processo ASML](https://www.youtube.com/watch?v=jL7HvnBgrJ4)
- [RTX 5090 Chip Deep-Dive](https://www.youtube.com/watch?v=rCwgAGG2sZQ)

## Passo a passo do processo

Executado em sequência, com controle rigoroso de temperatura e contaminantes:

1. **Preparação e limpeza do substrato:** *dehydration bake* (200–400 °C); promotor de adesão **HMDS** (hexametildisilazano) torna a superfície hidrofóbica.
2. **Revestimento (spin coating):** fotoresistor depositado e espalhado por rotação a milhares de RPM, formando filme uniforme micrométrico ou nanométrico.
3. **Pré-cozimento (soft bake):** hotplate 90–100 °C — evapora solventes, estabiliza o filme.
4. **Alinhamento e exposição:** steppers/scanners; retículo de quartzo com cromo; **DUV (193 nm)** ou **EUV (13,5 nm)** altera solubilidade da resina.
5. **Cozimento pós-exposição (PEB):** 100–130 °C — catalisa reações latentes; reduz *standing waves* nas paredes do resiste.
6. **Revelação (development):** TMAH ou poça; em resiste **positivo**, região exposta dissolve; enxágue com DIW e secagem com N₂.
7. **Cozimento final (hard bake):** 120–150 °C — reticulação (*cross-linking*) para resistir a etch e implantação.
8. **Transferência de padrão e stripping:** gravação por **etch** ou **implantação iônica**; remoção do resiste por solventes ou **plasma ashing**.
