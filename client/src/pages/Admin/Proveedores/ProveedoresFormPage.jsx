import { useEffect, useState } from "react";
import { Form, useForm } from "react-hook-form";
import { createProveedor, deleteProveedor, updateProveedor, getProveedor, getAllProveedores } from "../../../api/proveedores.api";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";
import { toast } from "react-hot-toast";
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import MyTextField from "../../../components/forms/MyTextField";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';

export function ProveedoresFormPage() {
    const defaultValues = {
        nombre_empresa: '',
        rut_proveedor: '',
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
                await updateProveedor(params.id, data);
                toast.success('Proveedor actualizado', {
                    position: 'bottom-right',
                    style: {
                        background: '#101010',
                        color: '#fff',
                    },
                });
            } else {
                await createProveedor(data);
                toast.success('Proveedor creado', {
                    position: 'bottom-right',
                    style: {
                        background: '#101010',
                        color: '#fff',
                    },
                });
            }
            navigate('/proveedores');
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
        async function loadProveedor() {
            if (params.id) { //si params.id existe
                console.log(params);
                const res = await getProveedor(params.id);
                setValue('nombre_empresa', res.data.nombre_empresa)
                setValue('rut_proveedor', res.data.rut_proveedor)
                // setValue('description', res.data.description) ocuparlo si existieran mas campos que rellenar
            }
        }
        loadProveedor();

    }, [])

    return (

        <div>
            <form onSubmit={onSubmitS}>

                {/* BARRA SUPERIOR CON TITULO */}
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="static">
                        <Toolbar variant="dense">
                            <Typography variant="h6" color="inherit" component="div">
                                Nuevo Proveedor
                            </Typography>
                        </Toolbar>
                    </AppBar>
                </Box>
                <br />

                {/* BOX QUE CONTENDRÁ TODO EL FORMULARIO */}
                <Box sx={{ display: "flex", width: '100%', boxShadow: '3', padding: '2rem', flexDirection: 'column' }}>

                    {/* BOTÓN ATRÁS */}
                    <Box sx={{ display: "flex", marginBottom: '40px' }}>
                        <Button variant='contained' color="warning" component={Link} to={'/proveedores/'} startIcon={<ArrowBackIcon />} sx={{ width: '15%' }}>
                            Atrás
                        </Button>
                    </Box>
                    <br />
                    {/* BOX QUE CONTENDRÁ LA PRIMERA LINEA DE INPUTS */}
                    <Box sx={{ display: "flex", marginBottom: '40px', justifyContent: 'space-between' }}>
                        <MyTextField
                            label={"Nombre empresa"}
                            name={"nombre_empresa"}
                            control={control}
                            placeholder="Nombre de empresa"
                            width={'20%'}
                        />
                        <MyTextField
                            label={"RUT de Proveedor"}
                            name={"rut_proveedor"}
                            control={control}
                            width={"20%"}
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
                                const accepted = window.confirm('Estas seguro que deseas eliminar?') //accepted puede ser true si el usuario acepta o false si el usuario cancelo
                                if (accepted) {
                                    await deleteProveedor(params.id)
                                    toast.success('Venta eliminada', {
                                        position: "bottom-right",
                                        style: {
                                            background: "#101010",
                                            color: "#fff"
                                        }
                                    })
                                    navigate("/proveedores")
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

export default ProveedoresFormPage