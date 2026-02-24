import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * twgov-stack — 垂直堆疊佈局
 *
 * 將子元素以垂直方向堆疊，控制間距。
 * 是最基本的佈局原語，適用於頁面區塊、表單、卡片內容等。
 *
 * @example
 * <gov-stack space="6">
 *   <h1>標題</h1>
 *   <p>內文</p>
 * </gov-stack>
 */
@customElement('gov-stack')
export class GovStack extends LitElement {
  /** 子元素之間的間距，對應 --twgov-space-{n} token（預設 4 = 16px） */
  @property({ type: String }) space = '4';

  static styles = css`
    :host {
      display: block;
    }

    .stack {
      display: flex;
      flex-direction: column;
      gap: var(--_stack-space);
    }
  `;

  render() {
    return html`
      <div class="stack" style="--_stack-space: var(--twgov-space-${this.space}, ${Number(this.space) * 4}px)">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gov-stack': GovStack;
  }
}
