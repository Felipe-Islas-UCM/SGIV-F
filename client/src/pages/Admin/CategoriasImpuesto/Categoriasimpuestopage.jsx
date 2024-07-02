import { useEffect, useState } from "react";
import { getAllCategoriasimpuesto } from "../../../api/categoriasimpuesto.api";
import { Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Box } from '@mui/material'
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Link } from 'react-router-dom';

export function CategoriasimpuestoPage() {

    const [categoriasimpuesto, setCategoriasimpuesto] = useState([])
    categoriasimpuesto.sort((a,b) => {
        return a.id - b.id; 
    });
    
    useEffect(() => { //este useEffect se va a ejecutar en cuanto cargue la pagina, entonces simplemente hay que refrescar la página para que pida los datos.
        async function loadCategoriasimpuesto() {
            const res = await getAllCategoriasimpuesto();   //loadServicios llama al getAllservicios, que es la función que pide al Backend por medio de la API
            console.log(res); //res es un objeto que tiene la respuesta completa entregada por Axios, nosotros sólo queremos los datos
            setCategoriasimpuesto(res.data);  //guardamos los datos usando useState
        }
        loadCategoriasimpuesto();  //useEffect(se ejecuta cada vez que se carga la pagina) llama a LoadServicios
    }, [])
    return <div>
        <Box sx={{ flexGrow: 1 }}>
        <Button variant="contained" component={Link} to="/categoriasimpuesto-create" size="large" startIcon={<AddCircleIcon />}>
            Nueva categoria impuesto
        </Button>
        </Box>
        <br/>
        <TableContainer >
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Categoria de impuesto</TableCell>
                        <TableCell>Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {categoriasimpuesto.sort().map(categoriaimpuesto => (
                        <TableRow key={categoriaimpuesto.id}>
                            <TableCell>{categoriaimpuesto.id}</TableCell>
                            <TableCell>{categoriaimpuesto.nombre_categoria_impuesto}</TableCell>
                            <TableCell >
                                <Button variant="contained" component={Link} to={'/categoriasimpuesto/'+categoriaimpuesto.id}>Editar</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>

    </div>;
}