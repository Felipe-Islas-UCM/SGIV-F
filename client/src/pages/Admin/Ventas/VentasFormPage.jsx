import { useEffect, useState } from "react";
import { Form, useForm } from "react-hook-form";
import { createVenta, deleteVenta, updateVenta, getVenta } from "../../../api/ventas.api";
import { getAllServicios } from "../../../api/servicios.api";
import { getAllUsuarios } from "../../../api/usuarios.api";
import { getAllMetodosPago } from "../../../api/metodospago.api";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";
import { toast } from "react-hot-toast";
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import MyNumberedField from "../../../components/forms/MyNumberField";
import MySelectField_Metodospago from "../../../components/forms/SelectFields/MySelectField_Metodospago";
import MySelectField_Ventasorg from "../../../components/forms/SelectFields/MySelectField_Ventasorg";
import MySelectField_Servicios  from "../../../components/forms/SelectFields/MySelectField_Servicios";
import MySelectField_Usuarios  from "../../../components/forms/SelectFields/MySelectField_Usuarios";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';

export function VentasFormPage() {
    const defaultValues = {
        importe: '0',
        fk_metodo_pago: '',
        fk_servicio: '',
        fk_usuario: '',
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
                await updateVenta(params.id, data);
                toast.success('Venta actualizada', {
                    position: 'bottom-right',
                    style: {
                        background: '#101010',
                        color: '#fff',
                    },
                });
            } else {
                await createVenta(data);
                toast.success('Venta creada', {
                    position: 'bottom-right',
                    style: {
                        background: '#101010',
                        color: '#fff',
                    },
                });
            }
            navigate('/admin/ventas');
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
    const [usuarios, setUsuarios] = useState([])
    //Los diferentes metodos de pago se almacenarán en la variable 'metodospago' y esa se le pasará al Select
    const [metodospago, setMetodospago] = useState([])
    //Los diferentes servicios se almacenarán en la variable 'servicios' y esa se le pasará al Select
    const [servicios, setServicios] = useState([])

    useEffect(() => {

        //Sacar la informacion de Venta para rellenar los campos en caso de querer editar una instancia.
        async function loadVenta() {
            if (params.id) { //si params.id existe
                console.log(params);
                const res = await getVenta(params.id);
                setValue('importe', res.data.importe)
                setValue('fk_metodo_pago', res.data.fk_metodo_pago)
                setValue('fk_usuario', res.data.fk_usuario)
                setValue('fk_servicio', res.data.fk_servicio)
                // setValue('description', res.data.description) ocuparlo si existieran mas campos que rellenar
            }
        }
        loadVenta();

        //Sacar la informacion de Métodos de pago para poner en el Select
        async function loadMetodospago() {
            const res = await getAllMetodosPago();   //loadServicios llama al getAllservicios, que es la función que pide al Backend por medio de la API
            console.log(res.data); //res es un objeto que tiene la respuesta completa entregada por Axios, nosotros sólo queremos los datos
            setMetodospago(res.data);  //guardamos los datos usando useState
        }
        loadMetodospago();

        //Sacar la informacion de Ventas de Organización para poner en el Select
        async function loadUsuarios() {
            const res = await getAllUsuarios();   //loadServicios llama al getAllservicios, que es la función que pide al Backend por medio de la API
            console.log(res.data); //res es un objeto que tiene la respuesta completa entregada por Axios, nosotros sólo queremos los datos
            setUsuarios(res.data);  //guardamos los datos usando useState
        }
        loadUsuarios();

        //Sacar la informacion de Servicios para poner en el Select
        async function loadServicios() {
            const res = await getAllServicios();   //loadServicios llama al getAllservicios, que es la función que pide al Backend por medio de la API
            console.log(res.data); //res es un objeto que tiene la respuesta completa entregada por Axios, nosotros sólo queremos los datos
            setServicios(res.data);  //guardamos los datos usando useState
        }
        loadServicios();

    }, [])

    return (

        <div>
            <form onSubmit={onSubmitS}>

                {/* BARRA SUPERIOR CON TITULO */}
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="static">
                        <Toolbar variant="dense">
                            <Typography variant="h6" color="inherit" component="div">
                                Nueva Venta
                            </Typography>
                        </Toolbar>
                    </AppBar>
                </Box>
                <br />

                {/* BOX QUE CONTENDRÁ TODO EL FORMULARIO */}
                <Box sx={{ display: "flex", width: '100%', boxShadow: '3', padding: '2rem', flexDirection: 'column' }}>

                    {/* BOTÓN ATRÁS */}
                    <Box sx={{ display: "flex", marginBottom: '40px' }}>
                        <Button variant='contained' color="warning" component={Link} to={'/admin/ventas/'} startIcon={<ArrowBackIcon />} sx={{ width: '15%' }}>
                            Atrás
                        </Button>
                    </Box>
                    <br />
                    {/* BOX QUE CONTENDRÁ LA PRIMERA LINEA DE INPUTS */}
                    <Box sx={{ display: "flex", marginBottom: '40px', justifyContent: 'space-between' }}>
                        <MyNumberedField
                            label={"Importe"}
                            name={"importe"}
                            control={control}
                            placeholder="Importe de venta"
                            width={'20%'}
                        />
                        
                        <MySelectField_Usuarios
                            label={"Usuario"}
                            name={"fk_usuario"}
                            control={control}
                            width={"20%"}
                            content={usuarios}
                        />

                        <MySelectField_Metodospago
                            label={"Método de pago"}
                            name={"fk_metodo_pago"}
                            control={control}
                            width={"20%"}
                            content={metodospago}
                        />
                    </Box>

                    {/* ESPACIO PARA BOX QUE CONTENDRÁ LA SEGUNDA LINEA DE INPUTS (EN CASO DE EXISTIR) */}
                    <Box sx={{ display: "flex", marginBottom: '40px', justifyContent: 'space-between' }}>
                        <MySelectField_Servicios
                            label={"Servicio"}
                            name={"fk_servicio"}
                            control={control}
                            width={"20%"}
                            content={servicios}
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
                                    await deleteVenta(params.id)
                                    toast.success('Venta eliminada', {
                                        position: "bottom-right",
                                        style: {
                                            background: "#101010",
                                            color: "#fff"
                                        }
                                    })
                                    navigate("/admin/ventas")
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

export default VentasFormPage