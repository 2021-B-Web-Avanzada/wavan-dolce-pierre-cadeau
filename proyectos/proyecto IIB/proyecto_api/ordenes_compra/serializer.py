from ordenes_compra.models import Orden_Compra
from rest_framework import serializers


class OrdenesCompraSerializer(serializers.ModelSerializer):
    class Meta:
        model = Orden_Compra
        fields = '__all__'