import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

function ProductCard({ name, inStock, stockCount, price }) {
  return (
    <Card sx={{ minWidth: 275, m: 2 }} style={{backgroundColor: '#C99C33' }}>
      <CardContent>
        <h2 component="div">
          {name}
        </h2>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
          <Box
            sx={{
              width: 20,
              height: 20,
              borderRadius: '50%',
              backgroundColor: inStock ? 'green' : 'red',
              mr: 1
            }}
          />
          <h3 color="text.secondary">
            {inStock ? 'En stock' : 'Sin stock'}
          </h3>
        </Box>
        <h3 sx={{ mt: 1 }}>
          Stock disponible: {stockCount}
        </h3>
        <h3 sx={{ mt: 1 }}>
          Precio: ${price}
        </h3>
      </CardContent>
    </Card>
  );
}

export default ProductCard;
