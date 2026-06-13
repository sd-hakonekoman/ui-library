import { createButton } from './Button';

/*
 * meta は、この story ファイル全体の設定です。
 * title は Storybook のサイドバーに表示される階層名、tags は Docs 自動生成などに使います。
 */
const meta = {
  title: 'Components/Button',
  tags: ['autodocs'],

  /*
   * render は args を受け取り、Storybook の Canvas に表示する DOM を返す関数です。
   * createButton に args を渡すことで、Controls で変更した値が表示に反映されます。
   */
  render: (args) => createButton(args),

  /*
   * argTypes は Controls パネルで各 props をどう編集できるかの設定です。
   * select を使うと、variant や size をドロップダウンから選べるようになります。
   */
  argTypes: {
    label: {
      control: 'text',
      description: 'ボタンに表示するテキストです。',
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary'],
      description: 'ボタンの見た目の種類です。',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'ボタンのサイズです。',
    },
    disabled: {
      control: 'boolean',
      description: 'クリックできない状態にするかどうかです。',
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
      description: 'button 要素の type 属性です。',
    },
    onClick: {
      action: 'clicked',
      description: 'クリックされたときに Storybook の Actions パネルへ記録します。',
    },
  },
};

export default meta;

/*
 * args は story ごとの初期値です。
 * Controls パネルから変更できるため、同じ story で状態を試しやすくなります。
 */
export const Primary = {
  args: {
    label: 'Primary Button',
    variant: 'primary',
    size: 'medium',
    disabled: false,
    type: 'button',
  },
};

export const Secondary = {
  args: {
    label: 'Secondary Button',
    variant: 'secondary',
    size: 'medium',
    disabled: false,
    type: 'button',
  },
};

export const Disabled = {
  args: {
    label: 'Disabled Button',
    variant: 'primary',
    size: 'medium',
    disabled: true,
    type: 'button',
  },
};

export const Sizes = {
  render: (args) => {
    const wrapper = document.createElement('div');
    wrapper.style.display = 'flex';
    wrapper.style.alignItems = 'center';
    wrapper.style.gap = '12px';

    for (const size of ['small', 'medium', 'large']) {
      wrapper.append(
        createButton({
          ...args,
          label: `${size.charAt(0).toUpperCase()}${size.slice(1)}`,
          size,
        }),
      );
    }

    return wrapper;
  },
  args: {
    variant: 'primary',
    disabled: false,
    type: 'button',
  },
};
