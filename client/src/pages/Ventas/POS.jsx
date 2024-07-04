import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './POS.module.css'; // Importar el archivo de estilos
// Archivos de API
import { getAllCategoriasproducto } from '../../api/categoriasproducto.api';
import { getAllProductos } from '../../api/productos.api';
import { Typography, CircularProgress, Card, CardContent, CardActionArea, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, TextField, Button, FormControl, InputLabel, Select, MenuItem, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { createVenta } from '../../api/ventas.api';
import { createItemventa } from '../../api/itemsventa';

import { getAllServicios } from "../../api/servicios.api";
import { getAllUsuarios } from "../../api/usuarios.api";
import { getAllMetodosPago } from "../../api/metodospago.api";
import toast from 'react-hot-toast';


export function POS() {
  const [paymentMethods, setPaymentMethods] = useState([
    { id: 3, nombre_metodo_pago: "Crédito" },
    { id: 2, nombre_metodo_pago: "Débito" },
    { id: 1, nombre_metodo_pago: "Efectivo" }
  ]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [productos, setProductos] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);


  const [usuarios, setUsuarios] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [metodosPago, setMetodosPago] = useState([]);

  const [selectedUsuario, setSelectedUsuario] = useState('');
  const [selectedServicio, setSelectedServicio] = useState('');
  const [selectedMetodoPago, setSelectedMetodoPago] = useState('');


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriasResponse, productosResponse] = await Promise.all([
          getAllCategoriasproducto(),
          getAllProductos()
        ]);
        setCategorias(categoriasResponse.data);
        setProductos(productosResponse.data);
        setProductosFiltrados(productosResponse.data); // Inicialmente mostrar todos los productos
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usuariosResponse, serviciosResponse, metodosResponse] = await Promise.all([
          getAllUsuarios(),
          getAllServicios(),
          getAllMetodosPago()
        ]);
        setUsuarios(usuariosResponse.data);
        setServicios(serviciosResponse.data);
        setMetodosPago(metodosResponse.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };
    fetchData();
  }, []);

  const handleCategoriaClick = (categoriaId) => {
    setCategoriaSeleccionada(categoriaId);
    if (categoriaId === null) {
      setProductosFiltrados(productos);
    } else {
      const productosFiltrados = productos.filter(producto => producto.categoria_producto.id === categoriaId);
      setProductosFiltrados(productosFiltrados);
    }
  };
  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const updateCartItemQuantity = (productId, newQuantity) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId
          ? { ...item, quantity: Math.max(1, newQuantity) } // Ensure quantity is at least 1
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const handleCheckout = () => {
    if (!selectedUsuario) {
      alert('Por favor seleccione un usuario');
      return;
    }
    if (!selectedServicio) {
      alert('Por favor seleccione un servicio');
      return;
    }
    if (!selectedMetodoPago) {
      alert('Por favor seleccione un método de pago');
      return;
    }
    if (cartItems.length === 0) {
      alert('El carrito está vacío. Por favor, añada productos antes de completar la compra.');
      return;
    }
    setOpenConfirmDialog(true);
  };

  const confirmCheckout = async () => {
    setIsProcessing(true);
    const checkoutPromise = new Promise(async (resolve, reject) => {
    try {
      // Create the sale
      const saleData = {
        importe: '0', // This will be calculated on the backend
        fk_metodo_pago: selectedMetodoPago,
        fk_servicio: selectedServicio,
        fk_usuario: selectedUsuario,
      };
  
      console.log('Sending sale data:', saleData); // Debug log
  
      const saleResponse = await createVenta(saleData);
      console.log('Received sale response:', saleResponse); // Debug log
  
      if (!saleResponse || !saleResponse.id) {
        throw new Error('Invalid response from createVenta');
      }
  
      const newSaleId = saleResponse.id;
  
      // Create items for the sale
      for (const item of cartItems) {
        const itemData = {
          cantidad_vendida: item.quantity,
          precio_unitario: '0', // This will be calculated on the backend
          importe: '0', // This will be calculated on the backend
          fk_cod_venta: newSaleId,
          fk_cod_producto: item.id,
        };
  
        console.log('Sending item data:', itemData); // Debug log
  
        const itemResponse = await createItemventa(itemData);
        console.log('Received item response:', itemResponse); // Debug log
      }
  
      // Clear the cart and reset the selected values
      clearCart();
      setSelectedUsuario('');
      setSelectedServicio('');
      setSelectedMetodoPago('');
      setOpenConfirmDialog(false);
  
      resolve();
    } catch (error) {
      console.error('Error during checkout:', error);
      reject(error);
    } finally {
      setIsProcessing(false);
    }
  });

  toast.promise(
    checkoutPromise,
    {
      loading: 'Procesando su compra...',
      success: '¡Gracias por su compra!',
      error: (err) => `Error al procesar su compra: ${err.message}`,
    },
    {
      style: {
        minWidth: '250px',
      },
      success: {
        duration: 3000,
        icon: '🎉',
      },
    }
  );
};

  if (loading) {
    return <CircularProgress />;
  }

  return (

    <div className={styles.container}>
      <Dialog
        open={openConfirmDialog}
        onClose={() => setOpenConfirmDialog(false)}
      >
        <DialogTitle>Confirmar Compra</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Está seguro que desea completar esta compra?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmDialog(false)}>Cancelar</Button>
          <Button onClick={confirmCheckout} color="primary">Confirmar</Button>
        </DialogActions>
      </Dialog>
      <div className={styles['Items-de-Venta']}>
        <Typography variant="h4" gutterBottom>Items de Venta</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Producto</TableCell>
                <TableCell align="right">Precio</TableCell>
                <TableCell align="right">Cantidad</TableCell>
                <TableCell align="right">Total</TableCell>
                <TableCell align="right">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cartItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell component="th" scope="row">
                    {item.nombre_producto}
                  </TableCell>
                  <TableCell align="right">${item.precio_venta_mas_impuesto}</TableCell>
                  <TableCell align="right">
                    <TextField
                      type="number"
                      value={item.quantity}
                      onChange={(e) => updateCartItemQuantity(item.id, parseInt(e.target.value))}
                      inputProps={{ min: 1 }}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="right">
                    ${(item.precio_venta_mas_impuesto * item.quantity).toFixed(2)}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => removeFromCart(item.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {cartItems.length > 0 && (
                <TableRow>
                  <TableCell colSpan={3} align="right"><strong>Total:</strong></TableCell>
                  <TableCell align="right">
                    <strong>
                      ${cartItems.reduce((total, item) => total + item.precio_venta_mas_impuesto * item.quantity, 0).toFixed(2)}
                    </strong>
                  </TableCell>
                  <TableCell />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {cartItems.length > 0 && (
          <Button variant="contained" color="secondary" onClick={clearCart} style={{ marginTop: '1rem' }}>
            Limpiar Carrito
          </Button>
        )}
      </div>

      <div className={styles.Checkout}>
        <Typography variant="h4" gutterBottom>Checkout</Typography>
        <Card>
          <CardContent>
            <Typography variant="h6">Resumen de la Orden</Typography>
            <Typography>
              Total Items: {cartItems.reduce((total, item) => total + item.quantity, 0)}
            </Typography>
            <Typography>
              Total a Pagar: ${cartItems.reduce((total, item) => total + item.precio_venta_mas_impuesto * item.quantity, 0).toFixed(2)}
            </Typography>

            <FormControl fullWidth margin="normal">
              <InputLabel id="usuario-label">Usuario</InputLabel>
              <Select
                labelId="usuario-label"
                value={selectedUsuario}
                onChange={(e) => setSelectedUsuario(e.target.value)}
              >
                {usuarios.map((usuario) => (
                  <MenuItem key={usuario.id} value={usuario.id}>
                    {usuario.nombre_usuario+" ("+ usuario.tipo_usuario.nombre_tipo_usuario + ") "}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel id="servicio-label">Servicio</InputLabel>
              <Select
                labelId="servicio-label"
                value={selectedServicio}
                onChange={(e) => setSelectedServicio(e.target.value)}
              >
                {servicios.map((servicio) => (
                  <MenuItem key={servicio.id} value={servicio.id}>
                    {servicio.nombre_servicio}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel id="metodo-pago-label">Método de Pago</InputLabel>
              <Select
                labelId="metodo-pago-label"
                value={selectedMetodoPago}
                onChange={(e) => setSelectedMetodoPago(e.target.value)}
              >
                {metodosPago.map((metodo) => (
                  <MenuItem key={metodo.id} value={metodo.id}>
                    {metodo.nombre_metodo_pago}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleCheckout}
              disabled={cartItems.length === 0 || !selectedUsuario || !selectedServicio || !selectedMetodoPago || isProcessing}
              style={{ marginTop: '1rem' }}
            >
              {isProcessing ? <CircularProgress size={24} /> : 'Completar Compra'}
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className={styles['Categorias-Productos']}>
        <Typography variant="h4" gutterBottom>Categorías de Productos</Typography>
        <div className={styles.categoriasGrid}>
          <CardActionArea onClick={() => handleCategoriaClick(null)}>
            <Card>
              <CardContent>
                <Typography variant="h5">Todas las Categorías</Typography>
              </CardContent>
            </Card>
          </CardActionArea>
          {categorias.map((categoria) => (
            <CardActionArea key={categoria.id} onClick={() => handleCategoriaClick(categoria.id)}>
              <Card>
                <CardContent>
                  <Typography variant="h5">{categoria.nombre_categoria_producto}</Typography>
                </CardContent>
              </Card>
            </CardActionArea>
          ))}
        </div>
      </div>

      <div className={styles.Productos}>
        <Typography variant="h4" gutterBottom>Productos</Typography>
        <div className={styles.productosGrid}>
          {productosFiltrados.map((producto) => (
            <Card key={producto.id} onClick={() => addToCart(producto)}>
              <CardActionArea>
                <CardContent>
                  <Typography variant="h5">{producto.nombre_producto}</Typography>
                  <Typography>Precio: ${producto.precio_venta_mas_impuesto}</Typography>
                  <Typography>Stock: {producto.stock}</Typography>
                  <Typography>Categoría: {producto.categoria_producto.nombre_categoria_producto}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default POS;