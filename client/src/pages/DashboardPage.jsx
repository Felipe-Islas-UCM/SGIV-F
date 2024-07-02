import React from 'react';
import { Routes, Route, useResolvedPath, useLocation } from 'react-router-dom';
//import Sidebar from './Sidebar';
//import PuntoVenta from './PuntoVenta';
//import Reportes from './Reportes';
//import ControlInventario from './ControlInventario';

function DashboardPage () {
  let { path } = useResolvedPath("").pathname;
  //let { path } = useLocation;

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="content">
        <Routes>
          <Route exact path={path}>
            <h1>Bienvenido al Dashboard del Administrador</h1>
          </Route>
          <Route path={`${path}/punto-venta`} element={PuntoVenta} />
          <Route path={`${path}/reportes`} element={Reportes} />
          <Route path={`${path}/control-inventario`} element={ControlInventario} />
          {/* Agrega más rutas según sea necesario */}
        </Routes>
      </div>
    </div>
  );
}

export default DashboardPage;