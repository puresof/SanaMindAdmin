import ServicePricesIndicator from '../../components/ServicePricesIndicator'
import { formatLabel, formatValue } from '../../utils/format'
import { COLUMNS } from './columns'

function DoctorsTable({ doctors, error, onToggleValidated }) {
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
          {doctors.map((doctor) => (
            <tr key={doctor.id}>
              {COLUMNS.map((col) =>
                col === 'validated' ? (
                  <td key={col}>
                    <button
                      type="button"
                      className={
                        doctor[col]
                          ? 'badge badge-success badge-toggle'
                          : 'badge badge-neutral badge-toggle'
                      }
                      onClick={() => onToggleValidated(doctor)}
                    >
                      {doctor[col] ? 'Verificado' : 'Pendiente'}
                    </button>
                  </td>
                ) : col === 'service_prices' ? (
                  <td key={col}>
                    <ServicePricesIndicator servicePrices={doctor[col]} />
                  </td>
                ) : (
                  <td key={col}>{formatValue(doctor[col], col)}</td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {doctors.length === 0 && !error && (
        <div className="table-empty">No hay terapeutas registrados.</div>
      )}
    </div>
  )
}

export default DoctorsTable
