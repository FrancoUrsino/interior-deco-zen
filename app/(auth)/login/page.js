'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { login } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setError('')
      setLoading(true)
      const userCredential = await login(email, password)
      if (email === 'interioradmin@gmail.com') {
        router.push('/admin')
      } else {
        router.push('/perfil')
      }
    } catch (error) {
      setError('Error al iniciar sesión. Por favor verifica que tus datos estén correctos.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 font-raleway">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold">Inicia sesión en tu cuenta</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="text-red-700 px-4 py-3 relative">
              {error}
            </div>
          )}
          <div className="rounded-md shadow-sm">
            <div>
              <Input label='Email' id={'email'} htmlFor={'email'} name={'emial'} type='email' value={email} onChange={(e) => setEmail(e.target.value)} required={true} placeholder={'Email'} /> 
            </div>
            <div className='pt-4'>
              <Input htmlFor={'password'} label={'Contraseña'} id={'password'} name={'password'} type='password' required={true} value={password} onChange={(e) => setPassword(e.target.value)} placeholder={'Contraseña'} />
            </div>
          </div>
          <div>
            <button
              type="submit"
              disabled={loading}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-color hover:bg-primary-color/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
            </button>
          </div>
          <div className="text-sm text-center">
            <Button href='/register' text={'¿No tienes una cuenta? Regístrate'} />
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
