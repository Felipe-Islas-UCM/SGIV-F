import axios  from 'axios';

const ventaorgApi = axios.create({
    baseURL: 'http://localhost:8000/api/v1/ventasorganizacion/'
})


export const getAllVentasorg = () => ventaorgApi.get('/');
export const getVentaorg = (id) => ventaorgApi.get(`/${id}/`)
export const deleteVentaorg = (id) => ventaorgApi.delete(`/${id}`)

export const createVentaorg = async (ventaorg) => {
    try {
        const response = await ventaorgApi.post('/', ventaorg);
        return response.data;
    } catch (error) {
        console.error('Error al crear la venta de organización:', error);
        throw error;
    }
};

export const updateVentaorg = async (id, ventaorg) => {
    try {
        const response = await ventaorgApi.put(`/${id}/`, ventaorg);
        return response.data;
    } catch (error) {
        console.error(`Error al actualizar la venta de organización con ID ${id}:`, error);
        throw error;
    }
};