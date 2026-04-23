# 建立 Component Scaffolder（Harness Phase 1）

## 問題分析

### 現況描述
新增一個 Lit 元件需要手動建立/更新 6 個檔案：
1. `packages/web-components/src/govtw-{name}.ts`
2. `packages/web-components/src/index.ts`（加 export）
3. `packages/web-components/package.json`（加 exports entry）
4. `apps/docs/components/{name}.md`
5. `apps/docs/public/preview/{name}/default.html`
6. `apps/docs/.vitepress/config.mts`（加 sidebar 項目）

流程繁瑣，AI 容易漏掉或起手式就不符合最佳實踐（漏 `formAssociated`、漏 `declare global`、用錯 template 結構等）。

### 問題根因
沒有「標準起手式」的自動化工具。每次都由 AI 從記憶中拼湊，導致品質不穩。

## 需求定義

### 預期結果
- 一行指令：`pnpm new:component <name> [--type=basic|form|layout] [--zh-name=中文名]`
- 自動產生 3 個新檔案、更新 3 個 config 檔案
- 三種模板涵蓋專案現有元件類型：basic（如 link）、form（如 input）、layout（如 stack）
- 模板內建最佳實踐：`shadowRootOptions`、`formAssociated`、`declare global` 宣告、`PropertyValues<this>` 型別等
- 附帶 `check:components` 稽核腳本與 `sync:public` 資產同步腳本

### 驗收標準
- [x] `pnpm new:component test-widget` 成功產生 3 個檔案 + 更新 3 個 config
- [x] `pnpm new:component test-form --type=form` 產生 form-associated 模板
- [x] `pnpm new:component test-layout --type=layout` 產生 layout 模板
- [x] 產出的 TypeScript 通過 `pnpm build`
- [x] `pnpm check:components` 能偵測缺漏檔案的元件
- [x] CLAUDE.md「新增元件步驟」改為推薦 scaffolder 流程
- [x] 新增 `.claude/commands/new-component.md` slash command

## 實作計劃

- [x] 建立 `scripts/` 目錄
- [x] 撰寫 `scripts/new-component.mjs`（含三種模板、tag/class 名稱推導、6 檔案處理）
- [x] 撰寫 `scripts/check-components.mjs`（稽核所有元件完整性）
- [x] 撰寫 `scripts/sync-public-assets.mjs`（build 後同步 tokens.css + iife 至 public）
- [x] 更新 root `package.json`（新增 new:component / check:components / sync:public / build 改為自動 sync）
- [x] 更新 `CLAUDE.md` 的「新增元件步驟」改為指向 scaffolder
- [x] 建立 `.claude/commands/new-component.md`
- [x] 端到端驗證：產 dummy 元件 → 確認檔案內容 → build 通過 → 刪除 dummy → check:components 通過

## 影響範圍

- `scripts/new-component.mjs`（新建）
- `scripts/check-components.mjs`（新建）
- `scripts/sync-public-assets.mjs`（新建）
- `package.json`（root，新增 scripts）
- `CLAUDE.md`（修改「新增元件步驟」區段）
- `.claude/commands/new-component.md`（新建）

不影響：既有 11 個元件的程式碼、VitePress 既有頁面、token 系統。

## 總結

### 完成項目
- ✅ `scripts/new-component.mjs`：支援 basic / form / layout 三種模板；自動產 3 檔 + 更新 3 config（index.ts export、package.json exports、VitePress sidebar 以正規表示式插入）
- ✅ `scripts/check-components.mjs`：稽核每個 govtw-*.ts 是否具備 docs / preview / index export / package exports / sidebar link 五項，缺漏時以 exit code 1 回報
- ✅ `scripts/sync-public-assets.mjs`：複製 tokens.css 與 gov-tw.iife.js 到 `apps/docs/public/`，取代先前手動 cp 的流程
- ✅ 根 `package.json`：新增 `new:component` / `check:components` / `sync:public` 指令；`build` 流程插入 `sync:public` 於 components build 後自動執行
- ✅ CLAUDE.md「新增元件步驟」區段改為「使用 scaffolder，不要手工建檔」
- ✅ `.claude/commands/new-component.md` slash command 撰寫完成，內含品質檢查清單
- ✅ 端到端驗證：三種 type 均成功產檔，pnpm build 通過（35 modules），清理後 pnpm build 回到 32 modules

### 變更檔案
- `scripts/new-component.mjs` — 新建（約 250 行）
- `scripts/check-components.mjs` — 新建
- `scripts/sync-public-assets.mjs` — 新建
- `package.json` — 新增 3 條 script，`build` 插入 `sync:public`
- `CLAUDE.md` — 「新增元件步驟」從 7 步手動流程改為 scaffolder 指令 + 後續工作清單
- `.claude/commands/new-component.md` — 新建

### 後續建議
1. **Harness Phase 2 — ESLint** 另開任務（`tasks/features/YYYY-MM-DD-eslint-lit-rules.md`）：安裝 `eslint-plugin-lit` / `eslint-plugin-lit-a11y` / `eslint-plugin-wc`，新增自訂 rule `no-css-fallback-in-component`
2. **Harness Phase 3 — Pre-commit** 另開任務：husky + lint-staged，把 ESLint 串進 commit hook
3. **Docs 缺口補完** 另開任務：check:components 揭露既有 9/11 個元件缺文件或預覽頁。建議為 layout 元件（stack / cluster / container / sidebar）以及部分表單元件補 docs + preview
4. **Naming drift 修正**：`govtw-input.ts` 對應的文件頁為 `text-input.md`，應統一命名（改檔名或改 sidebar link）
5. **scaffolder 增強**（低優先）：加入 `--remove` flag 反向操作，或讓 check:components 支援 `--fix` 自動修補簡單項目
