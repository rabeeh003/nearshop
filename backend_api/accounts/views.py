from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView, ListAPIView
from .serializers import CusSignup, CusSignin
from rest_framework.response import Response
from .models import Customer
from rest_framework.permissions import AllowAny
import jwt, datetime


class cus_signup(CreateAPIView):
    permission_classes= [AllowAny]
    queryset = Customer.objects.all()
    serializer_class = CusSignup

class cus_signin(CreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = CusSignin

    def create(self, request, *args, **kwargs):
        phone_number = request.data.get('phone_number')

        try:
            customer = Customer.objects.get(phone_number=phone_number)

            payload = {
                'message': 'login success',
                'id': customer.id,
                'exp':datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
                'iat':datetime.datetime.utcnow()
            }

            token = jwt.encode(payload,'secret',algorithm='HS256')
            
            responce = Response()
            responce.set_cookie(key='jwt', value=token, httponly=True)
            responce.data = {
                'jwt':token,
            }
            return responce 

        except Customer.DoesNotExist:
            error_payload = {
                'message': 'Account not found, please check phone number',
                'customer': None
            }
            return Response(error_payload, status=404)
        
class cus_signout(APIView):

    permission_classes = [AllowAny]

    def get(self, request):
        response = Response({'message': 'success logout'})
        response.delete_cookie('jwt')
        return response
    
# shopper section

# owner authentication

