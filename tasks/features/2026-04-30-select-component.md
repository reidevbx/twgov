# 新增 Select 元件

參考 [GOV.UK Select](https://design-system.service.gov.uk/components/select/)。

## 問題分析

Select 是下拉選單表單元件，從預先定義的選項中讓使用者擇一。GOV.UK 自己的指引明確：**多數情況不要用 select**，能用 radio（≤6 項）就用 radio、能 autocomplete 就 autocomplete；select 只在「選項多到 radio 顯得擁擠、且使用者已知道想選什麼」時用。我們仍要做這個元件，但文件要把這個 guidance 寫清楚。

### GOV.UK 規格摘要

- `<label>` + 可選 hint + 可選 error message + `<select><option>…</option></select>`
- 邊框 2px、focus 時黃色 ring + 黑色粗邊框（與 text-input 一致）
- error 時左側紅色 4px 邊線 + 紅色邊框
- 無 width 變體（與 text-input 不同；select 寬度由內容/CSS 控制）
- `aria-describedby` 串接 hint / error
- 原生 `<select>`，依靠瀏覽器/作業系統的下拉 UI（不自造 listbox）

## 需求定義

- 表單參與：`formAssociated` + `ElementInternals`，原生表單可拿到值
- props：`label`、`hint`、`error`、`name`、`value`、`disabled`
- 選項 API：以 slot 接 `<option>`（HTML 原生用法，與 GOV.UK 一致）
- 派發 `change` 事件（值變動時，模仿原生 select）
- focus 樣式與 text-input 統一（共用既有 token）
- WCAG 2.2 AA：label 連動、describedby 連動、error 標示、disabled 對比

## 待您拍板的設計選項

### 1. 選項 API：slot vs props

| 選項 | 用法 | 優點 | 缺點 |
|---|---|---|---|
| **A. slot（推薦）** | `<govtw-select><option value="1">一</option></govtw-select>` | 跟 HTML 原生一致；可動態插入；無需序列化 | Shadow DOM 內 `<option>` slot 進去後，需要在 slotchange 時把 nodes 搬進內部 `<select>`（或用 light DOM `<select>`） |
| B. props 陣列 | `<govtw-select .options=${[{value, label, disabled}]}>` | 實作單純，純資料驅動 | 不能直接寫 HTML；需特別 import 才能寫 demo |
| C. 兩者皆支援 | slot 為主，無 slot 時 fallback 到 `options` prop | 彈性最高 | 兩條路徑增加維護成本 |

**我的建議：A（純 slot）**。文件 / preview HTML 直接寫 `<option>` 最直觀，跟 GOV.UK 範例一致。實作上把 slotted `<option>` clone 到 shadow DOM 內的 `<select>`（slotchange 監聽）。

### 2. 是否支援 `<optgroup>`

GOV.UK 範例沒有 optgroup，但原生 `<select>` 支援。若採方案 1A，optgroup 幾乎免費（一起 clone 進去就好）。

| 選項 | 內容 |
|---|---|
| **A. 支援（推薦）** | 同時 clone `<option>` 與 `<optgroup>`，零額外成本 |
| B. 不支援 | 只 clone `<option>`，optgroup 被忽略 |

### 3. 是否支援 width 變體（如 text-input 的 `width="20"`）

GOV.UK Select **沒有** width helpers（與 text-input 不同）。但我們既有 text-input 有，是否要對齊？

| 選項 | 內容 |
|---|---|
| **A. 不加（推薦，與 GOV.UK 一致）** | 由外層或 utility class 控寬；保持 select 簡潔 |
| B. 加（與 text-input 一致） | 多一份 token、多一組 CSS，但前後端一致 |

### 4. placeholder 樣式選項

原生 select 沒有 placeholder。慣例做法：第一個 `<option value="" disabled selected>請選擇</option>`。文件示範要不要直接給一個 helper？

| 選項 | 內容 |
|---|---|
| **A. 不做 helper（推薦）** | 文件示範用 `<option value="">請選擇</option>` 寫法即可，與 HTML 原生一致 |
| B. 加 `placeholder` prop | 元件自動插一個 disabled 的第一個 option |

## 實作計劃

1. `pnpm new:component select --type=form --zh-name="選擇清單"`
2. 補寫 `govtw-select.ts`：
   - props：`label / hint / error / name / value / disabled`
   - shadow DOM 內 `<label>` + hint + error + `<select>`
   - slotchange handler：把 light DOM 的 `<option>` / `<optgroup>` clone 到 inner `<select>`
   - `change` event：更新 `value`、`_internals.setFormValue`、re-dispatch
   - `formResetCallback`：重設 value 為初始值
   - 共用 text-input 的 focus / error 視覺（部分 token 重用，缺者新增 `--govtw-select-*`）
3. `tokens.json` 新增 `select` component tokens：
   - `border-color` / `border-radius` / `bg` / `color` / `error-color` / `focus-color` / `focus-width` / `disabled-bg` / `font-family` / `font-size` / `hint-color`
   - 都 alias 到 semantic（與 text-input 共用語意層）
4. 補 docs `apps/docs/components/select.md`：
   - 概述（**包含「先考慮 radio / autocomplete」guidance**）
   - DemoBlock variants：`default`、`with-hint`、`error`、`disabled`、`with-optgroup`（若採方案 2A）
   - 屬性表、事件表、無障礙、設計指引（何時不要用）
5. **scaffolder 補完**：手動加 `vite.config.ts` entry（已知缺漏）；sidebar 英文名手動修為「Select」（單字無空格問題）
6. `pnpm build`、`pnpm check:components`、`pnpm lint`

## 影響範圍

- 新增：`packages/web-components/src/govtw-select.ts`
- 更新：`index.ts`、`package.json` exports（scaffolder）
- 更新：`vite.config.ts`（手動補）
- 更新：`tokens.json` 新增 `select` 區塊
- 新增：`apps/docs/components/select.md`
- 自動產出：`apps/docs/public/preview/select/*.html`
- 更新：`apps/docs/.vitepress/config.mts` sidebar（scaffolder）

## 設計決策（已確認）

採用所有推薦選項：

1. **選項 API：A（slot）** — light DOM 寫 `<option>`，元件在 slotchange 時 clone 進內部 `<select>`，HTML 原生用法
2. **optgroup：A（支援）** — clone 邏輯一併處理 `<optgroup>`
3. **width：A（不加）** — 與 GOV.UK 一致，由外層控寬
4. **placeholder：A（不做 helper）** — 文件示範用 `<option value="">請選擇</option>` 慣例

## 總結

### 完成項目

- `pnpm new:component select --type=form --zh-name="選擇清單"` 跑 scaffolder
- 手動補 `vite.config.ts` entry（已知 scaffolder 缺漏）
- `tokens.json` 新增 `select` component tokens（鏡射 `text-input` 結構：font / color / bg / border / hint / error / disabled / focus）
- `govtw-select.ts` 實作（~210 行）：
  - `formAssociated` + `ElementInternals`，原生表單參與
  - hidden `<slot>` + slotchange handler，clone `<option>` / `<optgroup>` 進內部 `<select>`
  - props：`label / hint / error / name / value / autocomplete / disabled`
  - value 雙向同步：prop 變更 → 套到 select；select change → 更新 prop + dispatch
  - `formResetCallback` 透過 `defaultSelected` 還原預設選項
  - 視覺與 text-input 一致（黃色 focus ring + 黑邊、紅邊 + 左側紅線錯誤）
- `select.md` 文件：
  - 開頭 warning callout 強調「先考慮 radio / autocomplete」
  - 6 個 DemoBlock variants：default / hint / optgroup / preselected / error / disabled
  - 屬性表 / 事件表 / 無障礙 / 設計指引（何時用、何時不用）
- `pnpm build` 全綠（govtw-select.js 7.13 kB / gzip 2.35 kB）
- `pnpm lint` 通過
- `pnpm check:components` 對 govtw-select 通過（其他 4 個失敗為 pre-existing layout 元件無 docs，與本次無關）

### 變更檔案

- 新增 `packages/web-components/src/govtw-select.ts`
- 更新 `packages/web-components/src/index.ts`（scaffolder）
- 更新 `packages/web-components/package.json` exports（scaffolder）
- 更新 `packages/web-components/vite.config.ts`（手動補）
- 更新 `packages/tokens/tokens.json`（select 區塊）
- 自動產出：`tokens.css` / `tailwind.css`、`dist/govtw-select.{js,d.ts}`
- 新增 `apps/docs/components/select.md`
- 自動產出：`apps/docs/public/preview/select/{default,hint,optgroup,preselected,error,disabled}.html`
- 更新 `apps/docs/.vitepress/config.mts` sidebar（scaffolder）

### 後續備忘

- **scaffolder 仍累積待修**：vite entry 不更新（pagination、inset-text、select 三次都記過）— 應優先修 `scripts/new-component.mjs`
- **slotchange 限制**：目前只在 light DOM children 增刪時更新內部 select。若使用者只改 option 的屬性（`disabled`、`selected`），不會反映到內部 select。實務上 select 選項多為靜態，若有動態需求可加 MutationObserver，但會增加複雜度，先不做
- **未實作**：`required` prop 與 `setValidity()` 整合 — 與 text-input/textarea 對齊（它們也未做），統一改進時一併處理
- **未實作**：multiple select — GOV.UK 也沒有，單選夠用
