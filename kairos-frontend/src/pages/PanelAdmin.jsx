import { useState, useEffect } from 'react';
import { turnoService } from '../services/turnoService';
import TurnoCard from '../components/TurnoCard';

function PanelAdmin() {
  const [pendientes, setPendientes] = useState([]);
  const [turnoActual, setTurnoActual] = useState(null);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      const [pend, actual] = await Promise.all([
        turnoService.obtenerPendientes(),
        turnoService.obtenerActual().catch(() => null)
      ]);
      setPendientes(pend);
      setTurnoActual(actual);
    } catch (error) {
      console.error('Error cargando datos:', error);
    }
  };

  const avanzarTurno = async () => {
    try {
      await turnoService.avanzarTurno();
      cargarDatos();
    } catch (error) {
      console.error('Error avanzando turno:', error);
    }
  };

  return (
    <div>
      <h2 className="mb-4">Panel de Administración</h2>
      
      <div className="card mb-4 bg-light">
        <div className="card-body">
          <h3>Turno Actual</h3>
          {turnoActual ? (
            <>
              <div className="display-3 text-primary">#{turnoActual.numeroTurno}</div>
              <p><strong>{turnoActual.usuarioNombre}</strong> - {turnoActual.servicioNombre}</p>
              <button className="btn btn-success" onClick={avanzarTurno}>
                Siguiente Turno
              </button>
            </>
          ) : (
            <p>No hay turnos pendientes</p>
          )}
        </div>
      </div>

      <h3>Turnos Pendientes ({pendientes.length})</h3>
      <div className="row">
        {pendientes.map(turno => (
          <div key={turno.id} className="col-md-6">
            <TurnoCard turno={turno} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default PanelAdmin;