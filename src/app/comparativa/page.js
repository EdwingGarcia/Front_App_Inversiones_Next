'use client';

import { useState, useEffect } from 'react';

export default function Comparativa() {
  const [comparativa, setComparativa] = useState(null);
  const [tendencias, setTendencias] = useState(null);
  const [brokerGanancias, setBrokerGanancias] = useState([]);
  const [activosRentables, setActivosRentables] = useState([]);
  const [estrategiasRentables, setEstrategiasRentables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComparativa = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          window.location.href = '/login'; // Redirige si no hay token
          return;
        }

        // Fetch de los datos de comparativa
        const response = await fetch('/api/inversiones/comparativa', {
          method: 'GET',
          headers: {
            'Authorization': `${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Error al cargar la comparativa');
        }

        const data = await response.json();
        setComparativa(data);

        // Fetch de las tendencias
        const tendenciasResponse = await fetch('/api/inversiones/tendencias', {
          method: 'GET',
          headers: {
            'Authorization': `${token}`,
          },
        });

        if (!tendenciasResponse.ok) {
          throw new Error('Error al cargar las tendencias');
        }

        const tendenciasData = await tendenciasResponse.json();
        setTendencias(tendenciasData);

        // Fetch de las ganancias por broker
        const brokerResponse = await fetch('/api/inversiones/broker-ganancias', {
          method: 'GET',
          headers: {
            'Authorization': `${token}`,
          },
        });

        if (brokerResponse.ok) {
          setBrokerGanancias(await brokerResponse.json());
        }

        // Fetch de activos más rentables
        const activosResponse = await fetch('/api/inversiones/activos-rentables', {
          method: 'GET',
          headers: {
            'Authorization': `${token}`,
          },
        });

        if (activosResponse.ok) {
          setActivosRentables(await activosResponse.json());
        }

        // Fetch de estrategias más rentables
        const estrategiasResponse = await fetch('/api/inversiones/estrategias-rentables', {
          method: 'GET',
          headers: {
            'Authorization': `${token}`,
          },
        });

        if (estrategiasResponse.ok) {
          setEstrategiasRentables(await estrategiasResponse.json());
        }

        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchComparativa();
  }, []);

  if (loading) return <p className="text-center mt-4">Cargando datos...</p>;
  if (error) return <p className="text-center mt-4 text-red-500">Error: {error}</p>;

  return (
    <div className="container mx-auto mt-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Comparativa de Inversiones</h1>

      {/* Tablas de Comparativa */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4 text-gray-700">Primera Lista</h2>
          <p><strong>Inversión Total:</strong> ${comparativa.sumaMontosInvertidosPrimeraLista.toFixed(2)}</p>
          <p><strong>Ganancias con Comisión:</strong> ${comparativa.gananciasConComisionPrimeraLista.toFixed(2)}</p>
          <p>
            <strong>Tipo Más Rentable:</strong>{' '}
            {comparativa.tipoMasRentablePrimeraLista.length > 0
              ? comparativa.tipoMasRentablePrimeraLista.join(', ')
              : 'No disponible'}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4 text-gray-700">Segunda Lista</h2>
          <p><strong>Inversión Total:</strong> ${comparativa.sumaMontosInvertidosSegundaLista.toFixed(2)}</p>
          <p><strong>Ganancias con Comisión:</strong> ${comparativa.gananciasConComisionSegundaLista.toFixed(2)}</p>
          <p>
            <strong>Tipo Más Rentable:</strong>{' '}
            {comparativa.tipoMasRentableSegundaLista.length > 0
              ? comparativa.tipoMasRentableSegundaLista.join(', ')
              : 'No disponible'}
          </p>
        </div>
      </div>

      {/* Activos y Estrategias Rentables */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Activos y Estrategias Rentables</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold mb-4">Activos Más Rentables</h3>
            <ul>
              {Object.entries(activosRentables).map(([tipo, activo]) => (
                <li key={tipo} className="mb-2">
                  <strong>{tipo}:</strong> {activo}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold mb-4">Estrategias Más Rentables</h3>
            <ul>
              {Object.entries(estrategiasRentables).map(([tipo, estrategia]) => (
                <li key={tipo} className="mb-2">
                  <strong>{tipo}:</strong> {estrategia}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Tendencias */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Tendencias de Inversión</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold mb-4">Top 5 Estrategias</h3>
            <ul>
              {tendencias?.topEstrategias?.map((estrategia, index) => (
                <li key={index} className="mb-2">{estrategia}</li>
              ))}
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold mb-4">Top 5 Activos</h3>
            <ul>
              {tendencias?.topActivos?.map((activo, index) => (
                <li key={index} className="mb-2">{activo}</li>
              ))}
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold mb-4">Tipo Más Popular</h3>
            <p>{tendencias?.topTipoActivo || 'No disponible'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
