import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-slate-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="font-bold text-xl tracking-wide">Evaluación EVF1_U2</h1>
        <div className="space-x-6">
          <Link to="/" className="hover:text-blue-400 transition-colors">
            Inicio
          </Link>
          <Link to="/mis-companeros" className="hover:text-blue-400 transition-colors">
            Mis Compañeros
          </Link>
        </div>
      </div>
    </nav>
  );
}