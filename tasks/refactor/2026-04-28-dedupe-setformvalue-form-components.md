# 移除表單元件 setFormValue 的重複呼叫

## 問題分析

### 現況
`text-input`、`textarea`、`checkbox` 等表單元件每次 input 事件都會呼叫 `_internals.setFormValue()` **兩次**：

1. event handler 內主動呼叫
2. handler 內 `this.value = ...` 觸發 Lit 的 `updated()`，`updated()` 內又因 `changed.has('value')` 再呼叫一次

範例（`packages/web-components/src/govtw-text-input.ts:200-218`）：

```ts
private _handleInput(e: Event) {
  const input = e.target as HTMLInputElement;
  this.value = input.value;
  this._internals.setFormValue(this.value);   // ← 第一次
  this.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
}

private _handleChange(e: Event) {
  const input = e.target as HTMLInputElement;
  this.value = input.value;
  this._internals.setFormValue(this.value);   // ← 第一次（change 事件路徑）
  this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
}

updated(changed: PropertyValues<this>) {
  if (changed.has('value')) {
    this._internals.setFormValue(this.value); // ← 永遠會被觸發
  }
}
```

### 根因
- `setFormValue` 寫進 handler 是直覺反應（「事件發生時告訴 form」）
- 後來補 `updated()` hook（為了支援程式化設 `el.value = 'x'` 的場景），沒清掉 handler 內的呼叫
- 兩條路徑都正確，但每次互動會呼叫 2 次

### 影響
- 功能正確（重複 setFormValue 是 idempotent）
- 效能：每次按鍵多一次跨邊界 internals 呼叫；非熱路徑，但不必要
- 程式碼：認知負擔，違反 single source of truth

## 需求定義

### 目標
保留 `updated()` 為唯一 setFormValue 點，移除 handler 內的重複呼叫。

### After
```ts
private _handleInput(e: Event) {
  this.value = (e.target as HTMLInputElement).value;
  this.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
}

private _handleChange(e: Event) {
  this.value = (e.target as HTMLInputElement).value;
  this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
}

updated(changed: PropertyValues<this>) {
  if (changed.has('value')) {
    this._internals.setFormValue(this.value);
  }
}
```

### 驗收標準
- 表單提交時 FormData 正確包含元件值（手動測或加 test）
- 程式化 `el.value = 'x'` 仍能更新 form value
- formReset 行為不變
- `pnpm build` + `pnpm lint` 全綠

## 實作計劃

需檢查的元件：
- [ ] `packages/web-components/src/govtw-text-input.ts`
- [ ] `packages/web-components/src/govtw-textarea.ts`
- [ ] `packages/web-components/src/govtw-checkbox.ts`
- [ ] `packages/web-components/src/govtw-radio.ts`（檢查是否同樣有此問題）
- [ ] 其他 form-associated 元件（grep `_internals.setFormValue` 確認範圍）

每個元件：
1. 確認 `updated()` 有處理 `value`（或對應屬性如 checkbox 的 `checked`）
2. 從 handler 移除 `setFormValue` 呼叫
3. 保留 `dispatchEvent`（事件分派與 form value 是兩件事）

驗證：
- [ ] `pnpm build`、`pnpm lint`
- [ ] 開 `pnpm dev`，到 text-input.md、textarea.md、checkbox.md、radio.md 各頁手動互動，DevTools 看 FormData（或在 console 跑 `new FormData(form)` 驗證）
- [ ] 程式化設值測試：`document.querySelector('govtw-text-input').value = 'foo'`、submit form、檢 FormData

## 影響範圍

**修改**
- 4 個元件 `.ts`（精準改 handler 與 updated 配對）

**不動**
- API、props、事件、樣式
- 文件

## 風險與對策

| 風險 | 對策 |
|---|---|
| 某元件 `updated()` 沒處理 form value | 逐個元件確認；先補 `updated()` 再清 handler |
| Lit 的 `updated` 在某些 edge case（如 reflect 屬性）行為不同 | 寫一個小 manual test plan，跨各元件跑一遍 |
| Form reset 後 value 沒同步 | `formResetCallback` 通常設 `this.value = ''` 會觸發 `updated`，路徑相通 |

## 預估
- 修改：4 檔、小範圍局部修改
- 驗證：手動 form value 測試
- 工時：1 小時

## 總結

### 完成項目
- ✅ `govtw-text-input.ts:200-208` — 移除 `_handleInput` 與 `_handleChange` 內各 1 次 setFormValue
- ✅ `govtw-textarea.ts:140-152` — 同上
- ✅ `govtw-checkbox.ts:147-152` — 移除 `_handleChange` 內 1 次 setFormValue
- ✅ `govtw-radio.ts:222-228` — 移除 `_select()` 內 1 次 setFormValue
- ✅ 順手簡化 handler 寫法：`const x = e.target as ...; this.value = x.value;` → `this.value = (e.target as ...).value;`
- ✅ 每個元件保留 `updated()` 為唯一 setFormValue 點；reset 路徑（`formResetCallback` 設 value/checked → 觸發 updated）不變
- ✅ `pnpm build`、`pnpm lint` 通過；`pnpm check:components` 仍只剩既有佈局元件問題
- ⚠️ form value 行為手動驗證未執行（需 dev server + DevTools），請使用者實測：
  1. 在 text-input/textarea 鍵入字，submit form → FormData 應包含值
  2. checkbox/radio 點擊勾選 → FormData 應反映選取
  3. 程式化 `el.value = 'x'` 後 submit → FormData 應為 'x'
  4. form reset → FormData 應為空/初值

### 變更檔案
- `packages/web-components/src/govtw-text-input.ts`
- `packages/web-components/src/govtw-textarea.ts`
- `packages/web-components/src/govtw-checkbox.ts`
- `packages/web-components/src/govtw-radio.ts`

### 後續建議
- 加入簡單的 form integration test（用 happy-dom / jsdom 驗證 FormData 行為），讓未來類似 refactor 不需手動驗證
