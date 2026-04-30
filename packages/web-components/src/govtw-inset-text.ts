import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

/**
 * govtw-inset-text — 補充說明
 *
 * 參考 GOV.UK Inset Text：https://design-system.service.gov.uk/components/inset-text/
 *
 * 用於與周圍內文做視覺區隔，呈現補充資訊、引述、範例。
 * 不是警告或重要訊息（那些用 Warning Text）。
 *
 * 純展示元件：無屬性、無事件，內容透過 default slot 傳入。
 *
 * @example
 * <govtw-inset-text>
 *   <p>申辦時請攜帶身分證正本。</p>
 * </govtw-inset-text>
 */
@customElement('govtw-inset-text')
export class GovtwInsetText extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: var(--govtw-inset-text-padding);
      margin: var(--govtw-inset-text-margin-y) 0;
      border-left: var(--govtw-inset-text-border-width) solid var(--govtw-inset-text-border-color);
    }

    /* 內容首尾的 margin 由 inset-text 的 padding 控制，避免雙倍空隙 */
    ::slotted(:first-child) {
      margin-top: 0;
    }
    ::slotted(:last-child) {
      margin-bottom: 0;
    }
  `;

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'govtw-inset-text': GovtwInsetText;
  }
}
