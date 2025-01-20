import React from 'react'

function Input({ label, name, value, onChange, type = 'text', className }) {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-500">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="mt-1 block w-full border border-gray-500 bg-primary-color rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
      />
    </div>
  )
}

export default Input