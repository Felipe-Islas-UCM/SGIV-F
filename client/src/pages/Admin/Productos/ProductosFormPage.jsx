import { useEffect, useState } from "react";
import { Form, useForm } from "react-hook-form";
import { getAllCategoriasimpuesto } from "../../../api/categoriasimpuesto.api";
import { getAllCategoriasproducto } from "../../../api/categoriasproducto.api";
import { getAllProveedores } from "../../../api/proveedores.api";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import { toast } from "react-hot-toast";
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import MyNumberedField from "../../../components/forms/MyNumberField";
import MySelectField from "../../../components/forms/MySelectField";
import MenuItem from "@mui/material/MenuItem";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';
import { createProducto, deleteProducto, getProducto, updateProducto } from "../../../api/productos.api";
import MyTextField from "../../../components/forms/MyTextField";

export function ProductosFormPage() {
    const defaultValues = {
        referencia: '',
        nombre_producto: '',
        cod_barra_producto: '',
        stock: '',
        precio_venta_mas_impuesto: '',
        precio_neto: '',
        estado_en_stock: true,
        fk_categoria_impuesto: '',
        fk_categoria_producto: '',
        fk_proveedor: '',
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


    //MANEJO DE ERRORES
    //
    //Error general
    const [Axios_error, setAxiosError] = useState(null); // Agregamos un estado para almacenar el error
    //Error Campos de Información
    const initialState = {
        error_referencia: false,
        error_nombre_producto: false,
        error_cod_barra_producto: false,
        error_stock: false,
        error_precio_venta_mas_impuesto: false,
        error_precio_neto: false,
        error_estado_en_stock: false,
        error_fk_categoria_impuesto: false,
        error_fk_categoria_producto: false,
        error_fk_proveedor: false,
    }
    //
    const [formErrors, setErrors] = useState(initialState);
    //console.log(formErrors);

    const setError = (field, value) => {
        setErrors((prevErrors) => ({ ...prevErrors, [field]: value }));
    };
    // Ejemplo de uso
    // setError('error_referencia', true);
    // setError('error_nombre_producto', false);

    const setArrayError = (field, response) => {
        setError('error_' + field, Array.isArray(response.data[field]));
    };

    const onSubmitS = handleSubmit(async (data) => {
        try {
            if (params.id) {
                await updateProducto(params.id, data);
                toast.success('Producto actualizado', {
                    position: 'bottom-right',
                    style: {
                        background: '#101010',
                        color: '#fff',
                    },
                });
            } else {
                await createProducto(data);
                toast.success('Producto creado', {
                    position: 'bottom-right',
                    style: {
                        background: '#101010',
                        color: '#fff',
                    },
                });
            }
            navigate('/admin/productos');
        } catch (Axios_error) {
            //console.error('Error al procesar el formulario:', Axios_error);
            setAxiosError(Axios_error); // Almacenamos el error en el estado local
            //console.log(Axios_error.response.data)
            setArrayError('referencia', Axios_error.response);
            setArrayError('nombre_producto', Axios_error.response);
            setArrayError('cod_barra_producto', Axios_error.response);
            setArrayError('stock', Axios_error.response);
            setArrayError('precio_venta_mas_impuesto', Axios_error.response);
            setArrayError('precio_neto', Axios_error.response);
            setArrayError('fk_categoria_impuesto', Axios_error.response);
            setArrayError('fk_categoria_producto', Axios_error.response);
            setArrayError('fk_proveedor', Axios_error.response);
            toast.error('Hubo un error al procesar el formulario', {
                position: 'bottom-right',
                style: {
                    background: '#ff3333',
                    color: '#fff',
                },
            });
        }
    });

    //
    //En resumen, al momento de hacer un catch al error, Axios_error es el responsable de llamar a toast.error
    //Luego con Axios_error, buscamos especificamente los arreglos, para ver si existe un arreglo por campo que tenga error
    //Se checkea por cada campo si existe un arreglo conteniendo su error
    //Si existe, se setea ese campo con error, y se le manda el contenido del helper Text
    //////////////////////////////////////////////////////////////////////////////////////////////////


    // MANEJO DE SELECTS
    //Los diferentes metodos de pago se almacenarán en la variable 'metodospago' y esa se le pasará al Select
    const [categoriasimpuesto, setCategoriasimpuesto] = useState([])
    //Las diferentes ventas de organización se almacenarán en la variable 'ventasorg' y esa se le pasará al Select
    const [categoriasproducto, setCategoriasproducto] = useState([])
    //Los diferentes servicios se almacenarán en la variable 'servicios' y esa se le pasará al Select
    const [proveedores, setProveedores] = useState([])
    /////////////////////////////////////////////////////////////////////////////////////////////

    useEffect(() => {
        //Sacar la informacion de Venta para rellenar los campos en caso de querer editar una instancia.
        async function loadProducto() {
            if (params.id) { //si params.id existe
                console.log(params);
                const res = await getProducto(params.id);
                setValue('referencia', res.data.referencia)
                setValue('nombre_producto', res.data.nombre_producto)
                setValue('cod_barra_producto', res.data.cod_barra_producto)
                setValue('stock', res.data.stock)
                setValue('precio_venta_mas_impuesto', res.data.precio_venta_mas_impuesto)
                setValue('precio_neto', res.data.precio_neto)
                setValue('estado_en_stock', res.data.estado_en_stock)
                setValue('fk_categoria_impuesto', res.data.fk_categoria_impuesto)
                setValue('fk_categoria_producto', res.data.fk_categoria_producto)
                setValue('fk_proveedor', res.data.fk_proveedor)
                // setValue('description', res.data.description) ocuparlo si existieran mas campos que rellenar
            }
        }
        loadProducto();

        //MANEJO DE SELECTS
        //Sacar la informacion de Métodos de pago para poner en el Select
        async function loadCategoriasimpuesto() {
            const res = await getAllCategoriasimpuesto();   //loadServicios llama al getAllservicios, que es la función que pide al Backend por medio de la API
            //console.log(res.data); //res es un objeto que tiene la respuesta completa entregada por Axios, nosotros sólo queremos los datos
            setCategoriasimpuesto(res.data);  //guardamos los datos usando useState
        }
        loadCategoriasimpuesto();

        //Sacar la informacion de Ventas de Organización para poner en el Select
        async function loadCategoriasproducto() {
            const res = await getAllCategoriasproducto();   //loadServicios llama al getAllservicios, que es la función que pide al Backend por medio de la API
            //console.log(res.data); //res es un objeto que tiene la respuesta completa entregada por Axios, nosotros sólo queremos los datos
            setCategoriasproducto(res.data);  //guardamos los datos usando useState
        }
        loadCategoriasproducto();

        //Sacar la informacion de Servicios para poner en el Select
        async function loadProveedores() {
            const res = await getAllProveedores();   //loadServicios llama al getAllservicios, que es la función que pide al Backend por medio de la API
            //console.log(res.data); //res es un objeto que tiene la respuesta completa entregada por Axios, nosotros sólo queremos los datos
            setProveedores(res.data);  //guardamos los datos usando useState
        }
        loadProveedores();
    }, [])

    return (
        <div>
            <form onSubmit={onSubmitS}>

                {/* BARRA SUPERIOR CON TITULO */}
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="static">
                        <Toolbar variant="dense">
                            <Typography variant="h6" color="inherit" component="div">
                                Nuevo Producto
                            </Typography>
                        </Toolbar>
                    </AppBar>
                </Box>
                <br />

                {/* BOX QUE CONTENDRÁ TODO EL FORMULARIO */}
                <Box sx={{ display: "flex", width: '100%', boxShadow: '3', padding: '2rem', flexDirection: 'column' }}>

                    {/* BOTÓN ATRÁS */}
                    <Box sx={{ display: "flex", marginBottom: '40px' }}>
                        <Button variant='contained' color="warning" component={Link} to={'/admin/productos/'} startIcon={<ArrowBackIcon />} sx={{ width: '15%' }}>
                            Atrás
                        </Button>
                    </Box>
                    <br />
                    {/* BOX QUE CONTENDRÁ LA PRIMERA LINEA DE INPUTS */}
                    <Box sx={{ display: "flex", marginBottom: '40px', justifyContent: 'space-between' }}>
                        <MyNumberedField
                            label={"Referencia"}
                            name={"referencia"}
                            control={control}
                            placeholder="Referencia"
                            width={'20%'}
                            axios_error={formErrors['error_referencia']}
                            error_content={Axios_error && Axios_error.response.data.referencia ? Axios_error.response.data.referencia[0] : ''}
                        />
                        <MyTextField
                            label={"Nombre de Producto"}
                            name={"nombre_producto"}
                            control={control}
                            width={"35%"}
                            axios_error={formErrors['error_nombre_producto']}
                            error_content={Axios_error && Axios_error.response.data.nombre_producto ? Axios_error.response.data.nombre_producto[0] : ''}
                        />
                        <MyTextField
                            label={"Código de Barra"}
                            name={"cod_barra_producto"}
                            control={control}
                            width={"35%"}
                            axios_error={formErrors['error_cod_barra_producto']}
                            error_content={Axios_error && Axios_error.response.data.cod_barra_producto ? Axios_error.response.data.cod_barra_producto[0] : ''}
                        />
                    </Box>

                    {/* ESPACIO PARA BOX QUE CONTENDRÁ LA SEGUNDA LINEA DE INPUTS (EN CASO DE EXISTIR) */}
                    <Box sx={{ display: "flex", marginBottom: '40px', justifyContent: 'space-between' }}>
                        <MyNumberedField
                            label={"Stock"}
                            name={"stock"}
                            control={control}
                            width={"20%"}
                            axios_error={formErrors['error_stock']}
                            error_content={Axios_error && Axios_error.response.data.stock ? Axios_error.response.data.stock[0] : ''}
                        />
                        <MyNumberedField
                            label={"Precio venta más impuesto"}
                            name={"precio_venta_mas_impuesto"}
                            control={control}
                            width={"20%"}
                            axios_error={formErrors['error_precio_venta_mas_impuesto']}
                            error_content={Axios_error && Axios_error.response.data.precio_venta_mas_impuesto ? Axios_error.response.data.precio_venta_mas_impuesto[0] : ''}
                        />
                        <MyNumberedField
                            label={"Precio Neto"}
                            name={"precio_neto"}
                            control={control}
                            width={"20%"}
                            axios_error={formErrors['error_precio_neto']}
                            error_content={Axios_error && Axios_error.response.data.precio_neto ? Axios_error.response.data.precio_neto[0] : ''}
                        />
                    </Box>
                    {/* TERCERA LINEA DE INPUTS */}
                    <Box sx={{ display: "flex", marginBottom: '40px', justifyContent: 'space-between' }}>
                        <MySelectField
                            label={"Categoria de impuestos"}
                            name={"fk_categoria_impuesto"}
                            control={control}
                            width={"20%"}
                            content={categoriasimpuesto.map(categoriaimpuesto => {
                                return (
                                    <MenuItem key={categoriaimpuesto.id} value={categoriaimpuesto.id}>{categoriaimpuesto.nombre_categoria_impuesto}</MenuItem>
                                )
                            })}
                            axios_error={formErrors['error_fk_categoria_impuesto']}
                            error_content={Axios_error && Axios_error.response.data.fk_categoria_impuesto ? Axios_error.response.data.fk_categoria_impuesto[0] : ''}
                        />
                        <MySelectField
                            label={"Categoria de producto"}
                            name={"fk_categoria_producto"}
                            control={control}
                            width={"20%"}
                            content={categoriasproducto.map(categoriaproducto => {
                                return (
                                    <MenuItem key={categoriaproducto.id} value={categoriaproducto.id}>{categoriaproducto.nombre_categoria_producto}</MenuItem>
                                )
                            })}
                            axios_error={formErrors['error_fk_categoria_producto']}
                            error_content={Axios_error && Axios_error.response.data.fk_categoria_producto ? Axios_error.response.data.fk_categoria_producto[0] : ''}
                        />
                        <MySelectField
                            label={"Proveedor"}
                            name={"fk_proveedor"}
                            control={control}
                            width={"20%"}
                            content={proveedores.map(proveedor => {
                                return (
                                    <MenuItem key={proveedor.id} value={proveedor.id}>{proveedor.nombre_empresa}</MenuItem>
                                )
                            })}
                            axios_error={formErrors['error_fk_proveedor']}
                            error_content={Axios_error && Axios_error.response.data.fk_proveedor ? Axios_error.response.data.fk_proveedor[0] : ''}
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
                                    await deleteProducto(params.id)
                                    toast.success('Producto eliminado', {
                                        position: "bottom-right",
                                        style: {
                                            background: "#101010",
                                            color: "#fff"
                                        }
                                    })
                                    navigate("/admin/productos")
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

export default ProductosFormPage