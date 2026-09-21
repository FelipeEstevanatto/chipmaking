/**
 * Canonical glossary for the silicon chain.
 *
 * This module is the single source of truth for two consumers:
 *
 *  - `theme/GlossaryTable.vue`, which renders the `/glossario` and `/en/glossario` pages, and
 *  - `glossary-tooltips.ts`, the markdown-it plugin that annotates the *first* use of a term
 *    inside a chapter with its expansion.
 *
 * Keeping both off one list is what makes the Portuguese and English glossaries impossible to
 * drift apart: `pt` and `en` are both required on every entry, so the mirror rule that governs
 * `docs/` and `docs/en/` is enforced by the type checker rather than by review.
 */

/** Chapter paths are locale-relative; consumers add the `/en` prefix themselves. */
export const CHAPTER_LABELS = {
  '/introducao': { pt: 'Introdução', en: 'Introduction' },
  '/mineracao-mg-si': { pt: 'Mineração e MG-Si', en: 'Mining & MG-Si' },
  '/polissilicio': { pt: 'Polissilício', en: 'Polysilicon' },
  '/fabricacao-wafers': { pt: 'Fabricação de wafers', en: 'Wafer fabrication' },
  '/estrutura-wafers': { pt: 'Estrutura e tipos', en: 'Crystal structure' },
  '/fotolitografia': { pt: 'Fotolitografia', en: 'Photolithography' },
  '/historia-fotolitografia': {
    pt: 'História da fotolitografia',
    en: 'History of photolithography',
  },
  '/transistores': { pt: 'Evolução dos transistores', en: 'Transistor evolution' },
  '/celulas-solares': { pt: 'Células e módulos solares', en: 'Solar cells and modules' },
} as const

export type ChapterPath = keyof typeof CHAPTER_LABELS

export interface GlossaryEntry {
  /** The abbreviation as it appears in prose; also the glossary's display key. */
  term: string
  /** Portuguese expansion. */
  pt: string
  /** English expansion. */
  en: string
  /** Chapter that explains the term in depth. */
  chapter: ChapterPath
  /** Other spellings to annotate and to match in the filter, e.g. `TSVs` for `TSV`. */
  variants?: string[]
  /**
   * Whether the first use in a chapter gets the expansion tooltip. Defaults to true; set false for
   * spellings that are too ambiguous to annotate safely in running prose.
   */
  tooltip?: boolean
}

/**
 * Ordered by position in the production chain, which is how the chapters are ordered too. The
 * table sorts alphabetically for lookup; this order is only about keeping the file readable.
 */
export const GLOSSARY: GlossaryEntry[] = [
  // Raw material and refining
  {
    term: 'HPQ',
    pt: 'Quartzo de alta pureza (high-purity quartz)',
    en: 'High-purity quartz',
    chapter: '/mineracao-mg-si',
  },
  {
    term: 'MG-Si',
    pt: 'Silício grau metalúrgico (~98–99,5% Si)',
    en: 'Metallurgical-grade silicon (~98–99.5% Si)',
    chapter: '/mineracao-mg-si',
  },
  {
    term: 'UMG',
    pt: 'Silício grau metalúrgico aprimorado (upgraded metallurgical grade)',
    en: 'Upgraded metallurgical-grade silicon',
    chapter: '/polissilicio',
  },
  {
    term: 'TCS',
    pt: 'Triclorossilano (SiHCl₃), intermediário gasoso',
    en: 'Trichlorosilane (SiHCl₃), gaseous intermediate',
    chapter: '/polissilicio',
  },
  {
    term: 'SoG-Si',
    pt: 'Polissilício grau solar (7N–9N)',
    en: 'Solar-grade polysilicon (7N–9N)',
    chapter: '/polissilicio',
  },
  {
    term: 'EG-Si',
    pt: 'Polissilício grau eletrônico (10N–11N)',
    en: 'Electronic-grade polysilicon (10N–11N)',
    chapter: '/polissilicio',
  },
  {
    term: 'CVD',
    pt: 'Deposição química de vapor (ex.: processo Siemens)',
    en: 'Chemical vapour deposition (e.g. the Siemens process)',
    chapter: '/polissilicio',
  },
  {
    term: 'FBR',
    pt: 'Reator de leito fluidizado para polissilício',
    en: 'Fluidized bed reactor for polysilicon',
    chapter: '/polissilicio',
  },
  {
    term: 'SEMI',
    pt: 'Associação que publica os padrões da indústria de semicondutores',
    en: 'Body that publishes semiconductor industry standards',
    chapter: '/estrutura-wafers',
  },

  // Ingot and wafer
  {
    term: 'CZ',
    pt: 'Crescimento Czochralski de lingote monocristalino',
    en: 'Czochralski growth of a monocrystalline ingot',
    chapter: '/fabricacao-wafers',
  },
  {
    term: 'RCz',
    pt: 'Czochralski com recarga (recharge Czochralski)',
    en: 'Recharge Czochralski',
    chapter: '/fabricacao-wafers',
  },
  {
    term: 'CCz',
    pt: 'Czochralski contínuo (continuous Czochralski)',
    en: 'Continuous Czochralski',
    chapter: '/fabricacao-wafers',
  },
  {
    term: 'DWS',
    pt: 'Corte por fio diamantado (diamond wire slicing)',
    en: 'Diamond wire slicing',
    chapter: '/fabricacao-wafers',
  },
  {
    term: 'ID',
    pt: 'Serra de diâmetro interno, método de corte anterior ao fio diamantado',
    en: 'Inner-diameter saw, the slicing method that preceded diamond wire',
    chapter: '/fabricacao-wafers',
    // Bare "ID" is too ambiguous to annotate in running prose.
    tooltip: false,
  },
  {
    term: 'CMP',
    pt: 'Polimento químico-mecânico',
    en: 'Chemical-mechanical polishing',
    chapter: '/fabricacao-wafers',
  },
  {
    term: 'RCA',
    pt: 'Limpeza SC-1 / SC-2 padronizada em wafers',
    en: 'Standardised SC-1 / SC-2 wafer cleaning',
    chapter: '/fabricacao-wafers',
  },
  {
    term: 'RTP',
    pt: 'Processamento térmico rápido (rapid thermal processing)',
    en: 'Rapid thermal processing',
    chapter: '/fabricacao-wafers',
  },
  {
    term: 'Miller',
    pt: 'Notação de planos e direções cristalográficas',
    en: 'Notation for crystallographic planes and directions',
    chapter: '/estrutura-wafers',
    // A person's name, not an abbreviation — nothing to expand.
    tooltip: false,
  },

  // Lithography
  {
    term: 'DUV',
    pt: 'Ultravioleta profundo (laser de 248 nm ou 193 nm)',
    en: 'Deep ultraviolet (248 nm or 193 nm laser)',
    chapter: '/fotolitografia',
  },
  {
    term: 'EUV',
    pt: 'Ultravioleta extremo (13,5 nm)',
    en: 'Extreme ultraviolet (13.5 nm)',
    chapter: '/fotolitografia',
  },
  {
    term: 'KrF',
    pt: 'Fluoreto de criptônio, laser de 248 nm',
    en: 'Krypton fluoride, 248 nm laser',
    chapter: '/fotolitografia',
  },
  {
    term: 'ArF',
    pt: 'Fluoreto de argônio, laser de 193 nm',
    en: 'Argon fluoride, 193 nm laser',
    chapter: '/fotolitografia',
  },
  {
    term: 'SEMATECH',
    pt: 'Consórcio de pesquisa em semicondutores dos Estados Unidos',
    en: 'United States semiconductor research consortium',
    chapter: '/historia-fotolitografia',
  },
  {
    term: 'EPL',
    pt: 'Litografia por projeção de elétrons',
    en: 'Electron projection lithography',
    chapter: '/historia-fotolitografia',
  },
  {
    term: 'IPL',
    pt: 'Litografia por projeção de íons',
    en: 'Ion projection lithography',
    chapter: '/historia-fotolitografia',
  },
  {
    term: 'SCALPEL',
    pt: 'Litografia por feixe de elétrons com espalhamento limitado por ângulo',
    en: 'Scattering with angular limitation in projection electron-beam lithography',
    chapter: '/historia-fotolitografia',
  },

  // Devices
  {
    term: 'MOSFET',
    pt: 'Transistor de efeito de campo metal-óxido-semicondutor',
    en: 'Metal-oxide-semiconductor field-effect transistor',
    chapter: '/transistores',
  },
  {
    term: 'CMOS',
    pt: 'MOS complementar (um par NMOS + PMOS)',
    en: 'Complementary MOS (an NMOS/PMOS pair)',
    chapter: '/transistores',
  },
  {
    term: 'NMOS',
    pt: 'MOS de canal n',
    en: 'n-channel MOS',
    chapter: '/transistores',
  },
  {
    term: 'PMOS',
    pt: 'MOS de canal p',
    en: 'p-channel MOS',
    chapter: '/transistores',
  },
  {
    term: 'NFET',
    pt: 'Transistor de efeito de campo de canal n',
    en: 'n-channel field-effect transistor',
    chapter: '/transistores',
  },
  {
    term: 'PFET',
    pt: 'Transistor de efeito de campo de canal p',
    en: 'p-channel field-effect transistor',
    chapter: '/transistores',
  },
  {
    term: 'LOCOS',
    pt: 'Oxidação local do silício (isolamento por óxido de campo)',
    en: 'Local oxidation of silicon (field-oxide isolation)',
    chapter: '/transistores',
  },
  {
    term: 'STI',
    pt: 'Isolamento por trincheira rasa (shallow trench isolation)',
    en: 'Shallow trench isolation',
    chapter: '/transistores',
  },
  {
    term: 'LDD',
    pt: 'Dreno levemente dopado (lightly doped drain)',
    en: 'Lightly doped drain',
    chapter: '/transistores',
  },
  {
    term: 'SOI',
    pt: 'Silício sobre isolante (silicon on insulator)',
    en: 'Silicon on insulator',
    chapter: '/transistores',
  },
  {
    term: 'FD-SOI',
    pt: 'SOI totalmente depletado, com corpo ultrafino',
    en: 'Fully depleted SOI, with an ultrathin body',
    chapter: '/transistores',
  },
  {
    term: 'HKMG',
    pt: 'Portão metálico + dielétrico High-K',
    en: 'Metal gate + high-K dielectric',
    chapter: '/transistores',
  },
  {
    term: 'FinFET',
    pt: 'Transistor de aleta 3D (portão tri-lateral)',
    en: '3D fin transistor (three-sided gate)',
    chapter: '/transistores',
  },
  {
    term: 'GAAFET',
    pt: 'Transistor de portão envolvente em nanofolhas',
    en: 'Gate-all-around nanosheet transistor',
    chapter: '/transistores',
    variants: ['GAA'],
  },
  {
    term: 'BSPDN',
    pt: 'Rede de alimentação no verso do die (backside power delivery)',
    en: 'Backside power delivery network',
    chapter: '/transistores',
  },
  {
    term: 'CFET',
    pt: 'NFET/PFET empilhados verticalmente',
    en: 'Vertically stacked NFET/PFET',
    chapter: '/transistores',
  },
  {
    term: 'TSV',
    pt: 'Via de silício passante (through-silicon via)',
    en: 'Through-silicon via',
    chapter: '/transistores',
    variants: ['TSVs'],
  },

  // Photovoltaics
  {
    term: 'PERC',
    pt: 'Emissor passivado e contato traseiro (passivated emitter and rear cell)',
    en: 'Passivated emitter and rear cell',
    chapter: '/celulas-solares',
  },
  {
    term: 'PECVD',
    pt: 'Deposição química de vapor assistida por plasma',
    en: 'Plasma-enhanced chemical vapour deposition',
    chapter: '/celulas-solares',
  },
  {
    term: 'BO-LID',
    pt: 'Degradação induzida por luz do complexo boro–oxigênio',
    en: 'Boron-oxygen light-induced degradation',
    chapter: '/celulas-solares',
  },
  {
    term: 'LeTID',
    pt: 'Degradação induzida por luz e temperatura elevada',
    en: 'Light and elevated temperature induced degradation',
    chapter: '/celulas-solares',
  },
  {
    term: 'ITRPV',
    pt: 'Roteiro internacional de tecnologia para a fotovoltaica',
    en: 'International Technology Roadmap for Photovoltaics',
    chapter: '/celulas-solares',
  },

  // Cross-cutting sources
  {
    term: 'USGS',
    pt: 'Serviço Geológico dos Estados Unidos, fonte dos dados de produção',
    en: 'United States Geological Survey, source of the production data',
    chapter: '/introducao',
  },
]

/** One annotatable spelling and the expansion to show for it. */
export interface TooltipTerm {
  /** Every spelling that should be annotated: the term itself plus any variants. */
  spellings: string[]
  /** Expansion, already resolved for the target locale. */
  expansion: string
}

/** Terms eligible for first-use annotation, with the expansion for the given locale. */
export function tooltipTerms(isEnglish: boolean): TooltipTerm[] {
  return GLOSSARY.filter((entry) => entry.tooltip !== false).map((entry) => ({
    spellings: [entry.term, ...(entry.variants ?? [])],
    expansion: isEnglish ? entry.en : entry.pt,
  }))
}
