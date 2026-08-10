import { useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import Modal from './Modal'
import ServicePricesList from './ServicePricesList'
import './ServicePricesIndicator.css'

function ServicePricesIndicator({ servicePrices }) {
  const [isHovering, setIsHovering] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [overlayPosition, setOverlayPosition] = useState(null)
  const badgeRef = useRef(null)

  const count = Object.keys(servicePrices || {}).length

  if (count === 0) {
    return <span className="service-count-badge service-count-empty">Sin servicios</span>
  }

  const handleMouseEnter = () => {
    const rect = badgeRef.current?.getBoundingClientRect()
    if (rect) {
      setOverlayPosition({ top: rect.bottom + 6, left: rect.left })
    }
    setIsHovering(true)
  }

  return (
    <>
      <button
        ref={badgeRef}
        type="button"
        className="service-count-badge"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setIsHovering(false)}
        onClick={() => setIsModalOpen(true)}
      >
        {count} servicio{count !== 1 ? 's' : ''}
      </button>

      {isHovering &&
        overlayPosition &&
        createPortal(
          <div
            className="service-indicator-overlay"
            style={{ top: overlayPosition.top, left: overlayPosition.left }}
          >
            <ServicePricesList servicePrices={servicePrices} />
          </div>,
          document.body,
        )}

      <Modal open={isModalOpen} title="Servicios y precios" onClose={() => setIsModalOpen(false)}>
        <ServicePricesList servicePrices={servicePrices} />
      </Modal>
    </>
  )
}

export default ServicePricesIndicator
