import React from 'react';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }) => { 
    const token = localStorage.getItem('token'); // Obtiene el token almacenado en localStorage
    if (!token) {
        //Si no hay token almacenado, redirige al usuario a la página de inicio de sesión
        return <Navigate to="/login" replace />;
    }
    // Si hay un token almacenado, muestra el contenido de la ruta protegida
    return children;
};