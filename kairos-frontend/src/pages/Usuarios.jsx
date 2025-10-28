import { useState, useEffect } from 'react';
import usuarioService from '../services/usuarioService';

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [usuariosFiltrados, setUsuariosFiltrados] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mensaje, setMensaje] = useState(null);

  useEffect(() => {
    cargarUsuarios();
  }, []);

  useEffect(() => {
    filtrarUsuarios();
  }, [busqueda, usuarios]);

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

  const filtrarUsuarios = () => {
    if (!busqueda.trim()) {
      setUsuariosFiltrados(usuarios);
      return;
    }

    const busquedaLower = busqueda.toLowerCase();
    const filtrados = usuarios.filter(usuario =>
      usuario.nombre.toLowerCase().includes(busquedaLower) ||
      usuario.documento.toLowerCase().includes(busquedaLower) ||
      usuario.tipo.toLowerCase().includes(busquedaLower)
    );
    setUsuariosFiltrados(filtrados);
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
      <div className="mb-4">
        <h2 className="mb-1">Buscar Usuarios</h2>
        <p className="text-muted mb-0">Busca usuarios por nombre, documento o tipo</p>
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

      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <div className="input-group input-group-lg">
            <span className="input-group-text bg-white border-end-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
              </svg>
            </span>
            <input
              type="text"
              className="form-control border-start-0"
              placeholder="Buscar por nombre, documento o tipo..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>
        </div>
      </div>

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
                {usuariosFiltrados.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-5 text-muted">
                      {busqueda ? 'No se encontraron usuarios' : 'No hay usuarios registrados'}
                    </td>
                  </tr>
                ) : (
                  usuariosFiltrados.map((usuario) => (
                    <tr key={usuario.id}>
                      <td className="px-4 py-3">
                        <span className="badge bg-secondary">{usuario.id}</span>
                      </td>
                      <td className="py-3 fw-semibold">{usuario.nombre}</td>
                      <td className="py-3">
                        <span className={`badge ${
                          usuario.tipo === 'Estudiante' || usuario.tipo === 'Pregrado' ? 'bg-primary' :
                          usuario.tipo === 'Docente' ? 'bg-success' :
                          usuario.tipo === 'Administrativo' ? 'bg-info' :
                          usuario.tipo === 'Cliente' ? 'bg-warning' :
                          'bg-secondary'
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

      <div className="mt-3 text-muted small">
        {busqueda ? (
          <>Mostrando <strong>{usuariosFiltrados.length}</strong> de <strong>{usuarios.length}</strong> usuarios</>
        ) : (
          <>Total de usuarios: <strong>{usuarios.length}</strong></>
        )}
      </div>
    </div>
  );
}

export default Usuarios;