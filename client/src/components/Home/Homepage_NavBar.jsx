import * as React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { theme } from "../pallete";
import Logo from "./Logo.png"; // Importa tu logo desde la ruta correspondiente
import { Navigate } from 'react-router-dom';


export default function Homepage_Navbar() {
  return (
    <AppBar theme={theme} position="static">
  <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' , backgroundColor: '#C99C33' }}>
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <img src={Logo} alt="Logo de la empresa" style={{ width: 40, marginRight: 10 }} />
      <h2 style={{ margin: 0 }}>
        Comercial Pewen
      </h2>
    </div>
    <Button component={Link} to="/login" color="inherit">Admin</Button>
  </Toolbar>
  </AppBar>
  );
}




