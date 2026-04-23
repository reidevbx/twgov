# gov.tw Design System

台灣政府數位服務設計系統，參考 GOV.UK Design System，以 Web Components 實作、VitePress 承載文件。

## 工作守則（執行任務前必讀）

⛔ **BLOCKING：未建立任務文件禁止開始寫程式碼。** 詳見 `tasks/README.md`。

### 七大守則

1. **前期分析** — 動手前在 `tasks/{分類}/YYYY-MM-DD-描述.md` 建立任務文件，寫明：問題分析、需求定義、實作計劃、影響範圍。
2. **建立任務清單** — 用 TaskCreate 列出具體、可驗證、按順序排列的步驟。
3. **確認計畫** — 向使用者確認理解無誤、方向正確，再動手。
4. **逐項執行** — 一次專注一項，完成後立即更新進度；遇阻礙立即回報。
5. **最小影響原則** — 優先修改既有檔案；避免新建檔案與重複程式碼。
6. **高層級概覽** — 向使用者說明改了哪些檔案、主要變更、為什麼這樣做。
7. **Review 總結** — 在任務文件追加「## 總結」：完成項目、變更檔案、後續建議。

### 分類

| 分類 | 用途 |
|---|---|
| `features/` | 新元件、新頁面、新功能 |
| `bugs/` | 修正錯誤行為、a11y 違規 |
| `refactor/` | 重構、結構調整（行為不變） |
| `optimization/` | 效能改善 |
| `docs/` | 文件內容更新 |
| `test/` | 新增/修正測試 |

### 不適用此守則

純諮詢問答、程式碼審查（僅閱讀）、文件查詢。

## 架構

pnpm workspace monorepo，分為 `apps/`（應用）與 `packages/`（共用套件）。

- **`packages/tokens`** — 設計 Token 的單一來源（`tokens.json` → `tokens.css` / `tailwind.css`）
- **`packages/web-components`** — Lit 3 Web Components，每個元件一個檔案
- **`apps/docs`** — VitePress 文件站台，元件頁面含 live demo

## 指令

```bash
pnpm dev             # 文件站台 dev server
pnpm build           # 建置文件站台（用於驗證）
pnpm build:tokens    # 重建 token 產出檔
```

## 命名規則

- 元件 tag：`govtw-<name>`（如 `govtw-button`）
- 元件檔案：`govtw-<name>.ts`
- CSS token 前綴：`--govtw-`
- npm scope：`@gov-tw/`
- 文件頁面：`apps/docs/components/<name>.md`

## 核心原則

### 無障礙
- WCAG 2.2 AA 為最低標準
- 互動回饋不依賴色彩作為唯一指示
- 使用原生語意化元素（`<button>`、`<input>`），不自造可聚焦元素
- 最小觸控目標 44x44px

### 元件開發
- 使用 Lit 3 + TypeScript 裝飾器
- 含可聚焦元素的元件必須設定 `delegatesFocus: true`
- 表單元件使用 `formAssociated` + `ElementInternals` 參與原生表單
- CSS 只使用 Component token（`--govtw-<component>-*`），不加 fallback 值
- Focus ring 統一用 `box-shadow`（非 `outline`），顏色 `#fd0`
- `:host` 加 `outline: none !important` 抑制瀏覽器預設 focus 框
- **元件只控制自身職責的樣式**：例如 radio 只管圓形選取器和選擇狀態，不管文字排版；fieldset 只管群組語意和佈局，不管標題/說明的字型大小顏色。文字樣式由外層段落/排版控制，透過繼承生效。
- **Fieldset 使用 slot 傳入標題與說明**：`<govtw-fieldset>` 的 legend 和 hint 透過 named slot（`slot="legend"`、`slot="hint"`）傳入，使用者自行用 `<h2>`、`<p>` 等標籤控制樣式。`error` 仍為 prop（元件負責錯誤顯示邏輯）。

### Token 架構

三層設計 Token，唯一來源是 `packages/tokens/tokens.json`，修改後須執行 `pnpm build:tokens`。

**三層結構**：
1. **Primitive（原始層）** — 原始設計數值，前綴 `--govtw-primitive-`（如 `--govtw-primitive-color-blue-500`）
2. **Semantic（語意層）** — 以用途命名，引用 Primitive 層，前綴 `--govtw-`（如 `--govtw-color-brand-primary`）
3. **Component（元件層）** — 每個元件可覆寫的 token，引用 Semantic 層，前綴 `--govtw-<component>-`（如 `--govtw-button-primary-bg`）

**主題系統**：
- 主題定義在 `tokens.json` 的 `themes` 區塊，目前有 `dark`
- dark 主題覆寫 Semantic 層變數，產出 `@media (prefers-color-scheme: dark)` 自動套用 + `[data-theme="dark"]` 手動切換
- 新增主題只需在 `themes` 下加新 key，`build.js` 會自動產生對應的 `[data-theme="<name>"]` 選擇器

**引用規則**：
- 元件 CSS 中只使用 Component token，**不加 fallback**（如 `var(--govtw-button-primary-bg)`），方便除錯
- Component token 引用 Semantic token，Semantic 引用 Primitive
- dark 主題只覆寫 Semantic 層，Component 層透過 CSS 變數繼承自動生效

**產出檔案**：
- `tokens.css` — 四段式：Primitive `:root` → Semantic `:root` → Component `:root` → Themes
- `tailwind.css` — Tailwind v4 `@theme` 整合，`@import './tokens.css'` 後映射至 Tailwind namespace

### 文件
- 語言：繁體中文（zh-TW）
- 每個元件頁面結構：概述 → 互動範例 → 狀態展示 → 使用方式 → 屬性表 → 無障礙 → 設計指引
- 元件 demo 使用 `<DemoBlock>` 元件，內部以 Shadow DOM 隔離 VitePress 樣式
- `<DemoBlock>` 透過 Vite `define` 注入 `tokens.css` 並自動替換 `:root` → `:host`、`[data-theme]` → `:host([data-theme])`
- `<DemoBlock>` 會監聽 VitePress 的 `.dark` class 變化，同步 `data-theme="dark"` 至 Shadow DOM host
- 純展示區塊（如互動狀態）使用 `<DemoBlock no-code>` 隱藏原始碼按鈕

### 獨立預覽頁面
- 每個元件的每個 demo 都要有獨立的 HTML 預覽頁面（參考 GOV.UK「Open this example in a new tab」）
- 預覽頁面放在 `apps/docs/public/preview/<component>/<variant>.html`（如 `preview/radio/default.html`）
- 每個 HTML 引用 `/tokens.css` + `/gov-tw.iife.js`，body 樣式用 token 變數（`--govtw-color-text-primary`、`--govtw-color-bg-canvas`），加 `<meta name="color-scheme" content="light dark">`
- DemoBlock 透過 `preview` prop 指定預覽 URL：`<DemoBlock preview="/preview/radio/default.html">`
- `apps/docs/public/tokens.css` 和 `apps/docs/public/gov-tw.iife.js` 是從 packages 複製來的，每次 build 後須同步更新

## 新增元件步驟

⚠️ **不要手工建立**，使用 scaffolder：

```bash
pnpm new:component <name> [--type=basic|form|layout] [--zh-name=中文名]
```

scaffolder 會自動：
- 建立 `packages/web-components/src/govtw-<name>.ts`（依 type 套用 basic / form / layout 模板）
- 建立 `apps/docs/components/<name>.md` 骨架
- 建立 `apps/docs/public/preview/<name>/default.html`
- 更新 `index.ts` export、`package.json` exports、VitePress sidebar

產生後的工作：
1. 填寫元件 `.ts` 中的 TODO 區塊（屬性、樣式、render）
2. 補 docs 頁的屬性表、事件表、無障礙說明
3. 調整 preview HTML 的示範內容
4. `pnpm build`（build 後會自動執行 `sync:public` 同步 dist 到 public）
5. `pnpm check:components` 稽核所有元件完整性

## 技術約束

- TypeScript：`experimentalDecorators: true`、`useDefineForClassFields: false`（Lit 必需）
- VitePress 需在 `config.mts` 設定 `isCustomElement: tag => tag.startsWith('govtw-')`
- Web Components 僅在 client-side 動態 import（SSR 不支援自訂元素）
- 設計參考：[GOV.UK Design System](https://design-system.service.gov.uk/)
