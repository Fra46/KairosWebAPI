import api from './api';

export const turnoService = {
  // Crear nuevo turno
  crearTurno: async (usuarioId, servicioId) => {
    const response = await api.post('/Turnos', { usuarioId, servicioId });
    return response.data;
  },

  // Obtener turnos pendientes
  obtenerPendientes: async () => {
    const response = await api.get('/Turnos/pendientes');
    return response.data;
  },

  // Obtener turno actual
  obtenerActual: async () => {
    const response = await api.get('/Turnos/actual');
    return response.data;
  },

  // Avanzar al siguiente turno
  avanzarTurno: async () => {
    const response = await api.post('/Turnos/siguiente');
    return response.data;
  },

  // Obtener todos los turnos
  obtenerTodos: async () => {
    const response = await api.get('/Turnos');
    return response.data;
  }
};