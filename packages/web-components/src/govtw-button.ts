import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('twgov-button')
export class GovButton extends LitElement {
  static shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  @property({ type: String, reflect: true }) variant: 'primary' | 'secondary' | 'danger' = 'primary';
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: String }) size: 'sm' | 'md' | 'lg' = 'md';

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
     */

    button {
      font-family: var(--twgov-font-sans, system-ui, sans-serif);
      font-weight: 500;
      border: 2px solid transparent;
      border-radius: var(--twgov-radius-md, 8px);
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: var(--twgov-spacing-2, 8px);
      line-height: 1.5;
      box-shadow: inset 0 -3px 0 var(--_shadow-color);
      text-decoration: none;
      -webkit-appearance: none;
    }

    /* Sizes */
    :host([size="sm"]) button {
      font-size: var(--twgov-font-size-sm, 0.875rem);
      padding: var(--twgov-spacing-1, 4px) var(--twgov-spacing-3, 12px);
    }

    button {
      font-size: var(--twgov-font-size-base, 1rem);
      padding: var(--twgov-spacing-2, 8px) var(--twgov-spacing-4, 16px);
    }

    :host([size="lg"]) button {
      font-size: var(--twgov-font-size-lg, 1.125rem);
      padding: var(--twgov-spacing-3, 12px) var(--twgov-spacing-6, 24px);
    }

    /* ===== Primary ===== */
    :host([variant="primary"]) button {
      --_bg: var(--twgov-color-brand-primary, #2C84B2);
      --_shadow-color: color-mix(in srgb, var(--_bg) 60%, black);
      background: var(--_bg);
      color: var(--twgov-color-text-on-primary, #FFFFFF);
    }
    :host([variant="primary"]) button:hover:not(:disabled) {
      background: color-mix(in srgb, var(--_bg) 85%, black);
    }
    :host([variant="primary"]) button:active:not(:disabled) {
      background: color-mix(in srgb, var(--_bg) 65%, black);
    }

    /* ===== Secondary ===== */
    :host([variant="secondary"]) button {
      --_bg: var(--twgov-color-bg-surface, #EAF0F0);
      --_shadow-color: color-mix(in srgb, var(--_bg) 40%, black);
      background: var(--_bg);
      color: var(--twgov-color-text-primary, #1A1A1A);
      border-color: var(--twgov-color-border-default, #B0C4C5);
    }
    :host([variant="secondary"]) button:hover:not(:disabled) {
      background: color-mix(in srgb, var(--_bg) 80%, black);
    }
    :host([variant="secondary"]) button:active:not(:disabled) {
      background: color-mix(in srgb, var(--_bg) 65%, black);
    }

    /* ===== Danger ===== */
    :host([variant="danger"]) button {
      --_bg: var(--twgov-color-feedback-error, #C3362B);
      --_shadow-color: color-mix(in srgb, var(--_bg) 60%, black);
      background: var(--_bg);
      color: var(--twgov-color-text-on-primary, #FFFFFF);
    }
    :host([variant="danger"]) button:hover:not(:disabled) {
      background: color-mix(in srgb, var(--_bg) 85%, black);
    }
    :host([variant="danger"]) button:active:not(:disabled) {
      background: color-mix(in srgb, var(--_bg) 65%, black);
    }

    /* ===== Active / Pressed ===== */
    button:active:not(:disabled) {
      box-shadow: none;
    }

    /* ===== Focus — 黃色 focus ring，貼合圓角 ===== */
    button:focus-visible {
      outline: none;
      box-shadow:
        inset 0 -3px 0 var(--_shadow-color),
        0 0 0 3px #fd0;
    }

    :host(:focus-within) {
      outline: none;
    }

    /* ===== Disabled ===== */
    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    button:disabled:active {
      box-shadow: inset 0 -3px 0 var(--_shadow-color);
    }
  `;

  render() {
    return html`
      <button
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
    'twgov-button': GovButton;
  }
}
