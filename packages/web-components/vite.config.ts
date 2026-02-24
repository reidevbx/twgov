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
        'gov-button': resolve(__dirname, 'src/gov-button.ts'),
        'gov-checkbox': resolve(__dirname, 'src/gov-checkbox.ts'),
        'gov-input': resolve(__dirname, 'src/gov-input.ts'),
        'gov-fieldset': resolve(__dirname, 'src/gov-fieldset.ts'),
      },
      formats: ['es'],
    },
    outDir: 'dist',
    target: 'es2022',
    minify: false,
  },
})
