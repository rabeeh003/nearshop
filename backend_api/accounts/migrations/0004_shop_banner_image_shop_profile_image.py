# Generated by Django 4.2.6 on 2023-11-21 05:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0003_shop'),
    ]

    operations = [
        migrations.AddField(
            model_name='shop',
            name='banner_image',
            field=models.ImageField(default='not found', upload_to='shop/banner'),
        ),
        migrations.AddField(
            model_name='shop',
            name='profile_image',
            field=models.ImageField(default='not found', upload_to='shop/profile'),
        ),
    ]
