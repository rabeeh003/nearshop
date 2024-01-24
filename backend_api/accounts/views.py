from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView, ListAPIView, ListCreateAPIView, UpdateAPIView, RetrieveAPIView, RetrieveUpdateAPIView
from .serializers import (
    CusSignup,
    CusSignin,
    OwnerSerial,
    ShopSerializer,
    ShopLogin,
    OwnerSignin,
    OwnerMailCheck,
)
from rest_framework.response import Response
from .models import Customer, Owner, Shop
from rest_framework.permissions import AllowAny
import jwt, datetime
from math import radians, sin, cos, sqrt, atan2
from django.conf import settings
from django.core.mail import send_mail
import uuid
from django.http import HttpResponse




# customer section
class cus_signup(CreateAPIView):
    permission_classes = [AllowAny]
    queryset = Customer.objects.all()
    serializer_class = CusSignup

class cus_signin(CreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = CusSignin

    def create(self, request, *args, **kwargs):
        phone_number = request.data.get("phone_number")

        try:
            customer = Customer.objects.get(phone_number=phone_number)

            payload = {
                "message": "login success",
                "id": customer.id,
                "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
                "iat": datetime.datetime.utcnow(),
            }

            token = jwt.encode(payload, "secret", algorithm="HS256")

            responce = Response()
            responce.set_cookie(key="jwt", value=token, httponly=True)
            responce.data = {
                "jwt": token,
                "id": customer.id,
            }
            return responce

        except Customer.DoesNotExist:
            error_payload = {
                "message": "Account not found, please check phone number",
                "customer": None,
            }
            return Response(error_payload, status=404)

class cus_details(RetrieveUpdateAPIView):
    permission_classes = [AllowAny]
    serializer_class = CusSignup
    queryset = Customer.objects.all()
    lookup_field = 'id'  # Set the lookup field to 'id'

    def get_object(self):
        user_id = self.kwargs.get('user_id')
        return self.get_queryset().filter(id=user_id).first()
    
    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

# shoppe section
class shop_register(ListCreateAPIView):
    permission_classes = [AllowAny]
    queryset = Shop.objects.all()
    serializer_class = ShopSerializer

    def perform_create(self, serializer):
        token = uuid.uuid4()
        serializer.validated_data['email_token'] = token
        shop_instance = serializer.save()
        self.send_email_token(shop_instance.shop_mail, token)

    def send_email_token(self, email, token):
        try:
            send_mail(
                subject='Your account needs to be verified!',
                message=f'Click on the link to verify https://www.nearbazar.shop/api/shop/verify_email_token/{token}/',
                email_from=settings.EMAIL_HOST_USER,
                recipient_list=[email, ]
            )
        except Exception as e:
            return False

def Verify_email_token(request, token):
    shop_instance = get_object_or_404(Shop, email_token=token)
    shop_instance.is_verified = True
    shop_instance.save()
    return HttpResponse("Your account has been verified.")

class shopsall(RetrieveAPIView):
    permission_classes = [AllowAny]
    queryset = Shop.objects.all()
    serializer_class = ShopSerializer

class getOneShop(RetrieveAPIView):
    permission_classes = [AllowAny]
    serializer_class = ShopSerializer

    def get_queryset(self):
        return Shop.objects.all()

    def get_object(self):
        shop_id = self.kwargs.get('pk')
        return self.get_queryset().filter(id=shop_id).first()

class shop_update(UpdateAPIView):
    permission_classes = [AllowAny]
    queryset = Shop.objects.all()

    def put(self, request, *args, **kwargs):
        instance = self.get_object()
        fields_to_update = list(
            request.data.keys()
        )  # Convert dict_keys to a list of field names
        serializer_class = type(
            "ShopSerializer",
            (ShopSerializer,),
            {"Meta": type("Meta", (), {"model": Shop, "fields": fields_to_update})},
        )

        serializer = serializer_class(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class shop_login(CreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = ShopLogin

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        try:
            shop = serializer.validated_data

            payload = {
                "message": "login success",
                "id": shop.id,
                "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
                "iat": datetime.datetime.utcnow(),
            }

            token = jwt.encode(payload, "secret", algorithm="HS256")

            response = Response({"jwt": token, "id": shop.id, "mail": shop.shop_mail})
            # response.set_cookie(key='jwt', value=token, httponly=True)
            return response
        except Shop.DoesNotExist:
            responce = Response(
                {
                    "message": "Account not found, please check mail or password",
                    "shoper": None,
                }
            )
            response.status_code = 400
            responce.set_cookie(key="jwt", value="", httponly=True)
            return response


# owner authentication
class owner_register(CreateAPIView):
    permission_classes = [AllowAny]
    queryset = Owner.objects.all()
    serializer_class = OwnerSerial


class owner_login(CreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = OwnerSignin

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        try:
            owner = serializer.validated_data

            payload = {
                "message": "login success",
                "id": owner.id,
                "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
                "iat": datetime.datetime.utcnow(),
            }

            token = jwt.encode(payload, "secret", algorithm="HS256")

            response = Response({"jwt": token, "id": owner.id, "mail": owner.mail})
            # response.set_cookie(key='jwt', value=token, httponly=True)
            return response
        except Shop.DoesNotExist:
            responce = Response(
                {
                    "message": "Account not found, please check mail or password",
                    "shoper": None,
                }
            )
            response.status_code = 400
            responce.set_cookie(key="jwt", value="", httponly=True)
            return response


class owner_mail_check(CreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = OwnerMailCheck

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        validated_data = serializer.validated_data
        mail = validated_data.get("mail")

        try:
            owner = Owner.objects.get(mail=mail)
            # Here, you might want to return only necessary data like mail or a message
            return Response({"mail": owner.mail}, status=200)
        except Owner.DoesNotExist:
            return Response(
                {"message": "Owner with this mail does not exist."}, status=404
            )



# location based filtering.
    
class ShopListViewBasedLocation(ListAPIView):
    serializer_class = ShopSerializer

    def haversine(self, lat1, lon1, lat2, lon2):
        R = 6371  # Earth radius in kilometers

        # Convert latitude and longitude from degrees to radians
        lat1, lon1, lat2, lon2 = map(radians, [lat1, lon1, lat2, lon2])

        # Differences in coordinates
        dlat = lat2 - lat1
        dlon = lon2 - lon1

        # Haversine formula
        a = sin(dlat / 2) ** 2 + cos(lat1) * cos(lat2) * sin(dlon / 2) ** 2
        c = 2 * atan2(sqrt(a), sqrt(1 - a))

        # Calculate the distance
        distance = R * c

        return distance

    def get_queryset(self):
        user_lat = float(self.request.query_params.get('userLat', 0))
        user_lng = float(self.request.query_params.get('userLng', 0))
        radius = float(self.request.query_params.get('radius', 0))

        # Filter shops based on the distance
        shops = Shop.objects.all()
        filtered_shops = [
            shop for shop in shops
            if self.haversine(user_lat, user_lng, shop.lat, shop.lng) <= radius
        ]

        return filtered_shops

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)