# 佈局

佈局定義頁面的整體結構。本系統採用 **Layout Primitives**（佈局原語）的做法——提供一組可組合的佈局元件，每個元件只解決一個佈局問題，透過組合產生各種頁面結構。

這比傳統的格線系統（如 12 欄 grid）更靈活：元件根據容器寬度自適應，不依賴固定比例 class。

## 佈局元件總覽

| 元件 | 用途 | 概念 |
|------|------|------|
| `<govtw-container>` | 頁面容器，限制最大寬度並置中 | 外框 |
| `<govtw-stack>` | 垂直堆疊，控制子元素間距 | 垂直流 |
| `<govtw-sidebar>` | 主內容 + 側邊欄，窄時自動堆疊 | 雙欄 → 單欄 |
| `<govtw-cluster>` | 水平排列，自動換行 | 水平流 |

## Container 頁面容器

限制內容最大寬度並水平置中。是頁面最外層的佈局元件。

<div class="demo-block">
  <govtw-container max-width="600px" padding="4" style="background: var(--vp-c-bg-soft); border-radius: 4px;">
    <p style="margin:0;">這段內容被限制在 600px 寬度內，水平置中。</p>
  </govtw-container>
</div>

```html
<govtw-container>
  <!-- 預設最大寬度 1020px -->
  <h1>頁面標題</h1>
  <p>頁面內容</p>
</govtw-container>
```

### 屬性

| 屬性 | 型別 | 預設值 | 說明 |
|------|------|--------|------|
| `max-width` | `string` | `'1020px'` | 最大寬度（任何 CSS 長度值） |
| `padding` | `string` | `'4'` | 兩側內距，對應 `--govtw-space-{n}` |

## Stack 垂直堆疊

將子元素以垂直方向排列，統一控制間距。是最基本也最常用的佈局原語。

<div class="demo-block">
  <govtw-stack space="4">
    <div style="padding: 12px; background: var(--vp-c-bg-soft); border-radius: 4px;">區塊 A</div>
    <div style="padding: 12px; background: var(--vp-c-bg-soft); border-radius: 4px;">區塊 B</div>
    <div style="padding: 12px; background: var(--vp-c-bg-soft); border-radius: 4px;">區塊 C</div>
  </govtw-stack>
</div>

```html
<govtw-stack space="6">
  <h1>申辦勞工保險</h1>
  <p>請依照下列步驟完成線上申辦。</p>
  <govtw-button>開始申辦</govtw-button>
</govtw-stack>
```

### 屬性

| 屬性 | 型別 | 預設值 | 說明 |
|------|------|--------|------|
| `space` | `string` | `'4'` | 間距，對應 `--govtw-space-{n}` token |

### 常用間距

| space 值 | 實際大小 | 適用場景 |
|----------|---------|---------|
| `2` | 8px | 緊湊的相關元素（label + input） |
| `4` | 16px | 表單欄位之間 |
| `6` | 24px | 區塊內容之間 |
| `8` | 32px | 頁面段落之間 |
| `12` | 48px | 頁面大區塊之間 |

## Sidebar 側邊欄佈局

兩欄佈局：主內容 + 側邊欄。當容器寬度不足時**自動堆疊為單欄**，不需要 media query。

<div class="demo-block">
  <govtw-sidebar side-width="200px" content-min="50" space="4">
    <div style="padding: 16px; background: var(--vp-c-bg-soft); border-radius: 4px;">
      <strong>主要內容</strong><br>這裡放主要資訊，會自動佔滿剩餘寬度。
    </div>
    <div style="padding: 16px; background: var(--vp-c-bg-soft); border-radius: 4px;">
      <strong>側邊欄</strong><br>次要資訊、連結等。
    </div>
  </govtw-sidebar>
</div>

```html
<govtw-sidebar side-width="16rem">
  <main>
    <h1>申辦服務</h1>
    <p>主要內容...</p>
  </main>
  <aside>
    <h2>相關連結</h2>
    <ul>
      <li><a href="#">常見問題</a></li>
    </ul>
  </aside>
</govtw-sidebar>
```

### 側邊欄在左側

```html
<govtw-sidebar side="left" side-width="240px">
  <nav>側邊導覽</nav>
  <main>主要內容</main>
</govtw-sidebar>
```

### 屬性

| 屬性 | 型別 | 預設值 | 說明 |
|------|------|--------|------|
| `side-width` | `string` | `'16rem'` | 側邊欄寬度（任何 CSS 長度值） |
| `content-min` | `string` | `'60'` | 主內容最小寬度百分比，低於此值時堆疊 |
| `space` | `string` | `'6'` | 兩欄之間的間距 |
| `side` | `'right' \| 'left'` | `'right'` | 側邊欄位置 |

### 自動堆疊原理

Sidebar 不使用 media query 判斷螢幕寬度，而是用 CSS flexbox wrap：當主內容無法維持 `content-min`（預設 60%）的寬度時，兩欄自動堆疊為單欄。這表示同一個元件放在窄的容器裡也會自動適應，不需要額外處理。

## Cluster 水平流式佈局

將子元素水平排列，空間不足時自動換行。適用於按鈕群、標籤、麵包屑等。

<div class="demo-block">
  <govtw-cluster space="3">
    <govtw-button variant="primary">送出申請</govtw-button>
    <govtw-button variant="secondary">儲存草稿</govtw-button>
    <govtw-button variant="secondary">取消</govtw-button>
  </govtw-cluster>
</div>

```html
<govtw-cluster space="3">
  <govtw-button>送出申請</govtw-button>
  <govtw-button variant="secondary">儲存草稿</govtw-button>
  <govtw-button variant="secondary">取消</govtw-button>
</govtw-cluster>
```

### 屬性

| 屬性 | 型別 | 預設值 | 說明 |
|------|------|--------|------|
| `space` | `string` | `'3'` | 子元素間距 |
| `align` | `'start' \| 'center' \| 'end' \| 'space-between'` | `'start'` | 水平對齊 |
| `vertical-align` | `'start' \| 'center' \| 'end' \| 'baseline'` | `'center'` | 垂直對齊 |

## 組合範例

佈局元件的威力在於組合。以下是常見的頁面結構：

### 標準服務頁面

```html
<govtw-container>
  <govtw-stack space="8">
    <govtw-sidebar side-width="16rem">
      <govtw-stack space="6">
        <h1>勞工保險線上申辦</h1>
        <p>本服務提供線上申辦各項勞工保險業務。</p>
        <govtw-fieldset legend="申請人資料">
          <govtw-input label="姓名"></govtw-input>
          <govtw-input label="身分證字號" width="10"></govtw-input>
        </govtw-fieldset>
        <govtw-cluster space="3">
          <govtw-button>送出</govtw-button>
          <govtw-button variant="secondary">取消</govtw-button>
        </govtw-cluster>
      </govtw-stack>
      <aside>
        <govtw-stack space="4">
          <h2>相關連結</h2>
          <a href="#">常見問題</a>
          <a href="#">聯絡我們</a>
        </govtw-stack>
      </aside>
    </govtw-sidebar>
  </govtw-stack>
</govtw-container>
```

### 表單頁面（全寬單欄）

```html
<govtw-container max-width="720px">
  <govtw-stack space="8">
    <h1>申請表單</h1>
    <govtw-fieldset legend="個人資料">
      <govtw-input label="姓名"></govtw-input>
      <govtw-input label="電話" type="tel" width="10"></govtw-input>
      <govtw-input label="電子信箱" type="email"></govtw-input>
    </govtw-fieldset>
    <govtw-cluster space="3">
      <govtw-button>送出</govtw-button>
      <govtw-button variant="secondary">返回</govtw-button>
    </govtw-cluster>
  </govtw-stack>
</govtw-container>
```

## 頁面寬度

| 用途 | 建議 max-width | 說明 |
|------|---------------|------|
| 一般服務頁面 | `1020px`（預設） | 含側邊欄的標準頁面 |
| 表單頁面 | `720px` | 限制表單寬度，提升可讀性 |
| 文章 / 內容頁 | `640px` | 控制每行字數，閱讀舒適 |
| 全寬（儀表板） | `100%` | 資料密集型頁面 |

## 視覺隱藏

將內容從視覺上隱藏，但螢幕閱讀器仍可讀取。

```html
<!-- 跳至主要內容連結（鍵盤聚焦時顯示） -->
<a href="#main" class="govtw-visually-hidden-focusable">
  跳至主要內容
</a>
```

## 無障礙

- 使用語意化的 `<main>`、`<aside>`、`<nav>` 元素
- 提供「跳至主要內容」的隱藏連結，方便鍵盤使用者
- 佈局元件在窄空間自動堆疊，確保內容順序合理
- 內容閱讀順序應與 DOM 順序一致
- 避免用 CSS 改變視覺順序（如 `order`），會造成鍵盤導航混亂

## 設計指引

- **由外而內組合**：Container → Stack / Sidebar → 內容元件
- 表單頁面建議用較窄的 Container（`720px`），避免欄位過寬
- 文字內容控制每行約 60–75 個中文字元
- Stack 的 `space` 值由大到小：頁面區塊用 `8–12`，區塊內用 `4–6`，緊湊元素用 `2–3`
- Sidebar 放次要資訊，主要內容永遠是第一個子元素

<style>
.demo-block {
  padding: 24px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  margin: 16px 0;
}
</style>
