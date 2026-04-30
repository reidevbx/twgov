# 新增 Pagination 元件

參考 [GOV.UK Pagination](https://design-system.service.gov.uk/components/pagination/)。

## 問題分析

設計系統目前無分頁元件。GOV.UK 規格提供兩個變體：

1. **Numbered（標準）**：適用搜尋結果、案件列表等同質性內容，含上一頁/下一頁與頁碼清單，含 ellipsis（…）邏輯
2. **Block（區塊）**：適用線性閱讀內容（如多頁指南），只顯示上一頁/下一頁並可附描述標題；垂直堆疊以利放大模式使用者

### GOV.UK 規格摘要

- 根元素：`<nav aria-label="…">`，可自訂 `landmarkLabel`
- 頁碼：`<ul>` + `<li>`，含 `aria-label="Page N"`
- 當前頁：`aria-current="page"` + `--current` modifier
- 上/下：`<a rel="prev|next">`，可省略容器（首/末頁）
- Ellipsis：`<li>…</li>`，非互動
- 響應式：小螢幕只顯示「首頁/末頁/當前頁/相鄰頁」
- 圖示：SVG 箭頭，`aria-hidden="true" focusable="false"`
- 視覺隱藏文字：「上一頁<span class="visually-hidden"> 頁</span>」

## 需求定義

- 兩個 variant：預設（numbered）、`variant="block"`
- 提供「給總頁數 + 當前頁 + URL 模板」的最小 API（最常見場景一行搞定）
- 支援 ellipsis 自動計算
- 響應式：小螢幕只保留首/末/當前±1
- 完整無障礙：nav landmark、aria-current、rel=prev/next、視覺隱藏文字
- focus 樣式對齊既有元件（黃色 focus ring，與 `<govtw-link>` 一致）
- WCAG 2.2 AA、最小觸控 44×44px

## API 設計提案（請拍板）

### 標準 numbered

```html
<govtw-pagination
  total="42"
  current="7"
  href-template="?page={n}"
></govtw-pagination>
```

- `total` 必填
- `current` 必填
- `href-template` 必填，含 `{n}` 佔位符
- `landmark-label` 可選，預設 `"頁數導覽"`

元件自動算 ellipsis、自動省略首/末頁的 prev/next 容器。

### Block

```html
<govtw-pagination
  variant="block"
  prev-href="/guide/step-3"
  prev-label="如何申辦"
  next-href="/guide/step-5"
  next-label="繳交申請費"
></govtw-pagination>
```

- `variant="block"` 必填
- `prev-href` / `next-href` 任一可省略（首頁無 prev、末頁無 next）
- `prev-label` / `next-label` 為描述標題，不填則退回預設「上一頁／下一頁」單行
- `landmark-label` 同上

### 不採用的 API

- ❌ 完整 `items` 陣列（GOV.UK 那種）：對 Web Component 而言用 `.items=${...}` 設 property 太囉嗦，多數情境用「total+current」就足夠
- ❌ 點擊 event（SPA 無 href）：本次不做，等真的有需求再加
- ❌ HTML 內塞 `<a>` 子節點 slot：與屬性式 API 並存會混淆來源優先序

## 實作計劃

1. `pnpm new:component pagination --type=basic --zh-name="分頁"` 跑 scaffolder
2. 補寫 `govtw-pagination.ts`：
   - Properties：`total`、`current`、`hrefTemplate`、`variant`、`landmarkLabel`、`prevHref`、`nextHref`、`prevLabel`、`nextLabel`
   - 算頁碼 helper：以 current 為中心，輸出 `[1, '…', 6, 7, 8, '…', 42]` 形式
   - render：依 variant 切兩條路徑
   - SVG 箭頭 inline，加 `aria-hidden focusable="false"`
   - focus / hover 樣式對齊 `<govtw-link>` 的 GOV.UK 雙色標
3. Component tokens 進 `tokens.json`：`pagination-link-color`、`pagination-current-bg`、`pagination-current-color`、`pagination-gap`、`pagination-icon-size` 等
4. 補 docs `apps/docs/components/pagination.md`：
   - 概述
   - DemoBlock variants：`default`（小總數）、`with-ellipsis`（大總數）、`first-page`、`last-page`、`block`
   - 屬性表、無障礙說明、設計指引
5. `pnpm build` → `pnpm check:components`

## 影響範圍

- 新增：`packages/web-components/src/govtw-pagination.ts`
- 更新：`packages/web-components/src/index.ts`、`package.json` exports（scaffolder）
- 更新：`packages/tokens/tokens.json` 新增 `pagination` component tokens
- 新增：`apps/docs/components/pagination.md`、`apps/docs/public/preview/pagination/*.html`
- 更新：`apps/docs/.vitepress/config.mts` sidebar（scaffolder）

## 設計決策（API）

對話中討論「SPA 無 href 的事件 API」是否該預留，最終決定**只做 href-template，不開 event API**：

- 政府網站本質要求分頁是可分享/可書籤的 URL，純 JS 分頁是反模式
- SPA 框架（Vue Router、React Router）已會攔截 `<a href>` 自走 history
- YAGNI / 最小影響原則，未來真有需求再非破壞性加上 `@page-change`

## 總結

### 完成項目

- `pnpm new:component pagination --type=basic --zh-name="分頁"` 跑 scaffolder
- `tokens.json` 新增 `pagination` component 區塊（link / current / ellipsis / label / gap / icon-size / focus）
- `govtw-pagination.ts` 完整實作：
  - 兩個 variant：`default`（numbered + ellipsis）/ `block`
  - 屬性式 API：`total` / `current` / `href-template` / `prev-href` / `next-href` / `prev-label` / `next-label` / `landmark-label`
  - 自動算頁碼：首頁、末頁、當前 ±1，中間插 ellipsis
  - 響應式：mobile 用 CSS 折疊中間頁碼，只剩首/末/當前
  - 無障礙：`<nav aria-label>` / `aria-current="page"` / `aria-label="第 N 頁"` / `rel="prev|next"` / SVG `aria-hidden focusable="false"`
  - focus / hover 樣式對齊 `<govtw-link>`（GOV.UK 黃底黑底線雙色標）
  - block 變體：垂直堆疊、上下分隔線、可附描述標題
  - 首頁／末頁時自動省略對應的上/下一頁容器
- `vite.config.ts` 補上 pagination entry（scaffolder 未自動處理）
- `pagination.md` 文件：5 個 DemoBlock variants（default / ellipsis / boundaries / block）、屬性表、無障礙、設計指引
- `pnpm build:tokens` / `build:components` / `build:previews` / `sync:public` 全綠
- `pnpm check:components` 通過（govtw-pagination 不在缺漏清單）
- `pnpm lint` 通過

### 變更檔案

- 新增 `packages/web-components/src/govtw-pagination.ts`
- 更新 `packages/web-components/src/index.ts`（scaffolder）
- 更新 `packages/web-components/package.json` exports（scaffolder）
- 更新 `packages/web-components/vite.config.ts`（手動補 entry）
- 更新 `packages/tokens/tokens.json`（pagination 區塊）
- 自動產出：`tokens.css` / `tailwind.css`、`dist/govtw-pagination.{js,d.ts}`
- 新增 `apps/docs/components/pagination.md`
- 自動產出：`apps/docs/public/preview/pagination/{default,ellipsis,boundaries,block}.html`
- 更新 `apps/docs/.vitepress/config.mts` sidebar（scaffolder）

### 後續建議

- **Scaffolder 建議補強**：scaffolder 目前漏了 `vite.config.ts` 的 entry 註冊，新元件 build 後不會產生 `.js` 檔。可在 `scripts/new-component.mjs` 加上對 vite.config.ts 的 entry 注入（與 sidebar 注入同模式）
- **可考慮新增 prop**：若日後需要 pure JS 分頁（不變 URL），再非破壞性加 `@page-change` event
- **SVG 圖示來源**：目前 path 直接取自 GOV.UK，視覺一致性高；後續若有 gov.tw 自有圖示系統，可替換
