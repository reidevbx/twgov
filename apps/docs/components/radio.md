# Radio 單選按鈕

## 概述

單選按鈕讓使用者從一組互斥選項中選取一個。參考 [GOV.UK Design System](https://design-system.service.gov.uk/components/radios/) 的設計，確保在所有狀態下都清晰可辨。

當選項只能二選一或多選一時使用 Radio；若允許多選，應改用 [Checkbox 核取方塊](/components/checkbox)。

## 互動範例

試著點擊選取、用 <kbd>Tab</kbd> 聚焦、<kbd>Space</kbd> 或方向鍵切換。

<DemoBlock direction="column">
  <govtw-radio name="demo-basic" value="a" label="選項 A" checked></govtw-radio>
  <govtw-radio name="demo-basic" value="b" label="選項 B"></govtw-radio>
  <govtw-radio name="demo-basic" value="c" label="選項 C"></govtw-radio>

  <template #code>

```html
<govtw-radio name="contact" value="email" label="電子郵件" checked></govtw-radio>
<govtw-radio name="contact" value="phone" label="電話"></govtw-radio>
<govtw-radio name="contact" value="mail" label="郵寄"></govtw-radio>
```

  </template>
</DemoBlock>

### 搭配 Fieldset 使用

一組 Radio 應以 `<govtw-fieldset>` 包裹，提供群組標題與說明文字。

<DemoBlock direction="column">
  <govtw-fieldset legend="您偏好的聯絡方式" hint="請選擇一種聯絡方式">
    <govtw-radio name="demo-fieldset" value="email" label="電子郵件"></govtw-radio>
    <govtw-radio name="demo-fieldset" value="phone" label="電話"></govtw-radio>
    <govtw-radio name="demo-fieldset" value="mail" label="郵寄"></govtw-radio>
  </govtw-fieldset>

  <template #code>

```html
<govtw-fieldset legend="您偏好的聯絡方式" hint="請選擇一種聯絡方式">
  <govtw-radio name="contact" value="email" label="電子郵件"></govtw-radio>
  <govtw-radio name="contact" value="phone" label="電話"></govtw-radio>
  <govtw-radio name="contact" value="mail" label="郵寄"></govtw-radio>
</govtw-fieldset>
```

  </template>
</DemoBlock>

### 使用 Slot 提供標籤內容

<DemoBlock direction="column">
  <govtw-radio name="demo-slot" value="agree">我同意<govtw-link href="#">服務條款</govtw-link>中的所有內容</govtw-radio>
  <govtw-radio name="demo-slot" value="disagree">我不同意</govtw-radio>

  <template #code>

```html
<govtw-radio name="terms" value="agree">
  我同意<govtw-link href="/terms">服務條款</govtw-link>中的所有內容
</govtw-radio>
<govtw-radio name="terms" value="disagree">我不同意</govtw-radio>
```

  </template>
</DemoBlock>

### 停用狀態

<DemoBlock direction="column">
  <govtw-radio name="demo-disabled" value="a" label="可選取"></govtw-radio>
  <govtw-radio name="demo-disabled" value="b" label="停用" disabled></govtw-radio>
  <govtw-radio name="demo-disabled" value="c" label="已選取但停用" checked disabled></govtw-radio>

  <template #code>

```html
<govtw-radio name="option" value="a" label="可選取"></govtw-radio>
<govtw-radio name="option" value="b" label="停用" disabled></govtw-radio>
<govtw-radio name="option" value="c" label="已選取但停用" checked disabled></govtw-radio>
```

  </template>
</DemoBlock>

## 互動狀態展示

### Hover（懸停）

滑鼠移到圓形上，邊框從 2px 加粗至 4px，提供不依賴色彩的觸覺回饋。

<DemoBlock no-code>
  <span class="demo-state-label">預設</span>
  <govtw-radio name="demo-hover-1" value="x" label="選項"></govtw-radio>
  <span class="demo-state-label">→ Hover</span>
  <govtw-radio name="demo-hover-2" value="x" label="選項" id="demo-radio-hover"></govtw-radio>
</DemoBlock>

### Focus（聚焦）

Tab 鍵聚焦時，圓形外圍出現 3px 黃色 focus ring。

<DemoBlock no-code>
  <span class="demo-state-label">預設</span>
  <govtw-radio name="demo-focus-1" value="x" label="選項"></govtw-radio>
  <span class="demo-state-label">→ Focus</span>
  <govtw-radio name="demo-focus-2" value="x" label="選項" id="demo-radio-focus"></govtw-radio>
</DemoBlock>

### Selected（選取）

選取後邊框變為品牌色，中心出現填滿的圓點。

<DemoBlock>
  <govtw-radio name="demo-selected-1" value="x" label="未選取"></govtw-radio>
  <govtw-radio name="demo-selected-2" value="x" label="已選取" checked></govtw-radio>

  <template #code>

```html
<govtw-radio name="option" value="a" label="未選取"></govtw-radio>
<govtw-radio name="option" value="b" label="已選取" checked></govtw-radio>
```

  </template>
</DemoBlock>

### Disabled（停用）

透明度降至 50%，游標變為禁止符號。

<DemoBlock>
  <govtw-radio name="demo-dis-1" value="x" label="預設"></govtw-radio>
  <govtw-radio name="demo-dis-2" value="x" label="停用" disabled></govtw-radio>

  <template #code>

```html
<govtw-radio name="option" value="a" label="預設"></govtw-radio>
<govtw-radio name="option" value="b" label="停用" disabled></govtw-radio>
```

  </template>
</DemoBlock>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  const findInShadowRoots = (id) => {
    const hosts = document.querySelectorAll('.demo-block-preview')
    for (const host of hosts) {
      const shadow = host.shadowRoot
      if (!shadow) continue
      const el = shadow.querySelector(`#${id}`)
      if (el) return el
    }
    return null
  }

  const applyStyle = (id, fn) => {
    const attempt = () => {
      const el = findInShadowRoots(id)
      if (!el) {
        requestAnimationFrame(attempt)
        return
      }
      const apply = () => {
        const circle = el.shadowRoot?.querySelector('.radio__circle')
        if (circle) fn(circle)
        else requestAnimationFrame(apply)
      }
      apply()
    }
    setTimeout(attempt, 100)
  }

  applyStyle('demo-radio-hover', (circle) => {
    circle.style.borderWidth = '4px'
  })

  applyStyle('demo-radio-focus', (circle) => {
    circle.style.boxShadow = '0 0 0 var(--govtw-radio-focus-width) var(--govtw-radio-focus-color)'
  })
})
</script>

## 使用方式

```html
<!-- 基本用法 -->
<govtw-radio name="contact" value="email" label="電子郵件"></govtw-radio>
<govtw-radio name="contact" value="phone" label="電話"></govtw-radio>

<!-- 預設選取 -->
<govtw-radio name="contact" value="email" label="電子郵件" checked></govtw-radio>

<!-- 搭配 Fieldset -->
<govtw-fieldset legend="您偏好的聯絡方式">
  <govtw-radio name="contact" value="email" label="電子郵件"></govtw-radio>
  <govtw-radio name="contact" value="phone" label="電話"></govtw-radio>
</govtw-fieldset>

<!-- 使用 slot 傳入 HTML 標籤 -->
<govtw-radio name="terms" value="agree">
  我同意<govtw-link href="/terms">服務條款</govtw-link>
</govtw-radio>
```

## 屬性

| 屬性 | 型別 | 預設值 | 說明 |
|------|------|--------|------|
| `checked` | `boolean` | `false` | 是否選取 |
| `disabled` | `boolean` | `false` | 是否停用 |
| `value` | `string` | `''` | 表單送出值 |
| `name` | `string` | `''` | 表單欄位名稱（同群組須一致） |
| `label` | `string` | `''` | 標籤文字（也可用 slot） |

## 樣式 Token

| Token | 預設值 | 說明 |
|-------|--------|------|
| `--govtw-radio-size` | `40px` | 圓形大小 |
| `--govtw-radio-border-color` | `--govtw-color-text-primary` | 邊框色 |
| `--govtw-radio-bg` | `--govtw-color-bg-canvas` | 背景色 |
| `--govtw-radio-selected-color` | `--govtw-color-brand-primary` | 選取色（邊框 + 圓點） |
| `--govtw-radio-label-color` | `--govtw-color-text-primary` | 標籤文字色 |
| `--govtw-radio-focus-color` | `--govtw-focus-color` | Focus ring 色 |
| `--govtw-radio-focus-width` | `--govtw-focus-width` | Focus ring 寬度 |

## 無障礙

- 使用原生 `<input type="radio">` 確保螢幕閱讀器支援
- 鍵盤操作：Tab 聚焦群組，方向鍵在群組內切換，Space 選取
- 焦點狀態以黃色 focus ring 清晰標示
- Hover 時邊框加粗，提供不依賴色彩的回饋
- 停用狀態保留在 DOM 中，使用 `disabled` 屬性
- `<label>` 包覆整個元件，點擊標籤文字也能選取
- 支援 `ElementInternals` 參與原生表單提交
- 同一群組使用相同的 `name` 屬性，確保互斥行為

## 設計指引

- 選項為 2 個以上且互斥時使用 Radio
- 若允許多選，應改用 [Checkbox 核取方塊](/components/checkbox)
- 一組 Radio 應以 `<govtw-fieldset>` 包裹，提供群組標題
- 選項數量建議不超過 7 個，過多時考慮使用下拉選單
- 標籤文字應清楚描述各選項
- 若有合理的預設值，可預先選取一個選項
- 選項之間保持 `--govtw-spacing-2` 以上的間距
- 選項順序應有邏輯（如：最常用的在前、字母順序等）
