import { useState, useEffect } from 'react';
import { turnoService } from '../services/turnoService';
import { servicioService } from '../services/servicioService';

function VistaEmpleado() {
    const [servicios, setServicios] = useState([]);
    const [servicioSeleccionado, setServicioSeleccionado] = useState(null);
    const [turnoActual, setTurnoActual] = useState(null);
    const [pendientes, setPendientes] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        cargarServicios();
    }, []);

    useEffect(() => {
        if (servicioSeleccionado) {
            cargarTurnosServicio();
        }
    }, [servicioSeleccionado]);

    const cargarServicios = async () => {
        try {
            const data = await servicioService.obtenerTodos();
            setServicios(data);
            if (data.length > 0) {
                setServicioSeleccionado(data[0].id);
            }
        } catch (error) {
            console.error('Error cargando servicios:', error);
        }
    };

    const cargarTurnosServicio = async () => {
        try {
            setLoading(true);
            const [actuales, pend] = await Promise.all([
                turnoService.obtenerActualesPorServicio(),
                turnoService.obtenerPendientesPorServicio(servicioSeleccionado)
            ]);

            const turnoDelServicio = actuales.find(t => t.servicioNombre === servicios.find(s => s.id === servicioSeleccionado)?.nombre);
            setTurnoActual(turnoDelServicio || null);
            setPendientes(pend);
        } catch (error) {
            console.error('Error cargando turnos:', error);
        } finally {
            setLoading(false);
        }
    };

    const avanzarTurno = async () => {
        try {
            await turnoService.avanzarTurnoPorServicio(servicioSeleccionado);
            cargarTurnosServicio();
        } catch (error) {
            console.error('Error avanzando turno:', error);
            alert('No hay más turnos pendientes');
        }
    };

    return (
        <div className="container py-4">
                <h2 className="mb-3">Panel de Empleado</h2>

                <div className="row">
                    <div className="col-md-3">
                        <div className="service-sidebar">
                            <h5 className="mb-3">Servicios</h5>
                            <div className="d-flex flex-column gap-2">
                                {servicios.map((s) => (
                                    <div
                                        key={s.id}
                                        role="button"
                                        className={`service-card p-3 rounded shadow-sm ${servicioSeleccionado === s.id ? 'selected' : ''}`}
                                        onClick={() => setServicioSeleccionado(s.id)}
                                    >
                                        <div className="fw-semibold">{s.nombre}</div>
                                        <small className="text-muted">{s.descripcion || ''}</small>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="col-md-9">
                        <div className="row g-3">
                            <div className="col-md-6">
                                <div className="card border-0 shadow-lg h-100">
                                    <div className="card-body text-center py-4 kairos-accent">
                                        <h4 className="mb-3">Turno Actual</h4>
                                        {turnoActual ? (
                                            <>
                                                <div className="display-2 fw-bold mb-2">#{turnoActual.numeroTurno}</div>
                                                <p className="fs-6 mb-3">{turnoActual.usuarioNombre}</p>
                                                <button className="btn btn-light btn-lg" onClick={avanzarTurno}>
                                                    Siguiente
                                                </button>
                                            </>
                                        ) : (
                                            <p className="text-muted">No hay turnos en atención</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="card border-0 shadow h-100">
                                    <div className="card-header bg-white">
                                        <h5 className="mb-0">Pendientes ({pendientes.length})</h5>
                                    </div>
                                    <div className="card-body overflow-auto" style={{maxHeight: '420px'}}>
                                        {pendientes.length === 0 ? (
                                            <p className="text-muted text-center py-4">No hay turnos en espera</p>
                                        ) : (
                                            <div className="list-group list-group-flush">
                                                {pendientes.slice(0, 20).map((turno) => (
                                                    <div key={turno.id} className="list-group-item d-flex justify-content-between align-items-center">
                                                        <div>
                                                            <span className="badge bg-primary me-2">#{turno.numeroTurno}</span>
                                                            <strong>{turno.usuarioNombre}</strong>
                                                        </div>
                                                        <small className="text-muted">{new Date(turno.fechaSolicitud).toLocaleTimeString()}</small>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
}

export default VistaEmpleado;