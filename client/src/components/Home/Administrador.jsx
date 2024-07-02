import React from 'react';
import { Button, Grid, Paper, Typography, TextField } from '@mui/material';
import Familia from "../../images/Familia.png";

const Administrador = () => {
  // Lógica de acceso a la sección de administrador (si es necesario)

  return (
  <Grid container justifyContent="center" sx={{ py: 4 , margin : '20px' , textAlign: 'center' , backgroundColor : 'black'}}>
      <Grid item xs={6} style={{ display: 'flex', flexDirection: 'column' }}>
        {/* Sección de acceso al administrador */}
        <Paper elevation={3} style={{ padding: 20 }}>
          <Typography variant="h5">Acceso al Administrador</Typography>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <TextField label="Usuario" variant="outlined" />
            <TextField label="Contraseña" type="password" variant="outlined" />
            <Button variant="contained" color="primary">
              Login
            </Button>
          </div>
        </Paper>
      </Grid>
      <Grid item xs={6} style={{ display: 'flex', justifyContent: 'center' }}>
        {/* Sección de la foto de los dueños */}
        <Paper elevation={3} style={{ padding: 20 }}>
          <Typography variant="h5">Familia Pewen</Typography>
          <img src={Familia} alt="Foto de los dueños" style={{ width: '60%', display: 'block', margin: 'auto' }} />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Administrador;

