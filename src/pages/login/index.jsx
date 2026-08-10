import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabaseClient'
import Logo from '../../components/Logo'
import './index.css'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      return
    }

    navigate('/home')
  }

  return (
    <div className="login-page">
      <div className="login-shape login-shape-1" />
      <div className="login-shape login-shape-2" />
      <div className="login-card">
        <div className="login-brand">
          <Logo size={32} />
          <span>SanaMind</span>
        </div>

        <h1>Acceso Admin</h1>
        <p className="login-subtitle">Gestiona terapeutas y pacientes.</p>

        <form onSubmit={handleSubmit}>
          {error && <div className="login-error">{error}</div>}

          <div className="login-field">
            <label htmlFor="email">Correo Electrónico</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>

          <div className="login-field">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>

          <button type="submit" className="login-submit">
            Ingresar
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
