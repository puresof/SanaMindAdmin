import { useEffect, useState } from 'react'
import Modal from '../../components/Modal'
import ServiceSelector from '../../components/ServiceSelector'
import LocationPicker from '../../components/LocationPicker'
import { EMPTY_FORM } from './columns'

function AddTherapistModal({ open, onClose, onSubmit }) {
  const [form, setForm] = useState(EMPTY_FORM)
  const [formError, setFormError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (open) {
      setForm(EMPTY_FORM)
      setFormError('')
    }
  }, [open])

  const handleClose = () => {
    if (submitting) return
    onClose()
  }

  const handleFormChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleServicePricesChange = (servicePrices) => {
    setForm((prev) => ({ ...prev, service_prices: servicePrices }))
  }

  const handleLocationChange = ({ latitude, longitude }) => {
    setForm((prev) => ({ ...prev, latitude, longitude }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setFormError('')

    try {
      await onSubmit(form)
      onClose()
    } catch (err) {
      setFormError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Modal open={open} title="Añadir Terapeuta" onClose={handleClose} width="600px">
      <form onSubmit={handleSubmit}>
        {formError && <div className="table-error">{formError}</div>}

        <div className="form-row">
          <div className="form-field">
            <label htmlFor="first_name">Nombre</label>
            <input
              id="first_name"
              name="first_name"
              value={form.first_name}
              onChange={handleFormChange}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="last_name">Apellido</label>
            <input
              id="last_name"
              name="last_name"
              value={form.last_name}
              onChange={handleFormChange}
              required
            />
          </div>
        </div>

        <div className="form-field">
          <label htmlFor="email">Correo</label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleFormChange}
            required
          />
        </div>

        <div className="form-row">
          <div className="form-field">
            <label htmlFor="phone_number">Teléfono</label>
            <input
              id="phone_number"
              name="phone_number"
              value={form.phone_number}
              onChange={handleFormChange}
            />
          </div>

          <div className="form-field">
            <label htmlFor="cedula">Cédula</label>
            <input id="cedula" name="cedula" value={form.cedula} onChange={handleFormChange} />
          </div>
        </div>

        <div className="form-field">
          <label>Ubicación</label>
          <LocationPicker
            latitude={form.latitude}
            longitude={form.longitude}
            onChange={handleLocationChange}
          />
        </div>

        <div className="form-field">
          <label>Servicios y precios</label>
          <ServiceSelector value={form.service_prices} onChange={handleServicePricesChange} />
        </div>

        <div className="form-field">
          <label htmlFor="description">Descripción</label>
          <textarea
            id="description"
            name="description"
            rows={3}
            value={form.description}
            onChange={handleFormChange}
          />
        </div>

        <div className="modal-actions">
          <button
            type="button"
            className="btn-outline"
            onClick={handleClose}
            disabled={submitting}
          >
            Cancelar
          </button>
          <button type="submit" className="btn-new" disabled={submitting}>
            {submitting ? 'Guardando...' : 'Guardar'}
          </button>
        </div>
      </form>
    </Modal>
  )
}

export default AddTherapistModal
