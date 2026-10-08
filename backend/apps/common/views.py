"""
Общие view для платформы
"""
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from django.db import connection
from django.core.cache import cache


@api_view(['GET'])
@permission_classes([AllowAny])
def health_check(request):
    """
    Проверка здоровья системы
    
    Проверяет:
    - Базу данных
    - Redis
    - Celery (опционально)
    """
    health_status = {
        'status': 'healthy',
        'checks': {}
    }
    
    # Проверка БД
    try:
        with connection.cursor() as cursor:
            cursor.execute("SELECT 1")
        health_status['checks']['database'] = 'ok'
    except Exception as e:
        health_status['checks']['database'] = f'error: {str(e)}'
        health_status['status'] = 'unhealthy'
    
    # Проверка Redis
    try:
        cache.set('health_check', 'ok', 10)
        if cache.get('health_check') == 'ok':
            health_status['checks']['redis'] = 'ok'
        else:
            health_status['checks']['redis'] = 'error: unable to read'
            health_status['status'] = 'unhealthy'
    except Exception as e:
        health_status['checks']['redis'] = f'error: {str(e)}'
        health_status['status'] = 'unhealthy'
    
    # Проверка Celery (проверяем только доступность, не запускаем задачи)
    try:
        from config.celery import app
        inspect = app.control.inspect()
        stats = inspect.stats()
        if stats:
            health_status['checks']['celery'] = 'ok'
        else:
            health_status['checks']['celery'] = 'no workers'
    except Exception as e:
        health_status['checks']['celery'] = f'error: {str(e)}'
    
    status_code = status.HTTP_200_OK if health_status['status'] == 'healthy' else status.HTTP_503_SERVICE_UNAVAILABLE
    
    return Response(health_status, status=status_code)
