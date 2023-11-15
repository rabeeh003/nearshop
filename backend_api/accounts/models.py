from django.db import models
from django.core.validators import RegexValidator

# Create your models here.
class Customer(models.Model):    
    full_name = models.CharField(max_length=250)
    phone_regex = RegexValidator(regex=r'^\+?1?\d{9,15}$', message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed.")
    phone_number = models.CharField(validators=[phone_regex], max_length=17, unique=True) # Validators should be a list
    email = models.EmailField( max_length=254, unique=True)
    phone_two = models.CharField(validators=[phone_regex], max_length=17, blank=True)
    address = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.full_name + ' ' + self.phone_number