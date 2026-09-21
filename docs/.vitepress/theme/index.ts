import DefaultTheme from 'vitepress/theme'
import DiagramFigure from './DiagramFigure.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('DiagramFigure', DiagramFigure)
  },
}
