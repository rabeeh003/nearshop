# Generated by Django 4.2.6 on 2024-01-24 10:31

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0008_customer_wallet'),
    ]

    operations = [
        migrations.AddField(
            model_name='shop',
            name='email_token',
            field=models.UUIDField(default=uuid.uuid4, editable=False),
        ),
        migrations.AddField(
            model_name='shop',
            name='is_verified',
            field=models.BooleanField(default=False),
        ),
    ]
