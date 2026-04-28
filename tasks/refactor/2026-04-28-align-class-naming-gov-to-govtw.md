# 對齊元件 class 命名：`Gov*` → `Govtw*`

## 問題分析

### 現況
全專案命名前綴存在漂移：

| 層 | 前綴 | 範例 |
|---|---|---|
| 元素 tag | `govtw-` | `govtw-button` |
| CSS 變數 | `--govtw-` | `--govtw-color-brand-primary` |
| Token namespace | `govtw-` | `--govtw-button-primary-bg` |
| npm scope | `@gov-tw/` | `@gov-tw/web-components` |
| **TS class** | **`Gov`**（少 `tw`） | `GovButton`、`GovTextInput` |

`packages/web-components/src/index.ts` 的 11 個 export 全都用 `Gov` 開頭：

```ts
export { GovButton } from './govtw-button.js';
export { GovCheckbox } from './govtw-checkbox.js';
export { GovTextInput } from './govtw-text-input.js';
export { GovFieldset } from './govtw-fieldset.js';
export { GovStack } from './govtw-stack.js';
export { GovSidebar } from './govtw-sidebar.js';
export { GovCluster } from './govtw-cluster.js';
export { GovContainer } from './govtw-container.js';
export { GovTextarea } from './govtw-textarea.js';
export { GovLink } from './govtw-link.js';
export { GovRadio } from './govtw-radio.js';
```

### 根因
專案早期定名為 `Gov*`，後續其他層統一為 `govtw-` 但 class 沒同步。最近 `govtw-input` → `govtw-text-input` rename 時，class 也只跟著改 `GovInput` → `GovTextInput`，未順手對齊。

## 需求定義

### 目標
所有元件 class 統一前綴為 `Govtw`，與 tag/CSS var/npm scope 一致。

### 命名對照
| 現在 | 目標 |
|---|---|
| `GovButton` | `GovtwButton` |
| `GovCheckbox` | `GovtwCheckbox` |
| `GovTextInput` | `GovtwTextInput` |
| `GovFieldset` | `GovtwFieldset` |
| `GovStack` | `GovtwStack` |
| `GovSidebar` | `GovtwSidebar` |
| `GovCluster` | `GovtwCluster` |
| `GovContainer` | `GovtwContainer` |
| `GovTextarea` | `GovtwTextarea` |
| `GovLink` | `GovtwLink` |
| `GovRadio` | `GovtwRadio` |

### 驗收標準
- 11 個 src/govtw-*.ts 內 class 名 + `HTMLElementTagNameMap` 條目對齊
- `src/index.ts` 11 個 export 對齊
- `pnpm build`、`pnpm lint`、`pnpm check:components` 全綠
- 全專案 grep `\bGov[A-Z]` 殘留只剩 `tasks/` 歷史紀錄
- scaffolder（`scripts/new-component.mjs`）模板輸出新名

## 實作計劃

- [ ] 11 個 `packages/web-components/src/govtw-*.ts`：class 名 + `HTMLElementTagNameMap` 條目
- [ ] `packages/web-components/src/index.ts` 11 個 export
- [ ] `scripts/new-component.mjs`：模板字串內的 `Gov<Pascal>` → `Govtw<Pascal>`
- [ ] 任何測試檔（若有）import 的 class 名
- [ ] grep 確認無殘留：`grep -rEn '\\bGov[A-Z][a-z]+\\b' . --include='*.ts' --include='*.mjs'`（排除 `node_modules/` `dist/` `tasks/`）
- [ ] `pnpm build` + `pnpm lint` + `pnpm check:components`
- [ ] 任務文件補總結

## 影響範圍

**修改**
- 11 檔 `packages/web-components/src/govtw-*.ts`
- `packages/web-components/src/index.ts`
- `scripts/new-component.mjs`（scaffolder 模板）

**自動重生**
- `dist/*.js`、`dist/*.d.ts`（pnpm build:components）
- `dist/gov-tw.iife.js`

**不動**
- 元素 tag、CSS var、token、npm scope、文件
- `tasks/` 歷史紀錄

## 風險與對策

| 風險 | 對策 |
|---|---|
| 外部使用者已經 import `GovButton` | 專案早期，無外部使用者；如需遷移指引可在 CHANGELOG 標 BREAKING |
| 漏改某個 class 引用 | 完整 grep 驗證；TypeScript build 會在 dangling reference 時失敗 |

## 預估
- 修改：~12 檔、純 sed 替換 + 視覺檢查
- 工時：30 分鐘

## 總結

### 完成項目
- ✅ 11 個 `src/govtw-*.ts`：class 宣告 + `HTMLElementTagNameMap` 條目全部對齊 `Govtw*`
- ✅ `src/index.ts` 11 個 export 對齊
- ✅ `scripts/new-component.mjs:85` scaffolder 模板 `` `Gov${pascalName}` `` → `` `Govtw${pascalName}` ``
- ✅ `pnpm build` 通過、`pnpm lint` 乾淨
- ✅ 全專案 grep 無 `Gov(Button|Checkbox|...)` 殘留（除 `tasks/` 歷史記錄）

### 變更檔案
- 11 檔 `packages/web-components/src/govtw-*.ts`（class + tag map）
- `packages/web-components/src/index.ts`（11 個 export）
- `scripts/new-component.mjs`（scaffolder className 樣板）
- 自動重生：`packages/web-components/dist/*`

### 後續建議
- 無後續
