import { useEffect, useState } from "react";
import { getAllProductos } from "../../../api/productos.api";
import { Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Box } from '@mui/material'
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Link } from 'react-router-dom';

export function ProductosPage() {

    const [productos, setProductos] = useState([])
    productos.sort((a,b) => {
        return a.id - b.id; 
    });
    
    useEffect(() => { //este useEffect se va a ejecutar en cuanto cargue la pagina, entonces simplemente hay que refrescar la página para que pida los datos.
        async function loadProductos() {
            const res = await getAllProductos();   //loadServicios llama al getAllservicios, que es la función que pide al Backend por medio de la API
            console.log(res); //res es un objeto que tiene la respuesta completa entregada por Axios, nosotros sólo queremos los datos
            setProductos(res.data);  //guardamos los datos usando useState
        }
        loadProductos();  //useEffect(se ejecuta cada vez que se carga la pagina) llama a LoadServicios
    }, [])
    return <div>
        <Box sx={{ flexGrow: 1 }}>
        <Button variant="contained" component={Link} to="/productos-create" size="large" startIcon={<AddCircleIcon />}>
            Nuevo producto
        </Button>
        </Box>
        <br/>
        <TableContainer >
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Referencia</TableCell>
                        <TableCell>Producto</TableCell>
                        <TableCell>Cod.Barra</TableCell>
                        <TableCell>Stock</TableCell>
                        <TableCell>Precio Venta</TableCell>
                        <TableCell>Precio Neto</TableCell>
                        <TableCell>Disponibilidad</TableCell>
                        <TableCell>Impuesto</TableCell>
                        <TableCell>Categoria</TableCell>
                        <TableCell>Proveedor</TableCell>
                        <TableCell>Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {productos.sort().map(producto => (
                        <TableRow key={producto.id}>
                            <TableCell>{producto.id}</TableCell>
                            <TableCell>{producto.referencia}</TableCell>
                            <TableCell>{producto.nombre_producto}</TableCell>
                            <TableCell>{producto.cod_barra_producto}</TableCell>
                            <TableCell>{producto.stock}</TableCell>
                            <TableCell>{producto.precio_venta_mas_impuesto}</TableCell>
                            <TableCell>{producto.precio_neto}</TableCell>
                            <TableCell>{String(producto.estado_en_stock)}</TableCell>
                            <TableCell>{producto.categoria_impuesto.nombre_categoria_impuesto}</TableCell>
                            <TableCell>{producto.categoria_producto.nombre_categoria_producto}</TableCell>
                            <TableCell>{producto.proveedor.nombre_empresa}</TableCell>
                            <TableCell >
                                <Button variant="contained" component={Link} to={'/productos/'+producto.id}>Editar</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>

    </div>;
}