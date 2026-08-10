import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { COLUMNS } from './columns'

export function useDoctors() {
  const [doctors, setDoctors] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const fetchDoctors = useCallback(async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('doctors')
      .select(COLUMNS.join(','))

    if (error) {
      setError(error.message)
    } else {
      setDoctors(data)
    }

    setLoading(false)
  }, [])

  useEffect(() => {
    fetchDoctors()
  }, [fetchDoctors])

  const toggleValidated = useCallback(async (doctor) => {
    const nextValue = !doctor.validated

    const { error } = await supabase
      .from('doctors')
      .update({ validated: nextValue })
      .eq('id', doctor.id)

    if (error) {
      setError(error.message)
      return
    }

    setDoctors((prev) =>
      prev.map((d) => (d.id === doctor.id ? { ...d, validated: nextValue } : d)),
    )
  }, [])

  const addDoctor = useCallback(async (form) => {
    const servicePrices = Object.fromEntries(
      Object.entries(form.service_prices).map(([id, price]) => [id, Number(price) || 0]),
    )

    const { data, error } = await supabase
      .from('doctors')
      .insert({ ...form, service_prices: servicePrices, validated: false, role: 'doctor' })
      .select(COLUMNS.join(','))
      .single()

    if (error) throw new Error(error.message)

    setDoctors((prev) => [data, ...prev])
    return data
  }, [])

  return { doctors, loading, error, fetchDoctors, toggleValidated, addDoctor }
}
