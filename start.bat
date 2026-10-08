@echo off
chcp 65001 >nul
echo.
echo ╔═══════════════════════════════════════════════════════════════╗
echo ║           🚀 Запуск Garant.kg                                ║
echo ╚═══════════════════════════════════════════════════════════════╝
echo.

echo [1/4] Проверка Docker...
docker --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Docker не установлен или не запущен!
    echo.
    echo Пожалуйста:
    echo 1. Дождитесь завершения установки Docker Desktop
    echo 2. Запустите Docker Desktop
    echo 3. Дождитесь зелёной иконки в трее
    echo 4. Запустите этот скрипт снова
    echo.
    pause
    exit /b 1
)
echo ✅ Docker установлен

echo.
echo [2/4] Запуск контейнеров...
docker-compose up -d
if errorlevel 1 (
    echo ❌ Ошибка запуска контейнеров
    pause
    exit /b 1
)

echo.
echo [3/4] Ожидание запуска сервисов (30 секунд)...
timeout /t 30 /nobreak >nul

echo.
echo [4/4] Проверка статуса...
docker-compose ps

echo.
echo ╔═══════════════════════════════════════════════════════════════╗
echo ║           ✅ Garant.kg запущен!                              ║
echo ╚═══════════════════════════════════════════════════════════════╝
echo.
echo Откройте в браузере:
echo.
echo   🌐 Frontend:    http://localhost:3000
echo   📚 API Docs:    http://localhost:8000/api/docs/
echo   🔐 Admin:       http://localhost:8000/admin/
echo   ❤️  Health:      http://localhost:8000/api/v1/health/
echo.
echo ⚠️  Если это первый запуск, выполните:
echo.
echo   docker-compose exec backend python manage.py migrate
echo   docker-compose exec backend python manage.py createsuperuser
echo.
echo 📖 Полная инструкция: QUICKSTART.md
echo.
pause
