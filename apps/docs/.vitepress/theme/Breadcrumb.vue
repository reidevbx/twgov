<script setup lang="ts">
import { computed } from 'vue'
import { useData, useRoute } from 'vitepress'

const { theme } = useData()
const route = useRoute()

interface SidebarItem {
  text: string
  link?: string
  items?: SidebarItem[]
}

const crumbs = computed(() => {
  const path = route.path
  const sidebar: SidebarItem[] = theme.value.sidebar || []

  for (const group of sidebar) {
    if (!group.items) continue
    for (const item of group.items) {
      if (item.link && normalizePath(item.link) === normalizePath(path)) {
        // Found! Build crumbs: 首頁 / group / item
        const result: { text: string; link?: string }[] = [
          { text: '首頁', link: '/' },
        ]

        // Group level — link to first item in group
        const groupLink = group.items[0]?.link
        result.push({ text: group.text, link: groupLink })

        // Current page (no link)
        if (item.text !== group.text) {
          result.push({ text: item.text })
        }

        return result
      }
    }
  }

  return []
})

function normalizePath(p: string) {
  // Normalize: /foo → /foo.html, /foo/ → /foo/index.html
  if (p.endsWith('/')) return p + 'index'
  return p.replace(/\.html$/, '')
}
</script>

<template>
  <nav v-if="crumbs.length" class="breadcrumb" aria-label="麵包屑導覽">
    <ol>
      <li v-for="(crumb, i) in crumbs" :key="i">
        <a v-if="crumb.link && i < crumbs.length - 1" :href="crumb.link">{{ crumb.text }}</a>
        <span v-else aria-current="page">{{ crumb.text }}</span>
        <span v-if="i < crumbs.length - 1" class="separator" aria-hidden="true">/</span>
      </li>
    </ol>
  </nav>
</template>

<style scoped>
.breadcrumb {
  font-size: 0.875rem;
  line-height: 1.5;
  margin-bottom: 16px;
}

.breadcrumb ol {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  list-style: none;
  padding: 0;
  margin: 0;
}

.breadcrumb li {
  display: flex;
  align-items: center;
}

.breadcrumb a {
  color: var(--vp-c-brand-1);
  text-decoration: none;
}

.breadcrumb a:hover {
  text-decoration: underline;
}

.breadcrumb span[aria-current="page"] {
  color: var(--vp-c-text-2);
}

.separator {
  margin: 0 6px;
  color: var(--vp-c-text-3);
}
</style>
