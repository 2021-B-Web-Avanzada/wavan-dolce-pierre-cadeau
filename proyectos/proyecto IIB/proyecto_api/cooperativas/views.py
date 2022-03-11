from .models import Cooperativa
from rest_framework import viewsets
from .serializer import CooperativasSerializer

class CooperativasViewSet(viewsets.ModelViewSet):
    serializer_class =  CooperativasSerializer
    queryset = Cooperativa.objects.all()
