import { useEffect, useState } from "react";
import { Form, useForm } from "react-hook-form";
import { createItemventaorg, deleteItemventaorg, updateItemventaorg, getItemventaorg } from "../../../api/itemsventaorganizacion.api";
import { getAllVentasorg } from "../../../api/ventasorganizacion.api";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";
import { toast } from "react-hot-toast";
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import MyNumberedField from "../../../components/forms/MyNumberField";
import MySelectField_Servicioimpresionorg from "../../../components/forms/SelectFields/MySelectField_Servicioimpresionorg";
import MySelectField_Ventasorg from "../../../components/forms/SelectFields/MySelectField_Ventasorg";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';
import MyTextField from "../../../components/forms/MyTextField";
import { getAllVentas } from "../../../api/ventas.api";
import { getAllServiciosimpresionorg } from "../../../api/serviciosimpresionorg.api";

export function ItemsVentaOrganizacionFormPage() {
    const defaultValues = {
        medidas_ventas_organizacion: '',
        cantidad_vendida: '',
        importe_item_venta_organizacion: '',
        fk_servicio_impresion_organizacion: '',
        fk_venta_organizacion: '',
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
                await updateItemventaorg(params.id, data);
                toast.success('Item de venta de organización actualizada', {
                    position: 'bottom-right',
                    style: {
                        background: '#101010',
                        color: '#fff',
                    },
                });
            } else {
                await createItemventaorg(data);
                toast.success('Item de venta de organización creada', {
                    position: 'bottom-right',
                    style: {
                        background: '#101010',
                        color: '#fff',
                    },
                });
            }
            navigate('/admin/itemsventaorg');
        } catch (error) {
            console.error('Error al procesar el formulario:', error);
            setError(error); // Almacenamos el error en el estado local
            console.log(error.response.data)
            toast.error('Hubo un error al procesar el formulario', {
                position: 'bottom-right',
                style: {
                    background: '#ff3333',
                    color: '#fff',
                },
            });
        }
    });

    //Los diferentes metodos de pago se almacenarán en la variable 'metodospago' y esa se le pasará al Select
    const [ventasorg, setVentasorg] = useState([])
    //Las diferentes ventas de organización se almacenarán en la variable 'ventasorg' y esa se le pasará al Select
    const [serviciosimpresionorg, setServiciosimpresion] = useState([])


    useEffect(() => {

        //Sacar la informacion de Venta para rellenar los campos en caso de querer editar una instancia.
        async function loadItemventaorg() {
            if (params.id) { //si params.id existe
                console.log(params);
                const res = await getItemventaorg(params.id);
                setValue('medidas_ventas_organizacion', res.data.medidas_ventas_organizacion)
                setValue('cantidad_vendida', res.data.cantidad_vendida)
                setValue('importe_item_venta_organizacion', res.data.importe_item_venta_organizacion)
                setValue('fk_servicio_impresion_organizacion', res.data.fk_servicio_impresion_organizacion)
                setValue('fk_venta_organizacion', res.data.fk_venta_organizacion)
                // setValue('description', res.data.description) ocuparlo si existieran mas campos que rellenar
            }
        }
        loadItemventaorg();

        //Sacar la informacion de Organizaciones para poner en el Select
        async function loadVentasorg() {
            const res = await getAllVentasorg();   //loadServicios llama al getAllservicios, que es la función que pide al Backend por medio de la API
            console.log(res.data); //res es un objeto que tiene la respuesta completa entregada por Axios, nosotros sólo queremos los datos
            setVentasorg(res.data);  //guardamos los datos usando useState
        }
        loadVentasorg();

        //Sacar la informacion de Ventas para poner en el Select
        async function loadServiciosimpresion() {
            const res = await getAllServiciosimpresionorg();   //loadServicios llama al getAllservicios, que es la función que pide al Backend por medio de la API
            console.log(res.data); //res es un objeto que tiene la respuesta completa entregada por Axios, nosotros sólo queremos los datos
            setServiciosimpresion(res.data);  //guardamos los datos usando useState
        }
        loadServiciosimpresion();

    }, [])

    return (

        <div>
            <form onSubmit={onSubmitS}>

                {/* BARRA SUPERIOR CON TITULO */}
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="static">
                        <Toolbar variant="dense">
                            <Typography variant="h6" color="inherit" component="div">
                                Nuevo Item de venta de Organización
                            </Typography>
                        </Toolbar>
                    </AppBar>
                </Box>
                <br />

                {/* BOX QUE CONTENDRÁ TODO EL FORMULARIO */}
                <Box sx={{ display: "flex", width: '100%', boxShadow: '3', padding: '2rem', flexDirection: 'column' }}>

                    {/* BOTÓN ATRÁS */}
                    <Box sx={{ display: "flex", marginBottom: '40px' }}>
                        <Button variant='contained' color="warning" component={Link} to={'/admin/itemsventaorg/'} startIcon={<ArrowBackIcon />} sx={{ width: '15%' }}>
                            Atrás
                        </Button>
                    </Box>
                    <br />
                    {/* BOX QUE CONTENDRÁ LA PRIMERA LINEA DE INPUTS */}
                    <Box sx={{ display: "flex", marginBottom: '40px', justifyContent: 'space-between' }}>
                        <MySelectField_Ventasorg
                            label={"N° de Venta Organización"}
                            name={"fk_venta_organizacion"}
                            control={control}
                            width={"25%"}
                            content={ventasorg}
                        />
                        <MySelectField_Servicioimpresionorg
                            label={"Servicio de impresión"}
                            name={"fk_servicio_impresion_organizacion"}
                            control={control}
                            width={"25%"}
                            content={serviciosimpresionorg}
                        />
                        <MyNumberedField
                            label={"Importe"}
                            name={"importe_item_venta_organizacion"}
                            control={control}
                            placeholder="Importe"
                            width={"25%"}
                        />
                    </Box>

                    {/* ESPACIO PARA BOX QUE CONTENDRÁ LA SEGUNDA LINEA DE INPUTS (EN CASO DE EXISTIR) */}
                    <Box sx={{ display: "flex", marginBottom: '40px', justifyContent: 'space-between'}}>
                        <MyNumberedField
                            label={"Medidas:"}
                            name={"medidas_ventas_organizacion"}
                            control={control}
                            width={"25%"}
                        />
                        <MyNumberedField
                            label={"Cantidad"}
                            name={"cantidad_vendida"}
                            control={control}
                            width={"25%"}
                        />
                        <Button sx={{width:"25%"}}/> {/* Botón Dummy para spacing */}
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
                                    await deleteItemventaorg(params.id)
                                    toast.success('Venta eliminada', {
                                        position: "bottom-right",
                                        style: {
                                            background: "#101010",
                                            color: "#fff"
                                        }
                                    })
                                    navigate("/admin/itemsventaorg")
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

export default ItemsVentaOrganizacionFormPage