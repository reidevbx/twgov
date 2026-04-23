---
description: 建立新的 govtw-* Lit 元件（scaffolder-backed）
---

# /new-component <name> [options]

建立 gov.tw Design System 的新 Lit 元件。**務必使用 scaffolder，不要手動建檔**。

## 使用流程

1. **先建任務文件**（守則一）：`tasks/features/YYYY-MM-DD-<name>-component.md`
   - 填寫 問題分析 / 需求定義 / 實作計劃 / 影響範圍
   - 用 TaskCreate 列出步驟

2. **跑 scaffolder**：
   ```bash
   pnpm new:component <name> [--type=basic|form|layout] [--zh-name=中文名]
   ```
   - `basic`：一般互動元件（如 button、link）
   - `form`：表單元件（含 `formAssociated`、`attachInternals`、`setFormValue`、`formResetCallback`）
   - `layout`：佈局原語（含 `styleMap` + token）

3. **填寫 TODO**：
   - 元件 `.ts`：屬性宣告、樣式、render 內容
   - 文件 `.md`：屬性表、事件表、無障礙段落、設計指引
   - preview `.html`：示範內容

4. **驗證**：
   ```bash
   pnpm build          # 編譯 + 同步 public
   pnpm check:components  # 稽核完整性
   ```

5. **補任務文件的總結**（守則七）。

## 品質檢查清單（實作時對照）

- [ ] `@customElement('govtw-<name>')` tag 正確
- [ ] `declare global HTMLElementTagNameMap` 宣告已在檔尾
- [ ] 有可聚焦子元素時 `delegatesFocus: true`
- [ ] 表單元件：`static formAssociated = true` + `attachInternals()`
- [ ] CSS 只引用 Component-level token（不加 fallback）
- [ ] Focus ring 用 `box-shadow`，`:host` 加 `outline: none !important`
- [ ] 錯誤狀態加 `aria-invalid`
- [ ] `target="_blank"` 時自動補 `rel="noopener noreferrer"`
- [ ] `updated()` 用 `PropertyValues<this>` 型別
- [ ] 文件頁有：概述 / 互動範例 / 狀態展示 / 使用方式 / 屬性 / 事件 / 無障礙 / 設計指引
- [ ] preview HTML 載入 `/tokens.css` 與 `/gov-tw.iife.js`

## 參考

- 既有最佳實踐範例：`packages/web-components/src/govtw-button.ts`（basic）、`govtw-input.ts`（form）、`govtw-stack.ts`（layout）
- 完整工作守則：`CLAUDE.md` 的「工作守則」區段
- 任務文件規範：`tasks/README.md`
