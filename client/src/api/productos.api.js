import axios from 'axios';

const productoApi = axios.create({
    baseURL: 'http://localhost:8000/api/v1/productos/'
});

export const getAllProductos = () => productoApi.get('/');

export const getProducto = (id) => productoApi.get(`/${id}/`)

export const deleteProducto = (id) => productoApi.delete(`/${id}`)

export const createProducto = async (producto) => {
    try {
        const response = await productoApi.post('/', producto);
        return response.data;
    } catch (error) {
        console.error('Error al crear el producto:', error);
        throw error;
    }
};

export const updateProducto = async (id, producto) => {
    try {
        const response = await productoApi.put(`/${id}/`, producto);
        return response.data;
    } catch (error) {
        console.error(`Error al actualizar el producto con ID ${id}:`, error);
        throw error;
    }
};