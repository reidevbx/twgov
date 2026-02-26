import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('govtw-radio')
export class GovRadio extends LitElement {
  static shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  static formAssociated = true;

  @property({ type: Boolean, reflect: true }) checked = false;
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: String }) value = '';
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
     * GOV.UK-inspired radio technique:
     * - 原生 input 以 opacity:0 覆蓋在自訂圓形上，保留無障礙
     * - 選取圓點以 border + border-radius: 50% 實作（零寬高 + 粗 border）
     * - focus 使用黃色 #fd0 ring，與其他表單元件一致
     * - hover 邊框加粗，提供不依賴色彩的回饋
     */

    .radio {
      display: flex;
      align-items: flex-start;
      gap: var(--govtw-spacing-3, 12px);
      cursor: pointer;
      position: relative;
      min-height: 44px;
      padding: var(--govtw-spacing-1, 4px) 0;
    }

    /* ===== 原生 input，不可見但可操作 ===== */
    .radio__input {
      position: absolute;
      width: var(--govtw-radio-size);
      height: var(--govtw-radio-size);
      margin: 0;
      opacity: 0;
      cursor: pointer;
      z-index: 1;
    }

    .radio__input:disabled {
      cursor: not-allowed;
    }

    /* ===== 自訂視覺圓形 ===== */
    .radio__circle {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      width: var(--govtw-radio-size);
      height: var(--govtw-radio-size);
      border: 2px solid var(--govtw-radio-border-color);
      border-radius: 50%;
      background: var(--govtw-radio-bg);
      box-sizing: border-box;
      transition: border-color 0.15s, border-width 0.1s;
    }

    /* ===== 選取圓點：零寬高 + 粗 border + border-radius ===== */
    .radio__circle::after {
      content: '';
      width: 0;
      height: 0;
      border: 10px solid var(--govtw-radio-selected-color);
      border-radius: 50%;
      opacity: 0;
    }

    /* ===== Checked ===== */
    .radio__input:checked + .radio__circle {
      border-color: var(--govtw-radio-selected-color);
    }

    .radio__input:checked + .radio__circle::after {
      opacity: 1;
    }

    /* ===== Hover ===== */
    .radio__input:hover:not(:disabled) + .radio__circle {
      border-width: 4px;
    }

    /* hover 時圓點稍微縮小以配合加粗的邊框 */
    .radio__input:hover:not(:disabled):checked + .radio__circle::after {
      border-width: 8px;
    }

    /* ===== Focus — 黃色 ring ===== */
    .radio__input:focus-visible + .radio__circle {
      box-shadow: 0 0 0 var(--govtw-radio-focus-width) var(--govtw-radio-focus-color);
    }

    :host(:focus-within) {
      outline: none;
    }

    /* ===== Disabled ===== */
    :host([disabled]) .radio {
      cursor: not-allowed;
    }

    :host([disabled]) .radio__circle {
      opacity: 0.5;
    }

    :host([disabled]) .radio__label {
      opacity: 0.5;
      cursor: not-allowed;
    }

    /* ===== 標籤文字 ===== */
    .radio__label {
      font-family: var(--govtw-font-sans);
      font-size: var(--govtw-font-size-base);
      color: var(--govtw-radio-label-color);
      line-height: 1.5;
      padding-top: 8px;
      user-select: none;
    }
  `;

  private _handleChange(e: Event) {
    const input = e.target as HTMLInputElement;
    if (input.checked) {
      this.checked = true;
      this._internals.setFormValue(this.value);
      // 取消同群組其他 radio 的選取
      this._uncheckSiblings();
      this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
    }
  }

  private _uncheckSiblings() {
    if (!this.name) return;
    const root = this.getRootNode() as Document | ShadowRoot;
    const siblings = root.querySelectorAll<GovRadio>(`govtw-radio[name="${this.name}"]`);
    for (const sibling of siblings) {
      if (sibling !== this && sibling.checked) {
        sibling.checked = false;
      }
    }
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
      <label class="radio">
        <input
          type="radio"
          class="radio__input"
          .checked=${this.checked}
          ?disabled=${this.disabled}
          name=${this.name}
          value=${this.value}
          @change=${this._handleChange}
        />
        <span class="radio__circle"></span>
        <span class="radio__label">
          ${this.label || html`<slot></slot>`}
        </span>
      </label>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'govtw-radio': GovRadio;
  }
}
