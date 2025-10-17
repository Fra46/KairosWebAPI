import { useState, useEffect } from 'react';
import { turnoService } from '../services/turnoService';
import TurnoCard from '../components/TurnoCard';

function Home() {
  const [turnoActual, setTurnoActual] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    cargarTurnoActual();
  }, []);

  const cargarTurnoActual = async () => {
    try {
      setLoading(true);
      const turno = await turnoService.obtenerActual();
      setTurnoActual(turno);
      setError(null);
    } catch (err) {
      setError('No hay turnos pendientes');
      setTurnoActual(null);
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
    <div className="row justify-content-center">
      <div className="col-lg-8">
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold mb-3">Sistema de Turnos Universitario</h1>
          <p className="lead text-muted">Gestión eficiente de turnos para servicios universitarios</p>
        </div>

        <div className="card border-0 shadow-lg mb-4" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
          <div className="card-body text-center py-5">
            <h2 className="text-white mb-3">Turno Actual</h2>
            {error ? (
              <p className="text-white-50 mb-0">{error}</p>
            ) : turnoActual ? (
              <div className="display-1 fw-bold text-white">#{turnoActual.numeroTurno}</div>
            ) : null}
          </div>
        </div>

        {turnoActual && (
          <div className="card border-0 shadow">
            <div className="card-body p-4">
              <TurnoCard turno={turnoActual} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;