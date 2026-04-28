import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

type ClusterAlign = 'start' | 'center' | 'end' | 'space-between';
type ClusterVerticalAlign = 'start' | 'center' | 'end' | 'baseline';

const JUSTIFY: Record<ClusterAlign, string> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  'space-between': 'space-between',
};

const VERTICAL_ALIGN: Record<ClusterVerticalAlign, string> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  baseline: 'baseline',
};

/**
 * govtw-cluster — 水平流式佈局
 *
 * 將子元素水平排列，空間不足時自動換行。
 * 適用於按鈕群、標籤列、麵包屑等水平排列的元素。
 *
 * @example
 * <govtw-cluster space="3">
 *   <govtw-button>送出</govtw-button>
 *   <govtw-button variant="secondary">取消</govtw-button>
 * </govtw-cluster>
 */
@customElement('govtw-cluster')
export class GovtwCluster extends LitElement {
  /** 子元素之間的間距，對應 --govtw-space-{n} token */
  @property({ type: Number }) space = 3;

  /** 水平對齊方式 */
  @property({ type: String }) align: ClusterAlign = 'start';

  /** 垂直對齊方式 */
  @property({ type: String, attribute: 'vertical-align' }) verticalAlign: ClusterVerticalAlign = 'center';

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
    return html`
      <div
        class="cluster"
        style=${styleMap({
          '--_cluster-space': `var(--govtw-space-${this.space})`,
          '--_justify': JUSTIFY[this.align],
          '--_align': VERTICAL_ALIGN[this.verticalAlign],
        })}
      >
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'govtw-cluster': GovtwCluster;
  }
}
