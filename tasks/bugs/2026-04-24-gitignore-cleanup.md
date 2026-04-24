# 清理 git 追蹤的不該 commit 檔案

## 問題分析

### 現況描述
`.gitignore` 規則基本正確（`.vitepress/cache`、`.astro`、`dist` 都已列入），但仍有 31 個檔案被 git 追蹤且本不應 commit：

| 類別 | 數量 | 路徑 |
|---|---|---|
| Astro 殘留 | 5 | `apps/docs/.astro/*` |
| VitePress dep cache | 24 | `apps/docs/.vitepress/cache/deps/*` |
| Build 產物（漏加 ignore） | 2 | `apps/docs/public/gov-tw.iife.js`、`apps/docs/public/tokens.css` |

### 問題根因
1. `.gitignore` 規則是「加入後才生效」，對既有追蹤檔案無效果 — 需要 `git rm --cached` 手動移除
2. `apps/docs/public/gov-tw.iife.js` 與 `tokens.css` 未列入 `.gitignore`

## 需求定義

### 預期結果
- `.gitignore` 補上兩個 build 產物
- 31 個檔案從 git index 移除（working tree 保留或已不存在均可）
- `git ls-files` 不再列出上述檔案

### 驗收標準
- [x] `.gitignore` 含 `apps/docs/public/gov-tw.iife.js`、`apps/docs/public/tokens.css`
- [x] `git ls-files | grep -E '(\.astro|vitepress/cache|public/gov-tw|public/tokens)'` 回傳空
- [x] `pnpm build` 仍能成功重建這些檔案（build 依賴不被破壞）

## 實作計劃
- [x] 更新 `.gitignore` 加入兩個 build 產物
- [x] `git rm --cached -r apps/docs/.astro apps/docs/.vitepress/cache`
- [x] `git rm --cached apps/docs/public/gov-tw.iife.js apps/docs/public/tokens.css`
- [x] 驗證 `git ls-files` 乾淨
- [x] `pnpm build` 確認 build 鏈仍能工作（重新產生這些檔案）

## 影響範圍
- `.gitignore` — 新增 2 行
- Git index — 31 個檔案 untrack（working tree 不受影響）

## 總結

### 完成項目
- ✅ `.gitignore` 於「Build outputs」段補上兩行：`apps/docs/public/gov-tw.iife.js` 與 `apps/docs/public/tokens.css`
- ✅ `git rm --cached -r apps/docs/.astro apps/docs/.vitepress/cache` 移除 29 個檔案（5 Astro + 24 VitePress cache）
- ✅ `git rm --cached apps/docs/public/gov-tw.iife.js apps/docs/public/tokens.css` 移除 2 個 build 產物
- ✅ `git ls-files` 從 154 降到 123（-31 檔），`grep` 確認上述 pattern 全部清空
- ✅ `pnpm build` 驗證：build 鏈仍能重新產生 iife.js 與 tokens.css 到 `apps/docs/public/`；VitePress build 亦成功
- ✅ `git check-ignore -v` 驗證所有清掉的路徑都被 .gitignore 正確匹配，不會再度被誤追蹤

### 變更檔案
- `.gitignore` — 新增 build 產物兩行
- Git index — 31 個檔案 untrack（working tree 保留或重新生成）

### 後續建議
1. **本次 untrack 的 31 個刪除需 commit**：`git status` 會顯示大量 `D` 標記，建議盡快 commit 訊息如 `chore: untrack build artifacts and dev caches`，避免以後 diff 干擾
2. **審視 CI / 部署流程**：未來若上 CI（如 GitHub Actions），部署步驟要包含 `pnpm build`；否則 deploy artefact 會缺 `gov-tw.iife.js` 與 `tokens.css`
3. **apps/docs/.astro 目錄本身可考慮整個刪除**：專案既然改用 VitePress，這目錄是歷史殘留；保留只佔空間。可開一個 refactor 任務處理
