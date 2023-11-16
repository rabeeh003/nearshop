from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.generics import ListCreateAPIView,CreateAPIView
from .serializers import CusSignup, CusSignin
from rest_framework.response import Response
from .models import Customer
from rest_framework.permissions import AllowAny



class cus_signup(ListCreateAPIView):
    permission_classes= [AllowAny]
    queryset = Customer.objects.all()
    serializer_class = CusSignup

class cus_signin(CreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = CusSignin

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        customer = serializer.validated_data
        # Perform any additional actions for signin, such as generating tokens, logging in the user, etc.
        return Response("User signed in successfully")