import axios  from 'axios';

const proveedorApi = axios.create({
    baseURL: 'http://localhost:8000/api/v1/proveedores/'
})



export const getAllProveedores = () => proveedorApi.get('/');
export const getProveedor = (id) => proveedorApi.get(`/${id}/`)
export const deleteProveedor = (id) => proveedorApi.delete(`/${id}`)

export const createProveedor = async (proveedor) => {
    try {
        const response = await proveedorApi.post('/', proveedor);
        return response.data;
    } catch (error) {
        console.error('Error al crear el proveedor:', error);
        throw error;
    }
};

export const updateProveedor = async (id, proveedor) => {
    try {
        const response = await proveedorApi.put(`/${id}/`, proveedor);
        return response.data;
    } catch (error) {
        console.error(`Error al actualizar el proveedor con ID ${id}:`, error);
        throw error;
    }
};