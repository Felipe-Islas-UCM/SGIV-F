import { useEffect, useState } from "react";
import { getAllItemsventaorg } from "../../../api/itemsventaorganizacion.api";
import { Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Box } from '@mui/material'
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Link, useLocation } from 'react-router-dom';

export function ItemsVentaOrganizacionPage() {

    const [itemsventaorg, setItemsventaorg] = useState([])
    itemsventaorg.sort((a,b) => {
        return a.id - b.id; 
    });
    
    useEffect(() => { //este useEffect se va a ejecutar en cuanto cargue la pagina, entonces simplemente hay que refrescar la página para que pida los datos.
        async function loadItemsventaorg() {
            const res = await getAllItemsventaorg();   //loadServicios llama al getAllservicios, que es la función que pide al Backend por medio de la API
            console.log(res); //res es un objeto que tiene la respuesta completa entregada por Axios, nosotros sólo queremos los datos
            setItemsventaorg(res.data);  //guardamos los datos usando useState
        }
        loadItemsventaorg();  //useEffect(se ejecuta cada vez que se carga la pagina) llama a LoadServicios
    }, [])
    return <div>
        <Box sx={{ flexGrow: 1 }}>
        <Button variant="contained" component={Link} to="/itemsventaorg-create" size="large" startIcon={<AddCircleIcon />}>
            Nueva Item de Venta Org.
        </Button>
        </Box>
        <br/>
        <TableContainer >
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>N° Venta Org</TableCell>
                        <TableCell>Servicio Impresión</TableCell>
                        <TableCell>Medidas</TableCell>
                        <TableCell>Cantidad</TableCell>
                        <TableCell>Importe</TableCell>
                        <TableCell>Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {itemsventaorg.sort().map(itemventaorg => (
                        <TableRow key={itemventaorg.id}>
                            <TableCell>{itemventaorg.id}</TableCell>
                            <TableCell>{itemventaorg.fk_venta_organizacion}</TableCell>
                            <TableCell>{itemventaorg.servicio_impresion.nombre_servicio_impresion_organizacion}</TableCell>
                            <TableCell>{itemventaorg.medidas_ventas_organizacion}</TableCell>
                            <TableCell>{itemventaorg.cantidad_vendida}</TableCell>
                            <TableCell>{itemventaorg.importe_item_venta_organizacion}</TableCell>
                            <TableCell >
                                <Button variant="contained" component={Link} to={'/itemsventaorg/'+itemventaorg.id}>Editar</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>

    </div>;
}