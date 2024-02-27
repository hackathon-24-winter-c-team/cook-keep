# ベースイメージ
FROM node:20-bullseye

# 作業ディレクトリの設定
WORKDIR /React

# 依存関係ファイルのコピー
COPY ./front/React/package.json /React/
COPY ./front/React/package-lock.json /React/

# 依存関係のインストール
RUN npm install npm@latest && npm install

# アプリケーションのコピー
COPY ./front/React /React/

# 開発サーバーを起動
# CMD ["npm", "run", "dev"]