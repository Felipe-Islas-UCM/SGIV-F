import { useEffect, useState } from "react";
import { getAllVentas } from "../../../api/ventas.api";
import { Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Box } from '@mui/material'
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Link, useLocation } from 'react-router-dom';

export function VentasPage() {

    const [ventas, setVentas] = useState([])
    ventas.sort((a,b) => {
        return a.id - b.id; 
    });
    
    useEffect(() => { //este useEffect se va a ejecutar en cuanto cargue la pagina, entonces simplemente hay que refrescar la página para que pida los datos.
        async function loadVentas() {
            const res = await getAllVentas();   //loadServicios llama al getAllservicios, que es la función que pide al Backend por medio de la API
            console.log(res); //res es un objeto que tiene la respuesta completa entregada por Axios, nosotros sólo queremos los datos
            setVentas(res.data);  //guardamos los datos usando useState
        }
        loadVentas();  //useEffect(se ejecuta cada vez que se carga la pagina) llama a LoadServicios
    }, [])
    return <div>
        <Box sx={{ flexGrow: 1 }}>
        <Button variant="contained" component={Link} to="/ventas-create" size="large" startIcon={<AddCircleIcon />}>
            Nueva venta
        </Button>
        </Box>
        <br/>
        <TableContainer >
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Usuario</TableCell>
                        <TableCell>Fecha de Venta</TableCell>
                        <TableCell>Servicio</TableCell>
                        <TableCell>Método de pago</TableCell>
                        <TableCell>Importe</TableCell>
                        <TableCell>Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {ventas.sort().map(venta => (
                        <TableRow key={venta.id}>
                            <TableCell>{venta.id}</TableCell>
                            <TableCell>{venta.usuario.nombre_usuario +" ("+ venta.usuario.tipo_usuario.nombre_tipo_usuario + ") "}</TableCell>
                            <TableCell>{venta.fecha_venta}</TableCell>
                            <TableCell>{venta.servicio.nombre_servicio}</TableCell>
                            <TableCell>{venta.metodo_pago.nombre_metodo_pago}</TableCell>
                            <TableCell>{venta.importe}</TableCell>
                            <TableCell >
                                <Button variant="contained" component={Link} to={'/ventas/'+venta.id}>Editar</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>

    </div>;
}