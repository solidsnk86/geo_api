import { getCountryFlag } from '../utils/convert-to-flag.js'
import { getCountryFromTimeZone } from '../utils/get-country-timezone.js'
import { checkIfUndefined } from '../utils/set-undefined.js'

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
  const countryName = getCountryFromTimeZone(timeZone)
  const platform = req.headers['sec-ch-ua-platform']
  const userInfo = req.headers['sec-ch-ua']
  const regex = /"([^"]+)";v="(\d+)"/
  const webBrowser = userInfo?.split('\n')?.[0].split(',')[0] || 'No disponible'
  const match = webBrowser.match(regex)
  const timeZoneLength = timeZone.split('\n').length
  const cityTimeZone = timeZoneLength > 1 ? timeZone?.split('\n')?.[2] : timeZone?.split('\n')?.[1]

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
      name: cityName ? decodeURIComponent(cityName) : cityTimeZone,
      postalCode: postalCode || 0,
    },
    country: {
      name: countryName,
      alpha: country || 'AR',
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
