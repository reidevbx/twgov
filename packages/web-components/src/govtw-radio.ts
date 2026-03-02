import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * 全域 radio 註冊表：以 name 為 key，儲存同名 radio 實例。
 * 互斥邏輯不依賴 DOM 查詢，不受 Shadow DOM 限制。
 */
const radioRegistry = new Map<string, Set<GovRadio>>();

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

    .radio {
      display: flex;
      align-items: flex-start;
      gap: var(--govtw-spacing-3);
      cursor: pointer;
      position: relative;
      min-height: 44px;
      padding: var(--govtw-spacing-1) 0;
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
      transition: opacity 0.15s;
    }

    /* ===== Checked — 用 :host([checked]) 而非 :checked ===== */
    :host([checked]) .radio__circle {
      border-color: var(--govtw-radio-selected-color);
    }

    :host([checked]) .radio__circle::after {
      opacity: 1;
    }

    /* ===== Hover ===== */
    .radio__input:hover:not(:disabled) + .radio__circle {
      border-width: 4px;
    }

    :host([checked]) .radio__input:hover:not(:disabled) + .radio__circle::after {
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
      opacity: 0.5;
    }

    /* ===== 標籤文字 ===== */
    .radio__label {
      line-height: 1.5;
      padding-top: 8px;
      user-select: none;
    }
  `;

  /* ===== 生命週期：註冊 / 取消註冊 ===== */

  connectedCallback() {
    super.connectedCallback();
    this._register();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._unregister();
  }

  private _register() {
    if (!this.name) return;
    if (!radioRegistry.has(this.name)) {
      radioRegistry.set(this.name, new Set());
    }
    radioRegistry.get(this.name)!.add(this);
  }

  private _unregister() {
    if (!this.name) return;
    const group = radioRegistry.get(this.name);
    if (group) {
      group.delete(this);
      if (group.size === 0) radioRegistry.delete(this.name);
    }
  }

  /* ===== 選取邏輯 ===== */

  private _select() {
    if (this.disabled || this.checked) return;
    this._uncheckSiblings();
    this.checked = true;
    this._internals.setFormValue(this.value);
    this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
  }

  private _uncheckSiblings() {
    if (!this.name) return;
    const group = radioRegistry.get(this.name);
    if (!group) return;
    for (const sibling of group) {
      if (sibling !== this) sibling.checked = false;
    }
  }

  updated(changed: Map<string, unknown>) {
    if (changed.has('checked')) {
      this._internals.setFormValue(this.checked ? this.value : null);
      const input = this.shadowRoot?.querySelector('input');
      if (input) input.checked = this.checked;
    }
    if (changed.has('name')) {
      const oldName = changed.get('name') as string;
      if (oldName) {
        const oldGroup = radioRegistry.get(oldName);
        if (oldGroup) {
          oldGroup.delete(this);
          if (oldGroup.size === 0) radioRegistry.delete(oldName);
        }
      }
      this._register();
    }
  }

  formResetCallback() {
    this.checked = false;
  }

  private _handleClick(e: Event) {
    e.preventDefault();
    this._select();
  }

  private _handleKeydown(e: KeyboardEvent) {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      this._select();
    }
  }

  render() {
    return html`
      <label class="radio" @click=${this._handleClick}>
        <input
          type="radio"
          class="radio__input"
          .checked=${this.checked}
          ?disabled=${this.disabled}
          role="radio"
          aria-checked=${this.checked ? 'true' : 'false'}
          tabindex="0"
          @keydown=${this._handleKeydown}
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
