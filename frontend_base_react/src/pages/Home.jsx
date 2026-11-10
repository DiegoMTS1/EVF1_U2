export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-6 text-center">
      <div className="max-w-2xl bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
          Bienvenido a la Evaluación Sumativa
        </h1>
        <p className="text-gray-600 text-lg mb-6">
           CFT Estatal de Arica y Parinacota.
        </p>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded text-left">
          <p className="text-sm text-blue-700">
            Utiliza el menú superior para navegar entre el listado de compañeros y el formulario de registro.
          </p>
        </div>
      </div>
    </div>
  );
}