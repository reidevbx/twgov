# 調亮 light mode 品牌色

## 問題分析

VitePress 文件首頁在 light mode 下：

- Hero 標題「GOV.TW Design System」幾乎是純黑，失去品牌藍辨識度
- 快速開始 button 看起來像深灰按鈕

根因：`semantic.color.brand.primary` 指向 `primitive.color.blue.12`（OKLCH L=0.210，極暗）。

- Hero `.name` 用 `linear-gradient(--vp-c-brand-1 → --vp-c-brand-3)`，三階都是 brand 衍生的更深色（custom.css 用 `color-mix(... black 10%/20%)`），起點就太暗 → 整段視覺接近純黑
- Button 背景 `--vp-c-brand-1` + 白字，對比 ~15:1 過剩，但顏色辨識度極低

## 需求定義

- 在 light mode 讓 brand primary 看起來明顯是「品牌藍」而非黑
- 維持白字 button 對比 ≥ AA（4.5:1）
- 不影響 dark mode（dark theme 走獨立 brand.primary = blue.6 路徑）
- 不引入新的 chrome 規則 — 只動 token 來源

## 實作計劃

1. 改 `packages/tokens/tokens.json`：`semantic.color.brand.primary` 從 `{primitive.color.blue.12}` → `{primitive.color.blue.9}`（OKLCH L=0.380，白字對比 ~9:1，AAA pass）
2. `pnpm build:tokens` 重生 `tokens.css` / `tailwind.css`
3. `pnpm sync:public` 同步到 docs `public/`（dev server 才會吃到新 token）
4. 開 dev server 驗證 light + dark 兩模式
5. 用 Chrome 截圖比對

## 影響範圍

- `packages/tokens/tokens.json` — 1 行
- `packages/tokens/dist/tokens.css` / `tailwind.css` — 自動重建
- `apps/docs/public/tokens.css` — sync:public 同步
- 任何使用 `--govtw-color-brand-primary` 或 `--vp-c-brand-1/2/3/soft` 的元件與頁面 chrome
  - VitePress hero、navbar active、sidebar active、`th` 背景、DemoBlock toggle hover
  - 元件中目前使用 brand.primary 的：checkbox `check-color`、radio `selected-color`
- 文章內連結走 `--govtw-color-link-default`（blue.7，獨立路徑）→ 不受影響
- dark theme override 獨立宣告 → 不受影響

## 總結

### 完成項目

- `semantic.color.brand.primary`: `{primitive.color.blue.12}` → `{primitive.color.blue.9}`
- `pnpm build:tokens` 重生 `tokens.css` / `tailwind.css`
- `pnpm sync:public` 同步至 `apps/docs/public/tokens.css`
- 視覺驗證由使用者自行確認

### 變更檔案

- `packages/tokens/tokens.json`（1 行）
- `packages/tokens/tokens.css`（自動產出）
- `packages/tokens/tailwind.css`（自動產出）
- `apps/docs/public/tokens.css`（sync:public 同步）

### 驗證重點

- Light mode：hero 標題與快速開始 button 應呈現明顯品牌藍而非黑灰
- Light mode：白字 button 對比 ~9:1（AAA pass）
- Dark mode：brand.primary 仍為 blue.6，外觀不變
- 文章內連結（`--govtw-color-link-default` = blue.7）獨立路徑，不受影響

### 後續建議

- 若覺得 blue.9 仍不夠亮，下一階可試 blue.8（OKLCH 0.480，白字對比 ~6:1，仍 AA pass）
- 若覺得太亮但藍度不足，可考慮把 hero 漸層終點 `--vp-c-brand-3` 從目前「primary +20% black」調整為換色相而非純加黑（custom.css line 11）

