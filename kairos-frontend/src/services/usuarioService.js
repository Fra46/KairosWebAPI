import api from './api';

export const usuarioService = {
  obtenerTodos: async () => {
    const response = await api.get('/Usuarios');
    return response.data;
  },

  obtenerPorId: async (id) => {
    const response = await api.get(`/Usuarios/${id}`);
    return response.data;
  },

  crear: async (usuario) => {
    const response = await api.post('/Usuarios', usuario);
    return response.data;
  },

  actualizar: async (id, usuario) => {
    const response = await api.put(`/Usuarios/${id}`, usuario);
    return response.data;
  },

  eliminar: async (id) => {
    const response = await api.delete(`/Usuarios/${id}`);
    return response.data;
  }
};