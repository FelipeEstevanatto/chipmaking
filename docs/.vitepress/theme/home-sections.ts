/**
 * The section cards of the home page, rendered by `HomeSections.vue`. One list in one module, so
 * the two locales and any future card cannot drift.
 *
 * The first six cards are the production stages and carry the sidebar's numbers; the last two are
 * the reference pages, which are neither a stage nor a product and share the neutral accent.
 */

import type { StageAccent, StageIconName } from './stage-visuals'

export interface HomeSection {
  /** Locale-independent key. */
  id: string
  title: { pt: string; en: string }
  details: { pt: string; en: string }
  /** Portuguese content path; English is derived by prefixing `/en`. */
  path: string
  icon: StageIconName
  accent: StageAccent
  /** The sidebar's stage number; the reference cards carry none. */
  stage?: number
}

export const HOME_SECTIONS: HomeSection[] = [
  {
    id: 'materia-prima',
    title: { pt: 'Matéria-prima', en: 'Raw material' },
    details: {
      pt: 'Mineração de quartzo HPQ e redução carbotérmica até silício metalúrgico (MG-Si).',
      en: 'HPQ quartz mining and carbothermal reduction down to metallurgical silicon (MG-Si).',
    },
    path: '/mineracao-mg-si',
    icon: 'crystal',
    accent: 'raw',
    stage: 1,
  },
  {
    id: 'refino',
    title: { pt: 'Refino', en: 'Refining' },
    details: {
      pt: 'Triclorossilano, processos Siemens e FBR, mercado global de polissilício.',
      en: 'Trichlorosilane, Siemens and FBR processes, and the global polysilicon market.',
    },
    path: '/polissilicio',
    icon: 'column',
    accent: 'refine',
    stage: 2,
  },
  {
    id: 'wafer',
    title: { pt: 'Wafer', en: 'Wafer' },
    details: {
      pt: 'Czochralski, corte, CMP, limpeza RCA e estrutura cristalina do silício.',
      en: 'Czochralski growth, slicing, CMP, RCA cleaning and the crystal structure of silicon.',
    },
    path: '/fabricacao-wafers',
    icon: 'wafer',
    accent: 'wafer',
    stage: 3,
  },
  {
    id: 'na-fab',
    title: { pt: 'Na fab', en: 'In the fab' },
    details: {
      pt: 'Fotolitografia DUV/EUV, ASML e etapas do fluxo de padrões no wafer.',
      en: 'DUV/EUV photolithography, ASML, and the patterning flow on the wafer.',
    },
    path: '/fotolitografia',
    icon: 'mask',
    accent: 'fab',
    stage: 4,
  },
  {
    id: 'dispositivos',
    title: { pt: 'Dispositivos', en: 'Devices' },
    details: {
      pt: 'Planar, silício esticado, FinFET, GAAFET, BSPDN e horizonte CFET.',
      en: 'Planar, strained silicon, FinFET, GAAFET, BSPDN and the CFET horizon.',
    },
    path: '/transistores',
    icon: 'transistor',
    accent: 'device',
    stage: 5,
  },
  {
    id: 'empacotamento',
    title: { pt: 'Empacotamento e teste', en: 'Packaging and test' },
    details: {
      pt: 'Teste de wafer, fatiamento, wire bonding, flip-chip, HBM, chiplets e teste final.',
      en: 'Wafer test, dicing, wire bonding, flip-chip, HBM, chiplets and final test.',
    },
    path: '/empacotamento',
    icon: 'package',
    accent: 'package',
    stage: 6,
  },
  {
    id: 'glossario',
    title: { pt: 'Glossário', en: 'Glossary' },
    details: {
      pt: 'Siglas e termos (MG-Si, TCS, CMP, EUV…) com links para os capítulos.',
      en: 'Acronyms and terms (MG-Si, TCS, CMP, EUV…) with links to each chapter.',
    },
    path: '/glossario',
    icon: 'book',
    accent: 'reference',
  },
  {
    id: 'panorama',
    title: { pt: 'Panorama', en: 'Panorama' },
    details: {
      pt: 'Preços e valor, os vizinhos SiC e GaN, o mapa dos gargalos e as séries de dados.',
      en: 'Prices and value, the SiC and GaN neighbours, the chokepoint map and the data series.',
    },
    path: '/gargalos',
    icon: 'chart',
    accent: 'reference',
  },
]
