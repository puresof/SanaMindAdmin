import { SERVICES } from '../data/services'
import './ServicePricesList.css'

function ServicePricesList({ servicePrices }) {
  const entries = Object.entries(servicePrices || {})

  if (entries.length === 0) {
    return <p className="service-price-empty">Sin servicios asignados.</p>
  }

  return (
    <ul className="service-price-rows">
      {entries.map(([id, price]) => {
        const service = SERVICES.find((s) => s.id === Number(id))
        const amount = Number(price)

        return (
          <li key={id} className="service-price-row">
            {service?.image && (
              <img className="service-price-thumb" src={service.image} alt={service.title} />
            )}
            <div className="service-price-info">
              <span className="service-price-title">
                {service ? service.title : `Servicio ${id}`}
              </span>
              <span className="service-price-amount">
                ${Number.isFinite(amount) ? amount.toFixed(2) : price}
              </span>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

export default ServicePricesList
