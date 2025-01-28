'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function EditarInversion() {
  const { id } = useParams(); // Obtener el ID desde la URL dinámica
  const router = useRouter();

  const [inversion, setInversion] = useState({
    nombre: '',
    tipo: '',
    activoSimbolo: '',
    montoInvertido: '',
    precioInversion: '',
    fechaInversion: '',
    brokerNombre: '',
    estrategiaNombre: '',
    comentarios: '',
    emailUsuario: '',
  });

  const [tipos, setTipos] = useState([]);
  const [activos, setActivos] = useState([]);
  const [brokers, setBrokers] = useState([]);
  const [estrategias, setEstrategias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDatosFormulario = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/login');
          return;
        }

        // Cargar datos de la inversión para editar
        const inversionResponse = await fetch(`/api/inversiones/${id}`, {
          method: 'GET',
          headers: {
            'Authorization': `${token}`,
          },
        });

        if (!inversionResponse.ok) {
          throw new Error('No se pudo cargar la inversión');
        }

        const inversionData = await inversionResponse.json();
        setInversion({
          ...inversionData,
          brokerNombre: inversionData.broker?.nombre || '',
          estrategiaNombre: inversionData.estrategia?.nombre || '',
          activoSimbolo: inversionData.activo?.simbolo || '',
        });

        // Cargar datos adicionales para los selectores
        const formResponse = await fetch('/api/inversiones/agregar', {
          method: 'GET',
          headers: {
            'Authorization': `${token}`,
          },
        });

        if (!formResponse.ok) {
          throw new Error('Error al cargar los datos del formulario');
        }

        const formData = await formResponse.json();
        setTipos(formData.tipos || []);
        setBrokers(formData.brokers || []);
        setEstrategias(formData.estrategias || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDatosFormulario();
  }, [id, router]);

  const handleTipoChange = async (e) => {
    const tipoSeleccionado = e.target.value;
    setInversion({ ...inversion, tipo: tipoSeleccionado });

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/inversiones/activos/${tipoSeleccionado}`, {
        method: 'GET',
        headers: {
          'Authorization': `${token}`,
        },
      });

      if (response.ok) {
        const activos = await response.json();
        setActivos(activos || []);
      } else {
        setActivos([]);
        console.error('Error al cargar activos:', response.statusText);
      }
    } catch (error) {
      console.error('Error al cargar activos:', error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    const inversionData = {
      emailUsuario: inversion.emailUsuario,
      nombre: inversion.nombre,
      tipo: inversion.tipo,
      montoInvertido: parseFloat(inversion.montoInvertido),
      precioInversion: parseFloat(inversion.precioInversion),
      fechaInversion: inversion.fechaInversion,
      estado: 'Activo',
      comentarios: inversion.comentarios,
      broker: {
        id: brokers.find(broker => broker.nombre === inversion.brokerNombre)?.id || null,
        nombre: inversion.brokerNombre,
      },
      estrategia: {
        id: estrategias.find(estrategia => estrategia.nombre === inversion.estrategiaNombre)?.id || null,
        nombre: inversion.estrategiaNombre,
      },
      activo: {
        id: activos.find(activo => activo.simbolo === inversion.activoSimbolo)?.id || null,
        simbolo: inversion.activoSimbolo,
      },
    };

    try {
      const response = await fetch(`/api/inversiones/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`,
        },
        body: JSON.stringify(inversionData),
      });

      if (response.ok) {
        alert('Inversión actualizada correctamente');
        router.push('/principal');
      } else {
        console.error('Error al actualizar la inversión:', response.statusText);
      }
    } catch (error) {
      console.error('Error al enviar los datos:', error.message);
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto mt-4 px-4">
      <h1 className="text-3xl font-semibold mb-6">Editar Inversión</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="nombre" className="block text-lg font-medium">Nombre</label>
            <input
              type="text"
              id="nombre"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={inversion.nombre}
              onChange={(e) => setInversion({ ...inversion, nombre: e.target.value })}
              required
            />
          </div>

          <div>
            <label htmlFor="tipo" className="block text-lg font-medium">Tipo</label>
            <select
              id="tipo"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={inversion.tipo}
              onChange={handleTipoChange}
              required
            >
              <option value="" disabled>Selecciona un Tipo</option>
              {tipos.map((tipo, index) => (
                <option key={index} value={tipo}>{tipo}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="activoSimbolo" className="block text-lg font-medium">Activo</label>
            <select
              id="activoSimbolo"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={inversion.activoSimbolo}
              onChange={(e) => setInversion({ ...inversion, activoSimbolo: e.target.value })}
              required
            >
              <option value="" disabled>Selecciona un Activo</option>
              {activos.map((activo, index) => (
                <option key={index} value={activo.simbolo}>{activo.simbolo}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="montoInvertido" className="block text-lg font-medium">Monto Invertido</label>
            <input
              type="number"
              id="montoInvertido"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={inversion.montoInvertido}
              onChange={(e) => setInversion({ ...inversion, montoInvertido: e.target.value })}
              required
            />
          </div>

          <div>
            <label htmlFor="precioInversion" className="block text-lg font-medium">Precio de Inversión</label>
            <input
              type="number"
              id="precioInversion"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={inversion.precioInversion}
              onChange={(e) => setInversion({ ...inversion, precioInversion: e.target.value })}
              required
            />
          </div>

          <div>
            <label htmlFor="fechaInversion" className="block text-lg font-medium">Fecha Inversión</label>
            <input
              type="date"
              id="fechaInversion"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={inversion.fechaInversion}
              onChange={(e) => setInversion({ ...inversion, fechaInversion: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="brokerNombre" className="block text-lg font-medium">Broker</label>
            <select
              id="brokerNombre"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={inversion.brokerNombre}
              onChange={(e) => setInversion({ ...inversion, brokerNombre: e.target.value })}
              required
            >
              <option value="" disabled>Selecciona un Broker</option>
              {brokers.map((broker, index) => (
                <option key={index} value={broker.nombre}>{broker.nombre}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="estrategiaNombre" className="block text-lg font-medium">Estrategia</label>
            <select
              id="estrategiaNombre"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={inversion.estrategiaNombre}
              onChange={(e) => setInversion({ ...inversion, estrategiaNombre: e.target.value })}
              required
            >
              <option value="" disabled>Selecciona una Estrategia</option>
              {estrategias.map((estrategia, index) => (
                <option key={index} value={estrategia.nombre}>{estrategia.nombre}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="comentarios" className="block text-lg font-medium">Comentarios</label>
          <textarea
            id="comentarios"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            value={inversion.comentarios}
            onChange={(e) => setInversion({ ...inversion, comentarios: e.target.value })}
          ></textarea>
        </div>

        <div className="flex justify-between">
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md">
            Guardar Cambios
          </button>
          <a href="/principal" className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md">
            Cancelar
          </a>
        </div>
      </form>
    </div>
  );
}
