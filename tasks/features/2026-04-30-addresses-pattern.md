# 新增 Addresses Pattern（台灣版）

參考 [GOV.UK Addresses](https://design-system.service.gov.uk/patterns/addresses/)。
**這是專案第一個 Pattern**，不新增元件，純粹示範如何組合既有元件解決常見任務（收集地址）。

## 問題分析

GOV.UK Addresses pattern 提供三種收地址的做法：
1. **多個文字輸入欄位**（multiple text inputs）— 最常見
2. **地址查找**（address lookup）— 輸入郵遞區號 → 選清單，含手動退路
3. **單一文字方塊**（textarea）— 不需結構化處理時的彈性做法

但**台灣地址結構與英國差異很大**，照搬 GOV.UK 的欄位（address-line-1、address-line-2、town、county、postcode）不適合：

| 英國 | 台灣 |
|---|---|
| building/street | 路/街、段、巷、弄、號、樓 |
| town/county | 縣市 + 鄉鎮市區（兩級行政） |
| postcode (alphanumeric) | 郵遞區號（3 或 5 碼純數字） |

可用的 autocomplete attributes（HTML 標準支援台灣地址）：
- `address-level1` → 縣/市
- `address-level2` → 鄉/鎮/區
- `address-line1` / `address-line2` → 街道與門牌
- `postal-code` → 郵遞區號

## 需求定義

- 一個 docs 頁面 `apps/docs/patterns/addresses.md`
- 不新增任何元件，只組合既有元件
- 至少包含兩個 sub-pattern：**多欄位** 與 **單一 textarea**
- 用 `<DemoBlock direction="column">` 展示完整可運作的 HTML
- 給出設計建議：何時用哪種、欄位是否必填、autocomplete、無障礙、錯誤訊息範例
- 更新 `apps/docs/.vitepress/config.mts` sidebar，加入「地址 Addresses」項目
- 可考慮更新 `patterns/index.md`，把「地址」從規劃中移到實做完成

## 待您拍板的設計選項

### 1. 多欄位的欄位粒度

| 選項 | 欄位 | 評估 |
|---|---|---|
| A（精簡） | 郵遞區號、縣市、鄉鎮市區、街道地址 | 4 欄、最像 GOV.UK 精神，街道含號樓自由填 |
| **B（建議）** | 郵遞區號、縣市、鄉鎮市區、街道、樓層/室 | 5 欄、把樓層拆出來方便未來機讀 |
| C（細） | 郵遞區號、縣市、鄉鎮市區、路街、段、巷弄、號、樓 | 8 欄、過細，使用者輸入摩擦高 |

### 2. 縣市/鄉鎮市區的輸入方式

| 選項 | 做法 | 評估 |
|---|---|---|
| A | 純文字輸入（`<govtw-text-input>`） | 現有元件能直接做，但易輸入錯字 |
| **B（建議）** | 純文字輸入 + 文件中提示「未來可升級成 select / address lookup」 | 符合「Pattern 用既有元件」原則，留升級空間 |
| C | 等做完 `<govtw-select>` 元件再做這個 pattern | 拖延，且 select 元件還沒在路線圖 |

### 3. 範例情境

| 選項 | 內容 | 評估 |
|---|---|---|
| A | 一個泛用「您的地址」表單 | 簡單但不夠真實 |
| **B（建議）** | 兩個情境：「申辦戶籍登記」（多欄位）、「寄送申請結果」（textarea） | 政府服務語境，幫助使用者選擇方案 |

### 4. 是否包含錯誤狀態示範

| 選項 |  |
|---|---|
| **A（建議）** | 只在文件給「錯誤訊息建議文案」表，不做 demo（會用到 `error` prop，目前 text-input 已支援） |
| B | 額外做一個 DemoBlock 顯示輸入錯誤的視覺 | 多 30 行 markdown，增加範例完整度但拉長頁面 |

## 實作計劃

1. 寫 `apps/docs/patterns/addresses.md`：
   - 概述（何時用哪種子 pattern）
   - 兩個 DemoBlock：`multi-input` 與 `textarea`
   - 欄位規格表（含 autocomplete、必選填、最大長度建議）
   - 郵遞區號輸入指引（接受 3 碼/5 碼/含空格）
   - 錯誤訊息建議文案表
   - 無障礙清單
   - 何時不使用、相關 pattern
2. `apps/docs/.vitepress/config.mts`：在「模式」區塊加入「地址 Addresses」連結
3. 更新 `apps/docs/patterns/index.md`：把地址從「規劃中」移除或改成「已完成」連結
4. `pnpm build:previews` 產出 preview HTML（每個 DemoBlock variant 一支）
5. `pnpm build`、`pnpm lint`

## 影響範圍

- 新增：`apps/docs/patterns/addresses.md`
- 自動產出：`apps/docs/public/preview/addresses/{multi-input,textarea}.html`
- 更新：`apps/docs/.vitepress/config.mts` sidebar（手動）
- 更新：`apps/docs/patterns/index.md`（內容微調）
- 不動任何元件、不動 tokens
- check-components 不會收錄 patterns（它只看元件），跑不到的稽核是預期行為
