from django.urls import path, include
from rest_framework.documentation import include_docs_urls
from rest_framework import routers
from . import views
from .views import LoginView

router = routers.DefaultRouter()
router.register(r'categoriasimpuesto',views.CategoriaImpuestoView, 'categoriasimpuesto')
router.register(r'categoriasproducto',views.CategoriaProductoView, 'categoriasproducto')
router.register(r'itemsventaorganizacion',views.ItemVentaOrganizacionView, 'itemsventaorganizacion')
router.register(r'itemsventa',views.ItemVentaView, 'itemsventa')
router.register(r'metodospago',views.MetodoPagoView, 'metodospago')
router.register(r'organizaciones',views.OrganizacionView, 'organizaciones')
router.register(r'proveedores',views.ProveedorView, 'proveedores')
router.register(r'productos',views.ProductoView, 'productos')
router.register(r'servicios',views.ServicioView, 'servicios')
router.register(r'serviciosimpresionorg',views.ServicioImpresionOrganizacionView, 'serviciosimpresionorg')
router.register(r'tiposusuarios',views.TipoUsuarioView, 'tiposusuarios')
router.register(r'usuarios',views.UsuarioView, 'usuarios')
router.register(r'ventas',views.VentaView, 'ventas')
router.register(r'ventasorganizacion',views.VentaOrganizacionView, 'ventasorganizacion')



urlpatterns = [
    path('', views.home, name='home'),
    path('api/v1/',include(router.urls)),
    path('docs/', include_docs_urls(title="SGIV API")),
    ######################################################################################################################
    # DJANGO ONLY APP
    #path('login/',views.login_user, name='login'),    Para usar en caso de que se haga una pagina dedicada para login.
    path('logout/',views.logout_user, name='logout'),
    path('register/',views.register_user, name='register'),
    path('services/',views.check_servicios, name='services'),
    path('service/<int:pk>',views.check_servicio,name='service'),
    path('delete_service/<int:pk>',views.delete_servicio,name='delete_service'),
    path('update_service/<int:pk>',views.update_servicio,name='update_service'),
    path('add_service/',views.add_servicio,name='add_service'),
    path('api/login/', LoginView.as_view(), name='api_login'),
    #####################################################################################################################
]