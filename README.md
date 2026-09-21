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
