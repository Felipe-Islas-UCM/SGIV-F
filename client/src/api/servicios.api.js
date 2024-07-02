import axios  from 'axios';

const servicioApi = axios.create({
    baseURL: 'http://localhost:8000/api/v1/servicios/'
})

//export const getAllServicios = () => {
//    return servicioApi.get('/')
//}

//export const createServicio = (servicio) => {
//    return servicioApi.post('/',servicio)
//}

export const getAllServicios = () => servicioApi.get('/');
export const getServicio = (id) => servicioApi.get(`/${id}/`)
export const deleteServicio = (id) => servicioApi.delete(`/${id}`)

export const createServicio = async (servicio) => {
    try {
        const response = await servicioApi.post('/', servicio);
        return response.data;
    } catch (error) {
        console.error('Error al crear el servicio:', error);
        throw error;
    }
};

export const updateServicio = async (id, servicio) => {
    try {
        const response = await servicioApi.put(`/${id}/`, servicio);
        return response.data;
    } catch (error) {
        console.error(`Error al actualizar el servicio con ID ${id}:`, error);
        throw error;
    }
};