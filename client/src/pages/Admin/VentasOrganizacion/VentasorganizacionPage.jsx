import { useEffect, useState } from "react";
import { getAllVentasorg } from "../../../api/ventasorganizacion.api";
import { Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Box } from '@mui/material'
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Link } from 'react-router-dom';

export function VentasorganizacionPage() {

    const [ventasorg, setVentasorg] = useState([])
    ventasorg.sort((a,b) => {
        return a.id - b.id; 
    });
    
    useEffect(() => { //este useEffect se va a ejecutar en cuanto cargue la pagina, entonces simplemente hay que refrescar la página para que pida los datos.
        async function loadVentasorg() {
            const res = await getAllVentasorg();   //loadServicios llama al getAllservicios, que es la función que pide al Backend por medio de la API
            console.log(res); //res es un objeto que tiene la respuesta completa entregada por Axios, nosotros sólo queremos los datos
            setVentasorg(res.data);  //guardamos los datos usando useState
        }
        loadVentasorg();  //useEffect(se ejecuta cada vez que se carga la pagina) llama a LoadServicios
    }, [])
    return <div>
        <Box sx={{ flexGrow: 1 }}>
        <Button variant="contained" component={Link} to="/ventasorg-create" size="large" startIcon={<AddCircleIcon />}>
            Nueva venta organización
        </Button>
        </Box>
        <br/>
        <TableContainer >
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>N° Venta</TableCell>
                        <TableCell>Organización</TableCell>
                        <TableCell>Solicitante</TableCell>
                        <TableCell>Proyecto</TableCell>
                        <TableCell>Importe</TableCell>
                        <TableCell>Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {ventasorg.sort().map(ventaorg => (
                        <TableRow key={ventaorg.id}>
                            <TableCell>{ventaorg.id}</TableCell>
                            <TableCell>{ventaorg.fk_cod_venta}</TableCell>
                            <TableCell>{ventaorg.organizacion.nombre_organizacion}</TableCell>
                            <TableCell>{ventaorg.solicitante_ventas_organizacion}</TableCell>
                            <TableCell>{ventaorg.proyecto_ventas_organizacion}</TableCell>
                            <TableCell>{ventaorg.importe_total}</TableCell>
                            <TableCell >
                                <Button variant="contained" component={Link} to={'/ventasorg/'+ventaorg.id}>Editar</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>

    </div>;
}