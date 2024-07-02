import { useEffect, useState } from "react";
import { getAllCategoriasproducto } from "../../../api/categoriasproducto.api";
import { Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Box } from '@mui/material'
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Link } from 'react-router-dom';

export function CategoriasproductoPage() {

    const [categoriasproducto, setCategoriasproducto] = useState([])
    categoriasproducto.sort((a,b) => {
        return a.id - b.id; 
    });
    
    useEffect(() => { //este useEffect se va a ejecutar en cuanto cargue la pagina, entonces simplemente hay que refrescar la página para que pida los datos.
        async function loadCategoriasproducto() {
            const res = await getAllCategoriasproducto();   //loadServicios llama al getAllservicios, que es la función que pide al Backend por medio de la API
            console.log(res); //res es un objeto que tiene la respuesta completa entregada por Axios, nosotros sólo queremos los datos
            setCategoriasproducto(res.data);  //guardamos los datos usando useState
        }
        loadCategoriasproducto();  //useEffect(se ejecuta cada vez que se carga la pagina) llama a LoadServicios
    }, [])
    return <div>
        <Box sx={{ flexGrow: 1 }}>
        <Button variant="contained" component={Link} to="/categoriasproducto-create" size="large" startIcon={<AddCircleIcon />}>
            Nueva categoria producto
        </Button>
        </Box>
        <br/>
        <TableContainer >
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Categoria de Producto</TableCell>
                        <TableCell>Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {categoriasproducto.sort().map(categoriaproducto => (
                        <TableRow key={categoriaproducto.id}>
                            <TableCell>{categoriaproducto.id}</TableCell>
                            <TableCell>{categoriaproducto.nombre_categoria_producto}</TableCell>
                            <TableCell >
                                <Button variant="contained" component={Link} to={'/categoriasproducto/'+categoriaproducto.id}>Editar</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>

    </div>;
}