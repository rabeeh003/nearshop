# Generated by Django 4.2.6 on 2023-11-21 15:10

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0005_shop_shop_place'),
    ]

    operations = [
        migrations.AddField(
            model_name='shop',
            name='shop_owner',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='accounts.owner', to_field='mail'),
        ),
    ]
