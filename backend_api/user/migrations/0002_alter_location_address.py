# Generated by Django 4.2.6 on 2023-12-05 09:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='location',
            name='address',
            field=models.TextField(null=True),
        ),
    ]
