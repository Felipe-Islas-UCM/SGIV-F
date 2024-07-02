import { useEffect, useState } from "react";
import { getAllProveedores } from "../../../api/proveedores.api";
import { Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Box } from '@mui/material'
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Link } from 'react-router-dom';

export function ProveedoresPage() {

    const [proveedores, setProveedores] = useState([])
    proveedores.sort((a,b) => {
        return a.id - b.id; 
    });
    
    useEffect(() => { //este useEffect se va a ejecutar en cuanto cargue la pagina, entonces simplemente hay que refrescar la página para que pida los datos.
        async function loadProveedores() {
            const res = await getAllProveedores();   //loadServicios llama al getAllservicios, que es la función que pide al Backend por medio de la API
            console.log(res); //res es un objeto que tiene la respuesta completa entregada por Axios, nosotros sólo queremos los datos
            setProveedores(res.data);  //guardamos los datos usando useState
        }
        loadProveedores();  //useEffect(se ejecuta cada vez que se carga la pagina) llama a LoadServicios
    }, [])
    return <div>
        <Box sx={{ flexGrow: 1 }}>
        <Button variant="contained" component={Link} to="/proveedores-create" size="large" startIcon={<AddCircleIcon />}>
            Nuevo proveedor
        </Button>
        </Box>
        <br/>
        <TableContainer >
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Nombre Empresa</TableCell>
                        <TableCell>Rut Proveedor</TableCell>
                        <TableCell>Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {proveedores.sort().map(proveedor => (
                        <TableRow key={proveedor.id}>
                            <TableCell>{proveedor.id}</TableCell>
                            <TableCell>{proveedor.nombre_empresa}</TableCell>
                            <TableCell>{proveedor.rut_proveedor}</TableCell>
                            <TableCell >
                                <Button variant="contained" component={Link} to={'/proveedores/'+proveedor.id}>Editar</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>

    </div>;
}