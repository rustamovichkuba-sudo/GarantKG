"""
Общие permission классы для API
"""
from rest_framework import permissions


class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Разрешает изменение только владельцу объекта
    """
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        
        return obj.user == request.user


class IsModerator(permissions.BasePermission):
    """
    Разрешает доступ только модераторам
    """
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and (
            request.user.is_staff or 
            request.user.groups.filter(name__in=['moderator', 'dispute_manager']).exists()
        )


class IsDisputeManager(permissions.BasePermission):
    """
    Разрешает доступ только менеджерам споров
    """
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and (
            request.user.is_staff or 
            request.user.groups.filter(name='dispute_manager').exists()
        )
