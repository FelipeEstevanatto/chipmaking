import { defineConfig } from 'vitepress'
import type { DefaultTheme } from 'vitepress'
import { execSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { withMermaid } from 'vitepress-plugin-mermaid'
import { glossaryTooltips } from './glossary-tooltips'

/**
 * Single source of truth for the GitHub Pages subpath. VitePress rewrites Markdown links and theme
 * asset URLs with it, but **not** raw `head` tags — so those have to be prefixed by hand.
 */
const base = '/chipmaking/'

const repoUrl = 'https://github.com/FelipeEstevanatto/chipmaking'

/** Runs a git command from the project root; returns '' when git (or the repo) is unavailable. */
function git(command: string): string {
  try {
    return execSync(command, { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim()
  } catch {
    return ''
  }
}

/**
 * Provenance for the site footer. Resolved once in Node when this config loads, then inlined into
 * the client bundle through Vite's `define` — the footer stays a static string with no runtime cost
 * and no filesystem access from the browser.
 *
 * GitHub Actions exports `GITHUB_SHA`/`GITHUB_REF_NAME`, so a shallow CI checkout needs no git call
 * at all; the fallbacks are for local `bun run build` and for `bun run dev`.
 */
const buildInfo = {
  repo: repoUrl,
  sha: process.env.GITHUB_SHA || git('git rev-parse HEAD'),
  ref: process.env.GITHUB_REF_NAME || git('git rev-parse --abbrev-ref HEAD'),
  // Commit date, so a rebuild of an unchanged commit keeps the same stamp. Falls back to build time.
  date: (git('git log -1 --format=%cI') || new Date().toISOString()).slice(0, 10),
}

const buildInfoForClient = {
  ...buildInfo,
  shortSha: buildInfo.sha ? buildInfo.sha.slice(0, 7) : '',
  commitUrl: buildInfo.sha ? `${repoUrl}/commit/${buildInfo.sha}` : repoUrl,
  repoLabel: repoUrl.replace(/^https?:\/\/github\.com\//, ''),
}

const shared = {
  base,
  appearance: true,
  head: [['link', { rel: 'icon', href: `${base}favicon.svg` }]],
} as const

function ptSidebar(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'Visão geral',
      collapsed: false,
      items: [
        { text: 'Início', link: '/' },
        { text: 'Introdução', link: '/introducao' },
        { text: 'O elemento silício', link: '/o-elemento-silicio' },
        { text: 'Linha do tempo', link: '/linha-do-tempo' },
        { text: 'Glossário', link: '/glossario' },
      ],
    },
    {
      text: 'Matéria-prima',
      items: [{ text: 'Mineração e MG-Si', link: '/mineracao-mg-si' }],
    },
    {
      text: 'Refino',
      items: [{ text: 'Polissilício', link: '/polissilicio' }],
    },
    {
      text: 'Wafer',
      items: [
        { text: 'Fabricação de wafers', link: '/fabricacao-wafers' },
        { text: 'Estrutura e tipos', link: '/estrutura-wafers' },
      ],
    },
    {
      text: 'Na fab',
      items: [
        { text: 'Na fab: do wafer ao chip', link: '/na-fab' },
        { text: 'Fotolitografia', link: '/fotolitografia' },
        { text: 'História da fotolitografia', link: '/historia-fotolitografia' },
        { text: 'Os insumos da fab', link: '/insumos-fab' },
      ],
    },
    {
      text: 'Dispositivos',
      items: [
        { text: 'Evolução dos transistores', link: '/transistores' },
        { text: 'Confiabilidade', link: '/confiabilidade' },
      ],
    },
    {
      text: 'Depois da fab',
      items: [{ text: 'Empacotamento e teste', link: '/empacotamento' }],
    },
    {
      text: 'Fotovoltaica',
      items: [{ text: 'Células e módulos solares', link: '/celulas-solares' }],
    },
    {
      text: 'Panorama',
      items: [
        { text: 'Preços e valor', link: '/precos-e-valor' },
        { text: 'Além do silício', link: '/alem-do-silicio' },
        { text: 'O mapa dos gargalos', link: '/gargalos' },
        { text: 'Dados e números', link: '/dados' },
      ],
    },
    {
      text: 'Fontes',
      items: [{ text: 'Referências', link: '/referencias' }],
    },
  ]
}

/** Root-level `themeConfig.search` is required — VitePress builds the index from here (not locale-only). */
const localSearch: { provider: 'local'; options: DefaultTheme.LocalSearchOptions } = {
  provider: 'local',
  options: {
    detailedView: true,
    locales: {
      root: {
        translations: {
          button: {
            buttonText: 'Buscar',
            buttonAriaLabel: 'Buscar no site',
          },
          modal: {
            noResultsText: 'Nenhum resultado para',
            resetButtonTitle: 'Limpar',
            backButtonTitle: 'Voltar',
            displayDetails: 'Mostrar lista detalhada',
            footer: {
              selectText: 'selecionar',
              navigateText: 'navegar',
              closeText: 'fechar',
            },
          },
        },
      },
      en: {
        translations: {
          button: {
            buttonText: 'Search',
            buttonAriaLabel: 'Search docs',
          },
          modal: {
            noResultsText: 'No results for',
            resetButtonTitle: 'Clear search',
            backButtonTitle: 'Back',
            displayDetails: 'Show detailed list',
            footer: {
              selectText: 'to select',
              navigateText: 'to navigate',
              closeText: 'to close',
            },
          },
        },
      },
    },
  },
}

function enSidebar(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'Overview',
      collapsed: false,
      items: [
        { text: 'Home', link: '/en/' },
        { text: 'Introduction', link: '/en/introducao' },
        { text: 'The silicon element', link: '/en/o-elemento-silicio' },
        { text: 'Timeline', link: '/en/linha-do-tempo' },
        { text: 'Glossary', link: '/en/glossario' },
      ],
    },
    {
      text: 'Raw material',
      items: [{ text: 'Mining & MG-Si', link: '/en/mineracao-mg-si' }],
    },
    {
      text: 'Refining',
      items: [{ text: 'Polysilicon', link: '/en/polissilicio' }],
    },
    {
      text: 'Wafer',
      items: [
        { text: 'Wafer fabrication', link: '/en/fabricacao-wafers' },
        { text: 'Crystal structure', link: '/en/estrutura-wafers' },
      ],
    },
    {
      text: 'In the fab',
      items: [
        { text: 'In the fab: from wafer to chip', link: '/en/na-fab' },
        { text: 'Photolithography', link: '/en/fotolitografia' },
        { text: 'History of photolithography', link: '/en/historia-fotolitografia' },
        { text: 'Fab consumables', link: '/en/insumos-fab' },
      ],
    },
    {
      text: 'Devices',
      items: [
        { text: 'Transistor evolution', link: '/en/transistores' },
        { text: 'Reliability', link: '/en/confiabilidade' },
      ],
    },
    {
      text: 'After the fab',
      items: [{ text: 'Packaging and test', link: '/en/empacotamento' }],
    },
    {
      text: 'Photovoltaics',
      items: [{ text: 'Solar cells and modules', link: '/en/celulas-solares' }],
    },
    {
      text: 'Panorama',
      items: [
        { text: 'Prices and value', link: '/en/precos-e-valor' },
        { text: 'Beyond silicon', link: '/en/alem-do-silicio' },
        { text: 'The chokepoint map', link: '/en/gargalos' },
        { text: 'Data and numbers', link: '/en/dados' },
      ],
    },
    {
      text: 'Sources',
      items: [{ text: 'References', link: '/en/referencias' }],
    },
  ]
}

const ptTheme: DefaultTheme.Config = {
  logo: '/favicon.svg',
  nav: [
    { text: 'Introdução', link: '/introducao' },
    { text: 'Glossário', link: '/glossario' },
    { text: 'Referências', link: '/referencias' },
  ],
  sidebar: ptSidebar(),
  outline: { level: [2, 3], label: 'Nesta página' },
  docFooter: { prev: 'Anterior', next: 'Próximo' },
}

const enTheme: DefaultTheme.Config = {
  logo: '/favicon.svg',
  nav: [
    { text: 'Introduction', link: '/en/introducao' },
    { text: 'Glossary', link: '/en/glossario' },
    { text: 'References', link: '/en/referencias' },
  ],
  sidebar: enSidebar(),
  outline: { level: [2, 3], label: 'On this page' },
  docFooter: { prev: 'Previous', next: 'Next' },
}

export default withMermaid(
  defineConfig({
    ...shared,
    markdown: {
      // Adds the first-use expansion tooltip to glossary terms across every chapter; see
      // glossary-tooltips.ts.
      config: (md) => {
        md.use(glossaryTooltips)
      },
    },
    vite: {
      resolve: {
        alias: {
          // Keep the plugin's ```mermaid fence handling, but swap in a renderer that loads
          // mermaid lazily. The plugin's own component imports mermaid statically, which adds
          // ~450 kB of JavaScript (plus katex/cytoscape diagram chunks) to every page.
          'vitepress-plugin-mermaid/Mermaid.vue': fileURLToPath(
            new URL('./theme/mermaid-async.ts', import.meta.url),
          ),
        },
      },
      define: {
        // Read by theme/BuildFooter.vue; see buildInfoForClient above.
        __BUILD_INFO__: JSON.stringify(buildInfoForClient),
      },
    },
    themeConfig: {
      search: localSearch,
    },
    locales: {
      root: {
        label: 'Português',
        lang: 'pt-BR',
        title: 'Silício — Chip Making',
        description:
          'Da mineração de quartzo aos transistores GAA: cadeia do silício para solar e semicondutores.',
        themeConfig: ptTheme,
      },
      en: {
        label: 'English',
        lang: 'en-US',
        link: '/en/',
        title: 'Silicon — Chip Making',
        description: 'From quartz mining to GAA transistors: the silicon supply chain.',
        themeConfig: enTheme,
      },
    },
  }),
)
