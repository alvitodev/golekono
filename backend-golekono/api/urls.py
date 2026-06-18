from django.urls import path
from . import views

urlpatterns = [
    path('itinerary/', views.get_itinerary, name='get_itinerary'),
    path('health', views.health_check, name='health_check'),
    path('health/', views.health_check, name='health_check_slash'),
]
