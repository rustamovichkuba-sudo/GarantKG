# 🚀 Быстрый старт Garant.kg

## 📋 Что уже готово (Этап 0)

✅ **Backend API (Django + DRF)**
- Полная настройка Django с PostgreSQL, Redis, Celery
- JWT аутентификация
- OpenAPI документация (Swagger)
- Health check endpoint
- Кастомная модель пользователя
- 13 Django-приложений (структуры)

✅ **Frontend (React + TypeScript)**
- Vite + React 18
- TanStack Query
- Tailwind CSS
- Базовая структура

✅ **Инфраструктура**
- Docker Compose для development
- Pre-commit hooks
- Pytest конфигурация
- Документация

## 🎯 Быстрый запуск (3 минуты)

### Требования
- Docker Desktop ([инструкция установки](docs/DOCKER_SETUP.md))
- Git

### Команды

```bash
# 1. Перейти в проект
cd c:\Users\User\OneDrive\Desktop\Garantkg

# 2. Запустить все сервисы
docker-compose up -d

# 3. Применить миграции (подождите 30 сек после запуска)
docker-compose exec backend python manage.py migrate

# 4. Создать админа
docker-compose exec backend python manage.py createsuperuser
# Телефон: +996700000000
# Имя: Admin
# Пароль: admin123

# 5. Открыть в браузере
# Frontend:    http://localhost:3000
# API Docs:    http://localhost:8000/api/docs/
# Admin:       http://localhost:8000/admin/
```

## 📚 Полезные ссылки

- **[Полная инструкция Этапа 0](docs/STAGE_0_COMPLETE.md)** — детальное описание
- **[Установка Docker](docs/DOCKER_SETUP.md)** — если Docker не установлен
- **[Архитектурные решения](docs/DECISIONS.md)** — почему и как
- **[Прогресс разработки](docs/PROGRESS.md)** — что сделано, что дальше

## 🔧 Полезные команды

```bash
# Логи
docker-compose logs -f backend
docker-compose logs -f celery

# Перезапуск
docker-compose restart backend

# Остановка
docker-compose down

# Тесты (когда будут реализованы)
docker-compose exec backend pytest

# Django shell
docker-compose exec backend python manage.py shell

# Создать новое Django-приложение
docker-compose exec backend python manage.py startapp appname
```

## 🐛 Проблемы?

### Backend не запускается
```bash
# Проверить логи
docker-compose logs backend

# Пересоздать контейнер
docker-compose up -d --force-recreate backend
```

### База данных не доступна
```bash
# Проверить статус
docker-compose ps

# Проверить здоровье БД
docker-compose exec db pg_isready
```

### Frontend не загружается
```bash
# Переустановить зависимости
docker-compose exec frontend npm install

# Перезапустить
docker-compose restart frontend
```

## 📖 Что дальше?

**Следующий этап: Аутентификация и профили**

Будет реализовано:
- Регистрация и логин через JWT
- API endpoints: `/api/v1/auth/register/`, `/login/`, `/logout/`
- Модели Profile и Company
- Frontend формы регистрации/логина
- Полное покрытие тестами

## 🎓 Изучение кода

Рекомендуемый порядок:
1. `backend/config/settings.py` — настройки Django
2. `backend/apps/accounts/models.py` — модель User
3. `backend/apps/common/exceptions.py` — обработка ошибок
4. `docker-compose.yml` — инфраструктура
5. `frontend/src/App.tsx` — структура React-приложения

## 💡 Советы

1. **Используйте Swagger UI** (http://localhost:8000/api/docs/) для тестирования API
2. **Django Admin** мощный — используйте его для управления данными
3. **Health check** (http://localhost:8000/api/v1/health/) покажет состояние всех сервисов
4. **Pre-commit hooks** проверят код перед коммитом: `pre-commit install`
5. **Логи Celery** покажут выполнение фоновых задач

## 📞 Контакты

По вопросам разработки см. документацию в директории `/docs`.

---

**Текущая версия**: Этап 0 (каркас проекта) ✅  
**Следующий этап**: Этап 1 (аутентификация) 🔄
