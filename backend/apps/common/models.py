"""
Базовые модели и миксины для всех приложений
"""
import uuid
from django.db import models


class TimeStampedModel(models.Model):
    """
    Абстрактная модель с полями created_at и updated_at
    """
    created_at = models.DateTimeField('Дата создания', auto_now_add=True)
    updated_at = models.DateTimeField('Дата обновления', auto_now=True)
    
    class Meta:
        abstract = True


class UUIDModel(models.Model):
    """
    Абстрактная модель с UUID в качестве первичного ключа
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    
    class Meta:
        abstract = True
