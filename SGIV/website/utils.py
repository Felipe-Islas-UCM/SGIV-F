from website.models import Venta, ItemVenta

def disassociate_itemventa_from_venta(venta_id):
    try:
        # Find the Venta instance
        venta_instance = Venta.objects.get(pk=venta_id)

        # Find associated ItemVenta instances
        itemventa_instances = venta_instance.itemventa_set.all()

        # Disassociate ItemVenta instances (set fk_cod_venta to None)
        for itemventa_instance in itemventa_instances:
            itemventa_instance.fk_cod_venta = None
            itemventa_instance.save()

        print(f"Disassociated ItemVenta instances from Venta with ID {venta_id}")
    except Venta.DoesNotExist:
        print(f"Venta with ID {venta_id} does not exist.")
    except Exception as e:
        print(f"Error disassociating ItemVenta instances: {str(e)}")