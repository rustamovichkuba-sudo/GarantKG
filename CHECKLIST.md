# ✅ Чек-лист проверки Garant.kg

Используйте этот чек-лист после установки Docker и запуска проекта.

## 🐳 Docker установлен

```bash
docker --version
# Ожидается: Docker version 24.x или выше

docker-compose --version
# Ожидается: docker-compose version 2.x или выше

docker ps
# Ожидается: список контейнеров или пустой список (без ошибок)
```

- [ ] Docker установлен и запущен
- [ ] Docker Compose доступен
- [ ] Команды выполняются без ошибок

## 🚀 Проект запущен

```bash
cd c:\Users\User\OneDrive\Desktop\Garantkg
docker-compose up -d
docker-compose ps
```

Должны быть запущены контейнеры:
- [ ] `garantkg_db` (PostgreSQL) — Status: Up
- [ ] `garantkg_redis` (Redis) — Status: Up  
- [ ] `garantkg_backend` (Django) — Status: Up
- [ ] `garantkg_celery` (Celery Worker) — Status: Up
- [ ] `garantkg_celery_beat` (Celery Beat) — Status: Up
- [ ] `garantkg_frontend` (React) — Status: Up

## 🗄️ База данных

```bash
docker-compose exec backend python manage.py migrate
docker-compose exec backend python manage.py showmigrations
```

- [ ] Миграции применены без ошибок
- [ ] Все миграции отмечены `[X]`

## 👤 Суперпользователь

```bash
docker-compose exec backend python manage.py createsuperuser
```

Создайте:
- Телефон: `+996700000000`
- Имя: `Admin`
- Пароль: `admin123` (только для разработки!)

- [ ] Суперпользователь создан

## 🌐 Backend доступен

Откройте в браузере:

### Health Check
**URL**: http://localhost:8000/api/v1/health/

Ожидаемый ответ:
```json
{
  "status": "healthy",
  "checks": {
    "database": "ok",
    "redis": "ok",
    "celery": "ok" или "no workers"
  }
}
```

- [ ] Health check возвращает 200 OK
- [ ] Database: ok
- [ ] Redis: ok

### API Documentation
**URL**: http://localhost:8000/api/docs/

- [ ] Swagger UI загружается
- [ ] Видна документация API
- [ ] Можно развернуть /api/v1/health/

### Django Admin
**URL**: http://localhost:8000/admin/

- [ ] Страница логина загружается
- [ ] Можно войти с созданным суперпользователем
- [ ] Видны модели: Users, Groups

## 🎨 Frontend доступен

**URL**: http://localhost:3000

- [ ] Страница загружается
- [ ] Виден заголовок "Garant.kg"
- [ ] Текст "Платформа безопасных сделок для Кыргызстана"
- [ ] Иконка загрузки "В разработке"

## 📋 Логи без критических ошибок

```bash
docker-compose logs backend | grep ERROR
docker-compose logs celery | grep ERROR
docker-compose logs frontend | grep ERROR
```

- [ ] Backend логи: нет критических ошибок
- [ ] Celery логи: worker запущен
- [ ] Frontend логи: dev server запущен

## 🔧 Celery работает

```bash
docker-compose logs celery | grep "ready"
```

Ожидается строка:
```
celery@... ready
```

- [ ] Celery worker готов

```bash
docker-compose logs celery-beat | grep "beat"
```

Ожидается:
```
celery beat v5.x.x is starting
```

- [ ] Celery Beat запущен

## 🧪 Тесты (опционально для Этапа 0)

```bash
docker-compose exec backend pytest
```

- [ ] Pytest запускается (даже если тестов пока нет)

## 📊 Ресурсы

```bash
docker stats --no-stream
```

Проверьте использование ресурсов:
- [ ] Ни один контейнер не использует >80% CPU длительное время
- [ ] Memory usage в пределах выделенных Docker ресурсов

## 🔐 Безопасность (для development)

Проверьте `.env` файл:
- [ ] `DEBUG=True` (только для разработки!)
- [ ] `SECRET_KEY` заполнен
- [ ] Все DATABASE_* переменные заполнены

⚠️ **Важно**: Перед production все секреты должны быть изменены!

## 🎯 Финальная проверка

Выполните полный сценарий:

1. Откройте http://localhost:8000/api/docs/
2. Найдите GET /api/v1/health/
3. Нажмите "Try it out" → "Execute"
4. Проверьте Response: должен быть 200 с `"status": "healthy"`

- [ ] Swagger UI работает
- [ ] Можно выполнить тестовый запрос
- [ ] Health check возвращает healthy

## ✨ Всё готово!

Если все пункты отмечены ✅, проект готов к разработке!

### Следующие шаги:

1. **Изучите документацию**:
   - [STAGE_0_COMPLETE.md](docs/STAGE_0_COMPLETE.md) — что сделано
   - [DECISIONS.md](docs/DECISIONS.md) — архитектурные решения
   - [PROGRESS.md](docs/PROGRESS.md) — план развития

2. **Начните разработку Этапа 1**:
   - Аутентификация
   - Профили
   - JWT endpoints

3. **Настройте окружение разработки**:
   ```bash
   # Установите pre-commit hooks
   docker-compose exec backend pre-commit install
   ```

## 🐛 Если что-то не работает

### Backend не отвечает

```bash
docker-compose logs backend --tail=50
docker-compose restart backend
```

### База данных не подключается

```bash
docker-compose exec db pg_isready
docker-compose restart db
# Подождите 10 секунд
docker-compose exec backend python manage.py migrate
```

### Frontend не загружается

```bash
docker-compose exec frontend npm install
docker-compose restart frontend
```

### Полная перезагрузка

```bash
docker-compose down
docker-compose up -d
# Подождите 30 секунд
docker-compose ps
```

### Очистка и пересоздание

```bash
docker-compose down -v  # ВНИМАНИЕ: удалит все данные!
docker-compose up -d
docker-compose exec backend python manage.py migrate
docker-compose exec backend python manage.py createsuperuser
```

---

**Дата создания чек-листа**: Этап 0  
**Последнее обновление**: 2024
