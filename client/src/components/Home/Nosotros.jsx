import React from 'react';
import { Typography, Grid, Paper } from '@mui/material';

const Nosotros = () => {
  return (
    <Grid container justifyContent="center" sx={{ py: 4 , margin : 'auto' , textAlign: 'center'}}>
      <Paper sx={{ p: 3 ,backgroundColor: '#C99C33'}} >
        <h2 align="center">
          Sobre Nosotros
        </h2>
        <h2 paragraph align="justify">
        "En Comercial Pewen, nos comprometemos a ofrecer soluciones innovadoras y de calidad excepcional que van más allá de las expectativas de nuestros clientes. 
        Nuestra dedicación se centra en la excelencia, aprovechando la creatividad y la precisión para satisfacer las necesidades más exigentes.
        Nos enorgullecemos de ser impulsores del cambio positivo en el mundo. 
        </h2>
        <h2 variant="h5" paragraph align="justify">
        Nuestra misión es liderar el camino al proporcionar soluciones a medida que no solo resuelven problemas, 
        sino que también marcan una diferencia significativa en la vida de las personas. 
        Estamos comprometidos a innovar y contribuir de manera positiva al mundo que nos rodea, abriendo caminos hacia un futuro mejor para todos."
        </h2>
      </Paper>
    </Grid>
  );
};

export default Nosotros;



