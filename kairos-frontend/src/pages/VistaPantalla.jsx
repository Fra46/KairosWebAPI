import { useState, useEffect } from 'react';
import { turnoService } from '../services/turnoService';

function VistaPantalla() {
  const [turnosPorServicio, setTurnosPorServicio] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarTurnos();
    const interval = setInterval(cargarTurnos, 10000);
    return () => clearInterval(interval);
  }, []);

  const cargarTurnos = async () => {
    try {
      const turnos = await turnoService.obtenerActualesPorServicio();
      setTurnosPorServicio(turnos);
      setLoading(false);
    } catch (error) {
      console.error('Error cargando turnos:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center bg-dark">
        <div className="spinner-border text-light" style={{ width: '4rem', height: '4rem' }} role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100 bg-dark text-white p-4">
      <div className="text-center mb-5">
        <h1 className="display-3 fw-bold mb-3">Turnos Actuales</h1>
        <p className="lead">Por favor espere su turno</p>
      </div>

      {turnosPorServicio.length === 0 ? (
        <div className="text-center">
          <h2 className="display-4 text-muted">No hay turnos activos</h2>
        </div>
      ) : (
        <div className="row g-4">
          {turnosPorServicio.map((turno) => (
            <div key={turno.id} className="col-md-6">
              <div className="card bg-primary text-white border-0 shadow-lg">
                <div className="card-body text-center p-5">
                  <h2 className="display-6 mb-3">{turno.servicioNombre}</h2>
                  <div className="display-1 fw-bold mb-3" style={{ fontSize: '6rem' }}>
                    #{turno.numeroTurno}
                  </div>
                  <div className="bg-white bg-opacity-25 rounded p-3">
                    <p className="mb-0 fs-4">{turno.usuarioNombre}</p>
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

export default VistaPantalla;