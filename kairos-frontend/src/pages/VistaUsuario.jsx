import { useState, useEffect } from 'react';
import { turnoService } from '../services/turnoService';
import { servicioService } from '../services/servicioService';
import { usuarioService } from '../services/usuarioService';

function VistaUsuario() {
  const [servicios, setServicios] = useState([]);
  const [documento, setDocumento] = useState('');
  const [nombre, setNombre] = useState('');
  const [servicioSeleccionado, setServicioSeleccionado] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState(null);

  useEffect(() => {
    cargarServicios();
  }, []);

  const cargarServicios = async () => {
    try {
      const data = await servicioService.obtenerTodos();
      setServicios(data);
    } catch (error) {
      console.error('Error cargando servicios:', error);
    }
  };

  const solicitarTurno = async () => {
    if (!documento || !servicioSeleccionado) {
      setMensaje({ tipo: 'warning', texto: 'Por favor ingresa tu documento y selecciona un servicio' });
      return;
    }

    try {
      setLoading(true);

      const usuarios = await usuarioService.obtenerTodos();
      let usuario = usuarios.find(u => u.documento === documento);

      if (!usuario) {
        const nuevoUsuario = await usuarioService.crear({
          nombre: nombre || 'Cliente',
          tipo: 'Cliente',
          documento: documento
        });
        usuario = nuevoUsuario;
      }

      await turnoService.crearTurno(usuario.id, servicioSeleccionado);

      setMensaje({ tipo: 'success', texto: '¡Turno solicitado exitosamente!' });
      setDocumento('');
      setNombre('');
      setServicioSeleccionado(null);

      setTimeout(() => setMensaje(null), 3000);
    } catch (error) {
      setMensaje({ tipo: 'danger', texto: 'Error al solicitar turno' });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card border-0 shadow-lg">
              <div className="card-body p-5">
                <div className="text-center mb-5">
                  <h1 className="display-4 fw-bold mb-3">Solicitar Turno</h1>
                  <p className="lead text-muted">Ingresa tus datos</p>
                </div>

                {mensaje && (
                  <div className={`alert alert-${mensaje.tipo} alert-dismissible fade show`} role="alert">
                    {mensaje.texto}
                    <button type="button" className="btn-close" onClick={() => setMensaje(null)}></button>
                  </div>
                )}

                <div className="mb-4">
                  <label className="form-label fs-5 fw-semibold">Numero de Documento *</label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    value={documento}
                    onChange={(e) => setDocumento(e.target.value)}
                    placeholder="Ingresa tu documento"
                    style={{ fontSize: '1.5rem', padding: '1rem' }}
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label fs-5 fw-semibold">Selecciona el Servicio *</label>
                  <div className="row g-3">
                    {servicios.map((servicio) => (
                      <div key={servicio.id} className="col-md-6">
                        <button
                          className={`btn w-100 p-4 ${servicioSeleccionado === servicio.id
                              ? 'btn-primary'
                              : 'btn-outline-primary'
                            }`}
                          onClick={() => setServicioSeleccionado(servicio.id)}
                          style={{ fontSize: '1.25rem', minHeight: '100px' }}
                        >
                          <div className="fw-bold mb-2">{servicio.nombre}</div>
                          <small className="d-block">{servicio.descripcion}</small>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  className="btn btn-success btn-lg w-100 py-3"
                  onClick={solicitarTurno}
                  disabled={loading}
                  style={{ fontSize: '1.5rem' }}
                >
                  {loading ? 'Procesando...' : 'Solicitar Turno'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VistaUsuario;