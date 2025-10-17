import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SolicitarTurno from './pages/SolicitarTurno';
import PanelAdmin from './pages/PanelAdmin';
import Servicios from './pages/Servicios';
import Usuarios from './pages/Usuarios';

function App() {
  return (
    <div className="App">
      <Navbar />
      <main className="flex-grow-1">
        <div className="container py-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/solicitar" element={<SolicitarTurno />} />
            <Route path="/admin" element={<PanelAdmin />} />
            <Route path="/servicios" element={<Servicios />} />
            <Route path="/usuarios" element={<Usuarios />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;