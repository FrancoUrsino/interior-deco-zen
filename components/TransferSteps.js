'use client'
import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import Link from 'next/link';

const TransferSteps = ({ open, onClose }) => {
  if (!open) return null;

  const fakeCVU = "0000000000000000000000";

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-secondary-color p-6 rounded-lg shadow-lg relative max-w-md w-full">
        <button 
          onClick={onClose} 
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-600"
          aria-label="Cerrar modal"
        >
          <AiOutlineClose size={20} />
        </button>
        <h2 className="text-xl font-bold mb-4">Pago por Transferencia Bancaria</h2>
        <p className="mb-4">Realizá la transferencia bancaria utilizando los datos a continuación. Una vez realizada la transferencia, envianos el comprobante a nuestro WhatsApp para validar el pago. La compra puede demorar hasta 2 horas en validarse</p>
        <div className="mb-4">
          <p className="font-bold">CVU:</p>
          <p className="text-lg break-all">{fakeCVU}</p>
        </div>
        <Link 
          href={`https://api.whatsapp.com/send?phone=541112345678&text=Hola,%20ya%20realicé%20la%20transferencia%20bancaria%20con%20CVU:%20${fakeCVU}`}
          target="_blank" 
          rel="noopener noreferrer"
          className='hover:text-gray-500'
        >
          Enviar comprobante por WhatsApp
        </Link>
      </div>
    </div>
  );
};

export default TransferSteps;
