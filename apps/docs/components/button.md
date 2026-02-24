# Button 按鈕

## 概述

按鈕用於觸發動作或事件，是最基本的互動元件。

## 互動範例

試著操作下方按鈕：hover（滑鼠移入）、按下去（active）、用 <kbd>Tab</kbd> 鍵聚焦（focus）。

<div class="demo-block">
  <twgov-button variant="primary">送出</twgov-button>
  <twgov-button variant="secondary">取消</twgov-button>
  <twgov-button variant="danger">刪除</twgov-button>
</div>

### 尺寸

<div class="demo-block">
  <twgov-button size="sm">小按鈕</twgov-button>
  <twgov-button size="md">中按鈕</twgov-button>
  <twgov-button size="lg">大按鈕</twgov-button>
</div>

### 停用狀態

<div class="demo-block">
  <twgov-button disabled>停用按鈕</twgov-button>
  <twgov-button variant="secondary" disabled>停用次要</twgov-button>
</div>

## 互動狀態展示

按鈕的互動回饋參考 [GOV.UK Design System](https://design-system.service.gov.uk/components/button/) 的設計手法，核心目標是**不依賴顏色作為唯一的視覺指示**。

### Hover（懸停）

滑鼠移到按鈕上，背景色加深。即使是色覺障礙使用者，也能透過明暗變化感知狀態改變。

<div class="demo-block demo-state">
  <div class="demo-state-item">
    <span class="demo-state-label">預設</span>
    <twgov-button variant="primary">送出</twgov-button>
  </div>
  <div class="demo-state-item">
    <span class="demo-state-label">→ Hover</span>
    <twgov-button variant="primary" id="demo-hover">送出</twgov-button>
  </div>
</div>

### Active（按壓）

按下按鈕時，底部 inset shadow 消失，視覺上按鈕「扁下去」。這是**不依賴色彩**的物理回饋。

<div class="demo-block demo-state">
  <div class="demo-state-item">
    <span class="demo-state-label">預設（有底部陰影）</span>
    <twgov-button variant="primary">送出</twgov-button>
  </div>
  <div class="demo-state-item">
    <span class="demo-state-label">→ Active（陰影消失）</span>
    <twgov-button variant="primary" id="demo-active">送出</twgov-button>
  </div>
</div>

### Focus（聚焦）

用 <kbd>Tab</kbd> 鍵導航時，按鈕外圍出現 3px 黃色 `#fd0` focus ring，貼合圓角。

<div class="demo-block demo-state">
  <div class="demo-state-item">
    <span class="demo-state-label">預設</span>
    <twgov-button variant="primary">送出</twgov-button>
  </div>
  <div class="demo-state-item">
    <span class="demo-state-label">→ Focus</span>
    <twgov-button variant="primary" id="demo-focus">送出</twgov-button>
  </div>
</div>

### Disabled（停用）

透明度降至 50%，游標變為禁止符號。

<div class="demo-block demo-state">
  <div class="demo-state-item">
    <span class="demo-state-label">預設</span>
    <twgov-button variant="primary">送出</twgov-button>
  </div>
  <div class="demo-state-item">
    <span class="demo-state-label">→ Disabled</span>
    <twgov-button variant="primary" disabled>送出</twgov-button>
  </div>
</div>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  const applyStyle = (id, fn) => {
    const el = document.getElementById(id)
    if (!el) return
    const apply = () => {
      const btn = el.shadowRoot?.querySelector('button')
      if (btn) fn(btn)
      else requestAnimationFrame(apply)
    }
    apply()
  }

  applyStyle('demo-hover', (btn) => {
    btn.style.background = '#0a6a40'
  })

  applyStyle('demo-active', (btn) => {
    btn.style.background = '#094d2e'
    btn.style.boxShadow = 'none'
  })

  applyStyle('demo-focus', (btn) => {
    btn.style.boxShadow = 'inset 0 -3px 0 #094d2e, 0 0 0 3px #fd0'
  })
})
</script>

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

.demo-state {
  gap: 32px;
}

.demo-state-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
}

.demo-state-label {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}
</style>

## 使用方式

```html
<twgov-button>送出</twgov-button>
<twgov-button variant="secondary">取消</twgov-button>
<twgov-button variant="danger">刪除</twgov-button>
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

- 背景色：`--twgov-color-brand-primary`
- 文字色：`--twgov-color-text-on-primary`

### Secondary（次要按鈕）

用於次要動作，可與主要按鈕搭配使用。

- 邊框：`--twgov-color-border-default`
- 文字色：`--twgov-color-text-primary`

### Danger（危險按鈕）

用於刪除、移除等破壞性操作。

- 背景色：`--twgov-color-feedback-error`
- 文字色：`--twgov-color-text-on-primary`

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
- 按鈕之間保持 `--twgov-spacing-3` 以上的間距
- 危險按鈕不應只靠紅色傳達嚴重性，需搭配文字說明動作後果
