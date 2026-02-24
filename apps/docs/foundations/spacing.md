# 間距

## 間距系統

本系統採用 4px 為基礎單位的間距系統，確保所有元素之間的間距一致且有節奏感。

### 間距比例

| Token | 值 | 用途 |
|-------|------|------|
| `--twgov-space-1` | `0.25rem` (4px) | 最小間距 |
| `--twgov-space-2` | `0.5rem` (8px) | 元素內部間距 |
| `--twgov-space-3` | `0.75rem` (12px) | 緊湊元素間距 |
| `--twgov-space-4` | `1rem` (16px) | 預設元素間距 |
| `--twgov-space-5` | `1.25rem` (20px) | 中等間距 |
| `--twgov-space-6` | `1.5rem` (24px) | 區塊內部間距 |
| `--twgov-space-8` | `2rem` (32px) | 區塊之間間距 |
| `--twgov-space-10` | `2.5rem` (40px) | 大區塊間距 |
| `--twgov-space-12` | `3rem` (48px) | 頁面段落間距 |
| `--twgov-space-16` | `4rem` (64px) | 頁面區域間距 |

## 使用原則

- **元件內部**：使用 `space-2` 至 `space-4`
- **元件之間**：使用 `space-4` 至 `space-6`
- **區塊之間**：使用 `space-8` 至 `space-12`
- **頁面區域**：使用 `space-12` 至 `space-16`

### 使用方式

```css
.card {
  padding: var(--twgov-space-6);
  margin-bottom: var(--twgov-space-8);
}

.card-title {
  margin-bottom: var(--twgov-space-3);
}
```
