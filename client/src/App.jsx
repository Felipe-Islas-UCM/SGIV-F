import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
//import { DashboardPage } from "./pages/DashboardPage";
import { AboutPage } from "./pages/AboutPage";
import { HomePage } from "./pages/HomePage";
import { Reports } from "./pages/Reports";
import { LoginPage } from './pages/Login/LoginPage';
import { Toaster } from "react-hot-toast";
import Navbar from "./components/NavBar";
//Servicios
import { ServiciosPage } from "./pages/Admin/Servicios/ServiciosPage";
import { ServiciosFormPage } from "./pages/Admin/Servicios/ServiciosFormPage";
//Ventas
import { VentasPage } from './pages/Admin/Ventas/VentasPage';
import { VentasFormPage } from "./pages/Admin/Ventas/VentasFormPage";
//Items venta
import { ItemsventaPage } from "./pages/Admin/Itemsventa/Itemsventapage";
import { ItemsventaFormPage } from "./pages/Admin/Itemsventa/ItemsventaFormPage";
//Items venta organizacion
import { ItemsVentaOrganizacionPage } from './pages/Admin/ItemsVentaOrganizacion/ItemsVentaOrganizacionPage';
import { ItemsVentaOrganizacionFormPage } from './pages/Admin/ItemsVentaOrganizacion/ItemsVentaOrganizacionFormPage';
//Proveedores
import { ProveedoresPage } from "./pages/Admin/Proveedores/Proveedorespage";
import { ProveedoresFormPage } from "./pages/Admin/Proveedores/ProveedoresFormPage";
//Categorias Impuesto
import { CategoriasimpuestoPage } from "./pages/Admin/CategoriasImpuesto/Categoriasimpuestopage";
import { CategoriasimpuestoFormPage } from "./pages/Admin/CategoriasImpuesto/CategoriasimpuestoFormPage";
//Categorias Producto
import { CategoriasproductoPage } from "./pages/Admin/CategoriasProducto/Categoriasproductopage";
import { CategoriasproductoFormPage } from "./pages/Admin/CategoriasProducto/CategoriasproductoFormPage";
//Métodos pago
import { MetodospagoPage } from "./pages/Admin/Metodospago/Metodospagopage";
import { MetodospagoFormPage } from "./pages/Admin/Metodospago/MetodospagoFormPage";
//Organizaciones
import { OrganizacionesPage } from "./pages/Admin/Organizaciones/Organizacionespage";
import { OrganizacionesFormPage } from "./pages/Admin/Organizaciones/OrganizacionesFormPage";
//Ventas organizaciones
import { VentasorganizacionPage } from "./pages/Admin/VentasOrganizacion/VentasorganizacionPage";
import { VentasorgFormPage } from "./pages/Admin/VentasOrganizacion/VentasorganizacionFormPage";
//Servicio Impresión Organizaciones
import { ServiciosimpresionorgPage } from "./pages/Admin/ServiciosImpresionOrg/ServiciosimpresionorgPage";
import { ServiciosimpresionorgFormPage } from "./pages/Admin/ServiciosImpresionOrg/ServiciosimpresionorgFormPage";
//Productos
import { ProductosPage } from "./pages/Admin/Productos/Productospage";
import { ProductosFormPage } from "./pages/Admin/Productos/ProductosFormPage";
//Usuarios
import { UsuariosPage } from "./pages/Admin/Usuarios/UsuariosPage";
import { UsuariosFormPage } from "./pages/Admin/Usuarios/UsuariosFormPage";
//Tiposusuarios
import { TiposusuariosPage } from "./pages/Admin/Tiposusuario/TiposusuarioPage";
import { TiposusuarioFormPage } from "./pages/Admin/Tiposusuario/TiposusuarioFormPage";
//Informes 
import { Reports_venta } from './components/Reportes/Reports_venta';
import { Reports_stock } from './components/Reportes/Reports_stock.';
import { Reports_VentaServicio } from './components/Reportes/Reports_VentaServicio';
import { Reports_VentaOrganizacion } from './components/Reportes/Reports_VentaOrganizacion';
import { Reports_Producto_Mas } from './components/Reportes/Reports_Producto_Mas';



function App() {
  const navWidth = 220  //ancho de la NavBar
  const queryClient = new QueryClient();
  return (
    <div className='App'>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Navbar
            drawerWidth={navWidth}
            content={
              <Routes>
                <Route path="/" element={<Navigate to="/servicios" />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/home" element={<HomePage />} />

                <Route path="/servicios" element={<ServiciosPage />} />
                <Route path="/servicios-create" element={<ServiciosFormPage />} />
                <Route path="/servicios/:id" element={<ServiciosFormPage />} />
                
                <Route path="/ventas" element={<VentasPage/>} />
                <Route path="/ventas-create" element={<VentasFormPage/>} />
                <Route path="/ventas/:id" element={<VentasFormPage />} />
                
                <Route path="/itemsventa" element={<ItemsventaPage/>} />
                <Route path="/itemsventa-create" element={<ItemsventaFormPage/>} />
                <Route path="/itemsventa/:id" element={<ItemsventaFormPage />} />

                <Route path="/itemsventaorg" element={<ItemsVentaOrganizacionPage/>} />
                <Route path="/itemsventaorg-create" element={<ItemsVentaOrganizacionFormPage/>} />
                <Route path="/itemsventaorg/:id" element={<ItemsVentaOrganizacionFormPage />} />

                <Route path="/proveedores" element={<ProveedoresPage/>} />
                <Route path="/proveedores-create" element={<ProveedoresFormPage/>} />
                <Route path="/proveedores/:id" element={<ProveedoresFormPage/>} />

                <Route path="/categoriasimpuesto" element={<CategoriasimpuestoPage/>} />
                <Route path="/categoriasimpuesto-create" element={<CategoriasimpuestoFormPage/>} />
                <Route path="/categoriasimpuesto/:id" element={<CategoriasimpuestoFormPage/>} />

                <Route path="/categoriasproducto" element={<CategoriasproductoPage/>} />
                <Route path="/categoriasproducto-create" element={<CategoriasproductoFormPage/>} />
                <Route path="/categoriasproducto/:id" element={<CategoriasproductoFormPage/>} />

                <Route path="/metodospago" element={<MetodospagoPage/>} />
                <Route path="/metodospago-create" element={<MetodospagoFormPage/>} />
                <Route path="/metodospago/:id" element={<MetodospagoFormPage/>} />

                <Route path="/organizaciones" element={<OrganizacionesPage/>} />
                <Route path="/organizaciones-create" element={<OrganizacionesFormPage/>} />
                <Route path="/organizaciones/:id" element={<OrganizacionesFormPage/>} />

                <Route path="/ventasorg" element={<VentasorganizacionPage/>} />
                <Route path="/ventasorg-create" element={<VentasorgFormPage/>} />
                <Route path="/ventasorg/:id" element={<VentasorgFormPage/>} />

                <Route path="/serviciosimpresionorg" element={<ServiciosimpresionorgPage/>} />
                <Route path="/serviciosimpresionorg-create" element={<ServiciosimpresionorgFormPage/>} />
                <Route path="/serviciosimpresionorg/:id" element={<ServiciosimpresionorgFormPage/>} />

                <Route path="/productos" element={<ProductosPage/>} />
                <Route path="/productos-create" element={<ProductosFormPage/>} />
                <Route path="/productos/:id" element={<ProductosFormPage/>} />

                <Route path="/usuarios" element={<UsuariosPage/>} />
                <Route path="/usuarios-create" element={<UsuariosFormPage/>} />
                <Route path="/usuarios/:id" element={<UsuariosFormPage/>} />

                <Route path="/tiposusuario" element={<TiposusuariosPage/>} />
                <Route path="/tiposusuario-create" element={<TiposusuarioFormPage/>} />
                <Route path="/tiposusuario/:id" element={<TiposusuarioFormPage/>} />

                <Route path="/reports" element={<Reports />} />
                <Route path="/reports/venta" element={<Reports_venta />} />
                <Route path="/reports/stock" element={<Reports_stock />} />
                <Route path="/reports/venta_servicio" element={<Reports_VentaServicio />} />
                <Route path="/reports/venta_organizacion" element={<Reports_VentaOrganizacion />} />
                <Route path="/reports/producto_mas" element={<Reports_Producto_Mas />} />
              </Routes>
            }
          />
          <Toaster />
        </BrowserRouter >
        <ReactQueryDevtools />
      </QueryClientProvider>
    </div>
  );
}
// con :id se declara que ahi ira un valor dinamico
export default App;




//mas adelante vamos a querer <Route path="/" element={<Navigate to="/DashboardPage" />} /> que sera la vista del
// masAdmin/ mas adelante vamos a querer <Route path="/" element={<Navigate to="/HomePage" />} /> que sera la vista de Home para invitados
// y de ella se podra acceder al login que llevara a DashboardPage

