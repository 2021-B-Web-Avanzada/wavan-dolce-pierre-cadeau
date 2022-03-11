from rest_framework.routers import DefaultRouter
from viajes.views import ViajesViewSet
from django.urls import path, include


router = DefaultRouter()
router.register(r'viajes',ViajesViewSet)

urlpatterns = [path('', include(router.urls))]