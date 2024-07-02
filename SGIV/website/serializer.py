from rest_framework import serializers
from .models import *


class CategoriaImpuestoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CategoriaImpuesto
        fields = '__all__'


class CategoriaProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CategoriaProducto
        fields = '__all__'

class ItemVentaSerializer(serializers.ModelSerializer):
    class Meta:
        model = ItemVenta
        fields = '__all__'

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response["producto"]=ProductoSerializer(instance.fk_cod_producto).data
        return response

class MetodoPagoSerializer(serializers.ModelSerializer):
    class Meta:
        model = MetodoPago
        fields = '__all__'

class OrganizacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organizacion
        fields = '__all__'


class ProveedorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Proveedor
        fields = '__all__'

class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = '__all__'

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response["categoria_impuesto"]=CategoriaImpuestoSerializer(instance.fk_categoria_impuesto).data
        response["categoria_producto"]=CategoriaProductoSerializer(instance.fk_categoria_producto).data
        response["proveedor"]=ProveedorSerializer(instance.fk_proveedor).data
        return response


class ServicioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Servicio
        fields = '__all__'


class ServicioImpresionOrganizacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServicioImpresionOrganizacion
        fields = '__all__'
        
class TipoUsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoUsuario
        fields = '__all__'
        
class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = '__all__'

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response["tipo_usuario"]=TipoUsuarioSerializer(instance.fk_tipo_usuario).data
        return response

        
class VentaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Venta
        fields = '__all__'

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response["servicio"]=ServicioSerializer(instance.fk_servicio).data
        #response["venta_organizacion"]=VentaOrganizacionSerializer(instance.fk_ventas_organizacion).data
        response["metodo_pago"]=MetodoPagoSerializer(instance.fk_metodo_pago).data
        response["usuario"]=UsuarioSerializer(instance.fk_usuario).data
        return response
        
class VentaOrganizacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = VentaOrganizacion
        fields = '__all__'

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response["organizacion"]=OrganizacionSerializer(instance.fk_organizacion).data
        return response
        

class ItemVentaOrganizacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ItemVentaOrganizacion
        fields = '__all__'

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response["servicio_impresion"]=ServicioImpresionOrganizacionSerializer(instance.fk_servicio_impresion_organizacion).data
        return response