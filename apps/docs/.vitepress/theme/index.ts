import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import './custom.css'

export default {
  ...DefaultTheme,
  Layout,
  async enhanceApp() {
    if (typeof window !== 'undefined') {
      await import('@gov-tw/web-components')
    }
  },
}
