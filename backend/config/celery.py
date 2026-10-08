"""
Celery configuration for Garant.kg
"""
import os
from celery import Celery
from celery.schedules import crontab

# Set the default Django settings module
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')

app = Celery('garantkg')

# Load config from Django settings with CELERY_ prefix
app.config_from_object('django.conf:settings', namespace='CELERY')

# Autodiscover tasks in all installed apps
app.autodiscover_tasks()


@app.task(bind=True, ignore_result=True)
def debug_task(self):
    """Debug task for testing Celery"""
    print(f'Request: {self.request!r}')


# Периодические задачи
app.conf.beat_schedule = {
    'check-auto-accept-deals': {
        'task': 'apps.deals.tasks.check_auto_accept_deals',
        'schedule': crontab(minute='*/15'),  # Каждые 15 минут
    },
    'send-reminder-notifications': {
        'task': 'apps.notifications.tasks.send_reminder_notifications',
        'schedule': crontab(hour='*/2'),  # Каждые 2 часа
    },
}
