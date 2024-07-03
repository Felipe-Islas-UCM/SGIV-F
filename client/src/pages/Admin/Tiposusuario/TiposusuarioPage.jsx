import { useEffect, useState } from "react";
import { getAllTiposusuario } from "../../../api/tiposusuarios.api";
import { Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Box } from '@mui/material'
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Link } from 'react-router-dom';

export function TiposusuarioPage() {

    const [tiposusuarios, setTiposusuarios] = useState([])
    tiposusuarios.sort((a,b) => {
        return a.id - b.id; 
    });
    
    useEffect(() => { //este useEffect se va a ejecutar en cuanto cargue la pagina, entonces simplemente hay que refrescar la página para que pida los datos.
        async function loadTiposusuarios() {
            const res = await getAllTiposusuario();   //loadServicios llama al getAllservicios, que es la función que pide al Backend por medio de la API
            console.log(res); //res es un objeto que tiene la respuesta completa entregada por Axios, nosotros sólo queremos los datos
            setTiposusuarios(res.data);  //guardamos los datos usando useState
        }
        loadTiposusuarios();  //useEffect(se ejecuta cada vez que se carga la pagina) llama a LoadServicios
    }, [])
    return <div>
        <Box sx={{ flexGrow: 1 }}>
        <Button variant="contained" component={Link} to="/admin/tiposusuario-create" size="large" startIcon={<AddCircleIcon />}>
            Nuevo Tipo de usuario
        </Button>
        </Box>
        <br/>
        <TableContainer >
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Tipo de Usuario</TableCell>
                        <TableCell>Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tiposusuarios.sort().map(tipousuario => (
                        <TableRow key={tipousuario.id}>
                            <TableCell>{tipousuario.id}</TableCell>
                            <TableCell>{tipousuario.nombre_tipo_usuario}</TableCell>
                            <TableCell >
                                <Button variant="contained" component={Link} to={'/admin/tiposusuario/'+tipousuario.id}>Editar</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>

    </div>;
}