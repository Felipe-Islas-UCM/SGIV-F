import axios  from 'axios';

const serviciosimpresionorgApi = axios.create({
    baseURL: 'http://localhost:8000/api/v1/serviciosimpresionorg/'
})


export const getAllServiciosimpresionorg = () => serviciosimpresionorgApi.get('/');
export const getServicioimpresionorg = (id) => serviciosimpresionorgApi.get(`/${id}/`)
export const deleteServicioimpresionorg = (id) => serviciosimpresionorgApi.delete(`/${id}`)

export const createServicioimpresionorg = async (servicioimpresionorg) => {
    try {
        const response = await serviciosimpresionorgApi.post('/', servicioimpresionorg);
        return response.data;
    } catch (error) {
        console.error('Error al crear el servicio de impresión:', error);
        throw error;
    }
};

export const updateServicioimpresionorg = async (id, servicioimpresionorg) => {
    try {
        const response = await serviciosimpresionorgApi.put(`/${id}/`, servicioimpresionorg);
        return response.data;
    } catch (error) {
        console.error(`Error al actualizar el servicio de impresión con ID ${id}:`, error);
        throw error;
    }
};