import { useState, useEffect } from 'react';
import { turnoService } from '../services/turnoService';

function Home() {
  const [turnosPorServicio, setTurnosPorServicio] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    cargarTurnosActuales();
  }, []);

  const cargarTurnosActuales = async () => {
    try {
      setLoading(true);
      const turnos = await turnoService.obtenerActualesPorServicio();
      setTurnosPorServicio(turnos);
      setError(null);
    } catch (err) {
      setError('Error al cargar los turnos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold mb-3">Sistema de Turnos Universitario</h1>
        <p className="lead text-muted">Gestión eficiente de turnos para servicios universitarios</p>
        <button 
          className="btn btn-outline-primary mt-3"
          onClick={cargarTurnosActuales}
        >
          Actualizar Turnos
        </button>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {turnosPorServicio.length === 0 ? (
        <div className="alert alert-info text-center">
          No hay turnos activos en este momento
        </div>
      ) : (
        <div className="row g-4">
          {turnosPorServicio.map((turno) => (
            <div key={turno.id} className="col-md-6 col-lg-4">
              <div className="card border-0 shadow-lg h-100" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                <div className="card-body text-center py-5">
                  <h3 className="text-white mb-3">{turno.servicioNombre}</h3>
                  <div className="display-1 fw-bold text-white mb-3">#{turno.numeroTurno}</div>
                  <div className="bg-white bg-opacity-25 rounded p-3 text-white">
                    <p className="mb-1"><strong>{turno.usuarioNombre}</strong></p>
                    <p className="mb-0 small">{turno.usuarioTipo}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;