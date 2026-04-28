# 重命名 govtw-input → govtw-text-input

## 問題分析

### 現況
- 元件 tag：`govtw-input`（檔案 `govtw-input.ts`）
- 文件檔：`apps/docs/components/text-input.md`
- 兩者不一致，違反 CLAUDE.md「tag = `govtw-X` ⇄ doc = `X.md`」既定命名規則
- `pnpm check:components` 因此誤報 `govtw-input` 缺 docs（實際只是檔名沒對齊）
- `tasks/features/2026-04-23-component-scaffolder.md:82` 也已記錄此 naming drift 待修

### 根因
- 早期實作以「最簡 tag」(`input`) 為主，doc 以「UX 概念」(`text-input`) 為主，缺一致性
- 其他元件（`button` / `radio` / `checkbox` / `link` / `textarea` / `fieldset` 等）皆 tag = doc 檔名

## 需求定義

### 目標
把 tag 對齊 doc 命名：`govtw-input` → `govtw-text-input`，全專案一致。

### 驗收標準
- `pnpm check:components` 不再報 `govtw-input` 命名缺漏
- `pnpm build` 完整通過
- 元件頁、preview HTML、foundations/layout 範例渲染正常
- 全專案無殘留 `govtw-input` 字串（除 `tasks/` 歷史紀錄）

## 實作計劃

### A. 元件原始碼（critical）
- [ ] `git mv packages/web-components/src/govtw-input.ts → govtw-text-input.ts`
- [ ] 檔內 `@customElement('govtw-input')` → `@customElement('govtw-text-input')`
- [ ] class `GovInput` → `GovTextInput`
- [ ] CSS var refs：`var(--govtw-input-...)` → `var(--govtw-text-input-...)`（多處）

### B. Token（critical，因為 CSS var 名跟著元件）
- [ ] `packages/tokens/tokens.json`：`component.input` → `component.text-input`
- [ ] `pnpm build:tokens` 重產 `tokens.css`

### C. Build 入口
- [ ] `packages/web-components/vite.config.ts` entry key & path
- [ ] `packages/web-components/src/index.ts` export 與 import 路徑
- [ ] `packages/web-components/package.json` `exports` key 與三個路徑

### D. 文件中的 tag 使用
- [ ] `apps/docs/components/text-input.md`：所有 `<govtw-input>` → `<govtw-text-input>`
- [ ] `apps/docs/components/fieldset.md`：同上
- [ ] `apps/docs/foundations/layout.md`：5 處
- [ ] `apps/docs/foundations/architecture.md`：1 處 `--govtw-input-border-color` → `--govtw-text-input-border-color`
- [ ] `README.md`：1 處表格列
- [ ] `.claude/commands/new-component.md`：1 處範例提及
- [ ] `scripts/new-component.mjs`：1 處註解（非功能）

### E. Build & 驗證
- [ ] `pnpm build`（依序：build:components → sync:public → build:previews → docs build）
- [ ] `pnpm lint`、`pnpm check:components`
- [ ] grep 殘留：`grep -r 'govtw-input' .`（排除 `node_modules/` `dist/` `tasks/`）→ 應為空
- [ ] 對照 build 後 SSR 輸出與 preview HTML 都用新 tag

## 影響範圍

**重命名**
- `packages/web-components/src/govtw-input.ts` → `govtw-text-input.ts`

**修改**
- `packages/web-components/src/index.ts`
- `packages/web-components/package.json`
- `packages/web-components/vite.config.ts`
- `packages/tokens/tokens.json`
- `apps/docs/components/text-input.md`
- `apps/docs/components/fieldset.md`
- `apps/docs/foundations/layout.md`
- `apps/docs/foundations/architecture.md`
- `README.md`
- `.claude/commands/new-component.md`
- `scripts/new-component.mjs`

**自動重生**
- `packages/tokens/tokens.css`（build:tokens）
- `apps/docs/public/preview/**/*.html`（build:previews）
- `packages/web-components/dist/*`（build:components）

**不動**
- `tasks/` 下歷史記錄（保留原始字串以反映當時狀態）

## 風險與對策

| 風險 | 對策 |
|---|---|
| 遺漏某個 CSS var 改名導致樣式崩 | 用 grep 全找 `--govtw-input-` 後對照清單 |
| Token 重命名後其他元件意外依賴 | tokens.json 的 input block 只被 govtw-input.ts 使用，無交叉依賴 |
| 變更後 dev cache 殘留舊 chunk | 必要時 `rm -rf apps/docs/.vitepress/cache` |
| HMR 不重新註冊元件 | dev 重啟即可 |

## 總結

### 完成項目

- ✅ A. 元件原始碼：`govtw-input.ts` → `govtw-text-input.ts`，class `GovInput` → `GovTextInput`，35 處 `--govtw-input-*` CSS var 全部對齊新名
- ✅ B. tokens：`tokens.json` 改 `component.input` → `component.text-input`，重產 `tokens.css`、`tailwind.css`
- ✅ C. build 入口：`vite.config.ts`、`index.ts`、`package.json exports` 全部對齊
- ✅ D. 文件 / README / scaffolder 共 7 檔字串更新；preview HTML 經 `pnpm build:previews` 自動重生
- ✅ E. `pnpm lint` 乾淨；`pnpm check:components` 缺漏 5→4（`govtw-input` 命名不一致已消除）；`pnpm build` 完整 pipeline 通過；SSR 輸出 26 處 `<govtw-text-input>` 全部正確
- ✅ 全專案 grep 殘留：`govtw-input` 與 `--govtw-input-` 都只剩 `tasks/` 歷史紀錄（預期保留）

### 變更檔案

**重命名**
- `packages/web-components/src/govtw-input.ts` → `govtw-text-input.ts`

**修改**
- `packages/web-components/src/index.ts`
- `packages/web-components/package.json`
- `packages/web-components/vite.config.ts`
- `packages/tokens/tokens.json`
- `packages/tokens/tokens.css`、`tailwind.css`（自動重產）
- `apps/docs/components/text-input.md`、`fieldset.md`
- `apps/docs/foundations/layout.md`、`architecture.md`
- `apps/docs/public/preview/{text-input,fieldset}/*.html`（自動重生）
- `README.md`
- `.claude/commands/new-component.md`
- `scripts/new-component.mjs`

### 後續建議

- 剩餘 4 個 `check:components` 缺漏都是佈局元件（cluster / container / sidebar / stack）完全沒 docs，與本任務無關，另起 feature 任務處理
- 本次未動 sidebar config（URL `/components/text-input` 本來就一致）；text 仍為「Text Input 文字輸入」，符合語意
