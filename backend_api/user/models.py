from django.db import models
from django.core.validators import MinLengthValidator

# Create your models here.
class location(models.Model):
    location_name = models.CharField( max_length=150)
    address = models.TextField(null=True, validators=[MinLengthValidator(15)])
    customer_id = models.ForeignKey("accounts.Customer", on_delete=models.CASCADE)
    lat = models.CharField(max_length=100) 
    lng = models.CharField(max_length=100)

    def __str__(self):
        return self.location_name