'use client'
import { useState } from "react";

export default function EditarInversion() {
  const [inversion, setInversion] = useState({
    id: '',
    nombre: '',
    tipo: '',
    activoSimbolo: '',
    montoInvertido: '',
    precioInversion: '',
    fechaInversion: '',
    brokerNombre: '',
    estrategiaNombre: '',
    comentarios: ''
  });

  return (
    <div className="container mx-auto mt-4 px-4">
      <h1 className="text-3xl font-semibold mb-6">Editar Inversión</h1>

      <form action="/inversiones/guardar" method="post" className="space-y-6">
        {/* Campo oculto para el ID */}
        <input type="hidden" name="id" value={inversion.id} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-group">
            <label htmlFor="nombre" className="block text-lg font-medium">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={inversion.nombre}
              onChange={(e) => setInversion({ ...inversion, nombre: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="tipo" className="block text-lg font-medium">Tipo</label>
            <select
              id="tipo"
              name="tipo"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={inversion.tipo}
              onChange={(e) => setInversion({ ...inversion, tipo: e.target.value })}
              required
            >
              <option value="" disabled>Selecciona un Tipo</option>
              {/* Aquí debes mapear las opciones dinámicas de tipos */}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="activoSimbolo" className="block text-lg font-medium">Activo</label>
            <select
              id="activoSimbolo"
              name="activoSimbolo"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={inversion.activoSimbolo}
              onChange={(e) => setInversion({ ...inversion, activoSimbolo: e.target.value })}
              required
            >
              <option value="" disabled>Selecciona un Activo</option>
              {/* Aquí debes mapear las opciones dinámicas de activos */}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="montoInvertido" className="block text-lg font-medium">Monto Invertido ($)</label>
            <input
              type="number"
              step="0.01"
              id="montoInvertido"
              name="montoInvertido"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={inversion.montoInvertido}
              onChange={(e) => setInversion({ ...inversion, montoInvertido: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="precioInversion" className="block text-lg font-medium">Precio de Inversión ($)</label>
          <input
            type="number"
            step="0.01"
            id="precioInversion"
            name="precioInversion"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            value={inversion.precioInversion}
            onChange={(e) => setInversion({ ...inversion, precioInversion: e.target.value })}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-group">
            <label htmlFor="fechaInversion" className="block text-lg font-medium">Fecha Inversión</label>
            <input
              type="date"
              id="fechaInversion"
              name="fechaInversion"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={inversion.fechaInversion}
              onChange={(e) => setInversion({ ...inversion, fechaInversion: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label htmlFor="broker" className="block text-lg font-medium">Broker</label>
            <select
              id="broker"
              name="brokerNombre"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={inversion.brokerNombre}
              onChange={(e) => setInversion({ ...inversion, brokerNombre: e.target.value })}
              required
            >
              <option value="" disabled>Selecciona un Broker</option>
              {/* Aquí debes mapear las opciones dinámicas de brokers */}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="estrategia" className="block text-lg font-medium">Estrategia</label>
          <select
            id="estrategia"
            name="estrategiaNombre"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            value={inversion.estrategiaNombre}
            onChange={(e) => setInversion({ ...inversion, estrategiaNombre: e.target.value })}
            required
          >
            <option value="" disabled>Selecciona una Estrategia</option>
            {/* Aquí debes mapear las opciones dinámicas de estrategias */}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="comentarios" className="block text-lg font-medium">Comentarios</label>
          <textarea
            id="comentarios"
            name="comentarios"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            value={inversion.comentarios}
            onChange={(e) => setInversion({ ...inversion, comentarios: e.target.value })}
          ></textarea>
        </div>

        <div className="form-group flex justify-between">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md"
          >
            Guardar Cambios
          </button>
          <a
            href="/inversiones/listar"
            className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md"
          >
            Cancelar
          </a>
        </div>
      </form>
    </div>
  );
}
