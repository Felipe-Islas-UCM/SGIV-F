import axios  from 'axios';

const itemsventaApi = axios.create({
    baseURL: 'http://localhost:8000/api/v1/itemsventa/'
})



export const getAllItemsventa = () => itemsventaApi.get('/');
export const getItemventa = (id) => itemsventaApi.get(`/${id}/`)
export const deleteItemventa = (id) => itemsventaApi.delete(`/${id}`)

export const createItemventa = async (itemventa) => {
    try {
        const response = await itemsventaApi.post('/', itemventa);
        return response.data;
    } catch (error) {
        console.error('Error al crear el item de venta:', error);
        throw error;
    }
};

export const updateItemventa = async (id, itemventa) => {
    try {
        const response = await itemsventaApi.put(`/${id}/`, itemventa);
        return response.data;
    } catch (error) {
        console.error(`Error al actualizar el item de venta con ID ${id}:`, error);
        throw error;
    }
};