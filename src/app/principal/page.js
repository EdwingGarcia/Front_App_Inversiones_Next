'use client'; // Marca el archivo como cliente

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Uso del router de Next.js
import Link from 'next/link'; // Usar Link de Next.js para la navegación

export default function InversionesLista() {
  const [inversiones, setInversiones] = useState([]);
  const [isMounted, setIsMounted] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Estado de carga
  const [routerReady, setRouterReady] = useState(false); // Para verificar si el router está listo
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);

    // Asegurarse de que el router esté listo
    setRouterReady(true);

    // Obtener email y token guardados en el localStorage
    const email = localStorage.getItem('email');
    const token = localStorage.getItem('token');

    // Redirigir al login si no hay email o token
    if (!email || !token) {
      router.push('/login');
      return;
    }

    const fetchInversiones = async () => {
      try {
        const response = await fetch(`/api/inversiones?email=${email}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('No autorizado o error en la carga de inversiones');
        }

        const data = await response.json();
        setInversiones(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false); // Finaliza la carga
      }
    };

    fetchInversiones();
  }, [router]);

  // Evitar el renderizado en el servidor hasta que se haya montado el componente
  if (!isMounted || !routerReady) return null;

  return (
    <div className="container mx-auto px-4 mt-4">
      <nav className="bg-gray-800 p-4">
        <a href="/principal" className="text-white text-xl">Sistema de Inversiones</a>
        <div className="flex justify-end mt-2">
          <Link href="/formulario/agregar" className="btn btn-primary text-white bg-blue-500 px-4 py-2 rounded">Agregar Nueva Inversión</Link>
          <Link href="/comparativa" className="btn btn-success text-white bg-green-500 ml-4 px-4 py-2 rounded">Comparativa de Datos</Link>
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
