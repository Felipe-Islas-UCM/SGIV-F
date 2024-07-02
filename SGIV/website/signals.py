# signals.py
from django.db.models.signals import post_save, post_delete, pre_save, pre_delete
from django.dispatch import receiver
from .models import ItemVenta, Venta, Producto, ItemVentaOrganizacion, VentaOrganizacion , ServicioImpresionOrganizacion
from django.core.exceptions import ValidationError



# ------------ LÓGICA ITEMVENTA-PRODUCTO --------------------------

@receiver(pre_save, sender=ItemVenta)
def pre_save_item_venta(sender, instance, **kwargs):
    # Obtener el precio del producto asociado
    try:
        precio_producto = instance.fk_cod_producto.precio_venta_mas_impuesto
    except Producto.DoesNotExist:
        precio_producto = 0

    # Asignar el precio_unitario y calcular el importe
    instance.precio_unitario = precio_producto
    instance.importe = instance.cantidad_vendida * precio_producto

    # Verificar si hay suficiente stock para la venta
    if instance.cantidad_vendida > instance.fk_cod_producto.stock:
        raise ValueError("La cantidad vendida supera el stock disponible")

    # Actualizar el stock del producto
    instance.fk_cod_producto.stock -= instance.cantidad_vendida

    # Actualizar el estado de stock del producto
    if instance.fk_cod_producto.stock == 0:
        instance.fk_cod_producto.estado_en_stock = False

@receiver(post_save, sender=ItemVenta)
def post_save_item_venta(sender, instance, **kwargs):
    # Guardar el producto actualizado
    instance.fk_cod_producto.save()

@receiver(pre_delete, sender=ItemVenta)
def pre_delete_item_venta(sender, instance, **kwargs):
    # Devolver el stock al cancelar la venta
    instance.fk_cod_producto.stock += instance.cantidad_vendida

    # Actualizar el estado de stock del producto
    if instance.fk_cod_producto.stock > 0:
        instance.fk_cod_producto.estado_en_stock = True

@receiver(post_delete, sender=ItemVenta)
def post_delete_item_venta(sender, instance, **kwargs):
    # Guardar el producto actualizado
    instance.fk_cod_producto.save()


# ------------ LÓGICA VENTA-ITEMVENTA --------------------------
def actualizar_importe_venta(venta):
    total_importe = sum(item.importe for item in venta.itemventa_set.all())
    venta.importe = total_importe
    venta.save()

@receiver(post_save, sender=ItemVenta)
def actualizar_importe_venta_post_save(sender, instance, **kwargs):
    actualizar_importe_venta(instance.fk_cod_venta)

@receiver(post_delete, sender=ItemVenta)
def actualizar_importe_venta_post_delete(sender, instance, **kwargs):
    actualizar_importe_venta(instance.fk_cod_venta)





# ------------ LÓGICA ITEMVENTAORG-SERVICIOIMPRESION --------------------------
@receiver(pre_save, sender=ItemVentaOrganizacion)
def pre_save_item_venta_org(sender, instance, **kwargs):
    # Obtener el precio del servicio asociado
    try:
        valor_ml = instance.fk_servicio_impresion_organizacion.valor_metro_lineal
    except ServicioImpresionOrganizacion.DoesNotExist:
        valor_ml = 0

    # Asignar el precio_unitario y calcular el importe
    #instance.precio_unitario = precio_producto
    instance.importe_item_venta_organizacion = (instance.medidas_ventas_organizacion * valor_ml) * instance.cantidad_vendida


# ------------ LÓGICA VENTAORG-ITEMVENTAORG --------------------------
def actualizar_importe_venta(ventaorg):
    total_importe = sum(item.importe_item_venta_organizacion for item in ventaorg.itemventaorganizacion_set.all())
    ventaorg.importe_total = total_importe
    ventaorg.save()

@receiver(post_save, sender=ItemVentaOrganizacion)
def actualizar_importe_venta_post_save(sender, instance, **kwargs):
    actualizar_importe_venta(instance.fk_venta_organizacion)

@receiver(post_delete, sender=ItemVentaOrganizacion)
def actualizar_importe_venta_post_delete(sender, instance, **kwargs):
    actualizar_importe_venta(instance.fk_venta_organizacion)



# ------------ LÓGICA VENTAORG-VENTA --------------------------

@receiver(post_save, sender=VentaOrganizacion)
def actualizar_importe_venta(sender, instance, **kwargs):
    venta = instance.fk_cod_venta
    venta.importe = instance.importe_total
    venta.save()



# ------------ VALIDACIÓN VENTA -> (ITEMVENTA & VENTAORG) --------------------------


@receiver(pre_save, sender=ItemVenta)
def validar_venta_asociada_itemventa(sender, instance, **kwargs):
    if VentaOrganizacion.objects.filter(fk_cod_venta=instance.fk_cod_venta).exists():
        raise ValidationError("Esta venta ya está asociada a una VentaOrganización.")

@receiver(pre_save, sender=VentaOrganizacion)
def validar_venta_asociada_ventaorganizacion(sender, instance, **kwargs):
    if ItemVenta.objects.filter(fk_cod_venta=instance.fk_cod_venta).exists():
        raise ValidationError("Esta venta ya está asociada a un ItemVenta.")