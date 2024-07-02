import { useEffect, useState } from "react";
import { getAllServiciosimpresionorg } from "../../../api/serviciosimpresionorg.api";
import { Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Box } from '@mui/material'
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Link } from 'react-router-dom';

export function ServiciosimpresionorgPage() {

    const [serviciosimpresionorg, setServiciosimpresionorg] = useState([])
    serviciosimpresionorg.sort((a,b) => {
        return a.id - b.id; 
    });
    
    useEffect(() => { //este useEffect se va a ejecutar en cuanto cargue la pagina, entonces simplemente hay que refrescar la página para que pida los datos.
        async function loadServiciosimpresionorg() {
            const res = await getAllServiciosimpresionorg();   //loadServicios llama al getAllservicios, que es la función que pide al Backend por medio de la API
            console.log(res); //res es un objeto que tiene la respuesta completa entregada por Axios, nosotros sólo queremos los datos
            setServiciosimpresionorg(res.data);  //guardamos los datos usando useState
        }
        loadServiciosimpresionorg();  //useEffect(se ejecuta cada vez que se carga la pagina) llama a LoadServicios
    }, [])
    return <div>
        <Box sx={{ flexGrow: 1 }}>
        <Button variant="contained" component={Link} to="/serviciosimpresionorg-create" size="large" startIcon={<AddCircleIcon />}>
            Nuevo servicio de impresión
        </Button>
        </Box>
        <br/>
        <TableContainer >
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Servicio de Impresión</TableCell>
                        <TableCell>Valor ML</TableCell>
                        <TableCell>Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {serviciosimpresionorg.sort().map(servicioimpresionorg => (
                        <TableRow key={servicioimpresionorg.id}>
                            <TableCell>{servicioimpresionorg.id}</TableCell>
                            <TableCell>{servicioimpresionorg.nombre_servicio_impresion_organizacion}</TableCell>
                            <TableCell>{servicioimpresionorg.valor_metro_lineal}</TableCell>
                            <TableCell >
                                <Button variant="contained" component={Link} to={'/serviciosimpresionorg/'+servicioimpresionorg.id}>Editar</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>

    </div>;
}