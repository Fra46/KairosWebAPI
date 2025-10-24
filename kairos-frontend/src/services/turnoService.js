import api from './api';

export const turnoService = {
  crearTurno: async (usuarioId, servicioId) => {
    const response = await api.post('/Turnos', { usuarioId, servicioId });
    return response.data;
  },

  obtenerPendientes: async () => {
    const response = await api.get('/Turnos/pendientes');
    return response.data;
  },

  obtenerActual: async () => {
    const response = await api.get('/Turnos/actual');
    return response.data;
  },

  avanzarTurno: async () => {
    const response = await api.post('/Turnos/siguiente');
    return response.data;
  },

  obtenerTodos: async () => {
    const response = await api.get('/Turnos');
    return response.data;
  },

  obtenerActualesPorServicio: async (servicioId) => {
    const response = await api.get(`/Turnos/actuales/${servicioId}`);
    return response.data;
  },

  avanzarTurnoPorServicio: async (servicioId) => {
    const response = await api.post(`/Turnos/siguiente/${servicioId}`);
    return response.data;
  },

  obtenerPendientesPorServicio: async (servicioId) => {
    const response = await api.get(`/Turnos/pendientes/${servicioId}`);
    return response.data;
  }
};