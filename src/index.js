import express from 'express'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import { geoRouter } from '../routes/router.js'
// import { loadEnv } from '../utils/load-env.js'

const app = express()

app.set('trust proxy', 1)

const corsOptions = {
  methods: ['GET', 'POST', 'OPTIONS'],
  maxAge: 86400,
}

app.use(express.json())
app.use(cors(corsOptions))
app.disable('x-powered-by')

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 60,
  message: 'Demasiadas peticiones desde esta IP, por favor intente más tarde',
})

app.use(limiter)
app.use('/', geoRouter)

export default app