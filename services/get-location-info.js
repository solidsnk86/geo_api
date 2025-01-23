import { getCountryFlag } from './convert-to-flag.js'
import checkIfUndefined from './set-undefined.js'
import { getClosestPlace } from './closest-airport.js'

const extractLocationInfo = (req, airports) => {
  const clientIp =
    req.headers['x-forwarded-for'] ||
    req.headers['x-real-ip'] ||
    req.connection.remoteAddress
  const cityName = req.headers['x-vercel-ip-city']
  const country = req.headers['x-vercel-ip-country']
  const postalCode = req.headers['x-vercel-ip-postal-code']
  const latitude = req.headers['x-vercel-ip-latitude']
  const longitude = req.headers['x-vercel-ip-longitude']
  const timeZone = req.headers['x-vercel-ip-timezone']
  const countryName = timeZone?.split('/')[1]
  const platform = req.headers['sec-ch-ua-platform'].replace(/\"/g, '')
  const userInfo = req.headers['sec-ch-ua']
  const regex = /"([^"]+)";v="(\d+)"/
  const webBrowser = userInfo.split('\n')[0].split(',')[0]
  const match = webBrowser.match(regex)
  const coords = {
    lat: parseFloat(latitude || '-32.5603447'),
    lon: parseFloat(longitude || '-65.2351276'),
  }

  const { closestAirport, minDistance } = getClosestPlace(coords, airports)

  return {
    status: 200,
    ip: clientIp,
    city: {
      name: cityName ? decodeURIComponent(cityName) : closestAirport.city,
      state: closestAirport.state,
      postalCode: postalCode || null,
      closestAirport: {
        iata: closestAirport.iata || 'Sin geolocalización',
        airport: closestAirport.name || 'Sin geolocalización',
        airportDistance: `${minDistance.toFixed(2)}km` || 'Sin geolocalización',
        latitude: closestAirport.lat || 'Sin geolocalización',
        longitude: closestAirport.lon || 'Sin geolocalización',
      },
    },
    country: {
      name: countryName || closestAirport.country,
      alpha: country || null,
      emojiFlag: getCountryFlag({ countryCode: country }),
      timezone: timeZone || null,
    },
    coords: {
      latitude: latitude || 'No disponible',
      longitude: longitude || 'No disponible',
    },
    sysInfo: {
      language: checkIfUndefined({ fx: navigator.language }),
      system: platform,
      webBrowser: {
        browser: match[1],
        version: match[2],
      },
    },
  }
}

export default extractLocationInfo
