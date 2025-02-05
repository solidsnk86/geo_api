import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import extractLocationInfo from '../services/get-location-info.js'
import { mainView } from '../views/main-view.js'
import rateLimit from 'express-rate-limit'
import { getAllAirports } from '../services/get-airports.js'
import { getAllCitiesAR } from '../services/get-cities.js'
import { getClosestPlace } from '../services/closest-airport.js'
import { SupabaseDB } from '../controller/Model.js'

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
  max: 50,
  message: 'Demasiadas peticiones desde esta IP, por favor intente más tarde',
})

app.use(limiter)
dotenv.config()

app.get('/', async (req, res, next) => {
  try {
    const [airports] = await Promise.all([getAllAirports()])
    const locationInfo = extractLocationInfo(req, airports)

    res.status(200).send(mainView({ data: locationInfo }))
  } catch (error) {
    next(error)
  }
})

app.get('/location', async (req, res) => {
  try {
    const [airports] = await Promise.all([getAllAirports()])
    const locationInfo = extractLocationInfo(req, airports)

    res.status(200).json(locationInfo)
  } catch (err) {
    res.status(500).json({ message: 'Server Error ' + err })
  }
})

app.get('/geolocation', async (req, res) => {
  const { lat, lon } = req.query
  if (!lat || !lon) {
    res.status(400).json({
      message: 'Debes proporcionar los parámetros de latitud y longitud',
    })
    return
  }
  const coordinates = { lat, lon }
  try {
    const [cities, airports] = await Promise.all([
      getAllCitiesAR(),
      getAllAirports(),
    ])
    const { closestTarget, minDistance } = getClosestPlace(coordinates, cities)
    const { nombre, tipo, departamento, provincia, pais, lat, lon } =
      closestTarget
    const { closestTarget: airport, minDistance: distance } = getClosestPlace(
      coordinates,
      airports
    )

    res.status(200).json({
      city: nombre,
      type: tipo,
      departament: departamento,
      state: provincia,
      country: pais,
      placeDistance: `${minDistance.toFixed(3) || 0}mts`,
      coordinates: {
        latitude: lat,
        longitude: lon,
      },
      closestAirport: {
        iata: airport.iata,
        name: airport.name,
        city: airport.city,
        state: airport.state,
        country: airport.country,
        latitude: airport.lat,
        longitude: airport.lon,
        distance: `${distance.toFixed(3) || 0}mts`,
      },
    })
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error })
  }
})

app.get('/supabase', async (req, res) => {
  const { id, select, column, updateTable, deleteRow } = req.query

  try {
    let data = []
    if (select) {
      data = await SupabaseDB.getData({
        table: select,
        column: column,
      })
    }

    if (updateTable) {
      data = await SupabaseDB.update(id, { content })
    }
    if (deleteRow) {
      data = await SupabaseDB.delete(id, deleteRow)
    }

    res.status(200).json(data)
  } catch (err) {
    res.status(500).json({ message: 'Server error ' + err })
  }
})

app.post('/supabase', async (req, res) => {
  const { insertRow } = req.query
  const content = req.body

  try {
    if (!insertRow) {
      return res
        .status(400)
        .json({ message: 'No se especificó la tabla para insertar.' })
    }

    const data = await SupabaseDB.sendData({ table: insertRow, content })
    res.status(200).json({ data })
  } catch (err) {
    res.status(500).json({ message: 'Server error: ' + err })
  }
})

const PORT = 5731

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})
