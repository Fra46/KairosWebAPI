import { useState, useEffect } from 'react';
import { turnoService } from '../services/turnoService';
import { servicioService } from '../services/servicioService';

function PanelAdmin() {
  const [servicios, setServicios] = useState([]);
  const [turnosPorServicio, setTurnosPorServicio] = useState({});
  const [pendientesPorServicio, setPendientesPorServicio] = useState({});
  const [loading, setLoading] = useState(false);
  const [servicioSeleccionado, setServicioSeleccionado] = useState(null);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      setLoading(true);
      const [servs, turnosActuales] = await Promise.all([
        servicioService.obtenerTodos(),
        turnoService.obtenerActualesPorServicio()
      ]);
      
      setServicios(servs);
      
      // Organizar turnos por servicio
      const turnosPorServ = {};
      turnosActuales.forEach(turno => {
        turnosPorServ[turno.servicioNombre] = turno;
      });
      setTurnosPorServicio(turnosPorServ);

      // Cargar pendientes para cada servicio
      const pendientes = {};
      for (const servicio of servs) {
        const pend = await turnoService.obtenerPendientesPorServicio(servicio.id);
        pendientes[servicio.id] = pend;
      }
      setPendientesPorServicio(pendientes);
    } catch (error) {
      console.error('Error cargando datos:', error);
    } finally {
      setLoading(false);
    }
  };

  const avanzarTurno = async (servicioId) => {
    try {
      await turnoService.avanzarTurnoPorServicio(servicioId);
      cargarDatos();
    } catch (error) {
      console.error('Error avanzando turno:', error);
      alert('No hay más turnos pendientes para este servicio');
    }
  };

  const verDetalles = (servicioId) => {
    setServicioSeleccionado(servicioSeleccionado === servicioId ? null : servicioId);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-1">Panel de Administración</h2>
          <p className="text-muted mb-0">Gestiona los turnos por servicio</p>
        </div>
        <button 
          className="btn btn-outline-primary"
          onClick={cargarDatos}
          disabled={loading}
        >
          {loading ? 'Actualizando...' : 'Actualizar'}
        </button>
      </div>

      <div className="row g-4">
        {servicios.map((servicio) => {
          const turnoActual = turnosPorServicio[servicio.nombre];
          const pendientes = pendientesPorServicio[servicio.id] || [];
          
          return (
            <div key={servicio.id} className="col-md-6 col-lg-4">
              <div className="card border-0 shadow h-100">
                <div className="card-header bg-primary text-white">
                  <h5 className="mb-0">{servicio.nombre}</h5>
                  <small>{servicio.descripcion}</small>
                </div>
                <div className="card-body text-center">
                  {turnoActual ? (
                    <>
                      <div className="display-3 text-primary fw-bold mb-2">
                        #{turnoActual.numeroTurno}
                      </div>
                      <p className="mb-1"><strong>{turnoActual.usuarioNombre}</strong></p>
                      <p className="text-muted small mb-3">{turnoActual.usuarioTipo}</p>
                      <button 
                        className="btn btn-success w-100 mb-2"
                        onClick={() => avanzarTurno(servicio.id)}
                      >
                        Siguiente Turno
                      </button>
                      <button 
                        className="btn btn-outline-secondary w-100"
                        onClick={() => verDetalles(servicio.id)}
                      >
                        {servicioSeleccionado === servicio.id ? 'Ocultar' : 'Ver'} Pendientes ({pendientes.length})
                      </button>
                    </>
                  ) : (
                    <div className="text-muted py-4">
                      <p>No hay turnos pendientes</p>
                    </div>
                  )}
                </div>
                
                {servicioSeleccionado === servicio.id && pendientes.length > 0 && (
                  <div className="card-footer bg-light">
                    <small className="text-muted d-block mb-2">Próximos turnos:</small>
                    <div className="list-group list-group-flush">
                      {pendientes.slice(0, 5).map((turno) => (
                        <div key={turno.id} className="list-group-item px-0 py-2 bg-transparent">
                          <small>
                            <strong>#{turno.numeroTurno}</strong> - {turno.usuarioNombre}
                          </small>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PanelAdmin;