import { SERVICES } from '../../data/services'
import { formatLabel, formatValue } from '../../utils/format'
import { COLUMNS } from './columns'

function PatientsTable({ patients, error, doctorNames }) {
  return (
    <div className="table-card">
      <table className="data-table">
        <thead>
          <tr>
            {COLUMNS.map((col) => (
              <th key={col}>{formatLabel(col)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient.id}>
              {COLUMNS.map((col) => {
                if (col === 'selected_service_id') {
                  const service = SERVICES.find((s) => s.id === Number(patient[col]))
                  return (
                    <td key={col}>
                      <span className={service ? 'badge badge-success' : 'badge badge-neutral'}>
                        {service ? service.title : 'Sin servicio'}
                      </span>
                    </td>
                  )
                }

                if (col === 'assigned_doctor_id') {
                  const doctorName = doctorNames[patient[col]]
                  return (
                    <td key={col}>
                      <span
                        className={doctorName ? 'badge badge-success' : 'badge badge-neutral'}
                      >
                        {doctorName || 'Sin asignar'}
                      </span>
                    </td>
                  )
                }

                return <td key={col}>{formatValue(patient[col], col)}</td>
              })}
            </tr>
          ))}
        </tbody>
      </table>

      {patients.length === 0 && !error && (
        <div className="table-empty">No hay pacientes registrados.</div>
      )}
    </div>
  )
}

export default PatientsTable
