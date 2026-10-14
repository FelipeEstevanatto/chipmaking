/**
 * The seven modules of the fab loop, as data for `FabProcess.vue`.
 *
 * The same shape as `furnace-stages.ts`, but the drawing is different: instead of a cast of atoms,
 * each module animates a **cross-section of the wafer**, so what the reader sees is the layer stack
 * itself changing. The choreography of each beat — which way the beam travels, how the oxide splits
 * around the original surface, how the ALD film follows a trench wall — lives in `fab-scene.ts`,
 * keyed by `mode`. This file carries only the words and the order.
 *
 * Every number a stage prints is a physical quantity (a temperature, a thickness, a depth). Values
 * are locale-free on purpose — a formula, a count, a unit — so that a Portuguese word cannot reach
 * the English page. The prose that explains them is localised here and rendered by the component.
 */

/** Which process the cross-section shows for this module. */
export type FabMode = 'furnace' | 'deposit' | 'coat' | 'etch' | 'implant' | 'cmp' | 'measure'

/** One line of the live readout the scene prints while a process runs. */
export interface FabReadout {
  id: string
  value: string
}

/**
 * The labels of the readout rows. A stage only knows its ids and numbers; the words live here,
 * paired, so the panel reads in the reader's language.
 */
export const READOUT_LABELS: Record<string, { pt: string; en: string }> = {
  temperature: { pt: 'Temperatura', en: 'Temperature' },
  oxidant: { pt: 'Oxidante', en: 'Oxidant' },
  oxide: { pt: 'Óxido', en: 'Oxide' },
  cycles: { pt: 'Ciclos ALD', en: 'ALD cycles' },
  gpc: { pt: 'Por ciclo', en: 'Per cycle' },
  film: { pt: 'Filme', en: 'Film' },
  spin: { pt: 'Rotação', en: 'Spin' },
  resist: { pt: 'Fotoresistor', en: 'Photoresist' },
  bake: { pt: 'Recozimento', en: 'Bake' },
  wavelength: { pt: 'Comprimento de onda', en: 'Wavelength' },
  dose: { pt: 'Dose', en: 'Dose' },
  cd: { pt: 'Dimensão crítica', en: 'Critical dimension' },
  depth: { pt: 'Profundidade', en: 'Depth' },
  selectivity: { pt: 'Seletividade', en: 'Selectivity' },
  gas: { pt: 'Gás', en: 'Gas' },
  energy: { pt: 'Energia', en: 'Energy' },
  range: { pt: 'Alcance', en: 'Range' },
  tilt: { pt: 'Inclinação', en: 'Tilt' },
  pressure: { pt: 'Pressão', en: 'Pressure' },
  rate: { pt: 'Taxa', en: 'Rate' },
  removed: { pt: 'Removido', en: 'Removed' },
  points: { pt: 'Pontos', en: 'Points' },
  precision: { pt: 'Precisão', en: 'Precision' },
}

export interface FabPhase {
  /** Seconds into the module at which this phase begins. */
  at: number
  label: { pt: string; en: string }
}

export interface FabStage {
  id: string
  mode: FabMode
  /** Short label for the module list. */
  tab: { pt: string; en: string }
  /** One line naming what the module does. */
  title: { pt: string; en: string }
  /** What happens to the wafer, in one or two sentences. */
  caption: { pt: string; en: string }
  /** The physical detail or constraint that makes the process work. */
  note: { pt: string; en: string }
  /** The sub-steps of the module, in order, each with the second it begins. */
  phases: FabPhase[]
}

export const FAB_STAGES: FabStage[] = [
  {
    id: 'oxidation',
    mode: 'furnace',
    phases: [
      { at: 0, label: { pt: 'Aquecimento', en: 'Heat up' } },
      { at: 0.5, label: { pt: 'Regime linear', en: 'Linear regime' } },
      // x reaches A here, so the growth stops being reaction-limited.
      { at: 2.9, label: { pt: 'Regime parabólico', en: 'Parabolic regime' } },
    ],
    tab: { pt: 'Oxidação', en: 'Oxidation' },
    title: {
      pt: 'O silício cresce o próprio isolante',
      en: 'Silicon grows its own insulator',
    },
    caption: {
      pt: 'O wafer entra num forno com vapor de água e o próprio silício da superfície se converte em SiO₂. A camada não fica só por cima: ela avança para dentro e para fora, e a superfície original acaba no meio dela.',
      en: 'The wafer goes into a furnace with steam and the silicon at the surface turns into SiO₂. The layer does not sit only on top: it moves both inwards and outwards, and the original surface ends up in the middle of it.',
    },
    note: {
      pt: 'Crescimento de Deal–Grove (1965), x² + A·x = B·t. Enquanto o óxido é fino, a reação manda e o crescimento é linear no tempo; quando ele engrossa, o oxidante precisa difundir por dentro dele e o crescimento passa a ser parabólico. A água penetra o óxido muito melhor que o oxigênio, então a oxidação úmida é a via rápida, para óxidos grossos; o oxidante seco fica para a porta, onde o óxido precisa ser fino e limpo.',
      en: 'Deal–Grove growth (1965), x² + A·x = B·t. While the oxide is thin the reaction runs it and growth is linear in time; once it thickens the oxidant must diffuse through it and growth turns parabolic. Water permeates the oxide far better than oxygen, so wet oxidation is the fast route, for thick oxides; the dry oxidant is kept for the gate, where the oxide has to be thin and clean.',
    },
  },
  {
    id: 'deposition',
    mode: 'deposit',
    phases: [{ at: 0, label: { pt: 'Crescimento conforme', en: 'Conformal growth' } }],
    tab: { pt: 'Deposição', en: 'Deposition' },
    title: {
      pt: 'Material chega átomo a átomo',
      en: 'Material arrives atom by atom',
    },
    caption: {
      pt: 'A ALD manda um precursor por ciclo e para sozinha: quando os sítios da superfície se esgotam, precursor a mais não deposita nada. A espessura passa a depender só do número de ciclos, e sai igual em tudo o que está exposto.',
      en: 'ALD sends in one precursor per cycle and stops by itself: once the surface sites are used up, more precursor deposits nothing. Thickness then depends only on the number of cycles, and comes out the same on everything exposed.',
    },
    note: {
      pt: 'O filme é uma barreira de difusão, a camada fina que separa o silício do metal que ainda vem. A trincheira não nasceu aqui: quem a abriu foi a litografia e a corrosão de uma volta anterior do laço. Como cada ciclo cobre tudo o que está exposto, a espessura sai igual no topo, na parede e no fundo; um processo direcional como o PVD cobriria o topo e deixaria o fundo quase nu.',
      en: 'The film is a diffusion barrier, the thin layer that separates the silicon from the metal still to come. The trench was not made here: lithography and etching opened it in an earlier lap of the loop. Because each cycle coats whatever is exposed, the thickness comes out the same on the top, the wall and the floor; a directional process such as PVD would coat the top and leave the floor almost bare.',
    },
  },
  {
    id: 'lithography',
    mode: 'coat',
    phases: [
      { at: 0, label: { pt: 'Dispensa', en: 'Dispense' } },
      { at: 1.6, label: { pt: 'Spin coating', en: 'Spin coat' } },
      { at: 4.6, label: { pt: 'Soft bake', en: 'Soft bake' } },
      { at: 6.2, label: { pt: 'Exposição', en: 'Expose' } },
      { at: 8.8, label: { pt: 'Revelação', en: 'Develop' } },
    ],
    tab: { pt: 'Litografia', en: 'Lithography' },
    title: {
      pt: 'O desenho vira máscara',
      en: 'The drawing becomes a mask',
    },
    caption: {
      pt: 'Uma gota de fotoresistor cai no centro e o wafer gira para espalhá-la numa película fina. Depois a máscara desce, a luz ultravioleta imprime o padrão e a revelação dissolve o que foi exposto. A luz desenhada aqui é o DUV de 193 nm.',
      en: 'A drop of photoresist lands at the centre and the wafer spins to spread it into a thin film. Then the mask comes down, ultraviolet light prints the pattern and development dissolves what was exposed. The light drawn here is the 193 nm DUV line.',
    },
    note: {
      pt: 'A espessura da película cai com a raiz da rotação: quanto mais rápido o wafer gira, mais fino o filme, e é a relação clássica do spin coating. O comprimento de onda depende da camada: as poucas mais críticas vão para o EUV de 13,5 nm, e todo o resto continua no DUV de 193 nm.',
      en: 'The film thickness falls with the square root of the spin speed: the faster the wafer spins, the thinner the film, which is the classic spin-coating relation. The wavelength depends on the layer: the few most critical ones go to EUV at 13.5 nm, and everything else stays on 193 nm DUV.',
    },
  },
  {
    id: 'etch',
    mode: 'etch',
    phases: [
      { at: 0, label: { pt: 'Ataque', en: 'Etch' } },
      { at: 5.6, label: { pt: 'Sobreataque', en: 'Overetch' } },
    ],
    tab: { pt: 'Corrosão', en: 'Etching' },
    title: {
      pt: 'A química decide a forma',
      en: 'The chemistry decides the shape',
    },
    caption: {
      pt: 'Um plasma ataca o material só onde a máscara abriu. Os íons chegam acelerados na vertical, então as paredes saem quase retas em vez de alargarem por baixo da máscara.',
      en: 'A plasma attacks the material only where the mask opened. The ions arrive accelerated straight down, so the walls come out nearly vertical instead of widening under the mask.',
    },
    note: {
      pt: 'Um ataque úmido é isotrópico e corrói em todas as direções, abrindo o perfil além do que a litografia desenhou. O RIE junta a reatividade do plasma com o bombardeamento dos íons e é essa direção que dá a parede vertical.',
      en: 'A wet etch is isotropic and attacks in every direction, opening the profile wider than lithography drew. RIE combines the plasma’s reactivity with ion bombardment, and that direction is what gives the vertical wall.',
    },
  },
  {
    id: 'implant',
    mode: 'implant',
    phases: [
      { at: 0, label: { pt: 'Implante', en: 'Implant' } },
      { at: 5.9, label: { pt: 'Recozimento', en: 'Anneal' } },
    ],
    tab: { pt: 'Implantação', en: 'Ion implantation' },
    title: {
      pt: 'Íons entram à força',
      en: 'Ions driven in by force',
    },
    caption: {
      pt: 'Um feixe de íons penetra o silício e para a uma profundidade que depende da energia do feixe. O wafer é inclinado 7° para que nenhum íon escorregue pelos canais abertos do cristal.',
      en: 'A beam of ions drives into the silicon and stops at a depth set by the beam energy. The wafer is tilted 7° so that no ion slips down the open channels of the crystal.',
    },
    note: {
      pt: 'O impacto destrói a rede cristalina no caminho e deixa o material amorfo, onde um transistor não funciona. Um recozimento rápido devolve a ordem e ativa os dopantes, quente o bastante para reparar o cristal e curto o bastante para não espalhá-los.',
      en: 'The impact destroys the crystal lattice along the path and leaves the material amorphous, where a transistor does not work. A rapid anneal restores the order and activates the dopants, hot enough to repair the crystal and short enough not to spread them.',
    },
  },
  {
    id: 'cmp',
    mode: 'cmp',
    phases: [
      { at: 0, label: { pt: 'Polimento', en: 'Polish' } },
      { at: 6.0, label: { pt: 'Sobrepolimento', en: 'Overpolish' } },
    ],
    tab: { pt: 'Planarização', en: 'Planarisation' },
    title: {
      pt: 'O relevo vai embora',
      en: 'The relief goes away',
    },
    caption: {
      pt: 'Um pad giratório pressiona o wafer contra uma suspensão que é abrasiva e química ao mesmo tempo. O desgaste mecânico e o ataque químico juntos apagam os degraus que as camadas anteriores deixaram.',
      en: 'A spinning pad presses the wafer against a slurry that is abrasive and chemical at once. Mechanical wear and chemical attack together erase the steps the earlier layers left behind.',
    },
    note: {
      pt: 'A superfície precisa voltar a ser plana porque a litografia é fotográfica: o sistema de projeção tem profundidade de foco finita e um wafer acidentado sai fora de foco nas partes mais altas e mais baixas.',
      en: 'The surface has to be flat again because lithography is photographic: the projection system has a finite depth of focus, and a bumpy wafer falls out of focus at its highest and lowest parts.',
    },
  },
  {
    id: 'metrology',
    mode: 'measure',
    phases: [
      { at: 0, label: { pt: 'Varredura', en: 'Sweep' } },
      { at: 3.5, label: { pt: 'Controle run-to-run', en: 'Run-to-run control' } },
    ],
    tab: { pt: 'Metrologia', en: 'Metrology' },
    title: {
      pt: 'Medir para poder continuar',
      en: 'Measuring so you can continue',
    },
    caption: {
      pt: 'Um elipsômetro joga luz na superfície em ângulo e mede como a polarização muda ao refletir. A espessura do filme sai daí, sem tocar no wafer.',
      en: 'An ellipsometer throws light at the surface at an angle and measures how the polarisation changes on reflection. The film thickness comes out of that, without touching the wafer.',
    },
    note: {
      pt: 'A medida não serve só para rejeitar: ela volta para dentro do processo. O controle run-to-run compara o resultado com o modelo, atualiza o modelo e calcula um ajuste de receita para os próximos wafers.',
      en: 'The measurement is not only for rejecting: it goes back into the process. Run-to-run control compares the result with the model, updates the model and works out a recipe adjustment for the next wafers.',
    },
  },
]

/** How long the scene takes to play a module through, in milliseconds. */
export const STAGE_DURATION: Record<FabMode, number> = {
  furnace: 8000,
  deposit: 8000,
  coat: 12000,
  etch: 8000,
  implant: 10000,
  cmp: 8000,
  measure: 8000,
}

const BY_MODE = new Map<FabMode, FabStage>(FAB_STAGES.map((stage) => [stage.mode, stage]))

/** The phase script of a module: where each sub-step begins and what it is called. */
export function stagePhases(mode: FabMode): FabPhase[] {
  return BY_MODE.get(mode)?.phases ?? []
}
