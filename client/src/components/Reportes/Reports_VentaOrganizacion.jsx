import React, { useEffect, useState } from 'react';
import { Box, Button, Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import { getAllVentasorg } from "../../api/ventasorganizacion.api";
import { getAllOrganizaciones } from "../../api/organizaciones.api";
import { getAllVentas } from "../../api/ventas.api";
import { PieChart } from 'react-minimal-pie-chart';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Papa from 'papaparse';
import { parseISO, isValid } from 'date-fns';

export function Reports_VentaOrganizacion() {
  const [ventasOrganizacion, setVentasOrganizacion] = useState([]);
  const [organizaciones, setOrganizaciones] = useState([]);
  const [ventas, setVentas] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [ventasFiltradas, setVentasFiltradas] = useState([]);

  useEffect(() => {
    async function loadData() {
      try {
        const [ventasOrganizacionRes, organizacionesRes, ventasRes] = await Promise.all([
          getAllVentasorg(),
          getAllOrganizaciones(),
          getAllVentas()
        ]);

        setVentasOrganizacion(ventasOrganizacionRes.data);
        setOrganizaciones(organizacionesRes.data);
        setVentas(ventasRes.data);
      } catch (error) {
        console.error('Error al cargar datos:', error);
      }
    }

    loadData();
  }, []);

  useEffect(() => {
    filtrarVentasPorFecha();
  }, [startDate, endDate, ventasOrganizacion, ventas]);

  const filtrarVentasPorFecha = () => {
    const ventasFiltradas = ventasOrganizacion.filter((ventaOrg) => {
      const venta = ventas.find(v => v.id === ventaOrg.fk_cod_venta);
      if (!venta || !venta.fecha_venta) {
        console.warn('Venta sin fecha:', ventaOrg);
        return false;
      }

      const fechaVenta = parseISO(venta.fecha_venta);
      if (!isValid(fechaVenta)) {
        console.warn('Fecha de venta inválida:', venta.fecha_venta);
        return false;
      }

      return (
        (startDate === null || fechaVenta >= startDate) &&
        (endDate === null || fechaVenta <= endDate)
      );
    });

    setVentasFiltradas(ventasFiltradas);
  };

  const organizacionesNombres = organizaciones.reduce((acc, organizacion) => {
    acc[organizacion.id] = organizacion.nombre_organizacion;
    return acc;
  }, {});

  const ventasCalculadas = ventasFiltradas.reduce((acc, venta) => {
    const organizacionId = venta.fk_organizacion;
    const importe = venta.importe_total;

    const nombreOrganizacion = organizacionesNombres[organizacionId] || 'Organización desconocida';

    if (!acc[organizacionId]) {
      acc[organizacionId] = { nombre: nombreOrganizacion, total: 0, color: getRandomColor() };
    }

    acc[organizacionId].total += importe;
    return acc;
  }, {});

  const pieChartData = Object.values(ventasCalculadas).map(({ nombre, total, color }) => ({
    title: nombre,
    value: total,
    color: color,
  }));

  function getRandomColor() {
    return '#' + Math.floor(Math.random()*16777215).toString(16);
  }

  const downloadCSV = () => {
    const csvData = Object.values(ventasCalculadas).map(({ nombre, total }) => [nombre, total]);
    csvData.unshift(['Organización', 'Total Recaudado']);

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
        <Button variant="contained" component={Link} to="/admin/reports" size="large">
          Volver a Informes
        </Button>
      </Box>
      <br />

      <Box mt={4}>
        <h2>Informe de Ventas por Organización</h2>

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

        {pieChartData.length > 0 ? (
          <div style={{ width: '50%', margin: 'auto', marginTop: '20px', marginBottom: '20px' }}>
            <PieChart
              data={pieChartData}
              label={({ dataEntry }) => `${dataEntry.title}: ${Math.round(dataEntry.percentage)}%`}
              labelStyle={{
                fontSize: '5px',
                fontFamily: 'sans-serif',
              }}
              radius={42}
              labelPosition={112}
            />
          </div>
        ) : (
          <p>No hay datos para mostrar en el gráfico.</p>
        )}

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
              {Object.values(ventasCalculadas).map(({ nombre, total, color }, index) => (
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

        <Button onClick={downloadCSV} variant="contained" color="primary" style={{ marginTop: '16px' }}>
          Descargar CSV
        </Button>
      </Box>
    </div>
  );
}