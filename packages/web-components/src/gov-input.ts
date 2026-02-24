import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('gov-input')
export class GovInput extends LitElement {
  static shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  static formAssociated = true;

  @property({ type: String }) label = '';
  @property({ type: String }) hint = '';
  @property({ type: String }) error = '';
  @property({ type: String }) name = '';
  @property({ type: String }) value = '';
  @property({ type: String }) type = 'text';
  @property({ type: String }) autocomplete = '';
  @property({ type: String }) inputmode = '';
  @property({ type: String }) placeholder = '';
  @property({ type: String }) prefix = '';
  @property({ type: String }) suffix = '';
  @property({ type: String, reflect: true }) width: 'full' | '20' | '10' | '5' | '4' | '3' | '2' = 'full';
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean }) spellcheck = false;

  private _internals: ElementInternals;

  constructor() {
    super();
    this._internals = this.attachInternals();
  }

  static styles = css`
    :host {
      display: block;
      outline: none !important;
    }

    /*
     * GOV.UK-inspired text input:
     * - 明確的 label + 可選的 hint / error
     * - 2px 邊框，focus 時黃色 ring + 黑色粗邊框
     * - error 時左側紅色邊線 + 紅色邊框
     * - prefix / suffix 用於單位或符號
     */

    .form-group {
      margin-bottom: var(--twgov-spacing-6, 24px);
    }

    .form-group--error {
      border-left: 4px solid var(--twgov-color-feedback-error, #C3362B);
      padding-left: var(--twgov-spacing-4, 16px);
    }

    /* ===== Label ===== */
    .label {
      display: block;
      font-family: var(--twgov-font-sans, system-ui, sans-serif);
      font-size: var(--twgov-font-size-base, 1rem);
      font-weight: 700;
      color: var(--twgov-color-text-primary, #1A1A1A);
      margin-bottom: var(--twgov-spacing-1, 4px);
    }

    /* ===== Hint ===== */
    .hint {
      display: block;
      font-family: var(--twgov-font-sans, system-ui, sans-serif);
      font-size: var(--twgov-font-size-base, 1rem);
      color: var(--twgov-color-text-secondary, #595959);
      margin-bottom: var(--twgov-spacing-2, 8px);
    }

    /* ===== Error message ===== */
    .error-message {
      display: block;
      font-family: var(--twgov-font-sans, system-ui, sans-serif);
      font-size: var(--twgov-font-size-base, 1rem);
      font-weight: 700;
      color: var(--twgov-color-feedback-error, #C3362B);
      margin-bottom: var(--twgov-spacing-2, 8px);
    }

    /* ===== Input wrapper (for prefix / suffix) ===== */
    .input-wrapper {
      display: inline-flex;
      align-items: stretch;
      border-radius: var(--twgov-radius-sm, 4px);
    }

    .input-prefix,
    .input-suffix {
      display: flex;
      align-items: center;
      font-family: var(--twgov-font-sans, system-ui, sans-serif);
      font-size: var(--twgov-font-size-base, 1rem);
      color: var(--twgov-color-text-primary, #1A1A1A);
      background: var(--twgov-color-bg-surface, #F5F5F5);
      border: 2px solid var(--twgov-color-text-primary, #1A1A1A);
      padding: var(--twgov-spacing-2, 8px) var(--twgov-spacing-3, 12px);
      white-space: nowrap;
    }

    .input-prefix {
      border-right: 0;
      border-radius: var(--twgov-radius-sm, 4px) 0 0 var(--twgov-radius-sm, 4px);
    }

    .input-suffix {
      border-left: 0;
      border-radius: 0 var(--twgov-radius-sm, 4px) var(--twgov-radius-sm, 4px) 0;
    }

    /* 有 prefix/suffix 時，focus 樣式移到 wrapper */
    .input-wrapper--has-affix {
      position: relative;
    }

    .input-wrapper--has-affix:focus-within {
      outline: 3px solid #fd0;
      outline-offset: 0;
      box-shadow: inset 0 0 0 1px var(--twgov-color-text-primary, #1A1A1A);
    }

    .input-wrapper--has-affix .input:focus {
      outline: none;
      box-shadow: none;
    }

    /* ===== Input ===== */
    .input {
      font-family: var(--twgov-font-sans, system-ui, sans-serif);
      font-size: var(--twgov-font-size-base, 1rem);
      line-height: 1.5;
      color: var(--twgov-color-text-primary, #1A1A1A);
      background: var(--twgov-color-bg-canvas, #FFFFFF);
      border: 2px solid var(--twgov-color-text-primary, #1A1A1A);
      border-radius: var(--twgov-radius-sm, 4px);
      padding: var(--twgov-spacing-2, 8px);
      width: 100%;
      box-sizing: border-box;
      margin: 0;
      -webkit-appearance: none;
      appearance: none;
    }

    /* prefix / suffix 時修正圓角 */
    .input-wrapper .input {
      border-radius: 0;
    }

    .input-wrapper .input:first-child {
      border-radius: var(--twgov-radius-sm, 4px) 0 0 var(--twgov-radius-sm, 4px);
    }

    .input-wrapper .input:last-child {
      border-radius: 0 var(--twgov-radius-sm, 4px) var(--twgov-radius-sm, 4px) 0;
    }

    .input-wrapper .input:only-child {
      border-radius: var(--twgov-radius-sm, 4px);
    }

    /* ===== 固定寬度 ===== */
    :host([width="20"]) .input { max-width: 41ex; }
    :host([width="10"]) .input { max-width: 23ex; }
    :host([width="5"]) .input { max-width: 10.8ex; }
    :host([width="4"]) .input { max-width: 9ex; }
    :host([width="3"]) .input { max-width: 7.2ex; }
    :host([width="2"]) .input { max-width: 5.4ex; }

    /* ===== Focus — 黃色 ring + 黑色粗邊框 ===== */
    .input:focus {
      outline: 3px solid #fd0;
      outline-offset: 0;
      border-color: var(--twgov-color-text-primary, #1A1A1A);
      box-shadow: inset 0 0 0 1px var(--twgov-color-text-primary, #1A1A1A);
    }

    /* ===== Error ===== */
    .input--error {
      border-color: var(--twgov-color-feedback-error, #C3362B);
    }

    .input--error:focus {
      border-color: var(--twgov-color-text-primary, #1A1A1A);
    }

    /* ===== Disabled ===== */
    .input:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      background: var(--twgov-color-bg-surface, #F5F5F5);
    }
  `;

  private _handleInput(e: Event) {
    const input = e.target as HTMLInputElement;
    this.value = input.value;
    this._internals.setFormValue(this.value);
    this.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
  }

  private _handleChange(e: Event) {
    const input = e.target as HTMLInputElement;
    this.value = input.value;
    this._internals.setFormValue(this.value);
    this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
  }

  updated(changed: Map<string, unknown>) {
    if (changed.has('value')) {
      this._internals.setFormValue(this.value);
    }
  }

  formResetCallback() {
    this.value = '';
  }

  render() {
    const hasError = !!this.error;
    const inputId = 'input';
    const hintId = 'hint';
    const errorId = 'error';

    const describedBy = [
      this.hint ? hintId : '',
      hasError ? errorId : '',
    ].filter(Boolean).join(' ') || undefined;

    return html`
      <div class="form-group ${hasError ? 'form-group--error' : ''}">
        ${this.label
          ? html`<label class="label" for=${inputId}>${this.label}</label>`
          : nothing}
        ${this.hint
          ? html`<span class="hint" id=${hintId}>${this.hint}</span>`
          : nothing}
        ${hasError
          ? html`<span class="error-message" id=${errorId}>${this.error}</span>`
          : nothing}
        <div class="input-wrapper ${this.prefix || this.suffix ? 'input-wrapper--has-affix' : ''}">
          ${this.prefix
            ? html`<span class="input-prefix" aria-hidden="true">${this.prefix}</span>`
            : nothing}
          <input
            class="input ${hasError ? 'input--error' : ''}"
            id=${inputId}
            type=${this.type}
            .value=${this.value}
            name=${this.name || nothing}
            placeholder=${this.placeholder || nothing}
            autocomplete=${this.autocomplete || nothing}
            inputmode=${this.inputmode || nothing}
            ?disabled=${this.disabled}
            .spellcheck=${this.spellcheck}
            aria-describedby=${describedBy || nothing}
            @input=${this._handleInput}
            @change=${this._handleChange}
          />
          ${this.suffix
            ? html`<span class="input-suffix" aria-hidden="true">${this.suffix}</span>`
            : nothing}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gov-input': GovInput;
  }
}
