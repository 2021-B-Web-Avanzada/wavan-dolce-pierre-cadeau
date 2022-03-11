from django.db import models

from cooperativas.models import Cooperativa

# Create your models here.
class Viaje(models.Model):
    cooperativa = models.ForeignKey(Cooperativa, on_delete=models.CASCADE)
    ciudad_origen = models.CharField(max_length=255)
    ciudad_destino = models.CharField(max_length=255)
    fecha = models.DateTimeField()
    total_asientos = models.IntegerField()
    precio = models.FloatField()