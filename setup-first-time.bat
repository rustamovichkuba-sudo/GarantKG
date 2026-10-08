@echo off
chcp 65001 >nul
echo.
echo ╔═══════════════════════════════════════════════════════════════╗
echo ║     🔧 Первоначальная настройка Garant.kg                    ║
echo ╚═══════════════════════════════════════════════════════════════╝
echo.

echo [1/3] Проверка Docker...
docker --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Docker не установлен!
    echo См. docs\DOCKER_SETUP.md для установки
    pause
    exit /b 1
)
echo ✅ Docker работает

echo.
echo [2/3] Применение миграций базы данных...
docker-compose exec backend python manage.py migrate
if errorlevel 1 (
    echo ❌ Ошибка миграций
    echo Убедитесь, что контейнеры запущены: docker-compose up -d
    pause
    exit /b 1
)
echo ✅ Миграции применены

echo.
echo [3/3] Создание суперпользователя...
echo.
echo Введите данные администратора:
docker-compose exec backend python manage.py createsuperuser

echo.
echo ╔═══════════════════════════════════════════════════════════════╗
echo ║           ✅ Настройка завершена!                            ║
echo ╚═══════════════════════════════════════════════════════════════╝
echo.
echo Проверьте работу сайта:
echo   🌐 http://localhost:3000
echo   📚 http://localhost:8000/api/docs/
echo   🔐 http://localhost:8000/admin/
echo.
echo Используйте CHECKLIST.md для полной проверки
echo.
pause
