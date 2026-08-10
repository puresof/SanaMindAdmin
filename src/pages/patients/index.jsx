import AppShell from '../../components/AppShell'
import StatCards from '../../components/StatCards'
import '../../components/DataTable.css'
import '../../components/Buttons.css'
import { usePatients } from './usePatients'
import { usePatientStats } from './usePatientStats'
import { useDoctorNames } from './useDoctorNames'
import PatientsTable from './PatientsTable'

function Patients() {
  const { patients, loading, error, fetchPatients } = usePatients()
  const stats = usePatientStats(patients)
  const doctorNames = useDoctorNames()

  return (
    <AppShell
      title="Directorio de Pacientes"
      subtitle="Consulta de pacientes registrados."
      actions={
        <button className="btn-refresh" onClick={fetchPatients}>
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
      }
    >
      <StatCards cards={stats} />

      {error && <div className="table-error">{error}</div>}

      <PatientsTable patients={patients} error={error} doctorNames={doctorNames} />
    </AppShell>
  )
}

export default Patients
