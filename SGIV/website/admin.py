from django.contrib import admin

from .models import CategoriaImpuesto,CategoriaProducto,ItemVenta,MetodoPago,Organizacion,Proveedor,Producto,Servicio,ServicioImpresionOrganizacion,TipoUsuario,Usuario,Venta,VentaOrganizacion

admin.site.register(CategoriaImpuesto)
admin.site.register(CategoriaProducto)
admin.site.register(ItemVenta)
admin.site.register(MetodoPago)
admin.site.register(Organizacion)
admin.site.register(Producto)
admin.site.register(Proveedor)
admin.site.register(Servicio)
admin.site.register(ServicioImpresionOrganizacion)
admin.site.register(TipoUsuario)
admin.site.register(Usuario)
admin.site.register(Venta)
admin.site.register(VentaOrganizacion)

# Register your models here.
