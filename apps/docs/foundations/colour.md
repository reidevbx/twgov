# 色彩

## 色彩系統

本系統的色彩以 CSS custom properties（design tokens）定義，所有元件皆透過 token 取色，不使用 hardcoded 色碼。

### 品牌色

| Token | 色碼 | 用途 |
|-------|------|------|
| `--twgov-color-brand-primary` | `#0D7A4A` | 主要品牌色（綠色） |
| `--twgov-color-brand-secondary` | `#1A1A1A` | 次要品牌色 |

### 文字色

| Token | 色碼 | 用途 |
|-------|------|------|
| `--twgov-color-text-primary` | `#1A1A1A` | 主要文字 |
| `--twgov-color-text-secondary` | `#595959` | 次要文字 |
| `--twgov-color-text-on-primary` | `#FFFFFF` | 品牌色上的文字 |

### 背景色

| Token | 色碼 | 用途 |
|-------|------|------|
| `--twgov-color-bg-canvas` | `#FFFFFF` | 頁面背景 |
| `--twgov-color-bg-surface` | `#F5F5F5` | 區塊背景 |

### 回饋色

| Token | 色碼 | 用途 |
|-------|------|------|
| `--twgov-color-feedback-error` | `#C3362B` | 錯誤 |
| `--twgov-color-feedback-success` | `#00804A` | 成功 |
| `--twgov-color-feedback-warning` | `#F0AB00` | 警告 |
| `--twgov-color-feedback-info` | `#0D7A4A` | 資訊 |

### 使用方式

```css
.my-element {
  color: var(--twgov-color-text-primary);
  background: var(--twgov-color-bg-surface);
}
```
