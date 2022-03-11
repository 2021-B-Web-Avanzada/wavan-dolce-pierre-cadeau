from .models import Orden_Compra
from rest_framework import viewsets
from .serializer import OrdenesCompraSerializer

class OrdenesCompraViewSet(viewsets.ModelViewSet):
    serializer_class =  OrdenesCompraSerializer
    queryset = Orden_Compra.objects.all()

    def get_queryset(self):
        queryset = Orden_Compra.objects.all()
        usuario = self.request.query_params.get('idUsuario')
        if usuario is not None:
            queryset = Orden_Compra.objects.filter(usuario_id=usuario)
        return queryset