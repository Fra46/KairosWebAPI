import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import VistaUsuario from './pages/VistaUsuario';
import VistaPantalla from './pages/VistaPantalla';
import VistaEmpleado from './pages/VistaEmpleado';
import VistaAdmin from './pages/VistaAdmin';
import Servicios from './pages/Servicios';
import Usuarios from './pages/Usuarios';

function App() {
  return (
    <div className="App">
      <Navbar />
      <main className="flex-grow-1">
        <div className="container-fluid py-4">
          <Routes>
            <Route path="/solicitar" element={<VistaUsuario />} />
            <Route path="/pantalla" element={<VistaPantalla />} />
            <Route path="/empleado" element={<VistaEmpleado />} />
            <Route path="/admin" element={<VistaAdmin />} />
            <Route path="/admin/servicios" element={<Servicios />} />
            <Route path="/admin/usuarios" element={<Usuarios />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;