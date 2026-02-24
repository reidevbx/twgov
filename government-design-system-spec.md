# 台灣政府 Design System — 系統規格

## GOV.UK 模型 × Lit Web Components + Starlight

---

## 0. 文件定位

本文件定義一套**台灣政府級 Design System**，參考 GOV.UK Design System 的內容架構，技術上使用：

- **Starlight（Astro）** — 靜態文件網站，部署於 Vercel
- **Lit Web Components** — 元件實作（`gov-*` custom elements）
- **Design Tokens** — CSS custom properties 為視覺系統的 single source of truth
- **MCP Server** — AI 可查詢元件、token、文件

> 先建骨架，再填內容。原則先行，逐步迭代。

---

## 1. 系統目標

- 跨部會一致的數位服務體驗
- 降低重複開發，提供可複用元件與模式
- 無障礙優先（WCAG 2.1 AA）
- AI 可透過 MCP 工具查詢與使用
- 網站可持續維運，內容逐步擴充

---

## 2. 六層模型

參考 GOV.UK Design System，本系統分為六層，每層對應 Starlight sidebar 的一個 group：

| 層 | 說明 | 網站路徑 |
|----|------|---------|
| Principles | 設計原則與價值觀 | `/principles` |
| Standards | 服務品質標準（無障礙、效能、內容） | `/standards` |
| Foundations | 視覺基礎（色彩、排版、間距、grid） | `/foundations` |
| Components | UI 元件（button, input, etc.） | `/components` |
| Patterns | 服務流程模式（表單、確認頁、驗證等） | `/patterns` |
| Governance | 貢獻與演進機制 | `/governance` |

---

## 3. 技術棧

| 層 | 技術 | 用途 |
|----|------|------|
| 文件網站 | Starlight（@astrojs/starlight） | 開箱即用的文件站：sidebar、搜尋、code block、dark mode |
| 元件 demo | @astrojs/lit | Lit 元件在 Starlight 頁面中做 island 渲染 |
| Web Components | Lit | `gov-*` 元件實作 |
| Design Tokens | JSON + 簡單 script | JSON → CSS custom properties |
| MCP Server | @modelcontextprotocol/sdk + zod | AI 工具介面 |
| Build | Vite | Web component 打包 |
| Package manager | pnpm workspace | Monorepo 管理 |
| 部署 | Vercel | 靜態網站託管 |

不使用 Tailwind（Starlight 自帶完整樣式）、不使用 Turborepo。

---

## 4. 專案結構

```
twgov/
├── apps/
│   └── docs/                    # Starlight 文件網站
│       ├── astro.config.mjs
│       ├── src/
│       │   ├── content/
│       │   │   └── docs/        # Starlight content directory
│       │   │       ├── index.mdx
│       │   │       ├── principles/
│       │   │       ├── standards/
│       │   │       ├── foundations/
│       │   │       ├── components/
│       │   │       ├── patterns/
│       │   │       └── governance/
│       │   └── components/      # 自訂 Astro 元件（demo wrapper 等）
│       └── public/
│
├── packages/
│   ├── web-components/          # Lit Web Components (twgov-*)
│   │   ├── src/
│   │   │   ├── twgov-button.ts
│   │   │   ├── twgov-input.ts
│   │   │   └── index.ts
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── vite.config.ts
│   │
│   ├── tokens/                  # Design tokens
│   │   ├── tokens.json          # Source of truth
│   │   ├── tokens.css           # Generated CSS variables
│   │   ├── build.js             # JSON → CSS script
│   │   └── package.json
│   │
│   └── mcp-server/              # MCP Server
│       ├── src/
│       │   └── index.ts
│       └── package.json
│
├── package.json
├── pnpm-workspace.yaml
└── tsconfig.json
```

---

## 5. 文件網站（Starlight）

### 5.1 Starlight 配置

```javascript
// apps/docs/astro.config.mjs
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import lit from '@astrojs/lit';

export default defineConfig({
  integrations: [
    starlight({
      title: '台灣政府 Design System',
      defaultLocale: 'zh-tw',
      locales: {
        'zh-tw': { label: '繁體中文', lang: 'zh-TW' },
      },
      sidebar: [
        { label: '設計原則', autogenerate: { directory: 'principles' } },
        { label: '服務標準', autogenerate: { directory: 'standards' } },
        { label: '基礎', autogenerate: { directory: 'foundations' } },
        { label: '元件', autogenerate: { directory: 'components' } },
        { label: '模式', autogenerate: { directory: 'patterns' } },
        { label: '治理', autogenerate: { directory: 'governance' } },
      ],
    }),
    lit(),
  ],
});
```

### 5.2 頁面結構

Starlight 自動從 `src/content/docs/` 產生路由：

```
/                        → 首頁
/principles/{slug}       → 設計原則
/standards/{slug}        → 服務標準
/foundations/{slug}       → 基礎（色彩、排版等）
/components/{slug}       → 元件文件（含 live demo）
/patterns/{slug}         → 服務模式
/governance/{slug}       → 治理文件
```

### 5.3 Starlight 開箱即用功能

不需要自己做的：
- Sidebar navigation（從檔案結構 + frontmatter 自動產生）
- 全文搜尋（Pagefind，支援 CJK）
- Code syntax highlighting
- Dark / Light mode
- 響應式 layout
- 上一頁 / 下一頁
- Table of Contents

### 5.4 元件文件頁面結構

每個元件的 MDX 頁面包含：

```mdx
---
title: Button
description: 按鈕元件，用於觸發操作
---

## 概述

按鈕用於觸發動作或導航。

## Live Demo

<twgov-button client:visible variant="primary">送出</twgov-button>
<twgov-button client:visible variant="secondary">取消</twgov-button>

## 使用方式

\`\`\`html
<twgov-button variant="primary">送出</twgov-button>
<twgov-button variant="secondary">取消</twgov-button>
<twgov-button disabled>無法操作</twgov-button>
\`\`\`

## 變體

| Variant | 用途 |
|---------|------|
| primary | 主要操作 |
| secondary | 次要操作 |
| danger | 危險操作（刪除等） |

## 何時使用

- 觸發表單送出
- 執行操作（儲存、刪除）

## 何時不使用

- 純導航請用連結 `<a>`
- 不要用按鈕做連結

## 無障礙

- 支援鍵盤操作（Enter, Space）
- `disabled` 時設定 `aria-disabled`
- 確保按鈕文字清楚描述動作
```

---

## 6. Web Components（Lit）

### 6.1 規範

- Tag prefix: `twgov-*`
- Shadow DOM（Lit 預設，樣式隔離）
- Styling 使用 CSS custom properties（design tokens）
- TypeScript
- 每個元件獨立 export

### 6.2 範例

```typescript
// packages/web-components/src/twgov-button.ts
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('twgov-button')
export class GovButton extends LitElement {
  @property({ type: String }) variant: 'primary' | 'secondary' | 'danger' = 'primary';
  @property({ type: Boolean }) disabled = false;

  static styles = css`
    :host {
      display: inline-block;
    }
    button {
      font-family: var(--twgov-font-sans);
      font-size: var(--twgov-font-size-base);
      padding: var(--twgov-spacing-2) var(--twgov-spacing-4);
      border-radius: var(--twgov-radius-md);
      border: none;
      cursor: pointer;
    }
    :host([variant="primary"]) button {
      background: var(--twgov-color-brand-primary);
      color: var(--twgov-color-text-on-primary);
    }
    :host([variant="secondary"]) button {
      background: var(--twgov-color-bg-surface);
      color: var(--twgov-color-text-primary);
      border: 1px solid var(--twgov-color-border-default);
    }
    :host([variant="danger"]) button {
      background: var(--twgov-color-feedback-error);
      color: var(--twgov-color-text-on-primary);
    }
    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `;

  render() {
    return html`
      <button ?disabled=${this.disabled}>
        <slot></slot>
      </button>
    `;
  }
}
```

### 6.3 初期元件清單

先做最基本的：

1. `twgov-button`
2. `twgov-input`
3. `twgov-select`
4. `twgov-textarea`
5. `twgov-tag`
6. `twgov-breadcrumb`
7. `twgov-header`
8. `gov-footer`

後續依需求逐步新增。

---

## 7. Design Tokens

### 7.1 定義方式

以 JSON 定義，用簡單 script 產出 CSS custom properties：

```json
{
  "color": {
    "brand": {
      "primary": "#0057B8",
      "secondary": "#E4002B"
    },
    "text": {
      "primary": "#1A1A1A",
      "secondary": "#595959",
      "on-primary": "#FFFFFF"
    },
    "bg": {
      "canvas": "#FFFFFF",
      "surface": "#F5F5F5"
    },
    "border": {
      "default": "#D9D9D9"
    },
    "feedback": {
      "error": "#C3362B",
      "success": "#00804A",
      "warning": "#F0AB00",
      "info": "#0057B8"
    }
  },
  "spacing": {
    "1": "4px",
    "2": "8px",
    "3": "12px",
    "4": "16px",
    "6": "24px",
    "8": "32px",
    "12": "48px"
  },
  "radius": {
    "sm": "4px",
    "md": "8px",
    "lg": "12px"
  },
  "font": {
    "sans": "\"Noto Sans TC\", \"Microsoft JhengHei\", system-ui, sans-serif",
    "size": {
      "sm": "0.875rem",
      "base": "1rem",
      "lg": "1.125rem",
      "xl": "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem"
    }
  }
}
```

### 7.2 產出的 CSS

```css
/* packages/tokens/tokens.css */
:root {
  --twgov-color-brand-primary: #0057B8;
  --twgov-color-brand-secondary: #E4002B;
  --twgov-color-text-primary: #1A1A1A;
  --twgov-color-text-secondary: #595959;
  --twgov-color-text-on-primary: #FFFFFF;
  --twgov-color-bg-canvas: #FFFFFF;
  --twgov-color-bg-surface: #F5F5F5;
  --twgov-color-border-default: #D9D9D9;
  --twgov-color-feedback-error: #C3362B;
  --twgov-color-feedback-success: #00804A;
  --twgov-color-feedback-warning: #F0AB00;
  --twgov-color-feedback-info: #0057B8;
  --twgov-spacing-1: 4px;
  --twgov-spacing-2: 8px;
  --twgov-spacing-3: 12px;
  --twgov-spacing-4: 16px;
  --twgov-spacing-6: 24px;
  --twgov-spacing-8: 32px;
  --twgov-spacing-12: 48px;
  --twgov-radius-sm: 4px;
  --twgov-radius-md: 8px;
  --twgov-radius-lg: 12px;
  --twgov-font-sans: "Noto Sans TC", "Microsoft JhengHei", system-ui, sans-serif;
  --twgov-font-size-sm: 0.875rem;
  --twgov-font-size-base: 1rem;
  --twgov-font-size-lg: 1.125rem;
  --twgov-font-size-xl: 1.25rem;
  --twgov-font-size-2xl: 1.5rem;
  --twgov-font-size-3xl: 1.875rem;
}
```

### 7.3 Build Script

```javascript
// packages/tokens/build.js
import { readFileSync, writeFileSync } from 'fs';

const tokens = JSON.parse(readFileSync('tokens.json', 'utf-8'));

function flatten(obj, prefix = '-gov') {
  const result = [];
  for (const [key, value] of Object.entries(obj)) {
    const name = `${prefix}-${key}`;
    if (typeof value === 'object' && !Array.isArray(value)) {
      result.push(...flatten(value, name));
    } else {
      result.push(`  -${name}: ${value};`);
    }
  }
  return result;
}

const css = `:root {\n${flatten(tokens).join('\n')}\n}\n`;
writeFileSync('tokens.css', css);
```

---

## 8. MCP Server

### 8.1 Purpose

讓 AI agent 能查詢 design system 的元件、token、文件。

### 8.2 Tools

| Tool | Input | 說明 |
|------|-------|------|
| `get-component` | `{ name }` | 查詢元件 API、用法範例 |
| `get-token` | `{ category?, name? }` | 查詢 token 值 |
| `search-docs` | `{ query }` | 搜尋文件內容 |
| `generate-usage` | `{ component, variant? }` | 產生元件使用程式碼 |

### 8.3 實作

```typescript
// packages/mcp-server/src/index.ts
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
  name: "gov-design-system",
  version: "1.0.0",
});

server.tool("get-component", "查詢元件文件與 API", {
  name: z.string().describe("元件名稱，如 button"),
}, async ({ name }) => {
  // 讀取 packages/web-components/src/ 和 content/components/
  // 回傳元件 API + 用法
});

server.tool("get-token", "查詢 design token", {
  category: z.string().optional(),
  name: z.string().optional(),
}, async ({ category, name }) => {
  // 讀取 packages/tokens/tokens.json
  // 回傳 token 值與 CSS variable 名稱
});

server.tool("search-docs", "搜尋文件", {
  query: z.string(),
}, async ({ query }) => {
  // 搜尋 content/ 目錄下的 MDX
});

server.tool("generate-usage", "產生元件使用程式碼", {
  component: z.string(),
  variant: z.string().optional(),
}, async ({ component, variant }) => {
  // 根據元件 spec 產生 HTML snippet
});

const transport = new StdioServerTransport();
await server.connect(transport);
```

---

## 9. 初期內容規劃

先建立骨架頁面，內容逐步填入：

### Principles（先寫）

- 使用者需求優先
- 無障礙優先
- 一致性而非統一性
- 複用優於重建
- 包容性公共服務

### Foundations（先寫）

- 色彩系統
- 排版（含繁體中文規則）
- 間距
- Grid layout

### Components（隨元件開發）

- 每開發一個 web component，同步寫一篇 MDX

### Standards / Patterns / Governance

- 先放佔位頁面，後續逐步補充

---

## 10. 繁體中文排版

| 規則 | 值 |
|------|-----|
| 字型 | Noto Sans TC, Microsoft JhengHei, system-ui |
| 行高 | 1.7–1.8（中文內文） |
| 字距 | 0.02–0.05em |
| 全形標點 | 。，、；：？！「」 |
| 中英混排 | 中英文之間加空格 |

---

## 11. 部署

- **Astro static output** → **Vercel**
- Vercel auto-detect Astro framework
- 每次 push to main 自動部署
- PR 自動產生 preview URL

---

## 12. 執行順序

```
Phase 1: 骨架
  ├── 初始化 pnpm workspace
  ├── 建立 Starlight 網站 + 部署到 Vercel
  ├── 建立 tokens package + CSS output
  └── 寫 Principles 和 Foundations 內容

Phase 2: 元件
  ├── 實作首批 Lit Web Components (button, input, tag)
  ├── 在 Starlight 中嵌入 live demo
  └── 撰寫元件文件

Phase 3: 擴展
  ├── 更多元件
  ├── Patterns 內容
  ├── MCP Server 實作
  └── Standards / Governance 內容

Phase 4: 持續迭代
  ├── 依需求新增元件與模式
  └── 持續更新文件
```

---

*Version: 3.0*
*Last updated: 2026-02-23*
