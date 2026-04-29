# 全色系改用 OKLCH 12 階尺度

## 問題分析

### 現況
`tokens.json` 各色家族用零散階位（如 `blue.500/700/light-500`、`teal.50/100/500/700/800`），缺乏一致曲線；新加值要靠手感不靠系統。

### 目標
用統一的 OKLCH lightness × chroma 曲線，對 7 個色家族（blue / teal / red / green / yellow / purple / neutral）各產出 12 階。

### 統一曲線（取自 v2 飽和版）

| 階 | L | C |
|---|---|---|
| 1 | 0.985 | 0.005 |
| 2 | 0.965 | 0.015 |
| 3 | 0.930 | 0.035 |
| 4 | 0.875 | 0.060 |
| 5 | 0.790 | 0.090 |
| 6 | 0.690 | 0.115 |
| 7 | 0.580 | 0.135 |
| 8 | 0.480 | 0.145 |
| 9 | 0.380 | 0.135 |
| 10 | 0.300 | 0.105 |
| 11 | 0.250 | 0.085 |
| 12 | 0.210 | 0.070 |

### 各色家族 hue

| 家族 | hue | 備註 |
|---|---|---|
| blue | 240 | 主品牌色家族，anchor `#002340` ≈ step 12 |
| teal | 170 | 副色 `#068A71` 約 step 7-8（範圍內，不需精確對位）|
| red | 25 | feedback.error |
| green | 145 | feedback.success |
| yellow | 85 | feedback.warning（注意：#fd0 focus 不落這條曲線，獨立保留）|
| purple | 300 | link.visited |
| neutral | 240, chroma=0.005 | 與 brand 同 hue 但極低 chroma，淡淡 blue tint 的灰 |

### 既有特例保留

- `--govtw-focus-color` 在現行 tokens 是 `#0055FF`（vivid blue），但元件實際 focus ring 用 `#fd0`（GOV.UK 標準）。本次不動 focus 色，獨立於 12 階系統存放
- 之前剛加的 `blue.700: #1d70b8` 移除（被 12 階取代）

## Semantic 對應

### Light mode

| Token | 階對應 | 預期 hex |
|---|---|---|
| `brand.primary` | `blue.12` | `#002340` |
| `brand.secondary` | `teal.8` | ~`#068A71` |
| `text.primary` | `neutral.12` | 近黑 |
| `text.secondary` | `neutral.7` | 中灰 |
| `text.on-primary` | `neutral.1` | 近白 |
| `bg.canvas` | `neutral.1` | 近白 |
| `bg.surface` | `blue.2` | `#EDF2F8` 淺藍底 |
| `border.default` | `blue.4` | `#A8C2DF` |
| `feedback.error` | `red.8` | 深紅 |
| `feedback.success` | `green.8` | 深綠 |
| `feedback.warning` | `yellow.8` | 深黃（見「特例」）|
| `feedback.info` | `blue.6` | `#5188B4` |
| `link.default` | `blue.7` | `#2A6FA0` |
| `link.visited` | `purple.8` | 深紫 |
| `focus.color` | 保留 `#fd0` | 不動 |

### Dark mode（在 light bg 與 dark bg 翻轉）

| Token | 階對應 | 邏輯 |
|---|---|---|
| `brand.primary` | `blue.6` | 淺藍，在深底上看得清 |
| `text.primary` | `neutral.2` | 近白 |
| `text.secondary` | `neutral.6` | 淺灰 |
| `text.on-primary` | `neutral.12` | 深，配 light brand bg |
| `bg.canvas` | `blue.12` | `#002340` 主色當深底（品牌感最強）|
| `bg.surface` | `blue.11` | 略淺 |
| `border.default` | `blue.9` | 深邊線 |
| `link.default` | `blue.6` | 與 light brand 同階 |
| `feedback.error` | `red.5` | 淺紅 |
| `feedback.success` | `green.5` | 淺綠 |
| `feedback.warning` | `yellow.5` | 淺黃 |
| `feedback.info` | `blue.5` | 淺藍 |

## 實作計劃

### 1. 重寫 primitive
- [ ] 7 個色家族（blue/teal/red/green/yellow/purple/neutral）每個 12 階 OKLCH
- [ ] 保留 focus 特例（`#fd0` 與 `#0055FF`）

### 2. 重寫 semantic 對應
- [ ] 每個 semantic key 改指向新 N 階格式
- [ ] light + dark 都更新

### 3. Component token 不需改
Component token 引用 semantic（如 `button.primary-bg → semantic.color.brand.primary`），semantic 自動 cascade，component 不必動

### 4. 驗證
- [ ] `pnpm build:tokens` → tokens.css 產出 OKLCH var
- [ ] `pnpm build` 完整 pipeline
- [ ] dev server 視覺檢查：light/dark mode 各個元件、連結、按鈕、表單顏色都對
- [ ] WCAG 對比驗證（手動或 contrast checker）：
  - link `blue.7` on white ≥ 4.5:1
  - button `blue.8` 上白字 ≥ 4.5:1
  - text.secondary `neutral.7` on white ≥ 4.5:1
  - feedback colors 各自 ≥ 3:1

## 影響範圍

**修改**
- `packages/tokens/tokens.json`（primitive + semantic + themes.dark 全部重寫）

**自動重生**
- `tokens.css`、`tailwind.css`

**不動**
- 元件 ts 原始碼（CSS var 引用名稱不變）
- VitePress custom.css（仍透過 `--govtw-color-*` 取值）
- DemoBlock / preview 機制

## 風險

| 風險 | 對策 |
|---|---|
| 視覺有大幅改變（hue / chroma 都動）| 預期：品牌色相往 #002340 靠齊，整體更冷一點 |
| Dark mode 對比可能要再調 | 第一次先按提案實作，dev 看後再調 |
| OKLCH 在舊 Safari < 16.4 不支援 | 專案已用 color-mix（同樣需求 16.4+），可接受 |
| WCAG 某些對比沒過 | 手動驗證後微調該階位 |

## 預估
- 修改：1 檔（tokens.json 大改）
- 工時：30 分鐘改 + 30 分鐘驗證
- 共 ~60 分鐘

## 總結

### 完成項目
- ✅ **Primitive 重寫**：7 色家族（blue/teal/red/green/yellow/purple/neutral）× 12 階 OKLCH，套同一 lightness × chroma 曲線
- ✅ **Hue 配置**：blue 240、teal 170、red 25、green 145、yellow 85、purple 300、neutral 240（chroma ~0.005，淡藍 tint 灰）
- ✅ **Focus 特例保留**：`yellow.focus = #fd0`（GOV.UK 標準黃）獨立於 12 階曲線
- ✅ **Semantic light mode 更新**：所有 token 改指新階位（如 `link.default → blue.7`、`brand.primary → blue.12 #002340`）
- ✅ **Semantic dark mode 更新**：bg 翻到 `blue.12` 主色當底；text/link 翻到淺階
- ✅ **Component 層**：button.primary-bg 直接指 `blue.8`（其他 component token 透過 semantic 自動 cascade）
- ✅ `pnpm build:tokens` / `pnpm build` 全 pipeline 通過

### 變更檔案
- `packages/tokens/tokens.json`（primitive + semantic + themes.dark 重寫）

**自動重生**
- `packages/tokens/tokens.css`、`tailwind.css`

### 對比預期值（hex 由 OKLCH 推算，需 dev 視覺確認）

| Token | 預期 hex | 用途 |
|---|---|---|
| `brand.primary` | `#002340` | anchor |
| `link.default` | `#2A6FA0` | 連結 |
| `button.primary-bg` | `#0E5985` | 按鈕 |
| `text.primary` | 近黑（淡藍 tint） | 內文 |
| `bg.surface` | `#EDF2F8` | 卡片底 |
| `feedback.info` | `#5188B4` | 資訊 |

### 後續驗證（人眼）
- light mode：連結色、按鈕色、品牌色與 `#002340` 視覺呼應
- dark mode：`bg.canvas` 用 `#002340` 當底，品牌感最強
- WCAG：link 7:1 / button 7:1 / text 14:1+ 都應通過 AA
- 各元件 demo 跑過一遍，確認沒有意外色

### 設計原則確立
- **統一曲線**：未來新增 hue 只需指定 H 值，自動有 12 階
- **OKLCH 在 source**：CSS 變數即為 OKLCH 函數，現代瀏覽器原生支援；要轉 hex 用工具補（Safari < 16.4 不支援 OKLCH，本專案目標瀏覽器已涵蓋）
- **Focus 特例**：`#fd0` 黃色 focus 仍獨立保留，不強行套 12 階
