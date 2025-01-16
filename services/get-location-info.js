import { getCountryFlag } from './convert-to-flag.js'
import checkUndefined from './set-undefined.js'
import { getClosestAirport } from './closest-airport.js'

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

  const { closestAirport, minDistance } = getClosestAirport(coords, airports)

  return {
    status: 200,
    ip: clientIp,
    city: {
      name: cityName ? decodeURIComponent(cityName) : 'No disponible',
      postal_code: postalCode || null,
    },
    country: {
      name: countryName || 'No disponible',
      alpha: country || null,
      flag: {
        small: `https://flagcdn.com/16x12/${country?.toLowerCase()}.png`,
        medium: `https://flagcdn.com/32x34/${country?.toLowerCase()}.png`,
        large: `https://flagcdn.com/48x36/${country?.toLowerCase()}.png`,
      },
      emoji_flag: getCountryFlag({ countryCode: country }),
      time_zone: timeZone || null,
    },
    coords: {
      latitude: latitude || 'No disponible',
      longitude: longitude || 'No disponible',
    },
    haversine_location: {
      iata: closestAirport.iata || 'Sin geolocalización',
      closest_airport: {
        airport: closestAirport.name || 'Sin geolocalización',
        latitude: closestAirport.lat || 'Sin geolocalización',
        longitude: closestAirport.lon || 'Sin geolocalización',
      },
      city: closestAirport.city || 'Sin geolocalización',
      state: closestAirport.state || 'Sin geolocalización',
      country: closestAirport.country || 'Sin geolocalización',
      airport_distance: `${minDistance.toFixed(2)}km` || 'Sin geolocalización',
    },
    sys_info: {
      language: checkUndefined({ fx: navigator.language }),
      system: platform,
      web_browser: {
        browser: match[1],
        version: match[2],
      },
    },
  }
}

export default extractLocationInfo
