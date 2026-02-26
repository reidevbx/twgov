import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import DemoBlock from './DemoBlock.vue'
import './custom.css'

export default {
  ...DefaultTheme,
  Layout,
  async enhanceApp({ app }: Parameters<NonNullable<Theme['enhanceApp']>>[0]) {
    app.component('DemoBlock', DemoBlock)
    if (typeof window !== 'undefined') {
      await import('@gov-tw/web-components')
    }
  },
}
