import React from 'react';
import { Grid, Card, CardActionArea, CardContent, CardActions, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

export function MenuInventario() {
  const menuItems = [
    { title: 'Productos', link: '/admin/productos' },
    { title: 'Proveedores', link: '/admin/proveedores' },
    { title: 'Categorias productos', link: '/admin/categoriasproducto' },
    { title: 'Categorias impuesto', link: '/admin/categoriasimpuesto' }
  ];

  return (
    <Grid container spacing={6}>
      {menuItems.map(({ title, link }, index) => (
        <Grid item xs={12} md={index === 3 ? 4 : 4} key={title}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardActionArea sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div" align="center">
                  {title}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions sx={{ justifyContent: 'center', padding: 2 }}>
              <Button 
                component={Link} 
                to={link} 
                size="medium" 
                color="primary"
              >
                Gestionar
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}