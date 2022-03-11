from rest_framework.routers import DefaultRouter
from asientos.views import AsientosViewSet
from django.urls import path, include


router = DefaultRouter()
router.register(r'asientos',AsientosViewSet)

urlpatterns = [path('', include(router.urls))]