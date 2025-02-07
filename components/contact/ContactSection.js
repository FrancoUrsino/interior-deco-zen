"use client"

import { useState } from "react"
import Input from "../ui/Input"

function ContactSection() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log("Datos del formulario:", formData)
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
    })
    alert("Gracias por contactarnos. Te responderemos pronto.")
  }

  return (
    <div className="py-8 my-4 max-w-7xl mx-auto shadow-2xl rounded-lg overflow-hidden transform">
      <div className="bg-gradient-to-r from-primary-color to-primary-color/70 p-6">
        <h2 className="text-2xl font-bold text-white">Contáctanos</h2>
        <p className="mt-2 text-white opacity-80">Estamos aquí para ayudarte</p>
      </div>
      <form onSubmit={handleSubmit} className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-2">
          <div className="mb-4">
            <Input label={"Nombre"} htmlFor={"firstName"} id={"firstName"} name={"firstName"} value={formData.firstName} onChange={handleChange} required={true} />
          </div>
          <div className="mb-4">
            <Input label={"Apellido"} htmlFor={"lastName"} id={"lastName"} name={"lastName"} value={formData.lastName} onChange={handleChange} required={true} />
          </div>
        </div>
        <div className="mb-4">
          <Input label={"Email"} type={"email"} htmlFor={"email"} id={"email"} name={"email"} value={formData.email} onChange={handleChange} required={true} />
        </div>
        <div className="mb-4">
          <Input label={"Teléfono"} htmlFor={"phone"} id={"phone"} name={"phone"} value={formData.phone} onChange={handleChange} required={true} />
        </div>
        <div className="mb-6">
          <label htmlFor="message" className="block text-gray-500 text-sm font-semibold mb-2">
            Consulta
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline h-32 bg-primary-color text-white"
          ></textarea>
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-primary-color/70 to-primary-color/50 hover:from-primary-color hover:to-primary-color/70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out transform hover:scale-105"
          >
            Enviar mensaje
          </button>
        </div>
      </form>
    </div>
  )
}

export default ContactSection

