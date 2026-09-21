import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Silício — Chip Making',
  description: 'Resumo sobre a cadeia de produção do silício para semicondutores e energia solar.',
  lang: 'pt-BR',
  base: '/chipmaking/',
  themeConfig: {
    nav: [
      { text: 'Início', link: '/' },
      { text: 'Referências', link: '/referencias' },
    ],
    sidebar: [
      {
        text: 'Conteúdo',
        items: [
          { text: 'Introdução', link: '/' },
          { text: 'Mineração e MG-Si', link: '/mineracao-mg-si' },
          { text: 'Polissilício', link: '/polissilicio' },
          { text: 'Fabricação de wafers', link: '/fabricacao-wafers' },
          { text: 'Estrutura e tipos de wafer', link: '/estrutura-wafers' },
          { text: 'Fotolitografia', link: '/fotolitografia' },
          { text: 'Evolução dos transistores', link: '/transistores' },
          { text: 'Referências', link: '/referencias' },
        ],
      },
    ],
    socialLinks: [],
  },
})
