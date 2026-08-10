import { useState } from 'react'
import AppShell from '../../components/AppShell'
import StatCards from '../../components/StatCards'
import '../../components/DataTable.css'
import '../../components/Buttons.css'
import { useDoctors } from './useDoctors'
import { useDoctorStats } from './useDoctorStats'
import DoctorsTable from './DoctorsTable'
import AddTherapistModal from './AddTherapistModal'

function Therapists() {
  const { doctors, loading, error, fetchDoctors, toggleValidated, addDoctor } = useDoctors()
  const stats = useDoctorStats(doctors)
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <AppShell
      title="Gestión de Terapeutas"
      subtitle="Control de personal y accesos administrativos."
      actions={
        <>
          <button className="btn-new" onClick={() => setIsModalOpen(true)}>
            + Añadir Terapeuta
          </button>

          <button className="btn-refresh" onClick={fetchDoctors}>
            <svg
              className={loading ? 'spinning' : undefined}
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12a9 9 0 1 1-2.64-6.36" />
              <path d="M21 3v6h-6" />
            </svg>
            Actualizar
          </button>
        </>
      }
    >
      <StatCards cards={stats} />

      {error && <div className="table-error">{error}</div>}

      <DoctorsTable doctors={doctors} error={error} onToggleValidated={toggleValidated} />

      <AddTherapistModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={addDoctor}
      />
    </AppShell>
  )
}

export default Therapists
