# Generated by Django 4.2.6 on 2023-10-22 08:26

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("website", "0003_proveedor_producto_fk_proveedor"),
    ]

    operations = [
        migrations.AddField(
            model_name="venta",
            name="importe",
            field=models.IntegerField(default=1),
            preserve_default=False,
        ),
    ]
