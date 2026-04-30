# 快速開始

::: warning 🚧 開發中
本專案目前處於早期開發階段，**套件尚未發布至 npm / CDN**。以下安裝指令為預定的使用方式，正式發布前請以本地開發模式試用。
:::

## 本地開發試用

```bash
git clone https://github.com/reidevbx/govtw.git
cd govtw
pnpm install
pnpm dev
```

## CDN 引入（無需建置工具）

::: info 尚未發布
以下 CDN 路徑將於正式發布後可用。
:::

最簡單的方式，適合一般政府網站直接使用。一個 `<script>` 即包含所有元件。

```html
<!-- 引入 token（可選，元件有 fallback 值） -->
<link rel="stylesheet" href="https://unpkg.com/@gov-tw/tokens/tokens.css">

<!-- 引入元件庫 -->
<script src="https://unpkg.com/@gov-tw/web-components/dist/gov-tw.iife.js"></script>

<!-- 直接使用 -->
<govtw-button>送出</govtw-button>
<govtw-checkbox label="我同意服務條款"></govtw-checkbox>
```

## npm 安裝（有建置工具的專案）

::: info 尚未發布
以下套件名稱將於正式發布後可用。
:::

適用於使用 bundler（Vite、Webpack 等）的前端專案。

```bash
npm install @gov-tw/web-components
```

```js
// 註冊所有元件
import '@gov-tw/web-components'

// 或只引入需要的元件
import '@gov-tw/web-components/govtw-button'
```

安裝後在 HTML 中直接使用，不限框架：

```html
<govtw-button variant="primary">送出</govtw-button>
<govtw-checkbox label="訂閱電子報"></govtw-checkbox>
```

## 只用 Token

::: info 尚未發布
以下套件名稱將於正式發布後可用。
:::

適用於已有自己 UI 框架、但希望視覺風格一致的服務。

```bash
npm install @gov-tw/tokens
```

```css
@import '@gov-tw/tokens/tokens.css';

.my-element {
  background: var(--govtw-color-brand-primary);
  color: var(--govtw-color-text-on-primary);
  padding: var(--govtw-spacing-2) var(--govtw-spacing-4);
}
```

或直接從 CDN 引入：

```html
<link rel="stylesheet" href="https://unpkg.com/@gov-tw/tokens/tokens.css">
```

## Token + Tailwind CSS v4

::: info 尚未發布
以下套件名稱將於正式發布後可用。
:::

適用於使用 Tailwind v4 的專案。

```css
@import '@gov-tw/tokens/tailwind.css';
```

```html
<div class="bg-govtw-bg-surface p-govtw-6 rounded-govtw-lg">
  <h2 class="text-govtw-text-primary font-govtw-sans text-govtw-xl">標題</h2>
  <govtw-button>送出</govtw-button>
</div>
```

Tailwind utility 與 Web Components 可混合使用——頁面佈局用 Tailwind，互動元件用 `<govtw-*>`。

## 客製品牌色

覆寫 token 即可改變所有元件的視覺呈現，不需要修改任何程式碼。

```css
:root {
  --govtw-color-brand-primary: #1E3A8A; /* 某機關的藍色主色 */
}
```

設計決策與元件實作分離——無論是 Web Components、Tailwind utility 或手寫 CSS，都從同一組 token 取值。
