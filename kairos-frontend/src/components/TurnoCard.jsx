function TurnoCard({ turno }) {
  return (
    <div>
      <h4 className="card-title mb-4 text-primary">Turno #{turno.numeroTurno}</h4>
      <div className="row g-3">
        <div className="col-md-6">
          <div className="d-flex align-items-start">
            <div className="flex-shrink-0">
              <div className="bg-primary bg-opacity-10 rounded p-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="text-primary" viewBox="0 0 16 16">
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664z"/>
                </svg>
              </div>
            </div>
            <div className="flex-grow-1 ms-3">
              <p className="mb-0 text-muted small">Usuario</p>
              <p className="mb-0 fw-semibold">{turno.usuarioNombre}</p>
              <span className="badge bg-secondary">{turno.usuarioTipo}</span>
            </div>
          </div>
        </div>
        
        <div className="col-md-6">
          <div className="d-flex align-items-start">
            <div className="flex-shrink-0">
              <div className="bg-success bg-opacity-10 rounded p-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="text-success" viewBox="0 0 16 16">
                  <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2"/>
                </svg>
              </div>
            </div>
            <div className="flex-grow-1 ms-3">
              <p className="mb-0 text-muted small">Servicio</p>
              <p className="mb-0 fw-semibold">{turno.servicioNombre}</p>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="d-flex align-items-start">
            <div className="flex-shrink-0">
              <div className="bg-info bg-opacity-10 rounded p-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="text-info" viewBox="0 0 16 16">
                  <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z"/>
                  <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0"/>
                </svg>
              </div>
            </div>
            <div className="flex-grow-1 ms-3">
              <p className="mb-0 text-muted small">Fecha</p>
              <p className="mb-0 fw-semibold">{new Date(turno.fechaSolicitud).toLocaleString('es-ES')}</p>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="d-flex align-items-start">
            <div className="flex-shrink-0">
              <div className={`${turno.atendido ? 'bg-success' : 'bg-warning'} bg-opacity-10 rounded p-2`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className={turno.atendido ? 'text-success' : 'text-warning'} viewBox="0 0 16 16">
                  <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
                </svg>
              </div>
            </div>
            <div className="flex-grow-1 ms-3">
              <p className="mb-0 text-muted small">Estado</p>
              <span className={`badge ${turno.atendido ? 'bg-success' : 'bg-warning'}`}>
                {turno.atendido ? 'Atendido' : 'Pendiente'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TurnoCard;