import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('govtw-button')
export class GovButton extends LitElement {
  static shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  @property({ type: String, reflect: true }) variant: 'primary' | 'secondary' | 'danger' = 'primary';
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: String, reflect: true }) size: 'sm' | 'md' | 'lg' = 'md';
  @property({ type: String }) type: 'button' | 'submit' | 'reset' = 'button';
  @property({ type: String }) href = '';
  @property({ type: String }) target = '';
  @property({ type: String }) rel = '';

  static styles = css`
    :host {
      display: inline-block;
      outline: none !important;
    }

    /*
     * GOV.UK-inspired button technique:
     * - inset box-shadow 底部深色，營造立體感
     * - hover 時背景加深，提供明暗回饋
     * - active 時 inset shadow 消失，模擬按壓
     * - focus 使用黃色外框 ring，貼合圓角
     * - transparent border 確保 Windows 高對比模式下邊界可見
     * - 有 href 時渲染 <a role="button">，無 href 時渲染 <button>
     */

    button,
    a {
      font-family: var(--govtw-button-font-family);
      font-weight: var(--govtw-button-font-weight);
      border: 2px solid transparent;
      border-radius: var(--govtw-button-border-radius);
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: var(--govtw-spacing-2);
      line-height: 1.5;
      box-shadow: inset 0 -3px 0 var(--_shadow-color);
      text-decoration: none;
      -webkit-appearance: none;
    }

    /* Sizes — default (md) */
    button,
    a {
      font-size: var(--govtw-font-size-base);
      padding: var(--govtw-spacing-2) var(--govtw-spacing-4);
    }

    :host([size="sm"]) :is(button, a) {
      font-size: var(--govtw-font-size-sm);
      padding: var(--govtw-spacing-1) var(--govtw-spacing-3);
    }

    :host([size="lg"]) :is(button, a) {
      font-size: var(--govtw-font-size-lg);
      padding: var(--govtw-spacing-3) var(--govtw-spacing-6);
    }

    /* ===== Primary ===== */
    :host([variant="primary"]) :is(button, a) {
      --_bg: var(--govtw-button-primary-bg);
      --_shadow-color: color-mix(in srgb, var(--_bg) 60%, black);
      background: var(--_bg);
      color: var(--govtw-button-primary-color);
    }
    :host([variant="primary"]) :is(button, a):hover:not(:disabled):not([aria-disabled="true"]) {
      background: color-mix(in srgb, var(--_bg) 85%, black);
    }
    :host([variant="primary"]) :is(button, a):active:not(:disabled):not([aria-disabled="true"]) {
      background: color-mix(in srgb, var(--_bg) 65%, black);
    }

    /* ===== Secondary ===== */
    :host([variant="secondary"]) :is(button, a) {
      --_bg: var(--govtw-button-secondary-bg);
      --_shadow-color: color-mix(in srgb, var(--_bg) 40%, black);
      background: var(--_bg);
      color: var(--govtw-button-secondary-color);
      border-color: var(--govtw-button-secondary-border-color);
    }
    :host([variant="secondary"]) :is(button, a):hover:not(:disabled):not([aria-disabled="true"]) {
      background: color-mix(in srgb, var(--_bg) 80%, black);
    }
    :host([variant="secondary"]) :is(button, a):active:not(:disabled):not([aria-disabled="true"]) {
      background: color-mix(in srgb, var(--_bg) 65%, black);
    }

    /* ===== Danger ===== */
    :host([variant="danger"]) :is(button, a) {
      --_bg: var(--govtw-button-danger-bg);
      --_shadow-color: color-mix(in srgb, var(--_bg) 60%, black);
      background: var(--_bg);
      color: var(--govtw-button-danger-color);
    }
    :host([variant="danger"]) :is(button, a):hover:not(:disabled):not([aria-disabled="true"]) {
      background: color-mix(in srgb, var(--_bg) 85%, black);
    }
    :host([variant="danger"]) :is(button, a):active:not(:disabled):not([aria-disabled="true"]) {
      background: color-mix(in srgb, var(--_bg) 65%, black);
    }

    /* ===== Active / Pressed ===== */
    :is(button, a):active:not(:disabled):not([aria-disabled="true"]) {
      box-shadow: none;
    }

    /* ===== Focus — 黃色 focus ring，貼合圓角 ===== */
    :is(button, a):focus-visible {
      outline: none;
      box-shadow:
        inset 0 -3px 0 var(--_shadow-color),
        0 0 0 var(--govtw-button-focus-width) var(--govtw-button-focus-color);
    }

    :host(:focus-within) {
      outline: none;
    }

    /* ===== Disabled — <button> ===== */
    button:disabled {
      opacity: var(--govtw-button-disabled-opacity);
      cursor: not-allowed;
    }
    button:disabled:active {
      box-shadow: inset 0 -3px 0 var(--_shadow-color);
    }

    /* ===== Disabled — <a> (aria-disabled) ===== */
    a[aria-disabled="true"] {
      opacity: var(--govtw-button-disabled-opacity);
      cursor: not-allowed;
      pointer-events: none;
    }
  `;

  private _handleLinkKeydown(e: KeyboardEvent) {
    if (e.key === ' ') {
      e.preventDefault();
      (e.currentTarget as HTMLElement).click();
    }
  }

  render() {
    if (this.href) {
      // target="_blank" 時自動補上 rel="noopener noreferrer" 防止反向 tabnabbing
      const autoRel = this.target === '_blank' && !this.rel
        ? 'noopener noreferrer'
        : this.rel;

      return html`
        <a
          href=${this.disabled ? nothing : this.href}
          target=${this.target || nothing}
          rel=${autoRel || nothing}
          role="button"
          aria-disabled=${this.disabled ? 'true' : 'false'}
          tabindex=${this.disabled ? -1 : 0}
          @keydown=${this._handleLinkKeydown}
        ><slot></slot></a>
      `;
    }

    return html`
      <button
        type=${this.type}
        ?disabled=${this.disabled}
        aria-disabled=${this.disabled ? 'true' : 'false'}
      >
        <slot></slot>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'govtw-button': GovButton;
  }
}
