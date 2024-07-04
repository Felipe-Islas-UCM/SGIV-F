import axios from 'axios';

const usuarioApi = axios.create({
    baseURL: 'http://localhost:8000/api/v1/usuarios/'
});

// El interceptador se ejecuta antes de que se envie la solicitud a la api
usuarioApi.interceptors.request.use(
    config => { 
        const token = localStorage.getItem('token'); //Obtiene el token de autenticación
        if (token) {
            config.headers['Authorization'] = `Token ${token}`; //Si hay un token disponible, se agrega al encabezado de autorización (Authorization)
                                                                //para autenticar al usuario en el backend.
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export const getAllUsuarios = () => usuarioApi.get('/'); //Solicitud GET que obtiene todos los usuarios
export const getUsuario = (id) => usuarioApi.get(`/${id}/`);  //Solicitud GET para obtener usuario especifico por su ID
export const deleteUsuario = (id) => usuarioApi.delete(`/${id}`); //Elimina usuario por su ID

export const createUsuario = async (usuario) => { //Solicitud POST para crear nuevo usuario con los datos proporcionados
    try {
        const response = await usuarioApi.post('/', usuario);
        return response.data;
    } catch (error) {
        console.error('Error al crear el usuario:', error);
        throw error;
    }
};

export const updateUsuario = async (id, usuario) => { // Solicitud PUT para actualizar un usuario existente con los datos proporcionados
    try {
        const response = await usuarioApi.put(`/${id}/`, usuario);
        return response.data;
    } catch (error) {
        console.error(`Error al actualizar el usuario con ID ${id}:`, error);
        throw error;
    }
};

// Esta función permite iniciar sesión enviando credenciales (nombre de usuario y contraseña) 
export const loginUser = async (credentials) => { 
    try {
        const response = await axios.post('http://localhost:8000/api/api/api_login/', credentials); //solicitud POST con las credenciales proporcionadas.
        return response.data; //Si la solicitud es exitosa, devuelve los datos de la respuesta
    } catch (error) {
        console.error('Error al iniciar sesión:', error); //Si la solicitud fallalo registra en la consola y lo lanza de nuevo
        throw error;
    }
};