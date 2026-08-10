import { NavLink, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import Logo from './Logo'
import './AppShell.css'

const NAV_ITEMS = [
  { to: '/home', label: 'Inicio' },
  { to: '/therapists', label: 'Terapeutas' },
  { to: '/patients', label: 'Pacientes' },
]

function AppShell({ title, subtitle, actions, children }) {
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    navigate('/')
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="app-header-logo">
          <Logo size={36} />
          <h3>SanaMind</h3>
        </div>

        <nav className="nav-links">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => (isActive ? 'active' : undefined)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <button className="app-signout" onClick={handleSignOut}>
          Salir del Sistema
        </button>
      </header>

      <div className="container">
        <div className="page-header">
          <div>
            <h1>{title}</h1>
            {subtitle && <p className="page-subtitle">{subtitle}</p>}
          </div>

          {actions && <div className="action-bar">{actions}</div>}
        </div>

        {children}
      </div>
    </div>
  )
}

export default AppShell
