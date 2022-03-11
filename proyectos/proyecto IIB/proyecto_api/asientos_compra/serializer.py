from asientos_compra.models import Asiento_Compra
from rest_framework import serializers


class AsientoCompraSerializer(serializers.ModelSerializer):
    class Meta:
        model = Asiento_Compra
        fields = '__all__'