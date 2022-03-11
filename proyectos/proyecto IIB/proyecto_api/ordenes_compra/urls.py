from rest_framework.routers import DefaultRouter
from ordenes_compra.views import OrdenesCompraViewSet
from django.urls import path, include


router = DefaultRouter()
router.register(r'ordenes_compra',OrdenesCompraViewSet)

urlpatterns = [path('', include(router.urls))]