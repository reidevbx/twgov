# 建立七大工作守則

## 問題分析

### 現況描述
專案目前沒有統一的任務執行流程。AI 助理接到任務通常直接進入寫 code 階段，欠缺：
- 動手前的問題分析與計畫確認
- 每次任務的可追蹤紀錄
- 完成後的回顧與影響範圍文件

### 問題根因
CLAUDE.md 原本專注於「怎麼寫元件」（命名規則、token 架構、a11y 規範），但沒有「怎麼執行任務」的流程層規範。

## 需求定義

### 預期結果
- CLAUDE.md 新增「工作守則」區段，扼要說明七大守則
- 建立 `tasks/` 目錄結構與模板
- 本任務文件作為首份範例，示範完整流程

### 驗收標準
- [x] CLAUDE.md 有「工作守則」區段，位於文件頂部（凌駕於其他規則）
- [x] `tasks/README.md` 包含分類、模板、執行流程速查
- [x] 本任務文件存在於 `tasks/features/` 並示範完整流程（含總結）

## 實作計劃
- [x] 建立 `tasks/` 目錄與分類子目錄
- [x] 撰寫 `tasks/README.md`（分類、模板、流程）
- [x] 建立本任務文件
- [x] 更新 CLAUDE.md，於頂部新增「工作守則」區段
- [x] 在本任務文件追加「總結」段，示範完整工作流

## 影響範圍
- `CLAUDE.md`（新增「工作守則」區段）
- `tasks/README.md`（新建）
- `tasks/features/2026-04-23-establish-seven-rules.md`（新建，本文件）

## 總結

### 完成項目
- ✅ `tasks/` 目錄與六個分類子目錄建立完畢
- ✅ `tasks/README.md` 包含分類對照、任務模板、執行流程速查、不適用情境
- ✅ CLAUDE.md 頂部新增「工作守則」區段，列出七大守則與分類對照
- ✅ 本任務文件作為首份範例，示範問題分析 → 需求 → 計劃 → 影響範圍 → 總結的完整流程

### 變更檔案
- `CLAUDE.md` — 文件頂部新增「工作守則」區段（BLOCKING 規則、七大守則、分類、例外情境）
- `tasks/README.md` — 新建，說明 tasks 目錄結構、分類、模板與流程
- `tasks/features/2026-04-23-establish-seven-rules.md` — 新建，本任務的分析與總結

### 後續建議
- 先前暫停的 harness 架構（scaffolder + ESLint + pre-commit hook）應按新守則分拆重啟：每個子任務各建一份任務文件再動手，例如：
  - `tasks/features/2026-04-xx-component-scaffolder.md`
  - `tasks/features/2026-04-xx-eslint-lit-rules.md`
  - `tasks/features/2026-04-xx-precommit-hooks.md`
- 守則內容若後續發現有需補強（例如風險評估、回滾策略），於此任務之後再開 refactor 任務處理，避免一次塞入過多內容。
