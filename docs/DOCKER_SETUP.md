# Установка Docker Desktop для Windows

## Шаг 1: Системные требования

- Windows 10 64-bit: Pro, Enterprise, или Education (Build 19041 или выше)
- Или Windows 11
- WSL 2 (Windows Subsystem for Linux)
- Минимум 4GB RAM (рекомендуется 8GB+)

## Шаг 2: Включить WSL 2

Откройте PowerShell как администратор и выполните:

```powershell
# Включить WSL
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart

# Включить Virtual Machine Platform
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart

# Перезагрузить компьютер
Restart-Computer
```

После перезагрузки:

```powershell
# Установить WSL 2 как версию по умолчанию
wsl --set-default-version 2

# Установить Ubuntu (опционально, но рекомендуется)
wsl --install -d Ubuntu
```

## Шаг 3: Скачать Docker Desktop

1. Перейдите на https://www.docker.com/products/docker-desktop
2. Нажмите "Download for Windows"
3. Запустите установщик `Docker Desktop Installer.exe`

## Шаг 4: Установка

1. Следуйте инструкциям установщика
2. Убедитесь, что опция "Use WSL 2 instead of Hyper-V" включена
3. Дождитесь завершения установки
4. Перезагрузите компьютер, если потребуется

## Шаг 5: Запуск и проверка

1. Запустите Docker Desktop из меню Пуск
2. Дождитесь, пока Docker запустится (иконка в трее станет зелёной)
3. Откройте PowerShell и проверьте:

```powershell
docker --version
docker-compose --version
docker run hello-world
```

Если всё работает, вы увидите сообщение "Hello from Docker!"

## Шаг 6: Настройка ресурсов

1. Откройте Docker Desktop
2. Settings → Resources → Advanced
3. Установите:
   - **CPUs**: минимум 2 (рекомендуется 4)
   - **Memory**: минимум 4GB (рекомендуется 8GB)
   - **Swap**: 1GB
   - **Disk image size**: минимум 20GB

## Шаг 7: Запуск Garant.kg

Теперь вы можете запустить проект:

```powershell
cd c:\Users\User\OneDrive\Desktop\Garantkg
docker-compose up -d
```

Подробные инструкции запуска см. в [STAGE_0_COMPLETE.md](STAGE_0_COMPLETE.md)

## Устранение проблем

### Docker не запускается

**Проблема**: "Docker Desktop starting..." бесконечно

**Решение**:
1. Перезапустите службу Docker:
   ```powershell
   net stop com.docker.service
   net start com.docker.service
   ```
2. Перезагрузите компьютер

### WSL 2 ошибки

**Проблема**: "WSL 2 installation is incomplete"

**Решение**:
1. Скачайте WSL2 Linux kernel update: https://aka.ms/wsl2kernel
2. Установите и перезагрузите

### Низкая производительность

**Решение**:
1. Увеличьте выделенную память в Docker Desktop Settings
2. Убедитесь, что WSL 2 используется (не Hyper-V)
3. Переместите проект в WSL filesystem для лучшей производительности:
   ```powershell
   wsl
   cd ~
   git clone <repo-url>
   ```

## Альтернатива: Docker Toolbox (для старых Windows)

Если ваша версия Windows не поддерживает Docker Desktop:

1. Скачайте Docker Toolbox: https://github.com/docker-archive/toolbox/releases
2. Установите с настройками по умолчанию
3. Запустите "Docker Quickstart Terminal"

**Примечание**: Docker Toolbox устаревший и не рекомендуется для новых проектов.

## Полезные команды

```powershell
# Просмотр запущенных контейнеров
docker ps

# Остановка всех контейнеров
docker-compose down

# Просмотр логов
docker-compose logs -f

# Перезапуск одного сервиса
docker-compose restart backend

# Очистка неиспользуемых образов
docker system prune -a

# Проверка использования ресурсов
docker stats
```

## Дополнительные ресурсы

- Официальная документация: https://docs.docker.com/desktop/windows/install/
- WSL 2 документация: https://docs.microsoft.com/en-us/windows/wsl/install
- Docker Compose документация: https://docs.docker.com/compose/
