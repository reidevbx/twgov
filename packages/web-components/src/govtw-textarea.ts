import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('govtw-textarea')
export class GovTextarea extends LitElement {
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
  @property({ type: String }) autocomplete = '';
  @property({ type: String }) placeholder = '';
  @property({ type: Number }) rows = 5;
  @property({ type: Number }) maxlength = 0;
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
     * GOV.UK-inspired textarea:
     * - 明確的 label + 可選的 hint / error
     * - 2px 邊框，focus 時黃色 ring + 黑色粗邊框
     * - error 時左側紅色邊線 + 紅色邊框
     * - 可選的字數計數器
     */

    .form-group {
      margin-bottom: var(--govtw-spacing-6, 24px);
    }

    .form-group--error {
      border-left: 4px solid var(--govtw-color-feedback-error, #C3362B);
      padding-left: var(--govtw-spacing-4, 16px);
    }

    /* ===== Label ===== */
    .label {
      display: block;
      font-family: var(--govtw-font-sans, system-ui, sans-serif);
      font-size: var(--govtw-font-size-base, 1rem);
      font-weight: 700;
      color: var(--govtw-color-text-primary, #1A1A1A);
      margin-bottom: var(--govtw-spacing-1, 4px);
    }

    /* ===== Hint ===== */
    .hint {
      display: block;
      font-family: var(--govtw-font-sans, system-ui, sans-serif);
      font-size: var(--govtw-font-size-base, 1rem);
      color: var(--govtw-color-text-secondary, #595959);
      margin-bottom: var(--govtw-spacing-2, 8px);
    }

    /* ===== Error message ===== */
    .error-message {
      display: block;
      font-family: var(--govtw-font-sans, system-ui, sans-serif);
      font-size: var(--govtw-font-size-base, 1rem);
      font-weight: 700;
      color: var(--govtw-color-feedback-error, #C3362B);
      margin-bottom: var(--govtw-spacing-2, 8px);
    }

    /* ===== Textarea ===== */
    .textarea {
      font-family: var(--govtw-font-sans, system-ui, sans-serif);
      font-size: var(--govtw-font-size-base, 1rem);
      line-height: 1.5;
      color: var(--govtw-color-text-primary, #1A1A1A);
      background: var(--govtw-color-bg-canvas, #FFFFFF);
      border: 2px solid var(--govtw-color-text-primary, #1A1A1A);
      border-radius: var(--govtw-radius-sm, 4px);
      padding: var(--govtw-spacing-2, 8px);
      width: 100%;
      box-sizing: border-box;
      margin: 0;
      resize: vertical;
      -webkit-appearance: none;
      appearance: none;
    }

    /* ===== Focus — 黃色 ring + 黑色粗邊框 ===== */
    .textarea:focus {
      outline: 3px solid #fd0;
      outline-offset: 0;
      border-color: var(--govtw-color-text-primary, #1A1A1A);
      box-shadow: inset 0 0 0 1px var(--govtw-color-text-primary, #1A1A1A);
    }

    /* ===== Error ===== */
    .textarea--error {
      border-color: var(--govtw-color-feedback-error, #C3362B);
    }

    .textarea--error:focus {
      border-color: var(--govtw-color-text-primary, #1A1A1A);
    }

    /* ===== Disabled ===== */
    .textarea:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      background: var(--govtw-color-bg-surface, #EAF0F0);
    }

    /* ===== 字數計數 ===== */
    .character-count {
      font-family: var(--govtw-font-sans, system-ui, sans-serif);
      font-size: var(--govtw-font-size-sm, 0.875rem);
      color: var(--govtw-color-text-secondary, #595959);
      margin-top: var(--govtw-spacing-1, 4px);
    }

    .character-count--over {
      color: var(--govtw-color-feedback-error, #C3362B);
      font-weight: 700;
    }
  `;

  private _handleInput(e: Event) {
    const textarea = e.target as HTMLTextAreaElement;
    this.value = textarea.value;
    this._internals.setFormValue(this.value);
    this.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
  }

  private _handleChange(e: Event) {
    const textarea = e.target as HTMLTextAreaElement;
    this.value = textarea.value;
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
    const textareaId = 'textarea';
    const hintId = 'hint';
    const errorId = 'error';
    const countId = 'count';

    const describedBy = [
      this.hint ? hintId : '',
      hasError ? errorId : '',
      this.maxlength > 0 ? countId : '',
    ].filter(Boolean).join(' ') || undefined;

    const remaining = this.maxlength > 0 ? this.maxlength - this.value.length : null;
    const isOver = remaining !== null && remaining < 0;

    return html`
      <div class="form-group ${hasError ? 'form-group--error' : ''}">
        ${this.label
          ? html`<label class="label" for=${textareaId}>${this.label}</label>`
          : nothing}
        ${this.hint
          ? html`<span class="hint" id=${hintId}>${this.hint}</span>`
          : nothing}
        ${hasError
          ? html`<span class="error-message" id=${errorId}>${this.error}</span>`
          : nothing}
        <textarea
          class="textarea ${hasError ? 'textarea--error' : ''}"
          id=${textareaId}
          .value=${this.value}
          rows=${this.rows}
          name=${this.name || nothing}
          placeholder=${this.placeholder || nothing}
          autocomplete=${this.autocomplete || nothing}
          ?disabled=${this.disabled}
          .spellcheck=${this.spellcheck}
          aria-describedby=${describedBy || nothing}
          @input=${this._handleInput}
          @change=${this._handleChange}
        ></textarea>
        ${remaining !== null
          ? html`<span
              class="character-count ${isOver ? 'character-count--over' : ''}"
              id=${countId}
              aria-live="polite"
            >${isOver
              ? `已超過 ${Math.abs(remaining)} 個字`
              : `還可輸入 ${remaining} 個字`}</span>`
          : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'govtw-textarea': GovTextarea;
  }
}
