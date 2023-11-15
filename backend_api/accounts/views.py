from rest_framework import viewsets
from .serializers import CusSignup
from rest_framework.response import Response
from rest_framework import status
# from rest_framework.authtoken.models import Token
from .models import Customer


class cus_signup(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CusSignup
    # def post(self, request, format=None):
    #     serializer = CusSignup(data=request.data)
    #     if serializer.is_valid():
    #         account = serializer.save()
    #         # token, created = Token.objects.get_or_create(user=account)
    #         data = {
    #             'response': 'registered',
    #             'full_name': account.full_name,
    #             'phone_number': account.phone_number,
    #             'email': account.email,
    #             # 'token': token.key
    #         }
    #         return Response(data, status=status.HTTP_201_CREATED)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
