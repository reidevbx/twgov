#!/usr/bin/env node
/**
 * 同步 tokens.css 與 gov-tw.iife.js 到 apps/docs/public/。
 * 讓獨立 preview HTML 與 DemoBlock 能直接引用最新的 build 產物。
 *
 * 於 build 後執行：`pnpm build && pnpm sync:public`
 */

import { copyFileSync, existsSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const ASSETS = [
  {
    from: resolve(ROOT, 'packages/tokens/tokens.css'),
    to: resolve(ROOT, 'apps/docs/public/tokens.css'),
    label: 'tokens.css',
  },
  {
    from: resolve(ROOT, 'packages/web-components/dist/gov-tw.iife.js'),
    to: resolve(ROOT, 'apps/docs/public/gov-tw.iife.js'),
    label: 'gov-tw.iife.js',
  },
];

let missing = false;
for (const { from, to, label } of ASSETS) {
  if (!existsSync(from)) {
    console.error(`❌ ${label} 不存在：${from}\n   請先執行 pnpm build:components。`);
    missing = true;
    continue;
  }
  mkdirSync(dirname(to), { recursive: true });
  copyFileSync(from, to);
  console.log(`  ✓ ${label}`);
}

if (missing) process.exit(1);
console.log('\n✅ 同步完成。');
