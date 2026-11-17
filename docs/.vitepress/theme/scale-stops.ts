/**
 * The stops of `ScaleExplorer.vue`: one cited dimension per level, from the wafer to the atom.
 *
 * Every size is printed somewhere else on the site with the same source; this module only puts them
 * on one ruler. Sizes are in metres. The die's side is the square root of its published area, which
 * the label says.
 */
export interface ScaleStop {
  id: string
  label: { pt: string; en: string }
  what: { pt: string; en: string }
  metres: number
  sourceIds: string[]
}

export const SCALE_STOPS: ScaleStop[] = [
  {
    id: 'wafer',
    label: { pt: 'Wafer de 300 mm', en: '300 mm wafer' },
    what: { pt: 'diâmetro', en: 'diameter' },
    metres: 0.3,
    sourceIds: ['semi-m1'],
  },
  {
    id: 'die',
    label: { pt: 'Die TU102 (754 mm²)', en: 'TU102 die (754 mm²)' },
    what: { pt: 'lado de um quadrado da mesma área', en: 'side of a square of the same area' },
    metres: Math.sqrt(754) / 1000,
    sourceIds: ['nvidia-ada-whitepaper'],
  },
  {
    id: 'gate-pitch',
    label: { pt: 'Passo de porta, chips de "5 nm"', en: 'Gate pitch, "5 nm" chips' },
    what: { pt: 'passo de porta contactada', en: 'contacted gate pitch' },
    metres: 48e-9,
    sourceIds: ['ieee-node'],
  },
  {
    id: 'metal-pitch',
    label: { pt: 'Passo de metal, chips de "5 nm"', en: 'Metal pitch, "5 nm" chips' },
    what: { pt: 'passo de metal', en: 'metal pitch' },
    metres: 36e-9,
    sourceIds: ['ieee-node'],
  },
  {
    id: 'gate',
    label: { pt: 'Porta do FinFET de "22 nm" da Intel', en: 'Gate of Intel\'s "22 nm" FinFET' },
    what: { pt: 'comprimento de porta', en: 'gate length' },
    metres: 26e-9,
    sourceIds: ['ieee-node'],
  },
  {
    id: 'fin',
    label: { pt: 'Aleta do mesmo FinFET', en: 'Fin of the same FinFET' },
    what: { pt: 'largura da aleta', en: 'fin width' },
    metres: 8e-9,
    sourceIds: ['ieee-node'],
  },
  {
    id: 'lattice',
    label: { pt: 'Célula unitária do silício', en: 'Silicon unit cell' },
    what: { pt: 'constante de rede', en: 'lattice constant' },
    metres: 0.5431e-9,
    sourceIds: ['elem-ioffe'],
  },
]
