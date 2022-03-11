from django.db import models

# Create your models here.
class Cooperativa(models.Model):
    nombre_cooperativa = models.CharField(max_length=255)
    telefono = models.CharField(max_length=10)
    ciudad_matriz = models.CharField(max_length=255)
    direccion_matriz = models.CharField(max_length=255)