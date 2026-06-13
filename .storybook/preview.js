/*
 * ここで import した CSS は、すべての story に共通で読み込まれます。
 * デザインシステム全体の土台になるトークンやグローバルスタイルをまとめて適用します。
 */
import '../src/styles/global.css';

/** @type { import('@storybook/html-vite').Preview } */
const preview = {
  parameters: {
    /*
     * layout は Storybook の Canvas 上でコンポーネントをどう配置するかの設定です。
     * centered にすると、単体コンポーネントの見た目を中央で確認しやすくなります。
     */
    layout: 'centered',

    /*
     * controls は Storybook の Controls パネルの表示設定です。
     * matchers を設定すると、色や日付のような値を Storybook が自動で判別しやすくなります。
     */
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
