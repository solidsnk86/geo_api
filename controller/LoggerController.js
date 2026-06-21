import { request, response } from 'express'

export class LogerController {
  collectData = async (req = request, res = response) => {
    const ip = req.ip
    const { headers, host, hostname, readableHighWaterMark, originalUrl } = req
    try {
      return res
        .status(200)
        .json({ ip, host, hostname, readableHighWaterMark, originalUrl })
    } catch (error) {
      return res.status(500).json({ message: 'Error', error: error.message })
    }
  }
}
