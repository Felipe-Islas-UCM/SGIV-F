import { useEffect, useState } from "react";
import { getAllMetodosPago } from "../../../api/metodospago.api";
import { Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Box } from '@mui/material'
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Link } from 'react-router-dom';

export function MetodospagoPage() {

    const [metodospago, setMetodospago] = useState([])
    metodospago.sort((a,b) => {
        return a.id - b.id; 
    });
    
    useEffect(() => { //este useEffect se va a ejecutar en cuanto cargue la pagina, entonces simplemente hay que refrescar la página para que pida los datos.
        async function loadMetodospago() {
            const res = await getAllMetodosPago();   //loadServicios llama al getAllservicios, que es la función que pide al Backend por medio de la API
            console.log(res); //res es un objeto que tiene la respuesta completa entregada por Axios, nosotros sólo queremos los datos
            setMetodospago(res.data);  //guardamos los datos usando useState
        }
        loadMetodospago();  //useEffect(se ejecuta cada vez que se carga la pagina) llama a LoadServicios
    }, [])
    return <div>
        <Box sx={{ flexGrow: 1 }}>
        <Button variant="contained" component={Link} to="/metodospago-create" size="large" startIcon={<AddCircleIcon />}>
            Nuevo método pago
        </Button>
        </Box>
        <br/>
        <TableContainer >
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Método de pago</TableCell>
                        <TableCell>Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {metodospago.sort().map(metodopago => (
                        <TableRow key={metodopago.id}>
                            <TableCell>{metodopago.id}</TableCell>
                            <TableCell>{metodopago.nombre_metodo_pago}</TableCell>
                            <TableCell >
                                <Button variant="contained" component={Link} to={'/metodospago/'+metodopago.id}>Editar</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>

    </div>;
}