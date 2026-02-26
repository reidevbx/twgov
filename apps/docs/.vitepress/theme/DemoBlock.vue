<template>
  <div class="demo-block-wrapper">
    <!-- Shadow DOM 隔離區：VitePress 樣式不會穿透進來 -->
    <div ref="hostRef" class="demo-block-preview" />
    <!-- 隱藏的 slot 渲染區，供 JS 讀取 HTML -->
    <div ref="sourceRef" style="display:none">
      <slot />
    </div>
    <template v-if="!noCode">
      <div class="demo-block-actions">
        <button class="demo-block-toggle" @click="open = !open">
          {{ open ? '隱藏原始碼' : '查看原始碼' }}
          <svg
            class="demo-block-arrow"
            :class="{ open }"
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            aria-hidden="true"
          >
            <path d="M2 4L6 8L10 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
      <div v-show="open" class="demo-block-code">
        <slot name="code" />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'

declare const __GOVTW_TOKENS_CSS__: string
const tokensCss: string = typeof __GOVTW_TOKENS_CSS__ !== 'undefined'
  ? __GOVTW_TOKENS_CSS__
  : ''

const props = defineProps({
  direction: {
    type: String,
    default: 'row',
  },
  noCode: {
    type: Boolean,
    default: false,
  },
})

const open = ref(false)
const hostRef = ref(null)
const sourceRef = ref(null)
let observer: MutationObserver | null = null

onMounted(async () => {
  await nextTick()

  const host = hostRef.value as HTMLElement | null
  const source = sourceRef.value as HTMLElement | null
  if (!host || !source) return

  const flexDir = props.direction === 'column' ? 'column' : 'row'
  const alignItems = props.direction === 'column' ? 'stretch' : 'center'

  // 偵測 VitePress dark mode（.dark class on <html>）並同步至 host 的 data-theme
  // 這樣 tokens.css 中的 [data-theme="dark"] 選擇器才能在 Shadow DOM 內生效
  const syncDarkMode = () => {
    const isDark = document.documentElement.classList.contains('dark')
    if (isDark) {
      host.setAttribute('data-theme', 'dark')
    } else {
      host.removeAttribute('data-theme')
    }
  }
  syncDarkMode()

  observer = new MutationObserver(syncDarkMode)
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class'],
  })

  // 建立 Shadow DOM — 外部 CSS 無法穿透
  const shadow = host.attachShadow({ mode: 'open' })

  // 注入乾淨的樣式：只有 design tokens + 基本 reset
  // 將 :root 替換為 :host，使 token 在 Shadow DOM 內生效
  const style = document.createElement('style')
  style.textContent = `
${tokensCss.replace(/:root/g, ':host').replace(/^(\[data-theme="[^"]+"\])/gm, ':host($1)')}

*, *::before, *::after { box-sizing: border-box; }
:host {
  display: block;
}
.demo-layout {
  display: flex;
  flex-direction: ${flexDir};
  flex-wrap: wrap;
  align-items: ${alignItems};
  gap: 12px;
  padding: 24px;
  font-family: var(--govtw-font-sans, system-ui, sans-serif);
  color: var(--govtw-color-text-primary, #1a1a1a);
}
.demo-state-label {
  font-size: 0.8rem;
  color: var(--govtw-color-text-secondary, #595959);
}
.color-swatch {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 260px;
}
.color-swatch__preview {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background: var(--c);
  flex-shrink: 0;
}
.color-swatch__info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.color-swatch__info code {
  font-family: var(--govtw-font-mono, monospace);
  font-size: 0.8rem;
}
.color-swatch__hex,
.color-swatch__desc {
  font-size: 0.75rem;
  color: var(--govtw-color-text-secondary, #595959);
}
.type-sample {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 12px 0;
  border-bottom: 1px solid var(--govtw-color-border-default, #B0C4C5);
}
.type-sample:last-child {
  border-bottom: none;
}
.type-sample__label {
  font-size: 0.75rem;
  color: var(--govtw-color-text-secondary, #595959);
  font-family: var(--govtw-font-mono, monospace);
}
.type-sample__text {
  font-family: var(--govtw-font-sans, system-ui, sans-serif);
  color: var(--govtw-color-text-primary, #1a1a1a);
}
  `
  shadow.appendChild(style)

  // 直接移動 DOM 節點（而非 innerHTML 複製），保留已升級的 Web Components 完整狀態
  const container = document.createElement('div')
  container.className = 'demo-layout'
  while (source.firstChild) {
    container.appendChild(source.firstChild)
  }
  shadow.appendChild(container)
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>

<style scoped>
.demo-block-wrapper {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  margin: 16px 0;
  overflow: hidden;
}

.demo-block-preview {
  min-height: 40px;
}

.demo-block-actions {
  border-top: 1px solid var(--vp-c-divider);
  padding: 0;
}

.demo-block-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  width: 100%;
  padding: 8px;
  background: none;
  border: none;
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
  cursor: pointer;
  transition: color 0.2s, background 0.2s;
}

.demo-block-toggle:hover {
  color: var(--vp-c-brand-1);
  background: var(--vp-c-bg-soft);
}

.demo-block-arrow {
  transition: transform 0.2s;
}

.demo-block-arrow.open {
  transform: rotate(180deg);
}

.demo-block-code {
  border-top: 1px solid var(--vp-c-divider);
}

.demo-block-code :deep(div[class*='language-']) {
  margin: 0;
  border-radius: 0;
}
</style>
