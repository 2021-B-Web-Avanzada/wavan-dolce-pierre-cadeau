from asientos.models import Asiento
from rest_framework import serializers


class AsientoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Asiento
        fields = '__all__'