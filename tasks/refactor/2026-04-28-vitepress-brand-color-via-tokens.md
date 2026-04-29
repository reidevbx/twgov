# VitePress chrome 品牌色經由 token 系統

## 問題分析

### 現況
- `apps/docs/.vitepress/theme/custom.css` 把 VitePress 變數寫死 hex：
  - `--vp-c-brand-1: #2C84B2`
  - dark 模式 `--vp-c-brand-1: #6B9FE8`
- `packages/tokens/tokens.json` 已經有 semantic 層 `color.brand.primary`（light = `#2C84B2`、dark theme override = `#6B9FE8`）
- 兩邊的 hex 值**已完全一致**，但變數沒接通：custom.css 拿不到 `--govtw-*`
- 根因：`tokens.css` 目前只在 DemoBlock 的 Shadow DOM 內注入（透過 `__GOVTW_TOKENS_CSS__` Vite define），**未在站台 light DOM 根層 import**

### 為什麼不需要全綁
VitePress chrome（nav / sidebar / hero / prose / code block）與 govtw 元件 demo 是**兩套獨立 UI**：
- Chrome 在 light DOM，吃 VitePress 內建變數體系（`--vp-*`）
- 元件 demo 在 DemoBlock Shadow DOM，吃 `--govtw-*`，與 VitePress 樣式隔離（避免 prose 樣式污染元件外觀）

兩者刻意分離。但**品牌色**該一致，否則文件站與元件視覺分裂。

## 需求定義

### 目標
**選擇性綁定**：只把 VitePress 的品牌色變數接到 govtw token；中性色 / 文字色 / 排版繼續用 VitePress 預設（針對長閱讀已調過對比）。

### 接通範圍

| VitePress 變數 | 對應 govtw token |
|---|---|
| `--vp-c-brand-1` | `var(--govtw-color-brand-primary)` |
| `--vp-c-brand-2` | `color-mix(in oklab, var(--govtw-color-brand-primary), black 10%)` |
| `--vp-c-brand-3` | `color-mix(in oklab, var(--govtw-color-brand-primary), black 20%)` |
| `--vp-c-brand-soft` | `color-mix(in oklab, var(--govtw-color-brand-primary), transparent 86%)` |
| `--vp-c-indigo-*` | 同 brand（VitePress accent override） |

文字 / 背景 / divider / prose / code block：**保留 VitePress 預設不動**。

### 驗收標準
- light / dark mode 切換時 nav 連結色、按鈕色、hero gradient 都跟著 govtw brand 變
- `pnpm build` 通過
- `tokens.css` 內 dark 規則同時匹配 `[data-theme="dark"]` 與 `.dark`
- 改 tokens.json 的 brand primary → 重 build → 文件站視覺跟著變（端對端驗證）

## 實作計劃

### 1. tokens build.js：dark theme 多加 `.dark` 選擇器
- [ ] `packages/tokens/build.js:109` 把 `selector` 從 `` `[data-theme="${themeName}"]` `` 改為「dark 主題加 `.dark`」邏輯
- [ ] dark 分支輸出 `[data-theme="dark"], .dark { ... }`
- [ ] 其他 theme（將來新增）保持 `[data-theme="<name>"]` 單選擇器
- [ ] `pnpm build:tokens` 重產驗證 `tokens.css`

### 2. docs package 加 `@gov-tw/tokens` dep
- [ ] `apps/docs/package.json` 的 `dependencies` 加 `"@gov-tw/tokens": "workspace:*"`
- [ ] `pnpm install` 補 lock

### 3. 站台根層 import tokens.css
- [ ] `apps/docs/.vitepress/theme/index.ts` 在 `import './custom.css'` **之前**加 `import '@gov-tw/tokens/tokens.css'`
- [ ] 順序很重要：tokens 先載入，custom.css 才能 alias

### 4. 改寫 custom.css 用 var()
- [ ] 移除 `:root` 內 4 個 brand hex + 4 個 indigo hex
- [ ] 移除 `.dark` 區塊內 4 個 brand hex（dark mode 自動由 tokens.css 切換）
- [ ] 替換為 `var(--govtw-color-brand-primary)` + 3 個 `color-mix()` 變體
- [ ] 保留 typography / hero / prose 區塊不動

### 5. CLAUDE.md 補「Docs 站 vs 元件 — 兩層獨立 UI」段落
- [ ] 在「文件」段落新增小節，說明兩層獨立架構與選擇性 token 綁定的設計理由
- [ ] 列出哪些 VitePress 變數綁 token、哪些保留預設

### 6. 端對端驗證
- [ ] `pnpm build` 全 pipeline
- [ ] `pnpm dev` 開首頁、元件頁，切換 light/dark：
  - nav 連結 hover 色、active 色
  - hero gradient
  - sidebar active item
  - 站內連結色（在文件段落內的連結）
- [ ] 改 `tokens.json` 的 `primitive.color.blue.500` 為其他色（如 `#FF6600`）→ `pnpm build:tokens` → 確認站台 chrome 真的跟著變色 → 改回原值

## 影響範圍

**修改**
- `packages/tokens/build.js` — dark theme 選擇器擴充
- `apps/docs/package.json` — 加 dep
- `apps/docs/.vitepress/theme/index.ts` — import tokens.css
- `apps/docs/.vitepress/theme/custom.css` — brand hex → var()
- `CLAUDE.md` — 補架構說明
- `pnpm-lock.yaml` — 自動

**自動重生**
- `packages/tokens/tokens.css`（dark 多一個 `.dark` 選擇器）

**不動**
- 元件原始碼
- DemoBlock 機制
- 元件 demo / preview HTML
- VitePress 中性色 / prose / code block

## 風險與對策

| 風險 | 對策 |
|---|---|
| tokens.css import 後與 custom.css 順序錯，brand hex 先被 custom 蓋過 | theme/index.ts import 順序：tokens.css 先、custom.css 後 |
| `.dark` 選擇器特異性與 `[data-theme="dark"]` 不同造成覆寫順序問題 | 兩個都是單一 class/attribute selector，特異性相同；輸出順序由 build 控制 |
| color-mix() 在舊瀏覽器不支援 | Chrome 111+/Safari 16.2+/Firefox 113+ 已支援；專案已用 ES2022，可接受 |
| 將來改 tokens 的 brand 色卻忘了 build:tokens | `pnpm build` pipeline 已自動跑 build:tokens，不會漏 |

## 預估
- 修改：5 檔（含 CLAUDE.md）
- 工時：30 分鐘做改動 + 30 分鐘 dev server 視覺驗證
- 共 ~60 分鐘

## 總結

### 完成項目
- ✅ `packages/tokens/build.js`：dark 分支選擇器擴成 `[data-theme="dark"], .dark`，匹配 VitePress 的 `.dark` class
- ✅ `apps/docs/package.json`：加 `@gov-tw/tokens: workspace:*`
- ✅ `apps/docs/.vitepress/theme/index.ts`：在 `custom.css` 之前 import `@gov-tw/tokens/tokens.css`
- ✅ `apps/docs/.vitepress/theme/custom.css`：移除 8 處 brand/indigo hex 與整段 `.dark` 區塊，改用 `var(--govtw-color-brand-primary)` + `color-mix()` 推導 hover/active/soft；中性色 / 排版 / prose / hero 保留 VitePress 預設不動
- ✅ `CLAUDE.md`：新增「Docs 站 vs 元件 — 兩層獨立 UI」段落，文件化分層架構與選擇性綁定設計
- ✅ `pnpm build` 完整 pipeline 通過
- ✅ 端對端驗證：暫改 `primitive.color.blue.500` 為 `#FF6600` → tokens.css 自動更新 → `var()` 鏈傳遞到 `--vp-c-brand-1`；恢復原值

### 變更檔案
- `packages/tokens/build.js`
- `packages/tokens/tokens.css`（自動重生，dark 多匹配 `.dark` 選擇器）
- `apps/docs/package.json`
- `pnpm-lock.yaml`（自動）
- `apps/docs/.vitepress/theme/index.ts`
- `apps/docs/.vitepress/theme/custom.css`（boilerplate 從 23 行 brand 區塊降為 11 行 var 區塊）
- `CLAUDE.md`

### 後續建議
- dev server 開瀏覽器手測 light/dark 切換，確認 nav/sidebar/hero/連結色都正確（一致性最終確認需人眼）
- 若將來新增 `high-contrast` 等主題，build.js 同樣會自動產出 `[data-theme="high-contrast"]` 選擇器；如需也匹配 VitePress 的某個 class，可仿 dark 分支擴選擇器
- `color-mix()` 需要 Chrome 111+ / Safari 16.2+ / Firefox 113+，與專案 ES2022 目標相容；如需更舊瀏覽器支援可改回明確 token（在 tokens.json 加 `brand.primary-hover` / `-active`）
