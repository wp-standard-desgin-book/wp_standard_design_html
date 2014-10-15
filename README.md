WordPress 標準デザイン講座 サンプルサイト

## 1. インストール

作業ディレクトリをどこでもいいので作成し、
その中に移動し git clone してください。

	git clone https://github.com/wp-standard-desgin-book/wp_standard_design_html.git

または、[zipファイル](https://github.com/wp-standard-desgin-book/wp_standard_design_html/archive/master.zip)をダウンロードし、
作業ディレクトリの中に展開してください。

## 2. 必要なモジュールのインストール

このプロジェクトを開発するためには、Grunt をインストールする必要があります。
以下のコマンドを入力してください。

	npm install -g grunt-cli

次に、package.json に定義してある npm パッケージをインストールする必要があります。
作業ディレクトリのルートで以下のコマンドを入力し、Enter キーを押して下さい。

	npm install

## 3. Grunt の実行

Grunt を使用することで、ローカルサーバーの立ち上げ、自動リロード、Sass・JavaScript
のコンパイル、自動整形を行うことができます。

#### サーバーの立ち上げ

	grunt serve

#### ビルド

	grunt build

#### スタイルガイドの構築

	grunt styleguide

#### 構築後 HTML の自動整形

	grunt htmlprettify
