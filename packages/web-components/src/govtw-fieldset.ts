import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('govtw-fieldset')
export class GovFieldset extends LitElement {
  @property({ type: String }) legend = '';
  @property({ type: String, reflect: true }) size: 'xl' | 'l' | 'm' | 's' = 'l';
  @property({ type: String }) hint = '';
  @property({ type: String }) error = '';

  static styles = css`
    :host {
      display: block;
    }

    /*
     * GOV.UK-inspired fieldset:
     * - 用 <fieldset> + <legend> 組合相關欄位
     * - legend 可作為頁面標題
     * - error 時左側紅色邊線
     */

    .fieldset-wrapper--error {
      border-left: 4px solid var(--govtw-fieldset-error-color);
      padding-left: var(--govtw-spacing-4, 16px);
    }

    .fieldset {
      border: none;
      padding: 0;
      margin: 0;
      min-width: 0;
    }

    /* ===== Legend ===== */
    .fieldset__legend {
      font-family: var(--govtw-font-sans);
      font-weight: 700;
      color: var(--govtw-fieldset-legend-color);
      padding: 0;
      margin-bottom: var(--govtw-spacing-4, 16px);
    }

    :host([size="xl"]) .fieldset__legend {
      font-size: var(--govtw-font-size-4xl);
      line-height: 1.2;
      margin-bottom: var(--govtw-spacing-6, 24px);
    }

    :host([size="l"]) .fieldset__legend {
      font-size: var(--govtw-font-size-3xl);
      line-height: 1.3;
      margin-bottom: var(--govtw-spacing-6, 24px);
    }

    :host([size="m"]) .fieldset__legend {
      font-size: var(--govtw-font-size-2xl);
      line-height: 1.4;
    }

    :host([size="s"]) .fieldset__legend {
      font-size: var(--govtw-font-size-xl);
      line-height: 1.4;
    }

    /* ===== Hint ===== */
    .fieldset__hint {
      display: block;
      font-family: var(--govtw-font-sans);
      font-size: var(--govtw-font-size-base);
      color: var(--govtw-fieldset-hint-color);
      margin-bottom: var(--govtw-spacing-4, 16px);
    }

    /* ===== Error ===== */
    .fieldset__error {
      display: block;
      font-family: var(--govtw-font-sans);
      font-size: var(--govtw-font-size-base);
      font-weight: 700;
      color: var(--govtw-fieldset-error-color);
      margin-bottom: var(--govtw-spacing-4, 16px);
    }

    /* ===== Slot 內容間距 ===== */
    .fieldset__content {
      display: flex;
      flex-direction: column;
      gap: var(--govtw-spacing-4, 16px);
    }
  `;

  render() {
    const hasError = !!this.error;

    return html`
      <div class="${hasError ? 'fieldset-wrapper--error' : ''}">
        <fieldset
          class="fieldset"
          aria-describedby=${[
            this.hint ? 'fieldset-hint' : '',
            hasError ? 'fieldset-error' : '',
          ].filter(Boolean).join(' ') || nothing}
        >
          ${this.legend
            ? html`<legend class="fieldset__legend">${this.legend}</legend>`
            : nothing}
          ${this.hint
            ? html`<span class="fieldset__hint" id="fieldset-hint">${this.hint}</span>`
            : nothing}
          ${hasError
            ? html`<span class="fieldset__error" id="fieldset-error">${this.error}</span>`
            : nothing}
          <div class="fieldset__content">
            <slot></slot>
          </div>
        </fieldset>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'govtw-fieldset': GovFieldset;
  }
}
