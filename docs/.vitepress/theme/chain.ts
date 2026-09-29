/**
 * The production chain, shared by the orientation strip (`SupplyChainMap`) and the home-page flow
 * (`ChainFlow`), so the two can never disagree about the order, the names or the destinations.
 *
 * The wafer is the fork: everything upstream is common to both industries, and from there the
 * chain splits into photovoltaics and semiconductors.
 */

import type { StageAccent, StageIconName } from './stage-visuals'

export interface ChainNode {
  pt: string
  en: string
  /** Portuguese content path; English is derived by prefixing `/en`. */
  path: string
  /** Supporting chapter for this step: related, but not part of the production flow. */
  extra?: { pt: string; en: string; path: string }
  /** Drawing and colour used by the home flow; see `stage-visuals.ts`. */
  icon: StageIconName
  accent: StageAccent
}

export const CHAIN_UPSTREAM: ChainNode[] = [
  {
    pt: 'Quartzo + MG-Si',
    en: 'Quartz + MG-Si',
    path: '/mineracao-mg-si',
    icon: 'crystal',
    accent: 'raw',
  },
  { pt: 'Polissilício', en: 'Polysilicon', path: '/polissilicio', icon: 'column', accent: 'refine' },
  {
    pt: 'Lingote e wafer',
    en: 'Ingot and wafer',
    path: '/fabricacao-wafers',
    icon: 'wafer',
    accent: 'wafer',
    extra: { pt: 'Estrutura e tipos', en: 'Crystal structure', path: '/estrutura-wafers' },
  },
]

export const CHAIN_SOLAR_BRANCH: ChainNode[] = [
  {
    pt: 'Células e módulos',
    en: 'Cells and modules',
    path: '/celulas-solares',
    icon: 'solar',
    accent: 'solar',
  },
]

export const CHAIN_CHIP_BRANCH: ChainNode[] = [
  {
    pt: 'Fotolitografia',
    en: 'Photolithography',
    path: '/fotolitografia',
    icon: 'mask',
    accent: 'fab',
    extra: {
      pt: 'História da fotolitografia',
      en: 'History of photolithography',
      path: '/historia-fotolitografia',
    },
  },
  {
    pt: 'Transistores',
    en: 'Transistors',
    path: '/transistores',
    icon: 'transistor',
    accent: 'device',
  },
]

/** Labels shared by both consumers. */
export const CHAIN_LABELS = {
  title: { pt: 'Na cadeia do silício', en: 'In the silicon chain' },
  fork: { pt: 'o wafer se divide em dois destinos', en: 'the wafer forks into two destinations' },
  solar: { pt: 'fotovoltaica', en: 'photovoltaics' },
  chip: { pt: 'semicondutores', en: 'semiconductors' },
} as const
