import { useNavigate } from 'react-router-dom'
import AppShell from '../../components/AppShell'
import './index.css'

const SECTIONS = [
  {
    to: '/therapists',
    title: 'Terapeutas',
    description: 'Consulta y administra los terapeutas registrados.',
    icon: (
      <>
        <circle cx="9" cy="8" r="3" />
        <path d="M4 20c0-3 2.5-5 5-5s5 2 5 5" />
        <path d="M15 8a3 3 0 1 1 3.5 2.96" />
        <path d="M14 15c2 0 5 1.5 5 5" />
      </>
    ),
  },
  {
    to: '/patients',
    title: 'Pacientes',
    description: 'Consulta el directorio de pacientes y sus terapeutas asignados.',
    icon: (
      <>
        <path d="M9 3v6M6 6h6" />
        <circle cx="15" cy="14" r="3" />
        <path d="M10 21c0-3 2.5-5 5-5s5 2 5 5" />
      </>
    ),
  },
]

function Home() {
  const navigate = useNavigate()

  return (
    <AppShell title="Inicio" subtitle="Elige a dónde quieres ir.">
      <div className="home-grid">
        {SECTIONS.map((section) => (
          <button
            key={section.to}
            className="home-card"
            onClick={() => navigate(section.to)}
          >
            <span className="home-card-icon">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {section.icon}
              </svg>
            </span>
            <h2>{section.title}</h2>
            <p>{section.description}</p>
            <span className="home-card-arrow">Abrir →</span>
          </button>
        ))}
      </div>
    </AppShell>
  )
}

export default Home
