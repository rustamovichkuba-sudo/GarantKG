"""
API v1 URL router
"""
from django.urls import path, include

urlpatterns = [
    # Health check
    path('health/', include('apps.common.urls')),
    
    # Authentication and Users
    path('auth/', include('apps.accounts.urls')),
    
    # Будут добавляться по мере создания приложений:
    # path('profiles/', include('apps.profiles.urls')),
    # path('categories/', include('apps.categories.urls')),
    # path('listings/', include('apps.marketplace.urls')),
    # path('deals/', include('apps.deals.urls')),
    # path('payments/', include('apps.payments.urls')),
    # path('messages/', include('apps.messaging.urls')),
    # path('disputes/', include('apps.disputes.urls')),
    # path('reviews/', include('apps.reviews.urls')),
    # path('notifications/', include('apps.notifications.urls')),
    # path('reports/', include('apps.moderation.urls')),
]
