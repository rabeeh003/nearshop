from django.shortcuts import render
from .serializers import locationSerializer
from .models import location
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import AllowAny


class LocationView(ListCreateAPIView):
    queryset = location.objects.all()
    serializer_class = locationSerializer
    permission_classes = [AllowAny]

    
class LocationDetailView(RetrieveUpdateDestroyAPIView):
    queryset = location.objects.all()
    serializer_class = locationSerializer
    permission_classes = [AllowAny]