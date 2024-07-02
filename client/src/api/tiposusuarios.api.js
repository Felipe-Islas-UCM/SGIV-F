import axios  from 'axios';

const tipousuarioApi = axios.create({
    baseURL: 'http://localhost:8000/api/v1/tiposusuarios/'
})



export const getAllTiposusuario = () => tipousuarioApi.get('/');
export const getTipousuario = (id) => tipousuarioApi.get(`/${id}/`)
export const deleteTipousuario = (id) => tipousuarioApi.delete(`/${id}`)

export const createTipousuario = async (tipousuario) => {
    try {
        const response = await tipousuarioApi.post('/', tipousuario);
        return response.data;
    } catch (error) {
        console.error('Error al crear el tipo de usuario:', error);
        throw error;
    }
};

export const updateTipousuario = async (id, tipousuario) => {
    try {
        const response = await tipousuarioApi.put(`/${id}/`, tipousuario);
        return response.data;
    } catch (error) {
        console.error(`Error al actualizar el tipo de usuario con ID ${id}:`, error);
        throw error;
    }
};