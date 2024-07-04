
import React, { useState, useEffect } from 'react';
import {
  TextField,
  Select,
  MenuItem,
  Button,
  Grid,
  Typography,
  IconButton,
  CircularProgress,
  duration,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import toast, { Toaster } from 'react-hot-toast';
import { getAllMetodosPago } from '../../api/metodospago.api';
import { getAllServiciosimpresionorg } from '../../api/serviciosimpresionorg.api';
import { getAllUsuarios } from '../../api/usuarios.api';
import { getAllOrganizaciones } from '../../api/organizaciones.api';
import { createVenta } from '../../api/ventas.api';
import { createVentaorg } from '../../api/ventasorganizacion.api';
import { createItemventaorg } from '../../api/itemsventaorganizacion.api';


export function POSventasorg() {
  const [metodoPago, setMetodoPago] = useState('');
  const [usuario, setUsuario] = useState('');


  const [items, setItems] = useState([{
    servicioImpresion: '',
    medidas: '',
    cantidadVendida: '',
    importe: 0
  }]);

  const [usuarios, setUsuarios] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [metodosPago, setMetodosPago] = useState([]);

  const [serviciosImpresion, setServiciosImpresion] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [proyecto, setProyecto] = useState('');
  const [solicitante, setSolicitante] = useState('');
  const [organizacion, setOrganizacion] = useState('');
  const [organizaciones, setOrganizaciones] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [metodosData, usuariosData, serviciosData, organizacionesData] = await Promise.all([
          getAllMetodosPago(),
          getAllUsuarios(),
          getAllServiciosimpresionorg(),
          getAllOrganizaciones()
        ]);
        console.log('metodosData:', metodosData);
        console.log('usuariosData:', usuariosData);
        console.log('serviciosData:', serviciosData);
        setUsuarios(usuariosData.data);
        setMetodosPago(metodosData.data);
        setServiciosImpresion(serviciosData.data);
        setOrganizaciones(organizacionesData.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error al cargar los datos. Por favor, intente de nuevo.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddItem = () => {
    setItems([...items, {
      servicioImpresion: '',
      medidas: '',
      cantidadVendida: '',
      importe: 0
    }]);
  };

  const handleRemoveItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;

    if (field === 'medidas' || field === 'cantidadVendida' || field === 'servicioImpresion') {
      const servicio = serviciosImpresion.find(s => s.id === newItems[index].servicioImpresion);
      if (servicio && newItems[index].medidas && newItems[index].cantidadVendida) {
        newItems[index].importe = servicio.valor_metro_lineal * newItems[index].medidas * newItems[index].cantidadVendida;
      }
    }

    setItems(newItems);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Show a loading toast and get its ID
    const loadingToastId = toast.loading('Creando venta...');
    
    try {
      // Crear venta
      const ventaData = {
        importe: '0',
        fk_metodo_pago: metodoPago,
        fk_servicio: '1',
        fk_usuario: usuario
      };
      const ventaResponse = await createVenta(ventaData);
  
      // Crear venta organización
      const ventaOrgData = {
        proyecto_ventas_organizacion: proyecto,
        solicitante_ventas_organizacion: solicitante,
        importe_total: '0',
        fk_organizacion: organizacion,
        fk_cod_venta: ventaResponse.id
      };
      const ventaOrgResponse = await createVentaorg(ventaOrgData);
  
      // Crear items de venta organización
      for (let item of items) {
        const itemVentaOrgData = {
          medidas_ventas_organizacion: item.medidas,
          cantidad_vendida: item.cantidadVendida,
          importe_item_venta_organizacion: '0',
          fk_servicio_impresion_organizacion: item.servicioImpresion,
          fk_venta_organizacion: ventaOrgResponse.id
        };
        await createItemventaorg(itemVentaOrgData);
      }
  
      // Update the loading toast to success
      toast.success('Venta creada exitosamente', { id: loadingToastId });
  
      // Clear the form
      setMetodoPago('');
      setUsuario('');
      setProyecto('');
      setSolicitante('');
      setOrganizacion('');
      setItems([{
        servicioImpresion: '',
        medidas: '',
        cantidadVendida: '',
        importe: 0
      }]);
  
    } catch (error) {
      console.error('Error al crear la venta:', error);
      // Update the loading toast to error
      toast.error('Error al crear la venta. Por favor, intente de nuevo.', { id: loadingToastId });
    }
  };


  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <>
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Select
            fullWidth
            value={metodoPago}
            onChange={(e) => setMetodoPago(e.target.value)}
            displayEmpty
          >
            <MenuItem value="" disabled>Método de pago</MenuItem>
            {metodosPago.map((metodo) => (
              <MenuItem key={metodo.id} value={metodo.id}>{metodo.nombre_metodo_pago}</MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={3}>
          <Select
            fullWidth
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            displayEmpty
          >
            <MenuItem value="" disabled>Usuario</MenuItem>
            {usuarios.map((user) => (
              <MenuItem key={user.id} value={user.id}>{user.nombre_usuario}</MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={3}>
          <TextField
            fullWidth
            label="Proyecto"
            value={proyecto}
            onChange={(e) => setProyecto(e.target.value)}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            fullWidth
            label="Solicitante"
            value={solicitante}
            onChange={(e) => setSolicitante(e.target.value)}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} style={{ marginTop: '1rem' }}>
        <Grid item xs={12}>
          <Select
            fullWidth
            value={organizacion}
            onChange={(e) => setOrganizacion(e.target.value)}
            displayEmpty
          >
            <MenuItem value="" disabled>Organización</MenuItem>
            {organizaciones.map((org) => (
              <MenuItem key={org.id} value={org.id}>{org.nombre_organizacion}</MenuItem>
            ))}
          </Select>
        </Grid>
      </Grid>


      {items.map((item, index) => (
        <Grid container spacing={2} key={index} style={{ marginTop: '1rem' }}>
          <Grid item xs={3}>
            <Select
              fullWidth
              value={item.servicioImpresion}
              onChange={(e) => handleItemChange(index, 'servicioImpresion', e.target.value)}
              displayEmpty
            >
              <MenuItem value="" disabled>Servicio de impresión</MenuItem>
              {serviciosImpresion.map((servicio) => (
                <MenuItem key={servicio.id} value={servicio.id}>{servicio.nombre_servicio_impresion_organizacion}</MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={2}>
            <TextField
              fullWidth
              label="Medidas"
              type="number"
              value={item.medidas}
              onChange={(e) => handleItemChange(index, 'medidas', parseFloat(e.target.value))}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              fullWidth
              label="Cantidad"
              type="number"
              value={item.cantidadVendida}
              onChange={(e) => handleItemChange(index, 'cantidadVendida', parseInt(e.target.value))}
            />
          </Grid>
          <Grid item xs={2}>
            <Typography>Importe: ${item.importe.toFixed(2)}</Typography>
          </Grid>
          <Grid item xs={1}>
            <IconButton onClick={() => handleRemoveItem(index)} disabled={items.length === 1}>
              <RemoveIcon />
            </IconButton>
          </Grid>
        </Grid>
      ))}

      <Button startIcon={<AddIcon />} onClick={handleAddItem} style={{ marginTop: '1rem' }}>
        Agregar Item
      </Button>

      <Button type="submit" variant="contained" color="primary" style={{ marginTop: '1rem' }}>
        Guardar Venta
      </Button>
    </form>
    </>
  );
}
