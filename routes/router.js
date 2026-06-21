import { Router } from 'express'
import { GeoController } from '../controller/GeoController.js'
import { QrCodeController } from '../controller/QrCodeController.js'
import { LogerController } from '../controller/LoggerController.js'

export const geoRouter = Router()
const loggerController = new LogerController();

geoRouter.get('/', GeoController.home)
geoRouter.get('/docs', GeoController.docs)
geoRouter.get('/location', GeoController.location)
geoRouter.get('/geolocation', GeoController.geolocation)
geoRouter.get('/qr', QrCodeController.generateQrCode)
geoRouter.get('/qr/buffer', QrCodeController.generateDataURL)
geoRouter.get('/request', loggerController.collectData)
