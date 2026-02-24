import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * twgov-cluster — 水平流式佈局
 *
 * 將子元素水平排列，空間不足時自動換行。
 * 適用於按鈕群、標籤列、麵包屑等水平排列的元素。
 *
 * @example
 * <twgov-cluster space="3">
 *   <twgov-button>送出</twgov-button>
 *   <twgov-button variant="secondary">取消</twgov-button>
 * </twgov-cluster>
 */
@customElement('twgov-cluster')
export class GovCluster extends LitElement {
  /** 子元素之間的間距，對應 --twgov-space-{n} token */
  @property({ type: String }) space = '3';

  /** 水平對齊方式 */
  @property({ type: String }) align: 'start' | 'center' | 'end' | 'space-between' = 'start';

  /** 垂直對齊方式 */
  @property({ type: String, attribute: 'vertical-align' }) verticalAlign: 'start' | 'center' | 'end' | 'baseline' = 'center';

  static styles = css`
    :host {
      display: block;
    }

    .cluster {
      display: flex;
      flex-wrap: wrap;
      gap: var(--_cluster-space);
      justify-content: var(--_justify);
      align-items: var(--_align);
    }
  `;

  render() {
    const justifyMap: Record<string, string> = {
      'start': 'flex-start',
      'center': 'center',
      'end': 'flex-end',
      'space-between': 'space-between',
    };
    const alignMap: Record<string, string> = {
      'start': 'flex-start',
      'center': 'center',
      'end': 'flex-end',
      'baseline': 'baseline',
    };

    return html`
      <div
        class="cluster"
        style="
          --_cluster-space: var(--twgov-space-${this.space}, ${Number(this.space) * 4}px);
          --_justify: ${justifyMap[this.align] || 'flex-start'};
          --_align: ${alignMap[this.verticalAlign] || 'center'};
        "
      >
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'twgov-cluster': GovCluster;
  }
}
