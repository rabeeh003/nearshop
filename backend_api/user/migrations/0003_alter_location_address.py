# Generated by Django 4.2.6 on 2023-12-05 09:35

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0002_alter_location_address'),
    ]

    operations = [
        migrations.AlterField(
            model_name='location',
            name='address',
            field=models.TextField(null=True, validators=[django.core.validators.MinLengthValidator(15)]),
        ),
    ]
