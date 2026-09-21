# chipmaking

Site estático sobre a cadeia de produção do silício (semicondutores e solar), gerado com [VitePress](https://vitepress.dev/) e [Bun](https://bun.sh/).

Documento fonte: `Resumo Chipmaking.pdf`.

## Idiomas

[VitePress i18n](https://vitepress.dev/guide/i18n): **Português** (conteúdo completo) e **English** (`docs/en/`).

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
