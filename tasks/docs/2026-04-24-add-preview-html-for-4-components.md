# 補齊 checkbox / fieldset / link / textarea 的獨立預覽頁面

## 問題分析

- `pnpm check:components` 回報 4 個已有 docs 的元件缺 `apps/docs/public/preview/<name>/` 目錄
- 依 CLAUDE.md「獨立預覽頁面」規範：每個元件的每個 demo 都應該有對應 `preview/<component>/<variant>.html`，並在 docs 的 `<DemoBlock>` 以 `preview` prop 連接
- 目前只有 `button` 與 `radio` 兩個元件完整符合此規範

## 需求定義

為 checkbox、fieldset、link、textarea 四個元件補齊：

1. 對應 `apps/docs/public/preview/<name>/*.html` 預覽頁面（扣除純狀態展示的 `no-code` DemoBlock）
2. 在 docs 的每個 `<DemoBlock>` 加上 `preview="/preview/<name>/<variant>.html"` 屬性

### 驗收標準

- `pnpm check:components` 對這 4 個元件不再報「缺 preview HTML」
- 每個預覽 HTML 開啟後能正確渲染（含 light / dark 色彩、互動可用）
- 所有有 code 的 DemoBlock 都附 `preview` 屬性，按「在新分頁開啟」可導向對應檔案

## 實作計劃

Demo → HTML 對照（共 16 個檔）：

| 元件 | 變體 | 檔名 |
|---|---|---|
| checkbox | 基本用法 | `default.html` |
| checkbox | Slot 標籤 | `slot.html` |
| fieldset | 基本用法 | `default.html` |
| fieldset | 含提示文字 | `hint.html` |
| fieldset | 錯誤狀態 | `error.html` |
| link | 基本用法 | `default.html` |
| link | 段落中的連結 | `paragraph.html` |
| link | 不顯示已造訪狀態 | `no-visited.html` |
| link | 無底線連結 | `no-underline.html` |
| link | 開新視窗的連結 | `new-tab.html` |
| textarea | 基本用法 | `default.html` |
| textarea | 含提示文字 | `hint.html` |
| textarea | 字數限制 | `character-count.html` |
| textarea | 調整行數 | `rows.html` |
| textarea | 錯誤狀態 | `error.html` |
| textarea | 停用狀態 | `disabled.html` |

步驟：

- [ ] 以 `preview/button/default.html` 為樣板，建立 checkbox 2 檔
- [ ] 建立 fieldset 3 檔
- [ ] 建立 link 5 檔
- [ ] 建立 textarea 6 檔
- [ ] 更新 4 份 docs 的 `<DemoBlock>` 加 `preview` 屬性
- [ ] `pnpm check:components` 驗證
- [ ] `pnpm dev` 手動驗各頁「在新分頁開啟」連結與渲染

## 影響範圍

- **新增**：`apps/docs/public/preview/{checkbox,fieldset,link,textarea}/*.html`（16 檔）
- **修改**：`apps/docs/components/{checkbox,fieldset,link,textarea}.md`（加 preview 屬性）
- **不異動**：元件原始碼、token、scaffolder

## 總結

### 完成項目

- ✅ checkbox：2 個 preview HTML（default、slot）+ docs 加 preview 屬性
- ✅ link：5 個 preview HTML（default、paragraph、no-visited、no-underline、new-tab）+ docs 加 preview 屬性
- ✅ textarea：6 個 preview HTML（default、hint、character-count、rows、error、disabled）+ docs 加 preview 屬性
- ⏸ fieldset：本輪暫緩 —— 執行中發現 `fieldset.md` 的 demo 使用 prop 形式（`legend="..."` `hint="..."`），與元件實作（僅支援 named slot）及 CLAUDE.md 規範不一致。需先修正 docs 與元件 API 對齊，才補 preview HTML
- ✅ `pnpm check:components` 缺漏數由 9/11 降至 6/11

### 變更檔案

- `apps/docs/public/preview/checkbox/default.html`、`slot.html` — 新增
- `apps/docs/public/preview/link/{default,paragraph,no-visited,no-underline,new-tab}.html` — 新增（5 檔）
- `apps/docs/public/preview/textarea/{default,hint,character-count,rows,error,disabled}.html` — 新增（6 檔）
- `apps/docs/components/checkbox.md` — 2 處 DemoBlock 加 `preview` 屬性
- `apps/docs/components/link.md` — 5 處 DemoBlock 加 `preview` 屬性
- `apps/docs/components/textarea.md` — 6 處 DemoBlock 加 `preview` 屬性

### 後續建議

- **建立 `bugs/2026-04-24-fix-fieldset-docs-slot-api.md`**：把 fieldset.md 三個 demo（基本、hint、error）改用 named slot（`<h2 slot="legend">` / `<p slot="hint">`）形式，對齊元件實作與 CLAUDE.md 規範。完成後回頭補 3 個 preview HTML 並加 preview 屬性
- 佈局元件（cluster / container / stack / sidebar）與 input 目前完全缺 docs，建議另起 feature 任務
- check-components 腳本目前只檢查 preview 目錄是否存在，不檢查各 variant 是否齊全；若要更嚴格可擴充 script 解析 docs 內 `preview="..."` 屬性做對照
