# Tasks

此目錄存放每一次任務的分析與追蹤文件。

⛔ **未建立任務文件禁止開始寫程式碼。**

## 目錄結構

```
tasks/{分類}/YYYY-MM-DD-描述.md
```

範例：
- `tasks/features/2026-04-23-add-select-component.md`
- `tasks/bugs/2026-04-24-fix-radio-form-isolation.md`
- `tasks/refactor/2026-04-25-extract-form-value-mixin.md`

## 分類對照

| 分類 | 用途 | 範例 |
|---|---|---|
| `features/` | 新元件、新頁面、新功能 | 新增 Select 元件、新增 Pattern 頁面 |
| `bugs/` | 修正錯誤行為、a11y 違規 | Radio 群組跨 form 互相干擾、Input 缺 aria-invalid |
| `refactor/` | 重構、結構調整（行為不變） | 將 form value 抽成共用 mixin |
| `optimization/` | 效能改善 | 降低 radio 群組的 O(N²) render 成本 |
| `docs/` | 文件內容更新 | 補 Fieldset 的 a11y 段落 |
| `test/` | 新增/修正測試 | 加入 axe-core 測試 |

分類重疊時（如 a11y 修正算 bug 還是 a11y？）擇一；一個任務一份文件。

## 任務文件模板

```markdown
# 任務標題

## 問題分析
- 現況描述
- 問題根因

## 需求定義
- 預期結果
- 驗收標準

## 實作計劃
- [ ] 步驟 1
- [ ] 步驟 2
- [ ] 步驟 3

## 影響範圍
- 受影響的檔案/模組

<!-- 以下區段於任務完成後追加 -->

## 總結

### 完成項目
- ✅ 項目 1

### 變更檔案
- `path/to/file.ts` — 說明

### 後續建議
- 項目 1
```

## 執行流程速查

開始前：
1. 建立任務文件（本目錄）
2. 填寫 問題分析 / 需求 / 實作計劃 / 影響範圍
3. 用 TaskCreate 建立可驗證的任務清單
4. 與使用者確認計畫

執行中：
5. 逐項執行，即時更新 TaskCreate 狀態
6. 優先修改既有檔案，避免新建與重複

完成後：
7. 向使用者做高層級概覽
8. 在任務文件追加「## 總結」區段

## 不適用此流程

- 純諮詢問答（「這段 code 怎麼運作？」）
- 程式碼審查（僅閱讀、不修改）
- 文件查詢

完整守則定義於 `CLAUDE.md` 的「工作守則」區段。
