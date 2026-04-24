# 建立 ESLint + Lit 規則（Harness Phase 2）

## 問題分析

### 現況描述
- 專案完全沒有 ESLint 設定
- 品質規則僅透過 CLAUDE.md 文字引導，AI 在寫程式時無即時回饋
- 稽核發現既有程式碼已有 16 處違反「Component CSS 不加 fallback」政策（checkbox 2 處、input 7 處、textarea 7 處）

### 問題根因
- 沒有自動化的 linter 擋在「AI 寫 code」與「人工 review」之間
- 政策若只寫在 CLAUDE.md，開發當下看不到，不易貫徹

## 需求定義

### 預期結果
- ESLint 9（flat config）啟用於 `packages/web-components/src/**/*.ts`
- 整合 TypeScript ESLint
- 整合 `eslint-plugin-lit`（Lit 特定規則：`html\`\`` 模板檢查、key-based reconciliation 等）
- 自訂 rule：`govtw/no-css-fallback-in-component`（偵測 `css\`\`` 裡的 `var(--govtw-*, fallback)` pattern）
- `pnpm lint` 與 `pnpm lint:fix` 指令
- 既有程式碼全部通過 lint

### 驗收標準
- [x] 執行 `pnpm lint` 無錯誤
- [x] 自訂 rule 能偵測 CSS fallback，故意加一個測試案例能被抓到
- [x] CLAUDE.md 更新引導 AI 使用 `pnpm lint`
- [x] 既有 16 處 CSS fallback 違規全部修正

## 實作計劃

- [x] 安裝 eslint@9、@eslint/js、typescript-eslint、eslint-plugin-lit
- [x] 撰寫 `eslint.config.js`（flat config，針對 web-components 套 lit + ts，針對 scripts 套基本 JS）
- [x] 撰寫 `eslint-rules/no-css-fallback-in-component.js` 與 `eslint-rules/index.js` 匯出
- [x] 根 `package.json` 新增 `lint` / `lint:fix` scripts
- [x] 修正既有 16 處 CSS fallback
- [x] 跑 `pnpm lint` 確認無錯誤
- [x] `pnpm build` 確認修正後的 TypeScript 仍可編譯
- [x] 更新 CLAUDE.md 提及 `pnpm lint`

## 影響範圍

- `package.json`（root）— 新增 devDependencies、scripts
- `eslint.config.js`（新建）
- `eslint-rules/no-css-fallback-in-component.js`（新建）
- `eslint-rules/index.js`（新建，plugin entry）
- `packages/web-components/src/govtw-checkbox.ts` — 移除 fallback
- `packages/web-components/src/govtw-input.ts` — 移除 fallback
- `packages/web-components/src/govtw-textarea.ts` — 移除 fallback
- `CLAUDE.md` — 新增 lint 指令說明

不影響：其他 8 個既已乾淨的元件、token 系統、VitePress 頁面。

## 總結

### 完成項目
- ✅ 安裝 `eslint@9.39`、`@eslint/js@9.39`、`typescript-eslint@8.59`、`eslint-plugin-lit@2.2`（flat config 生態系完整）
- ✅ `eslint.config.js` 採 flat config：web-components 套 TypeScript + Lit + 自訂 govtw rule；scripts 與 eslint-rules 套基本 JS 規則；docs / tokens / dist 忽略
- ✅ 自訂 rule `govtw/no-css-fallback-in-component`：掃 `css\`\`` 裡的 `var(--govtw-*, fallback)`，錯誤訊息附上觸犯表示式與修復引導；透過 `eslint-rules/index.js` 以 plugin 形式匯出
- ✅ 根 `package.json` 新增 `lint` 與 `lint:fix`
- ✅ sed 批次移除 17 處 CSS fallback（checkbox 2、input 8、textarea 7），全部位於 `--govtw-spacing-N` token 引用；確認 `tokens.css` 有定義這些變數因此移除 fallback 零風險
- ✅ `pnpm lint` 回傳 0 錯誤 0 警告；`pnpm build` 仍輸出 32 modules、IIFE 60.25 kB
- ✅ CLAUDE.md「指令」區段新增 lint / check:components / new:component

### 變更檔案
- `package.json`（root）— 新增 devDeps + `lint` / `lint:fix` scripts
- `eslint.config.js` — 新建
- `eslint-rules/index.js` — 新建（plugin entry）
- `eslint-rules/no-css-fallback-in-component.js` — 新建
- `packages/web-components/src/govtw-checkbox.ts` — 移除 2 處 fallback
- `packages/web-components/src/govtw-input.ts` — 移除 8 處 fallback
- `packages/web-components/src/govtw-textarea.ts` — 移除 7 處 fallback
- `CLAUDE.md` — 指令區段增補

### 後續建議
1. **Phase 3 — Pre-commit hook** 另開任務：husky + lint-staged 串 `pnpm lint` 與 `pnpm check:components`，確保有違規時無法 commit
2. **加入 lit-a11y 與 wc plugins**：目前 Phase 2 只接了 `eslint-plugin-lit`；可另開 refactor 任務整合 `eslint-plugin-lit-a11y`（WCAG in templates）與 `eslint-plugin-wc`（Web Components 命名等慣例），需驗證 flat config 相容性
3. **新增自訂 rules**：依先前 review 發現的常見 pitfall，可加 `require-declare-global`、`require-form-associated-for-form-elements`、`no-primitive-token-in-component` 等
4. **sidebar 無 ESLint 涵蓋**：`apps/docs/**` 目前被排除；若後續加入 Vue/Markdown lint 再另開任務
5. **scaffolder 產出模板中的「待填」CSS 樣式若使用 fallback 會被 lint 立刻擋下**：驗證 Phase 1 的三種模板產出都不含違規 var() fallback — 已確認無
