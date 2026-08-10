import { useMemo } from 'react'
import { formatValue } from '../../utils/format'

export function useDoctorStats(doctors) {
  return useMemo(() => {
    const total = doctors.length
    const validated = doctors.filter((d) => d.validated).length
    const pending = total - validated
    const withServices = doctors.filter(
      (d) => d.service_prices && Object.keys(d.service_prices).length > 0,
    ).length

    const lastRegistered = doctors.reduce((latest, d) => {
      if (!d.created_at) return latest
      if (!latest || new Date(d.created_at) > new Date(latest.created_at)) return d
      return latest
    }, null)

    return [
      { label: 'Terapeutas', value: total },
      { label: 'Verificados', value: validated },
      { label: 'Pendientes', value: pending },
      {
        label: 'Con Servicios',
        value: withServices,
        hint: total ? `${Math.round((withServices / total) * 100)}% del total` : undefined,
      },
      {
        label: 'Último Registro',
        value: lastRegistered ? formatValue(lastRegistered.created_at, 'created_at') : '—',
        hint: lastRegistered
          ? `${lastRegistered.first_name} ${lastRegistered.last_name}`
          : undefined,
      },
    ]
  }, [doctors])
}
