# Select 選擇清單

## 概述

選擇清單讓使用者從預先定義的選項中擇一，使用瀏覽器原生的下拉 UI。

::: warning 多數情況請優先考慮其他元件
- **選項在 6 個以下**：用 [Radio](/components/radio) 一次顯示所有選項，更直觀
- **使用者可能用打字找選項**（如國家、地址）：用 autocomplete
- **選項超過 20 個且使用者已知道想選什麼**：才用 select

GOV.UK 的研究顯示 select 對行動裝置使用者、不熟悉電腦的使用者、輔助科技使用者都是相對困難的元件。
:::

## 互動範例

### 基本用法

選項以 `<option>` 子元素傳入，與原生 HTML 用法一致。

<DemoBlock direction="column" variant="default">
  <govtw-select label="居住縣市" name="city">
    <option value="">請選擇</option>
    <option value="taipei">臺北市</option>
    <option value="newtaipei">新北市</option>
    <option value="taoyuan">桃園市</option>
    <option value="taichung">臺中市</option>
    <option value="tainan">臺南市</option>
    <option value="kaohsiung">高雄市</option>
  </govtw-select>

  <template #code>

```html
<govtw-select label="居住縣市" name="city">
  <option value="">請選擇</option>
  <option value="taipei">臺北市</option>
  <option value="newtaipei">新北市</option>
  <option value="taoyuan">桃園市</option>
  <option value="taichung">臺中市</option>
  <option value="tainan">臺南市</option>
  <option value="kaohsiung">高雄市</option>
</govtw-select>
```

  </template>
</DemoBlock>

### 含提示文字

<DemoBlock direction="column" variant="hint">
  <govtw-select label="申辦類別" hint="不確定要選哪一項時，請參考類別說明" name="category">
    <option value="">請選擇類別</option>
    <option value="a">類別 A — 一般申辦</option>
    <option value="b">類別 B — 加急申辦</option>
    <option value="c">類別 C — 特殊申辦</option>
  </govtw-select>

  <template #code>

```html
<govtw-select
  label="申辦類別"
  hint="不確定要選哪一項時，請參考類別說明"
  name="category"
>
  <option value="">請選擇類別</option>
  <option value="a">類別 A — 一般申辦</option>
  <option value="b">類別 B — 加急申辦</option>
  <option value="c">類別 C — 特殊申辦</option>
</govtw-select>
```

  </template>
</DemoBlock>

### 分組（optgroup）

選項可用 `<optgroup>` 分組，幫助使用者快速辨識類別。

<DemoBlock direction="column" variant="optgroup">
  <govtw-select label="申辦地點" name="location">
    <option value="">請選擇</option>
    <optgroup label="北部">
      <option value="taipei">臺北市政府</option>
      <option value="newtaipei">新北市政府</option>
      <option value="taoyuan">桃園市政府</option>
    </optgroup>
    <optgroup label="中部">
      <option value="taichung">臺中市政府</option>
      <option value="changhua">彰化縣政府</option>
    </optgroup>
    <optgroup label="南部">
      <option value="tainan">臺南市政府</option>
      <option value="kaohsiung">高雄市政府</option>
    </optgroup>
  </govtw-select>

  <template #code>

```html
<govtw-select label="申辦地點" name="location">
  <option value="">請選擇</option>
  <optgroup label="北部">
    <option value="taipei">臺北市政府</option>
    <option value="newtaipei">新北市政府</option>
    <option value="taoyuan">桃園市政府</option>
  </optgroup>
  <optgroup label="中部">
    <option value="taichung">臺中市政府</option>
    <option value="changhua">彰化縣政府</option>
  </optgroup>
  <optgroup label="南部">
    <option value="tainan">臺南市政府</option>
    <option value="kaohsiung">高雄市政府</option>
  </optgroup>
</govtw-select>
```

  </template>
</DemoBlock>

### 預設選取

使用 `selected` 屬性設定預設選項。

<DemoBlock direction="column" variant="preselected">
  <govtw-select label="優先順序" name="priority">
    <option value="low">低</option>
    <option value="medium" selected>中（預設）</option>
    <option value="high">高</option>
  </govtw-select>

  <template #code>

```html
<govtw-select label="優先順序" name="priority">
  <option value="low">低</option>
  <option value="medium" selected>中（預設）</option>
  <option value="high">高</option>
</govtw-select>
```

  </template>
</DemoBlock>

### 錯誤狀態

<DemoBlock direction="column" variant="error">
  <govtw-select label="居住縣市" error="請選擇您的居住縣市" name="city-error">
    <option value="">請選擇</option>
    <option value="taipei">臺北市</option>
    <option value="kaohsiung">高雄市</option>
  </govtw-select>

  <template #code>

```html
<govtw-select label="居住縣市" error="請選擇您的居住縣市" name="city">
  <option value="">請選擇</option>
  <option value="taipei">臺北市</option>
  <option value="kaohsiung">高雄市</option>
</govtw-select>
```

  </template>
</DemoBlock>

### 停用狀態

<DemoBlock direction="column" variant="disabled">
  <govtw-select label="目前狀態" disabled>
    <option value="processing" selected>處理中（不可變更）</option>
  </govtw-select>

  <template #code>

```html
<govtw-select label="目前狀態" disabled>
  <option value="processing" selected>處理中（不可變更）</option>
</govtw-select>
```

  </template>
</DemoBlock>

## 使用方式

```bash
pnpm add @gov-tw/web-components
```

```ts
import '@gov-tw/web-components/govtw-select';
```

```html
<!-- 基本 -->
<govtw-select label="居住縣市" name="city">
  <option value="">請選擇</option>
  <option value="taipei">臺北市</option>
  <option value="kaohsiung">高雄市</option>
</govtw-select>

<!-- 含提示 -->
<govtw-select label="申辦類別" hint="說明文字" name="category">
  <option value="a">A</option>
  <option value="b">B</option>
</govtw-select>

<!-- 錯誤 -->
<govtw-select label="必選項目" error="請選擇" name="required-field">
  <option value="">請選擇</option>
  <option value="a">A</option>
</govtw-select>
```

## 屬性

| 屬性 | 型別 | 預設值 | 說明 |
|------|------|--------|------|
| `label` | `string` | `''` | 標籤文字 |
| `hint` | `string` | `''` | 提示文字，顯示在標籤下方 |
| `error` | `string` | `''` | 錯誤訊息，觸發紅色邊框與左側邊線 |
| `name` | `string` | `''` | 表單欄位名稱 |
| `value` | `string` | `''` | 目前選取的值 |
| `autocomplete` | `string` | `''` | 瀏覽器自動填入提示 |
| `disabled` | `boolean` | `false` | 是否停用 |

選項以 `<option>` / `<optgroup>` 子元素傳入（不是屬性）。

## 事件

| 事件 | 說明 |
|------|------|
| `change` | 使用者改變選項時觸發；可從 `event.target.value` 讀值 |

## 無障礙

- 每個 select 都有對應的 `<label>` 元素，透過 `for` / `id` 關聯
- 提示文字和錯誤訊息透過 `aria-describedby` 關聯到 select
- Focus 狀態以黃色 `#fd0` outline + 黑色加粗邊框清晰標示
- 錯誤狀態同時設定 `aria-invalid="true"`
- 使用原生 `<select>` 元素，鍵盤操作行為（上下鍵切換、空白鍵開啟、Esc 關閉）由瀏覽器/作業系統提供，與使用者習慣一致
- 支援 `ElementInternals` 參與原生表單提交

## 設計指引

### 何時使用

- 選項超過 20 個，且 radio 會顯得過於擁擠
- 使用者已經知道自己想選什麼，不需要瀏覽選項
- 內容偏靜態（如國家、年份、單位代碼）

### 何時不使用

- **選項在 6 個以下** — 用 [Radio](/components/radio)，使用者一眼可見所有選項
- **使用者可能用打字搜尋** — 用 autocomplete
- **可以選多項** — 用 [Checkbox](/components/checkbox)
- **是非題** — 用 Radio 顯示「是 / 否」

### 撰寫指引

- 標籤文字應簡短明確，不加冒號
- 第一個選項用 `<option value="">請選擇</option>` 作為預設提示，避免使用者誤以為已選好
- 選項文字用使用者熟悉的措辭，避免內部代碼或縮寫
- 選項排序：**有自然順序**用該順序（如年份、月份）；**無自然順序**用使用頻率或字母順序

### 相關元件

- [Radio](/components/radio) — 單選且選項不多時的首選
- [Checkbox](/components/checkbox) — 可複選
- [Text Input](/components/text-input) — 自由輸入
