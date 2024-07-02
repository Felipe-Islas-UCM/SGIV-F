import React, { useEffect, useState } from 'react';
import { Box, Button, Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import { getAllVentas } from "../../api/ventas.api";
import { getAllOrganizaciones } from "../../api/organizaciones.api";
import { PieChart } from 'react-minimal-pie-chart';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Papa from 'papaparse';
import { parseISO, format } from 'date-fns';

export function Reports_VentaOrganizacion() {
  const [ventas, setVentas] = useState([]);
  const [organizaciones, setOrganizaciones] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [ventasPorOrganizacion, setVentasPorOrganizacion] = useState([]);

  useEffect(() => {
    async function loadData() {
      try {
        const ventasRes = await getAllVentas();
        setVentas(ventasRes.data);

        const organizacionesRes = await getAllOrganizaciones();
        setOrganizaciones(organizacionesRes.data);
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

    // Lógica adicional según tus necesidades...
    // Puedes actualizar el estado de ventasPorOrganizacion con los resultados del filtro
    setVentasPorOrganizacion(ventasFiltradas);
  };

  // Mapear identificadores de organizaciones a nombres
  const organizacionesNombres = organizaciones.reduce((acc, organizacion) => {
    acc[organizacion.id] = organizacion.nombre_organizacion;
    return acc;
  }, {});

  // Calcular el dinero recaudado por cada organización
  const ventasCalculadas = ventasPorOrganizacion.reduce((acc, venta) => {
    const organizacionId = venta.fk_ventas_organizacion;
    const importe = venta.importe;

    let nombreOrganizacion;
    if (!organizacionesNombres[organizacionId]) {
      nombreOrganizacion = 'Cliente sin organización';
    } else {
      nombreOrganizacion = organizacionesNombres[organizacionId];
    }

    if (!acc[organizacionId]) {
      acc[organizacionId] = { nombre: nombreOrganizacion, total: 0, color: getRandomColor() };
    }

    acc[organizacionId].total += importe;
    return acc;
  }, {});

  // Preparar datos para el gráfico de pastel
  const pieChartData = Object.entries(ventasCalculadas).map(([organizacionId, { nombre, total }]) => ({
    title: `${nombre} (${organizacionId})`,
    value: total,
    color: getRandomColor(),
  }));

  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  const downloadCSV = () => {
    const csvData = Object.entries(ventasCalculadas).map(([organizacionId, { nombre, total }]) => [nombre, total]);
    csvData.unshift(['Organización', 'Total Recaudado']); // Agregar encabezados

    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');

    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'ventas_por_organizacion.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Button variant="contained" component={Link} to="/reports" size="large">
          Volver a Informes
        </Button>
      </Box>
      <br />

      {/* Informe de ventas por organización */}
      <Box mt={4}>
        <h2>Informe de Ventas por Organización</h2>

        {/* Selección de fechas */}
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          placeholderText="Fecha de inicio"
          dateFormat="yyyy-MM-dd"
        />
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          placeholderText="Fecha de fin"
          dateFormat="yyyy-MM-dd"
        />
        <Button variant="contained" onClick={filtrarVentasPorFecha}>
          Filtrar por fechas
        </Button>

        {/* Gráfico de pastel */}
        <div style={{ width: '50%', margin: 'auto' }}>
          <PieChart data={pieChartData} />
        </div>

        {/* Lista de organizaciones y total recaudado */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Organización</TableCell>
                <TableCell align="right">Total Recaudado</TableCell>
                <TableCell align="right">Color</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.entries(ventasCalculadas).map(([organizacionId, { nombre, total, color }], index) => (
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

        {/* Botón para descargar CSV */}
        <Button onClick={downloadCSV} variant="contained" color="primary" style={{ marginTop: '16px' }}>
          Descargar CSV
        </Button>
      </Box>
    </div>
  );
}
