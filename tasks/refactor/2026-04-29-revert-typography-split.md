# 還原 typography.css 拆分，VitePress 自處理 body 衝突

## 問題分析

### 之前怎麼做
為了讓 VitePress import `tokens.css` 不被裸 `body { line-height: 1.8 }` 污染 sidebar，把 typography 從 `tokens.css` 拆成獨立 `typography.css`：
- `tokens.css` → 純變數
- `typography.css` → 裸標籤排版（opt-in）

### 為什麼錯
> 為了 VitePress 一個消費者，讓所有 token 消費者都要記得「想要完整效果記得引兩個檔」。設計顛倒了。

VitePress 是少數派（它有自己 chrome 與 prose scope `.vp-doc`），但拆分成本被全體消費者共擔。

### 正確的設計原則
Token 系統為大多數消費者最佳化；異常消費者自己處理自己的衝突。

## 需求定義

### 目標
1. typography 合回 `tokens.css`，恢復單檔
2. VitePress 在 `custom.css` 加一行 body line-height 覆寫，吃下衝突

### 驗收標準
- `tokens.css` 含 typography 段（單檔可用）
- `typography.css` 不再產出
- `package.json` exports 不再列 `typography.css`
- VitePress sidebar/nav 行高正常（不被 1.8 污染）
- 文件站 prose 區塊（`.vp-doc`）行高仍正確
- preview HTML 顯示正常
- `pnpm build` 通過

## 實作計劃

### 1. tokens build.js 合回 typography
- [ ] `packages/tokens/build.js`：把 typography section 從 `writeFileSync('typography.css')` 移回 `tokens.css` 的 sections 陣列
- [ ] 刪除 `typography.css` 寫檔邏輯

### 2. 清理 typography.css 殘跡
- [ ] 刪除 `packages/tokens/typography.css`
- [ ] 刪除 `apps/docs/public/typography.css`
- [ ] `packages/tokens/package.json`：移除 `./typography.css` exports
- [ ] `scripts/paths.mjs`：移除 `tokens.typography`
- [ ] `scripts/sync-public-assets.mjs`：移除 typography.css 同步

### 3. VitePress custom.css 加 body 覆寫
- [ ] 在 brand 變數區塊後加：
  ```css
  body {
    line-height: var(--vp-line-height, 1.5);
  }
  ```
- [ ] 確認其他可能被裸 `h1-h6` 影響的 chrome 區塊也 OK（VitePress chrome 通常自訂 heading 樣式，但若有問題再補）

### 4. CLAUDE.md 還原描述
- [ ] 把「`tokens.css` 不含裸標籤 / `typography.css` opt-in」段落，還原為「單一 tokens.css」說明

### 5. 驗證
- [ ] `pnpm build:tokens` → 確認 `typography.css` 不再產出、`tokens.css` 含 typography
- [ ] `pnpm build` → 完整 pipeline 通過
- [ ] `pnpm dev` → 開首頁、元件頁，sidebar/nav 行高正常；prose 區塊（h1-h6/p/li）行高正常
- [ ] 開 preview HTML（如 `/preview/button/default.html`）→ 顯示正常

## 影響範圍

**修改**
- `packages/tokens/build.js`
- `packages/tokens/package.json`
- `apps/docs/.vitepress/theme/custom.css`
- `scripts/paths.mjs`
- `scripts/sync-public-assets.mjs`
- `CLAUDE.md`

**刪除**
- `packages/tokens/typography.css`
- `apps/docs/public/typography.css`

**自動重生**
- `packages/tokens/tokens.css`（重新含 typography）

## 預估
- 修改：6 檔 + 2 刪除
- 工時：20 分鐘

## 總結

### 完成項目
- ✅ `packages/tokens/build.js`：typography section 移回 `tokens.css` sections 陣列；不再寫獨立檔
- ✅ 刪除 `packages/tokens/typography.css` 與 `apps/docs/public/typography.css`
- ✅ `packages/tokens/package.json` 移除 `./typography.css` exports
- ✅ `scripts/paths.mjs` 移除 `tokens.typography`
- ✅ `scripts/sync-public-assets.mjs` 移除 typography.css 同步
- ✅ `apps/docs/.vitepress/theme/custom.css` 加 `body { line-height: 1.5 }` 吃下繼承衝突
- ✅ `CLAUDE.md` 還原為「單一 tokens.css（含 typography）」說明，並文件化 VitePress 整合需要的覆寫
- ✅ `pnpm build:tokens` 確認 typography 已合回 tokens.css L229 起
- ✅ `pnpm build` 完整 pipeline 通過

### 變更檔案
- `packages/tokens/build.js`
- `packages/tokens/package.json`
- `packages/tokens/tokens.css`（自動重生，含 typography）
- `apps/docs/.vitepress/theme/custom.css`
- `scripts/paths.mjs`
- `scripts/sync-public-assets.mjs`
- `CLAUDE.md`

### 刪除
- `packages/tokens/typography.css`
- `apps/docs/public/typography.css`

### 設計原則確立
> Token 系統為大多數消費者最佳化；異常消費者（如 VitePress 有自身 chrome）自己處理自己的衝突，不該逼整個 token 系統去配合。

### 後續驗證
- 需要使用者開 dev server 確認：sidebar / nav 行高正常；prose 區塊（`.vp-doc` 內 h1-h6 / p / li）行高仍 1.8（CJK 優化）；preview HTML 顯示正常
