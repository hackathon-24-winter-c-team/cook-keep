FROM python:3.11-bullseye

ENV PYTHONUNBUFFERED 1

WORKDIR /django_app

COPY ./pyproject.toml .
COPY ./poetry.lock .

RUN pip install --upgrade pip && pip install pipx && pipx install poetry && export PATH=$PATH:/root/.local/bin && poetry install --no-root