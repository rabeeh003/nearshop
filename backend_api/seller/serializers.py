from rest_framework import serializers
from .models import seller_products, Order, Payment, Message, OrderProducts
from prodect.serializers import GlobalCategory, GlobalProductAdd
from accounts.serializers import ShopSerializer
from accounts.models import Shop

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

class ShopDetailSerializer(serializers.ModelSerializer):
    seller_products = serializers.SerializerMethodField()

    class Meta:
        model = Shop
        fields = ('id', 'shop_name', 'shop_id', 'shop_phone', 'shop_label', 'shop_place', 'shop_mail', 'lat', 'lng', 'banner_image', 'profile_image', 'created_at', 'updated_at', 'shop_owner', 'password', 'seller_products')

    def get_seller_products(self, obj):
        seller_products_queryset = seller_products.objects.filter(shop_id=obj)
        serializer = SellerAllProduct(instance=seller_products_queryset, many=True)
        return serializer.data

# order

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = '__all__'

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):
    seller = ShopSerializer(source='shop', read_only=True)
    
    class Meta:
        model = Order
        fields = '__all__'

class OrderProductSerializer(serializers.ModelSerializer):
    orderdata = OrderSerializer(source='order', read_only=True)
    pro = SellerAllProduct(source='product',read_only=True)
    class Meta:
        model = OrderProducts
        fields = '__all__'