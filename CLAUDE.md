# gov.tw Design System

台灣政府數位服務設計系統，參考 GOV.UK Design System，以 Web Components 實作、VitePress 承載文件。

## 架構

pnpm workspace monorepo，分為 `apps/`（應用）與 `packages/`（共用套件）。

- **`packages/tokens`** — 設計 Token 的單一來源（`tokens.json` → `tokens.css` / `tailwind.css`）
- **`packages/web-components`** — Lit 3 Web Components，每個元件一個檔案
- **`apps/docs`** — VitePress 文件站台，元件頁面含 live demo

## 指令

```bash
pnpm dev             # 文件站台 dev server
pnpm build           # 建置文件站台（用於驗證）
pnpm build:tokens    # 重建 token 產出檔
```

## 命名規則

- 元件 tag：`govtw-<name>`（如 `govtw-button`）
- 元件檔案：`govtw-<name>.ts`
- CSS token 前綴：`--govtw-`
- npm scope：`@gov-tw/`
- 文件頁面：`apps/docs/components/<name>.md`

## 核心原則

### 無障礙
- WCAG 2.2 AA 為最低標準
- 互動回饋不依賴色彩作為唯一指示
- 使用原生語意化元素（`<button>`、`<input>`），不自造可聚焦元素
- 最小觸控目標 44x44px

### 元件開發
- 使用 Lit 3 + TypeScript 裝飾器
- 含可聚焦元素的元件必須設定 `delegatesFocus: true`
- 表單元件使用 `formAssociated` + `ElementInternals` 參與原生表單
- CSS 使用 `--govtw-*` token 並提供 fallback 值
- Focus ring 統一用 `box-shadow`（非 `outline`），顏色 `#fd0`
- `:host` 加 `outline: none !important` 抑制瀏覽器預設 focus 框

### Token
- 唯一來源是 `packages/tokens/tokens.json`
- 修改後須執行 `pnpm build:tokens`
- 前綴 `--govtw-`，分類：`color`、`spacing`、`radius`、`font`

### 文件
- 語言：繁體中文（zh-TW）
- 每個元件頁面結構：概述 → 互動範例 → 狀態展示 → 使用方式 → 屬性表 → 無障礙 → 設計指引
- 元件 demo 直接使用 `<govtw-*>` 自訂元素，狀態展示透過 Shadow DOM 注入 inline style

## 新增元件步驟

1. `packages/web-components/src/govtw-<name>.ts` — 建立元件
2. `packages/web-components/src/index.ts` — 加入 export
3. `packages/web-components/package.json` — 加入 exports entry
4. `apps/docs/components/<name>.md` — 建立文件頁面
5. `apps/docs/.vitepress/config.mts` — sidebar 加入連結
6. `pnpm build` 驗證

## 技術約束

- TypeScript：`experimentalDecorators: true`、`useDefineForClassFields: false`（Lit 必需）
- VitePress 需在 `config.mts` 設定 `isCustomElement: tag => tag.startsWith('govtw-')`
- Web Components 僅在 client-side 動態 import（SSR 不支援自訂元素）
- 設計參考：[GOV.UK Design System](https://design-system.service.gov.uk/)
