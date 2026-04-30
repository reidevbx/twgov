# 新增 Inset Text 元件

參考 [GOV.UK Inset Text](https://design-system.service.gov.uk/components/inset-text/)。

## 問題分析

Inset Text 用於把次要說明、補充資訊、引述等內容與周圍內文做視覺區隔。視覺特徵：左側粗邊框 + 內距。**不**用於警告、法律、緊急訊息（那些用 Warning Text）。

### GOV.UK 規格摘要

- 容器：`<div class="govuk-inset-text">…</div>`
- 左邊框：10px solid，functional border 灰
- 上下 margin：30/40px（響應式）
- padding：15px
- `clear: both`
- 內部 `:first-child { margin-top: 0 }`、`:last-child { margin-bottom: 0 }`
- 無變體
- 無 ARIA、無特殊語意（純視覺區塊）

## 需求定義

- 一個 variant（與 GOV.UK 一致，不增不減）
- 內容用 default `<slot>` 接受任意 HTML（段落、清單、連結等）
- 視覺對齊我們的 token 體系（border、spacing、color）
- 左邊框、padding、margin 走 component token，方便覆寫
- 不需要 ARIA（純視覺；輔助科技讀內部 `<p>` 即可）
- 無 disabled / readonly / variant 切換
- WCAG 2.2 AA：邊框與背景對比 ≥3:1（依 1.4.11 Non-text Contrast）

## 待您拍板的設計選項

### 1. 邊框寬度

GOV.UK 用 10px（他們 body 19px → 比例約 53%）。我們 body 16px。三選一：

| 選項 | 寬度 | 觀感 |
|---|---|---|
| A | **5px** | 細，較融於版面 |
| B | **8px** ← 我建議 | 中，比例接近 GOV.UK |
| C | **10px** | 粗，與 GOV.UK 一致 |

### 2. 邊框顏色

| 選項 | 來源 | 視覺 |
|---|---|---|
| A | `--govtw-color-border-default`（blue.4）← 我建議 | 與設計系統 border 一致 |
| B | `--govtw-color-border-subtle`（neutral.3） | 更淡，可能太弱 |
| C | `--govtw-color-text-secondary`（neutral.7） | 中性灰，最接近 GOV.UK 觀感 |

### 3. 上下 margin

GOV.UK 用 30/40px（響應式）。我們的 spacing scale：6=24px、8=32px、10=40px。

| 選項 | 值 |
|---|---|
| A | `spacing.6` (24px)|
| B | **`spacing.8` (32px)** ← 我建議 |
| C | `spacing.10` (40px) |

padding 與 spacing 一致用 `spacing.4`（16px），padding 沒爭議。

## 實作計劃

1. `pnpm new:component inset-text --type=basic --zh-name="補充說明"`
2. 補寫 `govtw-inset-text.ts`：
   - 無 properties（純展示元件）
   - `<slot>` 接內容
   - CSS：`:host { display: block }` + `border-left` + padding + margin + `:first-child/:last-child` margin reset（透過 `::slotted`）
3. `tokens.json` 新增 `inset-text` component tokens：`border-color`、`border-width`、`padding`、`margin-y`
4. 補 docs `apps/docs/components/inset-text.md`：
   - 概述（含「何時不使用 — 用 Warning Text」提醒，但 Warning Text 還沒做，先不放連結）
   - DemoBlock variants：`default`（單段）、`with-paragraphs`（多段+連結）
   - 屬性表（無屬性）、無障礙說明、設計指引
5. **scaffolder 補完**：手動加 `vite.config.ts` entry（已知缺漏）
6. `pnpm build`、`pnpm check:components`、`pnpm lint`

## 影響範圍

- 新增：`packages/web-components/src/govtw-inset-text.ts`
- 更新：`index.ts`、`package.json` exports（scaffolder）
- 更新：`vite.config.ts`（手動補）
- 更新：`tokens.json` 新增 `inset-text` 區塊
- 新增：`apps/docs/components/inset-text.md`
- 自動產出：`apps/docs/public/preview/inset-text/*.html`
- 更新：`apps/docs/.vitepress/config.mts` sidebar（scaffolder，會用 Chinese-first 格式）

## 設計決策

- 邊框寬度 **8px**：GOV.UK 用 10px（其 body 19px），按比例縮成 8px 配我們 16px body
- 邊框顏色 `border.default`（blue.4）：與設計系統 border 體系一致；dark 主題自動切到 neutral.9
- 上下 margin `spacing.8`（32px）：取 GOV.UK 30/40px 中段
- padding `spacing.4`（16px）：對應 GOV.UK 15px
- 純展示元件：無屬性、無事件、無 ARIA，內容用 default slot
- `::slotted(:first-child) margin-top: 0` / `:last-child margin-bottom: 0`：避免內容首尾 margin 與 inset-text 自身 padding 疊加形成雙倍空隙

## 總結

### 完成項目

- `pnpm new:component inset-text --type=basic --zh-name="補充說明"` 跑 scaffolder
- 手動補 `vite.config.ts` entry（已知 scaffolder 缺漏）
- 手動修 sidebar entry：scaffolder 產出「InsetText」（無空格），改為「Inset Text」對齊既有「Text Input」風格
- `tokens.json` 新增 `inset-text` component tokens：`border-color` / `border-width` / `padding` / `margin-y`
- `govtw-inset-text.ts` 實作（極簡：~45 行）
- `inset-text.md` 文件：兩個 DemoBlock（default、with-paragraphs）含連結混用、無障礙、設計指引含「何時不使用 → Warning Text」
- `pnpm build:tokens` / `build:components` / `build:previews` / `sync:public` 全綠
- `pnpm check:components` 通過
- `pnpm lint` 通過

### 變更檔案

- 新增 `packages/web-components/src/govtw-inset-text.ts`
- 更新 `packages/web-components/src/index.ts`（scaffolder）
- 更新 `packages/web-components/package.json` exports（scaffolder）
- 更新 `packages/web-components/vite.config.ts`（手動補）
- 更新 `packages/tokens/tokens.json`（inset-text 區塊）
- 自動產出：`tokens.css` / `tailwind.css`、`dist/govtw-inset-text.{js,d.ts}`（1.11 kB / gzip 0.59 kB）
- 新增 `apps/docs/components/inset-text.md`
- 自動產出：`apps/docs/public/preview/inset-text/{default,with-paragraphs}.html`
- 更新 `apps/docs/.vitepress/config.mts` sidebar（scaffolder + 手動修空格）

### 後續備忘

- **scaffolder 累積待修兩件事**：
  1. 不更新 `vite.config.ts` entry（pagination 時記過）
  2. sidebar 英文名直接用 PascalCase，沒插空格 — 對「Inset Text / Text Input」這種複合詞會錯。建議在 `scripts/new-component.mjs` 把 PascalName 切回空格隔開的 Title Case，或對 `--zh-name` 同時收 `--en-name` 覆寫
- **設計待補**：Warning Text 元件（inset-text 的「何時不使用」段落引用了它，但目前還沒有頁面）
