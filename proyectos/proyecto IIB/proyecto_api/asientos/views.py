from .models import Asiento
from rest_framework import viewsets
from .serializer import AsientoSerializer

class AsientosViewSet(viewsets.ModelViewSet):
    serializer_class =  AsientoSerializer
    queryset = Asiento.objects.all()


# Create your views here.
