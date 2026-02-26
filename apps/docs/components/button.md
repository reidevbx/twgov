# Button 按鈕

## 概述

按鈕用於觸發動作或事件，是最基本的互動元件。

## 互動範例

試著操作下方按鈕：hover（滑鼠移入）、按下去（active）、用 <kbd>Tab</kbd> 鍵聚焦（focus）。

<DemoBlock>
  <govtw-button variant="primary">送出</govtw-button>
  <govtw-button variant="secondary">取消</govtw-button>
  <govtw-button variant="danger">刪除</govtw-button>

  <template #code>

```html
<govtw-button variant="primary">送出</govtw-button>
<govtw-button variant="secondary">取消</govtw-button>
<govtw-button variant="danger">刪除</govtw-button>
```

  </template>
</DemoBlock>

### 尺寸

<DemoBlock>
  <govtw-button size="sm">小按鈕</govtw-button>
  <govtw-button size="md">中按鈕</govtw-button>
  <govtw-button size="lg">大按鈕</govtw-button>

  <template #code>

```html
<govtw-button size="sm">小按鈕</govtw-button>
<govtw-button size="md">中按鈕</govtw-button>
<govtw-button size="lg">大按鈕</govtw-button>
```

  </template>
</DemoBlock>

### 停用狀態

<DemoBlock>
  <govtw-button disabled>停用按鈕</govtw-button>
  <govtw-button variant="secondary" disabled>停用次要</govtw-button>

  <template #code>

```html
<govtw-button disabled>停用按鈕</govtw-button>
<govtw-button variant="secondary" disabled>停用次要</govtw-button>
```

  </template>
</DemoBlock>

## 互動狀態展示

按鈕的互動回饋參考 [GOV.UK Design System](https://design-system.service.gov.uk/components/button/) 的設計手法，核心目標是**不依賴顏色作為唯一的視覺指示**。

### Hover（懸停）

滑鼠移到按鈕上，背景色加深。即使是色覺障礙使用者，也能透過明暗變化感知狀態改變。

<DemoBlock no-code>
  <span class="demo-state-label">預設</span>
  <govtw-button variant="primary">送出</govtw-button>
  <span class="demo-state-label">→ Hover</span>
  <govtw-button variant="primary" id="demo-hover">送出</govtw-button>
</DemoBlock>

### Active（按壓）

按下按鈕時，底部 inset shadow 消失，視覺上按鈕「扁下去」。這是**不依賴色彩**的物理回饋。

<DemoBlock no-code>
  <span class="demo-state-label">預設（有底部陰影）</span>
  <govtw-button variant="primary">送出</govtw-button>
  <span class="demo-state-label">→ Active（陰影消失）</span>
  <govtw-button variant="primary" id="demo-active">送出</govtw-button>
</DemoBlock>

### Focus（聚焦）

用 <kbd>Tab</kbd> 鍵導航時，按鈕外圍出現 3px 黃色 `#fd0` focus ring，貼合圓角。

<DemoBlock no-code>
  <span class="demo-state-label">預設</span>
  <govtw-button variant="primary">送出</govtw-button>
  <span class="demo-state-label">→ Focus</span>
  <govtw-button variant="primary" id="demo-focus">送出</govtw-button>
</DemoBlock>

### Disabled（停用）

透明度降至 50%，游標變為禁止符號。

<DemoBlock>
  <govtw-button variant="primary">預設</govtw-button>
  <govtw-button variant="primary" disabled>停用</govtw-button>

  <template #code>

```html
<govtw-button variant="primary">預設</govtw-button>
<govtw-button variant="primary" disabled>停用</govtw-button>
```

  </template>
</DemoBlock>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  // 元素在 DemoBlock 的 Shadow DOM 裡，需要從所有 shadow root 中查找
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
        const btn = el.shadowRoot?.querySelector('button')
        if (btn) fn(btn)
        else requestAnimationFrame(apply)
      }
      apply()
    }
    // 延遲一下讓 DemoBlock Shadow DOM 先建立
    setTimeout(attempt, 100)
  }

  // 用 color-mix() 從 token 動態算色，不 hardcode 色碼
  applyStyle('demo-hover', (btn) => {
    btn.style.background = 'color-mix(in srgb, var(--govtw-button-primary-bg) 85%, black)'
  })

  applyStyle('demo-active', (btn) => {
    btn.style.background = 'color-mix(in srgb, var(--govtw-button-primary-bg) 65%, black)'
    btn.style.boxShadow = 'none'
  })

  applyStyle('demo-focus', (btn) => {
    btn.style.boxShadow = 'inset 0 -3px 0 color-mix(in srgb, var(--govtw-button-primary-bg) 60%, black), 0 0 0 var(--govtw-button-focus-width) var(--govtw-button-focus-color)'
  })
})
</script>

## 使用方式

```html
<govtw-button>送出</govtw-button>
<govtw-button variant="secondary">取消</govtw-button>
<govtw-button variant="danger">刪除</govtw-button>
```

## 屬性

| 屬性 | 型別 | 預設值 | 說明 |
|------|------|--------|------|
| `variant` | `'primary' \| 'secondary' \| 'danger'` | `'primary'` | 按鈕樣式 |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | 按鈕大小 |
| `disabled` | `boolean` | `false` | 是否停用 |

## 樣式變體

### Primary（主要按鈕）

用於頁面上最重要的動作，每個頁面區塊建議只有一個主要按鈕。

- 背景色：`--govtw-color-brand-primary`
- 文字色：`--govtw-color-text-on-primary`

### Secondary（次要按鈕）

用於次要動作，可與主要按鈕搭配使用。

- 邊框：`--govtw-color-border-default`
- 文字色：`--govtw-color-text-primary`

### Danger（危險按鈕）

用於刪除、移除等破壞性操作。

- 背景色：`--govtw-color-feedback-error`
- 文字色：`--govtw-color-text-on-primary`

## 無障礙

- 使用語意化的 `<button>` 元素
- 確保鍵盤可操作（Enter 和 Space）
- 焦點狀態以黃色 focus ring 清晰標示，支援鍵盤導航
- 互動回饋透過 inset shadow 消失傳達按壓感，不僅依靠色彩
- 停用狀態使用 `aria-disabled` 而非移除元素
- 透明邊框確保 Windows 高對比模式下可見
- 色彩對比度符合 WCAG 2.2 AA 標準（至少 4.5:1）

## 設計指引

- 按鈕文字應簡潔明確，描述動作（如「送出申請」而非「點擊這裡」）
- 避免在同一區塊使用過多按鈕
- 按鈕之間保持 `--govtw-spacing-3` 以上的間距
- 危險按鈕不應只靠紅色傳達嚴重性，需搭配文字說明動作後果
