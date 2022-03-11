from django.db import models

from ordenes_compra.models import Orden_Compra
from asientos.models import Asiento

# Create your models here.
class Asiento_Compra(models.Model):
    class Meta:
        unique_together = (('orden_compra', 'asiento'),)
    orden_compra = models.ForeignKey(Orden_Compra, on_delete=models.CASCADE)
    asiento = models.ForeignKey(Asiento,on_delete=models.CASCADE)
