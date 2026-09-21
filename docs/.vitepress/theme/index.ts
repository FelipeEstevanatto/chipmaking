import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import DiagramFigure from './DiagramFigure.vue'
import YouTubeEmbed from './YouTubeEmbed.vue'
import VideoPressEmbed from './VideoPressEmbed.vue'
import UsgsProductionChart from './UsgsProductionChart.vue'
import TransistorCompare from './TransistorCompare.vue'
import TransistorTimeline from './TransistorTimeline.vue'
import Cite from './Cite.vue'
import SourceNote from './SourceNote.vue'
import RefList from './RefList.vue'
import UsgsMcsLinks from './UsgsMcsLinks.vue'
import SeeAlso from './SeeAlso.vue'
import SupplyChainMap from './SupplyChainMap.vue'
import ReadingProgress from './ReadingProgress.vue'
import DocMeta from './DocMeta.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('DiagramFigure', DiagramFigure)
    app.component('YouTubeEmbed', YouTubeEmbed)
    app.component('VideoPressEmbed', VideoPressEmbed)
    app.component('UsgsProductionChart', UsgsProductionChart)
    app.component('TransistorCompare', TransistorCompare)
    app.component('TransistorTimeline', TransistorTimeline)
    app.component('Cite', Cite)
    app.component('SourceNote', SourceNote)
    app.component('RefList', RefList)
    app.component('UsgsMcsLinks', UsgsMcsLinks)
    app.component('SeeAlso', SeeAlso)
    app.component('SupplyChainMap', SupplyChainMap)
    app.component('ReadingProgress', ReadingProgress)
    app.component('DocMeta', DocMeta)
  },
}
