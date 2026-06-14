/** @type { import('@storybook/html-vite').StorybookConfig } */
const config = {
  /*
   * Storybook に読み込ませる story ファイルの場所です。
   * 今回は src 配下の *.stories.js をすべて対象にします。
   */
  stories: ['../src/**/*.stories.js'],

  /*
   * addons は Storybook の機能拡張です。
   * addon-docs は tags: ['autodocs'] が付いた story から Docs ページを生成します。
   * コンポーネントの使い方や args の一覧を Storybook 上で確認できるようにします。
   */
  addons: ['@storybook/addon-docs'],

  /*
   * HTML/CSS/JavaScript だけでコンポーネントを扱うための framework 設定です。
   * Vite を使うことで、開発サーバーの起動や更新反映が速くなります。
   */
  framework: {
    name: '@storybook/html-vite',
    options: {},
  },

  /*
   * Storybook の自動ドキュメント生成を有効にします。
   * stories に書いた args や説明をもとに Docs ページを作れます。
   */
  docs: {
    autodocs: 'tag',
  },
};

export default config;
