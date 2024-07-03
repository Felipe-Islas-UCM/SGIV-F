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
      <Toolbar>
        <IconButton size="large" edge="start" aria-label="menu" sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        <img src={Logo} alt="Logo de la empresa" style={{ width: 40, marginRight: 10 }} /> {/* Agrega tu logo aquí */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Comercial Pewen
        </Typography>
        <Button component={Link} to="/login" color="inherit">Admin</Button>
      </Toolbar>
    </AppBar>
  );
}





