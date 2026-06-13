# UI Library

Storybook を使って育てる、HTML/CSS/JavaScript ベースのデザインシステムです。

## 前提

- Node.js 24 系
- npm 11 系
- Storybook 10 系

## セットアップ

```bash
npm install
```

## Storybook を確認する

```bash
npm run storybook
```

このリポジトリでは、Storybook を静的ビルドしてからローカル配信します。
この環境の Node.js 24 では Storybook の通常 dev server のポート検出が失敗したため、確実に表示確認できる方式にしています。

デフォルトでは `http://127.0.0.1:6006` で起動します。
別ポートで起動したい場合は次のように指定します。

```bash
PORT=6013 npm run storybook
```

## 静的ビルド

```bash
npm run build-storybook
```

ビルド成果物は `storybook-static/` に出力されます。
このディレクトリは再生成できるため Git 管理対象外です。

## ディレクトリ構成

```text
.storybook/
  main.js       Storybook が story を探す場所や framework を設定します。
  preview.js    すべての story に共通する表示設定と CSS を読み込みます。
src/
  styles/
    tokens.css  色、余白、角丸などのデザイントークンを定義します。
    global.css  Storybook preview 内の基本スタイルを定義します。
  components/
    Button/
      Button.js
      Button.css
      Button.stories.js
```

## コンポーネントの追加方針

コンポーネントは Vanilla JavaScript module と CSS で作成します。
新しいコンポーネントを追加するときは、`src/components/ComponentName/` 配下に以下を用意します。

- `ComponentName.js`: DOM 要素を作る関数を export します。
- `ComponentName.css`: コンポーネント固有のスタイルを定義します。
- `ComponentName.stories.js`: Storybook で表示する状態を定義します。

## セキュリティ

Storybook 10 系が依存する `esbuild` について npm audit の advisory が出るため、`package.json` の `overrides` で `esbuild@0.28.1` を明示しています。
production dependency はありませんが、確認時は以下を実行してください。

```bash
npm audit --omit=dev
npm audit --audit-level=moderate
```
