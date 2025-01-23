import React from "react";

const ComparativaInversiones = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Navbar */}
      <nav className="bg-blue-700 shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <a href="/inversiones/listar" className="text-white text-lg font-bold">
            Sistema de Inversiones
          </a>
          <a href="/logout" className="text-white hover:text-gray-200">
            Cerrar sesión
          </a>
        </div>
      </nav>

      {/* Header */}
      <header className="text-center py-8 bg-gradient-to-r from-blue-500 to-blue-700 text-white">
        <h1 className="text-3xl font-bold">Comparativa de Inversiones</h1>
        <p className="mt-2">Analiza y compara el rendimiento de tus inversiones</p>
      </header>

      {/* Form and Tables */}
      <div className="container mx-auto px-4 py-8">
        <form action="/inversiones/comparar" method="GET">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Tabla 1 */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-bold text-center text-blue-600 mb-4">
                Inversiones Tabla 1
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="fechaInicio1" className="font-bold">
                    Fecha de Inicio
                  </label>
                  <input
                    type="date"
                    id="fechaInicio1"
                    name="fechaInicio1"
                    className="w-full border rounded-lg px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="fechaFin1" className="font-bold">
                    Fecha de Fin
                  </label>
                  <input
                    type="date"
                    id="fechaFin1"
                    name="fechaFin1"
                    className="w-full border rounded-lg px-3 py-2"
                    required
                  />
                </div>
              </div>

              <table className="w-full mt-6 border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-blue-600 text-white">
                    <th className="border border-gray-300 px-4 py-2">ID</th>
                    <th className="border border-gray-300 px-4 py-2">Nombre</th>
                    <th className="border border-gray-300 px-4 py-2">Tipo</th>
                    <th className="border border-gray-300 px-4 py-2">
                      Monto Invertido ($)
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Fecha Inversión
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* Reemplazar con datos dinámicos */}
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">1</td>
                    <td className="border border-gray-300 px-4 py-2">Inversión A</td>
                    <td className="border border-gray-300 px-4 py-2">Acción</td>
                    <td className="border border-gray-300 px-4 py-2">5000</td>
                    <td className="border border-gray-300 px-4 py-2">2023-01-01</td>
                  </tr>
                </tbody>
              </table>

              <div className="mt-4">
                <p>
                  <strong>Rendimiento Tabla 1:</strong>
                </p>
                <ul className="list-disc ml-6">
                  <li>Inversión Total: 10,000 USD</li>
                  <li>Ganancia con Comisión: 2,000 USD</li>
                  <li>Tipo Más Rentable: Acciones</li>
                </ul>
              </div>
            </div>

            {/* Tabla 2 */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-bold text-center text-blue-600 mb-4">
                Inversiones Tabla 2
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="fechaInicio2" className="font-bold">
                    Fecha de Inicio
                  </label>
                  <input
                    type="date"
                    id="fechaInicio2"
                    name="fechaInicio2"
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>
                <div>
                  <label htmlFor="fechaFin2" className="font-bold">
                    Fecha de Fin
                  </label>
                  <input
                    type="date"
                    id="fechaFin2"
                    name="fechaFin2"
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>
              </div>

              <table className="w-full mt-6 border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-blue-600 text-white">
                    <th className="border border-gray-300 px-4 py-2">ID</th>
                    <th className="border border-gray-300 px-4 py-2">Nombre</th>
                    <th className="border border-gray-300 px-4 py-2">Tipo</th>
                    <th className="border border-gray-300 px-4 py-2">
                      Monto Invertido ($)
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Fecha Inversión
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* Reemplazar con datos dinámicos */}
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">2</td>
                    <td className="border border-gray-300 px-4 py-2">Inversión B</td>
                    <td className="border border-gray-300 px-4 py-2">Cripto</td>
                    <td className="border border-gray-300 px-4 py-2">3000</td>
                    <td className="border border-gray-300 px-4 py-2">2023-02-01</td>
                  </tr>
                </tbody>
              </table>

              <div className="mt-4">
                <p>
                  <strong>Rendimiento Tabla 2:</strong>
                </p>
                <ul className="list-disc ml-6">
                  <li>Inversión Total: 8,000 USD</li>
                  <li>Ganancia con Comisión: 1,500 USD</li>
                  <li>Tipo Más Rentable: Cripto</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Comparar Inversiones
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ComparativaInversiones;
