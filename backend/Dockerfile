# ベースイメージ
FROM python:3.11-bullseye

ENV PYTHONUNBUFFERED 1

# 作業ディレクトリの設定
WORKDIR /backend

# 依存関係ファイルのコピー
COPY ./backend/pyproject.toml .
COPY ./backend/poetry.lock .

# 必要なパッケージをインストール
ENV POETRY_HOME=/etc/poetry
ENV PATH=${POETRY_HOME}/bin:${PATH}

RUN curl -sSL https://install.python-poetry.org | python3 - \
# RUN pip install --upgrade pip \
#     && pip install pipx \
#     && pipx install poetry \
#     && export PATH="$PATH:/root/.local/bin" \
    && poetry install --no-root

# アプリケーションのソースコードをコピー
COPY . .

# 開発サーバーを起動
# CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]