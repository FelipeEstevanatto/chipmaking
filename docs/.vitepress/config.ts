import { defineConfig } from 'vitepress'
import type { DefaultTheme } from 'vitepress'

const shared = {
  base: '/chipmaking/',
  appearance: true,
  markdown: {
    mermaid: true,
  },
  head: [['link', { rel: 'icon', href: '/favicon.svg' }]],
} as const

function ptSidebar(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'Visão geral',
      collapsed: false,
      items: [
        { text: 'Início', link: '/' },
        { text: 'Introdução', link: '/introducao' },
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
      items: [{ text: 'Fotolitografia', link: '/fotolitografia' }],
    },
    {
      text: 'Dispositivos',
      items: [{ text: 'Evolução dos transistores', link: '/transistores' }],
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
      items: [{ text: 'Photolithography', link: '/en/fotolitografia' }],
    },
    {
      text: 'Devices',
      items: [{ text: 'Transistor evolution', link: '/en/transistores' }],
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

export default defineConfig({
  ...shared,
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
})
