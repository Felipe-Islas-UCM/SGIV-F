import React from 'react';
import { Button, Grid, Paper, Typography, TextField } from '@mui/material';
import Familia from "../../images/Familia.png";

const Administrador = () => {
  // Lógica de acceso a la sección de administrador (si es necesario)

  return (
  <Grid container justifyContent="center" sx={{ py: 4 , margin : '20px' , textAlign: 'center' , backgroundColor : '#271805'}}>
    <link href='https://fonts.googleapis.com/css?family=Poppins' rel='stylesheet' />
      <Grid item xs={6} style={{ display: 'flex', justifyContent: 'center' , backgroundColor: '#C99C33'}}>
        {/* Sección de la foto de los dueños */}
        <Paper elevation={3} style={{ padding: 20 , backgroundColor: '#B58222'}}>
          <h2>Familia Pewen</h2>
          <img src={Familia} alt="Foto de los dueños" style={{ width: '60%', display: 'block', margin: 'auto' }} />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Administrador;

