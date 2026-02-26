import { readFileSync, writeFileSync } from 'fs';

const tokens = JSON.parse(readFileSync(new URL('./tokens.json', import.meta.url), 'utf-8'));

const PREFIX = 'govtw';

// ── Reference resolution ──────────────────────────────
// Resolve "{primitive.color.blue.500}" → actual value from JSON tree

function getByPath(obj, path) {
  return path.split('.').reduce((o, k) => o?.[k], obj);
}

function resolveValue(value, root) {
  if (typeof value !== 'string') return value;
  const match = value.match(/^\{(.+)\}$/);
  if (!match) return value;
  const resolved = getByPath(root, match[1]);
  if (resolved === undefined) {
    console.warn(`⚠ Unresolved reference: ${value}`);
    return value;
  }
  // Recursively resolve chained references
  return resolveValue(resolved, root);
}

// Convert a reference path to a CSS var() name
// "{primitive.color.blue.500}" → "var(--govtw-primitive-color-blue-500)"
// "{semantic.font.sans}"       → "var(--govtw-font-sans)"
// Semantic layer vars are emitted without the "semantic" prefix,
// so we strip it when building the var() reference.
function refToCssVar(value) {
  if (typeof value !== 'string') return value;
  const match = value.match(/^\{(.+)\}$/);
  if (!match) return value; // literal value
  let path = match[1];
  // Semantic vars are output as --govtw-{rest} (no "semantic" segment)
  if (path.startsWith('semantic.')) {
    path = path.slice('semantic.'.length);
  }
  const varName = `--${PREFIX}-${path.replace(/\./g, '-')}`;
  return `var(${varName})`;
}

// ── Flatten helpers ──────────────────────────────

function flattenWithValues(obj, prefix, lines = []) {
  for (const [key, value] of Object.entries(obj)) {
    const name = `${prefix}-${key}`;
    if (typeof value === 'object' && !Array.isArray(value)) {
      flattenWithValues(value, name, lines);
    } else {
      lines.push(`  ${name}: ${value};`);
    }
  }
  return lines;
}

function flattenWithVarRefs(obj, prefix, lines = []) {
  for (const [key, value] of Object.entries(obj)) {
    const name = `${prefix}-${key}`;
    if (typeof value === 'object' && !Array.isArray(value)) {
      flattenWithVarRefs(value, name, lines);
    } else {
      const cssValue = refToCssVar(value);
      lines.push(`  ${name}: ${cssValue};`);
    }
  }
  return lines;
}

// ── Generate tokens.css ──────────────────────────────

const sections = [];

// 1. Primitive layer — raw values
const primitiveLines = flattenWithValues(tokens.primitive, `--${PREFIX}-primitive`);
sections.push(`/* ==========================================================================
 * Primitive tokens — 原始設計數值
 * ========================================================================== */
:root {
${primitiveLines.join('\n')}
}`);

// 2. Semantic layer — usage-based mappings (references to primitives)
const semanticLines = flattenWithVarRefs(tokens.semantic, `--${PREFIX}`);

// Add --govtw-space-{n} aliases for layout components (they use "space" not "spacing")
const spaceAliasLines = [];
for (const key of Object.keys(tokens.semantic.spacing)) {
  spaceAliasLines.push(`  --${PREFIX}-space-${key}: var(--${PREFIX}-spacing-${key});`);
}

sections.push(`
/* ==========================================================================
 * Semantic tokens — 語意層（以用途命名，引用原始層）
 * ========================================================================== */
:root {
${semanticLines.join('\n')}

  /* Space aliases — 佈局元件使用 --govtw-space-{n} */
${spaceAliasLines.join('\n')}
}`);

// 3. Component layer — per-component customization
const componentLines = flattenWithVarRefs(tokens.component, `--${PREFIX}`);
sections.push(`
/* ==========================================================================
 * Component tokens — 元件層（可覆蓋以客製化個別元件）
 * ========================================================================== */
:root {
${componentLines.join('\n')}
}`);

// 4. Themes — override semantic variables per theme
// Each key under tokens.themes becomes a [data-theme="<name>"] selector.
// The "dark" theme also gets a @media (prefers-color-scheme: dark) fallback.
if (tokens.themes) {
  for (const [themeName, themeOverrides] of Object.entries(tokens.themes)) {
    const themeLines = flattenWithVarRefs(themeOverrides, `--${PREFIX}`);
    const selector = `[data-theme="${themeName}"]`;

    if (themeName === 'dark') {
      // Dark theme: @media fallback + explicit data attribute
      sections.push(`
/* ==========================================================================
 * Theme: dark — 深色主題（系統偏好自動套用 + data-theme 手動切換）
 * ========================================================================== */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme]) {
${themeLines.join('\n')}
  }
}

${selector} {
${themeLines.join('\n')}
}`);
    } else {
      sections.push(`
/* ==========================================================================
 * Theme: ${themeName}
 * ========================================================================== */
${selector} {
${themeLines.join('\n')}
}`);
    }
  }
}

const css = sections.join('\n') + '\n';
writeFileSync(new URL('./tokens.css', import.meta.url), css);
const themeNames = tokens.themes ? Object.keys(tokens.themes).join(', ') : 'none';
console.log(`✓ tokens.css generated (primitive + semantic + component + themes: ${themeNames})`);

// ── Tailwind v4 CSS theme ──────────────────────────────

function generateTailwindTheme() {
  const lines = [];
  const semantic = tokens.semantic;

  // Colors
  lines.push('  /* Colors */');
  const colorEntries = flattenWithVarRefs(semantic.color, `--${PREFIX}-color`, []);
  for (const entry of colorEntries) {
    // Extract var name from "  --govtw-color-brand-primary: var(...);"
    const match = entry.match(/^\s+(--govtw-color-(.+)):/);
    if (match) {
      lines.push(`  --color-${PREFIX}-${match[2]}: var(${match[1]});`);
    }
  }

  // Spacing
  lines.push('');
  lines.push('  /* Spacing */');
  for (const key of Object.keys(semantic.spacing)) {
    lines.push(`  --spacing-${PREFIX}-${key}: var(--${PREFIX}-spacing-${key});`);
  }

  // Border radius
  lines.push('');
  lines.push('  /* Border radius */');
  for (const key of Object.keys(semantic.radius)) {
    lines.push(`  --radius-${PREFIX}-${key}: var(--${PREFIX}-radius-${key});`);
  }

  // Font
  lines.push('');
  lines.push('  /* Font */');
  lines.push(`  --font-${PREFIX}-sans: var(--${PREFIX}-font-sans);`);
  lines.push(`  --font-${PREFIX}-mono: var(--${PREFIX}-font-mono);`);

  // Font sizes
  for (const key of Object.keys(semantic.font.size)) {
    lines.push(`  --text-${PREFIX}-${key}: var(--${PREFIX}-font-size-${key});`);
  }

  // Font weights
  lines.push('');
  lines.push('  /* Font weights */');
  for (const key of Object.keys(semantic.font.weight)) {
    lines.push(`  --font-weight-${PREFIX}-${key}: var(--${PREFIX}-font-weight-${key});`);
  }

  return lines.join('\n');
}

const tailwindTheme = `/* gov.tw Design System — Tailwind v4 theme integration */
/* Usage: @import '@gov-tw/tokens/tailwind.css' in your CSS */

@import './tokens.css';

@theme {
${generateTailwindTheme()}
}
`;

writeFileSync(new URL('./tailwind.css', import.meta.url), tailwindTheme);
console.log('✓ tailwind.css generated');
