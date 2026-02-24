# 系統架構

本設計系統由兩個核心套件組成，透過 design token 串連。

```
packages/
├── tokens/                 ← Design Token（JSON → CSS）
│   ├── tokens.json         ← 唯一的設計決策來源
│   ├── build.js            ← JSON → CSS custom properties + Tailwind theme
│   ├── tokens.css          ← 產出的 CSS 變數
│   └── tailwind.css        ← Tailwind v4 theme 整合
│
└── web-components/         ← UI 元件庫（Lit Web Components）
    ├── src/                ← TypeScript 原始碼
    │   ├── gov-button.ts
    │   ├── gov-checkbox.ts
    │   └── index.ts
    └── dist/               ← 建置產出（npm / CDN 使用）
        ├── *.js            ← ESM 模組
        ├── *.d.ts          ← TypeScript 型別宣告
        └── gov-tw.iife.js  ← CDN 用單一打包檔
```

---

## Design Token（`@gov-tw/tokens`）

Design token 是整個系統的**單一事實來源**。所有視覺決策——色彩、間距、圓角、字型——都定義在 `tokens.json` 中，再透過建置腳本轉換為 CSS custom properties。

```
tokens.json  →  build.js  →  tokens.css       （CSS custom properties）
（設計決策）    （轉換器）  └→  tailwind.css    （Tailwind v4 @theme）
```

### 命名規則

所有 token 以 `--twgov-{類別}-{名稱}` 命名：

| 類別 | 範例 | 說明 |
|------|------|------|
| `color` | `--twgov-color-brand-primary` | 色彩 |
| `spacing` | `--twgov-spacing-4` | 間距（4px 倍數） |
| `radius` | `--twgov-radius-md` | 圓角 |
| `font` | `--twgov-font-sans` | 字型與字級 |

### Token 分類

- **全域 token**：跨元件共用的基礎值（`--twgov-color-brand-primary`、`--twgov-spacing-4`）
- **語意 token**：描述用途而非數值（`--twgov-color-text-on-primary`、`--twgov-color-feedback-error`）
- **元件 token**：元件內部使用的私有變數（如 `--_shadow-color`，以 `_` 前綴標示）

### 使用方式

直接引入 CSS custom properties：

```css
@import '@gov-tw/tokens/tokens.css';

.my-element {
  color: var(--twgov-color-text-primary);
  padding: var(--twgov-spacing-4);
  border-radius: var(--twgov-radius-md);
  font-family: var(--twgov-font-sans);
}
```

### Tailwind v4 整合

若專案使用 Tailwind CSS v4，可改為引入 `tailwind.css`，將 token 註冊為 Tailwind theme 變數：

```css
/* 專案的主 CSS 檔案 */
@import '@gov-tw/tokens/tailwind.css';
```

引入後即可使用 Tailwind utility class：

```html
<button class="bg-twgov-brand-primary text-twgov-text-on-primary
               px-twgov-4 py-twgov-2 rounded-twgov-md font-twgov-sans">
  送出
</button>
```

對應關係：

| Token | Tailwind utility | 範例 |
|-------|-----------------|------|
| `--twgov-color-brand-primary` | `bg-twgov-brand-primary` | 背景色 |
| `--twgov-color-text-on-primary` | `text-twgov-text-on-primary` | 文字色 |
| `--twgov-spacing-4` | `p-twgov-4`、`m-twgov-4`、`gap-twgov-4` | 間距 |
| `--twgov-radius-md` | `rounded-twgov-md` | 圓角 |
| `--twgov-font-sans` | `font-twgov-sans` | 字型 |

`tailwind.css` 內部引入了 `tokens.css`，因此不需要重複引入。

---

## Web Components（`@gov-tw/web-components`）

UI 元件以 [Lit](https://lit.dev/) 建構，封裝為標準 Web Components。透過 Vite 建置，產出 ESM 模組（npm 使用）與 IIFE 單檔（CDN 使用），Lit runtime 已打包其中，使用者不需另外安裝。

### 為什麼選擇 Web Components

- **框架無關**：原生瀏覽器標準，可在 React、Vue、Angular 或純 HTML 中使用
- **Shadow DOM 封裝**：樣式不會洩漏、也不會被外部覆蓋
- **與 token 的連結**：CSS custom properties 可穿透 Shadow DOM，元件從外部讀取 token 值
- **零依賴使用**：CDN 版本只需一個 `<script>` 標籤即可使用

### 元件如何讀取 Token

元件內部透過 `var()` 引用 token，並提供 fallback 值：

```css
/* gov-button 內部樣式 */
button {
  font-family: var(--twgov-font-sans, system-ui, sans-serif);
  padding: var(--twgov-spacing-2, 8px) var(--twgov-spacing-4, 16px);
  background: var(--twgov-color-brand-primary, #0D7A4A);
}
```

這代表：
1. 頁面有引入 `tokens.css` 時，元件使用 token 定義的值
2. 沒有引入時，元件仍能正常運作（使用 fallback 值）
3. 各機關可以覆寫 token 值來客製品牌色，不需要修改元件程式碼

---

## 資料流

```
tokens.json          ← 設計師與開發者共同維護
  │
  ├─→ build.js ─┬→ tokens.css      ← 純 CSS custom properties
  │             └→ tailwind.css    ← Tailwind v4 @theme 整合
  │
  └─→ web-components 透過 var() 讀取 token
        │
        ├─→ vite build ─┬→ dist/*.js          ← ESM（npm install）
        │               ├→ dist/*.d.ts        ← TypeScript 型別
        │               └→ dist/gov-tw.iife.js ← IIFE（CDN <script>）
        │
        ├── <gov-button>
        ├── <gov-checkbox>
        └── ...
```

`@gov-tw/tokens` 沒有程式執行期依賴——產出就是 CSS 檔案。`@gov-tw/web-components` 的 Lit runtime 已打包進產出，使用者不需另外安裝 Lit。在樣式層透過 CSS custom properties 讀取 token（非 npm 依賴關係）。Tailwind 整合同樣是純 CSS，不需要額外的 JavaScript 設定。

---

## 技術選型

| 領域 | 選擇 | 理由 |
|------|------|------|
| 套件管理 | pnpm workspace | 嚴格的依賴管理、磁碟效率 |
| Design Token | JSON → CSS custom properties | 簡單、瀏覽器原生支援、可穿透 Shadow DOM |
| UI 元件 | Lit Web Components | 框架無關、原生瀏覽器標準、輕量 |
| 元件建置 | Vite library mode | 產出 ESM + IIFE，支援 npm 與 CDN 兩種使用方式 |

