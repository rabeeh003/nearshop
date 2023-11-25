from django.db import models

class category(models.Model):
    category_name = models.CharField(max_length=50)
    category_image = models.ImageField( upload_to='product/category', height_field=None, width_field=None, max_length=None, default="not found")
    def __str__(self):
        return self.category_name

class global_productes(models.Model):

    WEIGHT_CHOICES = [
        ('kg', 'Kilogram'),
        ('count', 'Count'),
    ]

    product_name = models.CharField(max_length=250)
    product_description = models.TextField()
    weight_type = models.CharField(max_length=20, choices=WEIGHT_CHOICES)
    category = models.ForeignKey("category", on_delete=models.DO_NOTHING)
    prodect_image = models.ImageField( upload_to='product/images', height_field=None, width_field=None, max_length=None)
    
    def __str__(self):
        return self.product_name