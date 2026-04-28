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
 *   - apps/docs/.vitepress/config.mts （透過 marker 註解插入 sidebar）
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname } from 'node:path';
import { parseArgs } from 'node:util';
import { P, rel } from './paths.mjs';

/* ========== CLI ========== */

function usage() {
  return `Usage: pnpm new:component <name> [--type=basic|form|layout] [--zh-name=中文名]

  name        kebab-case 名稱，例如 "select" 或 "radio-group"（最少 2 字元）
  --type      basic（預設）| form | layout
  --zh-name   中文名稱，供 sidebar 使用。省略時使用 name。

範例:
  pnpm new:component select --zh-name="下拉選單"
  pnpm new:component radio-group --type=form --zh-name="單選群組"
  pnpm new:component grid --type=layout --zh-name="網格"
`;
}

function parseOptions(argv) {
  if (argv.length === 0 || argv.includes('--help') || argv.includes('-h')) {
    console.log(usage());
    process.exit(argv.length === 0 ? 1 : 0);
  }

  const { values, positionals } = parseArgs({
    args: argv,
    options: {
      type: { type: 'string', default: 'basic' },
      'zh-name': { type: 'string', default: '' },
    },
    allowPositionals: true,
  });

  const name = positionals[0];
  if (!name) {
    console.error('❌ 未提供 name。\n\n' + usage());
    process.exit(1);
  }

  // kebab-case：小寫字母開頭、可含數字與單一連字號分隔的段落；不接受連續連字號或尾連字號。
  if (!/^[a-z][a-z0-9]*(-[a-z0-9]+)*$/.test(name) || name.length < 2) {
    console.error(
      `❌ 名稱 "${name}" 不合法。\n` +
      `   要求：小寫字母開頭、可含數字與單一連字號（例："select"、"radio-group"）；最少 2 字元。\n` +
      `   範例：pnpm new:component radio-group`
    );
    process.exit(1);
  }

  if (!['basic', 'form', 'layout'].includes(values.type)) {
    console.error(`❌ --type 必須是 basic / form / layout 其中之一（目前：${values.type}）`);
    process.exit(1);
  }

  return { name, type: values.type, zhName: values['zh-name'] || name };
}

function deriveIdentifiers({ name, zhName }) {
  const pascalName = name.split('-').map(w => w[0].toUpperCase() + w.slice(1)).join('');
  return {
    name,
    zhName,
    tag: `govtw-${name}`,
    className: `Gov${pascalName}`,
    pascalName,
  };
}

function resolvePaths({ name, tag }) {
  return {
    source: `${P.wc.src}/${tag}.ts`,
    docs: `${P.docs.components}/${name}.md`,
    preview: `${P.docs.preview}/${name}/default.html`,
  };
}

/* ========== Templates ========== */

function basicTemplate({ tag, className, zhName }) {
  return `import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

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
  // 1. import 加入 property：import { customElement, property } from 'lit/decorators.js';
  // 2. @property({ type: Boolean, reflect: true }) disabled = false;

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
`;
}

function formTemplate({ tag, className, zhName, name }) {
  return `import { LitElement, html, css, nothing, type PropertyValues } from 'lit';
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
      <!-- TODO: 實作表單 UI，參考 govtw-text-input.ts 的結構 -->
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
`;
}

function layoutTemplate({ tag, className, zhName }) {
  return `import { LitElement, html, css } from 'lit';
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
`;
}

function docsTemplate({ tag, name, zhName }) {
  return `# ${zhName}

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
}

function previewTemplate({ tag }) {
  return `<!DOCTYPE html>
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
}

const COMPONENT_TEMPLATES = {
  basic: basicTemplate,
  form: formTemplate,
  layout: layoutTemplate,
};

/* ========== File operations ========== */

function ensureTargetsAvailable(paths) {
  const conflicts = Object.values(paths).filter(existsSync);
  if (conflicts.length > 0) {
    console.error(`❌ 以下檔案已存在，請先移除或改名：\n${conflicts.map(p => '  ' + p).join('\n')}`);
    process.exit(1);
  }
}

function writeFile(path, content) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, content);
  console.log(`  ✓ ${rel(path)}`);
}

function writeNewFiles(ids, type, paths) {
  writeFile(paths.source, COMPONENT_TEMPLATES[type](ids));
  writeFile(paths.docs, docsTemplate(ids));
  writeFile(paths.preview, previewTemplate(ids));
}

function updateIndex({ tag, className }) {
  const indexContent = readFileSync(P.wc.index, 'utf-8');
  // 以 tag 名稱作為重複判斷依據，避免全文比對因格式改動而誤判。
  if (indexContent.includes(`from './${tag}.js'`)) return;
  const newExport = `export { ${className} } from './${tag}.js';\n`;
  writeFileSync(P.wc.index, indexContent.trimEnd() + '\n' + newExport);
  console.log(`  ✓ ${rel(P.wc.index)}`);
}

function updatePackageJson({ tag }) {
  const pkgJson = JSON.parse(readFileSync(P.wc.pkg, 'utf-8'));
  pkgJson.exports ??= {};
  if (pkgJson.exports[`./${tag}`]) return;
  pkgJson.exports[`./${tag}`] = {
    source: `./src/${tag}.ts`,
    types: `./dist/${tag}.d.ts`,
    import: `./dist/${tag}.js`,
  };
  writeFileSync(P.wc.pkg, JSON.stringify(pkgJson, null, 2) + '\n');
  console.log(`  ✓ ${rel(P.wc.pkg)}`);
}

/**
 * 透過 marker 註解在 VitePress sidebar 元件區段中插入新項目。
 * config.mts 必須含：
 *   // <components-start>
 *   { text: '...', link: '/components/...' },
 *   ...
 *   // <components-end>
 * 新項目將插入 <components-end> 之前。
 */
function updateSidebar({ name, zhName, pascalName }) {
  const vpContent = readFileSync(P.docs.vpConfig, 'utf-8');
  const endMarker = '// <components-end>';
  const endIdx = vpContent.indexOf(endMarker);

  if (endIdx === -1) {
    console.log(
      `  ⚠️  ${rel(P.docs.vpConfig)} 未找到 ${endMarker} marker，請手動加入 sidebar 項目：\n` +
      `      { text: '${zhName} ${pascalName}', link: '/components/${name}' },`
    );
    return;
  }

  if (vpContent.includes(`/components/${name}`)) return;

  // 取 marker 所在行的縮排
  const lineStart = vpContent.lastIndexOf('\n', endIdx) + 1;
  const indent = vpContent.slice(lineStart, endIdx);
  const newLine = `${indent}{ text: '${zhName} ${pascalName}', link: '/components/${name}' },\n`;

  const updated = vpContent.slice(0, lineStart) + newLine + vpContent.slice(lineStart);
  writeFileSync(P.docs.vpConfig, updated);
  console.log(`  ✓ ${rel(P.docs.vpConfig)}`);
}

/* ========== Main ========== */

function main() {
  const opts = parseOptions(process.argv.slice(2));
  const ids = deriveIdentifiers(opts);
  const paths = resolvePaths(ids);

  ensureTargetsAvailable(paths);

  console.log(`\n📦 建立元件 ${ids.tag}（type: ${opts.type}）\n`);

  writeNewFiles(ids, opts.type, paths);
  updateIndex(ids);
  updatePackageJson(ids);
  updateSidebar(ids);

  console.log(`
✅ 完成。後續步驟：

1. 填寫 ${rel(paths.source)} 中的 TODO 區塊
2. 補上 ${rel(paths.docs)} 的屬性表與無障礙說明
3. 調整 ${rel(paths.preview)} 的示範內容
4. 執行 pnpm build 驗證
5. 執行 pnpm sync:public 同步 dist 到 apps/docs/public
`);
}

main();
