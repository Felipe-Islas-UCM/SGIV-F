import axios  from 'axios';

const servicioApi = axios.create({
    baseURL: 'http://localhost:8000/api/v1/ventas/'
})


export const getAllVentas = () => servicioApi.get('/');
export const getVenta = (id) => servicioApi.get(`/${id}/`)
export const deleteVenta = (id) => servicioApi.delete(`/${id}`)

export const createVenta = async (venta) => {
    try {
        const response = await servicioApi.post('/', venta);
        return response.data;
    } catch (error) {
        console.error('Error al crear la venta:', error);
        throw error;
    }
};

export const updateVenta = async (id, venta) => {
    try {
        const response = await servicioApi.put(`/${id}/`, venta);
        return response.data;
    } catch (error) {
        console.error(`Error al actualizar la venta con ID ${id}:`, error);
        throw error;
    }
};