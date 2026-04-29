# 還原 sidebar 結構 + 抽出 Token 系統獨立頁

## 問題分析

### 上一輪改了什麼
昨天把 sidebar「基礎」拆成「基礎」+「樣式」兩組，nav 也加了「樣式」項。但討論後決定：
- IA 過早拆分（B 方案需要動更多）
- 比較好的介入點是：**保留原 sidebar 結構**，只把 token 章節從「系統架構」獨立成一頁

### 當前 architecture.md 混了哪些
- Token 三層架構（primitive / semantic / component）
- 主題系統 / 客製
- Tailwind 整合
- Web Components 設計理由
- 資料流圖
- 技術選型

前 4 項屬「Token 系統」深度內容；後 3 項才是「整體系統架構」。混在一頁讓兩者都被稀釋。

## 需求定義

### 目標
1. 還原 sidebar 與 nav 為原來的單一「基礎」分組
2. 新增 `tokens.md`，承接從 architecture.md 搬出的 token 章節
3. architecture.md 瘦身為「整體系統 + Web Components + 資料流 + 技術選型」

### 預期 sidebar
```
基礎
├── 系統架構       ← Web Components / 資料流 / 技術選型 / 兩套件如何協作
├── Token 系統     ← 三層 / 主題 / 客製 / Tailwind（新增）
├── 色彩
├── 排版
├── 佈局
└── 間距
```

### 預期 nav
```
快速開始 / 設計原則 / 基礎 / 元件
```
（移除上一輪加的「樣式」項）

### 驗收標準
- `pnpm build` 通過
- sidebar 顯示一個「基礎」分組，6 項
- nav 沒有「樣式」項
- `/foundations/tokens` 可達，內容含三層 / 主題 / Tailwind
- `architecture.md` 仍可讀、聚焦在系統層級，不重複 token 細節
- 兩頁互相內鏈（架構頁→token 頁、token 頁→架構頁）

## 實作計劃

### 1. 還原 sidebar 與 nav
- [ ] `apps/docs/.vitepress/config.mts`：合回「基礎」一組（含 6 項：系統架構 + Token 系統 + 色彩/排版/佈局/間距）
- [ ] 移除 nav 的「樣式」項

### 2. 新建 `apps/docs/foundations/tokens.md`
- [ ] 從 architecture.md 搬出：
  - 「Design Token（@gov-tw/tokens）」前言
  - 三層 Token 架構（Primitive / Semantic / Component / 引用關係）
  - 主題系統（不含「客製品牌範例」— 已在 colour.md）
  - 使用方式（@import 範例）
  - Tailwind v4 整合
- [ ] 加入頂部簡短導覽：「想看實際色票見〔色彩〕；想看品牌客製見〔色彩→使用方式〕；想看資料流見〔系統架構〕」
- [ ] 結尾連回「系統架構」與「色彩」

### 3. 瘦身 architecture.md
- [ ] 刪除上述被搬走的章節
- [ ] 修改前言：強調「兩個核心套件」「兩條消費路徑」，token 細節指向 `tokens.md`
- [ ] 「資料流」圖保留（含 token 也含元件，是兩者整合的視覺）
- [ ] 在合適位置加一行「Token 細節見〔Token 系統〕頁」

### 4. 驗證
- [ ] `pnpm build` 通過
- [ ] 兩頁互相內鏈正確
- [ ] `/foundations/tokens` 與 `/foundations/architecture` 都能渲染

## 影響範圍

**新增**
- `apps/docs/foundations/tokens.md`

**修改**
- `apps/docs/foundations/architecture.md`（刪 token 章節 + 改前言）
- `apps/docs/.vitepress/config.mts`（還原 sidebar/nav）

**不動**
- `colour.md` 已含的「客製品牌色」範例保留
- 元件、token 程式碼

## 預估
- 修改：3 檔
- 工時：30 分鐘

## 總結

### 完成項目
- ✅ `config.mts`：sidebar 還原為單一「基礎」分組（含 6 項，新增 Token 系統）；nav 移除「樣式」項
- ✅ 新增 `apps/docs/foundations/tokens.md`：三層架構 / 主題系統 / 使用方式（含 typography opt-in 說明）/ Tailwind 整合 / 延伸閱讀
- ✅ `architecture.md` 瘦身：刪除 token 詳細章節（~120 行），改為短指向；前言強調兩套件兩條獨立消費路徑；保留 Web Components / 資料流 / 技術選型
- ✅ `pnpm build` 通過；兩頁互相內鏈正確

### 變更檔案
- `apps/docs/foundations/tokens.md`（新增）
- `apps/docs/foundations/architecture.md`（瘦身 + 前言重寫）
- `apps/docs/.vitepress/config.mts`（sidebar/nav 還原 + 加 Token 系統項）

### 結果對照

**Sidebar**：
```
基礎
├── 系統架構     ← Web Components / 資料流 / 技術選型
├── Token 系統   ← 三層 / 主題 / Tailwind / 客製
├── 色彩
├── 排版
├── 佈局
└── 間距
```

**Nav**：快速開始 / 設計原則 / 基礎 / 元件（樣式項移除）

### 後續建議
- 兩頁互鏈已建立，未來如要再分（例如 Web Components 也獨立成「元件架構」頁），可仿此模式
