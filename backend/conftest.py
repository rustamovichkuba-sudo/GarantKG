"""
Pytest configuration and fixtures
"""
import pytest
from rest_framework.test import APIClient


@pytest.fixture
def api_client():
    """Fixture для DRF API клиента"""
    return APIClient()


@pytest.fixture
def authenticated_client(api_client, user):
    """Fixture для аутентифицированного клиента"""
    api_client.force_authenticate(user=user)
    return api_client


@pytest.fixture
def user(db, django_user_model):
    """Fixture для тестового пользователя"""
    return django_user_model.objects.create_user(
        phone='+996700123456',
        first_name='Тест',
        last_name='Пользователь',
        email='test@example.com',
        password='testpass123'
    )


@pytest.fixture
def another_user(db, django_user_model):
    """Fixture для второго тестового пользователя"""
    return django_user_model.objects.create_user(
        phone='+996700654321',
        first_name='Другой',
        last_name='Пользователь',
        email='another@example.com',
        password='testpass123'
    )
