import axios  from 'axios';

const categoriaimpuestoApi = axios.create({
    baseURL: 'http://localhost:8000/api/v1/categoriasimpuesto/'
})


export const getAllCategoriasimpuesto = () => categoriaimpuestoApi.get('/');
export const getCategoriaimpuesto = (id) => categoriaimpuestoApi.get(`/${id}/`)
export const deleteCategoriaimpuesto = (id) => categoriaimpuestoApi.delete(`/${id}`)

export const createCategoriaimpuesto = async (categoriaimpuesto) => {
    try {
        const response = await categoriaimpuestoApi.post('/', categoriaimpuesto);
        return response.data;
    } catch (error) {
        console.error('Error al crear la categoria de impuesto:', error);
        throw error;
    }
};

export const updateCategoriaimpuesto = async (id, categoriaimpuesto) => {
    try {
        const response = await categoriaimpuestoApi.put(`/${id}/`, categoriaimpuesto);
        return response.data;
    } catch (error) {
        console.error(`Error al actualizar la categoria de impuesto con ID ${id}:`, error);
        throw error;
    }
};