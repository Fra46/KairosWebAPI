import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/">
          Kairos
        </Link>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/solicitar">Solicitar Turno</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/pantalla">Pantalla</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/empleado">Empleado</Link>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                Administración
              </a>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to="/admin">Panel Admin</Link></li>
                <li><Link className="dropdown-item" to="/servicios">Servicios</Link></li>
                <li><Link className="dropdown-item" to="/usuarios">Buscar Usuarios</Link></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;