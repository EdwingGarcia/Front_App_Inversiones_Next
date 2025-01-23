'use client'
import React, { useEffect, useState } from 'react';

const CuentasAuditadas = () => {
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    fetch('/inversiones/emailsAsociados')
      .then((response) => response.json())
      .then((data) => setEmails(data))
      .catch((error) => console.error('Error al cargar los correos:', error));
  }, []);

  return (
    <div>
      {/* Barra de navegación */}
      <nav className="bg-gray-100 p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <a className="text-xl font-bold" href="#">Cuentas Auditadas</a>
          <div>
            <a href="/logout" className="text-blue-600 hover:underline">Cerrar sesión</a>
          </div>
        </div>
      </nav>

      <div className="container mx-auto mt-8">
        <h2 className="text-2xl font-bold mb-4">CUENTAS AUDITADAS</h2>

        {/* Formulario para agregar correo */}
        <form action="/inversiones/agregarCorreo" method="post" className="mb-6">
          <div className="mb-4">
            <label htmlFor="correo" className="block text-gray-700 font-medium">Correo Electrónico:</label>
            <input
              type="email"
              id="correo"
              name="correo"
              className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Ingresa el correo"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Agregar Correo
          </button>
        </form>

        {/* Formulario para filtrar correos */}
        <form action="/inversiones/listar" method="get" className="mb-6">
          <div className="mb-4">
            <label htmlFor="emailsAsociados" className="block text-gray-700 font-medium">Seleccionar Correo Asociado:</label>
            <select
              id="emailsAsociados"
              name="email"
              className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="" disabled selected>
                Selecciona un correo
              </option>
              {emails.map((email, index) => (
                <option key={index} value={email}>
                  {email}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Filtrar
          </button>
        </form>

        {/* Tabla de inversiones */}
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2">ID</th>
              <th className="border border-gray-300 px-4 py-2">Nombre</th>
              <th className="border border-gray-300 px-4 py-2">Tipo</th>
              <th className="border border-gray-300 px-4 py-2">Activo</th>
              <th className="border border-gray-300 px-4 py-2">Broker</th>
              <th className="border border-gray-300 px-4 py-2">Estrategia</th>
              <th className="border border-gray-300 px-4 py-2">Monto Invertido($)</th>
              <th className="border border-gray-300 px-4 py-2">Fecha Inversión</th>
              <th className="border border-gray-300 px-4 py-2">Estado</th>
              <th className="border border-gray-300 px-4 py-2">Comentarios</th>
            </tr>
          </thead>
          <tbody>
            {/* Placeholder para datos */}
            {/* Reemplaza esto con datos reales */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CuentasAuditadas;
