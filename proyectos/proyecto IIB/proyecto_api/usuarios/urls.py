from rest_framework.routers import DefaultRouter
from usuarios.views import UsuariosViewSet
from django.urls import path, include


router = DefaultRouter()
router.register(r'usuarios',UsuariosViewSet)

urlpatterns = [path('', include(router.urls))]