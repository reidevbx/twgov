# 快速開始

## CDN 引入（無需建置工具）

最簡單的方式，適合一般政府網站直接使用。一個 `<script>` 即包含所有元件。

```html
<!-- 引入 token（可選，元件有 fallback 值） -->
<link rel="stylesheet" href="https://unpkg.com/@gov-tw/tokens/tokens.css">

<!-- 引入元件庫 -->
<script src="https://unpkg.com/@gov-tw/web-components/dist/gov-tw.iife.js"></script>

<!-- 直接使用 -->
<twgov-button>送出</twgov-button>
<twgov-checkbox label="我同意服務條款"></twgov-checkbox>
```

## npm 安裝（有建置工具的專案）

適用於使用 bundler（Vite、Webpack 等）的前端專案。

```bash
npm install @gov-tw/web-components
```

```js
// 註冊所有元件
import '@gov-tw/web-components'

// 或只引入需要的元件
import '@gov-tw/web-components/twgov-button'
```

安裝後在 HTML 中直接使用，不限框架：

```html
<twgov-button variant="primary">送出</twgov-button>
<twgov-checkbox label="訂閱電子報"></twgov-checkbox>
```

## 只用 Token

適用於已有自己 UI 框架、但希望視覺風格一致的服務。

```bash
npm install @gov-tw/tokens
```

```css
@import '@gov-tw/tokens/tokens.css';

.my-element {
  background: var(--twgov-color-brand-primary);
  color: var(--twgov-color-text-on-primary);
  padding: var(--twgov-spacing-2) var(--twgov-spacing-4);
}
```

或直接從 CDN 引入：

```html
<link rel="stylesheet" href="https://unpkg.com/@gov-tw/tokens/tokens.css">
```

## Token + Tailwind CSS v4

適用於使用 Tailwind v4 的專案。

```css
@import '@gov-tw/tokens/tailwind.css';
```

```html
<div class="bg-twgov-bg-surface p-twgov-6 rounded-twgov-lg">
  <h2 class="text-twgov-text-primary font-twgov-sans text-twgov-xl">標題</h2>
  <twgov-button>送出</twgov-button>
</div>
```

Tailwind utility 與 Web Components 可混合使用——頁面佈局用 Tailwind，互動元件用 `<twgov-*>`。

## 客製品牌色

覆寫 token 即可改變所有元件的視覺呈現，不需要修改任何程式碼。

```css
:root {
  --twgov-color-brand-primary: #1E3A8A; /* 某機關的藍色主色 */
}
```

設計決策與元件實作分離——無論是 Web Components、Tailwind utility 或手寫 CSS，都從同一組 token 取值。
