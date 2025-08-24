import QRCode from 'qrcode'
import { excepctionQR } from '../views/exception-qr.js'
import { qrCode } from '../views/qr-code.js'

export class QrCodeController {
  static async generateQrCode(req, res) {
    const { url } = req.query

    if (!url) {
      return res.status(400).send(excepctionQR())
    }

    try {
      const qrDataUrl = await QRCode.toDataURL(url, {
        type: 'image/png',
        width: 800,
        margin: 2,
        errorCorrectionLevel: 'H',
      })

      res.send(qrCode({ dataURL: qrDataUrl }))
    } catch (error) {
      console.error(error)
      res.status(500).send('Error al generar el código QR')
    }
  }
}
