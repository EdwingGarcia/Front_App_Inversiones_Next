'use client'
import { useState } from "react";

export default function Registro() {
  const [exito, setExito] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8">
      {exito && (
        <div className="bg-blue-100 text-blue-700 p-4 rounded-md mb-4">
          Se ha registrado exitosamente a la aplicación
        </div>
      )}

      <h1 className="text-3xl font-semibold mb-4">Regístrate</h1>

      <form method="post" action="/registro" className="space-y-6">
        <div className="form-group">
          <label htmlFor="nombre" className="block text-lg font-medium">
            Nombre:
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            autoFocus
          />
        </div>

        <div className="form-group">
          <label htmlFor="apellido" className="block text-lg font-medium">
            Apellido:
          </label>
          <input
            type="text"
            id="apellido"
            name="apellido"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email" className="block text-lg font-medium">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password" className="block text-lg font-medium">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="form-group flex items-center">
          <input
            type="checkbox"
            id="rolAuditor"
            name="rolAuditor"
            className="mr-2"
          />
          <label htmlFor="rolAuditor" className="text-lg">
            ¿Esta es una cuenta de Auditor?
          </label>
        </div>

        <div className="form-group">
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-md"
          >
            Registrar
          </button>
        </div>

        <div className="text-center">
          <span>¿Ya tienes cuenta? </span>
          <a href="/login" className="text-blue-500">
            Inicia sesión aquí
          </a>
        </div>
      </form>
    </div>
  );
}
