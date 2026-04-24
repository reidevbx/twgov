/**
 * 禁止 Component CSS 使用 var(--govtw-*, fallback) fallback。
 *
 * 理由：CLAUDE.md 的 Token 架構政策要求元件 CSS 只引用 Component-level token，
 * 且不加 fallback。Fallback 會讓「缺 token」這件事視覺上看不見，反而難以除錯；
 * 拿掉 fallback 能在缺變數時立即看到視覺壞掉，強迫補上正確的 token。
 *
 * 只檢查 css`` 標籤模板裡的字面內容；html`` 裡的 inline style 與其他 JS 字串不檢查。
 * 使用 balanced-paren 掃描以正確處理 nested var()，例如
 *   var(--govtw-a, var(--govtw-b, red))
 * 中內外層都會被標記。
 */

const VAR_PREFIX = 'var(--govtw-';

/** 從 text 掃出所有「有 fallback 的 --govtw-* var()」，回傳 {start, end, expr} 陣列。 */
function findFallbackViolations(text) {
  const violations = [];
  let i = 0;

  while (i < text.length) {
    const start = text.indexOf(VAR_PREFIX, i);
    if (start === -1) break;

    let depth = 1;
    let pos = start + 4; // skip "var("
    let hasFallback = false;

    while (pos < text.length && depth > 0) {
      const ch = text[pos];
      if (ch === '(') depth++;
      else if (ch === ')') depth--;
      else if (ch === ',' && depth === 1) hasFallback = true;
      pos++;
    }

    if (hasFallback && depth === 0) {
      violations.push({ start, end: pos, expr: text.slice(start, pos) });
    }

    // 移到 var( 之後而非 close ) 之後，這樣 nested var() 也會被獨立處理。
    i = start + 4;
  }

  return violations;
}

export default {
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow var() fallbacks on gov.tw tokens in component CSS',
    },
    messages: {
      noFallback:
        '「{{expr}}」在 Component CSS 不可有 fallback。讓缺 token 時視覺上立刻壞掉才容易發現。',
    },
    schema: [],
  },
  create(context) {
    return {
      TaggedTemplateExpression(node) {
        const tag = node.tag;
        if (tag.type !== 'Identifier' || tag.name !== 'css') return;

        for (const quasi of node.quasi.quasis) {
          const text = quasi.value.cooked;
          if (!text) continue;
          for (const v of findFallbackViolations(text)) {
            const expr = v.expr.length > 60 ? v.expr.slice(0, 57) + '...' : v.expr;
            context.report({
              node: quasi,
              messageId: 'noFallback',
              data: { expr },
            });
          }
        }
      },
    };
  },
};
