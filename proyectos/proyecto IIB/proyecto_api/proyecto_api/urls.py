from django.contrib import admin
from django.urls import path, include



urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('usuarios.urls')),
    path('', include('asientos_compra.urls')),
    path('', include('asientos.urls')),
    path('', include('cooperativas.urls')),
    path('', include('ordenes_compra.urls')),
    path('', include('viajes.urls')),
]

