import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import extractLocationInfo from '../services/get-location-info.js'
import { mainView } from '../views/main-view.js'
import rateLimit from 'express-rate-limit'
import { getAllAirports } from '../services/get-airports.js'

const app = express()

const corsOptions = {
  methods: ['GET', 'POST'],
  maxAge: 86400,
}

app.use(express.json())
app.use(cors(corsOptions))
app.disable('x-powered-by')

const limiter = rateLimit({
  windowMS: 15 * 60 * 1000,
  max: 300,
  message: 'Demasiadas peticiones desde esta IP, por favor intente más tarde',
})

app.use(limiter)
dotenv.config()

app.get('/', async (req, res, next) => {
  try {
    const airports = await getAllAirports()
    const locationInfo = extractLocationInfo(req, airports)

    res.status(200).send(mainView({ data: locationInfo }))
  } catch (error) {
    next(error)
  }
})

app.get('/location', async (req, res) => {
  try {
    const airports = await getAllAirports()
    const locationInfo = extractLocationInfo(req, airports)

    res.status(200).json(locationInfo)
  } catch (err) {
    res.status(500).json({ message: 'Server Error ' + err })
  }
})

const PORT = process.env.PORT || 3639

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})
