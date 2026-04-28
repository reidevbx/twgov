# 調大 navbar logo 高度

## 問題分析
目前 `apps/docs/.vitepress/theme/custom.css` 中 logo 高度為桌面 36px / 行動 28px，視覺存在感偏弱。

## 需求定義
- 桌面 36px → 56px（經 36 → 48 → 42 → 56 多次調整後定案）
- 行動 28px → 42px（按比例同步）
- 維持 `width: auto` 以保留 SVG 原始 440:124 比例
- 56px logo + 8px padding × 2 = 72px，超過 VitePress 預設 navbar 64px；
  若視覺擁擠須一併覆寫 `--vp-nav-height: 72px;`

### 驗收標準
- [x] custom.css 兩個 height 值已更新
- [x] `pnpm dev` navbar 顯示放大的 logo，無溢位

## 實作計劃
- [x] Edit `apps/docs/.vitepress/theme/custom.css` 兩處 height
- [x] 啟動 dev server 驗證

## 影響範圍
`apps/docs/.vitepress/theme/custom.css`（兩行 height 改值）

## 總結

### 完成項目
- ✅ `apps/docs/.vitepress/theme/custom.css`：
  - `.VPNavBarTitle .logo`：`height: 36px` → `56px`
  - mobile media query：`height: 28px` → `42px`

### 變更檔案
- `apps/docs/.vitepress/theme/custom.css`（2 行 height）

### 注意
- 視覺效果未在瀏覽器中親眼驗證；請於 dev server 重新整理確認
- 若想再調整：可改 desktop 數字後，mobile 約取 75–78% 維持原比例
