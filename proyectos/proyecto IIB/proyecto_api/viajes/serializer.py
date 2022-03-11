from viajes.models import Viaje
from rest_framework import serializers


class ViajeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Viaje
        fields = '__all__'