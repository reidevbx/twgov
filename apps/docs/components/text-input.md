# Text Input 文字輸入

## 概述

文字輸入讓使用者輸入單行文字，例如姓名、電話號碼、身分證字號等。如果需要多行輸入（如備註、意見回饋），應改用 Textarea。

## 互動範例

### 基本用法

<div class="demo-block demo-vertical">
  <govtw-input label="全名" name="fullname"></govtw-input>
</div>

### 含提示文字

提示文字用於說明欄位的填寫格式或條件。

<div class="demo-block demo-vertical">
  <govtw-input label="身分證字號" hint="英文字母開頭，共 10 碼" width="10"></govtw-input>
</div>

### 固定寬度

根據預期輸入長度設定寬度，幫助使用者判斷該填多少內容。用 `<govtw-cluster>` 水平排列，窄螢幕自動換行。

<div class="demo-block demo-vertical">
  <govtw-stack space="4">
    <govtw-input label="全寬（預設）" hint="地址、全名等長度不定的文字"></govtw-input>
    <govtw-input label="寬度 20" width="20" hint="較長的姓名、帳號"></govtw-input>
    <govtw-input label="寬度 10" width="10" hint="電話號碼、身分證字號"></govtw-input>
    <govtw-cluster space="4">
      <govtw-input label="寬度 5" width="5" hint="郵遞區號"></govtw-input>
      <govtw-input label="寬度 4" width="4" hint="年份"></govtw-input>
      <govtw-input label="寬度 3" width="3" hint="區碼"></govtw-input>
      <govtw-input label="寬度 2" width="2" hint="月 / 日"></govtw-input>
    </govtw-cluster>
  </govtw-stack>
</div>

### 實際場景：出生日期

短寬度欄位適合用 `<govtw-cluster>` 水平排列。

<div class="demo-block demo-vertical">
  <govtw-fieldset legend="出生日期" hint="例如：1990 年 3 月 15 日">
    <govtw-cluster space="3">
      <govtw-input label="年" width="4" inputmode="numeric"></govtw-input>
      <govtw-input label="月" width="2" inputmode="numeric"></govtw-input>
      <govtw-input label="日" width="2" inputmode="numeric"></govtw-input>
    </govtw-cluster>
  </govtw-fieldset>
</div>

### Prefix / Suffix

用於顯示單位或幣別符號，讓使用者明確知道欄位的語意。

<div class="demo-block demo-vertical">
  <govtw-stack space="4">
    <govtw-input label="金額" prefix="NT$" width="10"></govtw-input>
    <govtw-input label="重量" suffix="公斤" width="5"></govtw-input>
    <govtw-cluster space="4">
      <govtw-input label="費率" prefix="NT$" suffix="每月" width="10"></govtw-input>
    </govtw-cluster>
  </govtw-stack>
</div>

### 錯誤狀態

當驗證失敗時，顯示錯誤訊息並以紅色邊框和左側紅線標示。

<div class="demo-block demo-vertical">
  <govtw-input label="電子信箱" type="email" error="請輸入有效的電子信箱地址" value="abc"></govtw-input>
</div>

### 停用狀態

<div class="demo-block demo-vertical">
  <govtw-input label="不可編輯" value="此欄位無法修改" disabled></govtw-input>
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
<govtw-input label="姓名" name="name"></govtw-input>

<!-- 含提示 -->
<govtw-input
  label="電話"
  hint="市話請加區碼"
  type="tel"
  width="10"
></govtw-input>

<!-- 含 prefix / suffix -->
<govtw-input label="金額" prefix="NT$" width="10"></govtw-input>

<!-- 錯誤狀態 -->
<govtw-input
  label="電子信箱"
  type="email"
  error="請輸入有效的電子信箱地址"
></govtw-input>
```

## 屬性

| 屬性 | 型別 | 預設值 | 說明 |
|------|------|--------|------|
| `label` | `string` | `''` | 標籤文字 |
| `hint` | `string` | `''` | 提示文字，顯示在標籤下方 |
| `error` | `string` | `''` | 錯誤訊息，觸發紅色邊框與左側邊線 |
| `name` | `string` | `''` | 表單欄位名稱 |
| `value` | `string` | `''` | 欄位值 |
| `type` | `string` | `'text'` | 輸入類型（text, email, tel, url 等） |
| `width` | `'full' \| '20' \| '10' \| '5' \| '4' \| '3' \| '2'` | `'full'` | 欄位寬度 |
| `prefix` | `string` | `''` | 前綴文字（如 `NT$`） |
| `suffix` | `string` | `''` | 後綴文字（如 `公斤`） |
| `placeholder` | `string` | `''` | 佔位文字（建議少用，改用 hint） |
| `autocomplete` | `string` | `''` | 瀏覽器自動填入提示 |
| `inputmode` | `string` | `''` | 行動裝置鍵盤類型 |
| `disabled` | `boolean` | `false` | 是否停用 |
| `spellcheck` | `boolean` | `false` | 是否啟用拼字檢查 |

## 寬度選擇指引

使用固定寬度讓使用者從欄位大小推斷預期輸入長度。

| 寬度 | 適用場景 |
|------|----------|
| `full` | 地址、全名等長度不定的文字 |
| `20` | 較長的姓名、帳號 |
| `10` | 電話號碼、身分證字號 |
| `5` | 郵遞區號 |
| `4` | 年份 |
| `3` | 區碼 |
| `2` | 月、日 |

## 數字輸入注意事項

- **整數**：使用 `type="text"` 搭配 `inputmode="numeric"`，而非 `type="number"`
- **小數**：使用 `type="text"`，避免行動裝置數字鍵盤缺少小數點
- **避免使用 `type="number"`**：因滾輪可能意外改值，且無效輸入時欄位會無聲清空

```html
<!-- 推薦：整數輸入 -->
<govtw-input label="數量" inputmode="numeric" width="4"></govtw-input>

<!-- 不推薦 -->
<govtw-input label="數量" type="number"></govtw-input>
```

## 無障礙

- 每個 input 都有對應的 `<label>` 元素，透過 `for` / `id` 關聯
- 提示文字和錯誤訊息透過 `aria-describedby` 關聯到 input
- Focus 狀態以黃色 `#fd0` outline + 黑色加粗邊框清晰標示
- Prefix / suffix 設定 `aria-hidden="true"`，避免螢幕閱讀器重複朗讀
- 避免使用 `placeholder` 作為唯一的標籤，因為輸入後文字會消失
- 支援 `ElementInternals` 參與原生表單提交
- 搭配 `autocomplete` 屬性符合 WCAG 1.3.5（識別輸入目的）

## 設計指引

- 標籤文字應簡短明確，不加冒號
- 標籤放在欄位上方，不要放在左側
- 優先使用 hint 而非 placeholder 提供填寫提示
- 根據預期輸入內容選擇適當的固定寬度
- 錯誤訊息應明確說明問題和修正方式（如「請輸入有效的電子信箱地址」而非「格式錯誤」）
- 每個錯誤訊息都應有對應的錯誤欄位視覺標示
