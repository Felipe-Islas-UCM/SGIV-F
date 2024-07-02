import { useEffect, useState } from "react";
import { Form, useForm } from "react-hook-form";
import { createServicioimpresionorg, deleteServicioimpresionorg, updateServicioimpresionorg, getServicioimpresionorg } from "../../../api/serviciosimpresionorg.api";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";
import { toast } from "react-hot-toast";
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import MyNumberedField from "../../../components/forms/MyNumberField";
import MyTextField from "../../../components/forms/MyTextField";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';

export function ServiciosimpresionorgFormPage() {
    const defaultValues = {
        nombre_servicio_impresion_organizacion: '',
        valor_metro_lineal: '',
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
                await updateServicioimpresionorg(params.id, data);
                toast.success('Servicio de impresión actualizado', {
                    position: 'bottom-right',
                    style: {
                        background: '#101010',
                        color: '#fff',
                    },
                });
            } else {
                await createServicioimpresionorg(data);
                toast.success('Servicio de impresión creado', {
                    position: 'bottom-right',
                    style: {
                        background: '#101010',
                        color: '#fff',
                    },
                });
            }
            navigate('/serviciosimpresionorg');
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

        //Sacar la informacion de Venta para rellenar los campos en caso de querer editar una instancia.
        async function loadServicioimpresionorg() {
            if (params.id) { //si params.id existe
                console.log(params);
                const res = await getServicioimpresionorg(params.id);
                setValue('nombre_servicio_impresion_organizacion', res.data.nombre_servicio_impresion_organizacion)
                setValue('valor_metro_lineal', res.data.valor_metro_lineal)
                // setValue('description', res.data.description) ocuparlo si existieran mas campos que rellenar
            }
        }
        loadServicioimpresionorg();

    }, [])

    return (

        <div>
            <form onSubmit={onSubmitS}>

                {/* BARRA SUPERIOR CON TITULO */}
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="static">
                        <Toolbar variant="dense">
                            <Typography variant="h6" color="inherit" component="div">
                                Nuevo Servicio de Impresión
                            </Typography>
                        </Toolbar>
                    </AppBar>
                </Box>
                <br />

                {/* BOX QUE CONTENDRÁ TODO EL FORMULARIO */}
                <Box sx={{ display: "flex", width: '100%', boxShadow: '3', padding: '2rem', flexDirection: 'column' }}>

                    {/* BOTÓN ATRÁS */}
                    <Box sx={{ display: "flex", marginBottom: '40px' }}>
                        <Button variant='contained' color="warning" component={Link} to={'/serviciosimpresionorg/'} startIcon={<ArrowBackIcon />} sx={{ width: '15%' }}>
                            Atrás
                        </Button>
                    </Box>
                    <br />
                    {/* BOX QUE CONTENDRÁ LA PRIMERA LINEA DE INPUTS */}
                    <Box sx={{ display: "flex", marginBottom: '40px', justifyContent: 'space-between' }}>
                        <MyTextField
                            label={"Nombre servicio de impresión"}
                            name={"nombre_servicio_impresion_organizacion"}
                            control={control}
                            placeholder="Nombre servicio de impresión"
                            width={'40%'}
                        />
                        <MyNumberedField
                            label={"Valor metro lineal"}
                            name={"valor_metro_lineal"}
                            control={control}
                            placeholder="Valor metro lineal"
                            width={"25%"}
                        />
                    </Box>

                    {/* ESPACIO PARA BOX QUE CONTENDRÁ LA SEGUNDA LINEA DE INPUTS (EN CASO DE EXISTIR) */}
                    <Box sx={{ display: "flex", marginBottom: '40px', justifyContent: 'space-between' }}>
                    </Box>

                    {/* BOX QUE CONTENDRÁ EL BOTÓN INGRESAR */}
                    <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                        <Button variant='contained' type='submit' sx={{ width: '30%' }}>
                            Ingresar
                        </Button>
                        { //Borrar servicio
                            params.id &&
                            <Button onClick={async () => { //el boton se mostrara solo cuando exista params.id al momento de acceder a la pagina clickeando previamente un servicio
                                const accepted = window.confirm('Estás seguro que deseas eliminar?') //accepted puede ser true si el usuario acepta o false si el usuario cancelo
                                if (accepted) {
                                    await deleteServicioimpresionorg(params.id)
                                    toast.success('Servicio de impresión eliminado', {
                                        position: "bottom-right",
                                        style: {
                                            background: "#101010",
                                            color: "#fff"
                                        }
                                    })
                                    navigate("/serviciosimpresionorg")
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

export default ServiciosimpresionorgFormPage