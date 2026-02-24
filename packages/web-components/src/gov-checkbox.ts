import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('twgov-checkbox')
export class GovCheckbox extends LitElement {
  static shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  static formAssociated = true;

  @property({ type: Boolean, reflect: true }) checked = false;
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: String }) value = 'on';
  @property({ type: String }) name = '';
  @property({ type: String }) label = '';

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
     * GOV.UK-inspired checkbox technique:
     * - 原生 input 以 opacity:0 覆蓋在自訂方塊上，保留無障礙
     * - 自訂方塊用 ::after 偽元素旋轉邊框畫勾號
     * - focus 使用黃色 #fd0 ring，跟 button 一致
     * - hover 邊框加粗，提供不依賴色彩的回饋
     */

    .checkbox {
      display: flex;
      align-items: flex-start;
      gap: var(--twgov-spacing-3, 12px);
      cursor: pointer;
      position: relative;
      min-height: 44px;
      padding: var(--twgov-spacing-1, 4px) 0;
    }

    /* ===== 原生 input，不可見但可操作 ===== */
    .checkbox__input {
      position: absolute;
      width: 40px;
      height: 40px;
      margin: 0;
      opacity: 0;
      cursor: pointer;
      z-index: 1;
    }

    .checkbox__input:disabled {
      cursor: not-allowed;
    }

    /* ===== 自訂視覺方塊 ===== */
    .checkbox__box {
      position: relative;
      display: inline-flex;
      flex-shrink: 0;
      width: 40px;
      height: 40px;
      border: 2px solid var(--twgov-color-text-primary, #1A1A1A);
      border-radius: var(--twgov-radius-sm, 4px);
      background: var(--twgov-color-bg-canvas, #FFFFFF);
      box-sizing: border-box;
      transition: border-color 0.15s, border-width 0.1s;
    }

    /* ===== 勾號：旋轉邊框技巧 ===== */
    .checkbox__box::after {
      content: '';
      position: absolute;
      top: 8px;
      left: 7px;
      width: 20px;
      height: 10px;
      border-left: 4px solid var(--twgov-color-brand-primary, #0D7A4A);
      border-bottom: 4px solid var(--twgov-color-brand-primary, #0D7A4A);
      transform: rotate(-45deg);
      opacity: 0;
    }

    /* ===== Checked ===== */
    .checkbox__input:checked + .checkbox__box {
      border-color: var(--twgov-color-brand-primary, #0D7A4A);
    }

    .checkbox__input:checked + .checkbox__box::after {
      opacity: 1;
    }

    /* ===== Hover ===== */
    .checkbox__input:hover:not(:disabled) + .checkbox__box {
      border-width: 4px;
    }

    /* hover 時勾號位置微調（border 從 2px 變 4px） */
    .checkbox__input:hover:not(:disabled):checked + .checkbox__box::after {
      top: 6px;
      left: 5px;
    }

    /* ===== Focus — 黃色 ring ===== */
    .checkbox__input:focus-visible + .checkbox__box {
      box-shadow: 0 0 0 3px #fd0;
    }

    :host(:focus-within) {
      outline: none;
    }

    /* ===== Disabled ===== */
    :host([disabled]) .checkbox {
      cursor: not-allowed;
    }

    :host([disabled]) .checkbox__box {
      opacity: 0.5;
    }

    :host([disabled]) .checkbox__label {
      opacity: 0.5;
      cursor: not-allowed;
    }

    /* ===== 標籤文字 ===== */
    .checkbox__label {
      font-family: var(--twgov-font-sans, system-ui, sans-serif);
      font-size: var(--twgov-font-size-base, 1rem);
      color: var(--twgov-color-text-primary, #1A1A1A);
      line-height: 1.5;
      padding-top: 8px;
      user-select: none;
    }
  `;

  private _handleChange(e: Event) {
    const input = e.target as HTMLInputElement;
    this.checked = input.checked;
    this._internals.setFormValue(this.checked ? this.value : null);
    this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
  }

  updated(changed: Map<string, unknown>) {
    if (changed.has('checked')) {
      this._internals.setFormValue(this.checked ? this.value : null);
    }
  }

  formResetCallback() {
    this.checked = false;
  }

  render() {
    return html`
      <label class="checkbox">
        <input
          type="checkbox"
          class="checkbox__input"
          .checked=${this.checked}
          ?disabled=${this.disabled}
          @change=${this._handleChange}
        />
        <span class="checkbox__box"></span>
        <span class="checkbox__label">
          ${this.label || html`<slot></slot>`}
        </span>
      </label>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'twgov-checkbox': GovCheckbox;
  }
}
