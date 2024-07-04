from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.authtoken.models import Token
from django.contrib import messages #para mostar mensajes popup cuando se logre hacer un login exitoso, entre otras cosas
from rest_framework import viewsets, status
from rest_framework.response import Response
from .serializer import *
from .models import *
from .utils import disassociate_itemventa_from_venta
##############################################################
# Django Only Code
from .forms import SignUpForm, AddServiceForm
##############################################################

############################################################################
#ModelViewset
#https://www.django-rest-framework.org/api-guide/viewsets/#modelviewset
#https://ilovedjango.com/django/rest-api-framework/views/tips/sub/modelviewset-django-rest-framework/
#Django REST framework allows you to combine the logic for a set of related views in a single class, called a ViewSet. In other frameworks you may also find conceptually similar implementations named something like 'Resources' or 'Controllers'.
#A ViewSet class is simply a type of class-based View, that does not provide any method handlers such as .get() or .post(), and instead provides actions such as .list() and .create().
############################################################################

class CategoriaImpuestoView(viewsets.ModelViewSet):
    serializer_class = CategoriaImpuestoSerializer
    queryset = CategoriaImpuesto.objects.all()

class CategoriaProductoView(viewsets.ModelViewSet): 
    serializer_class = CategoriaProductoSerializer
    queryset = CategoriaProducto.objects.all()

class ItemVentaView(viewsets.ModelViewSet):
    serializer_class = ItemVentaSerializer
    queryset = ItemVenta.objects.all()

class ItemVentaOrganizacionView(viewsets.ModelViewSet):
    serializer_class = ItemVentaOrganizacionSerializer
    queryset = ItemVentaOrganizacion.objects.all()

class MetodoPagoView(viewsets.ModelViewSet):
    serializer_class = MetodoPagoSerializer
    queryset = MetodoPago.objects.all()

class OrganizacionView(viewsets.ModelViewSet):
    serializer_class = OrganizacionSerializer
    queryset = Organizacion.objects.all()

class ProveedorView(viewsets.ModelViewSet):
    serializer_class = ProveedorSerializer
    queryset = Proveedor.objects.all()

class ProductoView(viewsets.ModelViewSet):
    serializer_class = ProductoSerializer
    queryset = Producto.objects.all()

class ServicioView(viewsets.ModelViewSet):
    serializer_class = ServicioSerializer
    queryset = Servicio.objects.all()

class ServicioImpresionOrganizacionView(viewsets.ModelViewSet):
    serializer_class = ServicioImpresionOrganizacionSerializer
    queryset = ServicioImpresionOrganizacion.objects.all()

class TipoUsuarioView(viewsets.ModelViewSet):
    serializer_class = TipoUsuarioSerializer
    queryset = TipoUsuario.objects.all()

class UsuarioView(viewsets.ModelViewSet):
    serializer_class = UsuarioSerializer
    queryset = Usuario.objects.all()

class VentaView(viewsets.ModelViewSet):
    serializer_class = VentaSerializer
    queryset = Venta.objects.all()

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()

        try:
            # Call the disassociation function before deleting the Venta instance
            disassociate_itemventa_from_venta(instance.id)

            # Now, proceed with the deletion
            self.perform_destroy(instance)

            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class VentaOrganizacionView(viewsets.ModelViewSet):
    serializer_class = VentaOrganizacionSerializer
    queryset = VentaOrganizacion.objects.all()



class LoginView(APIView):
    def post(self, request): #Obtiene nombre y contraseña del cuerpo de la request data 
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(request, username=username, password=password) #autentica al usuario con sus credentiales
        if user: #verifica si la autenticacion fue exitosa 
            token, created = Token.objects.get_or_create(user=user) #Si el user es autenticado genera un token de autenticacion o lo obtiene si ya existe
            return Response({'token': token.key}, status=status.HTTP_200_OK) #devuelve una respuesta con el token generado
        return Response({'error': 'Credenciales inválidas'}, status=status.HTTP_400_BAD_REQUEST) #Si falla devuelve mensaje de error
















##########################################################################################################################
#       DJANGO  ONLY APP
#
#       Entendimiento: Cada vez que uno entra a una pagina está haciendo una solicitud(request).Es decir:'Alguien va a una pagina y solicita esa pagina'. 
#       Y en las funciones estamos definiendo que cosa retornar cuando se haga un determinado request.
#       Para todo un proceso de 3 pasos: Vista, Cosa y URL

def home(request):
    #Chequear para ver si están intentando loggearse
    #Si están logeando están haciendo un POST al formulario, de otra forma están haciendo un GET
    if request.method == 'POST':
        username = request.POST['username'] #username porque en el form se le puso nombre de variable 'username'
        password = request.POST['password'] #password porque en el form se le puso el nombre de variable 'password' y ambos los almacenamos en sus variables correspodientes.
        # Autentificación
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            messages.success(request, "Te has loggeado!")
            return redirect('home')
        else:
            messages.success(request, "Hubo un error en el login, por favor intenta nuevamente!")
            return redirect('home')
    #Si no están haciendo un POST, no están mandando nada, entonces les mostramos el home.
    else:
        return render(request, 'home.html', {})


#Si queremos crear una pagina dedicada para el login necesitamos esto, de otra forma, puede ser incorporado directamente a Homepage
#def login_user(request):
#    poner todo el code de home y borrar comentario de urls


def logout_user(request):
    logout(request)
    messages.success(request, "Has hecho un logout...")
    return redirect('home')


def register_user(request):
    if request.method == 'POST':
        form = SignUpForm(request.POST)
        if form.is_valid():
            form.save()
            #Autentificar y login
            username = form.cleaned_data['username']
            password = form.cleaned_data['password1']
            user = authenticate(username=username, password=password)
            login(request, user)
            messages.success(request, "Te has registrado exitosamente! Bienvenido!")
            return redirect('home')
    else:
        form = SignUpForm()
        return render(request, 'register.html', {'form':form})
    
    return render(request, 'register.html', {'form':form})


def check_servicios(request):
    if request.user.is_authenticated:
        #Ver todos los servicios en tabla 'Servicio'
        servicios = Servicio.objects.all()
        return render(request, 'services.html', {'servicios':servicios})
    else:
        messages.success(request, "Debes estar ingresado para ver esto!")
        return redirect('home')

def check_servicio(request,pk):
    if request.user.is_authenticated:
        #Ver servicio con id=pk
        servicio_unico = Servicio.objects.get(id=pk)
        return render(request, 'service.html', {'servicio_unico':servicio_unico})
    else: 
        messages.success(request, "Debes estar ingresado para ver esta pagina!")
        return redirect('home')
    
def delete_servicio(request,pk):
    if request.user.is_authenticated:
        delete_it = Servicio.objects.get(id=pk)
        delete_it.delete()
        messages.success(request, "Servicio eliminado exitosamente!")
        return redirect('services')
    else: 
        messages.success(request, "Debes estar ingresado para ver esta pagina!")
        return redirect('home')
    
def add_servicio(request):
        form = AddServiceForm(request.POST or None)
        if request.user.is_authenticated:
            if request.method == "POST":
                if form.is_valid():
                    add_servicio = form.save()
                    messages.success(request, "Servicio añadido!")
                    return redirect('services')
            return render(request, 'add_service.html', {'form':form})
        else:
            messages.success(request, "Debes estar ingresado para ver esta pagina!")
            return redirect('home')
        
def update_servicio(request, pk):
    if request.user.is_authenticated:
        servicio_actual = Servicio.objects.get(id=pk)
        form = AddServiceForm(request.POST or None, instance=servicio_actual)
        if form.is_valid():
            form.save()
            messages.success(request, "Servicio ha sido actualizado!")
            return redirect('services')
        return render(request, 'update_service.html', {'form':form})
    else:
        messages.success(request, "Debes estar ingresado para ver esta pagina!")
        return redirect('home')



#
##########################################################################################################################


