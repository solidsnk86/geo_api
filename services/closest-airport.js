const EARTH_RADIUS = 6378137
const square = (num) => num * num
const degreesToRadians = (degrees) => (degrees * Math.PI) / 180.0

const haversine = (pointA, pointB) => {
  const latitudeA = degreesToRadians(pointA.lat)
  const latitudeB = degreesToRadians(pointB.lat)
  const longitudeA = degreesToRadians(pointA.lon)
  const longitudeB = degreesToRadians(pointB.lon)

  const haversineTheta =
    square(Math.sin((latitudeB - latitudeA) / 2)) +
    Math.cos(latitudeA) *
      Math.cos(latitudeB) *
      square((longitudeB - longitudeA) / 2)

  const distance = 2 * EARTH_RADIUS * Math.asin(Math.sqrt(haversineTheta))

  return distance / 1000
}

export const getClosestAirport = (coordinates, airports) => {
  let closestAirport = null
  let minDistance = Infinity

  for (const airport of airports) {
    const meters = haversine(coordinates, airport)

    if (meters < minDistance) {
      minDistance = meters
      closestAirport = airport
    }
  }

  return { closestAirport, minDistance }
}
