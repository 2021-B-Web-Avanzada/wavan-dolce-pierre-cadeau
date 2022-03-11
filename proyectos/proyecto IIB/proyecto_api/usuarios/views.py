from .models import Usuario
from rest_framework import viewsets
from .serializer import UsuarioSerializer

class UsuariosViewSet(viewsets.ModelViewSet):
    serializer_class =  UsuarioSerializer
    queryset = Usuario.objects.all()

    def get_queryset(self):
        queryset = Usuario.objects.all()
        usercedula = self.request.query_params.get('cedula')
        userpassword = self.request.query_params.get('contrasena')
        if usercedula is not None:
            queryset = Usuario.objects.filter(cedula=usercedula,constraseña=userpassword)
        return queryset
