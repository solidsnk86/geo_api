import { getCountryFlag } from '../utils/convert-to-flag.js'
import { getCountry } from '../utils/get-country.js'
import { checkIfUndefined } from '../utils/set-undefined.js'

const extractLocationInfo = (req) => {
  const clientIp =
    req.headers['x-forwarded-for'] ||
    req.headers['x-real-ip'] ||
    req.connection.remoteAddress
  const country = req.headers['x-vercel-ip-country']
  const postalCode = req.headers['x-vercel-ip-postal-code']
  const latitude = req.headers['x-vercel-ip-latitude']
  const longitude = req.headers['x-vercel-ip-longitude']
  const timeZone = req.headers['x-vercel-ip-timezone']
  const timeZoneLength = timeZone.split('\n').length
  const cityTimeZone = timeZoneLength > 1 ? timeZone?.split('\n')?.[2] : timeZone?.split('\n')?.[1]
  const cityName = req.headers['x-vercel-ip-city'] ?? cityTimeZone;
  const countryName = timeZone?.split('/')?.[1] || country
  const platform = req.headers['sec-ch-ua-platform']
  const userInfo = req.headers['sec-ch-ua']
  const regex = /"([^"]+)";v="(\d+)"/
  const webBrowser = userInfo?.split('\n')?.[0].split(',')[0] || 'No disponible'
  const match = webBrowser.match(regex)


  function formatBrowserInfo(text = '') {
    if (text.includes(')') && text.includes(';')) {
      return text.replace(')', ' ').replace(';', ' ')
    } else {
      return text
    }
  }

  return {
    ip: clientIp,
    city: {
      name: cityName,
      postalCode: postalCode || 0,
    },
    country: {
      name: getCountry(country),
      alpha: country || 'No Disponible',
      emojiFlag: getCountryFlag({ countryCode: country }),
      timezone: timeZone || 'No Disponible',
    },
    coords: {
      latitude: latitude || -33.2991,
      longitude: longitude || -66.3547,
    },
    sysInfo: {
      language: checkIfUndefined(navigator.language),
      system: platform ? platform.replace(/\"/g, '') : 'No Disponible' || null,
      webBrowser: {
        browser: formatBrowserInfo(match?.[1]) ?? 'No disponible',
        version: match?.[2] ?? 'No Disponible',
      },
    },
  }
}

export default extractLocationInfo
