import './Button.css';

const allowedVariants = ['primary', 'secondary'];
const allowedSizes = ['small', 'medium', 'large'];

/**
 * Button コンポーネントを DOM 要素として作成します。
 * Storybook だけでなく、通常の JavaScript からも同じ関数を使える形にしています。
 *
 * @param {object} options
 * @param {string} options.label ボタンに表示するテキストです。
 * @param {'primary' | 'secondary'} options.variant 見た目の種類です。
 * @param {'small' | 'medium' | 'large'} options.size サイズです。
 * @param {boolean} options.disabled disabled 属性を付けるかどうかです。
 * @param {'button' | 'submit' | 'reset'} options.type button 要素の type 属性です。
 * @param {(event: MouseEvent) => void} [options.onClick] クリック時に呼び出す関数です。
 * @returns {HTMLButtonElement}
 */
export function createButton({
  label = 'Button',
  variant = 'primary',
  size = 'medium',
  disabled = false,
  type = 'button',
  onClick,
} = {}) {
  const button = document.createElement('button');
  const normalizedVariant = allowedVariants.includes(variant) ? variant : 'primary';
  const normalizedSize = allowedSizes.includes(size) ? size : 'medium';

  button.className = [
    'ui-button',
    `ui-button--${normalizedVariant}`,
    `ui-button--${normalizedSize}`,
  ].join(' ');
  button.disabled = disabled;
  button.textContent = label;
  button.type = type;

  if (typeof onClick === 'function') {
    button.addEventListener('click', onClick);
  }

  return button;
}
