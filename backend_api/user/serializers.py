from rest_framework import serializers
from .models import location

class locationSerializer(serializers.ModelSerializer):
    class Meta:
        model = location
        fields = "__all__"
