import axios  from 'axios';

const categoriaproductoApi = axios.create({
    baseURL: 'http://localhost:8000/api/v1/categoriasproducto/'
})



export const getAllCategoriasproducto = () => categoriaproductoApi.get('/');
export const getCategoriaproducto = (id) => categoriaproductoApi.get(`/${id}/`)
export const deleteCategoriaproducto = (id) => categoriaproductoApi.delete(`/${id}`)

export const createCategoriaproducto = async (categoriaproducto) => {
    try {
        const response = await categoriaproductoApi.post('/', categoriaproducto);
        return response.data;
    } catch (error) {
        console.error('Error al crear la categoria de producto:', error);
        throw error;
    }
};

export const updateCategoriaproducto = async (id, categoriaproducto) => {
    try {
        const response = await categoriaproductoApi.put(`/${id}/`, categoriaproducto);
        return response.data;
    } catch (error) {
        console.error(`Error al actualizar la categoria de producto con ID ${id}:`, error);
        throw error;
    }
};