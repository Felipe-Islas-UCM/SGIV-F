import axios  from 'axios';

const usuarioApi = axios.create({
    baseURL: 'http://localhost:8000/api/v1/usuarios/'
})



export const getAllUsuarios = () => usuarioApi.get('/');
export const getUsuario = (id) => usuarioApi.get(`/${id}/`)
export const deleteUsuario = (id) => usuarioApi.delete(`/${id}`)

export const createUsuario = async (usuario) => {
    try {
        const response = await usuarioApi.post('/', usuario);
        return response.data;
    } catch (error) {
        console.error('Error al crear el usuario:', error);
        throw error;
    }
};

export const updateUsuario = async (id, usuario) => {
    try {
        const response = await usuarioApi.put(`/${id}/`, usuario);
        return response.data;
    } catch (error) {
        console.error(`Error al actualizar el usuario con ID ${id}:`, error);
        throw error;
    }
};