# Generated by Django 4.2.6 on 2023-12-09 05:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('seller', '0006_order_ob_id_alter_order_code'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='customer_phone',
            field=models.CharField(blank=True, max_length=15, null=True),
        ),
    ]
