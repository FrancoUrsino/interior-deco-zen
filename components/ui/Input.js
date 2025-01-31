
function Input({ label, htmlFor, id, name, value, onChange, type = 'text', className, placeholder, required = false }) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-500">{label}</label>
      <input
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="mt-1 block w-full border border-gray-500 bg-primary-color rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
      />
    </div>
  )
}
export default Input