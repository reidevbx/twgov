import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, queryAssignedElements } from 'lit/decorators.js';

@customElement('govtw-fieldset')
export class GovtwFieldset extends LitElement {
  @property({ type: String }) error = '';

  @queryAssignedElements({ slot: 'legend', flatten: true })
  private _legendElements!: Element[];

  @queryAssignedElements({ slot: 'hint', flatten: true })
  private _hintElements!: Element[];

  static styles = css`
    :host {
      display: block;
    }

    /*
     * GOV.UK-inspired fieldset:
     * - 用 <fieldset> + <legend> 組合相關欄位
     * - legend / hint 由使用者透過 slot 傳入，樣式自行控制
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
      margin-bottom: 0;
    }

    /* Slotted 標題/段落的 margin 由 fieldset 控制 */
    .fieldset__legend ::slotted(*) {
      margin: 0;
    }

    /* 隱藏空的 legend（沒有 slot 內容時） */
    .fieldset__legend--empty {
      display: none;
    }

    /* ===== Hint ===== */
    .fieldset__hint {
      display: block;
      margin-bottom: var(--govtw-spacing-4);
    }

    .fieldset__hint ::slotted(*) {
      margin: 0;
    }

    .fieldset__hint--empty {
      display: none;
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
    const hasLegend = (this._legendElements?.length ?? 0) > 0;
    const hasHint = (this._hintElements?.length ?? 0) > 0;

    return html`
      <div class="${hasError ? 'fieldset-wrapper--error' : ''}">
        <fieldset
          class="fieldset"
          aria-describedby=${[
            hasHint ? 'fieldset-hint' : '',
            hasError ? 'fieldset-error' : '',
          ].filter(Boolean).join(' ') || nothing}
        >
          <legend class="fieldset__legend ${hasLegend ? '' : 'fieldset__legend--empty'}">
            <slot name="legend"></slot>
          </legend>
          <div
            class="fieldset__hint ${hasHint ? '' : 'fieldset__hint--empty'}"
            id="fieldset-hint"
          >
            <slot name="hint"></slot>
          </div>
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
    'govtw-fieldset': GovtwFieldset;
  }
}
