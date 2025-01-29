const EARTH_RADIUS = 6378137
const square = (num) => num * num
const degreesToRadians = (degrees) => (degrees * Math.PI) / 180.0

const haversine = (pointA, pointB) => {
  const latitudeA = degreesToRadians(pointA.lat)
  const latitudeB = degreesToRadians(pointB.lat)
  const longitudeA = degreesToRadians(pointA.lon)
  const longitudeB = degreesToRadians(pointB.lon)

  const haversine =
    square(Math.sin((latitudeB - latitudeA) / 2)) +
    Math.cos(latitudeA) *
      Math.cos(latitudeB) *
      square((longitudeB - longitudeA) / 2)

  const distance = 2 * EARTH_RADIUS * Math.asin(Math.sqrt(haversine))

  return distance / 1000
}

export const getClosestPlace = (coordinates, allData) => {
  let closestTarget = null
  let minDistance = Infinity

  for (const data of allData) {
    const meters = haversine(coordinates, data)

    if (meters < minDistance) {
      minDistance = meters
      closestTarget = data
    }
  }

  return { closestTarget, minDistance }
}
