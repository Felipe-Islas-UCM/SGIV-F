import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';

export function Reports() {
    return (
      <Box p={4}>
        <Typography variant="h4" gutterBottom>
          Informes Generales
        </Typography>
  
        <Box my={4}>
          <Typography variant="h5" gutterBottom>
            Informe de Ventas
          </Typography>
          <Button variant="contained" component={Link} to="/reports/venta">
            Ir a Informe de Ventas
          </Button>
        </Box>

        <Box my={4}>
          <Typography variant="h5" gutterBottom>
            Informe de Stock
          </Typography>
          <Button variant="contained" component={Link} to="/reports/stock">
            Ir a Informe de Inventario 
          </Button>
        </Box>

        <Box my={4}>
          <Typography variant="h5" gutterBottom>
            Informe Ventas por Organizaciones
          </Typography>
          <Button variant="contained" component={Link} to="/reports/venta_organizacion">
            Ir a Informe de Ventas por Organizaciones
          </Button>
        </Box>

        <Box my={4}>
          <Typography variant="h5" gutterBottom>
          Informe de Ventas por Servicios
          </Typography>
          <Button variant="contained" component={Link} to="/reports/venta_servicio">
            Ir a Informe de Ventas por Servicios
          </Button>
        </Box>

        <Box my={4}>
          <Typography variant="h5" gutterBottom>
          Producto Más Vendido
          </Typography>
          <Button variant="contained" component={Link} to="/reports/producto_mas">
            Ir a Informe de Producto Más Vendido
          </Button>
        </Box>
      </Box>
    );
  }
