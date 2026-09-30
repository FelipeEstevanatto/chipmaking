/**
 * The site's chronologies, rendered by `MilestoneRail.vue`.
 *
 * Two sets, both ordered by date and both sourced:
 *
 *  - `market` — the polysilicon market, on the timeline page. The numbers are the ones the
 *    `polissilicio` chapter publishes (demand shares from the demand inversion, plant counts and the
 *    Chinese share from the market history, the price extremes from the pork-cycle article);
 *  - `litho` — the photolithography history that closes `historia-fotolitografia`, from the mask in
 *    contact to EUV in production.
 *
 * Every entry carries the keys of `citations.ts` behind its numbers, so the rail prints the same
 * `[n]` markers as the prose and no figure reaches a page without a source.
 */

export interface Milestone {
  year: string
  /** English label, when the year itself is a phrase ("Anos 1990", "Hoje"). */
  yearEn?: string
  title: { pt: string; en: string }
  note: { pt: string; en: string }
  /** Keys of `citations.ts` behind the numbers in `note`. */
  sourceIds: string[]
}

export type MilestoneSet = 'market' | 'litho'

export const MILESTONES: Record<MilestoneSet, Milestone[]> = {
  market: [
    {
      year: '1995',
      title: { pt: 'Semicondutores dominam', en: 'Semiconductors dominate' },
      note: {
        pt: 'Cerca de 90% do polissilício vai para a indústria de chips e 10% para a fotovoltaica.',
        en: 'About 90% of polysilicon goes to the chip industry and 10% to photovoltaics.',
      },
      sourceIds: ['bernreuter'],
    },
    {
      year: '2004',
      title: { pt: 'Onze plantas no mundo', en: 'Eleven plants worldwide' },
      note: {
        pt: 'Com a explosão fotovoltaica, o ciclo do preço encurta pela metade: o intervalo entre vale e pico cai de oito para quatro anos.',
        en: 'With the photovoltaic boom, the price cycle halves: the gap between trough and peak falls from eight years to four.',
      },
      sourceIds: ['bernreuter-market'],
    },
    {
      year: '2010',
      title: { pt: '61 plantas e sobreoferta', en: '61 plants and oversupply' },
      note: {
        pt: 'A corrida solar multiplica os projetos, e mais de 40 plantas fecham entre o fim de 2010 e o início de 2013, a maioria na China.',
        en: 'The solar race multiplies projects, and more than 40 plants close between late 2010 and early 2013, most of them in China.',
      },
      sourceIds: ['bernreuter-market'],
    },
    {
      year: '2014',
      title: { pt: 'A demanda se inverte', en: 'Demand flips' },
      note: {
        pt: 'A fotovoltaica passa a consumir a maior parte da demanda, que cresce 18,4× entre 1995 e 2014.',
        en: 'Photovoltaics now takes the larger share of demand, which grows 18.4× between 1995 and 2014.',
      },
      sourceIds: ['bernreuter'],
    },
    {
      year: '2018',
      title: { pt: 'A China passa de metade do volume', en: 'China passes half the output' },
      note: {
        pt: 'O país responde por 55% do polissilício produzido no mundo.',
        en: 'The country accounts for 55% of the polysilicon produced worldwide.',
      },
      sourceIds: ['bernreuter-market'],
    },
    {
      year: '2020–2022',
      title: { pt: 'Do fundo ao pico', en: 'From the low to the peak' },
      note: {
        pt: 'O preço à vista toca o fundo de US$ 6,75/kg em junho de 2020 e o pico de US$ 39/kg em agosto de 2022. A subida inteira levou cerca de dois anos.',
        en: 'The spot price hits a low of US$ 6.75/kg in June 2020 and a peak of US$ 39/kg in August 2022. The entire climb took about two years.',
      },
      sourceIds: ['bernreuter-pork-cycle'],
    },
    {
      year: '2023',
      title: { pt: 'A China concentra a oferta', en: 'China concentrates supply' },
      note: {
        pt: 'Mais de 90% do volume global de polissilício sai do país.',
        en: 'More than 90% of global polysilicon output comes from the country.',
      },
      sourceIds: ['bernreuter-market'],
    },
  ],

  litho: [
    {
      year: '1960',
      title: { pt: 'Impressão por contato', en: 'Contact printing' },
      note: {
        pt: 'A máscara é pressionada contra o wafer. O arranjo não usa lente alguma, e o contato repetido desgasta a máscara e contamina o wafer.',
        en: 'The mask is pressed against the wafer. The arrangement uses no lens at all, and repeated contact wears the mask and contaminates the wafer.',
      },
      sourceIds: ['kato-litho'],
    },
    {
      year: '1973',
      title: { pt: 'Impressão por proximidade', en: 'Proximity printing' },
      note: {
        pt: 'Uma folga de ar separa máscara e wafer. O desgaste acaba, mas a difração piora a resolução.',
        en: 'An air gap separates mask and wafer. Wear ends, but diffraction worsens resolution.',
      },
      sourceIds: ['kato-litho'],
    },
    {
      year: '1978',
      title: { pt: 'Stepper de projeção', en: 'Projection stepper' },
      note: {
        pt: 'A GCA lança o DSW 4800: redução de 10×, lente Zeiss de 0,28 de abertura numérica, campo de 10 × 10 mm e luz de g-line (436 nm).',
        en: 'GCA launches the DSW 4800: 10× reduction, a Zeiss lens of 0.28 numerical aperture, a 10 × 10 mm field and g-line (436 nm) light.',
      },
      sourceIds: ['kato-litho'],
    },
    {
      year: 'Anos 1990',
      yearEn: 'The 1990s',
      title: { pt: 'As gerações de excímero', en: 'The excimer generations' },
      note: {
        pt: 'A i-line (365 nm) se difunde por volta de 1990; o KrF (248 nm) e o ArF (193 nm) vêm na sequência.',
        en: 'i-line (365 nm) spreads around 1990; KrF (248 nm) and ArF (193 nm) follow.',
      },
      sourceIds: ['kato-litho'],
    },
    {
      year: '1995',
      title: { pt: 'O comitê da NGL', en: 'The NGL committee' },
      note: {
        pt: 'A indústria monta um comitê para escolher a litografia de próxima geração. A favorita não era o EUV.',
        en: 'The industry forms a committee to choose the next-generation lithography. The favourite was not EUV.',
      },
      sourceIds: ['asianometry-euv'],
    },
    {
      year: '1996',
      title: { pt: 'International SEMATECH', en: 'International SEMATECH' },
      note: {
        pt: 'O programa de consenso começa a estreitar as opções, com a meta de decidir até o fim de 1997.',
        en: 'The consensus programme starts narrowing the options, with a decision due by the end of 1997.',
      },
      sourceIds: ['sematech-ngl'],
    },
    {
      year: '1998',
      title: { pt: 'O campo cai para dois', en: 'The field falls to two' },
      note: {
        pt: 'No workshop de Colorado Springs restam EUV e EPL; raio X e projeção por íons continuam fora.',
        en: 'At the Colorado Springs workshop, EUV and EPL remain; X-ray and ion projection stay out.',
      },
      sourceIds: ['sematech-ngl'],
    },
    {
      year: '2001',
      title: { pt: 'O EPL morre por vazão', en: 'EPL dies of throughput' },
      note: {
        pt: 'O último workshop ainda recomenda financiar as duas frentes, mas o EPL perde por produtividade e sobra um candidato.',
        en: 'The last workshop still recommends funding both tracks, but EPL loses on productivity and one candidate remains.',
      },
      sourceIds: ['sematech-ngl'],
    },
    {
      year: '2002',
      title: { pt: 'Imersão em água no 193 nm', en: 'Water immersion at 193 nm' },
      note: {
        pt: 'Burn Lin, então na TSMC, propõe trocar o ar entre a última lente e o wafer por água purificada, reaproveitando óptica, máscara e fotoresistor.',
        en: 'Burn Lin, then at TSMC, proposes replacing the air between the last lens and the wafer with purified water, reusing existing optics, masks and photoresists.',
      },
      sourceIds: ['lin-immersion'],
    },
    {
      year: '2003',
      title: { pt: 'O fim do 157 nm', en: 'The end of 157 nm' },
      note: {
        pt: 'Em maio a Intel abandona o 157 nm; em outubro a ASML já tem imagens do protótipo AT:1150i, e em dezembro a TSMC encomenda o XT:1250i.',
        en: 'In May Intel abandons 157 nm; by October ASML has images from the AT:1150i prototype, and in December TSMC orders the XT:1250i.',
      },
      sourceIds: ['asianometry-euv', 'lin-immersion'],
    },
    {
      year: 'Hoje',
      yearEn: 'Today',
      title: { pt: 'EUV em produção de alto volume', en: 'EUV in high-volume production' },
      note: {
        pt: 'O EUV entra em produção de alto volume, nos nós de 7 nm e abaixo.',
        en: 'EUV enters high-volume production at the 7 nm node and below.',
      },
      sourceIds: ['asianometry-euv'],
    },
  ],
}
