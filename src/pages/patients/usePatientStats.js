import { useMemo } from 'react'
import { formatValue } from '../../utils/format'

export function usePatientStats(patients) {
  return useMemo(() => {
    const total = patients.length
    const assigned = patients.filter((p) => p.assigned_doctor_id).length
    const unassigned = total - assigned
    const withService = patients.filter((p) => p.selected_service_id).length

    const lastRegistered = patients.reduce((latest, p) => {
      if (!p.created_at) return latest
      if (!latest || new Date(p.created_at) > new Date(latest.created_at)) return p
      return latest
    }, null)

    return [
      { label: 'Pacientes', value: total },
      {
        label: 'Con Terapeuta',
        value: assigned,
        hint: total ? `${Math.round((assigned / total) * 100)}% del total` : undefined,
      },
      { label: 'Sin Asignar', value: unassigned },
      { label: 'Con Servicio', value: withService },
      {
        label: 'Último Registro',
        value: lastRegistered ? formatValue(lastRegistered.created_at, 'created_at') : '—',
        hint: lastRegistered
          ? `${lastRegistered.first_name} ${lastRegistered.last_name}`
          : undefined,
      },
    ]
  }, [patients])
}
