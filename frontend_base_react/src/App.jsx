import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Companeros from './pages/Companeros';
import Register from './pages/Register';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/inicio" element={<Home />} />
          <Route path="/mis-companeros" element={<Companeros />} />
          <Route path="/registro" element={<Register />} />
          <Route path="/registrarme" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}