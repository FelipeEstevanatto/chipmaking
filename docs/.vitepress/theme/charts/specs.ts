import type { ChartLabel, ChartSpec } from './types'

/** A blank category tick: the bathtub chart names only the two ends of its time axis. */
const blank: ChartLabel = { pt: '', en: '' }

/**
 * Every chart on the site, keyed by id. Markdown refers to one with
 * `<ClientOnly><DataChart chart="…" /></ClientOnly>`.
 *
 * Two rules govern the numbers here, both inherited from the chapters:
 *
 *  - a series that carries data cites its source in `sourceIds`, and the caption repeats the
 *    citation on the page;
 *  - a drawing with no data behind it is marked `schematic` and its caption says so. A synthetic
 *    curve is a memory aid, not evidence, and the reader has to be told which one they are seeing.
 */
export const CHARTS: Record<string, ChartSpec> = {
  /**
   * Material parameters published in the Ioffe NSM archive and in Sze's handbook. The split into
   * direct/indirect matters more than the exact value: it is the reason silicon needs 100× the
   * thickness to absorb the same light.
   */
  'band-gap': {
    id: 'band-gap',
    type: 'scatter',
    xLabel: { pt: 'Constante de rede (Å)', en: 'Lattice constant (Å)' },
    yLabel: { pt: 'Gap de banda (eV)', en: 'Band gap (eV)' },
    datasets: [
      {
        pt: 'Gap direto',
        en: 'Direct gap',
        color: '#2b6cb0',
        data: [
          { x: 5.653, y: 1.42, label: 'GaAs' },
          { x: 5.868, y: 1.34, label: 'InP' },
          { x: 6.482, y: 1.5, label: 'CdTe' },
          { x: 3.189, y: 3.4, label: 'GaN' },
        ],
      },
      {
        pt: 'Gap indireto',
        en: 'Indirect gap',
        color: '#e53e3e',
        data: [
          { x: 5.431, y: 1.12, label: 'Si' },
          { x: 5.658, y: 0.66, label: 'Ge' },
          { x: 3.073, y: 3.26, label: '4H-SiC' },
          { x: 3.567, y: 5.47, label: { pt: 'Diamante', en: 'Diamond' } },
        ],
      },
    ],
    caption: {
      pt: 'Materiais semicondutores no plano gap de banda × constante de rede. O silício fica no canto de gap estreito e rede grande — é vizinho do germânio, que perdeu a disputa por causa do óxido nativo.',
      en: 'Semiconductor materials on the band gap × lattice constant plane. Silicon sits in the narrow-gap, large-lattice corner — next to germanium, which lost the race over its native oxide.',
    },
    sourceIds: ['elem-ioffe', 'wbg-ioffe-sic', 'wbg-ioffe-gan', 'elem-sze'],
    slug: 'band-gap',
  },

  /**
   * Failure rate against time. Textbook shape, drawn rather than measured — see `schematic`.
   */
  bathtub: {
    id: 'bathtub',
    type: 'line',
    schematic: true,
    xLabel: { pt: 'Tempo em operação', en: 'Time in operation' },
    yLabel: { pt: 'Taxa de falhas (esquema)', en: 'Failure rate (schematic)' },
    labels: [0, blank, blank, blank, blank, blank, blank, blank, blank, { pt: '10 anos', en: '10 years' }],
    datasets: [
      {
        pt: 'Taxa instantânea',
        en: 'Instantaneous rate',
        color: '#2b6cb0',
        fill: true,
        data: [100, 60, 32, 18, 12, 10, 11, 18, 45, 130],
      },
    ],
    caption: {
      pt: 'As três regiões da curva da banheira — mortalidade infantil, vida útil e desgaste. É um esquema qualitativo, não uma medição: os eixos mostram o formato, não valores.',
      en: 'The three regions of the bathtub curve — infant mortality, useful life and wear-out. This is a qualitative sketch, not a measurement: the axes show shape, not values.',
    },
    sourceIds: ['rel-nist-bathtub'],
    slug: 'bathtub',
  },

  /**
   * Concentration by stage. Each bar is the share held by the leading supplier or group *as that
   * source defines it*, so the bars are not strictly the same statistic — the caption says so.
   * Floating ranges are used where the source publishes a range instead of a point.
   */
  'chokepoint-share': {
    id: 'chokepoint-share',
    type: 'bar',
    horizontal: true,
    xLabel: { pt: 'Participação do líder (%)', en: 'Leader share (%)' },
    yLabel: { pt: '', en: '' },
    labels: [
      { pt: 'Quartzo HPQ — Spruce Pine', en: 'HPQ quartz — Spruce Pine' },
      { pt: 'Polissilício — China', en: 'Polysilicon — China' },
      { pt: 'Wafers 300 mm — cinco maiores', en: '300 mm wafers — five largest' },
      { pt: 'Neônio grau semicondutor — Ucrânia', en: 'Semiconductor-grade neon — Ukraine' },
      { pt: 'Litografia EUV — ASML', en: 'EUV lithography — ASML' },
    ],
    datasets: [
      {
        pt: 'Faixa publicada',
        en: 'Published range',
        color: '#2b6cb0',
        data: [
          [70, 90],
          [90, 100],
          [75, 75],
          [90, 90],
          [100, 100],
        ],
      },
    ],
    caption: {
      pt: 'Quanto o líder de cada etapa detém, segundo a fonte de cada linha — as definições não são idênticas (faixa, participação em unidades, participação em volume), e por isso as barras se leem como ordem de grandeza, não como comparação exata.',
      en: 'What the leader of each stage holds, according to each row\'s own source — the definitions are not identical (range, unit share, volume share), so the bars read as orders of magnitude rather than an exact comparison.',
    },
    sourceIds: ['sibelco-hpq', 'bernreuter-market', 'nikkei-wafer-share', 'fabm-neon-2022', 'asml-euv-products'],
    slug: 'chokepoint-share',
  },

  /**
   * Lab and commercial efficiencies, all from the Fraunhofer ISE report, which is the one annual
   * source that publishes them side by side and is free to redistribute.
   */
  'pv-efficiency': {
    id: 'pv-efficiency',
    type: 'bar',
    horizontal: true,
    xLabel: { pt: 'Eficiência (%)', en: 'Efficiency (%)' },
    yLabel: { pt: '', en: '' },
    labels: [
      { pt: 'Módulo de silício comercial', en: 'Commercial silicon module' },
      { pt: 'Célula de laboratório (mono-Si)', en: 'Laboratory cell (mono-Si)' },
      { pt: 'Célula de perovskita (laboratório)', en: 'Perovskite cell (laboratory)' },
      { pt: 'Tandem perovskita–silício (laboratório)', en: 'Perovskite–silicon tandem (laboratory)' },
      { pt: 'Célula concentradora (laboratório)', en: 'Concentrator cell (laboratory)' },
    ],
    datasets: [
      {
        pt: 'Eficiência',
        en: 'Efficiency',
        color: '#38a169',
        data: [24.9, 27.9, 26.9, 35, 47.6],
      },
    ],
    caption: {
      pt: 'Eficiências no relatório anual do Fraunhofer ISE: o módulo que se compra e os recordes de laboratório que ainda não se compram.',
      en: 'Efficiencies from the annual Fraunhofer ISE report: the module you can buy and the laboratory records you cannot yet.',
    },
    sourceIds: ['fraunhofer-pv-report'],
    slug: 'pv-efficiency',
  },

  /**
   * Transistor counts of landmark products. The aggregation source is named in `sourceIds` because
   * no single primary document tabulates counts across four decades of vendors; the Intel 4004 is
   * cited separately from Intel's own archive.
   */
  'transistor-count': {
    id: 'transistor-count',
    type: 'line',
    toggleLogY: true,
    xLabel: { pt: 'Ano', en: 'Year' },
    yLabel: { pt: 'Transistores', en: 'Transistors' },
    labels: [1971, 1978, 1985, 1993, 2000, 2006, 2013, 2018, 2020, 2022, 2024, 2025],
    datasets: [
      {
        pt: 'Transistores por chip',
        en: 'Transistors per chip',
        color: '#2b6cb0',
        fill: true,
        data: [2300, 29000, 275000, 3100000, 42000000, 291000000, 1000000000, 18600000000, 16000000000, 76300000000, 28000000000, 92200000000],
      },
    ],
    caption: {
      pt: 'Contagem de transistores em produtos que marcaram cada época — do Intel 4004 ao silício atual. Como as três primeiras décadas não estão tabuladas em nenhuma fonte primária única, a série é uma compilação, e a tabela do capítulo nomeia cada chip e sua fonte.',
      en: 'Transistor counts of landmark products — from the Intel 4004 to current silicon. Because the first three decades are not tabulated in any single primary source, the series is a compilation, and the chapter\'s table names each chip and its source.',
    },
    sourceIds: ['dados-transistor-count', 'intel-4004', 'apple-m1', 'apple-m4', 'nvidia-ada-whitepaper', 'nvidia-blackwell-whitepaper'],
    slug: 'transistor-count',
  },

  /**
   * Poisson yield model. The curve is arithmetic, not data: it is `Y = e^(-D0·A)` evaluated over
   * the defect densities the yield literature uses, and the point of the chart is the *slope* —
   * why a die twice as large is worse than twice as costly. The x range runs to 8 cm², which is
   * where real flagship dies sit, just below the reticle limit; at D₀ = 1 the last two points round
   * to zero, which is the honest end of that curve.
   */
  'yield-vs-area': {
    id: 'yield-vs-area',
    type: 'line',
    toggleLogY: true,
    xLabel: { pt: 'Área do die (cm²)', en: 'Die area (cm²)' },
    yLabel: { pt: 'Rendimento Y = e^(−D₀A)', en: 'Yield Y = e^(−D₀A)' },
    labels: [0.05, 0.1, 0.25, 0.5, 0.75, 1, 1.5, 2, 3, 4, 6, 8],
    datasets: [
      { pt: 'D₀ = 0,05 defeito/cm²', en: 'D₀ = 0.05 defect/cm²', color: '#2f855a', data: [100, 100, 99, 98, 96, 95, 93, 90, 86, 82, 74, 67] },
      { pt: 'D₀ = 0,1', en: 'D₀ = 0.1', color: '#38a169', data: [100, 99, 98, 95, 93, 90, 86, 82, 74, 67, 55, 45] },
      { pt: 'D₀ = 0,25', en: 'D₀ = 0.25', color: '#dd6b20', data: [99, 98, 94, 88, 83, 78, 69, 61, 47, 37, 22, 14] },
      { pt: 'D₀ = 0,5', en: 'D₀ = 0.5', color: '#c53030', data: [98, 95, 88, 78, 69, 61, 47, 37, 22, 14, 5, 2] },
      { pt: 'D₀ = 1', en: 'D₀ = 1', color: '#742a2a', data: [95, 90, 78, 61, 47, 37, 22, 14, 5, 2, 0, 0] },
    ],
    caption: {
      pt: 'O modelo de Poisson do rendimento, calculado para cinco densidades de defeito. O modelo é conservador para dies grandes, e é por isso que o capítulo Na fab usa a distribuição binomial negativa; a inclinação é a lição: dobrar a área custa mais que o dobro por die bom.',
      en: 'The Poisson yield model, evaluated for five defect densities. The model is conservative for large dies, which is why the In the fab chapter uses the negative binomial distribution; the slope is the lesson: doubling the area costs more than double per good die.',
    },
    sourceIds: ['leachman-yield', 'murphy-1964'],
    slug: 'yield-vs-area',
  },

  /**
   * The same Coffee Lake die sold as two models. Silicon Lottery, an independent binning house,
   * measured retail 8700K and 8086K chips and published the share that reached each frequency. The
   * bars are the difference between consecutive published percentiles, so they are derived from
   * that table rather than measured directly.
   */
  'binning-bins': {
    id: 'binning-bins',
    type: 'bar',
    xLabel: { pt: 'Frequência máxima estável (GHz)', en: 'Highest stable frequency (GHz)' },
    yLabel: { pt: 'Fatia do lote (%)', en: 'Share of the batch (%)' },
    labels: [
      { pt: '4,8', en: '4.8' },
      { pt: '4,9', en: '4.9' },
      { pt: '5,0', en: '5.0' },
      { pt: '5,1', en: '5.1' },
      { pt: '5,2', en: '5.2' },
      { pt: '5,3', en: '5.3' },
    ],
    datasets: [
      { pt: 'Core i7-8700K', en: 'Core i7-8700K', color: '#2b6cb0', data: [1, 16, 34, 32, 13, 4] },
      { pt: 'Core i7-8086K', en: 'Core i7-8086K', color: '#ed8936', data: [0, 0, 6, 29, 50, 15] },
    ],
    caption: {
      pt: 'O mesmo die Coffee Lake em dois modelos, separados pela frequência que cada unidade aguenta. O 8086K é o lote escolhido a dedo: nenhuma unidade vendida nesse grau ficou abaixo de 5,0 GHz, e 79 % do lote caiu em 5,1 ou 5,2 GHz. As barras são a diferença entre percentis publicados, arredondados ao ponto percentual, e por isso as colunas de 4,8 e 4,9 GHz do 8086K são zero, não ausentes.',
      en: 'The same Coffee Lake die in two models, separated by the frequency each unit can hold. The 8086K is the hand-picked batch: no unit sold in that grade fell below 5.0 GHz, and 79% of the batch landed at 5.1 or 5.2 GHz. The bars are the difference between published percentiles rounded to the whole per cent, which is why the 8086K columns at 4.8 and 4.9 GHz are zero rather than missing.',
    },
    sourceIds: ['siliconlottery-stats', 'tomshardware-8086k'],
    slug: 'binning-bins',
  },
}

export const chartIds = Object.keys(CHARTS)
