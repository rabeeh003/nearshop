from rest_framework import serializers
from .models import Customer

class CusSignup(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = "__all__"
    
class CusSignin(serializers.Serializer):
    phone_number = serializers.CharField(max_length=17)

    def validate_phone_number(self, value):
        try:
            customer = Customer.objects.get(phone_number=value)
            return customer
        except Customer.DoesNotExist:
            raise serializers.ValidationError("Customer with this phone number does not exist.")