import { fitBounds } from 'google-map-react/utils'

// Get the radius of the bounds according to the center of a map
export const getBoundsRadius = (bounds, center) => {
  // Radius of the earth in km
  const earthRadius = 6378.8

  // Degrees to radians (divide by 57.2958 = 1 rad)
  const neLat = bounds.ne.lat / 57.2958
  const neLng = bounds.ne.lng / 57.2958
  const cLat = center.lat / 57.2958
  const cLng = center.lng / 57.2958

  // Circle radius from center to Northeast corner of bounds
  const km = earthRadius * Math.acos(
    (Math.sin(cLat) * Math.sin(neLat)) + (Math.cos(cLat) * Math.cos(neLat) * Math.cos(neLng - cLng))
  )

  return km
}

/**
 * Get Google fit bounds according to items array
 * @param {array} items Array of items with lat & lng
 */
export const getFitBound = (items) => {
  let newBounds = {}

  if (items && items.length > 0) {
    const latitudes = items.map((item) => item.lat || item.latitude)
    const longitudes = items.map((item) => item.lng || item.longitude)
    const bounds = {
      se: { lat: Math.min(...latitudes), lng: Math.max(...longitudes) },
      nw: { lat: Math.max(...latitudes), lng: Math.min(...longitudes) },
    }

    // Quick fix for center with 1 item
    if (items.length === 1) {
      bounds.nw.lat += 0.00001
      bounds.nw.lng -= 0.00001
    }

    // Get new fit bounds according to item bounds
    newBounds = fitBounds(bounds, { width: 1200, height: 600 })
  }

  return newBounds
}

export const distances = (from, to) => {
  const degreesToRadians = (degrees) => (
    (degrees * Math.PI) / 180
  )
  const earthRadiusKm = 6371

  const deltaLat = degreesToRadians(from.lat - to.lat)
  const deltaLgn = degreesToRadians(from.lgn - to.lgn)

  const a = (Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2))
    + (Math.sin(deltaLgn / 2) * Math.sin(deltaLgn / 2) *
    Math.cos(degreesToRadians(from.lat))
    * Math.cos(degreesToRadians(from.lat)))

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return earthRadiusKm * c
}
