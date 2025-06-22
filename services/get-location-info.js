import { getCountryFlag } from '../utils/convert-to-flag.js'
import checkIfUndefined from '../utils/set-undefined.js'

const extractLocationInfo = (req) => {
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
  const countryName = timeZone?.split('/')?.[1]
  const platform = req.headers['sec-ch-ua-platform']
  const userInfo = req.headers['sec-ch-ua']
  const regex = /"([^"]+)";v="(\d+)"/
  const webBrowser = userInfo?.split('\n')?.[0].split(',')[0] || 'No disponible'
  const match = webBrowser.match(regex)

  return {
    ip: clientIp,
    city: {
      name: decodeURIComponent(cityName) || 'No disponible',
      postalCode: postalCode,
    },
    country: {
      name: countryName,
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
      system: platform ? platform.replace(/\"/g, '') : 'No Disponible' || null,
      webBrowser: {
        browser: match[1],
        version: match[2],
      },
    },
  }
}

export default extractLocationInfo
