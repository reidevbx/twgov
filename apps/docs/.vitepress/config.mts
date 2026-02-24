import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-TW',
  title: 'GOV.TW Design System',
  description: '為台灣政府數位服務打造的設計系統',

  head: [
    ['link', { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' }],
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' }],
    ['link', { rel: 'manifest', href: '/site.webmanifest' }],
  ],

  vite: {
    resolve: {
      conditions: ['source'],
    },
  },

  vue: {
    template: {
      compilerOptions: {
        isCustomElement: (tag) => tag.startsWith('twgov-'),
      },
    },
  },

  themeConfig: {
    logo: { light: '/logo-light.svg', dark: '/logo-dark.svg' },
    siteTitle: false,

    nav: [
      { text: '快速開始', link: '/getting-started' },
      { text: '設計原則', link: '/principles/' },
      { text: '基礎', link: '/foundations/architecture' },
      { text: '元件', link: '/components/button' },
    ],

    sidebar: [
      {
        text: '快速開始',
        items: [
          { text: '安裝與使用', link: '/getting-started' },
        ],
      },
      {
        text: '設計原則',
        items: [
          { text: '總覽', link: '/principles/' },
          { text: '原則一：以使用者為中心', link: '/principles/people-first' },
          { text: '原則二：無障礙與包容性', link: '/principles/everyone-counts' },
          { text: '原則三：降低使用者負擔', link: '/principles/simplicity-is-designed' },
          { text: '原則四：一致性與可預期性', link: '/principles/trust-through-consistency' },
          { text: '原則五：資料驅動的持續改善', link: '/principles/keep-improving' },
          { text: '原則六：開放與協作', link: '/principles/work-in-the-open' },
        ],
      },
      {
        text: '服務標準',
        items: [
          { text: '概述', link: '/standards/' },
        ],
      },
      {
        text: '基礎',
        items: [
          { text: '系統架構', link: '/foundations/architecture' },
          { text: '色彩', link: '/foundations/colour' },
          { text: '排版', link: '/foundations/typography' },
          { text: '佈局', link: '/foundations/layout' },
          { text: '間距', link: '/foundations/spacing' },
        ],
      },
      {
        text: '元件',
        items: [
          { text: 'Button 按鈕', link: '/components/button' },
          { text: 'Checkbox 核取方塊', link: '/components/checkbox' },
          { text: 'Text Input 文字輸入', link: '/components/text-input' },
          { text: 'Fieldset 欄位群組', link: '/components/fieldset' },
          { text: 'Textarea 多行文字輸入', link: '/components/textarea' },
        ],
      },
      {
        text: '模式',
        items: [
          { text: '概述', link: '/patterns/' },
        ],
      },
      {
        text: '治理',
        items: [
          { text: '概述', link: '/governance/' },
        ],
      },
    ],

    search: {
      provider: 'local',
    },

    outline: {
      label: '本頁內容',
    },

    docFooter: {
      prev: '上一頁',
      next: '下一頁',
    },

    darkModeSwitchLabel: '佈景主題',
    sidebarMenuLabel: '選單',
    returnToTopLabel: '回到頂部',
  },
})
