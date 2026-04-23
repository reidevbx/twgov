#!/usr/bin/env node
/**
 * Scaffolder: 產生新 Lit 元件的完整檔案結構。
 *
 * 用法：
 *   pnpm new:component <name> [--type=basic|form|layout] [--zh-name=中文名]
 *
 * 產生：
 *   - packages/web-components/src/govtw-<name>.ts
 *   - apps/docs/components/<name>.md
 *   - apps/docs/public/preview/<name>/default.html
 *
 * 更新：
 *   - packages/web-components/src/index.ts （append export）
 *   - packages/web-components/package.json （add exports entry）
 *   - apps/docs/.vitepress/config.mts （add sidebar entry under 元件）
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

/* ===== 參數解析 ===== */

const args = process.argv.slice(2);
if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
  console.log(`Usage: pnpm new:component <name> [--type=basic|form|layout] [--zh-name=中文名]

  name        kebab-case 名稱，例如 "select" 或 "radio-group"
  --type      basic（預設）| form | layout
  --zh-name   中文名稱，供 sidebar 使用。省略時使用 name。

範例:
  pnpm new:component select --zh-name="下拉選單"
  pnpm new:component radio-group --type=form --zh-name="單選群組"
  pnpm new:component grid --type=layout --zh-name="網格"
`);
  process.exit(args.length === 0 ? 1 : 0);
}

const name = args[0];
const typeArg = args.find(a => a.startsWith('--type='))?.split('=')[1] ?? 'basic';
const zhNameArg = args.find(a => a.startsWith('--zh-name='))?.split('=')[1] ?? '';

if (!/^[a-z][a-z0-9-]*$/.test(name) || !name.includes('-') && name.length < 3) {
  console.error(`❌ 名稱 "${name}" 不合法。必須為 kebab-case（lowercase + dash），且長度至少 3。`);
  process.exit(1);
}

if (!['basic', 'form', 'layout'].includes(typeArg)) {
  console.error(`❌ --type 必須是 basic / form / layout 其中之一。`);
  process.exit(1);
}

const pascalName = name.split('-').map(w => w[0].toUpperCase() + w.slice(1)).join('');
const tag = `govtw-${name}`;
const className = `Gov${pascalName}`;
const zhName = zhNameArg || name;

/* ===== 路徑 ===== */

const paths = {
  source: resolve(ROOT, `packages/web-components/src/${tag}.ts`),
  docs: resolve(ROOT, `apps/docs/components/${name}.md`),
  preview: resolve(ROOT, `apps/docs/public/preview/${name}/default.html`),
  index: resolve(ROOT, 'packages/web-components/src/index.ts'),
  pkg: resolve(ROOT, 'packages/web-components/package.json'),
  vpConfig: resolve(ROOT, 'apps/docs/.vitepress/config.mts'),
};

/* ===== 前置檢查 ===== */

const conflicts = [paths.source, paths.docs, paths.preview].filter(existsSync);
if (conflicts.length > 0) {
  console.error(`❌ 以下檔案已存在，請先移除或改名：\n${conflicts.map(p => '  ' + p).join('\n')}`);
  process.exit(1);
}

/* ===== 模板 ===== */

const templates = {
  basic: `import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * ${tag} — ${zhName}
 *
 * TODO: 填寫元件用途說明
 *
 * @example
 * <${tag}></${tag}>
 */
@customElement('${tag}')
export class ${className} extends LitElement {
  static shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  // TODO: 宣告響應式屬性
  // @property({ type: Boolean, reflect: true }) disabled = false;

  static styles = css\`
    :host {
      display: block;
      outline: none !important;
    }
  \`;

  render() {
    return html\`<slot></slot>\`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    '${tag}': ${className};
  }
}
`,

  form: `import { LitElement, html, css, nothing, type PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * ${tag} — ${zhName}
 *
 * TODO: 填寫元件用途說明
 *
 * @example
 * <${tag} name="field" label="標籤"></${tag}>
 */
@customElement('${tag}')
export class ${className} extends LitElement {
  static shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  static formAssociated = true;

  @property({ type: String }) name = '';
  @property({ type: String }) value = '';
  @property({ type: String }) label = '';
  @property({ type: String }) hint = '';
  @property({ type: String }) error = '';
  @property({ type: Boolean, reflect: true }) disabled = false;

  private _internals: ElementInternals;

  constructor() {
    super();
    this._internals = this.attachInternals();
  }

  static styles = css\`
    :host {
      display: block;
      outline: none !important;
    }

    /* TODO: 加入元件樣式，引用 --govtw-${name}-* component token */
  \`;

  private _handleInput(e: Event) {
    const input = e.target as HTMLInputElement;
    this.value = input.value;
    this._internals.setFormValue(this.value);
    this.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
  }

  private _handleChange(e: Event) {
    const input = e.target as HTMLInputElement;
    this.value = input.value;
    this._internals.setFormValue(this.value);
    this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
  }

  updated(changed: PropertyValues<this>) {
    if (changed.has('value')) {
      this._internals.setFormValue(this.value);
    }
  }

  formResetCallback() {
    this.value = '';
  }

  render() {
    const hasError = !!this.error;

    return html\`
      <!-- TODO: 實作表單 UI，參考 govtw-input.ts 的結構 -->
      \${this.label ? html\`<label>\${this.label}</label>\` : nothing}
      <input
        .value=\${this.value}
        name=\${this.name || nothing}
        ?disabled=\${this.disabled}
        aria-invalid=\${hasError ? 'true' : nothing}
        @input=\${this._handleInput}
        @change=\${this._handleChange}
      />
      \${hasError ? html\`<span role="alert">\${this.error}</span>\` : nothing}
    \`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    '${tag}': ${className};
  }
}
`,

  layout: `import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

/**
 * ${tag} — ${zhName}
 *
 * TODO: 填寫佈局元件用途說明
 *
 * @example
 * <${tag} space="4">
 *   <div>...</div>
 *   <div>...</div>
 * </${tag}>
 */
@customElement('${tag}')
export class ${className} extends LitElement {
  /** 間距，對應 --govtw-space-{n} token */
  @property({ type: Number }) space = 4;

  static styles = css\`
    :host {
      display: block;
    }

    .layout {
      display: flex;
      gap: var(--_space);
    }
  \`;

  render() {
    return html\`
      <div
        class="layout"
        style=\${styleMap({ '--_space': \`var(--govtw-space-\${this.space})\` })}
      >
        <slot></slot>
      </div>
    \`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    '${tag}': ${className};
  }
}
`,
};

const docsTemplate = `# ${zhName}

TODO: 一句話描述此元件的用途。

## 互動範例

<DemoBlock preview="/preview/${name}/default.html">

\`\`\`html
<${tag}>示範內容</${tag}>
\`\`\`

</DemoBlock>

## 狀態展示

<!-- 若元件有多種狀態（disabled、error、hover 等），用 <DemoBlock no-code> 展示 -->

## 使用方式

\`\`\`bash
pnpm add @gov-tw/web-components
\`\`\`

\`\`\`ts
import '@gov-tw/web-components/${tag}';
\`\`\`

## 屬性

| 屬性 | 型別 | 預設 | 說明 |
|---|---|---|---|
| TODO | - | - | - |

## 事件

| 事件 | 說明 |
|---|---|
| TODO | - |

## 無障礙

- 鍵盤操作：TODO
- ARIA：TODO
- 對比度：TODO

## 設計指引

### 何時使用
- TODO

### 何時不使用
- TODO

### 相關元件
- TODO
`;

const previewTemplate = `<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light dark">
  <title>${tag} — default</title>
  <link rel="stylesheet" href="/tokens.css">
  <script src="/gov-tw.iife.js"></script>
  <style>
    body {
      font-family: var(--govtw-font-sans);
      color: var(--govtw-color-text-primary);
      background: var(--govtw-color-bg-canvas);
      margin: 0;
      padding: 2rem;
    }
  </style>
</head>
<body>
  <${tag}>示範內容</${tag}>
</body>
</html>
`;

/* ===== 寫入新檔案 ===== */

function writeFile(path, content) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, content);
  console.log(`  ✓ ${path.replace(ROOT + '/', '')}`);
}

console.log(`\n📦 建立元件 ${tag}（type: ${typeArg}）\n`);

writeFile(paths.source, templates[typeArg]);
writeFile(paths.docs, docsTemplate);
writeFile(paths.preview, previewTemplate);

/* ===== 更新 index.ts ===== */

const indexContent = readFileSync(paths.index, 'utf-8');
const newExport = `export { ${className} } from './${tag}.js';\n`;
if (!indexContent.includes(newExport)) {
  writeFileSync(paths.index, indexContent.trimEnd() + '\n' + newExport);
  console.log(`  ✓ packages/web-components/src/index.ts`);
}

/* ===== 更新 package.json exports ===== */

const pkgJson = JSON.parse(readFileSync(paths.pkg, 'utf-8'));
pkgJson.exports = pkgJson.exports ?? {};
pkgJson.exports[`./${tag}`] = {
  source: `./src/${tag}.ts`,
  types: `./dist/${tag}.d.ts`,
  import: `./dist/${tag}.js`,
};
writeFileSync(paths.pkg, JSON.stringify(pkgJson, null, 2) + '\n');
console.log(`  ✓ packages/web-components/package.json`);

/* ===== 更新 VitePress sidebar ===== */

const vpContent = readFileSync(paths.vpConfig, 'utf-8');
const sidebarLine = `          { text: '${zhName} ${pascalName}', link: '/components/${name}' },`;

// 找「元件」區塊的 items 陣列，在其尾端插入一行
const componentsSectionRegex = /(\{\s*text:\s*'元件',[^}]*items:\s*\[)([\s\S]*?)(\n\s*\],\s*\},)/;
const match = vpContent.match(componentsSectionRegex);

if (match) {
  const itemsBody = match[2];
  if (!itemsBody.includes(`/components/${name}`)) {
    const newItemsBody = itemsBody.replace(/\s*$/, '') + '\n' + sidebarLine;
    const updated = vpContent.replace(
      componentsSectionRegex,
      `$1${newItemsBody}$3`
    );
    writeFileSync(paths.vpConfig, updated);
    console.log(`  ✓ apps/docs/.vitepress/config.mts`);
  }
} else {
  console.log(`  ⚠️  無法自動更新 config.mts，請手動加入 sidebar 項目：`);
  console.log(`      ${sidebarLine}`);
}

/* ===== 完成訊息 ===== */

console.log(`
✅ 完成。後續步驟：

1. 填寫 ${paths.source.replace(ROOT + '/', '')} 中的 TODO 區塊
2. 補上 ${paths.docs.replace(ROOT + '/', '')} 的屬性表與無障礙說明
3. 調整 ${paths.preview.replace(ROOT + '/', '')} 的示範內容
4. 執行 pnpm build 驗證
5. 執行 pnpm sync:public 同步 dist 到 apps/docs/public
`);
