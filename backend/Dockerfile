# Базовый образ
FROM python:3.12-slim

# Метаданные
LABEL maintainer="Garant.kg"
LABEL description="Garant.kg Backend API"

# Переменные окружения
ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PIP_NO_CACHE_DIR=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1

# Рабочая директория
WORKDIR /app

# Установка системных зависимостей
RUN apt-get update && apt-get install -y --no-install-recommends \
    postgresql-client \
    gcc \
    python3-dev \
    musl-dev \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Копирование зависимостей
COPY requirements.txt .

# Установка Python зависимостей
RUN pip install --upgrade pip && \
    pip install -r requirements.txt

# Копирование проекта
COPY . .

# Создание директорий для медиа и статики
RUN mkdir -p /app/media /app/staticfiles

# Порт приложения
EXPOSE 8000

# Healthcheck
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD python -c "import urllib.request; urllib.request.urlopen('http://localhost:8000/api/v1/health/')"

# Команда по умолчанию (для development)
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
