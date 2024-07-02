import { useEffect, useState } from "react";
import { Form, useForm } from "react-hook-form";
import { createUsuario, deleteUsuario, updateUsuario, getUsuario } from "../../../api/usuarios.api";
import { getAllTiposusuario } from "../../../api/tiposusuarios.api";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";
import { toast } from "react-hot-toast";
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import MyTextField from "../../../components/forms/MyTextField";
import MySelectField_Tiposusuario from "../../../components/forms/SelectFields/MySelectField_Tiposusuario";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';

export function UsuariosFormPage() {
    const defaultValues = {
        importe: '',
        nombre_usuario: '',
        contrasena_usuario: '',
        fk_tipo_usuario: '',
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
                await updateUsuario(params.id, data);
                toast.success('Usuario actualizado', {
                    position: 'bottom-right',
                    style: {
                        background: '#101010',
                        color: '#fff',
                    },
                });
            } else {
                await createUsuario(data);
                toast.success('Usuario creado', {
                    position: 'bottom-right',
                    style: {
                        background: '#101010',
                        color: '#fff',
                    },
                });
            }
            navigate('/usuarios');
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
    const [tiposusuario, setTiposusuarios] = useState([])
    
    useEffect(() => {

        //Sacar la informacion de Venta para rellenar los campos en caso de querer editar una instancia.
        async function loadUsuario() {
            if (params.id) { //si params.id existe
                console.log(params);
                const res = await getUsuario(params.id);
                setValue('nombre_usuario', res.data.nombre_usuario)
                setValue('contrasena_usuario', res.data.contrasena_usuario)
                setValue('fk_tipo_usuario', res.data.fk_tipo_usuario)
                // setValue('description', res.data.description) ocuparlo si existieran mas campos que rellenar
            }
        }
        loadUsuario();

        //Sacar la informacion de Métodos de pago para poner en el Select
        async function loadTiposusuarios() {
            const res = await getAllTiposusuario();   //loadServicios llama al getAllservicios, que es la función que pide al Backend por medio de la API
            console.log(res.data); //res es un objeto que tiene la respuesta completa entregada por Axios, nosotros sólo queremos los datos
            setTiposusuarios(res.data);  //guardamos los datos usando useState
        }
        loadTiposusuarios();


    }, [])

    return (

        <div>
            <form onSubmit={onSubmitS}>

                {/* BARRA SUPERIOR CON TITULO */}
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="static">
                        <Toolbar variant="dense">
                            <Typography variant="h6" color="inherit" component="div">
                                Nuevo Usuario
                            </Typography>
                        </Toolbar>
                    </AppBar>
                </Box>
                <br />

                {/* BOX QUE CONTENDRÁ TODO EL FORMULARIO */}
                <Box sx={{ display: "flex", width: '100%', boxShadow: '3', padding: '2rem', flexDirection: 'column' }}>

                    {/* BOTÓN ATRÁS */}
                    <Box sx={{ display: "flex", marginBottom: '40px' }}>
                        <Button variant='contained' color="warning" component={Link} to={'/usuarios/'} startIcon={<ArrowBackIcon />} sx={{ width: '15%' }}>
                            Atrás
                        </Button>
                    </Box>
                    <br />
                    {/* BOX QUE CONTENDRÁ LA PRIMERA LINEA DE INPUTS */}
                    <Box sx={{ display: "flex", marginBottom: '40px', justifyContent: 'space-between' }}>
                        <MyTextField
                            label={"Nombre de Usuario"}
                            name={"nombre_usuario"}
                            control={control}
                            placeholder="Nombre de Usuario"
                            width={'35%'}
                        />
                        <MySelectField_Tiposusuario
                            label={"Tipo de Usuario"}
                            name={"fk_tipo_usuario"}
                            control={control}
                            width={"35%"}
                            content={tiposusuario}
                        />
                    </Box>

                    {/* ESPACIO PARA BOX QUE CONTENDRÁ LA SEGUNDA LINEA DE INPUTS (EN CASO DE EXISTIR) */}
                    <Box sx={{ display: "flex", marginBottom: '40px', justifyContent: 'space-between' }}>
                    <MyTextField
                            label={"Contraseña "}
                            name={"contrasena_usuario"}
                            control={control}
                            width={"40%"}
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
                                    await deleteUsuario(params.id)
                                    toast.success('Usuario eliminado', {
                                        position: "bottom-right",
                                        style: {
                                            background: "#101010",
                                            color: "#fff"
                                        }
                                    })
                                    navigate("/usuarios")
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

export default UsuariosFormPage