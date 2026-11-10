import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    rut: '',
    email: '',
    password: ''
  });
  const [message, setMessage] = useState({ text: '', isError: false });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: '', isError: false });

    const rutRegex = /^[0-9]{1,2}\.[0-9]{3}\.[0-9]{3}-[0-9kK]{1}$/;
    if (!rutRegex.test(formData.rut)) {
      setMessage({
        text: 'El RUT debe incluir puntos y guión (ej: 12.345.678-9)',
        isError: true
      });
      return;
    }

    try {
      await axios.post('https://backend-react-fcsl.onrender.com/api-backend/auth/register', formData, {
        headers: { 'Content-Type': 'application/json' }
      });
      setMessage({ text: '¡Registro exitoso! Redirigiendo...', isError: false });
      setTimeout(() => navigate('/mis-companeros'), 1500);
    } catch (err) {
      console.error(err);
      setMessage({
        text: err.response?.data?.message || 'Error al registrar usuario.',
        isError: true
      });
    }
  };

  return (
    <div className="container mx-auto p-6 flex justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Registro de Usuario</h2>
        
        {message.text && (
          <div className={`p-3 rounded mb-4 text-sm font-semibold ${message.isError ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Juan"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Apellido</label>
            <input
              type="text"
              name="lastName"
              required
              value={formData.lastName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Pérez"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">RUT</label>
            <input
              type="text"
              name="rut"
              required
              value={formData.rut}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="12.345.678-9"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="correo@ejemplo.cl"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow transition mt-4"
          >
            Guardar Registro
          </button>
        </form>
      </div>
    </div>
  );
}