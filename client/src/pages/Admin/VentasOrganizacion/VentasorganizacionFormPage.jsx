import { useEffect, useState } from "react";
import { Form, useForm } from "react-hook-form";
import { createVentaorg, deleteVentaorg, updateVentaorg, getVentaorg } from "../../../api/ventasorganizacion.api";
import { getAllOrganizaciones } from "../../../api/organizaciones.api";
import { getAllVentas } from "../../../api/ventas.api";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";
import { toast } from "react-hot-toast";
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import MyNumberedField from "../../../components/forms/MyNumberField";
import MySelectField_Organizaciones from "../../../components/forms/SelectFields/MySelectField_Organizaciones";
import MySelectField_Ventas from "../../../components/forms/SelectFields/MySelectField_Ventas";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';
import MyTextField from "../../../components/forms/MyTextField";

export function VentasorgFormPage() {
    const defaultValues = {
        proyecto_ventas_organizacion: '',
        solicitante_ventas_organizacion: '',
        importe_total: '',
        fk_organizacion: '',
        fk_cod_venta: '',
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
                await updateVentaorg(params.id, data);
                toast.success('Venta de organización actualizada', {
                    position: 'bottom-right',
                    style: {
                        background: '#101010',
                        color: '#fff',
                    },
                });
            } else {
                await createVentaorg(data);
                toast.success('Venta de organización creada', {
                    position: 'bottom-right',
                    style: {
                        background: '#101010',
                        color: '#fff',
                    },
                });
            }
            navigate('/ventasorg');
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
    const [organizaciones, setOrganizacion] = useState([])
    //Las diferentes ventas de organización se almacenarán en la variable 'ventasorg' y esa se le pasará al Select
    const [venta, setVenta] = useState([])


    useEffect(() => {

        //Sacar la informacion de Venta para rellenar los campos en caso de querer editar una instancia.
        async function loadVentaorg() {
            if (params.id) { //si params.id existe
                console.log(params);
                const res = await getVentaorg(params.id);
                setValue('proyecto_ventas_organizacion', res.data.proyecto_ventas_organizacion)
                setValue('solicitante_ventas_organizacion', res.data.solicitante_ventas_organizacion)
                setValue('importe_total', res.data.importe_total)
                setValue('fk_organizacion', res.data.fk_organizacion)
                setValue('fk_cod_venta', res.data.fk_cod_venta)
                // setValue('description', res.data.description) ocuparlo si existieran mas campos que rellenar
            }
        }
        loadVentaorg();

        //Sacar la informacion de Organizaciones para poner en el Select
        async function loadOrganizaciones() {
            const res = await getAllOrganizaciones();   //loadServicios llama al getAllservicios, que es la función que pide al Backend por medio de la API
            console.log(res.data); //res es un objeto que tiene la respuesta completa entregada por Axios, nosotros sólo queremos los datos
            setOrganizacion(res.data);  //guardamos los datos usando useState
        }
        loadOrganizaciones();

        //Sacar la informacion de Ventas para poner en el Select
        async function loadVentas() {
            const res = await getAllVentas();   //loadServicios llama al getAllservicios, que es la función que pide al Backend por medio de la API
            console.log(res.data); //res es un objeto que tiene la respuesta completa entregada por Axios, nosotros sólo queremos los datos
            setVenta(res.data);  //guardamos los datos usando useState
        }
        loadVentas();

    }, [])

    return (

        <div>
            <form onSubmit={onSubmitS}>

                {/* BARRA SUPERIOR CON TITULO */}
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="static">
                        <Toolbar variant="dense">
                            <Typography variant="h6" color="inherit" component="div">
                                Nueva Venta de Organización
                            </Typography>
                        </Toolbar>
                    </AppBar>
                </Box>
                <br />

                {/* BOX QUE CONTENDRÁ TODO EL FORMULARIO */}
                <Box sx={{ display: "flex", width: '100%', boxShadow: '3', padding: '2rem', flexDirection: 'column' }}>

                    {/* BOTÓN ATRÁS */}
                    <Box sx={{ display: "flex", marginBottom: '40px' }}>
                        <Button variant='contained' color="warning" component={Link} to={'/admin/ventasorg/'} startIcon={<ArrowBackIcon />} sx={{ width: '15%' }}>
                            Atrás
                        </Button>
                    </Box>
                    <br />
                    {/* BOX QUE CONTENDRÁ LA PRIMERA LINEA DE INPUTS */}
                    <Box sx={{ display: "flex", marginBottom: '40px', justifyContent: 'space-between' }}>
                        <MySelectField_Ventas
                            label={"N° de venta"}
                            name={"fk_cod_venta"}
                            control={control}
                            width={"25%"}
                            content={venta}
                        />
                        <MySelectField_Organizaciones
                            label={"Organización"}
                            name={"fk_organizacion"}
                            control={control}
                            width={"25%"}
                            content={organizaciones}
                        />
                        <MyNumberedField
                            label={"Importe Total"}
                            name={"importe_total"}
                            control={control}
                            placeholder="Importe"
                            width={"25%"}
                        />
                    </Box>

                    {/* ESPACIO PARA BOX QUE CONTENDRÁ LA SEGUNDA LINEA DE INPUTS (EN CASO DE EXISTIR) */}
                    <Box sx={{ display: "flex", marginBottom: '40px', justifyContent: 'space-between'}}>
                        <MyTextField
                            label={"Proyecto:"}
                            name={"proyecto_ventas_organizacion"}
                            control={control}
                            width={"25%"}
                        />
                        <MyTextField
                            label={"Solicitante:"}
                            name={"solicitante_ventas_organizacion"}
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
                                    await deleteVentaorg(params.id)
                                    toast.success('Venta eliminada', {
                                        position: "bottom-right",
                                        style: {
                                            background: "#101010",
                                            color: "#fff"
                                        }
                                    })
                                    navigate("/admin/ventasorg")
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

export default VentasorgFormPage