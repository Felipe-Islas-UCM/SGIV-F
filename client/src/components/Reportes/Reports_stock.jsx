import React, { useEffect, useState } from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import { getAllProductos } from '../../api/productos.api';
import { Box, Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Paper, Button } from '@mui/material';
import Papa from 'papaparse';
import { Link } from 'react-router-dom';

export function Reports_stock() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    async function loadProductos() {
      try {
        const res = await getAllProductos();
        setProductos(res.data);
      } catch (error) {
        console.error('Error al cargar productos:', error);
      }
    }

    loadProductos();
  }, []);

  // Filtrar productos que tengan un valor de stock válido
  const stockData = productos
    .filter(producto => !isNaN(producto.stock))
    .map((producto) => ({
      title: producto.nombre_producto,
      value: producto.stock,
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
    const csvData = stockData.map(data => [data.title, data.value]);
    csvData.unshift(['Producto', 'Stock']); // Agregar encabezados

    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');

    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'stock_data.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div>
      <h1>Informe de Stock</h1>
      <Button variant="contained" component={Link} to="/reports" size="large">
          Volver
        </Button>
      {productos.length > 0 && (
        <Box style={{ display: 'flex' }}>
          <Box style={{ width: '50%' }}>
            <PieChart data={stockData} />
          </Box>
          <Box style={{ width: '50%' }}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Producto</TableCell>
                    <TableCell align="right">Stock</TableCell>
                    <TableCell align="right">Color</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {stockData.map((data, index) => (
                    <TableRow key={index}>
                      <TableCell>{data.title}</TableCell>
                      <TableCell align="right">{data.value}</TableCell>
                      <TableCell align="right">
                        <div style={{ width: '20px', height: '20px', backgroundColor: data.color, borderRadius: '50%' }}></div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      )}
      <Button onClick={downloadCSV} variant="contained" color="primary" style={{ marginTop: '16px' }}>
        Descargar CSV
      </Button>
    </div>
    
  );
}



