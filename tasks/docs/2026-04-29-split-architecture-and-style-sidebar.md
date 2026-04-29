# sidebar 拆分「基礎」與「樣式」+ 搬移品牌客製範例

## 問題分析

### 現況
- `apps/docs/.vitepress/config.mts` 的 sidebar「基礎」分組混了兩種性質的內容：
  - **架構**：系統架構（token 三層、Web Components、資料流）
  - **樣式**：色彩、排版、佈局、間距
- `architecture.md:102-114` 的「客製品牌範例」實際是「色彩客製」議題（覆寫 `--govtw-color-brand-primary`），出現在架構頁有點錯位
- `colour.md` 的「使用方式」段落已有「客製特定元件 token」範例，但缺「客製品牌色」這個更高層的客製範例

### 對齊行業慣例
GOV.UK Design System、Material Design 等都把 Styles（色彩 / 排版 / 佈局 / 間距等視覺資源）獨立分組，與 Foundations / Architecture 等架構議題分開。

## 需求定義

### 目標
1. sidebar 從一個「基礎」分組拆成「基礎」+「樣式」兩組
2. `architecture.md` 的「客製品牌範例」搬到 `colour.md` 的「使用方式」段落（補成「客製品牌色 ↔ 客製特定元件」雙層對照）

### 預期 sidebar 結構

```
基礎
└── 系統架構

樣式
├── 色彩
├── 排版
├── 佈局
└── 間距
```

### 驗收標準
- `pnpm dev` 開首頁，sidebar 看到兩組獨立分類
- `architecture.md` 不再有「客製品牌範例」段落
- `colour.md` 「使用方式」段落新增「客製品牌色」範例，置於現有「客製特定元件」前
- 既有 nav link 不破（`/foundations/architecture` 仍可達）
- `pnpm build` 通過

## 實作計劃

### 1. 搬「客製品牌範例」段落
- [ ] `architecture.md`：刪除 L102-114「#### 客製品牌範例」區塊
- [ ] `colour.md`：在「使用方式」段落內、現有「客製特定元件 token」範例**之前**新增「客製品牌色」範例（含說明文字）

### 2. 重構 sidebar config
- [ ] `apps/docs/.vitepress/config.mts`：
  - 「基礎」分組保留「系統架構」
  - 新增「樣式」分組，含「色彩 / 排版 / 佈局 / 間距」
  - 順序：快速開始 → 設計原則 → 服務標準 → 基礎 → 樣式 → 元件 → 模式 → 資源 → 治理

### 3. 考慮 nav 是否同步調整
- [ ] 目前 nav 有「基礎」項指向 `/foundations/architecture`
- [ ] 加「樣式」nav 項指向 `/foundations/colour`，提升頂層可見度
- [ ] 順序：快速開始 / 設計原則 / 基礎 / **樣式** / 元件

### 4. 驗證
- [ ] `pnpm build` 全 pipeline 通過
- [ ] sidebar 顯示兩組
- [ ] nav 顯示「基礎」「樣式」並列
- [ ] colour.md 新區塊內容正確、語意連貫

## 影響範圍

**修改**
- `apps/docs/foundations/architecture.md` — 刪一段
- `apps/docs/foundations/colour.md` — 補一段
- `apps/docs/.vitepress/config.mts` — sidebar + nav 結構

**不動**
- 其他文件、元件、token

## 風險與對策

| 風險 | 對策 |
|---|---|
| 既有書籤指向 `/foundations/architecture` 失效 | URL 不變，僅 sidebar 分組調整 |
| 「品牌客製」搬走後，架構頁缺乏「實際應用」感 | 架構頁保留三層引用範例與資料流圖；「客製」屬於使用議題、放樣式更合適 |

## 預估
- 修改：3 檔
- 工時：15 分鐘

## 總結

### 完成項目
- ✅ `architecture.md`：刪除「客製品牌範例」段落（13 行），改為一行內鏈指向色彩頁
- ✅ `colour.md`：在「使用方式」內新增「客製品牌色（Semantic）」+ 整理現有「客製特定元件（Component）」為兩層對照
- ✅ `config.mts`：sidebar 拆「基礎」+「樣式」；nav 加「樣式」項
- ✅ `pnpm build` 通過
- 結果：架構議題與樣式議題在資訊架構層級分離，與 GOV.UK / Material 慣例對齊

### 變更檔案
- `apps/docs/foundations/architecture.md`
- `apps/docs/foundations/colour.md`
- `apps/docs/.vitepress/config.mts`

### 後續建議
- 「基礎」分組目前只有「系統架構」一項；未來如新增「設計流程」「建置流程」等架構議題可放入此組
- 「樣式」分組目前 4 項；如新增「圖示」「動效」「圖表」等視覺資源頁面，自然歸入此組
