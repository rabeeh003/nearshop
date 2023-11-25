from django.contrib import admin
from .models import global_productes, category
# Register your models here.

class globalProductesTable(admin.ModelAdmin):
    list_display = ('id', 'product_name', 'product_description', 'weight_type', 'category')
admin.site.register(global_productes, globalProductesTable)

class categoryTable(admin.ModelAdmin):
    list_display = ('id', 'category_name', 'category_image')
admin.site.register(category, categoryTable)