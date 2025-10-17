import { useState, useEffect } from 'react';
import { turnoService } from '../services/turnoService';
import { servicioService } from '../services/servicioService';
import { usuarioService } from '../services/usuarioService';

function SolicitarTurno() {
  const [servicios, setServicios] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [servicioId, setServicioId] = useState('');
  const [usuarioId, setUsuarioId] = useState('');
  const [mensaje, setMensaje] = useState(null);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      const [servs, usrs] = await Promise.all([
        servicioService.obtenerTodos(),
        usuarioService.obtenerTodos()
      ]);
      setServicios(servs);
      setUsuarios(usrs);
    } catch (error) {
      console.error('Error cargando datos:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const turno = await turnoService.crearTurno(parseInt(usuarioId), parseInt(servicioId));
      setMensaje({ tipo: 'success', texto: `Turno #${turno.numeroTurno} creado exitosamente` });
      setServicioId('');
      setUsuarioId('');
    } catch (error) {
      setMensaje({ tipo: 'danger', texto: 'Error al crear el turno' });
    }
  };

  return (
    <div>
      <h2 className="mb-4">Solicitar Turno</h2>
      {mensaje && (
        <div className={`alert alert-${mensaje.tipo}`} role="alert">
          {mensaje.texto}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Usuario</label>
          <select 
            className="form-select" 
            value={usuarioId} 
            onChange={(e) => setUsuarioId(e.target.value)}
            required
          >
            <option value="">Seleccione un usuario</option>
            {usuarios.map(u => (
              <option key={u.id} value={u.id}>{u.nombre} - {u.tipo}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Servicio</label>
          <select 
            className="form-select" 
            value={servicioId} 
            onChange={(e) => setServicioId(e.target.value)}
            required
          >
            <option value="">Seleccione un servicio</option>
            {servicios.map(s => (
              <option key={s.id} value={s.id}>{s.nombre}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Solicitar Turno</button>
      </form>
    </div>
  );
}

export default SolicitarTurno;