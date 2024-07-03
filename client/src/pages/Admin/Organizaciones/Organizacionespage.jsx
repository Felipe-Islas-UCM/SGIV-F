import { useEffect, useState } from "react";
import { getAllOrganizaciones } from "../../../api/organizaciones.api";
import { Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Box } from '@mui/material'
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Link } from 'react-router-dom';

export function OrganizacionesPage() {

    const [organizaciones, setOrganizaciones] = useState([])
    organizaciones.sort((a,b) => {
        return a.id - b.id; 
    });
    
    useEffect(() => { //este useEffect se va a ejecutar en cuanto cargue la pagina, entonces simplemente hay que refrescar la página para que pida los datos.
        async function loadOrganizacionees() {
            const res = await getAllOrganizaciones();   //loadServicios llama al getAllservicios, que es la función que pide al Backend por medio de la API
            console.log(res); //res es un objeto que tiene la respuesta completa entregada por Axios, nosotros sólo queremos los datos
            setOrganizaciones(res.data);  //guardamos los datos usando useState
        }
        loadOrganizacionees();  //useEffect(se ejecuta cada vez que se carga la pagina) llama a LoadServicios
    }, [])
    return <div>
        <Box sx={{ flexGrow: 1 }}>
        <Button variant="contained" component={Link} to="/admin/organizaciones-create" size="large" startIcon={<AddCircleIcon />}>
            Nueva organización
        </Button>
        </Box>
        <br/>
        <TableContainer >
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Nombre de Organización</TableCell>
                        <TableCell>Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {organizaciones.sort().map(organizacion => (
                        <TableRow key={organizacion.id}>
                            <TableCell>{organizacion.id}</TableCell>
                            <TableCell>{organizacion.nombre_organizacion}</TableCell>
                            <TableCell >
                                <Button variant="contained" component={Link} to={'/admin/organizaciones/'+organizacion.id}>Editar</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>

    </div>;
}