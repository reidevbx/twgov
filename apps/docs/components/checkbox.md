# Checkbox 核取方塊

## 概述

核取方塊讓使用者從一組選項中選取一個或多個項目，也可用於單一布林選項（如同意條款）。

## 互動範例

試著點擊勾選、用 <kbd>Tab</kbd> 聚焦、<kbd>Space</kbd> 切換。

<DemoBlock direction="column">
  <govtw-checkbox label="我同意服務條款"></govtw-checkbox>
  <govtw-checkbox label="訂閱電子報" checked></govtw-checkbox>
  <govtw-checkbox label="無法選取" disabled></govtw-checkbox>
  <govtw-checkbox label="已勾選但停用" checked disabled></govtw-checkbox>

  <template #code>

```html
<govtw-checkbox label="我同意服務條款"></govtw-checkbox>
<govtw-checkbox label="訂閱電子報" checked></govtw-checkbox>
<govtw-checkbox label="無法選取" disabled></govtw-checkbox>
<govtw-checkbox label="已勾選但停用" checked disabled></govtw-checkbox>
```

  </template>
</DemoBlock>

### 使用 Slot 提供標籤內容

<DemoBlock direction="column">
  <govtw-checkbox>我已閱讀並同意<a href="#">隱私政策</a></govtw-checkbox>

  <template #code>

```html
<govtw-checkbox>我已閱讀並同意<a href="#">隱私政策</a></govtw-checkbox>
```

  </template>
</DemoBlock>

## 互動狀態展示

### Hover（懸停）

滑鼠移到方塊上，邊框從 2px 加粗至 4px，提供不依賴色彩的觸覺回饋。

<DemoBlock no-code>
  <span class="demo-state-label">預設</span>
  <govtw-checkbox label="選項"></govtw-checkbox>
  <span class="demo-state-label">→ Hover</span>
  <govtw-checkbox label="選項" id="demo-hover"></govtw-checkbox>
</DemoBlock>

### Focus（聚焦）

Tab 鍵聚焦時，方塊外圍出現 3px 黃色 `#fd0` focus ring。

<DemoBlock no-code>
  <span class="demo-state-label">預設</span>
  <govtw-checkbox label="選項"></govtw-checkbox>
  <span class="demo-state-label">→ Focus</span>
  <govtw-checkbox label="選項" id="demo-focus"></govtw-checkbox>
</DemoBlock>

### Checked（勾選）

勾選後邊框變為品牌綠色，顯示旋轉邊框勾號。

<DemoBlock>
  <govtw-checkbox label="未勾選"></govtw-checkbox>
  <govtw-checkbox label="已勾選" checked></govtw-checkbox>

  <template #code>

```html
<govtw-checkbox label="未勾選"></govtw-checkbox>
<govtw-checkbox label="已勾選" checked></govtw-checkbox>
```

  </template>
</DemoBlock>

### Disabled（停用）

透明度降至 50%，游標變為禁止符號。

<DemoBlock>
  <govtw-checkbox label="預設"></govtw-checkbox>
  <govtw-checkbox label="停用" disabled></govtw-checkbox>

  <template #code>

```html
<govtw-checkbox label="預設"></govtw-checkbox>
<govtw-checkbox label="停用" disabled></govtw-checkbox>
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
        const box = el.shadowRoot?.querySelector('.checkbox__box')
        if (box) fn(box)
        else requestAnimationFrame(apply)
      }
      apply()
    }
    setTimeout(attempt, 100)
  }

  applyStyle('demo-hover', (box) => {
    box.style.borderWidth = '4px'
  })

  applyStyle('demo-focus', (box) => {
    box.style.boxShadow = '0 0 0 var(--govtw-checkbox-focus-width) var(--govtw-checkbox-focus-color)'
  })
})
</script>

## 使用方式

```html
<!-- 使用 label 屬性 -->
<govtw-checkbox label="同意條款"></govtw-checkbox>
<govtw-checkbox label="已勾選" checked></govtw-checkbox>
<govtw-checkbox label="停用" disabled></govtw-checkbox>

<!-- 使用 slot 傳入 HTML 標籤 -->
<govtw-checkbox>
  我同意<a href="#">條款</a>
</govtw-checkbox>
```

## 屬性

| 屬性 | 型別 | 預設值 | 說明 |
|------|------|--------|------|
| `checked` | `boolean` | `false` | 是否勾選 |
| `disabled` | `boolean` | `false` | 是否停用 |
| `value` | `string` | `'on'` | 表單送出值 |
| `name` | `string` | `''` | 表單欄位名稱 |
| `label` | `string` | `''` | 標籤文字（也可用 slot） |

## 無障礙

- 使用原生 `<input type="checkbox">` 確保螢幕閱讀器支援
- 鍵盤操作：Tab 聚焦，Space 切換勾選
- 焦點狀態以黃色 `#fd0` focus ring 清晰標示
- Hover 時邊框加粗，提供不依賴色彩的回饋
- 停用狀態保留在 DOM 中，使用 `disabled` 屬性
- `<label>` 包覆整個元件，點擊標籤文字也能切換
- 支援 `ElementInternals` 參與原生表單提交

## 設計指引

- 當選項為 2 個以上時使用核取方塊
- 單一布林選項（如「同意條款」）也適合使用
- 每個核取方塊之間保持 `--govtw-spacing-2` 以上的間距
- 標籤文字應清楚描述選項內容
- 預設勾選的項目應有合理原因，避免誤導使用者
- 若需互斥選擇（只能選一個），應改用 Radio Button
