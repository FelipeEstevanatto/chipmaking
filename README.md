# chipmaking

Site estático sobre a cadeia de produção do silício (semicondutores e solar), gerado com [VitePress](https://vitepress.dev/) e [Bun](https://bun.sh/).

Documento fonte: `Resumo Chipmaking.pdf`.

## Idiomas

[VitePress i18n](https://vitepress.dev/guide/i18n): **Português** (`docs/`) e **English** (`docs/en/`), ambos com conteúdo completo e espelhado arquivo a arquivo.

Ao adicionar um capítulo, replique-o nos dois locales. Componentes compartilhados (`Cite`, `UsgsProductionChart`, `TransistorCompare`, `TransistorTimeline`, `SeeAlso`) detectam o locale e apontam para as páginas do idioma ativo.

### Blocos "Veja também"

Use o componente `SeeAlso` — ele aplica o `base` do site automaticamente. Não escreva `<a href="/...">` cru no Markdown: o VitePress só reescreve links de Markdown, então âncoras HTML cruas perdem o prefixo `/chipmaking/`.

```md
<SeeAlso :links="[
  { text: 'Polissilício', href: '/polissilicio', note: 'refinamento químico a partir do MG-Si' },
]" />
```

**Busca local** (sem Algolia): botão no header ou **Ctrl+K** / **/** — indexa o Markdown no build; cada idioma busca só nas páginas daquele locale.

## Glossário e tooltips

`docs/.vitepress/glossary.ts` é a **fonte única** das entradas do glossário: cada uma declara `pt` e `en` (ambos exigidos pelo tipo, o que impede os locales de divergirem), o capítulo que a explica e, opcionalmente, `variants` (outras grafias, como `TSVs` para `TSV`) e `tooltip: false` para siglas ambíguas demais para anotar em prosa.

Dois consumidores leem essa lista:

- `theme/GlossaryTable.vue` gera as páginas `/glossario` e `/en/glossario` a partir dela, com uma caixa de filtro que busca termo, expansão, capítulo e variantes ignorando acentos — **não escreva a tabela à mão**, ela é derivada;
- `glossary-tooltips.ts`, um plugin do markdown-it, envolve a **primeira** ocorrência de cada termo em `<abbr title="...">`, dando a expansão no *hover*.

O plugin nunca anota dentro de código (inclusive diagramas Mermaid), rótulos de link, títulos, `figcaption` ou texto que os componentes montam a partir de props (`SeeAlso`, `TransistorTimeline`, `TransistorCompare`): um `<abbr>` dentro de um link aninharia marcação no rótulo da âncora, e o conteúdo de props nem passa pelas regras inline do Markdown. Por isso um termo pode aparecer "cru" perto do topo e receber a expansão na primeira ocorrência de prosa.

Depois de `bun run build`, `python scripts/audit-glossary.py` confere isso no HTML gerado: título e contexto de cada anotação, anotação única por página, primeira ocorrência de prosa e paridade entre os locales (mesmos termos anotados e as mesmas linhas nas duas tabelas).

## Aids de leitura

`theme/ReadingProgress.vue` (slot `layout-top`) desenha a barra de progresso no topo da janela, e `theme/DocMeta.vue` (slot `doc-before`) mostra o tempo de leitura e a contagem de figuras, medida no texto renderizado — o que a mantém correta quando um capítulo muda. A numeração das figuras sai de CSS (`counter-reset: figure` em `.vp-doc`, em `custom.css`), então `DiagramFigure` não precisa saber o próprio número, e o rótulo alterna entre "Figura" e "Figure" conforme o `lang` do documento.

## Estrutura do site

- **Início** (`/`) — hero, features e diagrama Mermaid da cadeia
- **Introdução** — texto USGS + gráfico interativo (Chart.js)
- **Linha do tempo** / **Glossário** — navegação auxiliar
- Capítulos agrupados na sidebar: matéria-prima → refino → wafer → fab → dispositivos

## Figuras do PDF

Imagens embutidas em `docs/public/pdf-images/`. Para regenerar a partir do PDF:

```bash
python scripts/extract-pdf-images.py
```

Toda figura (`DiagramFigure`, `TransistorTimeline`) passa pelo componente `ZoomableImage`: um clique abre um visualizador em tela cheia com zoom pela roda do mouse ou duplo clique, arraste para mover, botões `+` / `-` / `1:1` e atalhos `+`, `-`, `0` e `Esc`.

Esquemas próprios (transistores, rota do polissilício, forno de arco submerso, célula solar, coluna óptica do scanner, etapas da litografia, as quatro gerações ópticas, a identificação de wafer por flats/notch, as etapas mecânicas do wafer — perfil de borda, lapidação, ataque e orçamento térmico do RTP — e, no refino, os reatores Siemens e FBR, o ciclo do cloro e o ciclo do preço) ficam em `docs/public/assets/*.svg`. Escreva-os em **ASCII puro** e use referências numéricas (`&#176;`, `&#8594;`) para `°` e `→`: entidades HTML nomeadas como `&minus;` não existem em XML e fazem o SVG inteiro falhar. Termine com `width`/`height` no `<svg>` raiz — sem eles, o `naturalWidth` fica `0` e o `ZoomableImage` não consegue dimensionar a imagem.

Um SVG usado em figura é transparente por padrão, e o visualizador de zoom tem fundo escuro: sem uma tinta clara por baixo, o desenho some no modo noturno e, ao ampliar, fica escuro sobre escuro. Por isso, **o primeiro filho do `<svg>` deve ser um `<rect>` opaco do tamanho do `viewBox`** (o próprio componente pinta um cartão branco, mas o arquivo também é aberto direto no navegador). Pelo mesmo motivo, use texto com contraste alto (`#1a202c` / `#2d3748` sobre branco) em vez de cinzas médios.

**Tamanho de fonte.** A coluna de prosa entrega 638 px de largura. Num `viewBox` de 960, isso é uma redução de ~0,66×: um rótulo de 14 px no SVG chega à tela com ~9 px. Meça com `img.getBoundingClientRect()` no navegador em vez de confiar no número do `viewBox`, e dimensione o corpo entre **17 e 18 px** (≈12 px na tela), reservando 16,5 px para notas de rodapé do próprio desenho.

**Idioma dos rótulos.** O desenho é único e vai para os dois locales, então os rótulos são termos técnicos curtos em inglês (`crown`, `bevel`, `slurry`, `load`) — os mesmos que a prosa portuguesa já usa entre parênteses — e **toda a explicação fica na legenda**, que é traduzida. `wafer-identification.svg` é a exceção herdada: seus rótulos estão em português e aparecem assim também na página em inglês.

**Conferir sem enxergar.** Um SVG pode ser validado sem abrir a imagem: monte um `<canvas>`, desenhe o SVG e amostre pixels em coordenadas conhecidas para confirmar que cada forma caiu onde devia, e leia `getBBox()` dos `<text>` para detectar rótulos cortados ou sobrepostos. Foi assim que o arco da lasca em `wafer-edge-profile.svg` apareceu com o `sweep` invertido — o `getBBox()` do `<path>` denunciava o topo 17 px acima do esperado.

Vale rodar isso **antes** de escrever a legenda, porque o erro típico não é a geometria e sim o texto: um rótulo centralizado que vaza pela borda direita ou duas linhas com 2 px de sobreposição passam despercebidos a olho nu no `viewBox` e ficam óbvios depois de montar o arquivo. Ao gerar um SVG novo, aponte o mesmo verificador para ele e resolva todo `<text>` com `x < 1`, `y < 1`, `x + w > viewBox` ou `y + h > viewBox`. Lembre também de conferir o **preenchimento por `<pattern>`**: se a `url(#id)` não resolver, o `<rect>` simplesmente não desenha nada e o erro passa silencioso — amostre a fração de pixels preenchidos na região em vez de um único ponto, já que o padrão tem vãos.

O `wafer-identification.svg` é gerado por `scripts/gen-wafer-identification-svg.py`, porque os contornos de wafer com *flats* exigem geometria de arco real (um *flat* é uma corda que substitui um arco). Rode o script em vez de editar o SVG à mão.

## Imagens de terceiros

Fotos e esquemas de fora (Wikimedia Commons, laboratórios nacionais) ficam também em `docs/public/assets/` — copiados para o repositório em vez de apontados para o host externo, para que a página não dependa de um servidor de terceiros. Cada `figcaption` credita **autor, arquivo original e licença**, com link para a página no Commons; sem isso a atribuição se perde. Prefira domínio público ou CC BY / CC BY-SA, e confira a descrição do arquivo antes de usá-lo: o `ImageDescription` da API do Commons costuma revelar que uma imagem é outra coisa.

Exemplo (arquivo baixado via `Special:FilePath`, que resolve a miniatura correta):

```powershell
$u = 'https://commons.wikimedia.org/wiki/Special:FilePath/' + [uri]::EscapeDataString('Immersion lithography illustration.svg')
Invoke-WebRequest -Uri $u -OutFile 'docs/public/assets/immersion-lithography.svg' -Headers @{ 'User-Agent' = 'chipmaking-docs/1.0' }
```

## Vídeos

Dois componentes de embed 16:9, ambos com `loading="lazy"` e moldura compartilhada (`.video-embed` em `custom.css`):

```md
<YouTubeEmbed id="jL7HvnBgrJ4" title="Processo ASML" />
<VideoPressEmbed id="ZlxguS11" title="Animação da rota de polissilício" />
```

`YouTubeEmbed` usa `youtube-nocookie.com`; `VideoPressEmbed` usa o player do WordPress.com, usado pelo PV-Manufacturing.org. Ao embutir material de terceiros, credite a fonte no texto e nas referências.

## Rodapé de build

`theme/BuildFooter.vue` é injetado no slot `layout-bottom` por `theme/Layout.vue` e aparece em todas as páginas (o `themeConfig.footer` do VitePress só aceita strings e só renderiza sem sidebar). Ele mostra o commit do build, a branch e o link do repositório.

Os dados vêm de `buildInfoForClient` em `config.ts`, resolvido em Node no carregamento da config e embutido no bundle via `vite.define` como `__BUILD_INFO__`. Em CI usa `GITHUB_SHA`/`GITHUB_REF_NAME` (sem chamar o git); localmente cai para `git rev-parse`.

## Diagramas Mermaid

Blocos ` ```mermaid ` são renderizados no cliente por `docs/.vitepress/theme/Mermaid.vue`, com o plugin `vitepress-plugin-mermaid` cuidando do cercamento (*fence*) no Markdown.

O `mermaid` em si é importado **dinamicamente**. O plugin registra o componente com um import estático, e isso faz o Rollup pré-carregar ~680 kB de JS em todas as páginas, inclusive as que não têm diagrama. Por isso `config.ts` traz um alias que troca o renderer do plugin por `theme/mermaid-async.ts` (um `defineAsyncComponent`), deixando o bundle a um salto dinâmico de distância.

Timelines usam `useMaxWidth: false` para manter os rótulos legíveis em largura natural (com rolagem horizontal); flowcharts continuam se ajustando à largura do texto.

## Desenvolvimento

```bash
bun install
bun run dev
```

Abre em `http://localhost:5173/chipmaking/` (o `base` está configurado para GitHub Pages).

## Build

```bash
bun run build
```

Saída em `docs/.vitepress/dist`. Pré-visualização local:

```bash
bun run preview
```

## GitHub Pages

Publique o conteúdo de `docs/.vitepress/dist` (workflow de GitHub Actions ou branch `gh-pages`). O site fica em `https://<usuario>.github.io/chipmaking/`.
