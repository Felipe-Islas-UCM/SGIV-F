# Generated by Django 4.2.6 on 2023-12-09 21:38

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("website", "0011_alter_categoriaimpuesto_nombre_categoria_impuesto_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="producto",
            name="nombre_producto",
            field=models.CharField(max_length=40, unique=True),
        ),
    ]