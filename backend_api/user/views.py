from django.shortcuts import render
from .serializers import locationSerializer
from .models import location
from rest_framework.generics import ListCreateAPIView
from rest_framework.permissions import AllowAny


class LocationView(ListCreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = locationSerializer

    def get_queryset(self):
        customer_id = self.request.query_params.get('customer_id')
        if customer_id:
            return location.objects.filter(customer_id=customer_id)
        return location.objects.all()
