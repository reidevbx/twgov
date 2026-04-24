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

import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { P } from './paths.mjs';

const SOURCE_RE = /^govtw-[a-z][a-z0-9-]*\.ts$/;

/** 一次性蒐集 docs 頁面、preview 目錄（含 HTML 的）— 避免每元件重複 syscall。 */
function buildCaches() {
  const docs = new Set(
    readdirSync(P.docs.components)
      .filter(f => f.endsWith('.md'))
      .map(f => f.replace(/\.md$/, ''))
  );

  const previews = new Set();
  if (existsSync(P.docs.preview)) {
    for (const entry of readdirSync(P.docs.preview, { withFileTypes: true })) {
      if (!entry.isDirectory()) continue;
      const dir = resolve(P.docs.preview, entry.name);
      const hasHtml = readdirSync(dir).some(f => f.endsWith('.html'));
      if (hasHtml) previews.add(entry.name);
    }
  }

  return { docs, previews };
}

const sourceFiles = readdirSync(P.wc.src)
  .filter(f => SOURCE_RE.test(f) && !f.endsWith('.test.ts'));

const { docs, previews } = buildCaches();
const indexContent = readFileSync(P.wc.index, 'utf-8');
const pkgExports = JSON.parse(readFileSync(P.wc.pkg, 'utf-8')).exports ?? {};
const vpContent = readFileSync(P.docs.vpConfig, 'utf-8');

const issues = [];

for (const file of sourceFiles) {
  const tag = file.replace(/\.ts$/, '');
  const name = tag.replace(/^govtw-/, '');
  const rowIssues = [];

  if (!docs.has(name)) rowIssues.push(`缺 docs: apps/docs/components/${name}.md`);
  if (!previews.has(name)) rowIssues.push(`缺 preview HTML: apps/docs/public/preview/${name}/`);
  if (!indexContent.includes(`from './${tag}.js'`)) rowIssues.push(`index.ts 缺 export`);
  if (!pkgExports[`./${tag}`]) rowIssues.push(`package.json 缺 exports entry`);
  if (!vpContent.includes(`/components/${name}`)) rowIssues.push(`VitePress sidebar 缺 link`);

  if (rowIssues.length > 0) issues.push({ tag, rowIssues });
}

if (issues.length === 0) {
  console.log(`✅ ${sourceFiles.length} 個元件全部完整。`);
  process.exit(0);
}

console.log(`❌ ${issues.length} / ${sourceFiles.length} 個元件有缺漏：\n`);
for (const { tag, rowIssues } of issues) {
  console.log(`  ${tag}`);
  for (const issue of rowIssues) console.log(`    - ${issue}`);
  console.log('');
}
process.exit(1);
