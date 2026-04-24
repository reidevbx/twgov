import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import litPlugin from 'eslint-plugin-lit';
import govtwPlugin from './eslint-rules/index.js';

export default [
  {
    ignores: [
      '**/dist/**',
      '**/node_modules/**',
      'apps/docs/**',
      'packages/tokens/**',
      '**/*.d.ts',
    ],
  },

  js.configs.recommended,

  // Web Components（Lit + TypeScript）
  ...tseslint.configs.recommended.map(c => ({
    ...c,
    files: ['packages/web-components/src/**/*.ts'],
  })),
  {
    files: ['packages/web-components/src/**/*.ts'],
    plugins: {
      lit: litPlugin,
      govtw: govtwPlugin,
    },
    rules: {
      ...litPlugin.configs.recommended.rules,
      'govtw/no-css-fallback-in-component': 'error',

      // TypeScript 相關：維持 warn 而非 error，避免既有程式碼大量擋掉
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
      // Lit decorators 用 class field 儲存狀態，此規則會誤判
      '@typescript-eslint/no-empty-object-type': 'off',
    },
  },

  // Scripts（Node.js ESM）
  {
    files: ['scripts/**/*.mjs', 'eslint-rules/**/*.js'],
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'module',
      globals: {
        process: 'readonly',
        console: 'readonly',
      },
    },
    rules: {
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    },
  },
];
