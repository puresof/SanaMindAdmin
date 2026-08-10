import { SERVICES } from '../data/services'
import './ServiceSelector.css'

function ServiceSelector({ value, onChange }) {
  const toggleService = (id) => {
    const next = { ...value }
    if (id in next) {
      delete next[id]
    } else {
      next[id] = ''
    }
    onChange(next)
  }

  const setPrice = (id, price) => {
    onChange({ ...value, [id]: price })
  }

  return (
    <div className="service-list">
      {SERVICES.map((service) => {
        const checked = service.id in value

        return (
          <div key={service.id} className={checked ? 'service-item service-item-active' : 'service-item'}>
            <label className="service-item-main">
              <input
                type="checkbox"
                checked={checked}
                onChange={() => toggleService(service.id)}
              />
              {service.image && (
                <img className="service-thumb" src={service.image} alt={service.title} />
              )}
              <div className="service-info">
                <span className="service-title">{service.title}</span>
                <span className="service-description">{service.description}</span>
              </div>
            </label>

            <input
              className="service-price-input"
              type="number"
              min="0"
              step="0.01"
              placeholder="Precio"
              disabled={!checked}
              value={value[service.id] ?? ''}
              onChange={(e) => setPrice(service.id, e.target.value)}
            />
          </div>
        )
      })}
    </div>
  )
}

export default ServiceSelector
