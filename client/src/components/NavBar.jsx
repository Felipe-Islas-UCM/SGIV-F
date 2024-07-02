import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import { Link, useLocation } from 'react-router-dom';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import WorkIcon from '@mui/icons-material/Work';
import HomeIcon from '@mui/icons-material/Home';
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DescriptionIcon from '@mui/icons-material/Description';
import MultipleStopIcon from '@mui/icons-material/MultipleStop';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import InventoryIcon from '@mui/icons-material/Inventory';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import CardTravelIcon from '@mui/icons-material/CardTravel';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import PersonIcon from '@mui/icons-material/Person';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';


export default function Navbar(props) {
    const { drawerWidth, content } = props; //propiedades de la NavBar (Ancho de NavBar ; Contenido de la NavBar)
    const location = useLocation();
    const path = location.pathname;

    const [open, setOpen] = React.useState(false);
    console.log(path)
    const changeOpenStatus = () => {
        setOpen(!open);
    };
    //const isHome = path === '/';

    const myDrawer = (
        //<div style={{ display: 'block' }}>
        <div>
            <Toolbar />
            <Box sx={{ overflow: 'auto' }}>
                <List>

                    <ListItem disablePadding>
                        <ListItemButton component={Link} to="/servicios" selected={"/servicios" === path}>
                            <ListItemIcon>
                                <WorkIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Servicios"} />
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding>
                        <ListItemButton component={Link} to="/ventas" selected={"/ventas" === path}>
                            <ListItemIcon>
                                <AttachMoneyIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Ventas"} />
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding>
                        <ListItemButton component={Link} to="/itemsventa" selected={"/itemsventa" === path}>
                            <ListItemIcon>
                                <DescriptionIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Items Venta"} />
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding>
                        <ListItemButton component={Link} to="/proveedores" selected={"/proveedores" === path}>
                            <ListItemIcon>
                                <MultipleStopIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Proveedores"} />
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding>
                        <ListItemButton component={Link} to="/categoriasimpuesto" selected={"/categoriasimpuesto" === path}>
                            <ListItemIcon>
                                <LocalAtmIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Categorias impuesto"} />
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding>
                        <ListItemButton component={Link} to="/productos" selected={"/productos" === path}>
                            <ListItemIcon>
                                <InventoryIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Productos"} />
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding>
                        <ListItemButton component={Link} to="/categoriasproducto" selected={"/categoriasproducto" === path}>
                            <ListItemIcon>
                                <Inventory2Icon />
                            </ListItemIcon>
                            <ListItemText primary={"Categorias producto"} />
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding>
                        <ListItemButton component={Link} to="/metodospago" selected={"/metodospago" === path}>
                            <ListItemIcon>
                                <AccountBalanceWalletIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Métodos de pago"} />
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding>
                        <ListItemButton component={Link} to="/organizaciones" selected={"/organizaciones" === path}>
                            <ListItemIcon>
                                <CorporateFareIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Organizaciones"} />
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding>
                        <ListItemButton component={Link} to="/ventasorg" selected={"/ventasorg" === path}>
                            <ListItemIcon>
                                <CardTravelIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Ventas organización"} />
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding>
                        <ListItemButton component={Link} to="/itemsventaorg" selected={"/itemsventaorg" === path}>
                            <ListItemIcon>
                                <DescriptionIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Items Ventas organización"} />
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding>
                        <ListItemButton component={Link} to="/serviciosimpresionorg" selected={"/serviciosimpresionorg" === path}>
                            <ListItemIcon>
                                <LocalPrintshopIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Servicios Impresión"} />
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding>
                        <ListItemButton component={Link} to="/usuarios" selected={"/usuarios" === path}>
                            <ListItemIcon>
                                <PersonIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Usuarios"} />
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding>
                        <ListItemButton component={Link} to="/tiposusuario" selected={"/tiposusuario" === path}>
                            <ListItemIcon>
                                <AccountBoxIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Tipos de Usuario"} />
                        </ListItemButton>
                    </ListItem>


                    <ListItem disablePadding>
                        <ListItemButton component={Link} to="/reports" selected={"/reports" === path}>
                            <ListItemIcon>
                                <AssignmentTurnedInIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Reportes"} />
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding>
                        <ListItemButton component={Link} to="/home" selected={"/home" === path}>
                            <ListItemIcon>
                                <HomeIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Home"} />
                        </ListItemButton>
                    </ListItem>

                </List>
            </Box>

        </div>
    )

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <IconButton
                        color='inherit'
                        sx={{ mr: 2, display: { sm: "none" } }}
                        onClick={changeOpenStatus}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Comercial Pewen - CRUD
                    </Typography>
                </Toolbar>
            </AppBar>

            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: "none", sm: "block" },
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                }}
            >
                {myDrawer}
            </Drawer>

            <Drawer
                variant="temporary"
                open={open}
                onClose={changeOpenStatus}
                sx={{
                    display: { xs: "block", sm: "none" },
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                }}
            >
                {myDrawer}
            </Drawer>


            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                {content}
            </Box>
        </Box>
    );
}