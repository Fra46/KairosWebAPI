import { useState, useEffect } from 'react';
import { usuarioService } from '../services/usuarioService';

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mensaje, setMensaje] = useState(null);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [nuevoUsuario, setNuevoUsuario] = useState({
    nombre: '',
    tipo: 'Estudiante',
    documento: ''
  });

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    try {
      setLoading(true);
      const data = await usuarioService.obtenerTodos();
      setUsuarios(data);
      setError(null);
    } catch (err) {
      setError('Error al cargar los usuarios');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await usuarioService.crear(nuevoUsuario);
      setMensaje({ tipo: 'success', texto: 'Usuario creado exitosamente' });
      setNuevoUsuario({ nombre: '', tipo: 'Estudiante', email: '', telefono: '' });
      setMostrarForm(false);
      cargarUsuarios();
      setTimeout(() => setMensaje(null), 3000);
    } catch (err) {
      setMensaje({ tipo: 'danger', texto: 'Error al crear el usuario' });
      console.error(err);
    }
  };

  const handleEliminar = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este usuario?')) {
      try {
        await usuarioService.eliminar(id);
        setMensaje({ tipo: 'success', texto: 'Usuario eliminado exitosamente' });
        cargarUsuarios();
        setTimeout(() => setMensaje(null), 3000);
      } catch (err) {
        setMensaje({ tipo: 'danger', texto: 'Error al eliminar el usuario' });
        console.error(err);
      }
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
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-1">Gestión de Usuarios</h2>
          <p className="text-muted mb-0">Administra los usuarios del sistema</p>
        </div>
        <button 
          className="btn btn-primary"
          onClick={() => setMostrarForm(!mostrarForm)}
        >
          {mostrarForm ? 'Cancelar' : '+ Nuevo Usuario'}
        </button>
      </div>

      {mensaje && (
        <div className={`alert alert-${mensaje.tipo} alert-dismissible fade show`} role="alert">
          {mensaje.texto}
          <button type="button" className="btn-close" onClick={() => setMensaje(null)}></button>
        </div>
      )}

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {mostrarForm && (
        <div className="card border-0 shadow mb-4">
          <div className="card-body p-4">
            <h5 className="card-title mb-4">Crear Nuevo Usuario</h5>
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Nombre Completo *</label>
                  <input
                    type="text"
                    className="form-control"
                    value={nuevoUsuario.nombre}
                    onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, nombre: e.target.value })}
                    placeholder="Ej: Juan Pérez"
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Tipo de Usuario *</label>
                  <select
                    className="form-select"
                    value={nuevoUsuario.tipo}
                    onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, tipo: e.target.value })}
                    required
                  >
                    <option value="Estudiante">Estudiante</option>
                    <option value="Docente">Docente</option>
                    <option value="Administrativo">Administrativo</option>
                    <option value="Visitante">Visitante</option>
                  </select>
                </div>
                <div className="col-md-12">
                  <label className="form-label">Documento (CC, TI, etc.) *</label>
                  <input
                    type="text"
                    className="form-control"
                    value={nuevoUsuario.documento}
                    onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, documento: e.target.value })}
                    placeholder="Ej: 1234567890"
                    required
                  />
                </div>
              </div>
              <div className="mt-4">
                <button type="submit" className="btn btn-primary me-2">
                  Crear Usuario
                </button>
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => setMostrarForm(false)}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="card border-0 shadow">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th className="px-4 py-3">ID</th>
                  <th className="py-3">Nombre</th>
                  <th className="py-3">Tipo</th>
                  <th className="py-3">Documento</th>
                  <th className="py-3 text-end pe-4">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-5 text-muted">
                      No hay usuarios registrados
                    </td>
                  </tr>
                ) : (
                  usuarios.map((usuario) => (
                    <tr key={usuario.id}>
                      <td className="px-4 py-3">
                        <span className="badge bg-secondary">{usuario.id}</span>
                      </td>
                      <td className="py-3 fw-semibold">{usuario.nombre}</td>
                      <td className="py-3">
                        <span className={`badge ${
                          usuario.tipo === 'Estudiante' ? 'bg-primary' :
                          usuario.tipo === 'Docente' ? 'bg-success' :
                          usuario.tipo === 'Administrativo' ? 'bg-info' :
                          'bg-warning'
                        }`}>
                          {usuario.tipo}
                        </span>
                      </td>
                      <td className="py-3 text-muted">{usuario.documento || '-'}</td>
                      <td className="py-3 text-end pe-4">
                        <button 
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleEliminar(usuario.id)}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {usuarios.length > 0 && (
        <div className="mt-3 text-muted small">
          Total de usuarios: <strong>{usuarios.length}</strong>
        </div>
      )}
    </div>
  );
}

export default Usuarios;