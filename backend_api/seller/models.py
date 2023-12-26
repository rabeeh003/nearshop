from django.db import models
from accounts.models import Customer
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
    
# _________________ #
#  cart and bill management

class Order(models.Model):
    user = models.ForeignKey(Customer, on_delete=models.SET_NULL, null=True, blank=True)
    shop = models.ForeignKey(Shop, on_delete=models.DO_NOTHING, null=True, blank=True)
    name = models.CharField(max_length=100, default='Undefined')
    status_choices = [
        ('Billed', 'Billed'),
        ('Cart', 'Cart'),
        ('Ordered', 'Ordered'),
        ('Accepted', 'Accepted'),
        ('Reordered', 'Reordered'),
        ('Returned', 'Returned'),
        ('Replace', 'Replace'),
        ('Canceled', 'Canceled'),
        ('Paid', 'Paid'),
        ('Delivered', 'Delivered'),
        ('Completed', 'Completed'),
    ]
    status = models.CharField(max_length=20, choices=status_choices)
    code = models.IntegerField(null=True, blank=True)
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)
    products = models.ManyToManyField(seller_products, related_name='orders', null=True, blank=True)
    total_price = models.IntegerField(null=True, blank=True)
    ob_id = models.CharField(default='0',max_length=20, null=True, blank=True)
    customer_phone = models.CharField(max_length=15,null=True, blank=True)
    location = models.ForeignKey("user.location",on_delete=models.SET_NULL, null=True, blank=True)
    def __str__(self):
        return f"{self.name}"

class Payment(models.Model):
    METHOD_CHOICES = [
        ('Credit Card', 'Credit Card'),
        ('Debit Card', 'Debit Card'),
        ('Razorpay', 'Razorpay'),
        ('Cash on Delivery', 'Cash on Delivery'),
    ]
    STATUS_CHOICES = [
        ('Pending', 'Pending'),
        ('Finished', 'Finished'),
    ]

    method = models.CharField(max_length=20, choices=METHOD_CHOICES)
    date_time = models.DateTimeField(auto_now_add=True)
    updated_time = models.DateTimeField( auto_now=True)
    price = models.FloatField()
    user = models.ForeignKey(Customer, on_delete=models.DO_NOTHING)
    shop = models.ForeignKey(Shop, on_delete=models.DO_NOTHING)
    order = models.ForeignKey(Order, on_delete=models.DO_NOTHING, related_name='payment_orders')
    payment_status = models.CharField(max_length=12, choices=STATUS_CHOICES, default="Pending")
    payment_id =models.CharField( max_length=50, null=True, blank=True)
    
    def __str__(self):
        return f"{self.method} - {self.date_time}"

class Message(models.Model):
    user = models.ForeignKey(Customer, on_delete=models.DO_NOTHING, null=True, blank=True)
    shop = models.ForeignKey(Shop, on_delete=models.DO_NOTHING, null=True, blank=True)
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    text = models.TextField()
    date_time = models.DateTimeField(auto_now_add=True)

class OrderProducts(models.Model):
    user = models.ForeignKey(Customer, on_delete=models.DO_NOTHING, null=True, blank=True)
    shop = models.ForeignKey(Shop, on_delete=models.DO_NOTHING, null=True, blank=True)
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    product = models.ForeignKey(seller_products,on_delete=models.CASCADE)
    product_count = models.CharField( max_length=8)
    date_time = models.DateTimeField(auto_now_add=True)
    count_type = models.CharField( max_length=5, default='kg')
    product_price = models.CharField( max_length=7, null=True, blank=True)
    returned = models.BooleanField( max_length=5, default=False)
    def __str__(self):
        return f"{self.product}"