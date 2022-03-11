from django.db import models
from viajes.models import Viaje
from usuarios.models import Usuario


# Create your models here.
class Orden_Compra(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    viaje = models.ForeignKey(Viaje, on_delete=models.CASCADE)
    cantidad_boletos = models.IntegerField()
    fecha_compra = models.DateField()
    codigo_qr = models.CharField(max_length=255)