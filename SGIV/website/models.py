
from django.db import models

from django.core.validators import RegexValidator
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

solo_letras_validator = RegexValidator( #Se crea la instancia RagexValidator importada de la libreria
    regex='^[A-Za-z ]+$', #Contiene la expresion utilizada para validar la cadena, en este caso que se solo se admitan mayusculas, minusculas y espacios en blanco
    message=_('Este campo solo acepta letras y espacios.'), #mensaje de error si la validacion falla 
    code='invalid_letras' #Identifica el tipo de error
)
rut_validator = RegexValidator( 
    regex=r'^\d{1,8}-[1-9kK]$', #Se admiten numeros RUT mas cortos de lo normal, en caso de que el rut ingresado sea mas corto, y el numero rutificador de 1 al 9 y la K
    message='Formato de RUT no válido. Utilice un formato como 12345678-9.',
    code='invalid_rut'
)

class CategoriaImpuesto(models.Model):
    nombre_categoria_impuesto = models.CharField(unique=True,max_length=50,blank=False,null=False,validators=[solo_letras_validator]) 
    #AutoField Clave primaria autoincremental, unique es para que el dato del campo sea unico 
    #Cada atributo del modelo representa un campo de la base de datos.
    def __str__(self): #Aqui el objetivo de self es hacer referencia al objeto que se esta manipulando
        return(f"{self.nombre_categoria_impuesto}") # Asi veremos los datos que queremos ver en el administrador

    class Meta:
        verbose_name_plural = "CategoriasImpuestos"


class CategoriaProducto(models.Model): 
    nombre_categoria_producto = models.CharField(unique=True,max_length=50,blank=False,null=False,validators=[solo_letras_validator]) 

    def __str__(self):
        return(f"{self.nombre_categoria_producto}")

    class Meta:
        verbose_name_plural = "CategoriasProductos"



class MetodoPago(models.Model):
    nombre_metodo_pago = models.CharField(unique=True,max_length=20,null=False,blank=False,validators=[solo_letras_validator]) 

    def __str__(self):
        return(f"{self.nombre_metodo_pago}")

    class Meta:
        verbose_name_plural = "MetodosPago"


class Organizacion(models.Model):
    nombre_organizacion = models.CharField(unique=True,max_length=100,blank=False,null=False,validators=[solo_letras_validator]) 

    def __str__(self):
        return(f"{self.nombre_organizacion}")

    class Meta:
        verbose_name_plural = "Organizaciones"

class Proveedor(models.Model):
    nombre_empresa = models.CharField(unique=True,max_length=50,blank=False,null=False,validators=[solo_letras_validator]) 
    rut_proveedor = models.CharField(unique=True,max_length=12,blank=False,null=False,validators=[rut_validator]) 

    def __str__(self):
        return(f"{self.nombre_empresa}")

    class Meta:
        verbose_name_plural = "Proveedores"


class Producto(models.Model):
    referencia = models.PositiveIntegerField(unique=True)
    nombre_producto = models.CharField(unique=True,max_length=40,blank=False,null=False) 
    cod_barra_producto = models.CharField(unique=True,max_length=85)
    stock = models.IntegerField() 
    precio_venta_mas_impuesto = models.IntegerField() 
    precio_neto = models.IntegerField() 
    estado_en_stock = models.BooleanField() 
    fk_categoria_impuesto = models.ForeignKey(CategoriaImpuesto, models.DO_NOTHING) 
    fk_categoria_producto = models.ForeignKey(CategoriaProducto, models.DO_NOTHING) 
    fk_proveedor = models.ForeignKey(Proveedor, models.DO_NOTHING) 

    def __str__(self):
        return(f"{self.nombre_producto}")

    class Meta:
        verbose_name_plural = "Productos"

class Servicio(models.Model):
    nombre_servicio = models.CharField(unique=True,max_length=50,blank=False,null=False,validators=[solo_letras_validator]) 

    def __str__(self):
        return(f"{self.nombre_servicio}")

    class Meta:
        verbose_name_plural = "Servicios"


class ServicioImpresionOrganizacion(models.Model):
    nombre_servicio_impresion_organizacion = models.CharField(unique=True,max_length=50,blank=False,null=False) 
    valor_metro_lineal = models.IntegerField() 

    def __str__(self):
        return(f"{self.nombre_servicio_impresion_organizacion}")

    class Meta:
        verbose_name_plural = "ServiciosImpresionOrganizaciones"


class TipoUsuario(models.Model):
    nombre_tipo_usuario = models.CharField(unique=True,max_length=50,blank=False,null=False,validators=[solo_letras_validator]) 

    def __str__(self):
        return(f"{self.nombre_tipo_usuario}")

    class Meta:
        verbose_name_plural = "TiposUsuarios"


#Es un administrador personalizado para el modelo Usuario.
class UsuarioManager(BaseUserManager):
    #Crea y guarda un usuario en la base de datos
    def create_user(self, nombre_usuario, contrasena_usuario, fk_tipo_usuario, is_active=True, password=None):
        if not nombre_usuario:
            raise ValueError('El usuario debe tener un nombre de usuario')
        
        user = self.model(
            nombre_usuario=nombre_usuario,
            fk_tipo_usuario=fk_tipo_usuario,
            is_active=is_active,
        )
        user.set_password(contrasena_usuario if contrasena_usuario else password) #Encripta y guarda la contraaseña del usuario
        user.save(using=self._db) #guarda al usuario en la BD
        return user #retorna el usuario creaado

class Usuario(AbstractBaseUser): #Define un sistema de autenticacion personalizado
    nombre_usuario = models.CharField(unique=True, max_length=50, blank=False, null=False)
    contrasena_usuario = models.CharField(max_length=128, blank=False, null=False)
    fk_tipo_usuario = models.ForeignKey('TipoUsuario', on_delete=models.DO_NOTHING)
    is_active = models.BooleanField(default=True) #indica si la cuenta del usuario esta activa
    last_login = models.DateTimeField(null=True, blank=True) 
    
    objects = UsuarioManager()  

    USERNAME_FIELD = 'nombre_usuario' #Especifica que el campo utilizado para el inicio de sesión
    REQUIRED_FIELDS = ['fk_tipo_usuario', 'contrasena_usuario'] #Lista de campos requeridos al crear un usuario mediante el administrador.

    def __str__(self):
        return self.nombre_usuario

    def set_password(self, raw_password):
        self.contrasena_usuario = make_password(raw_password)
        self._password = raw_password

    def check_password(self, raw_password):
        return self.contrasena_usuario == raw_password

    class Meta:
        db_table = 'website_usuarios'
        verbose_name_plural = "Usuarios"



class Venta(models.Model):
    fk_servicio = models.ForeignKey(Servicio, models.DO_NOTHING) 
    fk_metodo_pago = models.ForeignKey(MetodoPago, models.DO_NOTHING) 
    fk_usuario = models.ForeignKey(Usuario, models.DO_NOTHING)
    fecha_venta = models.DateTimeField(auto_now=True) 
    importe = models.IntegerField()

    def __str__(self):
        return(f"Venta {self.id}")

    class Meta:
        verbose_name_plural = "Ventas"


class ItemVenta(models.Model):
    cantidad_vendida = models.IntegerField() 
    precio_unitario = models.IntegerField() 
    importe = models.IntegerField() 
    fk_cod_venta = models.ForeignKey(Venta, models.DO_NOTHING) 
    fk_cod_producto = models.ForeignKey(Producto, models.DO_NOTHING) 

    def __str__(self):
        return(f"Item Venta {self.id}")
    
    class Meta:
        verbose_name_plural = "ItemsVentas"


class VentaOrganizacion(models.Model):
    fk_organizacion = models.ForeignKey(Organizacion, models.DO_NOTHING) 
    proyecto_ventas_organizacion = models.CharField(max_length=50,blank=False,null=False) 
    solicitante_ventas_organizacion = models.CharField(max_length=50,blank=False,null=False) 
    fk_cod_venta = models.ForeignKey(Venta, models.DO_NOTHING) 
    importe_total = models.IntegerField()

    def __str__(self):
        return(f"Venta Organización {self.id}")

    class Meta:
        verbose_name_plural = "VentasOrganizacion"

class ItemVentaOrganizacion(models.Model):
    fk_servicio_impresion_organizacion = models.ForeignKey(ServicioImpresionOrganizacion, models.DO_NOTHING) 
    fk_venta_organizacion = models.ForeignKey(VentaOrganizacion, models.DO_NOTHING)
    medidas_ventas_organizacion = models.DecimalField(max_digits=3,decimal_places=1,blank=False,null=False) 
    cantidad_vendida = models.IntegerField() 
    importe_item_venta_organizacion = models.IntegerField()

    def __str__(self):
        return(f"Venta Organización {self.id}")

    class Meta:
        verbose_name_plural = "VentasOrganizacion"


##########################
#Auto_now
#https://docs.djangoproject.com/en/4.2/ref/models/fields/#django.db.models.DateField
###########################
#Automatically set the field to now every time the object is saved. Useful for “last-modified” timestamps. Note that the current date is always used; it’s not just a default value that you can override.
#The field is only automatically updated when calling Model.save(). The field isn’t updated when making updates to other fields in other ways such as QuerySet.update(), though you can specify a custom value for the field in an update like that.
##########################