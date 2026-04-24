# 自動化從 md 生成元件 preview HTML

## 問題分析

### 現況
- 每個元件 demo 需維護「docs md 內 `<DemoBlock>`」與「`apps/docs/public/preview/<c>/<v>.html`」兩份相同內容
- 每個 preview HTML 重複 ~25 行 boilerplate（DOCTYPE / meta / tokens.css / iife / body styles）
- 目前已累積 16+ 個 preview HTML，檔案多、同步成本高、易漂移
- md 中要手寫 `preview="/preview/<c>/<v>.html"` 絕對路徑，易打錯

### 根因
- 沒有「單一來源」；demo 程式碼同時存在於兩處
- 手動維護 → 新增 demo 要開新檔案、手接路徑，增加認知負擔

## 需求定義

### 目標
- **單一來源**：md 是唯一的 demo 程式碼來源；preview HTML 由 build script 自動產出
- **零手動路徑**：作者只標 `variant="xxx"`，DemoBlock 自動推導預覽 URL
- **向後相容**：不改使用者端行為（「在新分頁預覽」行為一致）

### 作者端新 API

Before：
```html
<DemoBlock direction="column" preview="/preview/textarea/hint.html">
  <govtw-textarea label="申請原因" hint="..." name="reason"></govtw-textarea>
  <template #code>...</template>
</DemoBlock>
```

After：
```html
<DemoBlock direction="column" variant="hint">
  <govtw-textarea label="申請原因" hint="..." name="reason"></govtw-textarea>
  <template #code>...</template>
</DemoBlock>
```

- `variant` → DemoBlock 從當前 route path 推出 component 名，自動組 `/preview/<c>/<v>.html`
- 沒 `variant` 也沒 `preview` → 不顯示「在新分頁預覽」按鈕（例如 Checked/Disabled 狀態對照 DemoBlock）
- 保留 `preview` prop（向後相容，但不再推薦使用）

### 驗收標準
- `pnpm build:previews` 能掃描 5 份既有 component md，輸出內容等價於目前手刻的 HTML
- 改 md 後跑 `pnpm build:previews`，HTML 自動跟著變
- `pnpm check:components` 驗證：md 中每個 `variant="x"` 都對應一個 `<c>/<x>.html`
- 「在新分頁預覽」按鈕功能與目前相同

## 實作計劃

### 1. 建立 build 腳本
- [ ] `scripts/build-previews.mjs`：
  - 掃 `apps/docs/components/*.md`
  - 讀 H1（`# Button 按鈕`）→ 取中文名作 title
  - 用 regex 找 `<DemoBlock ... variant="xxx" ...>...</DemoBlock>`
  - 剝除 `<template #code>...</template>` 區塊
  - 同時解析 `direction="column"`（用於模板 flex-direction）
  - 套共用模板 → 寫至 `apps/docs/public/preview/<c>/<xxx>.html`
  - 寫入前比對內容；內容相同不覆寫（避免 mtime 無謂變動）

### 2. 共用 HTML 模板
- [ ] `scripts/preview-template.html` with `{{placeholders}}`：
  - `{{title}}`、`{{direction}}`（row/column）、`{{body}}`
  - 統一 body styles（`.demo-layout` 比照 DemoBlock.vue）
  - 引用 `/tokens.css` + `/gov-tw.iife.js`、`<meta name="color-scheme" content="light dark">`

### 3. DemoBlock 擴充
- [ ] `apps/docs/.vitepress/theme/DemoBlock.vue`：
  - 新增 `variant` prop
  - 用 `useRoute()` 取當前 path（`/components/button`）→ 推 `/preview/button/<variant>.html`
  - `preview` prop 優先於 `variant`（保留向後相容）

### 4. 遷移既有 md
- [ ] 5 份 md 把 `preview="/preview/<c>/<v>.html"` 全換成 `variant="v"`：
  - button.md（4 處）
  - radio.md（5 處）
  - checkbox.md（2 處）
  - link.md（5 處）
  - textarea.md（6 處）

### 5. 刪除手寫 preview HTML
- [ ] 刪掉 `apps/docs/public/preview/` 下全部 `.html`（共 22 檔）
- [ ] 跑 `pnpm build:previews` 重新生成
- [ ] 視覺對照（`git diff` 或 `pnpm dev`）確認輸出等價

### 6. 整合到 build pipeline
- [ ] `package.json` 加 `"build:previews": "node scripts/build-previews.mjs"`
- [ ] `"build"` 腳本前置 `build:previews`（放 `sync:public` 之前或之後擇一，看相依）

### 7. 升級 check 腳本
- [ ] `scripts/check-components.mjs`：
  - 除了目錄存在，對每個 md 內的 `variant="x"` 檢查 `<c>/<x>.html` 是否存在
  - 若 md 內無任何 `variant` 或 `preview`，視同無 preview 需求（不報缺）

### 8. 文件更新
- [ ] `CLAUDE.md` 的「獨立預覽頁面」段落：改述 md 為單一來源、說明 `variant` 用法、`build:previews` 流程
- [ ] scaffolder（`new-component.mjs`）：先不動（後續任務）

## 影響範圍

**新增**
- `scripts/build-previews.mjs`
- `scripts/preview-template.html`

**修改**
- `apps/docs/.vitepress/theme/DemoBlock.vue` — 加 variant prop
- `apps/docs/components/{button,radio,checkbox,link,textarea}.md` — preview → variant
- `scripts/check-components.mjs` — 檢查 variant 對應
- `package.json` — 新 script 與 build pipeline
- `CLAUDE.md` — 文件更新

**刪除 + 重建**
- `apps/docs/public/preview/{button,radio,checkbox,link,textarea}/*.html`（22 檔，自動重生）

**不異動**
- 元件原始碼
- tokens
- VitePress config

## 風險與對策

| 風險 | 對策 |
|---|---|
| Regex 解析 md 漏 edge case | 先從最窄的 `<DemoBlock ...variant="x"...>` 匹配；不支援的情境直接 throw，不默默略過 |
| 生成檔與手寫檔 diff 不一致 | Task 5 做視覺對照、git diff review |
| dev mode 改 md 後 preview 過期 | 本輪先手動 `pnpm build:previews`；後續再接 VitePress watch hook |
| 誤刪 button/radio 的 default.html 導致 dev 404 | 先做 script，跑通再刪舊檔 |

## 總結

### 完成項目

- ✅ `scripts/build-previews.mjs`（~90 行）+ `scripts/preview-template.html`
- ✅ DemoBlock 加 `variant` prop，透過 `useRoute()` 自動推 `/preview/<c>/<v>.html`；保留 `preview` prop 向後相容
- ✅ 5 份 md 共 22 處 `preview="..."` → `variant="..."` 遷移完成
- ✅ `pnpm build:previews` 加進 `pnpm build` pipeline（sync:public 之後、docs build 之前）
- ✅ `check:components` 升級為「md 有多少 variant 就檢查多少 HTML」
- ✅ CLAUDE.md 獨立預覽頁面段落、指令清單、新增元件步驟同步更新
- ✅ 完整 `pnpm build` 跑通；VitePress SSR 渲染出的 `<a href="/preview/.../x.html">` 在 5 個元件頁全部正確
- ✅ `pnpm lint` 乾淨
- ✅ build-previews 腳本 idempotent（第二次跑全部「未變」）

### 變更檔案

- `scripts/build-previews.mjs` — 新增
- `scripts/preview-template.html` — 新增
- `scripts/check-components.mjs` — 以 variant 對應取代目錄存在檢查
- `apps/docs/.vitepress/theme/DemoBlock.vue` — 加 variant prop、用 useRoute 推 previewUrl、保留 preview prop
- `apps/docs/components/{button,radio,checkbox,link,textarea}.md` — `preview=` → `variant=`
- `apps/docs/public/preview/**/*.html` — 重新生成（視為 build 產物，但繼續 commit）
- `package.json` — 新增 `build:previews` script，加入 build pipeline
- `CLAUDE.md` — 獨立預覽頁面段落、指令列表、新增元件步驟

### 成效

- 新增 demo 的作者成本：**開 3 個檔 → 只改 1 個 md**
- 每個 preview 的 boilerplate：**25 行手寫 → 0（模板化）**
- 22 檔 preview HTML 自動生成；未來新元件只要 md 加 `<DemoBlock variant="x">` 就自動有對應 HTML 與「在新分頁預覽」按鈕

### 後續建議

- **scaffolder 更新**（另起 refactor 任務）：`new-component.mjs` 不再產 `preview/<name>/default.html`；改為 md 骨架內放 `<DemoBlock variant="default">`，preview 交 build-previews 自動生成
- **dev watch**（選配優化）：在 VitePress dev server 偵測 `components/*.md` 變動時自動跑 `build-previews`，讓 `pnpm dev` 期間改 demo 不必手動 rebuild
- **fieldset**：現在不阻塞，但 docs 的 demo 與元件 API（prop vs slot）仍需另起 bug 任務對齊
- **`.gitattributes`**：若想讓 PR diff 忽略 preview HTML 變動，可加 `apps/docs/public/preview/*.html linguist-generated=true`
