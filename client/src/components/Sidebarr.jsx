import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li><Link to="/admin/punto-venta">Punto de Venta</Link></li>
        <li><Link to="/admin/reportes">Reportes</Link></li>
        <li><Link to="/admin/control-inventario">Control de Inventario</Link></li>
        {/* Agrega más enlaces según sea necesario */}
      </ul>
    </div>
  );
};

export default Sidebar;