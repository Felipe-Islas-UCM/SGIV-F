import axios  from 'axios';

const organizacionApi = axios.create({
    baseURL: 'http://localhost:8000/api/v1/organizaciones/'
})



export const getAllOrganizaciones = () => organizacionApi.get('/');
export const getOrganizacion = (id) => organizacionApi.get(`/${id}/`)
export const deleteOrganizacion = (id) => organizacionApi.delete(`/${id}`)

export const createOrganizacion = async (organizacion) => {
    try {
        const response = await organizacionApi.post('/', organizacion);
        return response.data;
    } catch (error) {
        console.error('Error al crear la organización:', error);
        throw error;
    }
};

export const updateOrganizacion = async (id, organizacion) => {
    try {
        const response = await organizacionApi.put(`/${id}/`, organizacion);
        return response.data;
    } catch (error) {
        console.error(`Error al actualizar la organización con ID ${id}:`, error);
        throw error;
    }
};