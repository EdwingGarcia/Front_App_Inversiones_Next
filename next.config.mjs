/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
      return [
        {
          source: '/api/:path*', // Ruta en tu aplicación Next.js
          destination: 'http://localhost:8080/api/:path*', // Ruta al backend
        },
      ];
    },
  };
  
  export default nextConfig;
  