# Garant.kg — Платформа безопасных сделок

**Garant.kg** — маркетплейс безопасных сделок для Кыргызстана. Площадка, где заказчик и исполнитель находят друг друга, фиксируют условия сделки, резервируют деньги, выполняют работу и завершают сделку с гарантией для обеих сторон.

## 🎯 Ключевые возможности

- **Маркетплейс**: Поиск заказов и предложений услуг с фильтрами и категориями
- **Безопасные сделки**: Фиксация условий, этапы выполнения, подтверждение результата
- **Escrow**: Резервирование средств до завершения работы
- **Споры**: Арбитраж через модераторов с доказательствами
- **Репутация**: Реальные отзывы только по завершённым сделкам
- **Сообщения**: Защищённый чат по каждой сделке

## 🏗️ Архитектура

- **Backend**: Django 5 + Django REST Framework (API-first)
- **Frontend**: React 18 + TypeScript + Vite
- **База данных**: PostgreSQL 16
- **Кэш/Очереди**: Redis + Celery
- **Инфраструктура**: Docker + Nginx

## 📁 Структура проекта

```
/backend        # Django + DRF API
/frontend       # React + TypeScript SPA
/deploy         # Docker Compose для production
/docs           # Документация и решения
```

## 🚀 Быстрый старт (разработка)

> **📖 Полная инструкция**: См. [QUICKSTART.md](QUICKSTART.md) для детального руководства

### Требования

- Docker Desktop ([инструкция установки](docs/DOCKER_SETUP.md))
- Git

### Запуск за 3 команды

```bash
# 1. Запустить все сервисы
docker-compose up -d

# 2. Применить миграции (подождите 30 сек после запуска)
docker-compose exec backend python manage.py migrate

# 3. Создать суперпользователя
docker-compose exec backend python manage.py createsuperuser
```

### Проверка

Откройте в браузере:
- **Frontend**: http://localhost:3000
- **API Docs**: http://localhost:8000/api/docs/
- **Admin**: http://localhost:8000/admin/

Используйте [CHECKLIST.md](CHECKLIST.md) для проверки всех компонентов.

## 📚 Документация

### 🚀 Для начала работы
- **[QUICKSTART.md](QUICKSTART.md)** — запуск проекта за 3 минуты
- **[CHECKLIST.md](CHECKLIST.md)** — чек-лист проверки после запуска
- **[STATUS.md](STATUS.md)** — текущий статус проекта

### 🔧 Для разработчиков
- **[docs/DECISIONS.md](docs/DECISIONS.md)** — архитектурные решения и обоснования
- **[docs/PROGRESS.md](docs/PROGRESS.md)** — план развития и прогресс
- **[docs/STAGE_0_COMPLETE.md](docs/STAGE_0_COMPLETE.md)** — детали Этапа 0

### 🐳 Инфраструктура
- **[docs/DOCKER_SETUP.md](docs/DOCKER_SETUP.md)** — установка Docker Desktop
- **[docs/DEPLOY.md](docs/DEPLOY.md)** — развёртывание на сервере (будет в Этапе 10)

### 📖 API
- **Swagger UI**: http://localhost:8000/api/docs/ (после запуска)
- **ReDoc**: http://localhost:8000/api/redoc/ (после запуска)
- **OpenAPI Schema**: http://localhost:8000/api/schema/ (после запуска)

## 🔐 Безопасность

- HTTPS-only в production
- JWT аутентификация (SimpleJWT)
- Argon2 для паролей
- Rate limiting
- CORS и CSP защита
- Audit logging

## 🧪 Тестирование

```bash
# Backend тесты
docker-compose exec backend pytest

# Frontend тесты
cd frontend
npm test

# E2E тесты
npm run test:e2e
```

## 📝 Лицензия

Proprietary — все права защищены.

## 🤝 Контакты

По вопросам сотрудничества: [контактная информация]
