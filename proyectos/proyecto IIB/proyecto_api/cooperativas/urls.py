from rest_framework.routers import DefaultRouter
from cooperativas.views import CooperativasViewSet
from django.urls import path, include


router = DefaultRouter()
router.register(r'cooperativas',CooperativasViewSet)

urlpatterns = [path('', include(router.urls))]