import { useEffect, useState } from "react";
import { getAllServicios } from "../../../api/servicios.api";
import { Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Box } from '@mui/material'
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Link } from 'react-router-dom';

export function ServiciosPage() {

    const [servicios, setServicios] = useState([])
    servicios.sort((a,b) => {
        return a.id - b.id; 
    });
    
    useEffect(() => { //este useEffect se va a ejecutar en cuanto cargue la pagina, entonces simplemente hay que refrescar la página para que pida los datos.
        async function loadServicios() {
            const res = await getAllServicios();   //loadServicios llama al getAllservicios, que es la función que pide al Backend por medio de la API
            console.log(res); //res es un objeto que tiene la respuesta completa entregada por Axios, nosotros sólo queremos los datos
            setServicios(res.data);  //guardamos los datos usando useState
        }
        loadServicios();  //useEffect(se ejecuta cada vez que se carga la pagina) llama a LoadServicios
    }, [])
    return <div>
        <Box sx={{ flexGrow: 1 }}>
        <Button variant="contained" component={Link} to="/admin/servicios-create" size="large" startIcon={<AddCircleIcon />}>
            Nuevo servicio
        </Button>
        </Box>
        <br/>
        <TableContainer >
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Nombre de Servicio</TableCell>
                        <TableCell>Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {servicios.sort().map(servicio => (
                        <TableRow key={servicio.id}>
                            <TableCell>{servicio.id}</TableCell>
                            <TableCell>{servicio.nombre_servicio}</TableCell>
                            <TableCell >
                                <Button variant="contained" component={Link} to={'/admin/servicios/'+servicio.id}>Editar</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>

    </div>;
}