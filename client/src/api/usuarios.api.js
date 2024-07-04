import axios from 'axios';

const usuarioApi = axios.create({
    baseURL: 'http://localhost:8000/api/v1/usuarios/'
});

// Añade este interceptor para incluir el token en las solicitudes
usuarioApi.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Token ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export const getAllUsuarios = () => usuarioApi.get('/');
export const getUsuario = (id) => usuarioApi.get(`/${id}/`);
export const deleteUsuario = (id) => usuarioApi.delete(`/${id}`);

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

// Añade esta nueva función para el login
export const loginUser = async (credentials) => {
    try {
        const response = await axios.post('http://localhost:8000/api/api/api_login/', credentials);
        return response.data;
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        throw error;
    }
};