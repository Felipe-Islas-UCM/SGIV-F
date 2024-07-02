import axios  from 'axios';

const metodopagoApi = axios.create({
    baseURL: 'http://localhost:8000/api/v1/metodospago/'
})



export const getAllMetodosPago = () => metodopagoApi.get('/');
export const getMetodoPago = (id) => metodopagoApi.get(`/${id}/`)
export const deleteMetodoPago = (id) => metodopagoApi.delete(`/${id}`)

export const createMetodoPago = async (metodopago) => {
    try {
        const response = await metodopagoApi.post('/', metodopago);
        return response.data;
    } catch (error) {
        console.error('Error al crear el método de pago:', error);
        throw error;
    }
};

export const updateMetodoPago = async (id, metodopago) => {
    try {
        const response = await metodopagoApi.put(`/${id}/`, metodopago);
        return response.data;
    } catch (error) {
        console.error(`Error al actualizar el método de pago con ID ${id}:`, error);
        throw error;
    }
};