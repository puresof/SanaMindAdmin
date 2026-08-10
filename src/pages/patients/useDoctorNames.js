import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

export function useDoctorNames() {
  const [doctorNames, setDoctorNames] = useState({})

  useEffect(() => {
    let active = true

    supabase
      .from('doctors')
      .select('id, first_name, last_name')
      .then(({ data, error }) => {
        if (!active || error || !data) return

        setDoctorNames(
          Object.fromEntries(data.map((d) => [d.id, `${d.first_name} ${d.last_name}`])),
        )
      })

    return () => {
      active = false
    }
  }, [])

  return doctorNames
}
