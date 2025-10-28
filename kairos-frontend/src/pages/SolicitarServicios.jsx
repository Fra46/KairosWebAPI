import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { servicioService } from '../services/servicioService';
import { turnoService } from '../services/turnoService';

function SolicitarServicios() {
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const current = localStorage.getItem('currentUser');
    if (!current) {
      navigate('/solicitar');
      return;
    }
    cargarServicios();
  }, []);

  const cargarServicios = async () => {
    try {
      setLoading(true);
      const data = await servicioService.obtenerTodos();
      setServicios(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const solicitar = async (servicioId) => {
    try {
      const current = JSON.parse(localStorage.getItem('currentUser'));
      if (!current) {
        navigate('/solicitar');
        return;
      }
      await turnoService.crearTurno(current.id, servicioId);
      setMensaje({ tipo: 'success', texto: 'Turno solicitado exitosamente' });
      setTimeout(() => setMensaje(null), 3000);
    } catch (err) {
      console.error(err);
      setMensaje({ tipo: 'danger', texto: 'Error al solicitar turno' });
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-1">Selecciona un Servicio</h2>
          <p className="text-muted mb-0">Elige el servicio para solicitar tu turno</p>
        </div>
        <div>
          <button className="btn btn-outline-secondary me-2" onClick={() => { localStorage.removeItem('currentUser'); navigate('/solicitar'); }}>Cerrar sesión</button>
        </div>
      </div>

      {mensaje && (
        <div className={`alert alert-${mensaje.tipo}`} role="alert">
          {mensaje.texto}
        </div>
      )}

      <div className="row">
        {servicios.length === 0 ? (
          <div className="col-12 text-center text-muted py-4">No hay servicios disponibles</div>
        ) : (
          servicios.map((servicio) => (
            <div key={servicio.id} className="col-md-6 col-lg-4 mb-3">
              <div className="card h-100 shadow-sm">
                <div className="card-body d-flex flex-column justify-content-between">
                  <div>
                    <h5 className="card-title">{servicio.nombre}</h5>
                    <p className="card-text text-muted">{servicio.descripcion}</p>
                  </div>
                  <div className="mt-3">
                    <button className="btn btn-primary w-100" onClick={() => solicitar(servicio.id)}>Solicitar Turno</button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default SolicitarServicios;
