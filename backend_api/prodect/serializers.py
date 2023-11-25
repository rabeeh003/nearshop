from rest_framework import serializers
from .models import global_productes, category

class GlobalProductAdd(serializers.ModelSerializer):
    class Meta:
        model = global_productes
        fields = "__all__" 

class GlobalCategory(serializers.ModelSerializer):
    class Meta:
        model = category
        fields = "__all__" 