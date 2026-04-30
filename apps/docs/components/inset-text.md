# 補充說明

把次要說明、引述或範例與周圍內文做視覺區隔。參考 [GOV.UK Inset Text](https://design-system.service.gov.uk/components/inset-text/)。

**不要用於警告、法律或緊急訊息** — 那些訊息應使用更顯眼的元件（如 Warning Text，後續推出）。Inset Text 過度使用會降低本身的視覺強度。

## 互動範例

### 基本使用

<DemoBlock variant="default" direction="column">
  <govtw-inset-text>
    <p>申辦無犯罪紀錄證明後，戶政事務所最快需要 7 個工作天處理。如資料不完整將另行通知。</p>
  </govtw-inset-text>

  <template #code>

```html
<govtw-inset-text>
  <p>申辦無犯罪紀錄證明後，戶政事務所最快需要 7 個工作天處理。如資料不完整將另行通知。</p>
</govtw-inset-text>
```

  </template>
</DemoBlock>

### 多段內容與連結

內容可包含多個段落、清單、連結。第一段不會多出上 margin，最後一段不會多出下 margin。

<DemoBlock variant="with-paragraphs" direction="column">
  <govtw-inset-text>
    <p>線上申辦系統每日 06:00–24:00 開放，凌晨進行系統維護。</p>
    <p>如需臨櫃申辦，請於上班時段（週一至週五 08:30–17:30）前往。詳情請參閱 <govtw-link href="#">服務時間說明</govtw-link>。</p>
  </govtw-inset-text>

  <template #code>

```html
<govtw-inset-text>
  <p>線上申辦系統每日 06:00–24:00 開放，凌晨進行系統維護。</p>
  <p>
    如需臨櫃申辦，請於上班時段（週一至週五 08:30–17:30）前往。
    詳情請參閱 <govtw-link href="#">服務時間說明</govtw-link>。
  </p>
</govtw-inset-text>
```

  </template>
</DemoBlock>

## 使用方式

```bash
pnpm add @gov-tw/web-components
```

```ts
import '@gov-tw/web-components/govtw-inset-text';
```

## 屬性

無屬性。內容透過 default slot 傳入。

## 事件

無事件。

## 無障礙

- **語意**：純視覺區塊，不附加 role 或 ARIA。輔助科技仍會讀出內部段落、連結等語意元素
- **對比**：左邊框與背景對比度需 ≥ 3:1（依 WCAG 2.2 SC 1.4.11 Non-text Contrast）
- **不可作為唯一指示**：邊框是視覺強調手段，內容本身應對任何使用者都語意完整、可讀

## 設計指引

### 何時使用

- 補充周圍內文的次要資訊（如「申辦時段」「處理天數說明」）
- 引述其他文件、條款片段
- 範例文字、示範回應

### 何時不使用

- 警告、錯誤、緊急訊息 → 應使用更強烈的元件（Warning Text）
- 重要、必讀資訊 → 直接寫在主內文流，避免使用者忽略
- 在已經視覺繁雜的頁面上 → 容易被視覺噪音淹沒
- 一頁內出現多次 → 會稀釋強調效果，請精簡

### 設計建議

- 一頁建議最多 1–2 處
- 內容簡短（一段最佳），冗長內容會讓邊框視覺意義消失
- 不要把按鈕、表單放進去 — 那會讓使用者誤以為這是互動區塊

### 相關元件

- [連結 Link](/components/link)：可在補充說明內嵌入連結
