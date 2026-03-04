# 部會 Logo

各中央政府機關 Logo 資源，提供 SVG 格式下載。

::: warning 注意
目前所有 Logo 皆為 **placeholder**，待各部會正式 Logo 到位後將逐步替換。
:::

<script setup>
const ministries = [
  // 行政院
  { id: 'ey', name: '行政院', nameEn: 'Executive Yuan' },
  // 部（15）
  { id: 'moi', name: '內政部', nameEn: 'Ministry of the Interior' },
  { id: 'mofa', name: '外交部', nameEn: 'Ministry of Foreign Affairs' },
  { id: 'mnd', name: '國防部', nameEn: 'Ministry of National Defense' },
  { id: 'mof', name: '財政部', nameEn: 'Ministry of Finance' },
  { id: 'moe', name: '教育部', nameEn: 'Ministry of Education' },
  { id: 'moj', name: '法務部', nameEn: 'Ministry of Justice' },
  { id: 'moea', name: '經濟部', nameEn: 'Ministry of Economic Affairs' },
  { id: 'motc', name: '交通部', nameEn: 'Ministry of Transportation and Communications' },
  { id: 'mol', name: '勞動部', nameEn: 'Ministry of Labor' },
  { id: 'mohw', name: '衛生福利部', nameEn: 'Ministry of Health and Welfare' },
  { id: 'moa', name: '農業部', nameEn: 'Ministry of Agriculture' },
  { id: 'moc', name: '文化部', nameEn: 'Ministry of Culture' },
  { id: 'moda', name: '數位發展部', nameEn: 'Ministry of Digital Affairs' },
  { id: 'moenv', name: '環境部', nameEn: 'Ministry of Environment' },
  { id: 'mos', name: '運動部', nameEn: 'Ministry of Sports' },
  // 委員會（8）
  { id: 'nstc', name: '國家科學及技術委員會', nameEn: 'National Science and Technology Council' },
  { id: 'ndc', name: '國家發展委員會', nameEn: 'National Development Council' },
  { id: 'oac', name: '海洋委員會', nameEn: 'Ocean Affairs Council' },
  { id: 'mac', name: '大陸委員會', nameEn: 'Mainland Affairs Council' },
  { id: 'fsc', name: '金融監督管理委員會', nameEn: 'Financial Supervisory Commission' },
  { id: 'ocac', name: '僑務委員會', nameEn: 'Overseas Community Affairs Council' },
  { id: 'vac', name: '國軍退除役官兵輔導委員會', nameEn: 'Veterans Affairs Council' },
  { id: 'cip', name: '原住民族委員會', nameEn: 'Council of Indigenous Peoples' },
  { id: 'hakka', name: '客家委員會', nameEn: 'Hakka Affairs Council' },
  { id: 'pcc', name: '公共工程委員會', nameEn: 'Public Construction Commission' },
  // 獨立機關與其他（6）
  { id: 'dgbas', name: '行政院主計總處', nameEn: 'Directorate-General of Budget, Accounting and Statistics' },
  { id: 'dgpa', name: '行政院人事行政總處', nameEn: 'Directorate-General of Personnel Administration' },
  { id: 'cbc', name: '中央銀行', nameEn: 'Central Bank' },
  { id: 'npm', name: '國立故宮博物院', nameEn: 'National Palace Museum' },
  { id: 'cec', name: '中央選舉委員會', nameEn: 'Central Election Commission' },
  { id: 'ftc', name: '公平交易委員會', nameEn: 'Fair Trade Commission' },
  { id: 'ncc', name: '國家通訊傳播委員會', nameEn: 'National Communications Commission' },
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

### 行政院

| 檔案名稱 | 機關 |
|----------|------|
| `ey.svg` | 行政院 |

### 部（15）

| 檔案名稱 | 機關 |
|----------|------|
| `moi.svg` | 內政部 |
| `mofa.svg` | 外交部 |
| `mnd.svg` | 國防部 |
| `mof.svg` | 財政部 |
| `moe.svg` | 教育部 |
| `moj.svg` | 法務部 |
| `moea.svg` | 經濟部 |
| `motc.svg` | 交通部 |
| `mol.svg` | 勞動部 |
| `mohw.svg` | 衛生福利部 |
| `moa.svg` | 農業部 |
| `moc.svg` | 文化部 |
| `moda.svg` | 數位發展部 |
| `moenv.svg` | 環境部 |
| `mos.svg` | 運動部 |

### 委員會（8）

| 檔案名稱 | 機關 |
|----------|------|
| `nstc.svg` | 國家科學及技術委員會 |
| `ndc.svg` | 國家發展委員會 |
| `oac.svg` | 海洋委員會 |
| `mac.svg` | 大陸委員會 |
| `fsc.svg` | 金融監督管理委員會 |
| `ocac.svg` | 僑務委員會 |
| `vac.svg` | 國軍退除役官兵輔導委員會 |
| `cip.svg` | 原住民族委員會 |
| `hakka.svg` | 客家委員會 |
| `pcc.svg` | 公共工程委員會 |

### 獨立機關與其他（6）

| 檔案名稱 | 機關 |
|----------|------|
| `dgbas.svg` | 行政院主計總處 |
| `dgpa.svg` | 行政院人事行政總處 |
| `cbc.svg` | 中央銀行 |
| `npm.svg` | 國立故宮博物院 |
| `cec.svg` | 中央選舉委員會 |
| `ftc.svg` | 公平交易委員會 |
| `ncc.svg` | 國家通訊傳播委員會 |

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
