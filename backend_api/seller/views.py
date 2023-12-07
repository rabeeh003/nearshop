from rest_framework.generics import ListCreateAPIView, RetrieveAPIView, ListAPIView , UpdateAPIView
from rest_framework.views import APIView
from rest_framework.exceptions import ValidationError
from .models import seller_products
from .serializers import SellerProductAdd, SellerAllProduct, SellerProductUpdate, ShopDetailSerializer
from accounts.models import Shop
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework import status


class SellerProductView(ListCreateAPIView):
    permission_classes = [AllowAny]
    queryset = seller_products.objects.none() 
    serializer_class = SellerProductAdd

    def create(self, request, *args, **kwargs):
        shop_id = request.data.get('shop_id')
        product_id = request.data.get('product_id')
        price = request.data.get('price')

        # Validate Shop existence
        try:
            shop = Shop.objects.get(id=shop_id)
        except Shop.DoesNotExist:
            raise ValidationError("Invalid shop ID")

        # Check if product exists in the shop
        existing_product = seller_products.objects.filter(shop_id=shop_id, product_id=product_id).first()

        if existing_product:
            raise ValidationError("This product is already added to the shop.")

        # Use serializer to save data
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data)

class SellerProductEditView(UpdateAPIView):
    permission_classes = [AllowAny]
    queryset = seller_products.objects.all()  # Set your queryset here
    serializer_class = SellerProductUpdate  # Use the appropriate serializer

    def patch(self, request, *args, **kwargs):
        instance = self.get_object()  # Retrieve the specific object to update
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class AllProduct(ListAPIView):
    queryset = seller_products.objects.all()
    serializer_class = SellerAllProduct

class ProductDetails(RetrieveAPIView):
    queryset = seller_products.objects.all()
    serializer_class = SellerAllProduct
    lookup_field = 'pk'

class ShopDetailAPIView(RetrieveAPIView):
    queryset = Shop.objects.all()
    serializer_class = ShopDetailSerializer
    lookup_field = 'shop_id'