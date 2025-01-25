'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head';

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const email = event.target.username.value;
    const password = event.target.password.value;

    try {
      const response = await fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error('Usuario o contraseña inválidos');
      }

      const token = await response.text(); // El token retornado desde el backend
      console.log('Token recibido:', token); // Aquí se imprime el token en la consola

      // Guardar el email y token de forma global (localStorage en este caso)
      localStorage.setItem('email', email);
      localStorage.setItem('token', token);

      // Si la autenticación es exitosa, rediriges al usuario a la página principal
      router.push('/principal');
    } catch (error) {
      setError(error.message); // Muestra el error si ocurre
    }
  };

  return (
    <>
      <Head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Inicio de sesión</title>
      </Head>

      {/* Navbar */}
      <nav className="bg-gray-800 fixed w-full top-0 left-0 z-50 shadow-md">
        <div className="max-w-screen-xl mx-auto px-4 py-2 flex justify-between items-center">
          <a href="/" className="text-white text-2xl font-semibold">Inicio de sesión</a>
        </div>
      </nav>

      {/* Login Form */}
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Iniciar sesión</h1>
          
          {/* Mostrar mensaje de error si existe */}
          {error && <div className="text-red-500 text-center mb-4">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-700">Nombre de usuario</label>
              <input
                id="username"
                name="username"
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg mt-2"
                placeholder="Digite su email ID"
                required
                autoFocus
              />
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700">Contraseña</label>
              <input
                id="password"
                name="password"
                type="password"
                className="w-full p-2 border border-gray-300 rounded-lg mt-2"
                placeholder="Digite su contraseña"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Iniciar sesión
            </button>
          </form>

          <div className="text-center mt-4">
            <span>¿Nuevo usuario? <a href="/registro" className="text-blue-500 hover:underline">Regístrate aquí</a></span>
          </div>
        </div>
      </div>
    </>
  );
}
