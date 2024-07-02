from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django import forms
from .models import Servicio

#Creación de formulario Django

#Dentro de widget=forms.TextInput(attrs=) ->attrs son atributos, para darle forma y estilo al input de texto, y en este caso se realizo con Bootstrap
#Pendiente realizar en front también.  

class SignUpForm(UserCreationForm):
    email = forms.EmailField(label="", widget=forms.TextInput(attrs={'class':'form-control','placeholder':'Email'}),required=True) #Campo para emails. Incluye detección de @ entre otras cosas.
    first_name = forms.CharField(label="", max_length="70",widget=forms.TextInput(attrs={'class':'form-control','placeholder':'Nombre'}), required=True) #Campo para caracteres, manejado internamente por Django.
    last_name = forms.CharField(label="", max_length="70",widget=forms.TextInput(attrs={'class':'form-control','placeholder':'Apellido'}), required=True) #Campo para caracteres, manejado internamente por Django.

    class Meta:
        model = User
        fields = ('username','first_name','last_name','email','password1','password2')


    def __init__(self, *args, **kwargs):
          super(SignUpForm, self).__init__(*args, **kwargs)

          self.fields['username'].widget.attrs['class'] = 'form-control'
          self.fields['username'].widget.attrs['placeholder'] = 'Nombre de Usuario'
          self.fields['username'].label = ''
          self.fields['username'].help_text = '<span class="form-text text-muted"><small>Requerido. 150 caracteres o menos. Solo letras, digitos y @/./+/-/_ .</small></span>'

          self.fields['password1'].widget.attrs['class'] = 'form-control'
          self.fields['password1'].widget.attrs['placeholder'] = 'Contraseña'
          self.fields['password1'].label = ''
          self.fields['password1'].help_text = '<ul class="form-text text-muted small"><li>Tu contraseña no puede ser muy similiar a tu otra información personal.</li><li>Tu contraseña debe contener al menos 8 caracteres.</li><li>Tu contraseña no puede ser una contraseña comunmente usada.</li><li>Tu contraseña no puede ser completamente numerica.</li></ul>'

          self.fields['password2'].widget.attrs['class'] = 'form-control'
          self.fields['password2'].widget.attrs['placeholder'] = 'Confirmar Contraseña'
          self.fields['password2'].label = ''
          self.fields['password2'].help_text = '<span class="form-text text-muted"><small>Ingrese la misma contraseña que antes, para verificación.</small></span>'



## Crear Formulario Añadir Servicio
class AddServiceForm(forms.ModelForm):
     nombre_servicio = forms.CharField(required=True,widget=forms.widgets.TextInput(attrs={"placeholder":"Nombre de Servicio","class":"form-control"}),label="")

     class Meta:
        model = Servicio
        exclude = ("user",)
     



    