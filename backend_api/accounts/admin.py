from django.contrib import admin
from .models import Customer, Owner, Shop
from django.utils.html import format_html

# Register your models here.

class CustomerDtl(admin.ModelAdmin):
    list_display = ('id', 'full_name', 'phone_number', 'email', 'address', 'created_at', 'updated_at')
admin.site.register(Customer,CustomerDtl)

class OwnerDtl(admin.ModelAdmin):
    list_display = ('id', 'name', 'phone', 'mail', 'password', 'created_at', 'updated_at')
admin.site.register(Owner,OwnerDtl)

class ShopDtl(admin.ModelAdmin):
    list_display = ('id', 'show_logo','shop_name', 'shop_owner', 'shop_label', 'shop_phone', 'shop_mail', 'created_at')

    def show_logo(self, obj):
        return format_html('<img src="{}" width="50" height="50" style="border-radius: 50%" />'.format(obj.profile_image.url) if obj.profile_image else '')

    show_logo.allow_tags = True
    show_logo.short_description = 'Logo'
admin.site.register(Shop,ShopDtl)