import { Router } from 'express'
import { GeoController } from '../controller/GeoController.js'

export const geoRouter = Router()

geoRouter.get('/', GeoController.home)
geoRouter.get('/docs', GeoController.docs)
geoRouter.get('/location', GeoController.location)
geoRouter.get('/geolocation', GeoController.geolocation)
