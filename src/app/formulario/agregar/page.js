'use client';

import { useState, useEffect } from 'react';

export default function AgregarInversion() {
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
    emailUsuario: '',  // Añadimos el campo emailUsuario al estado
  });

  const token = localStorage.getItem('token');
  const [tipos, setTipos] = useState([]);
  const [activos, setActivos] = useState([]);
  const [brokers, setBrokers] = useState([]);
  const [estrategias, setEstrategias] = useState([]);

  useEffect(() => {
    const fetchDatosFormulario = async () => {
      try {
        const response = await fetch('/api/inversiones/agregar');
        if (!response.ok) {
          throw new Error(`Error del servidor: ${response.statusText}`);
        }
        const data = await response.json();
        console.log('Datos cargados:', data); // Log para depurar
        setTipos(data.tipos || []);
        setBrokers(data.brokers || []);
        setEstrategias(data.estrategias || []);
      } catch (error) {
        console.error('Error al cargar los datos del formulario:', error.message);
      }
    };
  
    fetchDatosFormulario();
  }, []);

  // Obtener el email desde localStorage
  useEffect(() => {
    const email = localStorage.getItem('email');
    if (email) {
      setInversion(prevState => ({
        ...prevState,
        emailUsuario: email  // Establecer el emailUsuario en el estado de inversion
      }));
    }
  }, []);

  // Manejar cambio en el tipo para cargar activos
  const handleTipoChange = async (e) => {
    const tipoSeleccionado = e.target.value;
    setInversion({ ...inversion, tipo: tipoSeleccionado });

    if (tipoSeleccionado) {
      try {
        const response = await fetch(`/api/inversiones/activos/${tipoSeleccionado}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`, // Asumiendo que el token está definido
          }
        });

        if (response.ok) {
          const activos = await response.json();
          setActivos(activos || []);
        } else {
          console.error(`Error en la respuesta: ${response.status} ${response.statusText}`);
          setActivos([]); // Limpiar los activos en caso de error
        }
      } catch (error) {
        console.error('Error al cargar los activos:', error);
        setActivos([]); // Limpiar los activos en caso de error
      }
    } else {
      setActivos([]); // Si no hay tipo seleccionado, limpiar los activos
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();  // Evitar que se recargue la página al enviar el formulario
  
    // Mapear los datos a la estructura que espera el backend
    const inversionData = {
      emailUsuario: inversion.emailUsuario,
      nombre: inversion.nombre,
      tipo: inversion.tipo,
      montoInvertido: parseFloat(inversion.montoInvertido),
      precioInversion: parseFloat(inversion.precioInversion),
      fechaInversion: inversion.fechaInversion,
      estado: 'Activo',  // Asumimos un valor por defecto o lo puedes obtener del estado
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
      }
    };
  
    try {
      console.log(inversionData);  // Verificar la estructura de datos
      const response = await fetch('/api/inversiones/guardar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`,  // Asegúrate de enviar el token JWT si es necesario
        },
        body: JSON.stringify(inversionData),  // Enviar el objeto con el formato adecuado
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Inversión guardada:', data);
        router.push('/principal');
      } else {
        console.error('Error al guardar la inversión:', response.statusText);
      }
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
    }

  };
  

  return (
    <div className="container mx-auto mt-4 px-4">
      <h1 className="text-3xl font-semibold mb-6">Agregar Nueva Inversión</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-group">
            <label htmlFor="nombre" className="block text-lg font-medium">
              Nombre
            </label>
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
            <label htmlFor="tipo" className="block text-lg font-medium">
              Tipo
            </label>
            <select
              id="tipo"
              name="tipo"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={inversion.tipo}
              onChange={handleTipoChange}
              required
            >
              <option value="" disabled>
                Selecciona un Tipo
              </option>
              {tipos.map((tipo, index) => (
                <option key={index} value={tipo}>
                  {tipo}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="activoSimbolo" className="block text-lg font-medium">
              Activo
            </label>
            <select
              id="activoSimbolo"
              name="activoSimbolo"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={inversion.activoSimbolo}
              onChange={(e) => setInversion({ ...inversion, activoSimbolo: e.target.value })}
              required
            >
              <option value="" disabled>
                Selecciona un Activo
              </option>
              {activos.map((activo, index) => (
                <option key={index} value={activo.simbolo}>
                  {activo.simbolo}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="montoInvertido" className="block text-lg font-medium">
              Monto Invertido ($)
            </label>
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
          <label htmlFor="precioInversion" className="block text-lg font-medium">
            Precio de Inversión ($)
          </label>
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
            <label htmlFor="fechaInversion" className="block text-lg font-medium">
              Fecha Inversión
            </label>
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
            <label htmlFor="broker" className="block text-lg font-medium">
              Broker
            </label>
            <select
              id="broker"
              name="brokerNombre"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={inversion.brokerNombre}
              onChange={(e) => setInversion({ ...inversion, brokerNombre: e.target.value })}
              required
            >
              <option value="" disabled>
                Selecciona un Broker
              </option>
              {brokers.map((broker, index) => (
                <option key={index} value={broker.nombre}>
                  {broker.nombre}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="estrategia" className="block text-lg font-medium">
            Estrategia
          </label>
          <select
            id="estrategia"
            name="estrategiaNombre"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            value={inversion.estrategiaNombre}
            onChange={(e) => setInversion({ ...inversion, estrategiaNombre: e.target.value })}
            required
          >
            <option value="" disabled>
              Selecciona una Estrategia
            </option>
            {estrategias.map((estrategia, index) => (
              <option key={index} value={estrategia.nombre}>
                {estrategia.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="comentarios" className="block text-lg font-medium">
            Comentarios
          </label>
          <textarea
            id="comentarios"
            name="comentarios"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            value={inversion.comentarios}
            onChange={(e) => setInversion({ ...inversion, comentarios: e.target.value })}
          ></textarea>
        </div>

        <div className="form-group flex justify-between">
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md">
            Agregar Inversión
          </button>
          <a href="/principal" className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md">
            Cancelar
          </a>
        </div>
      </form>
    </div>
  );
}
