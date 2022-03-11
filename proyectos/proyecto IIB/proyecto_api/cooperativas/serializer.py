from cooperativas.models import Cooperativa
from rest_framework import serializers


class CooperativasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cooperativa
        fields = '__all__'