# 建立 Husky + lint-staged Pre-commit Hook（Harness Phase 3）

## 問題分析

### 現況描述
Phase 1（scaffolder）與 Phase 2（lint）完成後，還缺自動化把關：
- `pnpm lint` 是可用的，但「要記得跑」
- 單人專案也可能手滑把壞 code commit 進 repo
- 沒有機制在「commit」這個事件上強制執行檢查

### 問題根因
Git 原生 hooks 放在 `.git/hooks/` 不進版控；沒有工具把 hook 同步進 repo + 讓 `pnpm install` 自動啟用。

## 需求定義

### 預期結果
- 每次 `git commit` 自動對 staged 檔案跑 lint（有錯擋下 commit）
- 每次 `git push` 前自動跑 `build:components`（確保 TypeScript 編譯過才推上去）
- hook 設定進版控，換機器 `pnpm install` 後自動啟用
- 設定不複雜：一個 `.husky/` 目錄、一份 `.lintstagedrc.json`

### 驗收標準
- [x] 安裝 husky 與 lint-staged，`prepare` script 存在
- [x] `.husky/pre-commit` 觸發 `pnpm lint-staged`
- [x] `.husky/pre-push` 觸發 `pnpm build:components`
- [x] `.lintstagedrc.json` 將 TS 檔交給 eslint --fix
- [x] 實測：刻意 stage 一份有 lint 錯誤的 TS 檔，commit 被擋下
- [x] 實測：stage 乾淨檔案，commit 通過、push 前 build 也通過
- [x] CLAUDE.md 指令區段加入 hook 行為說明

## 實作計劃
- [x] 安裝 `husky` 與 `lint-staged` 至 root devDependencies
- [x] 執行 `pnpm husky init`（建立 `.husky/` 與 `prepare` script）
- [x] 撰寫 `.husky/pre-commit` 執行 `pnpm lint-staged`
- [x] 撰寫 `.husky/pre-push` 執行 `pnpm build:components`
- [x] 撰寫 `.lintstagedrc.json` 對應 TS 檔案 → eslint
- [x] 更新 CLAUDE.md 說明 hook 行為
- [x] 端到端驗證（刻意製造錯誤 → 確認被擋 → 修正後通過）
- [x] 撰寫總結

## 影響範圍
- `package.json`（root）— 新增 husky / lint-staged devDeps、`prepare` script
- `.husky/pre-commit`（新建）
- `.husky/pre-push`（新建）
- `.lintstagedrc.json`（新建）
- `CLAUDE.md` — 指令區段註解 hook 行為

## 已知例外
- `pnpm check:components` 不納入 hook：目前有 9 個既有元件缺 docs / preview / sidebar，會造成每次 commit/push 失敗。留待「Docs 缺口補完」任務處理後再納入。

## 總結

### 完成項目
- ✅ 安裝 `husky@9.1.7` 與 `lint-staged@16.4.0` 至 root devDependencies
- ✅ root `package.json` 新增 `"prepare": "husky"`，同事 clone 後執行 `pnpm install` 會自動啟用 hooks
- ✅ `pnpm husky init` 建立 `.husky/` 目錄；覆寫預設的 `pre-commit` 為 `pnpm lint-staged`
- ✅ 新建 `.husky/pre-push` 執行 `pnpm build:components`（確保 TypeScript 編譯通過才允許推上 remote）
- ✅ `.lintstagedrc.json` 配置三組 glob → `eslint --fix`：
  - `packages/web-components/src/*.ts`
  - `scripts/*.mjs`
  - `eslint-rules/*.js`
- ✅ CLAUDE.md 指令區段新增「Git hooks（Husky）」小節
- ✅ 端到端驗證：刻意建立含 CSS fallback 的 sandbox TS 檔，stage 後跑 `pnpm lint-staged`，確認失敗訊息為「✖ 1 problem」並觸發 lint-staged 自動 revert，證明 commit 會被擋；pre-push 模擬執行 `pnpm build:components` 輸出 32 modules 成功建置

### 變更檔案
- `package.json`（root）— 新增 husky/lint-staged devDeps 與 `prepare` script
- `.husky/pre-commit` — 新建（husky init 生成後覆寫）
- `.husky/pre-push` — 新建
- `.lintstagedrc.json` — 新建
- `CLAUDE.md` — 新增「Git hooks（Husky）」小節

### 後續建議
1. **把 `check:components` 納入 pre-push**：等「Docs 缺口補完」任務處理完既有 9 個元件的 docs / preview / sidebar 缺漏後，把 `.husky/pre-push` 改為 `pnpm check:components && pnpm build:components`
2. **新增 commit-msg hook**（選配）：用 commitlint 強制 commit message 格式（e.g., `feat:`, `fix:`, `refactor:`）便於後續產 changelog
3. **pre-push 提速**（選配）：目前 `pnpm build:components` 約 500ms，尚在容忍範圍；若元件量增加到拖慢 push，可考慮改用 `tsc --noEmit` 只做型別檢查
4. **CI 重覆**（選配）：本地 hooks 可被 `--no-verify` 繞過；若啟用 GitHub Actions 應在 CI 也跑 lint + build:components 作為最後防線
