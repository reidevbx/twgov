import { LitElement, html, css, type PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

/**
 * Radio 群組註冊表：以最近的 <form>（或 document）為範圍，name 為 key 管理同群組 radio。
 * 支援多 form 隔離、shadow DOM 隔離、鍵盤導航（WAI-ARIA radio group pattern）。
 */
type RadioScope = HTMLFormElement | Document;
const radioRegistry = new WeakMap<RadioScope, Map<string, Set<GovtwRadio>>>();

function addToGroup(scope: RadioScope, name: string, radio: GovtwRadio) {
  let byName = radioRegistry.get(scope);
  if (!byName) {
    byName = new Map();
    radioRegistry.set(scope, byName);
  }
  let group = byName.get(name);
  if (!group) {
    group = new Set();
    byName.set(name, group);
  }
  group.add(radio);
}

function removeFromGroup(scope: RadioScope, name: string, radio: GovtwRadio) {
  const byName = radioRegistry.get(scope);
  const group = byName?.get(name);
  if (!group) return;
  group.delete(radio);
  if (group.size === 0) byName!.delete(name);
}

function getGroup(scope: RadioScope, name: string): Set<GovtwRadio> | undefined {
  return radioRegistry.get(scope)?.get(name);
}

@customElement('govtw-radio')
export class GovtwRadio extends LitElement {
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

  /** 由群組集中計算，避免每顆 radio 在 render 時重複迭代整個群組 */
  @state() private _tabStop = false;

  private _internals: ElementInternals;
  private _currentScope: RadioScope | null = null;
  private _currentName = '';

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

  private get _scope(): RadioScope {
    return this._internals.form ?? document;
  }

  connectedCallback() {
    super.connectedCallback();
    this._register();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._unregister();
  }

  /** 當 form 關聯變動（被移入/移出 form）時，重新註冊至正確 scope */
  formAssociatedCallback() {
    if (this.isConnected) {
      this._unregister();
      this._register();
    }
  }

  private _register() {
    if (!this.name) return;
    this._currentScope = this._scope;
    this._currentName = this.name;
    addToGroup(this._currentScope, this._currentName, this);
    GovtwRadio._updateGroupTabStops(this._currentScope, this._currentName);
  }

  private _unregister() {
    if (!this._currentScope || !this._currentName) return;
    const scope = this._currentScope;
    const name = this._currentName;
    removeFromGroup(scope, name, this);
    this._currentScope = null;
    this._currentName = '';
    this._tabStop = false;
    GovtwRadio._updateGroupTabStops(scope, name);
  }

  /**
   * 集中計算一整個群組的 tab stop：每次群組成員增減、checked 或 disabled 變動時呼叫一次，
   * 而非讓每顆 radio 各自在 render 時去迭代群組（原本的 O(N²) 行為）。
   */
  private static _updateGroupTabStops(scope: RadioScope, name: string) {
    const group = getGroup(scope, name);
    if (!group) return;
    const enabled = [...group]
      .filter(r => r.isConnected && !r.disabled)
      .sort((a, b) =>
        a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1
      );
    const tabStop = enabled.find(r => r.checked) ?? enabled[0];
    for (const r of group) {
      r._tabStop = r === tabStop;
    }
  }

  private _select() {
    if (this.disabled || this.checked) return;
    this._uncheckSiblings();
    this.checked = true;
    this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
  }

  private _uncheckSiblings() {
    if (!this._currentScope || !this._currentName) return;
    const group = getGroup(this._currentScope, this._currentName);
    if (!group) return;
    for (const sibling of group) {
      if (sibling !== this) sibling.checked = false;
    }
  }

  /** 同群組中已連接且未 disabled 的 radio，依 DOM 順序排序（僅鍵盤導航使用） */
  private _getGroupRadios(): GovtwRadio[] {
    if (!this._currentScope || !this._currentName) return [this];
    const group = getGroup(this._currentScope, this._currentName);
    if (!group || group.size === 0) return [this];
    return [...group]
      .filter(r => r.isConnected && !r.disabled)
      .sort((a, b) =>
        a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1
      );
  }

  /** 移動焦點並選取鄰近 radio（ARIA radio group pattern：方向鍵同步選取） */
  private _focusSibling(delta: number) {
    const radios = this._getGroupRadios();
    if (radios.length === 0) return;
    const currentIndex = radios.indexOf(this);
    if (currentIndex === -1) return;
    const next = radios[(currentIndex + delta + radios.length) % radios.length];
    next._select();
    next.focus();
  }

  updated(changed: PropertyValues<this>) {
    if (changed.has('checked')) {
      this._internals.setFormValue(this.checked ? this.value : null);
      if (this._currentScope && this._currentName) {
        GovtwRadio._updateGroupTabStops(this._currentScope, this._currentName);
      }
    }
    if (changed.has('disabled') && this._currentScope && this._currentName) {
      GovtwRadio._updateGroupTabStops(this._currentScope, this._currentName);
    }
    if (changed.has('name')) {
      this._unregister();
      this._register();
    }
    if (changed.has('value') && this.checked && !changed.has('checked')) {
      this._internals.setFormValue(this.value);
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
      return;
    }

    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault();
      this._focusSibling(1);
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault();
      this._focusSibling(-1);
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
          tabindex=${this._tabStop ? 0 : -1}
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
    'govtw-radio': GovtwRadio;
  }
}
