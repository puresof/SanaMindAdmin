import { useCallback } from 'react'
import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet'
import L from 'leaflet'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'
import 'leaflet/dist/leaflet.css'
import './LocationPicker.css'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
})

const DEFAULT_CENTER = [19.70441133186496, -101.19454190536952]
// Zoom level that shows roughly a 125 km² area at this map's rendered size (~550x220px).
const DEFAULT_ZOOM = 20

function ClickHandler({ onPick }) {
  useMapEvents({
    click(e) {
      onPick(e.latlng)
    },
  })
  return null
}

function LocationPicker({ latitude, longitude, onChange }) {
  const hasPosition = latitude != null && longitude != null
  const center = hasPosition ? [latitude, longitude] : DEFAULT_CENTER

  const handlePick = useCallback(
    (latlng) => {
      onChange({ latitude: latlng.lat, longitude: latlng.lng })
    },
    [onChange],
  )

  return (
    <div className="location-picker">
      <MapContainer
        center={center}
        zoom={hasPosition ? 14 : 5}
        className="location-picker-map"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ClickHandler onPick={handlePick} />
        {hasPosition && <Marker position={[latitude, longitude]} />}
      </MapContainer>

      <p className="location-picker-hint">
        {hasPosition
          ? `Lat: ${latitude.toFixed(5)}, Lng: ${longitude.toFixed(5)}`
          : 'Haz clic en el mapa para colocar la ubicación.'}
      </p>
    </div>
  )
}

export default LocationPicker
