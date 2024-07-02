# Generated by Django 4.2.6 on 2023-12-13 09:27

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [
        ("website", "0012_alter_producto_nombre_producto"),
    ]

    operations = [
        migrations.AlterField(
            model_name="itemventa",
            name="fk_cod_producto",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE, to="website.producto"
            ),
        ),
        migrations.AlterField(
            model_name="itemventa",
            name="fk_cod_venta",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE, to="website.venta"
            ),
        ),
        migrations.AlterField(
            model_name="producto",
            name="fk_categoria_impuesto",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                to="website.categoriaimpuesto",
            ),
        ),
        migrations.AlterField(
            model_name="producto",
            name="fk_categoria_producto",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                to="website.categoriaproducto",
            ),
        ),
        migrations.AlterField(
            model_name="producto",
            name="fk_proveedor",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE, to="website.proveedor"
            ),
        ),
        migrations.AlterField(
            model_name="usuario",
            name="fk_tipo_usuario",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE, to="website.tipousuario"
            ),
        ),
        migrations.AlterField(
            model_name="venta",
            name="fk_metodo_pago",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE, to="website.metodopago"
            ),
        ),
        migrations.AlterField(
            model_name="venta",
            name="fk_servicio",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE, to="website.servicio"
            ),
        ),
        migrations.AlterField(
            model_name="venta",
            name="fk_ventas_organizacion",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                to="website.ventaorganizacion",
            ),
        ),
        migrations.AlterField(
            model_name="ventaorganizacion",
            name="fk_organizacion",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE, to="website.organizacion"
            ),
        ),
        migrations.AlterField(
            model_name="ventaorganizacion",
            name="fk_servicio_impresion_organizacion",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                to="website.servicioimpresionorganizacion",
            ),
        ),
    ]
