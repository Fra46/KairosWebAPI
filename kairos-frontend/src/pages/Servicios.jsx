import { useState, useEffect } from 'react';
import { servicioService } from '../services/servicioService';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Loader2, PlusCircle, Trash2 } from 'lucide-react';

function Servicios() {
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nuevoServicio, setNuevoServicio] = useState({ nombre: '', descripcion: '' });
  const [mostrarForm, setMostrarForm] = useState(false);
  const [enCreacion, setEnCreacion] = useState(false);
  const [exito, setExito] = useState(false);

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
    setEnCreacion(true);
    try {
      await servicioService.crear(nuevoServicio);
      setNuevoServicio({ nombre: '', descripcion: '' });
      setExito(true);
      setTimeout(() => setExito(false), 3000);
      setMostrarForm(false);
      cargarServicios();
    } catch (err) {
      setError('Error al crear el servicio');
      console.error(err);
    } finally {
      setEnCreacion(false);
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
        <h2 className="fw-bold">Gestión de Servicios</h2>
        <button 
          className="btn btn-primary d-flex align-items-center gap-2"
          onClick={() => setMostrarForm(!mostrarForm)}
        >
          <PlusCircle size={18} />
          {mostrarForm ? 'Cancelar' : 'Nuevo Servicio'}
        </button>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {exito && (
        <motion.div 
          className="alert alert-success d-flex align-items-center gap-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
        >
          <CheckCircle size={20} /> Servicio agregado exitosamente
        </motion.div>
      )}

      <AnimatePresence>
        {mostrarForm && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="card shadow-sm border-0 mb-4"
          >
            <div className="card-body">
              <h5 className="card-title mb-3 text-primary fw-semibold">Agregar Nuevo Servicio</h5>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Nombre del Servicio</label>
                  <input
                    type="text"
                    className="form-control"
                    value={nuevoServicio.nombre}
                    onChange={(e) => setNuevoServicio({ ...nuevoServicio, nombre: e.target.value })}
                    required
                    placeholder="Ej: Atención médica general"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Descripción</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    value={nuevoServicio.descripcion}
                    onChange={(e) => setNuevoServicio({ ...nuevoServicio, descripcion: e.target.value })}
                    required
                    placeholder="Describe brevemente el servicio..."
                  />
                </div>
                <button 
                  type="submit" 
                  className="btn btn-success d-flex align-items-center justify-content-center gap-2"
                  disabled={enCreacion}
                >
                  {enCreacion ? (
                    <>
                      <Loader2 className="spin" size={18} />
                      Creando...
                    </>
                  ) : (
                    <>
                      <CheckCircle size={18} />
                      Confirmar creación
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="row">
        {servicios.length === 0 ? (
          <div className="col-12">
            <p className="text-muted">No hay servicios registrados.</p>
          </div>
        ) : (
          servicios.map((servicio) => (
            <div key={servicio.id} className="col-md-6 col-lg-4 mb-3">
              <motion.div 
                className="card border-0 shadow-sm h-100"
                whileHover={{ scale: 1.02 }}
              >
                <div className="card-body">
                  <h5 className="card-title text-primary fw-semibold">{servicio.nombre}</h5>
                  <p className="card-text text-muted">{servicio.descripcion}</p>
                </div>
                <div className="card-footer bg-transparent text-end">
                  <button 
                    className="btn btn-outline-danger btn-sm d-flex align-items-center gap-1 ms-auto"
                    onClick={() => handleEliminar(servicio.id)}
                  >
                    <Trash2 size={16} />
                    Eliminar
                  </button>
                </div>
              </motion.div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Servicios;
