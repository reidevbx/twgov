import { readFileSync, writeFileSync } from 'fs';

const tokens = JSON.parse(readFileSync(new URL('./tokens.json', import.meta.url), 'utf-8'));

const PREFIX = 'twgov';

// ── CSS custom properties ──────────────────────────────

function flattenCSS(obj, prefix = `--${PREFIX}`) {
  const lines = [];
  for (const [key, value] of Object.entries(obj)) {
    const name = `${prefix}-${key}`;
    if (typeof value === 'object' && !Array.isArray(value)) {
      lines.push(...flattenCSS(value, name));
    } else {
      lines.push(`  ${name}: ${value};`);
    }
  }
  return lines;
}

// Light mode (default) — flatten everything except colorDark
const { colorDark, ...lightTokens } = tokens;

const lightCSS = `:root {\n${flattenCSS(lightTokens).join('\n')}\n}`;

// Dark mode — map colorDark.* → same --twgov-color-* variable names
const darkCSS = `\n\n@media (prefers-color-scheme: dark) {\n  :root {\n${flattenCSS(colorDark, `--${PREFIX}-color`).join('\n')}\n  }\n}`;

const css = lightCSS + darkCSS + '\n';
writeFileSync(new URL('./tokens.css', import.meta.url), css);
console.log('✓ tokens.css generated (light + dark)');

// ── Tailwind v4 CSS theme ──────────────────────────────
// Tailwind v4 uses @theme in CSS instead of JS config.
// This generates a CSS file that maps token CSS vars to Tailwind theme.

/** Map token categories to Tailwind theme namespaces */
const TAILWIND_MAP = {
  color: 'color',
  spacing: 'spacing',
  radius: 'radius',
  font: 'font',
};

function flattenTailwindTheme(obj, tokenPath = `--${PREFIX}`, twPath = '') {
  const lines = [];
  for (const [key, value] of Object.entries(obj)) {
    const tokenName = `${tokenPath}-${key}`;
    const currentPath = twPath ? `${twPath}-${key}` : key;

    if (typeof value === 'object' && !Array.isArray(value)) {
      // Special case: font.size → text-* in Tailwind
      if (currentPath === 'font-size') {
        for (const [sizeKey, sizeVal] of Object.entries(value)) {
          lines.push(`  --text-${PREFIX}-${sizeKey}: var(${tokenPath}-${key}-${sizeKey});`);
        }
      } else {
        lines.push(...flattenTailwindTheme(value, tokenName, currentPath));
      }
    } else {
      // Determine Tailwind namespace from the top-level category
      const category = currentPath.split('-')[0];
      const twNamespace = TAILWIND_MAP[category] || category;

      // Build the Tailwind theme variable name
      const restPath = currentPath.split('-').slice(1).join('-');
      const twVarName = `--${twNamespace}-${PREFIX}-${restPath}`;
      lines.push(`  ${twVarName}: var(${tokenName});`);
    }
  }
  return lines;
}

// Generate font-family separately since it's a leaf value under "font"
function generateTailwindTheme() {
  const lines = [];

  // Colors
  lines.push('  /* Colors */');
  for (const line of flattenTailwindTheme(tokens.color, `--${PREFIX}-color`, 'color')) {
    lines.push(line);
  }

  // Spacing
  lines.push('');
  lines.push('  /* Spacing */');
  for (const [key, value] of Object.entries(tokens.spacing)) {
    lines.push(`  --spacing-${PREFIX}-${key}: var(--${PREFIX}-spacing-${key});`);
  }

  // Border radius
  lines.push('');
  lines.push('  /* Border radius */');
  for (const [key, value] of Object.entries(tokens.radius)) {
    lines.push(`  --radius-${PREFIX}-${key}: var(--${PREFIX}-radius-${key});`);
  }

  // Font family
  lines.push('');
  lines.push('  /* Font */');
  lines.push(`  --font-${PREFIX}-sans: var(--${PREFIX}-font-sans);`);

  // Font sizes
  for (const [key, value] of Object.entries(tokens.font.size)) {
    lines.push(`  --text-${PREFIX}-${key}: var(--${PREFIX}-font-size-${key});`);
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
