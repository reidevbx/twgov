# Fieldset 欄位群組

## 概述

Fieldset 用於將相關的表單欄位組合在一起，讓使用者理解欄位之間的關係。例如「地址」包含多個輸入欄位，應以 fieldset 包覆並加上 legend 說明。

## 互動範例

### 基本用法

<DemoBlock direction="column">
  <govtw-fieldset legend="聯絡資訊" size="l">
    <govtw-input label="姓名" name="name"></govtw-input>
    <govtw-input label="電子信箱" name="email" type="email" hint="例如：user@example.gov.tw"></govtw-input>
    <govtw-input label="電話" name="phone" type="tel" width="10"></govtw-input>
  </govtw-fieldset>

  <template #code>

```html
<govtw-fieldset legend="聯絡資訊" size="l">
  <govtw-input label="姓名" name="name"></govtw-input>
  <govtw-input label="電子信箱" name="email" type="email" hint="例如：user@example.gov.tw"></govtw-input>
  <govtw-input label="電話" name="phone" type="tel" width="10"></govtw-input>
</govtw-fieldset>
```

  </template>
</DemoBlock>

### 含提示文字

<DemoBlock direction="column">
  <govtw-fieldset legend="寄送地址" hint="請填寫您希望收到文件的地址">
    <govtw-input label="縣市" width="10"></govtw-input>
    <govtw-input label="區鄉鎮市" width="10"></govtw-input>
    <govtw-input label="街道地址"></govtw-input>
  </govtw-fieldset>

  <template #code>

```html
<govtw-fieldset legend="寄送地址" hint="請填寫您希望收到文件的地址">
  <govtw-input label="縣市" width="10"></govtw-input>
  <govtw-input label="區鄉鎮市" width="10"></govtw-input>
  <govtw-input label="街道地址"></govtw-input>
</govtw-fieldset>
```

  </template>
</DemoBlock>

### 錯誤狀態

Fieldset 層級的錯誤訊息會在左側顯示紅色邊線，標示整組欄位有問題。

<DemoBlock direction="column">
  <govtw-fieldset legend="出生日期" error="請填寫完整的出生日期" hint="例如：1990 年 3 月 15 日">
    <div style="display: flex; gap: 12px;">
      <govtw-input label="年" width="4" error=" "></govtw-input>
      <govtw-input label="月" width="2" error=" "></govtw-input>
      <govtw-input label="日" width="2" error=" "></govtw-input>
    </div>
  </govtw-fieldset>

  <template #code>

```html
<govtw-fieldset legend="出生日期" error="請填寫完整的出生日期" hint="例如：1990 年 3 月 15 日">
  <div style="display: flex; gap: 12px;">
    <govtw-input label="年" width="4" error=" "></govtw-input>
    <govtw-input label="月" width="2" error=" "></govtw-input>
    <govtw-input label="日" width="2" error=" "></govtw-input>
  </div>
</govtw-fieldset>
```

  </template>
</DemoBlock>

## 使用方式

```html
<govtw-fieldset legend="聯絡資訊">
  <govtw-input label="姓名" name="name"></govtw-input>
  <govtw-input label="電子信箱" name="email" type="email"></govtw-input>
</govtw-fieldset>
```

### 搭配提示與錯誤

```html
<govtw-fieldset
  legend="寄送地址"
  hint="請填寫您希望收到文件的地址"
  error="地址不完整，請檢查"
>
  <govtw-input label="縣市"></govtw-input>
  <govtw-input label="街道地址"></govtw-input>
</govtw-fieldset>
```

## 屬性

| 屬性 | 型別 | 預設值 | 說明 |
|------|------|--------|------|
| `legend` | `string` | `''` | 群組標題，作為 `<legend>` 渲染 |
| `size` | `'xl' \| 'l' \| 'm' \| 's'` | `'l'` | Legend 的文字大小 |
| `hint` | `string` | `''` | 提示文字，出現在 legend 下方 |
| `error` | `string` | `''` | 錯誤訊息，觸發左側紅色邊線 |

### Legend 尺寸對照

| Size | 字級 | 對應標題 |
|------|------|----------|
| `xl` | 36px（`--govtw-font-size-4xl`） | h1 頁面標題 |
| `l` | 30px（`--govtw-font-size-3xl`） | h1 或 h2 |
| `m` | 24px（`--govtw-font-size-2xl`） | h2 或 h3 |
| `s` | 20px（`--govtw-font-size-xl`） | h3 或 h4 |

## 何時使用

- 多個欄位具有共同脈絡時（如地址、日期）
- 一組 Radio Button 或 Checkbox 需要共同標題時
- 採用「一頁一問題」模式，legend 可作為頁面標題

## 何時不使用

- 單一獨立欄位不需要 fieldset，使用 `<govtw-input>` 即可
- 欄位之間沒有明確的群組關係

## 無障礙

- 使用語意化的 `<fieldset>` 和 `<legend>` 元素，螢幕閱讀器會自動朗讀群組標題
- `<legend>` 必須是 `<fieldset>` 的第一個子元素
- 提示文字和錯誤訊息透過 `aria-describedby` 關聯到 fieldset
- 當 fieldset 作為頁面唯一問題時，legend 可同時作為頁面 `<h1>` 標題，避免螢幕閱讀器重複朗讀

## 設計指引

- Legend 文字應簡潔描述這組欄位的用途
- 使用合適的 legend 尺寸配合頁面標題層級
- 避免巢狀 fieldset（fieldset 內再包 fieldset），會造成螢幕閱讀器困擾
- 錯誤狀態除了紅色邊線外，務必提供文字說明
