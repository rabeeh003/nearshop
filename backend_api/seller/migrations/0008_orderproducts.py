# Generated by Django 4.2.6 on 2023-12-09 16:49

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0007_shop_password'),
        ('seller', '0007_order_customer_phone'),
    ]

    operations = [
        migrations.CreateModel(
            name='OrderProducts',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('product_count', models.CharField(max_length=8)),
                ('date_time', models.DateTimeField(auto_now_add=True)),
                ('order', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='seller.order')),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='seller.seller_products')),
                ('shop', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='accounts.shop')),
                ('user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='accounts.customer')),
            ],
        ),
    ]
