from rest_framework import serializers
from .models import Customer, Owner, Shop

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
        
class OwnerSerial(serializers.ModelSerializer):
    class Meta:
        model = Owner
        fields = "__all__"


class OwnerMailCheck(serializers.Serializer):
    mail = serializers.CharField(max_length=17)

    def validate_mail(self, value):
        try:
            owner = Owner.objects.get(mail=value)
            return owner.mail  # Returning just the mail if it exists
        except Owner.DoesNotExist:
            raise serializers.ValidationError("Owner with this mail does not exist.")


class OwnerSignin(serializers.Serializer):
    mail = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        mail = data.get('mail')
        password = data.get('password')

        if not mail or not password:
            raise serializers.ValidationError("Both mail and password are required.")

        try:
            owner = Owner.objects.get(mail=mail, password=password)
            return owner
        except Owner.DoesNotExist:
            raise serializers.ValidationError("Account not found, please check mail or password")

class ShopSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shop
        fields = '__all__'

class ShopEditSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shop
        fields = ['shop_name', 'shop_id', 'shop_phone', 'shop_label', 'shop_place']