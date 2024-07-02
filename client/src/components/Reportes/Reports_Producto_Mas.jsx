import React, { useEffect, useState } from 'react';
import { Box, Button, Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { PieChart } from 'react-minimal-pie-chart';
import { CSVLink } from 'react-csv';
import { getAllVentas } from './../../api/ventas.api';
import { getAllProductos } from './../../api/productos.api';
import { getAllItemsventa } from './../../api/itemsventa';
import { isValid } from 'date-fns';

export function Reports_Producto_Mas() {
  const [ventas, setVentas] = useState([]);
  const [productos, setProductos] = useState([]);
  const [itemsVenta, setItemsVenta] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [ventasFiltradas, setVentasFiltradas] = useState([]);
  const [productosVendidos, setProductosVendidos] = useState([]);
  const [totalImporte, setTotalImporte] = useState(0);

  // Mueve la función al principio del componente
  const getRandomColor = (index) => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  useEffect(() => {
    async function loadData() {
      try {
        const ventasRes = await getAllVentas();
        const productosRes = await getAllProductos();
        const itemsVentaRes = await getAllItemsventa();

        setVentas(ventasRes.data);
        setProductos(productosRes.data);
        setItemsVenta(itemsVentaRes.data);
      } catch (error) {
        console.error('Error al cargar datos:', error);
      }
    }

    loadData();
  }, []);

  useEffect(() => {
    filtrarVentasPorFecha();
  }, [startDate, endDate, ventas]);

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const filtrarVentasPorFecha = () => {
    const fechasValidas = startDate && endDate && isValid(startDate) && isValid(endDate);

    if (!fechasValidas) {
      console.error('Fechas no válidas');
      return;
    }

    const ventasFiltradas = ventas.filter((venta) => {
      const fechaVenta = new Date(venta.fecha_venta);
      return fechaVenta >= startDate && fechaVenta <= endDate;
    });

    setVentasFiltradas(ventasFiltradas);

    // Calcular el importe total
    const total = ventasFiltradas.reduce((sum, venta) => sum + parseFloat(venta.importe), 0);
    setTotalImporte(total);

    // Calcular productos más vendidos
    const productosVendidos = calcularProductosMasVendidos(ventasFiltradas);
    setProductosVendidos(productosVendidos);
  };

  const calcularProductosMasVendidos = (ventasFiltradas) => {
    const productosVendidosMap = new Map();

    // Iterar sobre las ventas filtradas y sumar la cantidad vendida por producto
    ventasFiltradas.forEach((venta) => {
      const itemsVentaFiltrados = itemsVenta.filter((item) => item.fk_cod_venta === venta.id);
      itemsVentaFiltrados.forEach((itemVenta) => {
        const cantidad = itemVenta.cantidad_vendida;
        const productoId = itemVenta.fk_cod_producto;

        if (productosVendidosMap.has(productoId)) {
          productosVendidosMap.set(productoId, productosVendidosMap.get(productoId) + cantidad);
        } else {
          productosVendidosMap.set(productoId, cantidad);
        }
      });
    });

    // Ordenar los productos por la cantidad vendida de mayor a menor
    const productosVendidos = Array.from(productosVendidosMap.entries()).sort((a, b) => b[1] - a[1]);

    return productosVendidos;
  };

  const csvData = productosVendidos.map(([productoId, cantidad]) => {
    const producto = productos.find((p) => p.id === productoId);

    return {
      'ID Producto': productoId,
      'Nombre Producto': producto ? producto.nombre_producto : 'Desconocido',
      'Cantidad Vendida': cantidad,
    };
  });

  // Agregar una fila para el total
  csvData.push({
    'ID Producto': 'Total Cantidad Vendida',
    'Nombre Producto': '',
    'Cantidad Vendida': totalImporte.toFixed(2),
  });

  // Configuración de datos para el gráfico de pizza
  const pieChartData = productosVendidos.map(([productoId, cantidad], index) => ({
    title: productos.find((p) => p.id === productoId)?.nombre_producto || 'Desconocido',
    value: cantidad,
    color: getRandomColor(index),
  }));

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <DatePicker
          selected={startDate}
          onChange={handleStartDateChange}
          placeholderText="Fecha de inicio"
          dateFormat="yyyy-MM-dd'T'HH:mm:ssxxx"
        />
        <DatePicker
          selected={endDate}
          onChange={handleEndDateChange}
          placeholderText="Fecha de fin"
          dateFormat="yyyy-MM-dd'T'HH:mm:ssxxx"
        />
        <Button variant="contained" onClick={filtrarVentasPorFecha}>
          Filtrar por rango de fechas
        </Button>
        <br />
        <CSVLink data={csvData} filename={'reporte_producto_mas_vendido.csv'}>
          <Button variant="contained" color="primary" style={{ marginTop: '16px' }}>
            Descargar CSV
          </Button>
        </CSVLink>
      </Box>
      <br />
      <PieChart
      data={pieChartData}
      radius={30} // Tamaño del gráfico de pizza
      center={[50, 50]} // Centro del gráfico de pizza
      lengthAngle={360} // Ángulo de longitud del gráfico de pizza
    />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID Producto</TableCell>
              <TableCell>Nombre Producto</TableCell>
              <TableCell>Cantidad Vendida</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productosVendidos.map(([productoId, cantidad]) => (
              <TableRow key={productoId}>
                <TableCell>{productoId}</TableCell>
                <TableCell>{productos.find((p) => p.id === productoId)?.nombre_producto || 'Desconocido'}</TableCell>
                <TableCell>{cantidad}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="contained" component={Link} to="/reports" size="large">
      Volver
      </Button>
    </div>
  );
}
