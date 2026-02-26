# 色彩

## 色彩系統

本系統的色彩以三層 design token 架構定義。所有元件透過 Component token 取色，Component token 引用 Semantic token，Semantic token 引用 Primitive token。

```
Primitive（原始色票）→ Semantic（語意用途）→ Component（元件客製）
```

主題切換只需覆寫 Semantic 層，所有元件自動生效。

---

## Primitive 色票

原始設計數值，不直接在元件中使用，前綴 `--govtw-primitive-color-`。

### Blue

<DemoBlock no-code>
  <div class="color-swatch" style="--c: var(--govtw-primitive-color-blue-500)">
    <div class="color-swatch__preview"></div>
    <div class="color-swatch__info">
      <code>blue-500</code>
      <span class="color-swatch__hex">#2C84B2</span>
    </div>
  </div>
  <div class="color-swatch" style="--c: var(--govtw-primitive-color-blue-light-500)">
    <div class="color-swatch__preview"></div>
    <div class="color-swatch__info">
      <code>blue-light-500</code>
      <span class="color-swatch__hex">#6B9FE8</span>
    </div>
  </div>
</DemoBlock>

### Teal

<DemoBlock no-code>
  <div class="color-swatch" style="--c: var(--govtw-primitive-color-teal-50)">
    <div class="color-swatch__preview"></div>
    <div class="color-swatch__info">
      <code>teal-50</code>
      <span class="color-swatch__hex">#EAF0F0</span>
    </div>
  </div>
  <div class="color-swatch" style="--c: var(--govtw-primitive-color-teal-100)">
    <div class="color-swatch__preview"></div>
    <div class="color-swatch__info">
      <code>teal-100</code>
      <span class="color-swatch__hex">#B0C4C5</span>
    </div>
  </div>
  <div class="color-swatch" style="--c: var(--govtw-primitive-color-teal-500)">
    <div class="color-swatch__preview"></div>
    <div class="color-swatch__info">
      <code>teal-500</code>
      <span class="color-swatch__hex">#618D90</span>
    </div>
  </div>
  <div class="color-swatch" style="--c: var(--govtw-primitive-color-teal-700)">
    <div class="color-swatch__preview"></div>
    <div class="color-swatch__info">
      <code>teal-700</code>
      <span class="color-swatch__hex">#3A5050</span>
    </div>
  </div>
  <div class="color-swatch" style="--c: var(--govtw-primitive-color-teal-800)">
    <div class="color-swatch__preview"></div>
    <div class="color-swatch__info">
      <code>teal-800</code>
      <span class="color-swatch__hex">#1E2A2A</span>
    </div>
  </div>
  <div class="color-swatch" style="--c: var(--govtw-primitive-color-teal-light-500)">
    <div class="color-swatch__preview"></div>
    <div class="color-swatch__info">
      <code>teal-light-500</code>
      <span class="color-swatch__hex">#89B5B8</span>
    </div>
  </div>
</DemoBlock>

### Neutral

<DemoBlock no-code>
  <div class="color-swatch" style="--c: var(--govtw-primitive-color-neutral-0)">
    <div class="color-swatch__preview" style="border: 1px solid #ccc"></div>
    <div class="color-swatch__info">
      <code>neutral-0</code>
      <span class="color-swatch__hex">#FFFFFF</span>
    </div>
  </div>
  <div class="color-swatch" style="--c: var(--govtw-primitive-color-neutral-100)">
    <div class="color-swatch__preview"></div>
    <div class="color-swatch__info">
      <code>neutral-100</code>
      <span class="color-swatch__hex">#E8E8E8</span>
    </div>
  </div>
  <div class="color-swatch" style="--c: var(--govtw-primitive-color-neutral-400)">
    <div class="color-swatch__preview"></div>
    <div class="color-swatch__info">
      <code>neutral-400</code>
      <span class="color-swatch__hex">#A0A0A0</span>
    </div>
  </div>
  <div class="color-swatch" style="--c: var(--govtw-primitive-color-neutral-600)">
    <div class="color-swatch__preview"></div>
    <div class="color-swatch__info">
      <code>neutral-600</code>
      <span class="color-swatch__hex">#595959</span>
    </div>
  </div>
  <div class="color-swatch" style="--c: var(--govtw-primitive-color-neutral-800)">
    <div class="color-swatch__preview"></div>
    <div class="color-swatch__info">
      <code>neutral-800</code>
      <span class="color-swatch__hex">#1A1A1A</span>
    </div>
  </div>
</DemoBlock>

### 回饋色

<DemoBlock no-code>
  <div class="color-swatch" style="--c: var(--govtw-primitive-color-red-500)">
    <div class="color-swatch__preview"></div>
    <div class="color-swatch__info">
      <code>red-500</code>
      <span class="color-swatch__hex">#C3362B</span>
    </div>
  </div>
  <div class="color-swatch" style="--c: var(--govtw-primitive-color-red-300)">
    <div class="color-swatch__preview"></div>
    <div class="color-swatch__info">
      <code>red-300</code>
      <span class="color-swatch__hex">#F87171</span>
    </div>
  </div>
  <div class="color-swatch" style="--c: var(--govtw-primitive-color-green-500)">
    <div class="color-swatch__preview"></div>
    <div class="color-swatch__info">
      <code>green-500</code>
      <span class="color-swatch__hex">#00804A</span>
    </div>
  </div>
  <div class="color-swatch" style="--c: var(--govtw-primitive-color-green-300)">
    <div class="color-swatch__preview"></div>
    <div class="color-swatch__info">
      <code>green-300</code>
      <span class="color-swatch__hex">#4ADE80</span>
    </div>
  </div>
  <div class="color-swatch" style="--c: var(--govtw-primitive-color-yellow-500)">
    <div class="color-swatch__preview"></div>
    <div class="color-swatch__info">
      <code>yellow-500</code>
      <span class="color-swatch__hex">#F0AB00</span>
    </div>
  </div>
  <div class="color-swatch" style="--c: var(--govtw-primitive-color-yellow-focus)">
    <div class="color-swatch__preview"></div>
    <div class="color-swatch__info">
      <code>yellow-focus</code>
      <span class="color-swatch__hex">#fd0</span>
    </div>
  </div>
  <div class="color-swatch" style="--c: var(--govtw-primitive-color-purple-500)">
    <div class="color-swatch__preview"></div>
    <div class="color-swatch__info">
      <code>purple-500</code>
      <span class="color-swatch__hex">#6B3FA0</span>
    </div>
  </div>
</DemoBlock>

---

## Semantic 色彩

以用途命名，引用 Primitive 層。主題切換（如 dark mode）覆寫的就是這一層。

切換頁面的深色模式可以看到 Semantic 色彩隨主題自動變化。

### 品牌色

<DemoBlock no-code>
  <div class="color-swatch" style="--c: var(--govtw-color-brand-primary)">
    <div class="color-swatch__preview"></div>
    <div class="color-swatch__info">
      <code>--govtw-color-brand-primary</code>
      <span class="color-swatch__desc">主要品牌色</span>
    </div>
  </div>
  <div class="color-swatch" style="--c: var(--govtw-color-brand-secondary)">
    <div class="color-swatch__preview"></div>
    <div class="color-swatch__info">
      <code>--govtw-color-brand-secondary</code>
      <span class="color-swatch__desc">輔助品牌色</span>
    </div>
  </div>
</DemoBlock>

### 文字色

<DemoBlock no-code>
  <div class="color-swatch" style="--c: var(--govtw-color-text-primary)">
    <div class="color-swatch__preview"></div>
    <div class="color-swatch__info">
      <code>--govtw-color-text-primary</code>
      <span class="color-swatch__desc">主要文字</span>
    </div>
  </div>
  <div class="color-swatch" style="--c: var(--govtw-color-text-secondary)">
    <div class="color-swatch__preview"></div>
    <div class="color-swatch__info">
      <code>--govtw-color-text-secondary</code>
      <span class="color-swatch__desc">次要文字</span>
    </div>
  </div>
  <div class="color-swatch" style="--c: var(--govtw-color-text-on-primary)">
    <div class="color-swatch__preview" style="border: 1px solid #ccc"></div>
    <div class="color-swatch__info">
      <code>--govtw-color-text-on-primary</code>
      <span class="color-swatch__desc">品牌色上的文字</span>
    </div>
  </div>
</DemoBlock>

### 背景色

<DemoBlock no-code>
  <div class="color-swatch" style="--c: var(--govtw-color-bg-canvas)">
    <div class="color-swatch__preview" style="border: 1px solid #ccc"></div>
    <div class="color-swatch__info">
      <code>--govtw-color-bg-canvas</code>
      <span class="color-swatch__desc">頁面背景</span>
    </div>
  </div>
  <div class="color-swatch" style="--c: var(--govtw-color-bg-surface)">
    <div class="color-swatch__preview"></div>
    <div class="color-swatch__info">
      <code>--govtw-color-bg-surface</code>
      <span class="color-swatch__desc">區塊背景</span>
    </div>
  </div>
</DemoBlock>

### 邊框色

<DemoBlock no-code>
  <div class="color-swatch" style="--c: var(--govtw-color-border-default)">
    <div class="color-swatch__preview"></div>
    <div class="color-swatch__info">
      <code>--govtw-color-border-default</code>
      <span class="color-swatch__desc">預設邊框</span>
    </div>
  </div>
</DemoBlock>

### 回饋色

<DemoBlock no-code>
  <div class="color-swatch" style="--c: var(--govtw-color-feedback-error)">
    <div class="color-swatch__preview"></div>
    <div class="color-swatch__info">
      <code>--govtw-color-feedback-error</code>
      <span class="color-swatch__desc">錯誤</span>
    </div>
  </div>
  <div class="color-swatch" style="--c: var(--govtw-color-feedback-success)">
    <div class="color-swatch__preview"></div>
    <div class="color-swatch__info">
      <code>--govtw-color-feedback-success</code>
      <span class="color-swatch__desc">成功</span>
    </div>
  </div>
  <div class="color-swatch" style="--c: var(--govtw-color-feedback-warning)">
    <div class="color-swatch__preview"></div>
    <div class="color-swatch__info">
      <code>--govtw-color-feedback-warning</code>
      <span class="color-swatch__desc">警告</span>
    </div>
  </div>
  <div class="color-swatch" style="--c: var(--govtw-color-feedback-info)">
    <div class="color-swatch__preview"></div>
    <div class="color-swatch__info">
      <code>--govtw-color-feedback-info</code>
      <span class="color-swatch__desc">資訊</span>
    </div>
  </div>
</DemoBlock>

### 連結色

<DemoBlock no-code>
  <div class="color-swatch" style="--c: var(--govtw-color-link-default)">
    <div class="color-swatch__preview"></div>
    <div class="color-swatch__info">
      <code>--govtw-color-link-default</code>
      <span class="color-swatch__desc">預設連結</span>
    </div>
  </div>
  <div class="color-swatch" style="--c: var(--govtw-color-link-visited)">
    <div class="color-swatch__preview"></div>
    <div class="color-swatch__info">
      <code>--govtw-color-link-visited</code>
      <span class="color-swatch__desc">已瀏覽連結</span>
    </div>
  </div>
</DemoBlock>

### Focus

<DemoBlock no-code>
  <div class="color-swatch" style="--c: var(--govtw-focus-color)">
    <div class="color-swatch__preview"></div>
    <div class="color-swatch__info">
      <code>--govtw-focus-color</code>
      <span class="color-swatch__desc">聚焦框色（黃色）</span>
    </div>
  </div>
</DemoBlock>

---

## 使用方式

元件內部使用 Component token，一般頁面使用 Semantic token：

```css
/* 一般頁面樣式 — 使用 Semantic token */
.my-element {
  color: var(--govtw-color-text-primary);
  background: var(--govtw-color-bg-surface);
  border: 1px solid var(--govtw-color-border-default);
}
```

```css
/* 客製特定元件 — 覆寫 Component token */
:root {
  --govtw-button-primary-bg: #0062B1;
}
```

## 無障礙

- 所有文字與背景色的對比度至少符合 WCAG 2.2 AA 標準（4.5:1）
- 回饋色不僅依靠色彩傳達意義，需搭配圖示或文字
- Focus 色 `#fd0` 確保鍵盤導航時的高可見度
