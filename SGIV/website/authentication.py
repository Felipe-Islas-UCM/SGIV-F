from django.contrib.auth.backends import ModelBackend
from .models import Usuario

#clase de Django que proporciona la funcionalidad básica de autenticación utilizando modelos de usuario.

#permite personalizar el comportamiento de autenticación de Django.
class CustomAuthBackend(ModelBackend):
    def authenticate(self, request, username=None, password=None, **kwargs): #Autenticar a un usuario basado en su nombre de usuario y contraseña
        try:
            user = Usuario.objects.get(nombre_usuario=username) #ntenta obtener un usuario desde la base de datos
            if user.check_password(password): #Si el usuario existe, verifica si la contraseña proporcionada coincide con la contraseña almacenada en la base de datos 
                return user
        except Usuario.DoesNotExist:
            return None

    def get_user(self, user_id): #Este método obtiene un usuario a partir de su ID de usuario 
        try:
            return Usuario.objects.get(pk=user_id)
        except Usuario.DoesNotExist:
            return None