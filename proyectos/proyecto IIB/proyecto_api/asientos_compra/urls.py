from rest_framework.routers import DefaultRouter
from asientos_compra.views import AsientosCompraViewSet
from django.urls import path, include


router = DefaultRouter()
router.register(r'asientos_compra',AsientosCompraViewSet)

urlpatterns = [path('', include(router.urls))]