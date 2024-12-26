import express from 'express'
import cors from 'cors'
import getNetworkInterfaces from './services/get-network-interfaces.js'
import dotenv from 'dotenv'

const app = express()

app.use(express.json())
app.use(cors({
  origin: (origin, callback) => {
    const ACCEPTED_ORIGINS = ['http://localhost:8080', 'http://localhost:3000', `${process.env.VERCEL_URL}`]

    if (ACCEPTED_ORIGINS.includes(origin)) {
      return callback(null, true)
    }
    if(!origin) {
      return callback(null, true)
    }
  }
}))
app.disable('x-powered-by')

dotenv.config()

app.get('/', async (req, res) => {
  try {
    const clientIp = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || req.connection.remoteAddress
    const cityName = req.headers['x-vercel-ip-city']
    const country = req.headers['x-vercel-ip-country']
    const postalCode = req.headers['x-vercel-ip-postal-code']
    const latitude = req.headers['x-vercel-ip-latitude']
    const longitude = req.headers['x-vercel-ip-longitude']
    const APIKEY = process.env.NEXT_WEATHER_API
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${APIKEY}`)
    const jsonData = await response.json()

    const locationInfo = {
      status: res.statusCode,
      ip: clientIp,
      city: {
        name: decodeURIComponent(cityName),
        postal_code: postalCode
      },
      country: country,
      time_zone: new Date().toISOString(),
      network_interfaces: getNetworkInterfaces(),
      coords: {
        latitude: latitude,
        longitude: longitude
      },
      weather_api: jsonData
    }

    res.json(locationInfo)
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ status: res.statusCode, error: 'Error obteniendo datos de localización' })
  }
})

const PORT = process.env.PORT ?? 3000

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})