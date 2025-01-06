import getNetworkInterfaces from './get-network-interfaces.js'

const extractLocationInfo = (req) => {
  const clientIp =
    req.headers["x-forwarded-for"] ||
    req.headers["x-real-ip"] ||
    req.connection.remoteAddress;
  const cityName = req.headers["x-vercel-ip-city"];
  const country = req.headers["x-vercel-ip-country"];
  const postalCode = req.headers["x-vercel-ip-postal-code"];
  const latitude = req.headers["x-vercel-ip-latitude"];
  const longitude = req.headers["x-vercel-ip-longitude"];
  const timeZone = req.headers["x-vercel-ip-timezone"];
  const countryName = timeZone?.split("/")[1];
  const platform = req.headers["sec-ch-ua-platform"].replace(/\"/g, "")
  const userInfo = req.headers["sec-ch-ua"];
  const regex = /"([^"]+)";v="(\d+)"/;
  const webBrowser = userInfo.split("\n")[0].split(",")[0]
  const match = webBrowser.match(regex)
  
  return {
    status: 200,
    ip: clientIp,
    city: {
      name: cityName ? decodeURIComponent(cityName) : "No disponible",
      postal_code: postalCode || null,
    },
    country: {
      name: countryName || null,
      alpha: country || null,
      flag: {
        small: `https://flagcdn.com/16x12/${country?.toLowerCase()}.png`,
        medium: `https://flagcdn.com/32x34/${country?.toLowerCase()}.png`,
        large: `https://flagcdn.com/48x36/${country?.toLowerCase()}.png`,
      },
      time_zone: timeZone || null,
    },
    network_interfaces: getNetworkInterfaces(),
    coords: {
      latitude: latitude || null,
      longitude: longitude || null,
    },
    sys_info: {
      language: typeof navigator !== "undefined" ? navigator.language : null,
      system: platform,
      web_browser: {
        browser: match[1],
        version: match[2]
      }

    },
  };
};

export default extractLocationInfo;
