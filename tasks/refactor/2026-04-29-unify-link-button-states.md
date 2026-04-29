# 統一 VitePress 文件 link / button 狀態樣式至 govtw 元件

## 問題分析

VitePress 文件 chrome 與 govtw 元件的互動樣式不一致：

- `.vp-doc a:not(.header-anchor)`：只覆寫 color + hover color-mix，沒有元件級的 hover 粗底線、focus 黃底黑底線
- `.VPButton`（hero CTA）：focus 狀態為瀏覽器預設 outline，缺 govtw-button 的黃色 ring
- 連結色 `--govtw-color-link-default` = `blue.7`（OKLCH 0.580）在新 brand.primary（blue.9，OKLCH 0.380）下顯得偏淡

使用者偏好：
- 連結文字提到 `blue.9`（=brand.primary，視覺更實，也與品牌色統一）
- 把元件的「點擊背景色效果」（GOV.UK 黃底黑底線）保留到 VitePress 文件 link
- 按鈕也套上同款黃色 focus ring

## 需求定義

- VitePress `.vp-doc` body link 的 hover / focus-visible / active / visited 行為與 `<govtw-link>` 一致
- VitePress `.VPButton` 的 focus-visible 與 `<govtw-button>` 一致（黃色外環）
- `--govtw-color-link-default` 從 `blue.7` 改為 `blue.9`（影響元件與 chrome）
- TOC 的 `.outline-link` 與 sidebar active link 不套狀態樣式（保持低調觀感）
- header-anchor（`#` 錨點）排除，維持 VitePress 預設

## 實作計劃

1. `tokens.json` 改 `semantic.color.link.default`：`{primitive.color.blue.7}` → `{primitive.color.blue.9}`
2. `apps/docs/.vitepress/theme/custom.css` 把現有 link 區塊改寫，加入：
   - `.vp-doc a:not(.header-anchor):visited` 紫色
   - `.vp-doc a:not(.header-anchor):hover` 粗底線 + 文字轉暗
   - `.vp-doc a:not(.header-anchor):focus-visible` / `:active` 黃底 + 黑色粗底線（box-shadow 雙層）
3. custom.css 加 `.VPButton:focus-visible` 黃色 box-shadow ring
4. `pnpm build:tokens` + `pnpm sync:public`

## 影響範圍

- `packages/tokens/tokens.json`（1 行）
- `packages/tokens/tokens.css` / `tailwind.css`（自動產出）
- `apps/docs/public/tokens.css`（sync:public 同步）
- `apps/docs/.vitepress/theme/custom.css`（link 區塊改寫 + 新增 button ring）
- 任何使用 `--govtw-color-link-default` 的元件：`<govtw-link>` 預設色變藍 9
- VitePress 文件頁面內所有連結（除 header-anchor）— 視覺刷新
- VitePress hero / cta 按鈕 — focus 多了黃環
- 元件層 `<govtw-link>` / `<govtw-button>` 本身無變動（已是這套）

## 範圍變更（2026-04-29）

對話過程中決定**縮小範圍**：不要在 VitePress chrome 重複元件狀態樣式，避免雙處 CSS drift。
討論了 Shadow DOM 與 VitePress Light DOM 兩個 DOM 樹的限制：chrome 由 VitePress Vue templates 渲染，
無法替換為 govtw 元件，要套狀態樣式只能在 custom.css 寫對應規則 — 就會造成重複。
未來如要單一來源，可考慮 markdown-it plugin 把內文 `<a>` 渲為 `<govtw-link>`，但本次不動。

### 最終保留的改動

- `tokens.json`：`semantic.color.link.default` `blue.7` → `blue.9`（與 brand.primary 同色）
- VitePress chrome 行為：**只接顏色**，hover / focus / visited 維持 VitePress 預設（與本次改動前一致）

### 已還原的改動

- `custom.css` 的 `.vp-doc a:not(.header-anchor)` 狀態樣式（hover 粗底線、focus 黃底黑底線、visited 紫）
- `custom.css` 的 `.VPButton:focus-visible` 黃色 ring
- `custom.css` 的 `.demo-block-toggle` 例外規則（連帶不需要）

## 總結

### 完成項目

- token：`semantic.color.link.default` `blue.7` → `blue.9`
- `pnpm build:tokens` + `pnpm sync:public` 完成
- custom.css 註解更新（反映 blue.9 命名與不套狀態樣式的決定）

### 變更檔案

- `packages/tokens/tokens.json`（1 行）
- `packages/tokens/tokens.css` / `tailwind.css`（自動產出）
- `apps/docs/public/tokens.css`（同步）
- `apps/docs/.vitepress/theme/custom.css`（僅註解微調）

### 驗證重點

- 文章內 `<a>`、TOC、sidebar active：色彩變深成 blue.9
- `<govtw-link>` 元件：預設色同步變 blue.9（共用 token）
- hover / focus / visited 行為：與改動前完全一致
- dark mode：link 走 blue.6 dark override，未受影響

### 後續備忘

- 若日後想真正「共用元件狀態視覺」，路線是 markdown-it plugin 把內文 `[text](url)` 渲為 `<govtw-link>`
- VitePress 自家的 hero / sidebar / navbar 必然要走 custom.css 對映，這層橋接拆不掉
