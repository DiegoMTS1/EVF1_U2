import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Companeros() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          'https://backend-react-fcsl.onrender.com/api-backend/users',
          { timeout: 15000 }
        );
        
        if (Array.isArray(response.data)) {
          setUsers(response.data);
        } else if (response.data.users && Array.isArray(response.data.users)) {
          setUsers(response.data.users);
        } else {
          setUsers([]);
        }
      } catch (err) {
        console.error('Error al obtener los usuarios:', err);
        setError('El servidor backend está despertando o falló la conexión. Intenta recargar la página en unos segundos.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="container mx-auto p-6 max-w-5xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Mis Compañeros</h2>
        <button
          onClick={() => navigate('/registro')}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-5 rounded-lg shadow transition"
        >
          Registrarme
        </button>
      </div>

      {loading && (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg font-medium">Cargando compañeros...</p>
          <p className="text-xs text-gray-400 mt-1">(El servidor en Render puede tardar unos segundos en despertar)</p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded text-red-700 my-4">
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-2 text-sm font-bold underline"
          >
            Reintentar
          </button>
        </div>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.length > 0 ? (
            users.map((u, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition">
                <h3 className="text-xl font-bold text-gray-800">
                  {u.name} {u.lastName}
                </h3>
                <p className="text-sm text-gray-500 mt-1">RUT: {u.rut}</p>
                <p className="text-sm text-blue-600 mt-2 font-medium">{u.email}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 col-span-full text-center">No hay usuarios registrados aún.</p>
          )}
        </div>
      )}
    </div>
  );
}