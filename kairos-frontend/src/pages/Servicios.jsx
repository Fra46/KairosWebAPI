import { useState, useEffect } from 'react';
import { servicioService } from '../services/servicioService';

function Servicios() {
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nuevoServicio, setNuevoServicio] = useState({ nombre: '', descripcion: '' });
  const [mostrarForm, setMostrarForm] = useState(false);

  useEffect(() => {
    cargarServicios();
  }, []);

  const cargarServicios = async () => {
    try {
      setLoading(true);
      const data = await servicioService.obtenerTodos();
      setServicios(data);
      setError(null);
    } catch (err) {
      setError('Error al cargar los servicios');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await servicioService.crear(nuevoServicio);
      setNuevoServicio({ nombre: '', descripcion: '' });
      setMostrarForm(false);
      cargarServicios();
    } catch (err) {
      setError('Error al crear el servicio');
      console.error(err);
    }
  };

  const handleEliminar = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este servicio?')) {
      try {
        await servicioService.eliminar(id);
        cargarServicios();
      } catch (err) {
        setError('Error al eliminar el servicio');
        console.error(err);
      }
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
        <h2>Servicios Disponibles</h2>
        <button 
          className="btn btn-primary" 
          onClick={() => setMostrarForm(!mostrarForm)}
        >
          {mostrarForm ? 'Cancelar' : 'Nuevo Servicio'}
        </button>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {mostrarForm && (
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">Crear Nuevo Servicio</h5>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  value={nuevoServicio.nombre}
                  onChange={(e) => setNuevoServicio({ ...nuevoServicio, nombre: e.target.value })}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Descripción</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={nuevoServicio.descripcion}
                  onChange={(e) => setNuevoServicio({ ...nuevoServicio, descripcion: e.target.value })}
                  required
                />
              </div>
              <button type="submit" className="btn btn-success">Crear Servicio</button>
            </form>
          </div>
        </div>
      )}

      <div className="row">
        {servicios.length === 0 ? (
          <div className="col-12">
            <p className="text-muted">No hay servicios disponibles</p>
          </div>
        ) : (
          servicios.map((servicio) => (
            <div key={servicio.id} className="col-md-6 col-lg-4 mb-3">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{servicio.nombre}</h5>
                  <p className="card-text">{servicio.descripcion}</p>
                </div>
                <div className="card-footer bg-transparent">
                  <button 
                    className="btn btn-sm btn-danger"
                    onClick={() => handleEliminar(servicio.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Servicios;