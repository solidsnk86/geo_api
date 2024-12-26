import express from 'express'
import cors from 'cors'
import { toCity } from './services/get-city.js'

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

app.get('/api/location', async (req, res) => {
  try {
    const clientIp = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || req.connection.remoteAddress
    const cityName = req.headers['x-vercel-ip-city']
    const country = req.headers['x-vercel-ip-country']

    const locationInfo = {
      ip: clientIp,
      city: {
        name: cityName,
      },
      country: country
    }

    res.json(locationInfo)
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ error: 'Error obteniendo datos de localización' })
  }
})

const PORT = process.env.PORT ?? 3000

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})