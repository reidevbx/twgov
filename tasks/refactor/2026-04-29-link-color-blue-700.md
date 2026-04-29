# 連結色改用 blue-700（#1d70b8）對齊 WCAG AA

## 問題分析

### 現況
- `semantic.color.link.default` 指向 `primitive.color.blue.500` = `#2C84B2`
- 同一個值也是 `brand.primary` — 連結色 = 品牌色
- `#2C84B2` 在白底對比 ~4:1，**不及 WCAG AA 4.5:1**
- 視覺上連結偏淡，與內文區別不夠

### 目標
- 連結色獨立於品牌色，提高對比通過 AA
- 採 GOV.UK Design System 標準藍 `#1d70b8`（對比 ~5:1）

## 實作計劃

### 1. tokens.json 加 primitive 與 remap link
- [ ] `packages/tokens/tokens.json` 的 `primitive.color.blue` 加 `"700": "#1d70b8"`
- [ ] `semantic.color.link.default` 從 `{primitive.color.blue.500}` 改為 `{primitive.color.blue.700}`

### 2. 重建並驗證
- [ ] `pnpm build:tokens` 確認 `tokens.css` 含新 primitive 並 link 引用更新
- [ ] `pnpm build` 全 pipeline
- [ ] dev server 視覺檢查連結色

## 影響範圍

**修改**
- `packages/tokens/tokens.json`（1 行新增 + 1 行 ref 改動）

**自動重生**
- `tokens.css`、`tailwind.css`
- VitePress chrome 連結（透過 `--vp-c-brand-1` 鏈未受影響，brand 仍 `#2C84B2`）— 連結色用的是另一個 var

**不動**
- 品牌色（button 等仍 `#2C84B2`）
- dark mode link（仍 `#6B9FE8`，dark 主題另設）
- 連結 visited（紫色保留）

## 預估
- 修改：1 檔
- 工時：5 分鐘

## 總結

### 完成項目
- ✅ `tokens.json`：加 `primitive.color.blue.700 = #1d70b8`；`semantic.color.link.default` 改指 `blue.700`
- ✅ `pnpm build:tokens` 重產 `tokens.css`：`--govtw-color-link-default: var(--govtw-primitive-color-blue-700)`
- ✅ 額外擴充：`apps/docs/.vitepress/theme/custom.css` 加 VitePress chrome 連結覆寫（`.vp-doc a` / `.outline-link` / sidebar active）改用 `--govtw-color-link-default`
- ✅ hover 用 `color-mix` 派生（加深 15%）
- ✅ 品牌色 brand-1 不變，hero gradient / 按鈕仍用原 `#2C84B2`
- ✅ `pnpm build` 通過；built CSS 含覆寫規則

### 變更檔案
- `packages/tokens/tokens.json`（1 行新增 + 1 行 ref 改）
- `packages/tokens/tokens.css`（自動重生）
- `apps/docs/.vitepress/theme/custom.css`（加連結色區塊）

### 後續驗證（人眼）
- Reload dev server 看：
  - 文章內連結（如 architecture.md、tokens 章節中的內鏈）變成更飽和的藍
  - 右側 TOC 連結同色
  - Sidebar 當前頁項目同色
  - Hero 漸變、首頁按鈕仍是原品牌色

### 設計原則
> 連結色獨立於品牌色：品牌色為強調與背景，連結色為前景文字，需更高對比通過 AA。
