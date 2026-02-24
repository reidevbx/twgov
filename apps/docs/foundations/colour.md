# 色彩

## 色彩系統

本系統的色彩以 CSS custom properties（design tokens）定義，所有元件皆透過 token 取色，不使用 hardcoded 色碼。

### 品牌色

| Token | 色碼 | 用途 |
|-------|------|------|
| `--twgov-color-brand-primary` | `#2C84B2` | 主要品牌色（藍色） |
| `--twgov-color-brand-secondary` | `#618D90` | 輔助品牌色（青色） |

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
| `--twgov-color-bg-surface` | `#EAF0F0` | 區塊背景 |

### 邊框色

| Token | 色碼 | 用途 |
|-------|------|------|
| `--twgov-color-border-default` | `#B0C4C5` | 預設邊框 |

### 回饋色

| Token | 色碼 | 用途 |
|-------|------|------|
| `--twgov-color-feedback-error` | `#C3362B` | 錯誤 |
| `--twgov-color-feedback-success` | `#00804A` | 成功 |
| `--twgov-color-feedback-warning` | `#F0AB00` | 警告 |
| `--twgov-color-feedback-info` | `#2C84B2` | 資訊 |

### 使用方式

```css
.my-element {
  color: var(--twgov-color-text-primary);
  background: var(--twgov-color-bg-surface);
}
```
