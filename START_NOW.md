# 🚀 Запуск Garant.kg СЕЙЧАС

## 📍 Текущее состояние

✅ **Проект готов** — вся структура создана  
🔄 **Docker Desktop устанавливается** — ожидайте завершения  
⏳ **~5-10 минут** до полного запуска

---

## 1️⃣ Дождитесь завершения установки Docker Desktop

Установка Docker Desktop запущена. Когда она завершится:

1. **Появится окно Docker Desktop** — запустите его
2. **Примите условия** (если попросит)
3. **Дождитесь запуска** Docker Engine (иконка в трее станет зелёной)

---

## 2️⃣ Перезагрузите PowerShell

После установки Docker Desktop:

```powershell
# Закройте и откройте новое окно PowerShell
# Затем проверьте:
docker --version
docker-compose --version
```

Должны увидеть версии (например: Docker version 24.x.x)

---

## 3️⃣ Запустите проект (3 команды)

```powershell
# Перейдите в проект
cd c:\Users\User\OneDrive\Desktop\Garantkg

# Запустите все сервисы
docker-compose up -d

# Подождите 30 секунд, затем проверьте
docker-compose ps
```

Должны быть запущены 6 контейнеров:
- garantkg_db
- garantkg_redis
- garantkg_backend
- garantkg_celery
- garantkg_celery_beat
- garantkg_frontend

---

## 4️⃣ Настройте базу данных

```powershell
# Применить миграции
docker-compose exec backend python manage.py migrate

# Создать суперпользователя
docker-compose exec backend python manage.py createsuperuser
```

При создании пользователя введите:
- **Телефон**: `+996700000000`
- **Имя**: `Admin`
- **Пароль**: `admin123` (для разработки)

---

## 5️⃣ Откройте в браузере

Сразу после запуска откроются:

🌐 **Frontend (React)**  
http://localhost:3000  
→ Главная страница (сейчас заглушка)

📚 **API Документация (Swagger UI)**  
http://localhost:8000/api/docs/  
→ Интерактивная документация API

🔐 **Админ-панель**  
http://localhost:8000/admin/  
→ Войдите с созданным суперпользователем

❤️ **Health Check**  
http://localhost:8000/api/v1/health/  
→ Проверка работоспособности всех сервисов

---

## ✅ Проверка работоспособности

Используйте [CHECKLIST.md](CHECKLIST.md) для полной проверки.

Быстрая проверка:

```powershell
# Все контейнеры запущены?
docker-compose ps

# Backend отвечает?
curl http://localhost:8000/api/v1/health/

# Логи без ошибок?
docker-compose logs backend --tail=20
```

---

## 🐛 Проблемы?

### Docker не запускается

**Решение**: Перезагрузите компьютер после установки Docker Desktop

### Контейнеры не запускаются

```powershell
# Остановите всё
docker-compose down

# Запустите заново
docker-compose up -d

# Проверьте логи
docker-compose logs
```

### Backend показывает ошибки

```powershell
# Проверьте БД
docker-compose exec db pg_isready

# Перезапустите backend
docker-compose restart backend
```

---

## 📚 Полная документация

- **[QUICKSTART.md](QUICKSTART.md)** — детальная инструкция
- **[CHECKLIST.md](CHECKLIST.md)** — чек-лист проверки
- **[docs/DOCKER_SETUP.md](docs/DOCKER_SETUP.md)** — подробно про Docker

---

## 🎯 Что дальше?

После успешного запуска:

1. ✅ Проверьте все URL выше
2. ✅ Пройдите по [CHECKLIST.md](CHECKLIST.md)
3. ✅ Изучите [docs/DECISIONS.md](docs/DECISIONS.md)
4. 🔜 Готовьтесь к Этапу 1 (аутентификация)

---

**Текущее время**: Docker Desktop устанавливается  
**Следующий шаг**: Дождитесь завершения установки (появится окно Docker Desktop)
