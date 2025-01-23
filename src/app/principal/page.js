'use client';  // Marca el archivo como cliente

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';  // Uso del router de Next.js
import Link from 'next/link';  // Usar Link de Next.js para la navegación

export default function InversionesLista() {
  const [inversiones, setInversiones] = useState([]);
  const [isMounted, setIsMounted] = useState(false);
  const [routerReady, setRouterReady] = useState(false);
  const router = useRouter();

  // Verifica si el componente está montado (evita el renderizado en el servidor)
  useEffect(() => {
    setIsMounted(true);
    setRouterReady(true);  // Se asegura de que router solo se use en el cliente
    // Aquí debes cargar las inversiones desde tu API o fuente de datos
    setInversiones([
      {
        id: 1,
        broker: { nombre: 'Broker1' },
        nombre: 'Inversión 1',
        tipo: 'Acciones',
        activo: { simbolo: 'AAPL' },
        montoInvertido: 1000,
        precioInversion: 150,
        fechaInversion: '2025-01-01',
        comentarios: 'Primera inversión',
      },
      {
        id: 2,
        broker: { nombre: 'Broker2' },
        nombre: 'Inversión 2',
        tipo: 'Criptomonedas',
        activo: { simbolo: 'BTC' },
        montoInvertido: 2000,
        precioInversion: 30000,
        fechaInversion: '2025-01-10',
        comentarios: 'Segunda inversión',
      },
    ]);
  }, []);

  // Evitar el renderizado de useRouter en el servidor
  if (!isMounted || !routerReady) return null;

  return (
    <div className="container mx-auto px-4 mt-4">
      <nav className="bg-gray-800 p-4">
        <a href="/inversiones/listar" className="text-white text-xl">Sistema de Inversiones</a>
        <div className="flex justify-end mt-2">
          <Link href="/inversiones/agregar" className="btn btn-primary text-white bg-blue-500 px-4 py-2 rounded">Agregar Nueva Inversión</Link>
          <Link href="/inversiones/comparativa" className="btn btn-success text-white bg-green-500 ml-4 px-4 py-2 rounded">Comparativa de Datos</Link>
        </div>
      </nav>

      <div className="mt-6">
        <h1 className="text-3xl font-bold mb-4">Lista de Inversiones</h1>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <h2 className="text-xl font-semibold p-4">Inversiones Activas</h2>
          <table className="min-w-full table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left">Broker</th>
                <th className="px-6 py-3 text-left">Nombre</th>
                <th className="px-6 py-3 text-left">Tipo</th>
                <th className="px-6 py-3 text-left">Activo</th>
                <th className="px-6 py-3 text-left">Monto Invertido($)</th>
                <th className="px-6 py-3 text-left">Precio Entrada($)</th>
                <th className="px-6 py-3 text-left">Fecha Inversión</th>
                <th className="px-6 py-3 text-left">Comentarios</th>
                <th className="px-6 py-3">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {inversiones.map((inversion) => (
                <tr key={inversion.id}>
                  <td className="px-6 py-3">{inversion.broker.nombre}</td>
                  <td className="px-6 py-3">{inversion.nombre}</td>
                  <td className="px-6 py-3">{inversion.tipo}</td>
                  <td className="px-6 py-3">{inversion.activo.simbolo}</td>
                  <td className="px-6 py-3">{inversion.montoInvertido}</td>
                  <td className="px-6 py-3">{inversion.precioInversion}</td>
                  <td className="px-6 py-3">{inversion.fechaInversion}</td>
                  <td className="px-6 py-3">{inversion.comentarios}</td>
                  <td className="px-6 py-3 flex space-x-4">
                    <Link href={`/inversiones/editar/${inversion.id}`} className="text-blue-500 hover:text-blue-700">
                      <i className="fas fa-edit"></i>
                    </Link>
                    <button
                      onClick={() => alert(`Eliminar inversión con id: ${inversion.id}`)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
