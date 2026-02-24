import { defineConfig } from 'vite'
import { resolve } from 'node:path'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    dts({ tsconfigPath: './tsconfig.build.json' }),
  ],
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        'twgov-button': resolve(__dirname, 'src/twgov-button.ts'),
        'twgov-checkbox': resolve(__dirname, 'src/twgov-checkbox.ts'),
        'twgov-input': resolve(__dirname, 'src/twgov-input.ts'),
        'twgov-fieldset': resolve(__dirname, 'src/twgov-fieldset.ts'),
        'twgov-stack': resolve(__dirname, 'src/twgov-stack.ts'),
        'twgov-sidebar': resolve(__dirname, 'src/twgov-sidebar.ts'),
        'twgov-cluster': resolve(__dirname, 'src/twgov-cluster.ts'),
        'twgov-container': resolve(__dirname, 'src/twgov-container.ts'),
        'twgov-textarea': resolve(__dirname, 'src/twgov-textarea.ts'),
      },
      formats: ['es'],
    },
    outDir: 'dist',
    target: 'es2022',
    minify: false,
  },
})
