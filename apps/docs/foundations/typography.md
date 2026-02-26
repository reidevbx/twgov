# 排版

排版是政府數位服務中最基本的視覺元素。良好的排版能提升閱讀性、建立資訊層級，並確保所有使用者（包含視覺障礙者）都能順利取得資訊。

本系統參考 [GOV.UK Design System](https://design-system.service.gov.uk/styles/type-scale/) 的排版架構，針對中文（CJK）排版特性進行調整。

## 字型

### 內文字型

```css
--govtw-font-family-base: 'Noto Sans TC', 'Microsoft JhengHei', system-ui,
  -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

以 Noto Sans TC 為首選，確保跨平台一致的中文顯示品質。fallback 依序為微軟正黑體、系統預設字型。

### 等寬字型

```css
--govtw-font-family-mono: 'Noto Sans Mono', 'SF Mono', Monaco,
  'Cascadia Code', Menlo, monospace;
```

用於程式碼區塊、技術文件中的 inline code。

## 字級對照表（Type Scale）

字級系統定義了所有排版樣式的基礎。每個字級對應明確的字體大小與行高，並在不同螢幕尺寸下調整以確保可讀性。

### 大螢幕（≥ 640px）

| Token | 大小 | 行高 | 對應用途 |
|-------|------|------|----------|
| `--govtw-font-size-4xl` | `2.25rem` (36px) | 1.2 | 頁面標題（h1） |
| `--govtw-font-size-3xl` | `1.875rem` (30px) | 1.3 | 大標題（h2） |
| `--govtw-font-size-2xl` | `1.5rem` (24px) | 1.4 | 標題（h3）、前導段落 |
| `--govtw-font-size-xl` | `1.25rem` (20px) | 1.4 | 小標題（h4） |
| `--govtw-font-size-lg` | `1.125rem` (18px) | 1.6 | 大段文字 |
| `--govtw-font-size-base` | `1rem` (16px) | 1.8 | 內文 |
| `--govtw-font-size-sm` | `0.875rem` (14px) | 1.6 | 次要文字、註解 |
| `--govtw-font-size-xs` | `0.75rem` (12px) | 1.5 | 輔助文字、標籤 |

### 小螢幕（< 640px）

為提升行動裝置上的可讀性，大字級會等比縮小，但**內文字級（16px）不縮小**，以符合無障礙最佳實務。

| Token | 大螢幕 | 小螢幕 | 說明 |
|-------|--------|--------|------|
| `--govtw-font-size-4xl` | 36px | 27px | 頁面標題縮小 |
| `--govtw-font-size-3xl` | 30px | 24px | 大標題縮小 |
| `--govtw-font-size-2xl` | 24px | 21px | 標題微調 |
| `--govtw-font-size-xl` | 20px | 19px | 小標題微調 |
| `--govtw-font-size-lg` | 18px | 18px | 不縮小 |
| `--govtw-font-size-base` | 16px | 16px | 不縮小 |
| `--govtw-font-size-sm` | 14px | 14px | 不縮小 |
| `--govtw-font-size-xs` | 12px | 12px | 不縮小 |

> **無障礙注意**：GOV.UK 於 2022 年後不再於小螢幕使用更小的內文字級，因為 14px 以下的字體大小對視覺障礙使用者造成困難。本系統遵循相同原則，內文字級在任何裝置上皆維持 16px。

## 字重

<DemoBlock direction="column" no-code>
  <div class="type-sample">
    <span class="type-sample__label">regular · 400</span>
    <div class="type-sample__text" style="font-size: var(--govtw-font-size-2xl); font-weight: var(--govtw-font-weight-regular);">一般內文使用 Regular 字重</div>
  </div>
  <div class="type-sample">
    <span class="type-sample__label">medium · 500</span>
    <div class="type-sample__text" style="font-size: var(--govtw-font-size-2xl); font-weight: var(--govtw-font-weight-medium);">強調文字使用 Medium 字重</div>
  </div>
  <div class="type-sample">
    <span class="type-sample__label">bold · 700</span>
    <div class="type-sample__text" style="font-size: var(--govtw-font-size-2xl); font-weight: var(--govtw-font-weight-bold);">標題使用 Bold 字重</div>
  </div>
</DemoBlock>

| Token | 值 | 用途 |
|-------|------|------|
| `--govtw-font-weight-regular` | `400` | 內文 |
| `--govtw-font-weight-medium` | `500` | 強調文字 |
| `--govtw-font-weight-bold` | `700` | 標題、重要資訊 |

## 標題

標題用於建立頁面的資訊層級。使用語意化的 HTML 標題標籤（`<h1>` 到 `<h4>`），搭配對應的 CSS class 控制視覺樣式。

### 標題展示

<DemoBlock direction="column" no-code>
  <div class="type-sample">
    <span class="type-sample__label">heading-xl · 36px · Bold</span>
    <div class="type-sample__text" style="font-size: var(--govtw-font-size-4xl); font-weight: var(--govtw-font-weight-bold); line-height: 1.2;">勞動部線上申辦服務</div>
  </div>
  <div class="type-sample">
    <span class="type-sample__label">heading-l · 30px · Bold</span>
    <div class="type-sample__text" style="font-size: var(--govtw-font-size-3xl); font-weight: var(--govtw-font-weight-bold); line-height: 1.3;">申請表單</div>
  </div>
  <div class="type-sample">
    <span class="type-sample__label">heading-m · 24px · Bold</span>
    <div class="type-sample__text" style="font-size: var(--govtw-font-size-2xl); font-weight: var(--govtw-font-weight-bold); line-height: 1.4;">個人資料</div>
  </div>
  <div class="type-sample">
    <span class="type-sample__label">heading-s · 20px · Bold</span>
    <div class="type-sample__text" style="font-size: var(--govtw-font-size-xl); font-weight: var(--govtw-font-weight-bold); line-height: 1.4;">聯絡方式</div>
  </div>
</DemoBlock>

### 標題層級對照

| Class | HTML 元素 | 大螢幕字級 | 小螢幕字級 | 字重 |
|-------|-----------|-----------|-----------|------|
| `.govtw-heading-xl` | `<h1>` | 36px | 27px | 700 |
| `.govtw-heading-l` | `<h1>` 或 `<h2>` | 30px | 24px | 700 |
| `.govtw-heading-m` | `<h2>` 或 `<h3>` | 24px | 21px | 700 |
| `.govtw-heading-s` | `<h3>` 或 `<h4>` | 20px | 19px | 700 |

### 用法

一般頁面使用 `heading-l` 作為最大標題：

```html
<h1 class="govtw-heading-l">申請表單</h1>
<h2 class="govtw-heading-m">個人資料</h2>
<h3 class="govtw-heading-s">聯絡方式</h3>
```

內容較多的頁面，可使用 `heading-xl` 作為最大標題：

```html
<h1 class="govtw-heading-xl">勞動部線上申辦服務</h1>
<h2 class="govtw-heading-l">服務項目</h2>
<h3 class="govtw-heading-m">勞工保險</h3>
<h4 class="govtw-heading-s">投保申請</h4>
```

### 標題上方說明（Caption）

在標題上方加入輔助說明，用於標示章節或分類。

| Class | 搭配標題 | 字級 |
|-------|---------|------|
| `.govtw-caption-xl` | `.govtw-heading-xl` | 24px |
| `.govtw-caption-l` | `.govtw-heading-l` | 20px |
| `.govtw-caption-m` | `.govtw-heading-m` | 18px |

```html
<span class="govtw-caption-l">勞動部</span>
<h1 class="govtw-heading-l">勞工保險線上申辦</h1>
```

### 標題書寫原則

- 使用語意化的 `<h1>` 至 `<h4>` 標籤，不可跳級
- 標題應簡潔明確，描述該區塊的內容
- 每個頁面只有一個 `<h1>`

## 段落

### 段落展示

<DemoBlock direction="column" no-code>
  <div class="type-sample">
    <span class="type-sample__label">body-l · 18px · 前導段落</span>
    <div class="type-sample__text" style="font-size: var(--govtw-font-size-lg); font-weight: var(--govtw-font-weight-regular); line-height: 1.6;">勞動部提供完整的線上申辦服務，協助勞工朋友便捷處理各項保險業務。</div>
  </div>
  <div class="type-sample">
    <span class="type-sample__label">body · 16px · 預設內文</span>
    <div class="type-sample__text" style="font-size: var(--govtw-font-size-base); font-weight: var(--govtw-font-weight-regular); line-height: 1.8;">本服務提供線上申辦各項勞工保險業務，包含投保、退保及給付申請。</div>
  </div>
  <div class="type-sample">
    <span class="type-sample__label">body-s · 14px · 小字內文</span>
    <div class="type-sample__text" style="font-size: var(--govtw-font-size-sm); font-weight: var(--govtw-font-weight-regular); line-height: 1.6;">最後更新日期：2025 年 1 月 15 日</div>
  </div>
</DemoBlock>

### 內文（Body）

預設內文字級為 16px，行高 1.8，適合中文閱讀。

```html
<p class="govtw-body">
  本服務提供線上申辦各項勞工保險業務，包含投保、退保及給付申請。
</p>
```

### 前導段落（Lead Paragraph）

用於頁面頂端的摘要文字，字級較大，每頁最多使用一次。

```html
<p class="govtw-body-l">
  勞動部提供完整的線上申辦服務，協助勞工朋友便捷處理各項保險業務。
</p>
```

### 小字內文（Small Body）

用於附註、版權聲明等次要資訊，應少量使用。

```html
<p class="govtw-body-s">
  最後更新日期：2025 年 1 月 15 日
</p>
```

### 段落樣式對照

| Class | 字級 | 行高 | 用途 |
|-------|------|------|------|
| `.govtw-body-l` | 18px | 1.6 | 前導段落 |
| `.govtw-body` | 16px | 1.8 | 預設內文 |
| `.govtw-body-s` | 14px | 1.6 | 小字內文 |

## 連結

所有需要連結行為的地方都應使用 `<govtw-link>` 元件，確保連結在所有狀態下都有一致的互動回饋。詳細說明請參閱 [Link 連結元件](/components/link)。

### 預設樣式

連結預設為藍色加底線，讓使用者能清楚辨識可點擊的文字。

<DemoBlock>
  <govtw-link href="#">前往申辦</govtw-link>
  <govtw-link href="#">查看更多資訊</govtw-link>
  <govtw-link href="#">下載表單</govtw-link>

  <template #code>

```html
<govtw-link href="/apply">前往申辦</govtw-link>
<govtw-link href="/info">查看更多資訊</govtw-link>
<govtw-link href="/form">下載表單</govtw-link>
```

  </template>
</DemoBlock>

### 段落中的行內連結

`<govtw-link>` 以 `display: inline` 呈現，可自然嵌入段落文字中，字體與行高繼承自父層。

<DemoBlock>
  <p style="max-width: 36em; line-height: 1.8;">
    您可以至 <govtw-link href="#">線上申辦系統</govtw-link> 完成申請，
    或參閱 <govtw-link href="#">申請須知</govtw-link> 了解所需文件。
    如有疑問請 <govtw-link href="#">聯絡我們</govtw-link>。
  </p>

  <template #code>

```html
<p>
  您可以至 <govtw-link href="/apply">線上申辦系統</govtw-link> 完成申請，
  或參閱 <govtw-link href="/guide">申請須知</govtw-link> 了解所需文件。
  如有疑問請 <govtw-link href="/contact">聯絡我們</govtw-link>。
</p>
```

  </template>
</DemoBlock>

### 連結互動狀態

連結的互動回饋參考 GOV.UK Design System，核心特色是 **focus 與 active 時以雙色指標**（背景色 + 粗底線）確保在任何背景色上都清晰可辨。

| 狀態 | 樣式 |
|------|------|
| 預設 | 連結色（`--govtw-link-color`），底線 1px |
| 已造訪 | 紫色（`--govtw-link-visited-color`） |
| Hover | 底線加粗至 3px，文字色加深 |
| Focus / Active | 背景色（`--govtw-focus-color`），文字色（`--govtw-focus-text`），底部 4px 粗線 |

<DemoBlock no-code>
  <span class="demo-state-label">預設</span>
  <govtw-link href="#">前往申辦</govtw-link>
  <span class="demo-state-label">→ Hover</span>
  <govtw-link href="#" id="demo-typo-link-hover">前往申辦</govtw-link>
  <span class="demo-state-label">→ Focus / Active</span>
  <govtw-link href="#" id="demo-typo-link-focus">前往申辦</govtw-link>
</DemoBlock>

### 不顯示已造訪狀態

導覽連結等不需要顯示已造訪色彩的場景，加上 `no-visited` 屬性：

<DemoBlock>
  <govtw-link href="#" no-visited>首頁</govtw-link>
  <govtw-link href="#" no-visited>關於我們</govtw-link>
  <govtw-link href="#" no-visited>聯絡方式</govtw-link>

  <template #code>

```html
<govtw-link href="/" no-visited>首頁</govtw-link>
<govtw-link href="/about" no-visited>關於我們</govtw-link>
<govtw-link href="/contact" no-visited>聯絡方式</govtw-link>
```

  </template>
</DemoBlock>

### 無底線連結

預設不顯示底線，hover 與 focus/active 時才出現。適用於導覽列、頁尾等已有明確視覺區隔的場景。

<DemoBlock>
  <govtw-link href="#" no-underline>首頁</govtw-link>
  <govtw-link href="#" no-underline>服務項目</govtw-link>
  <govtw-link href="#" no-underline>聯絡我們</govtw-link>

  <template #code>

```html
<govtw-link href="/" no-underline>首頁</govtw-link>
<govtw-link href="/services" no-underline>服務項目</govtw-link>
<govtw-link href="/contact" no-underline>聯絡我們</govtw-link>
```

  </template>
</DemoBlock>

### 開新視窗的連結

當連結必須在新視窗開啟時，加入明確的文字提示：

<DemoBlock>
  <govtw-link href="https://example.gov.tw" target="_blank" rel="noreferrer noopener">外部系統（另開新視窗）</govtw-link>

  <template #code>

```html
<govtw-link href="https://example.gov.tw"
            target="_blank"
            rel="noreferrer noopener">
  外部系統（另開新視窗）
</govtw-link>
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
        const anchor = el.shadowRoot?.querySelector('a')
        if (anchor) fn(anchor)
        else requestAnimationFrame(apply)
      }
      apply()
    }
    setTimeout(attempt, 100)
  }

  applyStyle('demo-typo-link-hover', (a) => {
    a.style.color = 'var(--govtw-link-hover-color)'
    a.style.textDecorationThickness = 'var(--govtw-link-hover-underline-thickness)'
  })

  applyStyle('demo-typo-link-focus', (a) => {
    a.style.outline = 'var(--govtw-focus-width) solid transparent'
    a.style.backgroundColor = 'var(--govtw-link-focus-bg)'
    a.style.color = 'var(--govtw-link-focus-color)'
    a.style.textDecoration = 'none'
    a.style.boxShadow = '0 -2px var(--govtw-link-focus-bg), 0 4px var(--govtw-link-focus-underline-color)'
  })
})
</script>

## 列表

### 項目符號列表

```html
<ul class="govtw-list govtw-list--bullet">
  <li>準備身分證正反面影本</li>
  <li>填寫申請書</li>
  <li>至櫃台繳件</li>
</ul>
```

### 編號列表

當項目有順序性時使用：

```html
<ol class="govtw-list govtw-list--number">
  <li>登入系統並選擇申辦項目。</li>
  <li>填寫申請表單並上傳文件。</li>
  <li>確認資料無誤後送出。</li>
</ol>
```

### 寬鬆列表

列表項目較長時，加入額外間距提升可讀性：

```html
<ul class="govtw-list govtw-list--bullet govtw-list--spaced">
  <li>攜帶國民身分證正本及影本，至戶籍所在地勞保局辦事處辦理。</li>
  <li>填寫完整申請書，確認所有欄位皆已填寫。</li>
</ul>
```

## 字型覆寫 class

當需要在特定元素上覆寫字型樣式時，可使用以下 utility class。

### 字級覆寫

| Class | 效果 |
|-------|------|
| `.govtw-!-font-size-36` | 強制字級 36px |
| `.govtw-!-font-size-30` | 強制字級 30px |
| `.govtw-!-font-size-24` | 強制字級 24px |
| `.govtw-!-font-size-20` | 強制字級 20px |
| `.govtw-!-font-size-18` | 強制字級 18px |
| `.govtw-!-font-size-16` | 強制字級 16px |
| `.govtw-!-font-size-14` | 強制字級 14px |

### 字重覆寫

| Class | 效果 |
|-------|------|
| `.govtw-!-font-weight-regular` | 字重 400 |
| `.govtw-!-font-weight-bold` | 字重 700 |

### 文字對齊

| Class | 效果 |
|-------|------|
| `.govtw-!-text-align-left` | 靠左對齊 |
| `.govtw-!-text-align-right` | 靠右對齊 |
| `.govtw-!-text-align-centre` | 置中對齊 |

### 等寬數字

```html
<span class="govtw-!-font-tabular-numbers">1,234,567</span>
```

讓每個數字等寬排列，適用於表格中的數字欄位。

### 長字斷行

```html
<span class="govtw-!-text-break-word">
  service@mail.department.gov.tw
</span>
```

自動將超長字串（如 email、網址）在容器邊界斷行。

## CJK 排版注意事項

- **行高**：中文內文建議 `1.8`，標題建議 `1.2–1.4`
- **段落間距**：段落之間使用 `1rem` 以上的間距
- **標點符號**：使用全形標點（，。、；：）
- **中英混排**：中文與英文 / 數字之間建議加入半形空格
- **避頭尾**：行首不應出現句號、逗號等結尾標點；行尾不應出現開括號

## 使用方式

### CSS 自訂屬性

```css
.my-heading {
  font-family: var(--govtw-font-family-base);
  font-size: var(--govtw-font-size-3xl);
  font-weight: var(--govtw-font-weight-bold);
  line-height: 1.3;
}

.my-body {
  font-family: var(--govtw-font-family-base);
  font-size: var(--govtw-font-size-base);
  line-height: 1.8;
}
```

### CSS Class

```html
<h1 class="govtw-heading-l">頁面標題</h1>
<p class="govtw-body">這是一段內文。</p>
<p class="govtw-body-s">這是附註文字。</p>
```

## 無障礙

- 不使用 14px 以下的字級作為主要閱讀文字
- 行高至少 1.5 倍字體大小（中文內文建議 1.8）
- 確保文字與背景的色彩對比度至少 4.5:1（WCAG 2.2 AA）
- 使用 `rem` 而非 `px` 定義字級，讓使用者能透過瀏覽器設定調整文字大小
- 標題層級不跳級，維持正確的文件結構
- 粗體僅用於強調關鍵資訊，避免大量使用
