<script setup lang="ts">
import ZoomableImage from './ZoomableImage.vue'
import { useIsEnglish } from './locale'

const isEnglish = useIsEnglish()

interface Era {
  year: string
  /** Process node, or an em dash when the era predates node naming. */
  node: string
  namePt: string
  nameEn: string
  descPt: string
  descEn: string
  src: string
  altPt: string
  altEn: string
}

const eras: Era[] = [
  {
    year: '1960',
    node: '—',
    namePt: 'MOSFET planar',
    nameEn: 'Planar MOSFET',
    descPt: 'Canal, porta, fonte e dreno no plano do wafer — a base da Lei de Moore por décadas.',
    descEn: 'Channel, gate, source and drain in the plane of the wafer — the basis of Moore’s Law for decades.',
    src: '/pdf-images/p17-1.png',
    altPt: 'Transistor MOSFET planar',
    altEn: 'Planar MOSFET transistor',
  },
  {
    year: '1963',
    node: '—',
    namePt: 'CMOS (par complementar)',
    nameEn: 'CMOS (complementary pair)',
    descPt: 'NMOS e PMOS complementares: um conduz enquanto o outro está desligado, com consumo quase nulo em repouso.',
    descEn: 'Complementary NMOS and PMOS: one conducts while the other is off, with near-zero standby power.',
    src: '/assets/cmos.svg',
    altPt: 'Corte transversal de CMOS com NMOS em poço p e PMOS em poço n',
    altEn: 'CMOS cross-section with an NMOS in a p-well and a PMOS in an n-well',
  },
  {
    year: '1968',
    node: '—',
    namePt: 'Porta de silício (autoalinhada)',
    nameEn: 'Silicon gate (self-aligned)',
    descPt: 'A porta de polissilício passa a definir a própria fonte e o dreno, eliminando a sobreposição da porta de alumínio.',
    descEn: 'A polysilicon gate now defines source and drain itself, removing the overlap of the aluminium gate.',
    src: '/assets/silicon-gate.svg',
    altPt: 'Comparação entre porta de alumínio com sobreposição e porta de silício autoalinhada',
    altEn: 'Comparison of an overlapping aluminium gate with a self-aligned silicon gate',
  },
  {
    year: '1980',
    node: '—',
    namePt: 'LDD (dreno levemente dopado)',
    nameEn: 'LDD (lightly doped drain)',
    descPt: 'Extensões levemente dopadas sob espaçadores de nitreto suavizam o campo junto ao dreno, contendo portadores quentes.',
    descEn: 'Lightly doped extensions under nitride spacers smooth the field at the drain, taming hot carriers.',
    src: '/assets/ldd.svg',
    altPt: 'Comparação entre junção convencional e estrutura LDD com espaçadores',
    altEn: 'Comparison of a conventional junction with an LDD structure with spacers',
  },
  {
    year: '1996',
    node: '0.35 µm',
    namePt: 'STI (trincheira rasa)',
    nameEn: 'STI (shallow trench)',
    descPt: 'Trincheira rasa substitui o LOCOS no isolamento: paredes verticais e sem a “boca de pássaro” que consumia área ativa.',
    descEn: 'A shallow trench replaces LOCOS for isolation: vertical walls and no “bird’s beak” eating into the active area.',
    src: '/assets/sti.svg',
    altPt: 'Comparação entre isolamento LOCOS com boca de pássaro e trincheira rasa vertical',
    altEn: 'Comparison of LOCOS isolation with a bird’s beak against a vertical shallow trench',
  },
  {
    year: '1998',
    node: '0.22 µm',
    namePt: 'SOI (silício sobre isolante)',
    nameEn: 'SOI (silicon on insulator)',
    descPt: 'Uma camada fina de silício sobre óxido enterrado isola as junções do substrato e reduz capacitâncias parasitas.',
    descEn: 'A thin silicon film on a buried oxide isolates the junctions from the substrate and cuts parasitic capacitance.',
    src: '/assets/soi.svg',
    altPt: 'Comparação entre transistor em silício maciço e transistor SOI sobre óxido enterrado',
    altEn: 'Comparison of a bulk silicon transistor with an SOI transistor on a buried oxide',
  },
  {
    year: '2003',
    node: '90 nm',
    namePt: 'Silício esticado',
    nameEn: 'Strained silicon',
    descPt: 'Estresse mecânico na rede cristalina eleva a mobilidade dos portadores em 10–20%.',
    descEn: 'Mechanical stress in the crystal lattice raises carrier mobility by 10–20%.',
    src: '/pdf-images/p16-1.png',
    altPt: 'Fluxo de elétrons em malha de silício normal e esticada',
    altEn: 'Electron flow in a normal versus a strained silicon lattice',
  },
  {
    year: '2007',
    node: '45 nm',
    namePt: 'HKMG (High-K metal gate)',
    nameEn: 'HKMG (high-K metal gate)',
    descPt: 'Dielétrico High-K e porta metálica substituem SiO₂/polissilício e bloqueiam a fuga por tunelamento.',
    descEn: 'A high-K dielectric and a metal gate replace SiO₂/polysilicon and block tunnelling leakage.',
    src: '/assets/hkmg-gate-stack.svg',
    altPt: 'Comparação entre porta de SiO₂/polissilício e porta High-K metálica',
    altEn: 'Comparison of an SiO₂/polysilicon gate with a high-K metal gate',
  },
  {
    year: '2011',
    node: '22 nm',
    namePt: 'FinFET (Tri-Gate)',
    nameEn: 'FinFET (Tri-Gate)',
    descPt: 'Canal em aleta vertical; a porta envolve três lados e reduz drasticamente a fuga.',
    descEn: 'Vertical fin channel; the gate wraps three sides and sharply cuts leakage.',
    src: '/pdf-images/p17-2.png',
    altPt: 'Transistor FinFET Tri-Gate',
    altEn: 'FinFET Tri-Gate transistor',
  },
  {
    year: '2022',
    node: '3 nm',
    namePt: 'GAAFET / nanofolhas',
    nameEn: 'GAAFET / nanosheets',
    descPt: 'Nanofolhas empilhadas envolvidas pela porta nos quatro lados; até ~40% menos vazamento.',
    descEn: 'Stacked nanosheets wrapped by the gate on all four sides; up to ~40% less leakage.',
    src: '/pdf-images/p18-1.png',
    altPt: 'Transistor GAAFET de nanofolhas',
    altEn: 'GAAFET nanosheet transistor',
  },
  {
    year: '2025/2026',
    node: '18A / N2',
    namePt: 'BSPDN (backside power)',
    nameEn: 'BSPDN (backside power)',
    descPt: 'A alimentação migra para o verso do wafer via TSVs, liberando as camadas frontais para sinal.',
    descEn: 'Power delivery moves to the wafer backside through TSVs, freeing the front layers for signal.',
    src: '/assets/bspdn.svg',
    altPt: 'Comparação entre alimentação frontal e rede de alimentação no verso do wafer',
    altEn: 'Comparison of front-side power delivery with a backside power delivery network',
  },
  {
    year: 'Futuro',
    node: '<1 nm',
    namePt: 'CFET',
    nameEn: 'CFET',
    descPt: 'NFET e PFET empilhados verticalmente na mesma célula, com até ~50% menos área por porta lógica.',
    descEn: 'NFET and PFET stacked vertically in the same cell, with up to ~50% less area per logic gate.',
    src: '/assets/cfet.svg',
    altPt: 'Comparação entre NFET e PFET lado a lado e um CFET empilhado',
    altEn: 'Comparison of an NFET and PFET side by side with a stacked CFET',
  },
]

const upcoming = (era: Era) => era.year === 'Futuro' || era.year === 'Future'
</script>

<template>
  <ol class="transistor-timeline">
    <li
      v-for="era in eras"
      :key="era.year"
      class="transistor-timeline-item"
      :class="{ 'is-upcoming': upcoming(era) }"
    >
      <span class="transistor-timeline-marker" aria-hidden="true" />
      <div class="transistor-timeline-body">
        <div class="transistor-timeline-media">
          <ZoomableImage
            :src="era.src"
            :alt="isEnglish ? era.altEn : era.altPt"
          />
        </div>
        <div class="transistor-timeline-text">
          <p class="transistor-timeline-meta">
            <span class="transistor-timeline-year">{{ isEnglish && upcoming(era) ? 'Future' : era.year }}</span>
            <span v-if="era.node !== '—'" class="transistor-timeline-node">{{ era.node }}</span>
          </p>
          <h3 class="transistor-timeline-title">{{ isEnglish ? era.nameEn : era.namePt }}</h3>
          <p class="transistor-timeline-desc">{{ isEnglish ? era.descEn : era.descPt }}</p>
        </div>
      </div>
    </li>
  </ol>
</template>

<style scoped>
.transistor-timeline {
  position: relative;
  list-style: none;
  margin: 1.75rem 0;
  padding: 0;
}

/* the rail */
.transistor-timeline::before {
  content: '';
  position: absolute;
  top: 0.5rem;
  bottom: 2.5rem;
  left: 7px;
  width: 2px;
  background: var(--vp-c-divider);
}

.transistor-timeline-item {
  position: relative;
  padding-left: 2.25rem;
  padding-bottom: 2rem;
}

.transistor-timeline-item:last-child {
  padding-bottom: 0;
}

.transistor-timeline-marker {
  position: absolute;
  left: 0;
  top: 0.35rem;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid var(--vp-c-brand-1);
  background: var(--vp-c-bg);
  box-sizing: border-box;
}

.transistor-timeline-item.is-upcoming .transistor-timeline-marker {
  border-style: dashed;
}

.transistor-timeline-body {
  display: grid;
  grid-template-columns: minmax(0, 280px) minmax(0, 1fr);
  gap: 1.25rem;
  align-items: start;
}

.transistor-timeline-media {
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 4 / 3;
  padding: 0.5rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: #fff;
  box-sizing: border-box;
}

.transistor-timeline-media :deep(.zoomable),
.transistor-timeline-media :deep(.zoomable-trigger) {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.transistor-timeline-media :deep(img) {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.transistor-timeline-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  margin: 0 0 0.35rem;
}

.transistor-timeline-year {
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: var(--vp-c-brand-1);
  text-transform: uppercase;
}

.transistor-timeline-node {
  font-size: 0.72rem;
  font-weight: 600;
  padding: 0.1rem 0.45rem;
  border-radius: 999px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
}

.transistor-timeline-title {
  margin: 0 0 0.35rem;
  font-size: 1.05rem;
  line-height: 1.35;
  border-top: none;
  padding-top: 0;
}

.transistor-timeline-desc {
  margin: 0;
  font-size: 0.925rem;
  line-height: 1.6;
  color: var(--vp-c-text-2);
}

@media (max-width: 640px) {
  .transistor-timeline-body {
    grid-template-columns: minmax(0, 1fr);
    gap: 0.85rem;
  }

  .transistor-timeline-media {
    aspect-ratio: 16 / 10;
  }
}
</style>
