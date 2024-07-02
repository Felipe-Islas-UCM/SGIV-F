import React, { useEffect, useState } from "react";
import { getAllVentas } from "./../../api/ventas.api";
import { Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format, parseISO } from 'date-fns';
import { CSVLink } from 'react-csv';

export function Reports_venta() {
  const [ventas, setVentas] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [ventasFiltradas, setVentasFiltradas] = useState([]);
  const [totalImporte, setTotalImporte] = useState(0);

  useEffect(() => {
    async function loadVentas() {
      try {
        const res = await getAllVentas();
        console.log(res);
        setVentas(res.data);
      } catch (error) {
        console.error('Error al cargar las ventas:', error);
      }
    }
    loadVentas();
  }, []);

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const filtrarVentasPorFecha = () => {
    const ventasFiltradas = ventas.filter((venta) => {
      const fechaVenta = parseISO(venta.fecha_venta);
      return (
        (startDate === null || fechaVenta >= startDate) &&
        (endDate === null || fechaVenta <= endDate)
      );
    });

    setVentasFiltradas(ventasFiltradas);

    // Calcular el importe total
    const total = ventasFiltradas.reduce((sum, venta) => sum + parseFloat(venta.importe), 0);
    setTotalImporte(total);
  };

  const csvData = ventasFiltradas.map(venta => ({
    ID: venta.id,
    'Fecha de Venta': format(parseISO(venta.fecha_venta), "yyyy-MM-dd'T'HH:mm:ssxxx"),
    Servicio: venta.fk_servicio,
    'Venta organización': venta.fk_ventas_organizacion,
    'Método pago': venta.fk_metodo_pago,
    Importe: venta.importe
  }));

  // Agregar una fila para el total
  csvData.push({
    ID: 'Total Importe',
    'Fecha de Venta': '',
    Servicio: '',
    'Venta organización': '',
    'Método pago': '',
    Importe: totalImporte.toFixed(2)
  });

  return (
    <div>
      
      <Box sx={{ flexGrow: 1 }}>
        <DatePicker selected={startDate} onChange={handleStartDateChange} placeholderText="Fecha de inicio" dateFormat="yyyy-MM-dd'T'HH:mm:ssxxx" />
        <DatePicker selected={endDate} onChange={handleEndDateChange} placeholderText="Fecha de fin" dateFormat="yyyy-MM-dd'T'HH:mm:ssxxx" />
        <Button variant="contained" onClick={filtrarVentasPorFecha}>
          Filtrar por rango de fechas
        </Button>
        <br></br>
        <CSVLink data={csvData} filename={"reporte_stock.csv"}>
        <Button variant="contained" color="primary" style={{ marginTop: '16px' }}>
          Descargar CSV
        </Button>
      </CSVLink>
      </Box>
      <br/>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Fecha de Venta</TableCell>
              <TableCell>Servicio</TableCell>
              <TableCell>Venta organización</TableCell>
              <TableCell>Método pago</TableCell>
              <TableCell>Importe</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ventasFiltradas.map((venta) => (
              <TableRow key={venta.id}>
                <TableCell>{venta.id}</TableCell>
                <TableCell>{format(parseISO(venta.fecha_venta), "yyyy-MM-dd'T'HH:mm:ssxxx")}</TableCell>
                <TableCell>{venta.servicio.nombre_servicio}</TableCell>
                <TableCell>{venta.fk_ventas_organizacion}</TableCell>
                <TableCell>{venta.metodo_pago.nombre_metodo_pago}</TableCell>
                <TableCell>{venta.importe}</TableCell>
                <TableCell>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableBody>
            <TableRow>
              <TableCell colSpan={5}>Total Importe</TableCell>
              <TableCell>{totalImporte}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="contained" component={Link} to="/reports" size="large">
          Volver
        </Button>
    </div>

  );
}



