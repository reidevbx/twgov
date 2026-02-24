import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * twgov-sidebar — 側邊欄佈局
 *
 * 主內容 + 側邊欄，當容器寬度不足時自動堆疊為單欄。
 * 使用 CSS flexbox wrap 實現，不需要 media query。
 *
 * 第一個子元素為主內容，第二個為側邊欄。
 * 透過 side 屬性可切換側邊欄在左或右。
 *
 * @example
 * <twgov-sidebar side-width="300px">
 *   <div>主要內容</div>
 *   <div>側邊欄</div>
 * </twgov-sidebar>
 */
@customElement('twgov-sidebar')
export class GovSidebar extends LitElement {
  /** 側邊欄寬度（CSS 長度值） */
  @property({ type: String, attribute: 'side-width' }) sideWidth = '16rem';

  /** 主內容最小寬度百分比，低於此值時堆疊（0-100） */
  @property({ type: String, attribute: 'content-min' }) contentMin = '60';

  /** 間距，對應 --twgov-space-{n} token */
  @property({ type: String }) space = '6';

  /** 側邊欄位置 */
  @property({ type: String }) side: 'right' | 'left' = 'right';

  static styles = css`
    :host {
      display: block;
    }

    .sidebar {
      display: flex;
      flex-wrap: wrap;
      gap: var(--_sidebar-space);
    }

    /* 主內容：flex-grow 撐滿，flex-basis 0 讓 min-width 生效 */
    .sidebar > ::slotted(:first-child) {
      flex-grow: 999;
      flex-basis: 0;
      min-inline-size: var(--_content-min);
    }

    .sidebar > ::slotted(:last-child) {
      flex-grow: 1;
      flex-basis: var(--_side-width);
    }

    /* side=left 時反轉順序 */
    :host([side="left"]) .sidebar > ::slotted(:first-child) {
      flex-grow: 1;
      flex-basis: var(--_side-width);
      min-inline-size: auto;
    }

    :host([side="left"]) .sidebar > ::slotted(:last-child) {
      flex-grow: 999;
      flex-basis: 0;
      min-inline-size: var(--_content-min);
    }
  `;

  render() {
    return html`
      <div
        class="sidebar"
        style="
          --_sidebar-space: var(--twgov-space-${this.space}, ${Number(this.space) * 4}px);
          --_side-width: ${this.sideWidth};
          --_content-min: ${this.contentMin}%;
        "
      >
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'twgov-sidebar': GovSidebar;
  }
}
