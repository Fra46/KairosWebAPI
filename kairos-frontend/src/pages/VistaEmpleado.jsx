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
            <div className="mb-4">
                <h2 className="mb-3">Panel de Empleado</h2>
                <div className="card border-0 shadow-sm">
                    <div className="card-body">
                        <label className="form-label fw-semibold">Selecciona tu servicio:</label>
                        <select
                            className="form-select form-select-lg"
                            value={servicioSeleccionado || ''}
                            onChange={(e) => setServicioSeleccionado(Number(e.target.value))}
                        >
                            {servicios.map((servicio) => (
                                <option key={servicio.id} value={servicio.id}>
                                    {servicio.nombre}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <div className="card border-0 shadow-lg mb-4" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                <div className="card-body text-center py-5">
                    <h3 className="text-white mb-4">Turno Actual</h3>
                    {turnoActual ? (
                        <>
                            <div className="display-1 fw-bold text-white mb-3">#{turnoActual.numeroTurno}</div>
                            <p className="text-white fs-5 mb-4">{turnoActual.usuarioNombre}</p>
                            <button className="btn btn-light btn-lg px-5" onClick={avanzarTurno}>
                                Siguiente Turno
                            </button>
                        </>
                    ) : (
                        <p className="text-white fs-5">No hay turnos pendientes</p>
                    )}
                </div>
            </div>

            <div className="card border-0 shadow">
                <div className="card-header bg-white">
                    <h4 className="mb-0">Turnos Pendientes ({pendientes.length})</h4>
                </div>
                <div className="card-body">
                    {pendientes.length === 0 ? (
                        <p className="text-muted text-center py-4">No hay turnos en espera</p>
                    ) : (
                        <div className="list-group list-group-flush">
                            {pendientes.slice(0, 10).map((turno) => (
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
    );
}

export default VistaEmpleado;