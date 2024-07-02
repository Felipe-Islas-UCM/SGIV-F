import { useEffect, useState } from "react";
import { Form, useForm } from "react-hook-form";
import { createItemventa, getItemventa, deleteItemventa, updateItemventa } from "../../../api/itemsventa";
import { getAllVentas } from "../../../api/ventas.api";
import { getAllProductos } from "../../../api/productos.api";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";
import { toast } from "react-hot-toast";
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import MyNumberedField from "../../../components/forms/MyNumberField";
import MySelectField_Ventas from "../../../components/forms/SelectFields/MySelectField_Ventas";
import MySelectField_Productos from "../../../components/forms/SelectFields/MySelectField_Productos";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';

export function ItemsventaFormPage() {
    const defaultValues = {
        cantidad_vendida: '',
        precio_unitario: '0',
        importe: '0',
        fk_cod_venta: '',
        fk_cod_producto: '',
    }
    const {
        register, //extraemos register de useForm()
        handleSubmit,  //extraemos handleSubmit de useForm()
        formState: { errors }, //extraemos errors de useForm()
        setValue, //parametro setValue me permite meterle valores al formulario
        control
    } = useForm({ defaultValues: defaultValues });

    const navigate = useNavigate()
    const params = useParams()

    const [error, setError] = useState(null); // Agregamos un estado para almacenar el error

    const onSubmitS = handleSubmit(async (data) => {
        try {
            if (params.id) {
                await updateItemventa(params.id, data);
                toast.success('Item de venta actualizado', {
                    position: 'bottom-right',
                    style: {
                        background: '#101010',
                        color: '#fff',
                    },
                });
            } else {
                await createItemventa(data);
                toast.success('Item de venta creado', {
                    position: 'bottom-right',
                    style: {
                        background: '#101010',
                        color: '#fff',
                    },
                });
            }
            navigate('/itemsventa');
        } catch (error) {
            console.error('Error al procesar el formulario:', error);
            setError(error); // Almacenamos el error en el estado local
            //console.log(error.response.data)
            toast.error('Hubo un error al procesar el formulario', {
                position: 'bottom-right',
                style: {
                    background: '#ff3333',
                    color: '#fff',
                },
            });
        }
    });

    //Las diferentes ventas se almacenarán en la variable 'ventas' y esa se le pasará al Select
    const [ventas, setVentas] = useState([])
    //Los diferentes productos se almacenarán en la variable 'productos' y esa se le pasará al Select
    const [productos, setProductos] = useState([])


    useEffect(() => {

        //Sacar la informacion de Venta para rellenar los campos en caso de querer editar una instancia.
        async function loadItemventa() {
            if (params.id) { //si params.id existe
                console.log(params);
                const res = await getItemventa(params.id);
                setValue('cantidad_vendida', res.data.cantidad_vendida)
                setValue('precio_unitario', res.data.precio_unitario)
                setValue('importe', res.data.importe)
                setValue('fk_cod_venta', res.data.fk_cod_venta)
                setValue('fk_cod_producto', res.data.fk_cod_producto)
                // setValue('description', res.data.description) ocuparlo si existieran mas campos que rellenar
            }
        }
        loadItemventa();

        //Sacar la informacion de Ventas para poner en el Select
        async function loadVentas() {
            const res = await getAllVentas();   //loadServicios llama al getAllservicios, que es la función que pide al Backend por medio de la API
            console.log(res.data); //res es un objeto que tiene la respuesta completa entregada por Axios, nosotros sólo queremos los datos
            setVentas(res.data);  //guardamos los datos usando useState
        }
        loadVentas();

        //Sacar la informacion de Productos para poner en el Select
        async function loadProductos() {
            const res = await getAllProductos();   //loadServicios llama al getAllservicios, que es la función que pide al Backend por medio de la API
            console.log(res.data); //res es un objeto que tiene la respuesta completa entregada por Axios, nosotros sólo queremos los datos
            setProductos(res.data);  //guardamos los datos usando useState
        }
        loadProductos();


    }, [])

    return (

        <div>
            <form onSubmit={onSubmitS}>

                {/* BARRA SUPERIOR CON TITULO */}
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="static">
                        <Toolbar variant="dense">
                            <Typography variant="h6" color="inherit" component="div">
                                Nuevo Item de Venta
                            </Typography>
                        </Toolbar>
                    </AppBar>
                </Box>
                <br />

                {/* BOX QUE CONTENDRÁ TODO EL FORMULARIO */}
                <Box sx={{ display: "flex", width: '100%', boxShadow: '3', padding: '2rem', flexDirection: 'column' }}>

                    {/* BOTÓN ATRÁS */}
                    <Box sx={{ display: "flex", marginBottom: '40px' }}>
                        <Button variant='contained' color="warning" component={Link} to={'/itemsventa/'} startIcon={<ArrowBackIcon />} sx={{ width: '15%' }}>
                            Atrás
                        </Button>
                    </Box>
                    <br />
                    {/* BOX QUE CONTENDRÁ LA PRIMERA LINEA DE INPUTS */}
                    <Box sx={{ display: "flex", marginBottom: '40px', justifyContent: 'space-between' }}>
                        <MyNumberedField
                            label={"Cantidad vendida"}
                            name={"cantidad_vendida"}
                            control={control}
                            placeholder="Cantidad vendida"
                            width={'20%'}
                        />
                        <MyNumberedField
                            //necesito crear un nuevo numberField_disabled, pasandole la prop disabled, para que funcione
                            label={"Precio unitario"}
                            name={"precio_unitario"}
                            control={control}
                            placeholder="Precio unitario"
                            width={'20%'}
                        />
                        <MyNumberedField
                            disabled
                            label={"Importe"}
                            name={"importe"}
                            control={control}
                            placeholder="Importe"
                            width={'20%'}
                        />
                    </Box>

                    {/* ESPACIO PARA BOX QUE CONTENDRÁ LA SEGUNDA LINEA DE INPUTS (EN CASO DE EXISTIR) */}
                    <Box sx={{ display: "flex", marginBottom: '40px', justifyContent: 'space-between' }}>
                        <MySelectField_Ventas
                            label={"Venta"}
                            name={"fk_cod_venta"}
                            control={control}
                            width={"20%"}
                            content={ventas}
                        />

                        <MySelectField_Productos
                            label={"Producto"}
                            name={"fk_cod_producto"}
                            control={control}
                            width={"20%"}
                            content={productos}
                        />
                    </Box>

                    {/* BOX QUE CONTENDRÁ EL BOTÓN INGRESAR */}
                    <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                        <Button variant='contained' type='submit' sx={{ width: '30%' }}>
                            Ingresar
                        </Button>
                        { //Borrar servicio
                            params.id &&
                            <Button onClick={async () => { //el boton se mostrara solo cuando exista params.id al momento de acceder a la pagina clickeando previamente un servicio
                                const accepted = window.confirm('Estas seguro que deseas eliminar?') //accepted puede ser true si el usuario acepta o false si el usuario cancelo
                                if (accepted) {
                                    await deleteItemventa(params.id)
                                    toast.success('Item de venta eliminado', {
                                        position: "bottom-right",
                                        style: {
                                            background: "#101010",
                                            color: "#fff"
                                        }
                                    })
                                    navigate("/itemsventa")
                                }
                            }}
                                variant="contained" color="error" sx={{ width: '27%' }}>
                                Borrar
                            </Button> //esto se ocupa para que dentro de la vista servicios-create no se vea el boton(ya que no le pasamos ningun parametro 'id'. Pero si dentro del mismo form queremos editar, si se muestre el boton delete)
                        }
                    </Box>

                </Box>
            </form>

        </div>
    )
}

export default ItemsventaFormPage