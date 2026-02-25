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
        'govtw-button': resolve(__dirname, 'src/govtw-button.ts'),
        'govtw-checkbox': resolve(__dirname, 'src/govtw-checkbox.ts'),
        'govtw-input': resolve(__dirname, 'src/govtw-input.ts'),
        'govtw-fieldset': resolve(__dirname, 'src/govtw-fieldset.ts'),
        'govtw-stack': resolve(__dirname, 'src/govtw-stack.ts'),
        'govtw-sidebar': resolve(__dirname, 'src/govtw-sidebar.ts'),
        'govtw-cluster': resolve(__dirname, 'src/govtw-cluster.ts'),
        'govtw-container': resolve(__dirname, 'src/govtw-container.ts'),
        'govtw-textarea': resolve(__dirname, 'src/govtw-textarea.ts'),
      },
      formats: ['es'],
    },
    outDir: 'dist',
    target: 'es2022',
    minify: false,
  },
})
