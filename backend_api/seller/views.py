from rest_framework.generics import ListCreateAPIView, RetrieveAPIView, ListAPIView
from rest_framework.exceptions import ValidationError
from .models import seller_products
from .serializers import SellerProductAdd, SellerAllProduct
from accounts.models import Shop

class SellerProductView(ListCreateAPIView):
    queryset = seller_products.objects.none() 
    serializer_class = SellerProductAdd

    def create(self, request, *args, **kwargs):
        shop_id = request.data.get('shop_id')
        product_id = request.data.get('product_id')
        price = request.data.get('price')
        
        # Validate Shop
        try:
            shop = Shop.objects.get(id=shop_id)
        except Shop.DoesNotExist:
            raise ValidationError("Invalid shop ID")

        if seller_products.objects.filter(shop_id=shop_id, product_id=product_id).exists():
            raise ValidationError("This product is already added in the shop.")
        
        # check product is already
        existing_product = seller_products.objects.filter(shop_id=shop_id, product_id=product_id).first()

        if existing_product:
            raise ValidationError("This product is already added to the shop.")

        # Set data for serializer
        # data = {
        #     "shop_id": shop_id,
        #     "product_id": product_id,
        #     "price": price
        # }

        # Use serializer to save data
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return super().create(request, *args, **kwargs)
    
class AllProduct(ListAPIView):
    queryset = seller_products.objects.all()
    serializer_class = SellerAllProduct

class ProductDetails(RetrieveAPIView):
    queryset = seller_products.objects.all()
    serializer_class = SellerAllProduct
    lookup_field = 'pk'

# @api_view(['GET'])
# def ProductDetails(request):
#     category_name = request.GET.get('category')  # Extract category from query parameter
#     if category_name:
#         products = seller_products.objects.filter(product_id__category__category_name=category_name)
#         serializer = SellerAllProduct(products, many=True)
#         return Response(serializer.data)
#     return Response({"error": "No category specified."})