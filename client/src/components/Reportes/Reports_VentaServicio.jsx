import React, { useEffect, useState } from 'react';
import { Box, Button, Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import { getAllVentas } from "../../api/ventas.api";
import { getAllServicios } from "../../api/servicios.api";
import { PieChart } from 'react-minimal-pie-chart';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { parseISO } from 'date-fns';

export function Reports_VentaServicio() {
  const [ventas, setVentas] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [ventasPorServicio, setVentasPorServicio] = useState([]);

  useEffect(() => {
    async function loadData() {
      try {
        const ventasRes = await getAllVentas();
        setVentas(ventasRes.data);

        const serviciosRes = await getAllServicios();
        setServicios(serviciosRes.data);
      } catch (error) {
        console.error('Error al cargar datos:', error);
      }
    }

    loadData();
  }, []);

  useEffect(() => {
    filtrarVentasPorFecha();
  }, [startDate, endDate]);

  const filtrarVentasPorFecha = () => {
    const ventasFiltradas = ventas.filter((venta) => {
      const fechaVenta = parseISO(venta.fecha_venta);
      return (
        (startDate === null || fechaVenta >= startDate) &&
        (endDate === null || fechaVenta <= endDate)
      );
    });

    const ventasPorServicio = ventasFiltradas.reduce((acc, venta) => {
      const servicioId = venta.fk_servicio;
      const importe = venta.importe;

      // Obtener el nombre del servicio
      const servicio = servicios.find(servicio => servicio.id === servicioId);
      const servicioNombre = servicio ? servicio.nombre_servicio : `Servicio ${servicioId}`;

      if (!acc[servicioId]) {
        acc[servicioId] = { nombre: servicioNombre, total: 0, color: getRandomColor() };
      }

      acc[servicioId].total += importe;
      return acc;
    }, {});

    setVentasPorServicio(ventasPorServicio);
  };

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Button variant="contained" component={Link} to="/reports" size="large">
          Volver a Informes
        </Button>
        <br></br>
        <br></br>
        <br></br>
        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} placeholderText="Fecha de inicio" dateFormat="yyyy-MM-dd'T'HH:mm:ssxxx" />
        <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} placeholderText="Fecha de fin" dateFormat="yyyy-MM-dd'T'HH:mm:ssxxx" />
        <br></br>
        <Button variant="contained" onClick={filtrarVentasPorFecha}>
          Filtrar por rango de fechas
        </Button>
      </Box>
      <br />

      {/* Informe de ventas por servicio */}
      <Box mt={4}>
        <h2>Informe de Ventas por Servicio</h2>

        {/* Gráfico de pastel */}
        <div style={{ width: '50%', margin: 'auto' }}>
          <PieChart data={Object.entries(ventasPorServicio).map(([servicioId, { nombre, total, color }]) => ({
            title: `${nombre} (${servicioId})`,
            value: total,
            color: color,
          }))} />
        </div>

        {/* Lista de servicios y total recaudado */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Servicio</TableCell>
                <TableCell align="right">Total Recaudado</TableCell>
                <TableCell align="right">Color</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.entries(ventasPorServicio).map(([servicioId, { nombre, total, color }], index) => (
                <TableRow key={index}>
                  <TableCell>{nombre}</TableCell>
                  <TableCell align="right">{total}</TableCell>
                  <TableCell align="right">
                    <div style={{ width: '20px', height: '20px', backgroundColor: color, borderRadius: '50%' }}></div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
}