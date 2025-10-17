import api from './api';

export const servicioService = {
  obtenerTodos: async () => {
    const response = await api.get('/Servicios');
    return response.data;
  },

  obtenerPorId: async (id) => {
    const response = await api.get(`/Servicios/${id}`);
    return response.data;
  },

  crear: async (servicio) => {
    const response = await api.post('/Servicios', servicio);
    return response.data;
  },

  actualizar: async (id, servicio) => {
    const response = await api.put(`/Servicios/${id}`, servicio);
    return response.data;
  },

  eliminar: async (id) => {
    const response = await api.delete(`/Servicios/${id}`);
    return response.data;
  }
};