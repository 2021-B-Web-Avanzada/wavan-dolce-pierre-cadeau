from .models import Viaje
from rest_framework import viewsets
from .serializer import ViajeSerializer

class ViajesViewSet(viewsets.ModelViewSet):
    serializer_class =  ViajeSerializer
    queryset = Viaje.objects.all()
        
    def get_queryset(self):
        queryset = Viaje.objects.all()
        fecha = self.request.query_params.get('fecha')
        if fecha is not None:
            queryset = Viaje.objects.filter(fecha__gte=fecha)
        return queryset