import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('govtw-fieldset')
export class GovFieldset extends LitElement {
  @property({ type: String }) legend = '';
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
      padding-left: var(--govtw-spacing-4);
    }

    .fieldset {
      border: none;
      padding: 0;
      margin: 0;
      min-width: 0;
    }

    /* ===== Legend ===== */
    .fieldset__legend {
      padding: 0;
      margin-bottom: var(--govtw-spacing-4);
    }

    /* ===== Hint ===== */
    .fieldset__hint {
      display: block;
      margin-bottom: var(--govtw-spacing-4);
    }

    /* ===== Error ===== */
    .fieldset__error {
      display: block;
      font-weight: 700;
      color: var(--govtw-fieldset-error-color);
      margin-bottom: var(--govtw-spacing-4);
    }

    /* ===== Slot 內容間距 ===== */
    .fieldset__content {
      display: flex;
      flex-direction: column;
      gap: var(--govtw-spacing-4);
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
