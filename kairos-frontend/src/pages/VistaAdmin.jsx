import { useState, useEffect } from 'react';
import { turnoService } from '../services/turnoService';
import { servicioService } from '../services/servicioService';

function VistaAdmin() {
  const [servicios, setServicios] = useState([]);
  const [turnosPorServicio, setTurnosPorServicio] = useState({});
  const [pendientesPorServicio, setPendientesPorServicio] = useState({});
  const [loading, setLoading] = useState(false);
  const [servicioSeleccionado, setServicioSeleccionado] = useState(null);

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [nuevoServicio, setNuevoServicio] = useState({ nombre: "", descripcion: "" });
  const [editando, setEditando] = useState(null);
  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      setLoading(true);
      const [servs, turnosActuales] = await Promise.all([
        servicioService.obtenerTodos(),
        turnoService.obtenerActualesPorServicio()
      ]);
      
      setServicios(servs);
      
      const turnosPorServ = {};
      turnosActuales.forEach(turno => {
        turnosPorServ[turno.servicioNombre] = turno;
      });
      setTurnosPorServicio(turnosPorServ);

      const pendientes = {};
      for (const servicio of servs) {
        const pend = await turnoService.obtenerPendientesPorServicio(servicio.id);
        pendientes[servicio.id] = pend;
      }
      setPendientesPorServicio(pendientes);
    } catch (error) {
      console.error('Error cargando datos:', error);
    } finally {
      setLoading(false);
    }
  };

  const avanzarTurno = async (servicioId) => {
    try {
      await turnoService.avanzarTurnoPorServicio(servicioId);
      cargarDatos();
    } catch (error) {
      console.error('Error avanzando turno:', error);
      alert('No hay más turnos pendientes para este servicio');
    }
  };

  const verDetalles = (servicioId) => {
    setServicioSeleccionado(servicioSeleccionado === servicioId ? null : servicioId);
  };

  const guardarServicio = async (e) => {
    e.preventDefault();
    try {
      const url = editando
        ? `https://localhost:7149/api/Servicio/${editando.id}`
        : `https://localhost:7149/api/Servicio`;
      const metodo = editando ? "PUT" : "POST";

      const response = await fetch(url, {
        method: metodo,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoServicio),
      });

      if (response.ok) {
        alert(editando ? "Servicio actualizado" : "Servicio creado correctamente");
        setMostrarFormulario(false);
        setEditando(null);
        setNuevoServicio({ nombre: "", descripcion: "" });
        cargarDatos();
      } else {
        alert("Error al guardar el servicio");
      }
    } catch (error) {
      console.error("Error guardando servicio:", error);
    }
  };

  const editarServicio = (servicio) => {
    setNuevoServicio({ nombre: servicio.nombre, descripcion: servicio.descripcion });
    setEditando(servicio);
    setMostrarFormulario(true);
  };

  const eliminarServicio = async (servicioId) => {
    if (!window.confirm("¿Deseas eliminar este servicio? Esta acción no se puede deshacer.")) return;
    try {
      await fetch(`https://localhost:7149/api/Servicio/${servicioId}`, { method: "DELETE" });
      cargarDatos();
    } catch (error) {
      console.error("Error eliminando servicio:", error);
    }
  };
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-1">Panel de Administración</h2>
          <p className="text-muted mb-0">Gestiona todos los servicios y turnos</p>
        </div>
        <button 
          className="btn btn-outline-primary"
          onClick={cargarDatos}
          disabled={loading}
        >
          {loading ? 'Actualizando...' : 'Actualizar'}
        </button>
      </div>

      <div className="row g-4">
        {servicios.map((servicio) => {
          const turnoActual = turnosPorServicio[servicio.nombre];
          const pendientes = pendientesPorServicio[servicio.id] || [];
          
          return (
            <div key={servicio.id} className="col-md-6 col-lg-4">
              <div className="card border-0 shadow h-100">
                <div className="card-header bg-primary text-white">
                  <h5 className="mb-0">{servicio.nombre}</h5>
                  <small>{servicio.descripcion}</small>
                </div>
                <div className="card-body text-center">
                  {turnoActual ? (
                    <>
                      <div className="display-3 text-primary fw-bold mb-2">
                        #{turnoActual.numeroTurno}
                      </div>
                      <p className="mb-1"><strong>{turnoActual.usuarioNombre}</strong></p>
                      <p className="text-muted small mb-3">{turnoActual.usuarioTipo}</p>
                      <button 
                        className="btn btn-success w-100 mb-2"
                        onClick={() => avanzarTurno(servicio.id)}
                      >
                        Siguiente Turno
                      </button>
                      <button 
                        className="btn btn-outline-secondary w-100"
                        onClick={() => verDetalles(servicio.id)}
                      >
                        {servicioSeleccionado === servicio.id ? 'Ocultar' : 'Ver'} Pendientes ({pendientes.length})
                      </button>
                    </>
                  ) : (
                    <div className="text-muted py-4">
                      <p>No hay turnos pendientes</p>
                    </div>
                  )}
                </div>
                
                {servicioSeleccionado === servicio.id && pendientes.length > 0 && (
                  <div className="card-footer bg-light">
                    <small className="text-muted d-block mb-2">Próximos turnos:</small>
                    <div className="list-group list-group-flush">
                      {pendientes.slice(0, 5).map((turno) => (
                        <div key={turno.id} className="list-group-item px-0 py-2 bg-transparent">
                          <small>
                            <strong>#{turno.numeroTurno}</strong> - {turno.usuarioNombre}
                          </small>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <hr className="my-5" />
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Gestión de Servicios</h4>
        <button
          className="btn btn-outline-success"
          onClick={() => {
            setMostrarFormulario(!mostrarFormulario);
            setEditando(null);
            setNuevoServicio({ nombre: "", descripcion: "" });
          }}
        >
          {mostrarFormulario ? "Cerrar" : "➕ Nuevo Servicio"}
        </button>
      </div>

      {mostrarFormulario && (
        <form onSubmit={guardarServicio} className="card p-3 shadow-sm mb-4">
          <div className="mb-3">
            <label className="form-label">Nombre del servicio</label>
            <input
              type="text"
              className="form-control"
              value={nuevoServicio.nombre}
              onChange={(e) =>
                setNuevoServicio({ ...nuevoServicio, nombre: e.target.value })
              }
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Descripción</label>
            <textarea
              className="form-control"
              rows="2"
              value={nuevoServicio.descripcion}
              onChange={(e) =>
                setNuevoServicio({ ...nuevoServicio, descripcion: e.target.value })
              }
            ></textarea>
          </div>
          <div className="text-end">
            <button type="submit" className="btn btn-primary">
              {editando ? "Actualizar" : "Guardar"}
            </button>
          </div>
        </form>
      )}

      <div className="table-responsive">
        <table className="table table-striped align-middle">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {servicios.map((s) => (
              <tr key={s.id}>
                <td>{s.id}</td>
                <td>{s.nombre}</td>
                <td>{s.descripcion}</td>
                <td>
                  <button
                    className="btn btn-sm btn-outline-primary me-2"
                    onClick={() => editarServicio(s)}
                  >
                    ✏️ Editar
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => eliminarServicio(s.id)}
                  >
                    🗑️ Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
  

}

export default VistaAdmin;