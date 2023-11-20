from django.contrib import admin
from .models import Customer, Owner, Shop
# Register your models here.

class CustomerDtl(admin.ModelAdmin):
    list_display = ('id', 'full_name', 'phone_number', 'email', 'address', 'created_at', 'updated_at')
admin.site.register(Customer,CustomerDtl)

class OwnerDtl(admin.ModelAdmin):
    list_display = ('id', 'name', 'phone', 'mail', 'password', 'created_at', 'updated_at')
admin.site.register(Owner,OwnerDtl)

class ShopDtl(admin.ModelAdmin):
    list_display = ('id', 'shop_name', 'shop_label', 'shop_phone', 'shop_mail', 'lat', 'lng', 'created_at', 'updated_at')
admin.site.register(Shop,ShopDtl)