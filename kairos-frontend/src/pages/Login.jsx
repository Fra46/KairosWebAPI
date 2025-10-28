import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usuarioService } from '../services/usuarioService';

function Login() {
  const [documento, setDocumento] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!documento.trim()) {
      setError('Por favor ingresa tu documento');
      return;
    }
    try {
      setLoading(true);
      const usuarios = await usuarioService.obtenerTodos();
      const usuario = usuarios.find(u => u.documento === documento);
      if (usuario) {
        localStorage.setItem('currentUser', JSON.stringify(usuario));
        navigate('/solicitar/servicios');
      } else {
        setError('Usuario inexistente. Por favor valide los datos o regístrese.');
      }
    } catch (err) {
      console.error(err);
      setError('Error al validar usuario.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="card border-0 shadow-lg">
              <div className="card-body p-4">
                <h2 className="mb-3 d-flex justify-content-center align-items-center">Inicio de sesión</h2>
                <p className="text-muted">Para solicitar un turno por favor ingresa tu documento</p>

                {error && (
                  <div className="alert alert-danger d-flex justify-content-between align-items-center" role="alert">
                    <div>{error}</div>
                    {error.includes('inexistente') && (
                      <button className="btn btn-sm btn-outline-light btn-link" onClick={() => navigate('/solicitar/registro', { state: { documento } })}>
                        Registrarse
                      </button>
                    )}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Número de documento</label>
                    <input
                      type="number"
                      className="form-control form-control-lg"
                      value={documento}
                      onChange={(e) => setDocumento(e.target.value)}
                      placeholder="Ej: 12345678"
                    />
                  </div>
                  <button type="submit" className="btn btn-primary btn-lg w-100" disabled={loading}>
                    {loading ? 'Validando...' : 'Continuar'}
                  </button>
                </form>

                <div className="mt-3 text-center">
                  <small className="text-muted">Si no tienes cuenta, puedes registrarte.</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
