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
    title: 'Silicon processing: from quartz to crystalline silicon solar cells',
    publisher: 'Xakalashe & Tangstad — Southern African Pyrometallurgy 2011, SAIMM',
    url: 'https://pyrometallurgy.co.za/Pyro2011/Papers/083-Xakalashe.pdf',
    short: 'Xakalashe & Tangstad (2011)',
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
  {
    key: 'intel-4004',
    num: 17,
    title: "Intel's First Microprocessor — the Intel 4004",
    publisher: 'Intel Museum (arquivo)',
    url: 'https://web.archive.org/web/20091226202754/http:/www.intel.com/museum/archives/4004.htm',
    short: 'Intel 4004',
  },
  {
    key: 'intel-chmos3',
    num: 18,
    title: 'A double layer metal CHMOS III technology',
    publisher: 'IEDM 1984 (Intel)',
    url: 'https://doi.org/10.1109/iedm.1984.190640',
    short: 'Intel CHMOS III',
  },
  {
    key: 'intel-p856',
    num: 19,
    title: 'Intel Technology Journal — the 0.25 µm P856 process',
    publisher: 'Intel, 1998',
    url: 'https://www.intel.com/content/dam/www/public/us/en/documents/research/1998-vol02-iss-3-intel-technology-journal.pdf',
    short: 'Intel P856',
  },
  {
    key: 'voldman-esd',
    num: 20,
    title: 'Evolution, Revolution, and Technology Scaling — The Impact on ESD and EOS Reliability',
    publisher: 'Frontiers in Materials, 2018',
    url: 'https://www.frontiersin.org/journals/materials/articles/10.3389/fmats.2018.00033/full',
    short: 'Voldman (2018)',
  },
  {
    key: 'ibm-cell',
    num: 21,
    title: 'Introduction to the Cell multiprocessor',
    publisher: 'IBM Journal of R&D, 2005',
    url: 'https://www.mirrorservice.org/sites/www.bitsavers.org/pdf/ibm/IBM_Journal_of_Research_and_Development/494/kahle.pdf',
    short: 'IBM JRD (Cell, SOI)',
  },
  {
    key: 'intel-90nm',
    num: 22,
    title: 'Intel Introduces Pentium 4 Processors on High-Volume 90-nanometer Manufacturing Technology',
    publisher: 'Intel (comunicado, 2004)',
    url: 'https://www.intel.com/pressroom/archive/releases/2004/20040202comp.htm',
    short: 'Intel 90 nm',
  },
  {
    key: 'intel-45nm',
    num: 23,
    title: "Intel's Fundamental Advance in Transistor Design Extends Moore's Law",
    publisher: 'Intel (comunicado, 2007)',
    url: 'https://www.intel.com/pressroom/archive/releases/20071111comp.htm',
    short: 'Intel 45 nm Hi-k',
  },
  {
    key: 'intel-trigate',
    num: 24,
    title: 'Intel Reinvents Transistors Using New 3-D Structure',
    publisher: 'Intel (comunicado, 2011)',
    url: 'https://www.intc.com/news-events/press-releases/detail/655/intel-reinvents-transistors-using-new-3-d-structure',
    short: 'Intel Tri-Gate',
  },
  {
    key: 'techinsights-22fdx',
    num: 25,
    title: 'Synaptics AS-370 SmartAudio Processor — GlobalFoundries 22 nm FDSOI (22FDX) process',
    publisher: 'TechInsights',
    url: 'https://www.techinsights.com/products/ace-2001-802',
    short: 'TechInsights (22FDX)',
  },
  {
    key: 'techinsights-gaa',
    num: 26,
    title: 'MicroBT KF1978E Whatsminer M56S++ Samsung SF3E Process Flow Analysis',
    publisher: 'TechInsights',
    url: 'https://www.techinsights.com/blog/microbt-kf1978e-whatsminer-m56s-samsung-sf3e-process-flow-analysis',
    short: 'TechInsights (GAA)',
  },
  {
    key: 'tsmc-n2',
    num: 27,
    title: '2nm Technology (N2) — first-generation nanosheet transistor',
    publisher: 'TSMC',
    url: 'https://www.tsmc.com/english/dedicatedFoundry/technology/logic/l_2nm',
    short: 'TSMC N2',
  },
  {
    key: 'imec-forksheet',
    num: 28,
    title: 'Outer wall forksheet: bridging nanosheet and CFET device architectures',
    publisher: 'imec',
    url: 'https://www.imec-int.com/en/articles/outer-wall-forksheet-bridge-nanosheet-and-cfet-device-architectures-logic-technology',
    short: 'imec forksheet',
  },
  {
    key: 'intel-18a',
    num: 29,
    title: 'CES 2026: Intel Core Ultra Series 3 Debuts as First Built on Intel 18A',
    publisher: 'Intel (comunicado, 2026)',
    url: 'https://www.intc.com/news-events/press-releases/detail/1757/ces-2026-intel-core-ultra-series-3-debuts-as-first-built',
    short: 'Intel 18A',
  },
  {
    key: 'verisilicon-fdsoi',
    num: 30,
    title: 'VeriSilicon launches FD-SOI wireless IP platform for IoT and consumer electronics',
    publisher: 'TechToday',
    url: 'https://techtoday.co/verisilicon-launches-fd-soi-wireless-ip-platform-for-iot-consumer-electronics/',
    short: 'VeriSilicon (FD-SOI)',
  },
  {
    key: 'pv-mfg-polysilicon',
    num: 31,
    title: 'Polysilicon Production',
    publisher: 'PV-Manufacturing.org',
    url: 'https://pv-manufacturing.org/silicon-production/polysilicon-production/',
    short: 'PV-Manufacturing.org',
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
