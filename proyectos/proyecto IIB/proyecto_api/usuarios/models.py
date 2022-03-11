from django.db import models

# Create your models here.
class Usuario(models.Model):
    nombre = models.CharField(max_length=255)
    apellido = models.CharField(max_length=255)
    cedula = models.CharField(max_length=10)
    tipo_Usuario = models.CharField(max_length=255)
    correo = models.CharField(max_length=255)
    constraseña = models.CharField(max_length=255)
    foto = models.CharField(max_length=255)