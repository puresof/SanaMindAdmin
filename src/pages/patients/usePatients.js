import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { COLUMNS } from './columns'

export function usePatients() {
  const [patients, setPatients] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const fetchPatients = useCallback(async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('patients')
      .select(COLUMNS.join(','))

    if (error) {
      setError(error.message)
    } else {
      setPatients(data)
    }

    setLoading(false)
  }, [])

  useEffect(() => {
    fetchPatients()
  }, [fetchPatients])

  return { patients, loading, error, fetchPatients }
}
