import { defineConfig } from 'vitepress'
import type { DefaultTheme } from 'vitepress'

const shared = {
  base: '/chipmaking/',
  appearance: true,
} as const

function ptSidebar(): DefaultTheme.SidebarItem[] {
  return [
    { text: 'Introdução', link: '/' },
    { text: 'Mineração e MG-Si', link: '/mineracao-mg-si' },
    { text: 'Polissilício', link: '/polissilicio' },
    { text: 'Fabricação de wafers', link: '/fabricacao-wafers' },
    { text: 'Estrutura e tipos de wafer', link: '/estrutura-wafers' },
    { text: 'Fotolitografia', link: '/fotolitografia' },
    { text: 'Evolução dos transistores', link: '/transistores' },
    { text: 'Referências', link: '/referencias' },
  ]
}

function enSidebar(): DefaultTheme.SidebarItem[] {
  return [
    { text: 'Introduction', link: '/en/' },
    { text: 'Mining & MG-Si', link: '/en/mineracao-mg-si' },
    { text: 'Polysilicon', link: '/en/polissilicio' },
    { text: 'Wafer fabrication', link: '/en/fabricacao-wafers' },
    { text: 'Crystal structure & wafers', link: '/en/estrutura-wafers' },
    { text: 'Photolithography', link: '/en/fotolitografia' },
    { text: 'Transistor evolution', link: '/en/transistores' },
    { text: 'References', link: '/en/referencias' },
  ]
}

export default defineConfig({
  ...shared,
  locales: {
    root: {
      label: 'Português',
      lang: 'pt-BR',
      title: 'Silício — Chip Making',
      description:
        'Resumo sobre a cadeia de produção do silício para semicondutores e energia solar.',
      themeConfig: {
        nav: [
          { text: 'Início', link: '/' },
          { text: 'Referências', link: '/referencias' },
        ],
        sidebar: [{ text: 'Conteúdo', items: ptSidebar() }],
        socialLinks: [],
      },
    },
    en: {
      label: 'English',
      lang: 'en-US',
      link: '/en/',
      title: 'Silicon — Chip Making',
      description:
        'Overview of the silicon supply chain for semiconductors and solar energy.',
      themeConfig: {
        nav: [
          { text: 'Home', link: '/en/' },
          { text: 'References', link: '/en/referencias' },
        ],
        sidebar: [{ text: 'Contents', items: enSidebar() }],
        socialLinks: [],
      },
    },
  },
})
