import React from 'react';
import { Card, CardContent, CardMedia, Typography, Grid, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Impresiones from "../../images/Impresiones.png";
import Ploteos from "../../images/Ploteos.png";
import Comestibles from "../../images/Comestibles.jpg";
import Pellet from "../../images/Pellet.png";
import Estampados from "../../images/Estampados.png";
import Documentos from "../../images/Documentos.png";
import Asistencia from "../../images/Asistencia.png";
import Sanitizacion from "../../images/Sanitizacion.png";

function Servicios() {
    const servicios = [
      { titulo: 'Impresiones', descripcion: 'Ofrecemos servicios de impresión de alta calidad, incluyendo Ploteos y Anillados.', imagen: Impresiones, ruta: '/impresiones'},
      { titulo: 'Productos Ideal', descripcion: 'Variedad de productos comestibles de calidad.', imagen: Comestibles, ruta: '/productos-ideal' },
      { titulo: 'Pellet', descripcion: 'Venta de pellet para estufas y calderas.', imagen: Pellet, ruta: '/pellet' },
      { titulo: 'Publicidad', descripcion: 'Ofrecemos una amplia gama de opciones de estampado para satisfacer las necesidades de nuestros clientes.', imagen: Estampados, ruta: '/publicidad' },
    ];
  
    return (
      <Grid container spacing={3}>
        {servicios.map((servicio, index) => (
          <Grid item xs={12} sm={12} md={3} key={index} margin={'auto'}>
            <Card sx={{padding:1}} style={{backgroundColor:'#C99C33'}} >
              <CardMedia
                component="img"
                height="300"
                image={servicio.imagen}
                alt={servicio.titulo}
                style={{ objectFit: 'contain' }}
              />
              <CardContent style={{height : 200}}>
                <Typography variant="h5" component="div">
                  {servicio.titulo}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {servicio.descripcion}
                </Typography>
              </CardContent>
              <Button 
                variant="contained" 
                component={Link} 
                to={servicio.ruta}
                style={{backgroundColor: '#271805'}} 
                fullWidth
              >
                Ver disponibilidad
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  }
  
export default Servicios;
  