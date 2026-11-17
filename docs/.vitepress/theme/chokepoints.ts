/**
 * The chokepoints of the silicon chain, as data.
 *
 * One home for the list that the `gargalos` page shows twice: `ChokepointMap.vue` renders it as a
 * clickable map with the full text, and the `chokepoint-share` chart in `charts/specs.ts` reads the
 * labels and shares from here, so the two cannot drift. Each entry carries the `citations.ts` key
 * behind its share.
 *
 * `share` is the value or lower bound the source gives, in percent; `range` adds the upper bound
 * where the source gives an interval. The definitions differ by row (range, unit share, volume
 * share), which the chart caption says.
 */
export interface Chokepoint {
  id: string
  stage: { pt: string; en: string }
  /** Short label for the chart axis: stage and leader. */
  chartLabel: { pt: string; en: string }
  leader: { pt: string; en: string }
  concentration: { pt: string; en: string }
  breaks: { pt: string; en: string }
  /** Locale-relative path of the chapter that explains the stage. */
  chapter: string
  share: number
  range?: [number, number]
  sourceIds: string[]
}

export const CHOKEPOINTS: Chokepoint[] = [
  {
    id: 'hpq',
    stage: { pt: 'Quartzo de alta pureza (HPQ)', en: 'High-purity quartz (HPQ)' },
    chartLabel: { pt: 'Quartzo HPQ (Spruce Pine)', en: 'HPQ quartz (Spruce Pine)' },
    leader: { pt: 'Spruce Pine, EUA (Sibelco e The Quartz Corp)', en: 'Spruce Pine, USA (Sibelco and The Quartz Corp)' },
    concentration: { pt: '70 a 90% do quartzo de alta pureza do mundo', en: "70 to 90% of the world's high-purity quartz" },
    breaks: {
      pt: 'Os cadinhos de crescimento Czochralski de toda a indústria, e sem cadinho não há lingote',
      en: 'The Czochralski growth crucibles of the whole industry, and without a crucible there is no ingot',
    },
    chapter: '/mineracao-mg-si',
    share: 70,
    range: [70, 90],
    sourceIds: ['construction-physics-spruce-pine'],
  },
  {
    id: 'mgsi',
    stage: { pt: 'Silício metalúrgico (MG-Si)', en: 'Metallurgical silicon (MG-Si)' },
    chartLabel: { pt: 'Silício metalúrgico (China)', en: 'Metallurgical silicon (China)' },
    leader: { pt: 'China', en: 'China' },
    concentration: {
      pt: 'cerca de 87% da produção mundial (4.800 de 5.500 mil t em 2024)',
      en: 'about 87% of world output (4,800 of 5,500 kt in 2024)',
    },
    breaks: { pt: 'A carga dos fornos de refino a montante', en: 'The charge of the upstream refining furnaces' },
    chapter: '/mineracao-mg-si',
    share: 87,
    sourceIds: ['usgs-mcs-2026'],
  },
  {
    id: 'poly',
    stage: { pt: 'Polissilício', en: 'Polysilicon' },
    chartLabel: { pt: 'Polissilício (China)', en: 'Polysilicon (China)' },
    leader: { pt: 'China', en: 'China' },
    concentration: { pt: 'mais de 90% do volume global em 2023', en: 'more than 90% of global volume in 2023' },
    breaks: { pt: 'O insumo tanto do wafer quanto da célula solar', en: 'The feedstock of both the wafer and the solar cell' },
    chapter: '/polissilicio',
    share: 90,
    sourceIds: ['bernreuter-market'],
  },
  {
    id: 'wafers',
    stage: { pt: 'Wafers de silício', en: 'Silicon wafers' },
    chartLabel: { pt: 'Wafers (duas maiores, Japão)', en: 'Wafers (top two, Japan)' },
    leader: { pt: 'Japão (Shin-Etsu e SUMCO)', en: 'Japan (Shin-Etsu and SUMCO)' },
    concentration: {
      pt: '44,1% para as duas maiores; as cinco maiores somam cerca de três quartos',
      en: '44.1% for the top two; the top five hold about three quarters',
    },
    breaks: { pt: 'A lâmina de partida de toda fab do planeta', en: 'The starting wafer of every fab on the planet' },
    chapter: '/estrutura-wafers',
    share: 44.1,
    sourceIds: ['nikkei-wafer-share'],
  },
  {
    id: 'euv',
    stage: { pt: 'Litografia EUV', en: 'EUV lithography' },
    chartLabel: { pt: 'Litografia EUV (ASML)', en: 'EUV lithography (ASML)' },
    leader: { pt: 'ASML (Holanda)', en: 'ASML (Netherlands)' },
    concentration: { pt: 'fornecedora única', en: 'sole supplier' },
    breaks: { pt: 'As camadas críticas dos nós de ponta', en: 'The critical layers of leading-edge nodes' },
    chapter: '/fotolitografia',
    share: 100,
    sourceIds: ['asml-euv-products'],
  },
  {
    id: 'neon',
    stage: { pt: 'Neônio', en: 'Neon' },
    chartLabel: { pt: 'Neônio, oferta mundial (Ucrânia)', en: 'Neon, world supply (Ukraine)' },
    leader: { pt: 'Ucrânia', en: 'Ukraine' },
    concentration: {
      pt: 'cerca de metade do neônio mundial em 2022, e até 90% das importações dos EUA',
      en: 'about half of world neon in 2022, and up to 90% of US imports',
    },
    breaks: { pt: 'Os lasers de excímero da litografia DUV', en: 'The excimer lasers of DUV lithography' },
    chapter: '/insumos-fab',
    share: 50,
    sourceIds: ['usitc-neon-2022'],
  },
]
