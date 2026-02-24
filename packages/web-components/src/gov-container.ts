import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * gov-container — 頁面容器
 *
 * 限制內容最大寬度並水平置中，兩側留白。
 * 是頁面最外層的佈局原語。
 *
 * @example
 * <gov-container>
 *   <gov-stack>
 *     <h1>頁面標題</h1>
 *     <p>內容</p>
 *   </gov-stack>
 * </gov-container>
 */
@customElement('twgov-container')
export class GovContainer extends LitElement {
  /** 最大寬度（CSS 長度值） */
  @property({ type: String, attribute: 'max-width' }) maxWidth = '1020px';

  /** 兩側內距，對應 --twgov-space-{n} token */
  @property({ type: String }) padding = '4';

  static styles = css`
    :host {
      display: block;
    }

    .container {
      max-inline-size: var(--_max-width);
      margin-inline: auto;
      padding-inline: var(--_padding);
    }
  `;

  render() {
    return html`
      <div
        class="container"
        style="
          --_max-width: ${this.maxWidth};
          --_padding: var(--twgov-space-${this.padding}, ${Number(this.padding) * 4}px);
        "
      >
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'twgov-container': GovContainer;
  }
}
