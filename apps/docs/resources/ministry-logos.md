# 部會 Logo

各中央政府機關 Logo 資源，提供 SVG 格式下載。

::: warning 注意
目前所有 Logo 皆為 **placeholder**，待各部會正式 Logo 到位後將逐步替換。
:::

<script setup>
const ministries = [
  { id: 'ey', name: '行政院', nameEn: 'Executive Yuan' },
  { id: 'moi', name: '內政部', nameEn: 'Ministry of the Interior' },
  { id: 'mofa', name: '外交部', nameEn: 'Ministry of Foreign Affairs' },
  { id: 'mnd', name: '國防部', nameEn: 'Ministry of National Defense' },
  { id: 'mof', name: '財政部', nameEn: 'Ministry of Finance' },
  { id: 'moe', name: '教育部', nameEn: 'Ministry of Education' },
  { id: 'moj', name: '法務部', nameEn: 'Ministry of Justice' },
  { id: 'moea', name: '經濟部', nameEn: 'Ministry of Economic Affairs' },
  { id: 'motc', name: '交通部', nameEn: 'Ministry of Transportation and Communications' },
  { id: 'mohw', name: '衛生福利部', nameEn: 'Ministry of Health and Welfare' },
  { id: 'mol', name: '勞動部', nameEn: 'Ministry of Labor' },
  { id: 'moa', name: '農業部', nameEn: 'Ministry of Agriculture' },
  { id: 'moc', name: '文化部', nameEn: 'Ministry of Culture' },
  { id: 'moda', name: '數位發展部', nameEn: 'Ministry of Digital Affairs' },
  { id: 'moenv', name: '環境部', nameEn: 'Ministry of Environment' },
  { id: 'nstc', name: '國家科學及技術委員會', nameEn: 'National Science and Technology Council' },
  { id: 'ndc', name: '國家發展委員會', nameEn: 'National Development Council' },
  { id: 'oac', name: '海洋委員會', nameEn: 'Ocean Affairs Council' },
]
</script>

## 總覽

共 {{ ministries.length }} 個機關。點擊「下載 SVG」可直接下載檔案。

<div class="logo-grid">
  <div v-for="m in ministries" :key="m.id" class="logo-card">
    <div class="logo-preview">
      <img :src="`/assets/ministry-logos/${m.id}.svg`" :alt="`${m.name} Logo`" width="120" height="120" />
    </div>
    <div class="logo-info">
      <strong>{{ m.name }}</strong>
      <span class="logo-name-en">{{ m.nameEn }}</span>
      <code class="logo-id">{{ m.id }}</code>
      <a :href="`/assets/ministry-logos/${m.id}.svg`" :download="`${m.id}.svg`" class="logo-download">
        下載 SVG
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path d="M6 1V8M6 8L3 5M6 8L9 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M1 10H11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
      </a>
    </div>
  </div>
</div>

## 使用規範

- Logo 僅供政府數位服務使用
- 不得變形、旋轉或改變比例
- 保留足夠的安全間距
- 深色背景請使用反白版本（待提供）

## 檔案命名

| 檔案名稱 | 機關 |
|----------|------|
| `ey.svg` | 行政院 |
| `moi.svg` | 內政部 |
| `mofa.svg` | 外交部 |
| `mnd.svg` | 國防部 |
| `mof.svg` | 財政部 |
| `moe.svg` | 教育部 |
| `moj.svg` | 法務部 |
| `moea.svg` | 經濟部 |
| `motc.svg` | 交通部 |
| `mohw.svg` | 衛生福利部 |
| `mol.svg` | 勞動部 |
| `moa.svg` | 農業部 |
| `moc.svg` | 文化部 |
| `moda.svg` | 數位發展部 |
| `moenv.svg` | 環境部 |
| `nstc.svg` | 國家科學及技術委員會 |
| `ndc.svg` | 國家發展委員會 |
| `oac.svg` | 海洋委員會 |

<style>
.logo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 16px;
  margin: 24px 0;
}

.logo-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
  transition: border-color 0.2s;
}

.logo-card:hover {
  border-color: var(--vp-c-brand-1);
}

.logo-preview {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: var(--vp-c-bg-soft);
}

.logo-preview img {
  display: block;
}

.logo-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 12px 16px 16px;
}

.logo-name-en {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.logo-id {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
}

.logo-download {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin-top: 4px;
  font-size: 0.85rem;
  color: var(--vp-c-brand-1);
  text-decoration: none;
}

.logo-download:hover {
  text-decoration: underline;
}
</style>
