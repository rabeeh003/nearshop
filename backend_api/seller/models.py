from django.db import models
from accounts.models import Shop
from prodect.models import global_productes
# Create your models here.
class seller_products(models.Model):

    STATUS_CHOICES = [
        ('avb', 'Available'),
        ('out', 'Out of Stoke'),
    ]

    shop_id = models.ForeignKey(Shop, on_delete=models.CASCADE)
    product_id = models.ForeignKey(global_productes, on_delete=models.CASCADE)
    price = models.IntegerField()
    product_status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='avb')
    added_at = models.DateTimeField(auto_now_add=True)
    edited_at = models.DateTimeField(auto_now=True)
    offer_price = models.IntegerField(blank=True, null=True)
    offer_count = models.CharField(max_length=10, blank=True, null=True)
    offer_start = models.DateField(blank=True, null=True)
    offer_end = models.DateField(blank=True, null=True)

    def __str__(self):  
        return str(self.product_id) 