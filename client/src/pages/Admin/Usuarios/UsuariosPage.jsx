import { useEffect, useState } from "react";
import { getAllUsuarios } from "../../../api/usuarios.api";
import { Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Box } from '@mui/material'
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Link } from 'react-router-dom';

export function UsuariosPage() {

    const [usuarios, setUsuarios] = useState([])
    usuarios.sort((a,b) => {
        return a.id - b.id; 
    });
    
    useEffect(() => { //este useEffect se va a ejecutar en cuanto cargue la pagina, entonces simplemente hay que refrescar la página para que pida los datos.
        async function loadUsuarios() {
            const res = await getAllUsuarios();   //loadServicios llama al getAllservicios, que es la función que pide al Backend por medio de la API
            console.log(res); //res es un objeto que tiene la respuesta completa entregada por Axios, nosotros sólo queremos los datos
            setUsuarios(res.data);  //guardamos los datos usando useState
        }
        loadUsuarios();  //useEffect(se ejecuta cada vez que se carga la pagina) llama a LoadServicios
    }, [])
    return <div>
        <Box sx={{ flexGrow: 1 }}>
        <Button variant="contained" component={Link} to="/admin/usuarios-create" size="large" startIcon={<AddCircleIcon />}>
            Nuevo usuario
        </Button>
        </Box>
        <br/>
        <TableContainer >
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Nombre de Usuario</TableCell>
                        <TableCell>Contraseña Usuario</TableCell>
                        <TableCell>Tipo de Usuario</TableCell>
                        <TableCell>Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {usuarios.sort().map(usuario => (
                        <TableRow key={usuario.id}>
                            <TableCell>{usuario.id}</TableCell>
                            <TableCell>{usuario.nombre_usuario}</TableCell>
                            <TableCell>{usuario.contrasena_usuario}</TableCell>
                            <TableCell>{usuario.tipo_usuario.nombre_tipo_usuario}</TableCell>
                            <TableCell >
                                <Button variant="contained" component={Link} to={'/admin/usuarios/'+usuario.id}>Editar</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>

    </div>;
}