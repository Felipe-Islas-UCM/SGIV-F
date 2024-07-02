import axios  from 'axios';

const itemsventaorgApi = axios.create({
    baseURL: 'http://localhost:8000/api/v1/itemsventaorganizacion/'
})



export const getAllItemsventaorg = () => itemsventaorgApi.get('/');
export const getItemventaorg = (id) => itemsventaorgApi.get(`/${id}/`)
export const deleteItemventaorg = (id) => itemsventaorgApi.delete(`/${id}`)

export const createItemventaorg = async (itemventaorg) => {
    try {
        const response = await itemsventaorgApi.post('/', itemventaorg);
        return response.data;
    } catch (error) {
        console.error('Error al crear el item de venta de organizacion:', error);
        throw error;
    }
};

export const updateItemventaorg = async (id, itemventaorg) => {
    try {
        const response = await itemsventaorgApi.put(`/${id}/`, itemventaorg);
        return response.data;
    } catch (error) {
        console.error(`Error al actualizar el item de venta de organizacion con ID ${id}:`, error);
        throw error;
    }
};