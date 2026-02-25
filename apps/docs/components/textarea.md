# Textarea 多行文字輸入

## 概述

多行文字輸入讓使用者輸入較長的文字，例如備註、意見回饋、問題描述等。如果只需要單行輸入（如姓名、電話），應使用 Text Input。

## 互動範例

### 基本用法

<div class="demo-block demo-vertical">
  <govtw-textarea label="詳細說明" name="description"></govtw-textarea>
</div>

### 含提示文字

提示文字用於說明欄位的填寫格式或注意事項。

<div class="demo-block demo-vertical">
  <govtw-textarea label="申請原因" hint="請詳細說明您的申請原因，以利審核人員了解情況。" name="reason"></govtw-textarea>
</div>

### 字數限制

設定 `maxlength` 後，會顯示剩餘可輸入字數。超過限制時以紅色提示。

<div class="demo-block demo-vertical">
  <govtw-textarea label="意見回饋" hint="請提供您對本服務的建議" maxlength="200" name="feedback"></govtw-textarea>
</div>

### 調整行數

透過 `rows` 屬性調整預設顯示行數。

<div class="demo-block demo-vertical">
  <govtw-stack space="4">
    <govtw-textarea label="簡短備註" rows="3" name="short-note"></govtw-textarea>
    <govtw-textarea label="詳細描述" rows="8" name="long-note"></govtw-textarea>
  </govtw-stack>
</div>

### 錯誤狀態

當驗證失敗時，顯示錯誤訊息並以紅色邊框和左側紅線標示。

<div class="demo-block demo-vertical">
  <govtw-textarea label="問題描述" error="請填寫問題描述" name="issue"></govtw-textarea>
</div>

### 停用狀態

<div class="demo-block demo-vertical">
  <govtw-textarea label="不可編輯" value="此欄位無法修改" disabled></govtw-textarea>
</div>

<style>
.demo-block {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
  padding: 24px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  margin: 16px 0;
}

.demo-vertical {
  flex-direction: column;
  align-items: stretch;
}
</style>

## 使用方式

```html
<!-- 基本用法 -->
<govtw-textarea label="詳細說明" name="description"></govtw-textarea>

<!-- 含提示 -->
<govtw-textarea
  label="申請原因"
  hint="請詳細說明您的申請原因"
  name="reason"
></govtw-textarea>

<!-- 字數限制 -->
<govtw-textarea
  label="意見回饋"
  maxlength="200"
  name="feedback"
></govtw-textarea>

<!-- 錯誤狀態 -->
<govtw-textarea
  label="問題描述"
  error="請填寫問題描述"
></govtw-textarea>
```

## 屬性

| 屬性 | 型別 | 預設值 | 說明 |
|------|------|--------|------|
| `label` | `string` | `''` | 標籤文字 |
| `hint` | `string` | `''` | 提示文字，顯示在標籤下方 |
| `error` | `string` | `''` | 錯誤訊息，觸發紅色邊框與左側邊線 |
| `name` | `string` | `''` | 表單欄位名稱 |
| `value` | `string` | `''` | 欄位值 |
| `rows` | `number` | `5` | 預設顯示行數 |
| `maxlength` | `number` | `0` | 最大字數限制（`0` 表示不限制） |
| `placeholder` | `string` | `''` | 佔位文字（建議少用，改用 hint） |
| `autocomplete` | `string` | `''` | 瀏覽器自動填入提示 |
| `disabled` | `boolean` | `false` | 是否停用 |
| `spellcheck` | `boolean` | `false` | 是否啟用拼字檢查 |

## 無障礙

- 每個 textarea 都有對應的 `<label>` 元素，透過 `for` / `id` 關聯
- 提示文字和錯誤訊息透過 `aria-describedby` 關聯到 textarea
- Focus 狀態以黃色 `#fd0` outline + 黑色加粗邊框清晰標示
- 字數計數器設定 `aria-live="polite"`，螢幕閱讀器會自動朗讀剩餘字數
- 避免使用 `placeholder` 作為唯一的標籤，因為輸入後文字會消失
- 支援 `ElementInternals` 參與原生表單提交

## 設計指引

- 標籤文字應簡短明確，不加冒號
- 標籤放在欄位上方，不要放在左側
- 優先使用 hint 而非 placeholder 提供填寫提示
- 根據預期輸入內容調整 `rows`：簡短備註用 3 行，詳細描述用 8 行以上
- 有字數限制時務必設定 `maxlength`，讓使用者即時掌握剩餘字數
- 錯誤訊息應明確說明問題和修正方式
- Textarea 預設可垂直拖曳調整大小（`resize: vertical`）
