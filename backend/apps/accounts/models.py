"""
Модель пользователя
"""
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.db import models
from apps.common.models import TimeStampedModel


class UserManager(BaseUserManager):
    """Менеджер для кастомной модели пользователя"""
    
    def create_user(self, phone, password=None, **extra_fields):
        """Создание обычного пользователя"""
        if not phone:
            raise ValueError('Необходимо указать номер телефона')
        
        user = self.model(phone=phone, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self, phone, password=None, **extra_fields):
        """Создание суперпользователя"""
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)
        
        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')
        
        return self.create_user(phone, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin, TimeStampedModel):
    """
    Кастомная модель пользователя
    
    Основной идентификатор: номер телефона
    """
    phone = models.CharField(
        'Номер телефона',
        max_length=20,
        unique=True,
        help_text='Формат: +996XXXXXXXXX'
    )
    email = models.EmailField('Email', max_length=255, blank=True, null=True)
    first_name = models.CharField('Имя', max_length=150)
    last_name = models.CharField('Фамилия', max_length=150, blank=True)
    
    is_active = models.BooleanField('Активен', default=True)
    is_staff = models.BooleanField('Персонал', default=False)
    
    objects = UserManager()
    
    USERNAME_FIELD = 'phone'
    REQUIRED_FIELDS = ['first_name']
    
    class Meta:
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.get_full_name()} ({self.phone})"
    
    def get_full_name(self):
        """Возвращает полное имя"""
        full_name = f"{self.first_name} {self.last_name}".strip()
        return full_name or self.phone
    
    def get_short_name(self):
        """Возвращает краткое имя"""
        return self.first_name or self.phone
