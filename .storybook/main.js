/** @type { import('@storybook/html-vite').StorybookConfig } */
const config = {
  /*
   * Storybook に読み込ませる story ファイルの場所です。
   * 今回は src 配下の *.stories.js をすべて対象にします。
   */
  stories: ['../src/**/*.stories.js'],

  /*
   * addons は Storybook の機能拡張です。
   * Storybook 10 の HTML/Vite 構成では、まず addon なしで最小構成にしています。
   * Docs や Controls などを追加で拡張したくなったら、Storybook 10 対応の addon をここに足します。
   */
  addons: [],

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
