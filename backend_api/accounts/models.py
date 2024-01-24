from django.db import models
from django.core.validators import RegexValidator
import uuid


# customer data
class Customer(models.Model):    
    full_name = models.CharField(max_length=250)
    phone_regex = RegexValidator(regex=r'^\+?1?\d{9,15}$', message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed.")
    phone_number = models.CharField(validators=[phone_regex], max_length=17, unique=True)
    email = models.EmailField( max_length=254, unique=True)
    phone_two = models.CharField(validators=[phone_regex], max_length=17, blank=True)
    address = models.TextField()
    wallet = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.full_name

# owner data
class Owner(models.Model):
    name = models.CharField(max_length=150)
    phone_regex = RegexValidator(regex=r'^\+?1?\d{9,15}$', message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed.")
    phone = models.CharField(validators=[phone_regex], max_length=17, unique=True)
    mail = models.EmailField( max_length=254, unique=True)
    password = models.CharField(max_length=20)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

# shop data
class Shop(models.Model):
    shop_name = models.CharField(max_length=150)
    shop_id = models.CharField(max_length=250,unique=True)
    phone_regex = RegexValidator(regex=r'^\+?1?\d{9,15}$', message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed.")
    shop_phone = models.CharField(validators=[phone_regex], max_length=17, unique=True)
    shop_label = models.CharField(max_length=200)
    shop_place = models.CharField(max_length=200, default='not found')
    shop_mail = models.EmailField( max_length=254, unique=True)
    lat = models.CharField(max_length=250)
    lng = models.CharField(max_length=250)
    banner_image = models.ImageField( upload_to='shop/banner', height_field=None, width_field=None, max_length=None, default="not found")
    profile_image = models.ImageField( upload_to='shop/profile', height_field=None, width_field=None, max_length=None, default="not found")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    shop_owner = models.ForeignKey(Owner, to_field='mail', on_delete=models.CASCADE, default=1)
    password = models.CharField(max_length=10, default='1234')
    email_token = models.UUIDField(default=uuid.uuid4, editable=False)
    is_verified = models.BooleanField(default=False)

    def __str__(self):
        return self.shop_name