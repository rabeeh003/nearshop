from django.contrib import admin
from django.utils.safestring import mark_safe
from .models import seller_products

class ProductTable(admin.ModelAdmin):
    list_display = ('get_product_image', 'shop_id', 'get_product_name', 'price', 'product_status', 'offer_count', 'offer_start', 'offer_end')

    def get_product_name(self, obj):
        return obj.product_id.product_name 

    def get_product_image(self, obj):
        image_url = obj.product_id.prodect_image.url if obj.product_id.prodect_image else ''
        if image_url:
            return mark_safe(f'<img src="{image_url}" width="50" height="50" />')
        return 'No Image'

    get_product_image.allow_tags = True
    get_product_image.short_description = 'Product Image'
    get_product_name.short_description = 'Product Name' 

admin.site.register(seller_products, ProductTable)