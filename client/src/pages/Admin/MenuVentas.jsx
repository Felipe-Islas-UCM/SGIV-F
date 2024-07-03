import React from 'react';
import { Grid, Card, CardActionArea, CardContent, CardActions, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

export function MenuVentas() {
  const menuItems1 = [
    { title: 'Ventas', link: '/admin/ventas' },
    { title: 'Items de Venta', link: '/admin/itemsventa' },
    { title: 'Ventas Organizaciones ', link: '/admin/ventasorg' },
    { title: 'Items de Venta Org.', link: '/admin/itemsventaorg' },
  ];
  const menuItems2 = [
    { title: 'Organizaciones', link: '/admin/organizaciones' },
    { title: 'Servicios de Impresión', link: '/admin/serviciosimpresionorg' },
  ];

  return (
    <div>
    <div>
    <Typography variant='h4' padding={2}> Ventas Globales</Typography>
    <Grid container spacing={6}>
      {menuItems1.map(({ title, link }, index) => (
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
    </div>
    <div>
    <Typography variant='h4' padding={2}> Organizaciones</Typography>
    <Grid container spacing={3}>
      {menuItems2.map(({ title, link }, index) => (
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
    </div>
    </div>
  );
}