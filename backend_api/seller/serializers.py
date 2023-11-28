from rest_framework import serializers
from .models import seller_products

class SellerProductAdd(serializers.ModelSerializer):
    class Meta:
        model = seller_products
        fields = ["shop_id","product_id","price"]
