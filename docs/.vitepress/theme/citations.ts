export interface Citation {
  /** Stable key for <Cite id="..." /> */
  key: string
  /** Display number [1], [2], … */
  num: number
  title: string
  publisher?: string
  url?: string
  /** Short label for source lines and tooltips */
  short: string
}

const list: Citation[] = [
  {
    key: 'usgs-mcs',
    num: 1,
    title: 'Mineral Commodity Summaries — Silicon',
    publisher: 'U.S. Geological Survey (USGS)',
    url: 'https://pubs.usgs.gov/periodicals/mcs2023/mcs2023-silicon.pdf',
    short: 'USGS Mineral Commodity Summaries',
  },
  {
    key: 'sciencedirect-hpq',
    num: 2,
    title: 'High-purity quartz',
    publisher: 'ScienceDirect',
    url: 'https://www.sciencedirect.com/science/article/pii/S0009254121004502',
    short: 'ScienceDirect (HPQ)',
  },
  {
    key: 'bernreuter',
    num: 3,
    title: 'Polysilicon uses and market reports',
    publisher: 'Bernreuter Research / Wacker',
    url: 'https://www.bernreuter.com/polysilicon/uses/',
    short: 'Bernreuter Research',
  },
  {
    key: 'asml-gaa',
    num: 4,
    title: 'What is a gate-all-around transistor?',
    publisher: 'ASML',
    url: 'https://www.asml.com/en/news/stories/2022/what-is-a-gate-all-around-transistor',
    short: 'ASML',
  },
  {
    key: 'intel-strain',
    num: 5,
    title: 'Strained transistors and process technology',
    publisher: 'Intel (arquivo)',
    url: 'https://web.archive.org/web/20101125112707/https://www.intel.com/pressroom/kits/advancedtech/doodle/ref_strain/strain.htm',
    short: 'Intel (strained silicon)',
  },
  {
    key: 'zulehner-2000',
    num: 6,
    title: 'Czochralski growth of silicon',
    publisher: 'Materials Science and Engineering: B, 73(1–3), 7–15',
    short: 'Zulehner (2000)',
  },
  {
    key: 'moller-2012',
    num: 7,
    title: 'Silicon materials for solar cells',
    publisher: 'Progress in Materials Science, 57(7), 1285–1338',
    short: 'Möller (2012)',
  },
  {
    key: 'runnels-1994',
    num: 8,
    title: 'Tribology analysis of chemical-mechanical polishing',
    publisher: 'J. Electrochemical Society, 141(6), 1698',
    short: 'Runnels & Eyman (1994)',
  },
  {
    key: 'kern-1990',
    num: 9,
    title: 'The evolution of silicon wafer cleaning technology',
    publisher: 'J. Electrochemical Society, 137(6), 1887',
    short: 'Kern (1990)',
  },
  {
    key: 'pv-education',
    num: 10,
    title: 'Silicon processing — from sand to crystal',
    publisher: 'PV Education',
    url: 'https://www.pveducation.org/pvmanufacture/si-processes',
    short: 'PV Education',
  },
  {
    key: 'csiro',
    num: 11,
    title: 'Silicon and ferrosilicon production',
    publisher: 'CSIRO',
    url: 'https://www.csiro.au/',
    short: 'CSIRO',
  },
  {
    key: 'saimm',
    num: 12,
    title: 'Silicon metal production (SAIMM literature)',
    publisher: 'SAIMM',
    url: 'https://www.saimm.co.za/',
    short: 'SAIMM',
  },
  {
    key: 'elkem',
    num: 13,
    title: 'Silicon production and materials',
    publisher: 'Elkem',
    url: 'https://www.elkem.com/',
    short: 'Elkem',
  },
  {
    key: 'ratedpower',
    num: 14,
    title: 'Polysilicon production process',
    publisher: 'RatedPower',
    url: 'https://ratedpower.com/blog/polysilicon-production-process/',
    short: 'RatedPower',
  },
  {
    key: 'energy-central',
    num: 15,
    title: 'Polysilicon and semiconductor grade silicon',
    publisher: 'Energy Central',
    url: 'https://energycentral.com/',
    short: 'Energy Central',
  },
  {
    key: 'hkmg-paper',
    num: 16,
    title: 'High Performance High-K + Metal Gate Strain Enhanced Transistors on (110) S',
    publisher: 'Semantic Scholar, 2008',
    url: 'https://pdfs.semanticscholar.org/cd90/94aa1fd40650ba21d32d6b976f2f4b66a2d0.pdf',
    short: 'HKMG (Semantic Scholar)',
  },
]

export const citationsByKey = Object.fromEntries(list.map((c) => [c.key, c])) as Record<
  string,
  Citation
>

export const citationsByNum = Object.fromEntries(list.map((c) => [c.num, c])) as Record<
  number,
  Citation
>

export function getCitation(key: string): Citation | undefined {
  return citationsByKey[key]
}

export const USGS_MCS_YEARS = [2020, 2021, 2022, 2023, 2024, 2025] as const

export function usgsMcsUrl(year: number): string {
  return `https://pubs.usgs.gov/periodicals/mcs${year}/mcs${year}-silicon.pdf`
}

export const allCitations = [...list].sort((a, b) => a.num - b.num)
