import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { usuarioService } from '../services/usuarioService';

function Registro() {
  const location = useLocation();
  const navigate = useNavigate();
  const preDocumento = location.state?.documento || '';

  const [nombre, setNombre] = useState('');
  const [tipo, setTipo] = useState('Cliente');
  const [documento, setDocumento] = useState(preDocumento);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [mensaje, setMensaje] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!documento.trim()) {
      setError('Documento es requerido');
      return;
    }
    try {
      setLoading(true);
      const nuevo = await usuarioService.crear({ nombre: nombre || 'Cliente', tipo, documento });
      localStorage.setItem('currentUser', JSON.stringify(nuevo));
      setMensaje('Registro exitoso. Redirigiendo...');
      setTimeout(() => navigate('/solicitar/servicios'), 800);
    } catch (err) {
      console.error(err);
      setError('Error al registrar usuario');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card border-0 shadow">
              <div className="card-body p-4">
                <h2 className="mb-3">Registro de Usuario</h2>
                <p className="text-muted">Completa tus datos para crear una cuenta</p>

                {error && <div className="alert alert-danger">{error}</div>}
                {mensaje && <div className="alert alert-success">{mensaje}</div>}

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input type="text" className="form-control" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre completo" />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Tipo</label>
                    <select className="form-select" value={tipo} onChange={(e) => setTipo(e.target.value)}>
                      <option>Cliente</option>
                      <option>Estudiante</option>
                      <option>Docente</option>
                      <option>Administrativo</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Documento</label>
                    <input type="text" className="form-control" value={documento} onChange={(e) => setDocumento(e.target.value)} />
                  </div>

                  <button type="submit" className="btn btn-success w-100" disabled={loading}>
                    {loading ? 'Registrando...' : 'Registrarse'}
                  </button>
                </form>

                <div className="mt-3 text-center">
                  <button className="btn btn-link" onClick={() => navigate('/solicitar')}>Volver al inicio</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registro;
