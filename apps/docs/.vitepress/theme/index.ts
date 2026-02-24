import DefaultTheme from 'vitepress/theme'
import './custom.css'

export default {
  ...DefaultTheme,
  async enhanceApp() {
    if (typeof window !== 'undefined') {
      await import('@gov-tw/web-components')
    }
  },
}
