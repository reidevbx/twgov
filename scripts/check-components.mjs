#!/usr/bin/env node
/**
 * 稽核：檢查每個 govtw-* 元件是否擁有完整的周邊檔案與 config 登錄。
 *
 * 檢查項目（每個元件）：
 *   1. apps/docs/components/<name>.md 存在
 *   2. apps/docs/public/preview/<name>/ 目錄存在且至少一份 HTML
 *   3. packages/web-components/src/index.ts 有對應的 export
 *   4. packages/web-components/package.json 有對應的 exports entry
 *   5. apps/docs/.vitepress/config.mts sidebar 元件區段有連結
 *
 * 回傳 exit code 0（全部通過）或 1（有缺漏）。
 */

import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const SRC_DIR = resolve(ROOT, 'packages/web-components/src');
const DOCS_DIR = resolve(ROOT, 'apps/docs/components');
const PREVIEW_DIR = resolve(ROOT, 'apps/docs/public/preview');
const INDEX_PATH = resolve(SRC_DIR, 'index.ts');
const PKG_PATH = resolve(ROOT, 'packages/web-components/package.json');
const VP_PATH = resolve(ROOT, 'apps/docs/.vitepress/config.mts');

const sourceFiles = readdirSync(SRC_DIR)
  .filter(f => f.startsWith('govtw-') && f.endsWith('.ts'))
  .filter(f => !f.endsWith('.test.ts') && !f.endsWith('.d.ts'));

const indexContent = readFileSync(INDEX_PATH, 'utf-8');
const pkgExports = JSON.parse(readFileSync(PKG_PATH, 'utf-8')).exports ?? {};
const vpContent = readFileSync(VP_PATH, 'utf-8');

const issues = [];

for (const file of sourceFiles) {
  const tag = file.replace(/\.ts$/, '');
  const name = tag.replace(/^govtw-/, '');
  const rowIssues = [];

  if (!existsSync(resolve(DOCS_DIR, `${name}.md`))) {
    rowIssues.push(`缺 docs: apps/docs/components/${name}.md`);
  }

  const previewSubdir = resolve(PREVIEW_DIR, name);
  if (!existsSync(previewSubdir) || !statSync(previewSubdir).isDirectory()) {
    rowIssues.push(`缺 preview 目錄: apps/docs/public/preview/${name}/`);
  } else {
    const htmls = readdirSync(previewSubdir).filter(f => f.endsWith('.html'));
    if (htmls.length === 0) {
      rowIssues.push(`preview 目錄內無 HTML: apps/docs/public/preview/${name}/`);
    }
  }

  if (!indexContent.includes(`from './${tag}.js'`)) {
    rowIssues.push(`index.ts 缺 export: from './${tag}.js'`);
  }

  if (!pkgExports[`./${tag}`]) {
    rowIssues.push(`package.json 缺 exports entry: ./${tag}`);
  }

  if (!vpContent.includes(`/components/${name}`)) {
    rowIssues.push(`VitePress sidebar 缺 link: /components/${name}`);
  }

  if (rowIssues.length > 0) {
    issues.push({ tag, rowIssues });
  }
}

/* ===== 報告 ===== */

if (issues.length === 0) {
  console.log(`✅ ${sourceFiles.length} 個元件全部完整。`);
  process.exit(0);
}

console.log(`❌ ${issues.length} / ${sourceFiles.length} 個元件有缺漏：\n`);
for (const { tag, rowIssues } of issues) {
  console.log(`  ${tag}`);
  for (const issue of rowIssues) {
    console.log(`    - ${issue}`);
  }
  console.log('');
}
process.exit(1);
