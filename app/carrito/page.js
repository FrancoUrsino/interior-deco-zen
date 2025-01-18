import React from 'react'

function page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white">
      <h1 className="text-4xl font-bold mb-4">Estamos trabajando en esta página</h1>
      <p className="text-gray-400 text-lg">Para la próxima entrega estará lista.</p>

      <div className="mt-8 animate-bounce">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          stroke="#c0c0c0"
          className="w-12 h-12"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M2 21h20v2H2v-2zm17-6h-3V8.41l-2.29 2.3-1.42-1.42L12 5.58V2h-2v3.58l-1.29 1.71-1.42-1.42L4 8.41V15H2v-6H1V6h1V5c0-.55.45-1 1-1h2c.55 0 1 .45 1 1v1h2V5c0-.55.45-1 1-1h2c.55 0 1 .45 1 1v1h2V5c0-.55.45-1 1-1h2c.55 0 1 .45 1 1v1h1v3h-1v6zm-5 0V9.41l-2 2-2-2V15h4zM6 15v-3h2v3H6zm10 0v-3h2v3h-2z"
            fill="#1a1a1a"
          ></path>
        </svg>
      </div>

    </div>
  );
}

export default page