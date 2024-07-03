import { useEffect, useState } from "react";
import { Form, useForm } from "react-hook-form";
import { createMetodoPago, deleteMetodoPago, updateMetodoPago, getMetodoPago } from "../../../api/metodospago.api";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";
import { toast } from "react-hot-toast";
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import MyTextField from "../../../components/forms/MyTextField";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link, useLocation } from 'react-router-dom';

export function MetodospagoFormPage() {
    const defaultValues = {
        nombre_metodo_pago: '',
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
                await updateMetodoPago(params.id, data);
                toast.success('Método de pago actualizado', {
                    position: 'bottom-right',
                    style: {
                        background: '#101010',
                        color: '#fff',
                    },
                });
            } else {
                await createMetodoPago(data);
                toast.success('Método de pago creado', {
                    position: 'bottom-right',
                    style: {
                        background: '#101010',
                        color: '#fff',
                    },
                });
            }
            navigate('/admin/metodospago');
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

    useEffect(() => {
        async function loadMetodopago() {
            if (params.id) { //si params.id existe
                console.log(params);
                const res = await getMetodoPago(params.id);
                setValue('nombre_metodo_pago', res.data.nombre_metodo_pago)
                // setValue('description', res.data.description) ocuparlo si existieran mas campos que rellenar
            }
        }
        loadMetodopago();
    })

    return (

        <div>
            <form onSubmit={onSubmitS}>
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="static">
                        <Toolbar variant="dense">
                            <Typography variant="h6" color="inherit" component="div">
                                Nuevo Método de pago
                            </Typography>
                        </Toolbar>
                    </AppBar>
                </Box>
                <br />

                <Box sx={{ display: "flex", width: '100%', boxShadow: '3', padding: '2rem', flexDirection: 'column' }}>


                    <Box sx={{ display: "flex", marginBottom: '40px' }}>
                        <Button variant='contained' color="warning" component={Link}  to={'/admin/metodospago/'} startIcon={<ArrowBackIcon />} sx={{ width: '15%' }}>
                            Atrás
                        </Button>
                    </Box>
                    <br />
                    <Box sx={{ display: "flex", marginBottom: '40px' }}>
                        <MyTextField
                            label={"Nombre de método de pago"}
                            name={"nombre_metodo_pago"}
                            control={control}
                            placeholder="Proporcione un método de pago"
                            width={'30%'}
                        />
                    </Box>
                    <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                        <Button variant='contained' type='submit' sx={{ width: '30%' }}>
                            Ingresar
                        </Button>
                        { //Borrar servicio
                            params.id &&
                            <Button onClick={async () => { //el boton se mostrara solo cuando exista params.id al momento de acceder a la pagina clickeando previamente un servicio
                                const accepted = window.confirm('Estás seguro que deseas eliminar?') //accepted puede ser true si el usuario acepta o false si el usuario cancelo
                                if (accepted) {
                                    await deleteMetodoPago(params.id)
                                    toast.success('Método de pago eliminado', {
                                        position: "bottom-right",
                                        style: {
                                            background: "#101010",
                                            color: "#fff"
                                        }
                                    })
                                    navigate("/admin/metodospago")
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

export default MetodospagoFormPage