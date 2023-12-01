from rest_framework import serializers
from .models import seller_products
from prodect.serializers import GlobalCategory, GlobalProductAdd
from accounts.serializers import ShopSerializer

class SellerProductAdd(serializers.ModelSerializer):
    class Meta:
        model = seller_products
        fields = ["shop_id","product_id","price","product_status"]

class SellerProductUpdate(serializers.ModelSerializer):
    class Meta:
        model = seller_products
        fields = ['price', 'product_status', 'offer_price', 'offer_start', 'offer_end']

class SellerAllProduct(serializers.ModelSerializer):
    gpro = GlobalProductAdd(source='product_id')
    cat = GlobalCategory(source='product_id.category')
    seller = ShopSerializer(source='shop_id')
    class Meta:
        model = seller_products
        fields = '__all__'