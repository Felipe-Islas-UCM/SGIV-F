import { useEffect, useState } from "react";
import { getAllItemsventa } from "../../../api/itemsventa";
import { Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Box } from '@mui/material'
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Link } from 'react-router-dom';

export function ItemsventaPage() {

    const [itemsventa, setItemsventa] = useState([])
    itemsventa.sort((a,b) => {
        return a.id - b.id; 
    });
    
    useEffect(() => { //este useEffect se va a ejecutar en cuanto cargue la pagina, entonces simplemente hay que refrescar la página para que pida los datos.
        async function loadItemsventa() {
            const res = await getAllItemsventa();   //loadServicios llama al getAllservicios, que es la función que pide al Backend por medio de la API
            console.log(res); //res es un objeto que tiene la respuesta completa entregada por Axios, nosotros sólo queremos los datos
            setItemsventa(res.data);  //guardamos los datos usando useState
        }
        loadItemsventa();  //useEffect(se ejecuta cada vez que se carga la pagina) llama a LoadServicios
    }, [])
    return <div>
        <Box sx={{ flexGrow: 1 }}>
        <Button variant="contained" component={Link} to="/admin/itemsventa-create" size="large" startIcon={<AddCircleIcon />}>
            Nuevo Item venta
        </Button>
        </Box>
        <br/>
        <TableContainer >
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Cantidad Vendida</TableCell>
                        <TableCell>Precio Unitario</TableCell>
                        <TableCell>Importe</TableCell>
                        <TableCell>N° Venta</TableCell>
                        <TableCell>Producto</TableCell>
                        <TableCell>Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {itemsventa.sort().map(itemventa => (
                        <TableRow key={itemventa.id}>
                            <TableCell>{itemventa.id}</TableCell>
                            <TableCell>{itemventa.cantidad_vendida}</TableCell>
                            <TableCell>{itemventa.precio_unitario}</TableCell>
                            <TableCell>{itemventa.importe}</TableCell>
                            <TableCell>{itemventa.fk_cod_venta}</TableCell>
                            <TableCell>{itemventa.producto.nombre_producto}</TableCell>
                            <TableCell >
                                <Button variant="contained" component={Link} to={'/admin/itemsventa/'+itemventa.id}>Editar</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>

    </div>;
}