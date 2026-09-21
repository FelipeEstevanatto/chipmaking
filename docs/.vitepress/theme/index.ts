import DefaultTheme from 'vitepress/theme'
import DiagramFigure from './DiagramFigure.vue'
import YouTubeEmbed from './YouTubeEmbed.vue'
import UsgsProductionChart from './UsgsProductionChart.vue'
import TransistorCompare from './TransistorCompare.vue'
import Cite from './Cite.vue'
import SourceNote from './SourceNote.vue'
import RefList from './RefList.vue'
import UsgsMcsLinks from './UsgsMcsLinks.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('DiagramFigure', DiagramFigure)
    app.component('YouTubeEmbed', YouTubeEmbed)
    app.component('UsgsProductionChart', UsgsProductionChart)
    app.component('TransistorCompare', TransistorCompare)
    app.component('Cite', Cite)
    app.component('SourceNote', SourceNote)
    app.component('RefList', RefList)
    app.component('UsgsMcsLinks', UsgsMcsLinks)
  },
}
