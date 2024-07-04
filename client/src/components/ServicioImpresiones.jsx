import React, { useEffect, useState } from 'react';
import { Container, Grid , Button, Link} from '@mui/material';
import ProductCard from './ProductCard';
import { getAllProductos } from '../api/productos.api';

function ServicioImpresiones() {
  const [impresionesProducts, setImpresionesProducts] = useState([]);

  useEffect(() => {
    getAllProductos()
      .then(response => {
        const impresionesProducts = response.data.filter(product => 
          [3, 5, 6, 7].includes(product.categoria_producto.id)
        );
        setImpresionesProducts(impresionesProducts);
      })
      .catch(error => {
        console.error("There was an error fetching the products!", error);
      });
  }, []);

  return (
    <Container>
      <h1>Servicio de Impresiones</h1>
      <Grid container spacing={2}>
        {impresionesProducts.map(product => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <ProductCard
              name={product.nombre_producto}
              inStock={product.estado_en_stock}
              stockCount={product.stock}
              price={product.precio_venta_mas_impuesto}
            />
          </Grid>
        ))}
      </Grid>
      <Button 
                variant="contained" 
                component={Link} 
                to={'/home'}
                style={{backgroundColor: '#271805'}} 
                fullWidth
              >
                Volver
              </Button>
    </Container>
  );
}

export default ServicioImpresiones;



